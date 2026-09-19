import type * as CSS from 'csstype';
import type { units } from './schema.js';
import type { TokenSchema } from '../theme/types.js';

export type PropertyTokenMap<T extends TokenSchema> = Partial<
  Record<keyof CSS.Properties, keyof T & string>
>;
type TokenCategory<P extends PropertyKey, C extends string, M> = P extends keyof M
  ? Exclude<M[P], undefined> | (undefined extends M[P] ? C : never)
  : C;

// 不分发类别联合：可选映射只能提示所有可能类别共有的键。
type ThemeKeywords<T extends TokenSchema, C> = [C] extends [keyof T]
  ? `_${keyof T[C & keyof T] & string}`
  : never;

type UnitArguments<N extends 1 | 2 | 4> = N extends 4
  ? [number] | [number, number] | [number, number, number] | [number, number, number, number]
  : N extends 2
    ? [number] | [number, number]
    : [number];

export type Carrier<
  P extends keyof CSS.Properties,
  K extends string,
  U extends keyof typeof units | never,
  N extends 1 | 2 | 4,
  C extends string,
  T extends TokenSchema,
  M extends PropertyTokenMap<T> = object,
> = ((
  // 保留原生联合，NonNullable 的交叉化会吞掉开放字符串中的字面量补全。
  value: CSS.Properties[P] | ThemeKeywords<T, TokenCategory<P, C, M>> | null,
) => void) & {
  readonly [Keyword in K]: void;
} & { readonly [Unit in (typeof units)[U][number]]: (...values: UnitArguments<N>) => void } & {
  readonly [Token in ThemeKeywords<T, TokenCategory<P, C, M>>]: void;
};
