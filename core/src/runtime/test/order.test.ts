import { describe, expect, it } from 'vitest';
import { createRuntime } from '../runtime.js';

describe('stable source order', () => {
  it('keeps the same order when sources arrive in reverse order', () => {
    const render = (sources: readonly string[]) => {
      const runtime = createRuntime();
      for (const source of sources)
        runtime.binding({ source }).evaluate((s) => {
          s.width.px(source.endsWith(':20') ? 200 : 100);
        });
      const output = runtime.cssText();
      runtime.dispose();
      return output;
    };
    const forward = render(['panel.svelte:3', 'panel.svelte:20']);
    expect(forward).toBe(render(['panel.svelte:20', 'panel.svelte:3']));
    expect(forward.indexOf('100px')).toBeLessThan(forward.indexOf('200px'));
  });

  it('restores source precedence after all its previous consumers leave', () => {
    const runtime = createRuntime();
    const first = runtime.binding({ source: 'panel.svelte:3' });
    const second = runtime.binding({ source: 'panel.svelte:20' });
    first.evaluate((s) => {
      s.width.px(100);
    });
    second.evaluate((s) => {
      s.width.px(200);
    });
    const before = runtime.cssText();
    first.dispose();
    expect(runtime.stats.sources).toBe(1);
    runtime.binding({ source: 'panel.svelte:3' }).evaluate((s) => {
      s.width.px(100);
    });
    expect(runtime.cssText()).toBe(before);
    runtime.dispose();
    expect(runtime.stats.sources).toBe(0);
  });
});
