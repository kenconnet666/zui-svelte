import type * as CSS from 'csstype';
import { keywordGroups, propertyMetadata } from './metadata.generated.js';
import { units } from './schema.js';
import type { StyleProperties } from './properties.generated.js';
import type { Instruction, StyleProgram } from './program.js';
import { validateQuery, validateValue } from './validate.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { lightTheme, type DefaultTokens } from '../theme/presets.js';
import { validateLayer, layerProgram } from './layers.js';
import { setTokenUses, type TokenUse } from '../theme/requirements.js';
import { tokenValueKinds } from '../theme/types.js';
import type { PropertyTokenMap } from './carrier.js';
export type { PropertyTokenMap } from './carrier.js';

export interface StyleHelpers<T extends TokenSchema, M extends PropertyTokenMap<T> = object> {
  _selector(selector: string, factory: StyleFactory<T, M>): void;
  _media(query: string, factory: StyleFactory<T, M>): void;
  _supports(query: string, factory: StyleFactory<T, M>): void;
  _container(query: string, factory: StyleFactory<T, M>): void;
  _hover(factory: StyleFactory<T, M>): void;
  _focusVisible(factory: StyleFactory<T, M>): void;
  _before(factory: StyleFactory<T, M>): void;
  _after(factory: StyleFactory<T, M>): void;
  _important(factory: StyleFactory<T, M>): void;
  custom(name: `--${string}`, value: string | number | null | undefined): void;
  raw(property: string, value: string | number | null | undefined): void;
  set<P extends keyof CSS.Properties>(property: P, value: CSS.Properties[P] | null): void;
}

export type StyleBuilder<
  T extends TokenSchema = DefaultTokens,
  M extends PropertyTokenMap<T> = object,
> = StyleProperties<T, M> & StyleHelpers<T, M>;
export type StyleFactory<
  T extends TokenSchema = DefaultTokens,
  M extends PropertyTokenMap<T> = object,
> = (s: StyleBuilder<T, M>) => void;

interface Metadata {
  name: string;
  group: number;
  units?: keyof typeof units;
  arity?: number;
  tokens?: string;
}
const metadata: Readonly<Record<string, Metadata>> = propertyMetadata;

export function validateTokenMap(
  theme: Theme<TokenSchema>,
  mapping: Readonly<Record<string, string | undefined>>,
): void {
  for (const [property, category] of Object.entries(mapping)) {
    if (!Object.hasOwn(metadata, property))
      throw new TypeError('Unknown mapped CSS property: ' + property);
    if (category === undefined) continue;
    if (!Object.hasOwn(theme.resolved, category))
      throw new TypeError('Unknown mapped token category: ' + category);
    const expected = (tokenValueKinds as Readonly<Record<string, string>>)[
      metadata[property]!.tokens ?? ''
    ];
    if (
      expected &&
      Object.values(theme.resolved[category]!).some((value) => typeof value !== expected)
    )
      throw new TypeError('Incompatible token category for CSS property: ' + property);
  }
}

// 公开重载保留完整类型，收集器擦除回调类型，避免在实现中反复展开全部 CSS 属性。
type RuntimeFactory = (builder: never) => void;
function invoke(factory: RuntimeFactory, s: unknown): void {
  const result: unknown = factory(s as never);
  if (result !== undefined)
    throw new TypeError('A style callback must be synchronous and return void.');
}

export function buildStyle<T extends TokenSchema = DefaultTokens>(
  factory: StyleFactory<T>,
  theme?: Theme<T>,
  layer?: string,
): StyleProgram;
export function buildStyle<T extends TokenSchema, const M extends PropertyTokenMap<T>>(
  factory: StyleFactory<T, M>,
  theme: Theme<T> | undefined,
  layer: string | undefined,
  tokenMap: M | undefined,
): StyleProgram;
export function buildStyle(
  factory: RuntimeFactory,
  theme: Theme<TokenSchema> = lightTheme,
  layer?: string,
  tokenMap?: Readonly<Record<string, string | undefined>>,
): StyleProgram {
  if (layer !== undefined) validateLayer(layer);
  if (tokenMap) validateTokenMap(theme, tokenMap);
  const nodes: Instruction[] = [];
  const tokens = new Map<string, TokenUse>();

  function builder(target: Instruction[], important = false): StyleHelpers<TokenSchema> {
    const carriers = new Map<string, unknown>();
    const append = (property: string, value: unknown) => {
      if (value === null || value === undefined) return;
      if (typeof value !== 'string' && (typeof value !== 'number' || !Number.isFinite(value))) {
        throw new TypeError('Invalid value for CSS property: ' + property);
      }
      target.push(
        Object.freeze({
          kind: 'declaration',
          property,
          value: validateValue(String(value)),
          important,
        }),
      );
    };
    const nest = (query: string, callback: RuntimeFactory) => {
      const children: Instruction[] = [];
      invoke(callback, builder(children, important));
      if (children.length)
        target.push(Object.freeze({ kind: 'rule', query, children: Object.freeze(children) }));
    };
    const helpers: StyleHelpers<TokenSchema> = {
      _selector: (query, callback) => nest(validateQuery(query), callback),
      _media: (query, callback) => nest('@media ' + validateQuery(query, true), callback),
      _supports: (query, callback) => nest('@supports ' + validateQuery(query, true), callback),
      _container: (query, callback) => nest('@container ' + validateQuery(query, true), callback),
      _hover: (callback) => nest('&:hover', callback),
      _focusVisible: (callback) => nest('&:focus-visible', callback),
      _before: (callback) => nest('&::before', callback),
      _after: (callback) => nest('&::after', callback),
      _important: (callback) => invoke(callback, builder(target, true)),
      custom(name, value) {
        if (!/^--[a-zA-Z_][\w-]*$/u.test(name))
          throw new TypeError('Invalid custom property name.');
        append(name, value);
      },
      set(property, value) {
        const entry = Object.hasOwn(metadata, property) ? metadata[property] : undefined;
        if (!entry) throw new TypeError('Unknown CSS property: ' + property);
        append(entry.name, value);
      },
      raw(property, value) {
        if (!/^-?[a-z][a-z0-9-]*$/u.test(property))
          throw new TypeError('Invalid CSS property name.');
        append(property, value);
      },
    };

    return new Proxy(helpers, {
      get(object, key) {
        if (key === 'then' || typeof key !== 'string') return undefined;
        if (Object.hasOwn(object, key)) return Reflect.get(object, key);
        if (carriers.has(key)) return carriers.get(key);
        const entry = Object.hasOwn(metadata, key) ? metadata[key] : undefined;
        if (!entry) throw new TypeError('Unknown CSS property: ' + key);
        const carrier = new Proxy((value: unknown) => append(entry.name, value), {
          get(_object, member) {
            if (typeof member !== 'string' || member === 'then') return undefined;
            const keywords: Readonly<Record<string, string>> = keywordGroups[entry.group]!;
            if (Object.hasOwn(keywords, member)) {
              append(entry.name, keywords[member]);
              return undefined;
            }
            if (member.startsWith('_')) {
              const category = tokenMap?.[key] ?? entry.tokens;
              if (!category) throw new TypeError('CSS property has no token category: ' + key);
              append(entry.name, 'var(' + theme.variable(category, member.slice(1)) + ')');
              tokens.set(
                JSON.stringify([category, member]),
                Object.freeze({
                  namespace: theme.namespace,
                  category,
                  token: member.slice(1),
                  kind:
                    typeof theme.resolved[category]![member.slice(1)] === 'number'
                      ? 'number'
                      : 'string',
                }),
              );
              return undefined;
            }
            const supported: readonly string[] = entry.units ? units[entry.units] : [];
            if (supported.includes(member))
              return (...values: number[]) => {
                if (
                  !values.length ||
                  values.length > (entry.arity ?? 1) ||
                  values.some((value) => !Number.isFinite(value))
                ) {
                  throw new TypeError('Invalid unit arguments: ' + key + '.' + member);
                }
                append(
                  entry.name,
                  values
                    .map((value) => String(value) + (member === 'pct' ? '%' : member))
                    .join(' '),
                );
              };
            throw new TypeError('Unknown CSS keyword or unit: ' + key + '.' + member);
          },
        });
        carriers.set(key, carrier);
        return carrier;
      },
    });
  }

  invoke(factory, builder(nodes));
  const program = layerProgram(Object.freeze(nodes), layer);
  setTokenUses(program, [...tokens.values()]);
  return program;
}
