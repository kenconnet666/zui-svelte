import { describe, expect, it } from 'vitest';
import { baseTheme, createRuntime, extendTheme } from '@zui/core';
import { createStyleRuntime, uiLayers, assertUILayers } from '../styles.js';

describe('UI runtime layer contract', () => {
  it('declares the same ordering before rules for default and custom themes', () => {
    const runtime = createStyleRuntime();
    expect(runtime.registry.layers).toEqual(uiLayers);
    expect(runtime.cssText()).toContain('@layer zui.components,zui.defaults,zui.app;');
    expect(() => assertUILayers(runtime)).not.toThrow();
    runtime.dispose();
    const theme = extendTheme(baseTheme, { color: { brand: 'red' } });
    const custom = createStyleRuntime({ theme });
    expect(custom.defaultTheme).toBe(theme);
    expect(custom.cssText()).not.toContain('--z-color-primary');
    custom.dispose();
  });
  it('rejects missing/reversed UI layer definitions before adopting a runtime', () => {
    expect(() => createStyleRuntime({ layers: [...uiLayers].reverse() })).toThrow('UI layer order');
    const runtime = createRuntime();
    expect(() => assertUILayers(runtime)).toThrow('uiLayers');
    runtime.dispose();
  });
});
