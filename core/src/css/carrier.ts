import type * as CSS from 'csstype';
import type { units } from './schema.js';
import type { TokenSchema } from '../theme/types.js';

export type PropertyTokenMap<T extends TokenSchema> = Partial<
  Record<keyof CSS.Properties, keyof T & string>
>;
type TokenCategory<P extends PropertyKey, C extends string, M> = P extends keyof M
  ? Exclude<M[P], undefined> | (undefined extends M[P] ? C : never)
  : C;

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
} & { readonly [Unit in (typeof units)[U][number]]: (...values: UnitArguments<N>) => void } & {
  readonly [
    Token in TokenCategory<P, C, M> extends keyof T
      ? keyof T[TokenCategory<P, C, M>] & string
      : never as `_${Token}`
  ]: void;
};
