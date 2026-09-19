import { describe, expect, it } from 'vitest';
import { buildStyle } from '../../css/builder.js';
import { createRuntime } from '../../runtime/runtime.js';
import { ClassController, createCss } from '../../runtime/classes.js';
import { createStyleModule } from '../../runtime/definitions.js';
import { defineTheme, extendTheme } from '../theme.js';
import { baseTheme } from '../base.js';

describe('required theme tokens', () => {
  it('rejects a typed CSS token that is absent from the active runtime before allocating a binding', () => {
    const appTheme = extendTheme(baseTheme, { color: { brand: 'red' } });
    const styles = createCss(appTheme);
    const runtime = createRuntime();
    const frame = new ClassController(runtime, 'app', 'app');
    expect(() =>
      frame.run(() =>
        styles((s) => {
          s.color._brand;
        }),
      ),
    ).toThrow('Missing theme token: color.brand');
    expect(runtime.stats.bindings).toBe(0);
    expect(runtime.stats.rules).toBe(0);
    runtime.dispose();
  });

  it('validates namespace before replacing a live binding', () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const before = binding.snapshot;
    const foreign = defineTheme({ color: { primary: 'red' } }, { namespace: 'foreign' });
    expect(() =>
      binding.update(
        buildStyle((s) => {
          s.color._primary;
        }, foreign),
      ),
    ).toThrow('namespace mismatch');
    expect(binding.snapshot).toBe(before);
    expect(runtime.stats.rules).toBe(1);
    runtime.dispose();
  });

  it('requires only the tokens actually used by a module definition', () => {
    const module = createStyleModule('minimum-theme');
    const name = module.call(
      'primary',
      createCss(defineTheme({ color: { primary: 'red' } })),
      (s) => {
        s.color._primary;
      },
    );
    const runtime = createRuntime({ theme: defineTheme({ color: { primary: 'green' } }) });
    const frame = new ClassController(runtime, 'consumer', 'consumer');
    expect(() => frame.resolve(name)).not.toThrow();
    expect(runtime.cssText()).toContain('var(--z-color-primary)');
    runtime.dispose();
    module.dispose();
  });
});
