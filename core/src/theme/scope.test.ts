import { describe, expect, it } from 'vitest';
import { ThemeScope, themeVariables } from './scope.js';
import { defineTheme, overrideTheme } from './theme.js';

describe('theme scopes', () => {
  it('updates inherited values while preserving local overrides', () => {
    const theme = defineTheme({ color: { primary: 'red', text: 'black' } });
    const root = new ThemeScope(theme);
    const child = root.fork({ color: { primary: 'blue' } });
    const nested = child.fork({});
    root.update(overrideTheme(theme, { color: { text: 'white' } }));
    expect(nested.theme.tokens.color).toEqual({ primary: 'blue', text: 'white' });
    child.override({});
    expect(nested.theme.tokens.color.primary).toBe('red');
    expect(themeVariables(child.theme)['--z-color-text']).toBe('white');
    root.dispose();
    expect(() => child.fork({})).toThrow();
  });
  it('keeps the previous state on an invalid override', () => {
    const scope = new ThemeScope(defineTheme({ color: { primary: 'red' } }));
    const before = scope.theme;
    expect(() => scope.override({ color: { unknown: 'blue' } } as never)).toThrow();
    expect(scope.theme).toBe(before);
    scope.dispose();
  });
});
