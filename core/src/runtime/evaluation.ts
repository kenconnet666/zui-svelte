import type { StyleFactory } from '../css/builder.js';
import type { DefaultTokens } from '../theme/presets.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { validateLayer } from '../css/layers.js';

type ErasedFactory = StyleFactory<TokenSchema>;
let activeEvaluation:
  | ((factory: ErasedFactory, theme?: Theme<TokenSchema>, layer?: string | null) => string)
  | undefined;

/** @internal 只在同步样式求值期间切换上下文，异常和嵌套调用都必须恢复。 */
export function withCssEvaluation<R>(
  read: () => R,
  evaluate: (factory: ErasedFactory, theme?: Theme<TokenSchema>, layer?: string | null) => string,
): R {
  const previous = activeEvaluation;
  activeEvaluation = evaluate;
  try {
    return read();
  } finally {
    activeEvaluation = previous;
  }
}

export function hasCssEvaluation(): boolean {
  return activeEvaluation !== undefined;
}

export function css<T extends TokenSchema = DefaultTokens>(
  factory: StyleFactory<T>,
  theme?: Theme<T>,
): string {
  return evaluate(factory, theme);
}

function evaluate<T extends TokenSchema>(
  factory: StyleFactory<T>,
  theme?: Theme<T>,
  layer?: string | null,
): string {
  if (!activeEvaluation)
    throw new Error(
      'css() requires the class compiler; use runtime.css() for explicit runtime ownership.',
    );
  return activeEvaluation(factory as unknown as ErasedFactory, theme, layer);
}

export interface CssOptions {
  readonly layer?: string | null;
}

export function createCss<T extends TokenSchema>(theme: Theme<T>, options: CssOptions = {}) {
  const layer = options.layer == null ? options.layer : validateLayer(options.layer);
  return (factory: StyleFactory<T>): string => evaluate(factory, theme, layer);
}
