import type * as CSS from 'csstype';
import { StyleError } from './errors.js';
import { keywordGroups, propertyMetadata } from './metadata.generated.js';
import { units } from './schema.js';
import type { StyleProperties } from './properties.generated.js';
import type { Instruction, StyleProgram } from './program.js';
import { validateQuery, validateValue } from './validate.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { baseTheme } from '../theme/base.js';
import { validateLayer, layerProgram } from './layers.js';
import { setTokenUses, type TokenUse } from '../theme/requirements.js';
import { tokenValueKinds } from '../theme/types.js';
import type { PropertyTokenMap } from './property.js';
export type { PropertyTokenMap } from './property.js';

export interface StyleHelpers<T extends TokenSchema, M extends PropertyTokenMap<T> = object> {
  /** 相对当前元素的嵌套选择器，必须包含 &；不隐式提升选择器优先级。 */
  _selector(selector: string, factory: StyleFactory<T, M>): void;
  /** 原生媒体查询；回调内使用同一主题和属性规则。 */
  _media(query: string, factory: StyleFactory<T, M>): void;
  /** CSS 功能查询，例如 (display: grid)。 */
  _supports(query: string, factory: StyleFactory<T, M>): void;
  /** 原生容器查询；容器本身由调用方声明。 */
  _container(query: string, factory: StyleFactory<T, M>): void;
  /** 当前元素的 :hover 状态。 */
  _hover(factory: StyleFactory<T, M>): void;
  /** 当前元素的 :focus-visible 状态，保留键盘焦点可见性。 */
  _focusVisible(factory: StyleFactory<T, M>): void;
  /** 当前元素的 ::before 伪元素。 */
  _before(factory: StyleFactory<T, M>): void;
  /** 当前元素的 ::after 伪元素。 */
  _after(factory: StyleFactory<T, M>): void;
  /** 将内部声明标为 !important；层顺序仍服从原生 CSS。 */
  _important(factory: StyleFactory<T, M>): void;
  /** 显式写入自定义属性，不等同自动动态提升的内部变量。 */
  custom(name: `--${string}`, value: string | number | null | undefined): void;
  /** 原样写入属性和值；不解析主题前缀，但仍检查声明边界。 */
  raw(property: string, value: string | number | null | undefined): void;
  /** 按原生 CSS 属性类型直接赋值，不解析主题前缀。 */
  set<P extends keyof CSS.Properties>(property: P, value: CSS.Properties[P] | null): void;
}

export type StyleBuilder<
  T extends TokenSchema = Record<never, never>,
  M extends PropertyTokenMap<T> = object,
> = StyleProperties<T, M> & StyleHelpers<T, M>;
export type StyleFactory<
  T extends TokenSchema = Record<never, never>,
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
// 元数据集合按实际使用的组惰性建立，避免每个属性或每个 runtime 重复分配。
const keywordSets = new Map<number, ReadonlySet<string>>();

export function validateTokenMap(
  theme: Theme<TokenSchema>,
  mapping: Readonly<Record<string, string | undefined>>,
): void {
  for (const [property, category] of Object.entries(mapping)) {
    if (!Object.hasOwn(metadata, property))
      throw new StyleError('css.value', 'Unknown mapped CSS property: ' + property);
    if (category === undefined) continue;
    if (!Object.hasOwn(theme.resolved, category))
      throw new StyleError('css.value', 'Unknown mapped token category: ' + category);
    const expected = (tokenValueKinds as Readonly<Record<string, string>>)[
      metadata[property]!.tokens ?? ''
    ];
    if (
      expected &&
      Object.values(theme.resolved[category]!).some((value) => typeof value !== expected)
    )
      throw new StyleError(
        'theme.invalid',
        'Incompatible token category for CSS property: ' + property,
      );
  }
}

// 公开重载保留完整类型，收集器擦除回调类型，避免在实现中反复展开全部 CSS 属性。
type RuntimeFactory = (builder: never) => void;
function invoke(factory: RuntimeFactory, s: unknown): void {
  const result: unknown = factory(s as never);
  if (result !== undefined) {
    // 已同步拒绝异步回调，消费其拒绝，避免同一误用再产生未处理的 Promise 异常。
    if (
      result !== null &&
      (typeof result === 'object' || typeof result === 'function') &&
      typeof Reflect.get(result, 'then') === 'function'
    )
      void Promise.resolve(result).catch(() => {});
    throw new StyleError(
      'runtime.context',
      'A style callback must be synchronous and return void.',
    );
  }
}

export function buildStyle<T extends TokenSchema = Record<never, never>>(
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
  theme: Theme<TokenSchema> = baseTheme,
  layer?: string,
  tokenMap?: Readonly<Record<string, string | undefined>>,
): StyleProgram {
  if (layer !== undefined) validateLayer(layer);
  if (tokenMap) validateTokenMap(theme, tokenMap);
  const nodes: Instruction[] = [];
  const tokens = new Map<string, TokenUse>();

  function builder(target: Instruction[], important = false): StyleHelpers<TokenSchema> {
    const properties = new Map<string, unknown>();
    const append = (property: string, value: unknown) => {
      if (value === null || value === undefined) return;
      if (typeof value !== 'string' && (typeof value !== 'number' || !Number.isFinite(value))) {
        throw new StyleError('css.value', 'Invalid value for CSS property: ' + property);
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
          throw new StyleError('css.value', 'Invalid custom property name.');
        append(name, value);
      },
      set(property, value) {
        const entry = Object.hasOwn(metadata, property) ? metadata[property] : undefined;
        if (!entry) throw new StyleError('css.value', 'Unknown CSS property: ' + property);
        append(entry.name, value);
      },
      raw(property, value) {
        if (!/^-?[a-z][a-z0-9-]*$/u.test(property))
          throw new StyleError('css.value', 'Invalid CSS property name.');
        append(property, value);
      },
    };

    return new Proxy(helpers, {
      get(object, key) {
        if (key === 'then' || typeof key !== 'string') return undefined;
        if (Object.hasOwn(object, key)) return Reflect.get(object, key);
        if (properties.has(key)) return properties.get(key);
        const entry = Object.hasOwn(metadata, key) ? metadata[key] : undefined;
        if (!entry) throw new StyleError('css.value', 'Unknown CSS property: ' + key);
        const category = tokenMap?.[key] ?? entry.tokens;
        const writeToken = (token: string) => {
          if (!category)
            throw new StyleError('css.value', 'CSS property has no token category: ' + key);
          append(entry.name, 'var(' + theme.variable(category, token) + ')');
          tokens.set(
            JSON.stringify([category, token]),
            Object.freeze({
              namespace: theme.namespace,
              category,
              token,
              kind: typeof theme.resolved[category]![token] === 'number' ? 'number' : 'string',
            }),
          );
        };
        const writeValue = (value: unknown) => {
          // raw 只解析已存在的完整主题键；其余值仍是开放 CSS，不替换内部片段。
          if (
            typeof value === 'string' &&
            value.startsWith('_') &&
            category &&
            Object.hasOwn(theme.resolved[category] ?? {}, value.slice(1))
          ) {
            writeToken(value.slice(1));
            return;
          }
          append(entry.name, value);
        };
        const group = keywordGroups[entry.group]!;
        const property = new Proxy(
          {
            token(value: unknown) {
              if (value === null || value === undefined) return;
              if (typeof value !== 'string')
                throw new StyleError('css.value', 'Expected CSS keyword or theme token: ' + key);
              if (value.startsWith('_')) {
                writeToken(value.slice(1));
                return;
              }
              let knownValues = keywordSets.get(entry.group);
              if (!knownValues) {
                knownValues = new Set([...Object.values(group.members), ...group.values]);
                keywordSets.set(entry.group, knownValues);
              }
              if (!knownValues.has(value))
                throw new StyleError('css.value', 'Unknown CSS keyword for ' + key + ': ' + value);
              append(entry.name, value);
            },
            raw: writeValue,
          },
          {
            get(_object, member) {
              if (typeof member !== 'string' || member === 'then') return undefined;
              if (Object.hasOwn(_object, member)) return Reflect.get(_object, member);
              const keywords: Readonly<Record<string, string>> = group.members;
              if (Object.hasOwn(keywords, member)) {
                append(entry.name, keywords[member]);
                return undefined;
              }
              if (member.startsWith('_')) {
                writeToken(member.slice(1));
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
                    throw new StyleError(
                      'css.value',
                      'Invalid unit arguments: ' + key + '.' + member,
                    );
                  }
                  append(
                    entry.name,
                    values
                      .map((value) => String(value) + (member === 'pct' ? '%' : member))
                      .join(' '),
                  );
                };
              throw new StyleError(
                'css.value',
                'Unknown CSS keyword or unit: ' + key + '.' + member,
              );
            },
          },
        );
        properties.set(key, property);
        return property;
      },
    });
  }

  invoke(factory, builder(nodes));
  const program = layerProgram(Object.freeze(nodes), layer);
  setTokenUses(program, [...tokens.values()]);
  return program;
}
