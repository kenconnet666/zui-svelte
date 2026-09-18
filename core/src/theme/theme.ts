import { StyleError } from '../css/errors.js';
import type {
  ExtendedTokens,
  Theme,
  ThemeOptions,
  ThemePatch,
  TokenSchema,
  TokenValue,
  WidenTokens,
  ThemeDefinition,
  TokenReference,
  ValidReferences,
  ResolvedTokens,
  CompatibleExtension,
} from './types.js';
import { matchesTokenKind, tokenValueKinds } from './types.js';
import { validateValue } from '../css/validate.js';
import { encodeSegment } from '../css/identifiers.js';

export function tokenRef<const C extends string, const K extends string>(
  category: C,
  token: K,
): TokenReference<C, K> {
  return Object.freeze({ kind: 'token-ref', category, token });
}

export function defineTheme<const T extends ThemeDefinition>(
  tokens: T & ValidReferences<T>,
  options: ThemeOptions = {},
): Theme<ResolvedTokens<T>> {
  return createTheme(tokens, options.namespace ?? 'z', options.colorScheme) as Theme<
    ResolvedTokens<T>
  >;
}

function createTheme(
  tokens: ThemeDefinition,
  namespace: string,
  colorScheme?: 'light' | 'dark',
): Theme<TokenSchema> {
  assertThemeRecord(tokens, 'definition');
  if (!/^[a-zA-Z][\w-]*$/u.test(namespace))
    throw new StyleError('theme.namespace', 'Invalid theme namespace.');
  if (colorScheme !== undefined && colorScheme !== 'light' && colorScheme !== 'dark')
    throw new StyleError('theme.invalid', 'Invalid native color scheme.');
  const copied: Record<
    string,
    Readonly<Record<string, TokenValue | TokenReference>>
  > = Object.create(null);
  for (const [category, entries] of Object.entries(tokens)) {
    if (!category || !entries || typeof entries !== 'object' || Array.isArray(entries)) {
      throw new StyleError('theme.invalid', 'Invalid theme category: ' + category);
    }
    const values: Record<string, TokenValue | TokenReference> = Object.create(null);
    for (const [key, value] of Object.entries(entries)) {
      if (value && typeof value === 'object' && value.kind === 'token-ref') {
        if (!key || value.category !== category || typeof value.token !== 'string' || !value.token)
          throw new StyleError(
            'theme.reference',
            'Incompatible theme reference: ' + category + '.' + key,
          );
        values[key] = tokenRef(value.category, value.token);
        continue;
      }
      if (
        !key ||
        (typeof value !== 'string' && typeof value !== 'number') ||
        (typeof value === 'number' && !Number.isFinite(value))
      ) {
        throw new StyleError('theme.invalid', 'Invalid theme token: ' + category + '.' + key);
      }
      validateValue(String(value));
      const expected = Object.hasOwn(tokenValueKinds, category)
        ? (tokenValueKinds as Readonly<Record<string, string>>)[category]
        : undefined;
      if (expected && typeof value !== expected)
        throw new StyleError(
          'theme.invalid',
          'Invalid theme token category: ' + category + '.' + key,
        );
      values[key] = value;
    }
    copied[category] = Object.freeze(values);
  }
  const definition = Object.freeze(copied);
  const resolved: Record<string, Record<string, TokenValue>> = Object.create(null);
  for (const category of Object.keys(definition)) resolved[category] = Object.create(null);
  function resolve(category: string, key: string): TokenValue {
    if (Object.hasOwn(resolved[category]!, key)) return resolved[category]![key]!;
    const chain = new Set<string>();
    let current = key;
    let result: TokenValue;
    // 每个 Token 只有一个别名目标；迭代解析避免长链耗尽 JS 调用栈。
    for (;;) {
      if (!Object.hasOwn(definition[category]!, current))
        throw new StyleError(
          'theme.reference',
          'Unknown theme reference: ' + category + '.' + current,
        );
      if (Object.hasOwn(resolved[category]!, current)) {
        result = resolved[category]![current]!;
        break;
      }
      if (chain.has(current))
        throw new StyleError(
          'theme.reference',
          'Circular theme reference: ' +
            [...chain, current].map((token) => category + '.' + token).join(' -> '),
        );
      chain.add(current);
      const value = definition[category]![current]!;
      if (typeof value !== 'object') {
        result = value;
        break;
      }
      current = value.token;
    }
    for (const token of chain) resolved[category]![token] = result;
    return result;
  }
  for (const [category, entries] of Object.entries(definition)) {
    for (const key of Object.keys(entries)) resolve(category, key);
    Object.freeze(resolved[category]);
  }
  const snapshot = Object.freeze(resolved);
  const variablePrefix = '--' + encodeSegment(namespace) + '-';
  function variable(category: string, token: string): string {
    if (!Object.hasOwn(snapshot[category] ?? {}, token))
      throw new StyleError('theme.token', 'Unknown theme token: ' + category + '.' + token);
    // 所有片段均编码：主题变量固定三段，不会冒充四段的动态绑定变量。
    return variablePrefix + encodeSegment(category) + '-' + encodeSegment(token);
  }
  return Object.freeze({
    namespace,
    colorScheme,
    resolved: snapshot,
    definition,
    variable,
    ref: (category: string, token: string) => 'var(' + variable(category, token) + ')',
  });
}

export function extendTheme<A extends TokenSchema, const B extends ThemeDefinition>(
  theme: Theme<A>,
  extension: B & ValidReferences<ExtendedTokens<A, B>, B> & CompatibleExtension<A, B>,
  options: Pick<ThemeOptions, 'colorScheme'> = {},
): Theme<ResolvedTokens<ExtendedTokens<A, B>>> {
  assertThemeRecord(extension, 'extension');
  const merged = Object.assign(
    Object.create(null),
    Object.fromEntries(
      Object.entries(theme.definition).map(([key, values]) => [key, { ...values }]),
    ),
  ) as Record<string, Record<string, TokenValue | TokenReference>>;
  for (const [key, values] of Object.entries(extension)) {
    assertThemeRecord(values, 'extension.' + key);
    merged[key] = { ...merged[key], ...values };
  }
  const result = createTheme(merged, theme.namespace, options.colorScheme ?? theme.colorScheme);
  validateReplacement(theme.resolved, result.resolved);
  return result as Theme<ResolvedTokens<ExtendedTokens<A, B>>>;
}

export function overrideTheme<T extends TokenSchema>(
  theme: Theme<T>,
  patch: ThemePatch<T>,
): Theme<WidenTokens<T>> {
  assertThemeRecord(patch, 'overrides');
  const merged = Object.assign(
    Object.create(null),
    Object.fromEntries(
      Object.entries(theme.definition).map(([key, values]) => [key, { ...values }]),
    ),
  ) as Record<string, Record<string, TokenValue | TokenReference>>;
  for (const [category, values] of Object.entries(patch)) {
    if (!Object.hasOwn(merged, category))
      throw new StyleError('theme.invalid', 'Unknown theme category: ' + category);
    if (values !== undefined) assertThemeRecord(values, 'overrides.' + category);
    for (const [key, value] of Object.entries(values ?? {})) {
      if (!Object.hasOwn(merged[category]!, key))
        throw new StyleError('theme.token', 'Unknown theme token: ' + category + '.' + key);
      if (value === undefined) continue;
      if (typeof value !== 'string' && typeof value !== 'number' && !isReference(value))
        throw new StyleError('theme.invalid', 'Invalid theme override: ' + category + '.' + key);
      merged[category]![key] = value;
    }
  }
  const result = createTheme(merged, theme.namespace, theme.colorScheme);
  validateReplacement(theme.resolved, result.resolved);
  return result as Theme<WidenTokens<T>>;
}

/** @internal JS/JSON 消费与 TypeScript 消费遵循相同的对象边界。 */
export function assertThemeRecord(value: unknown, path: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new StyleError('theme.invalid', 'Theme ' + path + ' must be an object.');
}

function validateReplacement(previous: TokenSchema, next: TokenSchema): void {
  for (const [category, tokens] of Object.entries(previous))
    for (const [key, value] of Object.entries(tokens)) {
      if (!Object.hasOwn(next[category] ?? {}, key))
        throw new StyleError('theme.token', 'Missing theme token: ' + category + '.' + key);
      if (!matchesTokenKind(category, next[category]?.[key], typeof value))
        throw new StyleError(
          'theme.token',
          'Theme token value type cannot change: ' + category + '.' + key,
        );
    }
}

/** @internal 宿主和 scope 共用完整 schema 校验；样式消费另按实际 Token 子集检查。 */
export function assertThemeCompatible(base: Theme<TokenSchema>, next: Theme<TokenSchema>): void {
  if (base.namespace !== next.namespace)
    throw new StyleError('theme.namespace', 'Theme namespace mismatch.');
  validateReplacement(base.resolved, next.resolved);
}

export function themeVariables<T extends TokenSchema>(
  theme: Theme<T>,
): Readonly<Record<string, string>> {
  return Object.fromEntries(
    Object.entries(theme.resolved).flatMap(([category, tokens]) =>
      Object.entries(tokens).map(([key, value]) => [
        theme.variable(category, key),
        validateValue(String(value)),
      ]),
    ),
  );
}

/** @internal DOM、样式表和 SSR 共用同一份主题声明，避免输出通道语义分叉。 */
export function themeDeclarations<T extends TokenSchema>(
  theme: Theme<T>,
): Readonly<Record<string, string>> {
  return {
    ...themeVariables(theme),
    ...(theme.colorScheme ? { 'color-scheme': theme.colorScheme } : {}),
  };
}

export function isReference(value: unknown): value is TokenReference {
  return (
    !!value &&
    typeof value === 'object' &&
    'kind' in value &&
    value.kind === 'token-ref' &&
    'category' in value &&
    typeof value.category === 'string' &&
    'token' in value &&
    typeof value.token === 'string'
  );
}
