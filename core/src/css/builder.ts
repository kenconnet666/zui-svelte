import type * as CSS from 'csstype';
import { keywordGroups, propertyMetadata } from './metadata.generated.js';
import { units } from './schema.js';
import type { StyleProperties } from './properties.generated.js';
import type { Instruction, StyleProgram } from './program.js';
import { validateQuery, validateValue } from './validate.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { lightTheme, type DefaultTokens } from '../theme/presets.js';

export interface StyleHelpers<T extends TokenSchema> {
  _selector(selector: string, factory: StyleFactory<T>): void;
  _media(query: string, factory: StyleFactory<T>): void;
  _supports(query: string, factory: StyleFactory<T>): void;
  _container(query: string, factory: StyleFactory<T>): void;
  _hover(factory: StyleFactory<T>): void;
  _focusVisible(factory: StyleFactory<T>): void;
  _before(factory: StyleFactory<T>): void;
  _after(factory: StyleFactory<T>): void;
  _important(factory: StyleFactory<T>): void;
  custom(name: `--${string}`, value: string | number | null | undefined): void;
  set<P extends keyof CSS.Properties>(property: P, value: CSS.Properties[P] | null): void;
}

export type StyleBuilder<T extends TokenSchema = DefaultTokens> = StyleProperties<T> &
  StyleHelpers<T>;
export type StyleFactory<T extends TokenSchema = DefaultTokens> = (s: StyleBuilder<T>) => void;

interface Metadata {
  name: string;
  group: number;
  units?: keyof typeof units;
  arity?: number;
  tokens?: string;
}
const metadata: Readonly<Record<string, Metadata>> = propertyMetadata;

function invoke<T extends TokenSchema>(factory: StyleFactory<T>, s: StyleBuilder<T>): void {
  const result: unknown = factory(s);
  if (result !== undefined)
    throw new TypeError('A style callback must be synchronous and return void.');
}

export function buildStyle<T extends TokenSchema = DefaultTokens>(
  factory: StyleFactory<T>,
  theme: Theme<T> = lightTheme as unknown as Theme<T>,
): StyleProgram {
  const nodes: Instruction[] = [];

  function builder(target: Instruction[], important = false): StyleBuilder<T> {
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
    const nest = (query: string, callback: StyleFactory<T>) => {
      const children: Instruction[] = [];
      invoke(callback, builder(children, important));
      if (children.length)
        target.push(Object.freeze({ kind: 'rule', query, children: Object.freeze(children) }));
    };
    const helpers: StyleHelpers<T> = {
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
              if (!entry.tokens) throw new TypeError('CSS property has no token category: ' + key);
              append(entry.name, 'var(' + theme.variable(entry.tokens, member.slice(1)) + ')');
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
    }) as StyleBuilder<T>;
  }

  invoke(factory, builder(nodes));
  return Object.freeze(nodes);
}
