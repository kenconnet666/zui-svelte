export type TokenValue = string | number;
export type TokenSchema = Readonly<Record<string, Readonly<Record<string, TokenValue>>>>;

export type WidenTokens<T extends TokenSchema> = {
  readonly [C in keyof T]: { readonly [K in keyof T[C]]: T[C][K] extends number ? number : string };
};

export type ThemePatch<T extends TokenSchema> = {
  readonly [C in keyof T]?: {
    readonly [K in keyof T[C]]?: T[C][K] extends number ? number : string;
  };
};

export type ExtendedTokens<A extends TokenSchema, B extends TokenSchema> = {
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
  variable(category: string, token: string): string;
}
