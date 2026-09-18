import { describe, expect, it } from 'vitest';
import { createRuntime } from '../runtime.js';
import { ClassController, css } from '../classes.js';
import { MemoryStyleSheet } from '../sheet.js';

class FailingRemoval extends MemoryStyleSheet {
  fail: string | undefined;
  override remove(key: string) {
    if (key === this.fail) {
      this.fail = undefined;
      throw new Error('backend removal failed');
    }
    super.remove(key);
  }
}

describe('stylesheet variables', () => {
  it('preserves both errors and the previous snapshot when write rollback also fails', () => {
    class FailingRollback extends MemoryStyleSheet {
      override set(key: string, css: string, order: number) {
        super.set(key, css, order);
        if (key.endsWith(':vars')) throw new Error('write failed');
      }
      override remove(): void {
        throw new Error('remove failed');
      }
    }
    const sheet = new FailingRollback();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const before = binding.snapshot;
    let failure: unknown;
    try {
      binding.evaluate((s) => {
        s.width.px(120);
      });
    } catch (error) {
      failure = error;
    }
    expect(failure).toMatchObject({
      message: 'Style write and rollback failed.',
      errors: [expect.objectContaining({ message: 'write failed' }), expect.any(AggregateError)],
    });
    expect(binding.snapshot).toBe(before);
    expect(runtime.stats.rules).toBe(1);
    expect(() => runtime.dispose()).toThrow('cleanup failed');
    expect(sheet.entries()).toHaveLength(0);
  });
  it('does not retain a zero-reference record after a backend removal failure', () => {
    const sheet = new FailingRemoval();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const first = runtime.binding({ id: 'same' });
    first.evaluate((s) => {
      s.width.px(100);
    });
    sheet.fail = runtime.registry.lookup(first.snapshot.className)!.key;
    expect(() => first.dispose()).toThrow('cleanup failed');
    expect(runtime.stats.rules).toBe(0);
    expect(runtime.stats.sources).toBe(0);
    expect(runtime.stats.bindings).toBe(0);
    // 后端保留的物理规则由相同 key 的重试覆盖，内部引用状态必须已可重新注册。
    const retry = runtime.binding({ id: 'same' });
    expect(() =>
      retry.evaluate((s) => {
        s.width.px(100);
      }),
    ).not.toThrow();
    retry.dispose();
    expect(sheet.entries()).toHaveLength(0);
    runtime.dispose();
  });

  it('keeps the committed binding usable when deleting the previous rule fails', () => {
    const sheet = new FailingRemoval();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const before = binding.snapshot;
    sheet.fail = runtime.registry.lookup(before.className)!.key;
    expect(() =>
      binding.evaluate((s) => {
        s.width.px(120);
      }),
    ).toThrow();
    expect(binding.snapshot).not.toBe(before);
    expect(Object.values(binding.snapshot.variables)).toEqual(['120px']);
    expect(() =>
      binding.evaluate((s) => {
        s.width.px(140);
      }),
    ).not.toThrow();
    expect(Object.values(binding.snapshot.variables)).toEqual(['140px']);
    runtime.dispose();
    expect(sheet.entries()).toHaveLength(0);
  });
  it('preserves the last valid snapshot when the variable sheet rejects an update', () => {
    class FailingSheet extends MemoryStyleSheet {
      override set(key: string, css: string, order: number) {
        if (key.endsWith(':vars')) throw new Error('sheet rejected variables');
        super.set(key, css, order);
      }
    }
    const sheet = new FailingSheet();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const snapshot = binding.snapshot;
    expect(() =>
      binding.evaluate((s) => {
        s.width.px(120);
      }),
    ).toThrow('sheet rejected');
    expect(binding.snapshot).toBe(snapshot);
    expect(runtime.cssText()).toContain('width:100px');
    expect(sheet.entries()).toHaveLength(1);
    expect(runtime.registry.size).toBe(1);
    runtime.dispose();
  });
  it('keeps promoted classes stable without inline variables and retains consumer snapshots', () => {
    const sheet = new MemoryStyleSheet();
    const runtime = createRuntime({ sheet, variables: 'stylesheet', nonce: 'request-nonce' });
    const source = new ClassController(runtime, 'a', 'site');
    const consumer = new ClassController(runtime, 'b', 'consumer');
    const render = (width: number) =>
      source.run(() =>
        css((s) => {
          s.width.px(width);
        }),
      );
    render(100);
    const promoted = render(120);
    consumer.resolve(promoted);
    expect(consumer.style(undefined)).toBeUndefined();
    expect(consumer.style('color:red')).toBe('color:red');
    for (let value = 121; value < 1000; value++) expect(render(value)).toBe(promoted);
    expect(sheet.entries()).toHaveLength(2);
    expect(runtime.cssText()).toContain('999px;');
    expect(runtime.styleTags().match(/nonce="request-nonce"/gu)).toHaveLength(2);
    source.dispose();
    expect(runtime.cssText()).toContain('999px;');
    consumer.dispose();
    expect(sheet.entries()).toHaveLength(0);
    runtime.dispose();
  });

  it('isolates instances and releases variables on structural changes', () => {
    const sheet = new MemoryStyleSheet();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const a = runtime.binding({ id: 'a', source: 'shared' });
    const b = runtime.binding({ id: 'b', source: 'shared' });
    for (const value of [10, 20]) {
      a.evaluate((s) => {
        s.width.px(value);
      });
      b.evaluate((s) => {
        s.width.px(value * 2);
      });
    }
    expect(runtime.cssText()).toContain('--z-b-a-0:20px;');
    expect(runtime.cssText()).toContain('--z-b-b-0:40px;');
    a.evaluate((s) => {
      s.height.px(10);
    });
    expect(runtime.cssText()).not.toContain('--z-b-a-0');
    expect(runtime.cssText()).toContain('--z-b-b-0:40px;');
    runtime.dispose();
    expect(sheet.entries()).toHaveLength(0);
  });
});
