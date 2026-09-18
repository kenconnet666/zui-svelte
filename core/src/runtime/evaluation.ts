import type { StyleFactory } from '../css/builder.js';
import type { DefaultTokens } from '../theme/presets.js';
import type { Theme, TokenSchema } from '../theme/types.js';

type ErasedFactory = StyleFactory<TokenSchema>;
let activeEvaluation: ((factory: ErasedFactory, theme?: Theme<TokenSchema>) => string) | undefined;

/** @internal 只在同步样式求值期间切换上下文，异常和嵌套调用都必须恢复。 */
export function withCssEvaluation<R>(
  read: () => R,
  evaluate: (factory: ErasedFactory, theme?: Theme<TokenSchema>) => string,
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
  if (!activeEvaluation)
    throw new Error(
      'css() requires the class compiler; use runtime.css() for explicit runtime ownership.',
    );
  return activeEvaluation(factory as unknown as ErasedFactory, theme);
}

export function createCss<T extends TokenSchema>(theme: Theme<T>) {
  return (factory: StyleFactory<T>): string => css(factory, theme);
}
