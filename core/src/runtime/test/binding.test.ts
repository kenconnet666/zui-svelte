import { describe, expect, it } from 'vitest';
import { createRuntime } from '../runtime.js';

describe('runtime promotion', () => {
  it('commits updates and releases all runtime resources even when a subscriber throws', () => {
    const runtime = createRuntime();
    const a = runtime.binding();
    const b = runtime.binding();
    a.evaluate((s) => {
      s.width.px(10);
    });
    b.evaluate((s) => {
      s.height.px(10);
    });
    const observed: number[] = [];
    a.subscribe((snapshot) => {
      if (snapshot.revision !== 1) throw new Error('consumer failed');
    });
    a.subscribe((snapshot) => observed.push(snapshot.revision));
    expect(() =>
      a.evaluate((s) => {
        s.width.px(20);
      }),
    ).toThrow('subscribers failed');
    expect(observed).toEqual([1, 2]);
    expect(Object.values(a.snapshot.variables)).toEqual(['20px']);
    expect(() => runtime.dispose()).toThrow('cleanup failed');
    expect(runtime.stats.bindings).toBe(0);
    expect(runtime.stats.rules).toBe(0);
    expect(runtime.stats.sources).toBe(0);
    expect(runtime.stats.styleEntries).toBe(0);
    expect(observed).toEqual([1, 2, 0]);
    expect(() => runtime.dispose()).not.toThrow();
  });

  it('does not retain a subscriber that fails during initial notification', () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    let calls = 0;
    expect(() =>
      binding.subscribe(() => {
        calls++;
        throw new Error('initial failure');
      }),
    ).toThrow('initial failure');
    binding.evaluate((s) => {
      s.opacity.raw(0.5);
    });
    expect(calls).toBe(1);
    runtime.dispose();
  });
  it('releases source bookkeeping during repeated mount and dispose', () => {
    const runtime = createRuntime();
    for (let i = 0; i < 1000; i++) {
      const binding = runtime.binding();
      binding.evaluate((s) => {
        s.width.px(i);
      });
      binding.dispose();
    }
    expect(runtime.stats.bindings).toBe(0);
    expect(runtime.registry.size).toBe(0);
    expect(runtime.registry.sourceCount).toBe(0);
    runtime.dispose();
  });
  it('starts static, promotes only changed declarations and stabilizes rules', () => {
    const runtime = createRuntime();
    const binding = runtime.binding({ id: 'panel' });
    let width = 240;
    const render = () =>
      binding.evaluate((s) => {
        s.width.px(width);
        s.gap.px(12);
      });
    const first = render();
    expect(runtime.cssText()).toContain('width:240px;gap:12px;');
    expect(binding.snapshot.variables).toEqual({});
    width = 241;
    const promoted = render();
    expect(promoted).not.toBe(first);
    expect(runtime.cssText()).toContain('gap:12px;');
    expect(binding.snapshot.variables).toEqual({ '--z-b-panel-0': '241px' });
    const compilations = runtime.stats.ruleCompilations;
    for (let i = 0; i < 1000; i++) {
      width = i;
      expect(render()).toBe(promoted);
    }
    expect(runtime.registry.size).toBe(1);
    expect(runtime.stats.ruleCompilations).toBe(compilations);
    runtime.dispose();
    expect(runtime.cssText()).toBe('');
  });
  it('isolates shared static rules and dynamically promoted instances', () => {
    const runtime = createRuntime();
    const a = runtime.binding({ id: 'a', source: 'same-source' });
    const b = runtime.binding({ id: 'b', source: 'same-source' });
    const first = a.evaluate((s) => {
      s.width.px(10);
    });
    expect(
      b.evaluate((s) => {
        s.width.px(10);
      }),
    ).toBe(first);
    expect(runtime.registry.size).toBe(1);
    a.evaluate((s) => {
      s.width.px(20);
    });
    expect(b.snapshot.className).toBe(first);
    b.evaluate((s) => {
      s.width.px(30);
    });
    expect(Object.keys(a.snapshot.variables)).not.toEqual(Object.keys(b.snapshot.variables));
    runtime.release(a);
    expect(runtime.registry.size).toBe(1);
    runtime.release(b);
    expect(runtime.registry.size).toBe(0);
  });
  it('removes declarations, bounds structural history and preserves last valid output', () => {
    const runtime = createRuntime();
    const binding = runtime.binding({ maxStructures: 2 });
    binding.evaluate((s) => {
      s.width.px(10);
    });
    binding.evaluate((s) => {
      s.width.px(20);
    });
    binding.evaluate((s) => {
      s.height.px(10);
    });
    expect(binding.snapshot.variables).toEqual({});
    binding.evaluate((s) => {
      s.opacity.raw(0.5);
    });
    expect(binding.cachedStructures).toBe(2);
    const snapshot = binding.snapshot;
    expect(() =>
      binding.evaluate((s) => {
        s.width.raw('10px;color:red');
      }),
    ).toThrow();
    expect(binding.snapshot).toBe(snapshot);
    binding.evaluate((s) => {
      s.width.raw(null);
    });
    expect(binding.snapshot.className).toBe('');
    runtime.dispose();
  });
  it('does not promote unsafe targets, global keywords or duplicate fallback declarations', () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    for (const value of [10, 20])
      binding.evaluate((s) => {
        s._selector('& + .other', (s) => {
          s.width.px(value);
        });
        s.width.px(value);
        s.width.auto;
      });
    expect(binding.snapshot.variables).toEqual({});
    binding.evaluate((s) => {
      s.width.px(10);
    });
    binding.evaluate((s) => {
      s.width.inherit;
    });
    expect(binding.snapshot.variables).toEqual({});
  });
  it('notifies variable updates even when the class string stays identical', () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    const revisions: number[] = [];
    const stop = binding.subscribe((value) => revisions.push(value.revision));
    binding.evaluate((s) => {
      s.opacity.raw(0.5);
    });
    binding.evaluate((s) => {
      s.opacity.raw(0.6);
    });
    const className = binding.snapshot.className;
    binding.evaluate((s) => {
      s.opacity.raw(0.7);
    });
    expect(binding.snapshot.className).toBe(className);
    expect(revisions).toEqual([0, 1, 2, 3]);
    stop();
    runtime.dispose();
  });
  it('keeps SSR scopes independent and escapes style tag terminators', () => {
    const a = createRuntime({ nonce: 'x"y' });
    const b = createRuntime();
    const name = a.css((s) => {
      s.content.raw('"</style><script>"');
    });
    expect(name).toMatch(/^z-r-/u);
    expect(a.styleTags()).not.toContain('"</style>');
    expect(a.styleTags()).toContain('nonce="x&quot;y"');
    expect(b.styleTags()).toBe('');
    a.dispose();
    b.dispose();
  });
});
