import type {
  ExtendedTokens,
  Theme,
  ThemePatch,
  TokenSchema,
  TokenValue,
  WidenTokens,
} from './types.js';

function encode(value: string): string {
  // 连分隔符也编码，防止 a-b/c 与 a/b-c 等不同路径产生相同变量名。
  return [...value]
    .map((c) => (/[a-zA-Z0-9]/u.test(c) ? c : '_' + c.codePointAt(0)!.toString(16) + '_'))
    .join('');
}

export function defineTheme<const T extends TokenSchema>(
  tokens: T,
  options: { namespace?: string } = {},
): Theme<WidenTokens<T>> {
  const namespace = options.namespace ?? 'z';
  if (!/^[a-zA-Z][\w-]*$/u.test(namespace)) throw new TypeError('Invalid theme namespace.');
  const copied: Record<string, Readonly<Record<string, TokenValue>>> = Object.create(null);
  for (const [category, entries] of Object.entries(tokens)) {
    if (!category || !entries || typeof entries !== 'object' || Array.isArray(entries)) {
      throw new TypeError('Invalid theme category: ' + category);
    }
    const values: Record<string, TokenValue> = Object.create(null);
    for (const [key, value] of Object.entries(entries)) {
      if (
        !key ||
        (typeof value !== 'string' && typeof value !== 'number') ||
        (typeof value === 'number' && !Number.isFinite(value))
      ) {
        throw new TypeError('Invalid theme token: ' + category + '.' + key);
      }
      values[key] = value;
    }
    copied[category] = Object.freeze(values);
  }
  const snapshot = Object.freeze(copied);
  return Object.freeze({
    namespace,
    tokens: snapshot as WidenTokens<T>,
    variable(category: string, token: string) {
      if (!Object.hasOwn(snapshot[category] ?? {}, token)) {
        throw new TypeError('Unknown theme token: ' + category + '.' + token);
      }
      return '--' + namespace + '-' + encode(category) + '-' + encode(token);
    },
  });
}

export function extendTheme<A extends TokenSchema, const B extends TokenSchema>(
  theme: Theme<A>,
  extension: B,
): Theme<WidenTokens<ExtendedTokens<A, B>>> {
  const merged = Object.fromEntries(
    Object.entries(theme.tokens).map(([key, values]) => [key, { ...values }]),
  );
  for (const [key, values] of Object.entries(extension))
    merged[key] = { ...merged[key], ...values };
  return defineTheme(merged as ExtendedTokens<A, B>, { namespace: theme.namespace });
}

export function overrideTheme<T extends TokenSchema>(
  theme: Theme<T>,
  patch: ThemePatch<T>,
): Theme<WidenTokens<T>> {
  const merged = Object.fromEntries(
    Object.entries(theme.tokens).map(([key, values]) => [key, { ...values }]),
  );
  for (const [category, values] of Object.entries(patch)) {
    if (!Object.hasOwn(merged, category))
      throw new TypeError('Unknown theme category: ' + category);
    for (const [key, value] of Object.entries(values ?? {})) {
      if (!Object.hasOwn(merged[category]!, key))
        throw new TypeError('Unknown theme token: ' + category + '.' + key);
      if (value === undefined) continue;
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new TypeError('Invalid theme override: ' + category + '.' + key);
      }
      merged[category]![key] = value;
    }
  }
  return defineTheme(merged as T, { namespace: theme.namespace });
}
