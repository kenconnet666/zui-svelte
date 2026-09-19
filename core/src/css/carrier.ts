import type * as CSS from 'csstype';
import type { units } from './schema.js';
import type { TokenSchema } from '../theme/types.js';

export type PropertyTokenMap<T extends TokenSchema> = Partial<
  Record<keyof CSS.Properties, keyof T & string>
>;
type TokenCategory<P extends PropertyKey, C extends string, M> = P extends keyof M
  ? Exclude<M[P], undefined> | (undefined extends M[P] ? C : never)
  : C;

// 可选类别映射只接受所有可能类别共有的键，不能把不确定映射放宽为并集。
type TokenNames<T extends TokenSchema, C> = [C] extends [keyof T]
  ? keyof T[C & keyof T] & string
  : never;
type TokenAccess<T extends TokenSchema, C> = {
  readonly [Token in TokenNames<T, C> as `_${Token}`]: void;
} & ([TokenNames<T, C>] extends [never]
  ? object
  : {
      /** 写入当前属性类别的主题 Token；支持动态键，值随 ThemeScope 的覆盖变化。 */
      token(key: TokenNames<T, C>): void;
    });

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
> = ((value: NonNullable<CSS.Properties[P]> | null | undefined) => void) & {
  readonly [Keyword in K]: void;
} & {
  readonly [Unit in (typeof units)[U][number]]: (...values: UnitArguments<N>) => void;
} & TokenAccess<T, TokenCategory<P, C, M>>;
