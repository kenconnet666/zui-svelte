import type {
  ExtendedTokens,
  Theme,
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
import { tokenValueKinds } from './types.js';
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
  options: { namespace?: string } = {},
): Theme<ResolvedTokens<T>> {
  return createTheme(tokens, options.namespace ?? 'z') as Theme<ResolvedTokens<T>>;
}

function createTheme(tokens: ThemeDefinition, namespace: string): Theme<TokenSchema> {
  if (!/^[a-zA-Z][\w-]*$/u.test(namespace)) throw new TypeError('Invalid theme namespace.');
  const copied: Record<
    string,
    Readonly<Record<string, TokenValue | TokenReference>>
  > = Object.create(null);
  for (const [category, entries] of Object.entries(tokens)) {
    if (!category || !entries || typeof entries !== 'object' || Array.isArray(entries)) {
      throw new TypeError('Invalid theme category: ' + category);
    }
    const values: Record<string, TokenValue | TokenReference> = Object.create(null);
    for (const [key, value] of Object.entries(entries)) {
      if (value && typeof value === 'object' && value.kind === 'token-ref') {
        if (!key || value.category !== category || typeof value.token !== 'string' || !value.token)
          throw new TypeError('Incompatible theme reference: ' + category + '.' + key);
        values[key] = tokenRef(value.category, value.token);
        continue;
      }
      if (
        !key ||
        (typeof value !== 'string' && typeof value !== 'number') ||
        (typeof value === 'number' && !Number.isFinite(value))
      ) {
        throw new TypeError('Invalid theme token: ' + category + '.' + key);
      }
      validateValue(String(value));
      const expected = (tokenValueKinds as Readonly<Record<string, string>>)[category];
      if (expected && typeof value !== expected)
        throw new TypeError('Invalid theme token category: ' + category + '.' + key);
      values[key] = value;
    }
    copied[category] = Object.freeze(values);
  }
  const definition = Object.freeze(copied);
  const resolved: Record<string, Record<string, TokenValue>> = Object.create(null);
  for (const category of Object.keys(definition)) resolved[category] = Object.create(null);
  const visiting = new Set<string>();
  function resolve(category: string, key: string): TokenValue {
    if (!Object.hasOwn(definition[category] ?? {}, key))
      throw new TypeError('Unknown theme reference: ' + category + '.' + key);
    if (Object.hasOwn(resolved[category]!, key)) return resolved[category]![key]!;
    const path = JSON.stringify([category, key]);
    if (visiting.has(path))
      throw new TypeError('Circular theme reference: ' + category + '.' + key);
    visiting.add(path);
    const value = definition[category]![key]!;
    const result = typeof value === 'object' ? resolve(value.category, value.token) : value;
    visiting.delete(path);
    resolved[category]![key] = result;
    return result;
  }
  for (const [category, entries] of Object.entries(definition)) {
    for (const key of Object.keys(entries)) resolve(category, key);
    Object.freeze(resolved[category]);
  }
  const snapshot = Object.freeze(resolved);
  function variable(category: string, token: string): string {
    if (!Object.hasOwn(snapshot[category] ?? {}, token))
      throw new TypeError('Unknown theme token: ' + category + '.' + token);
    return '--' + namespace + '-' + encodeSegment(category) + '-' + encodeSegment(token);
  }
  return Object.freeze({
    namespace,
    tokens: snapshot,
    resolved: snapshot,
    definition,
    variable,
    ref: (category: string, token: string) => 'var(' + variable(category, token) + ')',
  });
}

export function extendTheme<A extends TokenSchema, const B extends ThemeDefinition>(
  theme: Theme<A>,
  extension: B & ValidReferences<ExtendedTokens<A, B>, B> & CompatibleExtension<A, B>,
): Theme<ResolvedTokens<ExtendedTokens<A, B>>> {
  const merged = Object.fromEntries(
    Object.entries(theme.definition).map(([key, values]) => [key, { ...values }]),
  );
  for (const [key, values] of Object.entries(extension))
    merged[key] = { ...merged[key], ...values };
  const result = createTheme(merged, theme.namespace);
  validateReplacement(theme.tokens, result.tokens);
  return result as Theme<ResolvedTokens<ExtendedTokens<A, B>>>;
}

export function overrideTheme<T extends TokenSchema>(
  theme: Theme<T>,
  patch: ThemePatch<T>,
): Theme<WidenTokens<T>> {
  const merged = Object.fromEntries(
    Object.entries(theme.definition).map(([key, values]) => [key, { ...values }]),
  );
  for (const [category, values] of Object.entries(patch)) {
    if (!Object.hasOwn(merged, category))
      throw new TypeError('Unknown theme category: ' + category);
    for (const [key, value] of Object.entries(values ?? {})) {
      if (!Object.hasOwn(merged[category]!, key))
        throw new TypeError('Unknown theme token: ' + category + '.' + key);
      if (value === undefined) continue;
      if (typeof value !== 'string' && typeof value !== 'number' && !isReference(value))
        throw new TypeError('Invalid theme override: ' + category + '.' + key);
      merged[category]![key] = value;
    }
  }
  const result = createTheme(merged, theme.namespace);
  validateReplacement(theme.tokens, result.tokens);
  return result as Theme<WidenTokens<T>>;
}

function validateReplacement(previous: TokenSchema, next: TokenSchema): void {
  for (const [category, tokens] of Object.entries(previous))
    for (const [key, value] of Object.entries(tokens))
      if (typeof next[category]?.[key] !== typeof value)
        throw new TypeError('Theme token value type cannot change: ' + category + '.' + key);
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
