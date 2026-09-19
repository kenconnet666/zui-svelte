import {
  createRuntime,
  type RuntimeOptions,
  type StyleRuntime,
  type Theme,
  type TokenSchema,
} from '@zui/core';
import { lightTheme, type DefaultTokens } from '../theme.js';

export const uiLayers = Object.freeze(['zui.components', 'zui.defaults', 'zui.app'] as const);

export function assertUILayers(runtime: {
  readonly registry: { readonly layers: readonly string[] };
}): void {
  const layers = runtime.registry.layers;
  let previous = -1;
  for (const layer of uiLayers) {
    const index = layers.indexOf(layer);
    if (index <= previous)
      throw new Error('Svelte UI styles require ordered uiLayers; use createStyleRuntime().');
    previous = index;
  }
}

export function createStyleRuntime(
  options?: RuntimeOptions<DefaultTokens>,
): StyleRuntime<DefaultTokens>;
export function createStyleRuntime<T extends TokenSchema>(
  options: RuntimeOptions<T> & { theme: Theme<T> },
): StyleRuntime<T>;
export function createStyleRuntime<T extends TokenSchema = DefaultTokens>(
  options: RuntimeOptions<T> = {},
): StyleRuntime<T> {
  const layers = options.layers ?? uiLayers;
  let previous = -1;
  for (const layer of uiLayers) {
    const index = layers.indexOf(layer);
    if (index <= previous)
      throw new TypeError('UI layer order must include components, defaults, then app.');
    previous = index;
  }
  // 重载保证未传主题时 T 就是内置主题；显式泛型必须同时提供相应主题。
  return createRuntime({
    ...options,
    theme: options.theme ?? (lightTheme as unknown as Theme<T>),
    layers,
  });
}
