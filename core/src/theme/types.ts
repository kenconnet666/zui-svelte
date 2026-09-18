export type TokenValue = string | number;
export interface ThemeOptions {
  namespace?: string;
  colorScheme?: 'light' | 'dark';
}
export type TokenSchema = Readonly<Record<string, Readonly<Record<string, TokenValue>>>>;

export interface TokenReference<C extends string = string, K extends string = string> {
  readonly kind: 'token-ref';
  readonly category: C;
  readonly token: K;
}
export type ThemeDefinition = Readonly<
  Record<string, Readonly<Record<string, TokenValue | TokenReference>>>
>;

// 对齐 Object.entries 的键语义：100 与 '100' 指向同一 Token，色阶数字键也保留类型提示。
type NormalizeKeys<T extends ThemeDefinition> = {
  readonly [C in keyof T as `${C & (string | number)}`]: {
    readonly [K in keyof T[C] as `${K & (string | number)}`]: T[C][K];
  };
};

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
      ? CategoryValue<C>
      : C extends keyof T
        ? K extends keyof T[C]
          ? ResolveValue<T, T[C][K], [...Depth, unknown]>
          : never
        : never
    : V extends number
      ? number
      : string;

type ResolveDefinition<T extends ThemeDefinition> = {
  readonly [C in keyof T]: {
    readonly [K in keyof T[C]]: C extends 'fontWeight' | 'lineHeight'
      ? TokenValue
      : ResolveValue<T, T[C][K]>;
  };
};

/** @internal 合法的双值类别必须与解析类型保持一致。 */
export function matchesTokenKind(category: string, value: unknown, kind: string): boolean {
  return (
    typeof value === kind ||
    ((category === 'fontWeight' || category === 'lineHeight') &&
      (typeof value === 'string' || typeof value === 'number'))
  );
}
export type ResolvedTokens<T extends ThemeDefinition> = ResolveDefinition<NormalizeKeys<T>>;

export type WidenTokens<T extends TokenSchema> = {
  readonly [C in keyof T]: { readonly [K in keyof T[C]]: WidenValue<T[C][K]> };
};

// 分布式条件保留深别名解析的联合值，避免 string | number 被整体缩窄为 string。
type WidenValue<V> = V extends number ? number : V extends string ? string : never;

type ReferenceConstraints<T extends ThemeDefinition, Input extends ThemeDefinition> = {
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

export type ValidReferences<
  T extends ThemeDefinition,
  Input extends ThemeDefinition = T,
> = ReferenceConstraints<NormalizeKeys<T>, NormalizeKeys<Input>>;

type ExtensionConstraints<A extends TokenSchema, B extends ThemeDefinition> = {
  readonly [C in keyof B]: {
    readonly [K in keyof B[C]]: C extends keyof A
      ? K extends keyof A[C]
        ? B[C][K] extends TokenReference
          ? B[C][K]
          : B[C][K] extends WidenValue<A[C][K]>
            ? B[C][K]
            : never
        : B[C][K]
      : B[C][K];
  };
};

export type CompatibleExtension<
  A extends TokenSchema,
  B extends ThemeDefinition,
> = ExtensionConstraints<NormalizeKeys<A>, NormalizeKeys<B>>;

export type ThemePatch<T extends TokenSchema> = {
  readonly [C in keyof T]?: {
    readonly [K in keyof T[C]]?:
      WidenValue<T[C][K]> | TokenReference<C & string, keyof T[C] & string>;
  };
};

type MergeDefinitions<A extends ThemeDefinition, B extends ThemeDefinition> = {
  readonly [C in keyof A | keyof B]: C extends keyof B
    ? C extends keyof A
      ? Omit<A[C], keyof B[C]> & B[C]
      : B[C]
    : C extends keyof A
      ? A[C]
      : never;
};

// 收窄重映射后的泛型约束，不引入宽索引签名，避免丢失不存在 Token 的诊断。
export type ExtendedTokens<A extends ThemeDefinition, B extends ThemeDefinition> = Extract<
  MergeDefinitions<NormalizeKeys<A>, NormalizeKeys<B>>,
  ThemeDefinition
>;

export interface Theme<T extends TokenSchema = TokenSchema> {
  readonly namespace: string;
  readonly colorScheme?: 'light' | 'dark';
  readonly resolved: T;
  readonly definition: ThemeDefinition;
  variable<C extends keyof T & string>(category: C, token: keyof T[C] & string): string;
  ref<C extends keyof T & string>(category: C, token: keyof T[C] & string): string;
}
