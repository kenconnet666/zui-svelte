import { describe, expect, it } from 'vitest';
import { defineTheme } from '../../theme/theme.js';
import { createRuntime } from '../runtime.js';
import type { StyleFactory } from '../../css/builder.js';

describe('scoped style resources', () => {
  it('rejects new resources after runtime disposal', () => {
    const runtime = createRuntime();
    runtime.dispose();
    expect(() =>
      runtime.global('body', (s) => {
        s.margin.px(0);
      }),
    ).toThrow('disposed');
    expect(() => runtime.themeStyle(':root')).toThrow('disposed');
    expect(() =>
      runtime.keyframes({
        from: (s) => {
          s.opacity.raw(0);
        },
      }),
    ).toThrow('disposed');
    expect(() => runtime.fontFace({ fontFamily: 'test', src: 'url(test.woff2)' })).toThrow(
      'disposed',
    );
    expect(() => runtime.property('--test', { syntax: '*', inherits: true })).toThrow('disposed');
    expect(runtime.stats.rules).toBe(0);
  });
  it('deduplicates animations and releases them only after their last owner', () => {
    const runtime = createRuntime();
    const frames: Record<string, StyleFactory> = {
      from: (s) => {
        s.opacity.raw(0);
      },
      to: (s) => {
        s.opacity.raw(1);
      },
    };
    const first = runtime.keyframes(frames);
    const second = runtime.keyframes(frames);
    expect(first.name).toBe(second.name);
    expect(runtime.registry.size).toBe(1);
    first.dispose();
    expect(runtime.cssText()).toContain('@keyframes');
    second.dispose();
    expect(runtime.cssText()).toBe('');
    second.dispose();
  });
  it('registers global, theme and font rules with explicit lifetimes', () => {
    const runtime = createRuntime({ theme: defineTheme({ color: { primary: 'red' } }) });
    const reset = runtime.global('body', (s) => {
      s.margin.px(0);
    });
    const theme = runtime.themeStyle(':root');
    const font = runtime.fontFace({
      fontFamily: 'Example',
      src: 'url("/example.woff2") format("woff2")',
      fontDisplay: 'swap',
    });
    expect(runtime.cssText()).toContain('body{margin:0px;}');
    expect(runtime.cssText()).toContain('--z-color-primary:');
    expect(runtime.cssText()).toContain('@font-face');
    reset.dispose();
    theme.dispose();
    font.dispose();
    expect(runtime.registry.size).toBe(0);
  });
  it('rejects conflicting typed properties and invalid keyframe structures', () => {
    const runtime = createRuntime();
    const property = runtime.property('--progress', {
      syntax: '<number>',
      inherits: false,
      initialValue: 0,
    });
    expect(runtime.cssText()).toContain('@property --progress');
    expect(() =>
      runtime.property('--progress', { syntax: '<color>', inherits: false, initialValue: 'red' }),
    ).toThrow();
    expect(() => runtime.keyframes({ '101%': () => {} })).toThrow();
    expect(() =>
      runtime.property('--infinite', {
        syntax: '<number>',
        inherits: false,
        initialValue: Infinity,
      }),
    ).toThrow('initial value');
    expect(() =>
      runtime.fontFace({ fontFamily: 'test', src: 'url(test.woff2)', fontWeight: Infinity }),
    ).toThrow('font descriptor');
    expect(() =>
      runtime.keyframes({
        from: (s) => {
          s._hover((s) => {
            s.opacity.raw(1);
          });
        },
      }),
    ).toThrow();
    property.dispose();
    runtime.dispose();
  });
});
