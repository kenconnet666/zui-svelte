import { describe, expect, it } from 'vitest';
import { defineTheme, extendTheme, overrideTheme } from './theme.js';
import { buildStyle } from '../css/builder.js';
import { serializeProgram, serializeTheme } from '../css/serialize.js';

describe('theme definitions', () => {
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
    expect(() => a.variable('color', 'unknown')).toThrow();
  });
  it('rejects non-finite numbers, unknown overrides and malicious token values on output', () => {
    expect(() => defineTheme({ size: { bad: NaN } })).toThrow();
    const theme = defineTheme({ color: { primary: 'red' } });
    expect(() => overrideTheme(theme, { color: { missing: 'blue' } } as never)).toThrow();
    expect(() =>
      serializeTheme(defineTheme({ color: { evil: 'red;}body{color:blue' } })),
    ).toThrow();
  });
});
