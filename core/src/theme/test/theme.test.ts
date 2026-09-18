import { describe, expect, it } from 'vitest';
import { defineTheme, extendTheme, overrideTheme, tokenRef } from '../theme.js';
import { ThemeScope } from '../scope.js';
import { buildStyle } from '../../css/builder.js';
import { serializeProgram, serializeTheme } from '../../css/serialize.js';

describe('theme definitions', () => {
  it('normalizes numeric token keys through aliases, extensions and overrides', () => {
    const base = defineTheme({ color: { 100: 'red', selected: tokenRef('color', '100') } });
    expect(base.variable('color', '100')).toBe('--z-color-100');
    const extended = extendTheme(base, { color: { 100: 'blue', 200: tokenRef('color', '100') } });
    expect(extended.tokens.color).toEqual({ 100: 'blue', 200: 'blue', selected: 'blue' });
    const changed = overrideTheme(extended, { color: { 100: 'green' } });
    expect(changed.tokens.color['200']).toBe('green');
    expect(changed.tokens.color.selected).toBe('green');
  });
  it('resolves aliases from final overrides and keeps nested scopes independent', () => {
    const theme = defineTheme({
      color: {
        primary: 'red',
        text: tokenRef('color', 'primary'),
        label: tokenRef('color', 'text'),
      },
    });
    const scope = new ThemeScope(theme);
    const child = scope.fork({ color: { primary: 'blue' } });
    expect(child.theme.resolved.color.label).toBe('blue');
    scope.update(overrideTheme(theme, { color: { primary: 'green' } }));
    expect(scope.theme.tokens.color.text).toBe('green');
    expect(child.theme.tokens.color.text).toBe('blue');
    expect(theme.tokens.color.text).toBe('red');
    expect(theme.ref('color', 'text')).toBe('var(--z-color-text)');
    const extended = extendTheme(theme, { color: { border: tokenRef('color', 'primary') } });
    expect(overrideTheme(extended, { color: { primary: 'black' } }).tokens.color.border).toBe(
      'black',
    );
    scope.dispose();
  });

  it('rejects circular, missing and incompatible alias targets', () => {
    expect(() =>
      defineTheme({ color: { a: tokenRef('color', 'b'), b: tokenRef('color', 'a') } }),
    ).toThrow('Circular');
    expect(() => defineTheme({ color: { a: tokenRef('color', 'missing') } } as never)).toThrow(
      'Unknown',
    );
    expect(() =>
      defineTheme({
        color: { a: tokenRef('spacing', 'small') },
        spacing: { small: '8px' },
      } as never),
    ).toThrow('Incompatible');
  });
  it('extends keys and overrides values without mutating the original', () => {
    const original = defineTheme({ color: { primary: 'red' } });
    const extended = extendTheme(original, { color: { brand: 'blue' }, spacing: { gap: '8px' } });
    const result = overrideTheme(extended, { color: { primary: 'green' } });
    expect(original.tokens.color.primary).toBe('red');
    expect(result.tokens.color).toEqual({ primary: 'green', brand: 'blue' });
    expect(Object.isFrozen(result.tokens.color)).toBe(true);
    expect(
      serializeProgram(
        buildStyle((s) => {
          s.color._brand;
          s.gap._gap;
        }, result),
        '.x',
        false,
      ),
    ).toBe('.x{color:var(--z-color-brand);gap:var(--z-spacing-gap);}');
  });
  it('keeps variable names stable across values and escapes token paths', () => {
    const a = defineTheme({ 'a-b': { c: 'red' }, a: { 'b-c': 'blue' } });
    expect(a.variable('a-b', 'c')).not.toBe(a.variable('a', 'b-c'));
    expect(serializeTheme(a)).toContain(':red;');
    expect(() => a.variable('color' as never, 'unknown' as never)).toThrow();
  });
  it('rejects non-finite numbers, unknown overrides and malicious token values on output', () => {
    expect(() => defineTheme({ opacity: { bad: NaN } })).toThrow();
    expect(() => defineTheme({ spacing: { bad: 8 } } as never)).toThrow('category');
    const numeric = defineTheme({ custom: { first: 1, other: 'text' } });
    expect(() =>
      overrideTheme(numeric, { custom: { first: tokenRef('custom', 'other') } }),
    ).toThrow('type cannot change');
    const theme = defineTheme({ color: { primary: 'red' } });
    expect(() => overrideTheme(theme, { color: { missing: 'blue' } } as never)).toThrow();
    expect(() =>
      serializeTheme(defineTheme({ color: { evil: 'red;}body{color:blue' } })),
    ).toThrow();
  });
});
