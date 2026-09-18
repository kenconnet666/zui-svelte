export type TokenValue = string | number;
export type TokenSchema = Readonly<Record<string, Readonly<Record<string, TokenValue>>>>;

export interface TokenReference<C extends string = string, K extends string = string> {
  readonly kind: 'token-ref';
  readonly category: C;
  readonly token: K;
}
export type ThemeDefinition = Readonly<
  Record<string, Readonly<Record<string, TokenValue | TokenReference>>>
>;

// 类型与运行时共用类别约束；fontWeight/lineHeight 允许标准字符串或数值。
export const tokenValueKinds = {
  color: 'string',
  spacing: 'string',
  size: 'string',
  radius: 'string',
  borderWidth: 'string',
  fontFamily: 'string',
  fontSize: 'string',
  letterSpacing: 'string',
  duration: 'string',
  easing: 'string',
  shadow: 'string',
  breakpoint: 'string',
  opacity: 'number',
  zIndex: 'number',
} as const;

type CategoryValue<C> = C extends keyof typeof tokenValueKinds
  ? (typeof tokenValueKinds)[C] extends 'number'
    ? number
    : string
  : TokenValue;

// 限制声明文件递归成本；更深的链保留值联合类型，运行时仍完整校验依赖。
type ResolveValue<T extends ThemeDefinition, V, Depth extends unknown[] = []> =
  V extends TokenReference<infer C, infer K>
    ? Depth['length'] extends 8
      ? TokenValue
      : C extends keyof T
        ? K extends keyof T[C]
          ? ResolveValue<T, T[C][K], [...Depth, unknown]>
          : never
        : never
    : V extends number
      ? number
      : string;

export type ResolvedTokens<T extends ThemeDefinition> = {
  readonly [C in keyof T]: { readonly [K in keyof T[C]]: ResolveValue<T, T[C][K]> };
};

export type WidenTokens<T extends TokenSchema> = {
  readonly [C in keyof T]: { readonly [K in keyof T[C]]: T[C][K] extends number ? number : string };
};

export type ValidReferences<T extends ThemeDefinition, Input extends ThemeDefinition = T> = {
  readonly [C in keyof Input]: {
    readonly [K in keyof Input[C]]: Input[C][K] extends TokenReference<infer RC, infer RK>
      ? RC extends C
        ? C extends keyof T
          ? RK extends keyof T[C]
            ? Input[C][K]
            : never
          : never
        : never
      : Input[C][K] extends CategoryValue<C>
        ? Input[C][K]
        : never;
  };
};

export type CompatibleExtension<A extends TokenSchema, B extends ThemeDefinition> = {
  readonly [C in keyof B]: {
    readonly [K in keyof B[C]]: C extends keyof A
      ? K extends keyof A[C]
        ? B[C][K] extends TokenReference
          ? B[C][K]
          : B[C][K] extends (A[C][K] extends number ? number : string)
            ? B[C][K]
            : never
        : B[C][K]
      : B[C][K];
  };
};

export type ThemePatch<T extends TokenSchema> = {
  readonly [C in keyof T]?: {
    readonly [K in keyof T[C]]?:
      (T[C][K] extends number ? number : string) | TokenReference<C & string, keyof T[C] & string>;
  };
};

export type ExtendedTokens<A extends ThemeDefinition, B extends ThemeDefinition> = {
  readonly [C in keyof A | keyof B]: C extends keyof B
    ? C extends keyof A
      ? Omit<A[C], keyof B[C]> & B[C]
      : B[C]
    : C extends keyof A
      ? A[C]
      : never;
};

export interface Theme<T extends TokenSchema = TokenSchema> {
  readonly namespace: string;
  readonly tokens: T;
  readonly resolved: T;
  readonly definition: ThemeDefinition;
  variable<C extends keyof T & string>(category: C, token: keyof T[C] & string): string;
  ref<C extends keyof T & string>(category: C, token: keyof T[C] & string): string;
}
