import type * as CSS from 'csstype';
import type { units } from './schema.js';
import type { UnitMethods } from './units.generated.js';
import type { SystemKeywordMembers } from './keywords.generated.js';
import type { TokenSchema } from '../theme/types.js';

export type PropertyTokenMap<T extends TokenSchema> = Partial<
  Record<keyof CSS.Properties, keyof T & string>
>;
type TokenCategory<P extends PropertyKey, C extends string, M> = P extends keyof M
  ? Exclude<M[P], undefined> | (undefined extends M[P] ? C : never)
  : C;
// 不分发类别联合：可选映射只能接受所有可能类别共有的键。
type ThemeKeywords<T extends TokenSchema, C> = [C] extends [keyof T]
  ? `_${keyof T[C & keyof T] & string}`
  : never;
// 映射保持精确的主题键；内置主题的逐键悬停说明由直接成员声明补齐。
type ThemeMembers<T extends TokenSchema, C> = [C] extends [keyof T]
  ? { readonly [K in keyof T[C & keyof T] as K extends string ? `_${K}` : never]: void }
  : object;

type UnitArguments<P, N extends 1 | 2 | 4> = N extends 4
  ? P extends 'borderRadius'
    ? | [all: number]
      | [topLeftBottomRight: number, topRightBottomLeft: number]
      | [topLeft: number, topRightBottomLeft: number, bottomRight: number]
      | [topLeft: number, topRight: number, bottomRight: number, bottomLeft: number]
    : | [all: number]
      | [vertical: number, horizontal: number]
      | [top: number, horizontal: number, bottom: number]
      | [top: number, right: number, bottom: number, left: number]
  : N extends 2
    ? P extends 'gap'
      ? [all: number] | [row: number, column: number]
      : P extends `${string}Radius`
        ? [radius: number] | [horizontal: number, vertical: number]
        : [both: number] | [start: number, end: number]
    : [value: number];

/** 不可调用的 CSS 属性对象；读取第三层关键字或调用方法完成一条声明。 */
export type CssProperty<
  P extends keyof CSS.Properties,
  G extends {
    readonly members: Readonly<Record<string, string>>;
    readonly values: readonly string[];
  },
  U extends keyof typeof units | never,
  N extends 1 | 2 | 4,
  C extends string,
  T extends TokenSchema,
  M extends PropertyTokenMap<T> = object,
> = {
  /** 严格写入系统关键字或 `_主题键`；未知值报错，null/undefined 省略声明。 */
  token(
    value:
      | G['members'][keyof G['members']]
      | G['values'][number]
      | ThemeKeywords<T, TokenCategory<P, C, M>>
      | null
      | undefined,
  ): void;
  /** 开放 CSS 值，保留关键字补全；已知 `_主题键`仍解析，其余字符串原样输出。 */
  raw(
    value:
      | CSS.Properties[P]
      | G['members'][keyof G['members']]
      | G['values'][number]
      | ThemeKeywords<T, TokenCategory<P, C, M>>
      | (string & {})
      | null
      | undefined,
  ): void;
} & Pick<SystemKeywordMembers, keyof G['members'] & keyof SystemKeywordMembers> &
  ([U] extends [never] ? object : UnitMethods<UnitArguments<P, N>>[U]) &
  ThemeMembers<T, TokenCategory<P, C, M>>;
