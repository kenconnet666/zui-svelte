import type * as CSS from 'csstype';
import type { units } from './schema.js';
import type { TokenSchema } from '../theme/types.js';

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
> = ((value: NonNullable<CSS.Properties[P]> | null | undefined) => void) & {
  readonly [Keyword in K]: void;
} & { readonly [Unit in (typeof units)[U][number]]: (...values: UnitArguments<N>) => void } & {
  readonly [Token in C extends keyof T ? keyof T[C] & string : never as `_${Token}`]: void;
};
