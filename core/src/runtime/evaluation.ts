import { validateTokenMap, type StyleFactory, type PropertyTokenMap } from '../css/builder.js';
import type { DefaultTokens } from '../theme/presets.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { validateLayer } from '../css/layers.js';

type ErasedFactory = StyleFactory<TokenSchema>;
export interface CssEvaluationOptions {
  readonly theme?: Theme<TokenSchema>;
  readonly layer?: string | null;
  readonly tokenMap?: Readonly<Record<string, string | undefined>>;
}
type Evaluate = (factory: ErasedFactory, options?: CssEvaluationOptions) => string;
let activeEvaluation: Evaluate | undefined;

/** @internal 只在同步样式求值期间切换上下文，异常和嵌套调用都必须恢复。 */
export function withCssEvaluation<R>(read: () => R, evaluate: Evaluate): R {
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
  return evaluate<T>(factory, theme ? { theme } : undefined);
}

function evaluate<T extends TokenSchema>(
  factory: StyleFactory<T>,
  options?: CssEvaluationOptions,
): string {
  if (!activeEvaluation)
    throw new Error(
      'css() requires the class compiler; use runtime.css() for explicit runtime ownership.',
    );
  return activeEvaluation(factory as unknown as ErasedFactory, options);
}

export interface CssOptions<
  T extends TokenSchema = TokenSchema,
  M extends PropertyTokenMap<T> = PropertyTokenMap<T>,
> {
  readonly layer?: string | null;
  readonly tokenMap?: M & Record<Exclude<keyof M, keyof PropertyTokenMap<T>>, never>;
}

export function createCss<T extends TokenSchema, const M extends PropertyTokenMap<T> = object>(
  theme: Theme<T>,
  options: CssOptions<T, M> = {},
) {
  const layer = options.layer == null ? options.layer : validateLayer(options.layer);
  const tokenMap = options.tokenMap ? Object.freeze({ ...options.tokenMap }) : undefined;
  if (tokenMap) validateTokenMap(theme, tokenMap as Readonly<Record<string, string | undefined>>);
  const context = Object.freeze({ theme, layer, tokenMap });
  // 泛型映射只在入口保留；内部协议携带同一份运行时映射，避免传播整套属性泛型。
  return (factory: StyleFactory<T, M>): string =>
    evaluate<T>(factory as unknown as StyleFactory<T>, context as CssEvaluationOptions);
}
