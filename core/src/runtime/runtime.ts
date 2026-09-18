import type { StyleFactory } from '../css/builder.js';
import { buildStyle } from '../css/builder.js';
import { lightTheme, type DefaultTokens } from '../theme/presets.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { StyleBinding } from './binding.js';
import { StyleRegistry, type RuleRecord } from './registry.js';
import { BrowserStyleSheet, MemoryStyleSheet, type StyleSheet } from './sheet.js';
import { createResources } from './resources.js';
import type { StyleResource, AnimationResource, PropertyRegistration } from './resources.js';
import type * as CSS from 'csstype';
import { validateLayer } from '../css/layers.js';
import { runAll } from './callbacks.js';

const targets = new WeakMap<Document | ShadowRoot, Map<string, readonly string[]>>();

export interface RuntimeOptions<T extends TokenSchema> {
  theme?: Theme<T>;
  target?: Document | ShadowRoot;
  sheet?: StyleSheet;
  namespace?: string;
  nonce?: string;
  prefix?: boolean;
  variables?: 'inline' | 'stylesheet';
  layers?: readonly string[];
  layer?: string;
}

export interface RuntimeStats {
  readonly bindings: number;
  readonly rules: number;
  readonly sources: number;
  readonly styleEntries: number;
  readonly ruleCompilations: number;
}

export interface StyleRuntime<T extends TokenSchema = DefaultTokens> {
  /** @internal 编译接入暂用；业务通过其他方法管理样式。 */
  readonly registry: StyleRegistry;
  readonly theme: Theme<T>;
  readonly layer?: string;
  readonly bindingCount: number;
  readonly stats: RuntimeStats;
  global(selector: string, factory: StyleFactory<T>): StyleResource;
  themeStyle(selector: string, theme?: Theme<T>): StyleResource;
  keyframes(frames: Readonly<Record<string, StyleFactory<T>>>): AnimationResource;
  fontFace(descriptors: CSS.AtRule.FontFace): StyleResource;
  property(name: `--${string}`, options: PropertyRegistration): StyleResource;
  css(factory: StyleFactory<T>, source?: string): string;
  binding(settings?: {
    id?: string;
    source?: string;
    maxStructures?: number;
    promote?: boolean;
  }): StyleBinding<T>;
  release(binding: StyleBinding<T>): void;
  cssText(): string;
  styleTags(): string;
  finishHydration(): void;
  dispose(): void;
}

export function createRuntime<T extends TokenSchema = DefaultTokens>(
  options: RuntimeOptions<T> = {},
): StyleRuntime<T> {
  options = { ...options };
  if (options.target && options.sheet)
    throw new TypeError('Choose a target or a stylesheet, not both.');
  if (
    options.variables !== undefined &&
    options.variables !== 'inline' &&
    options.variables !== 'stylesheet'
  )
    throw new TypeError('Unknown variable output channel.');
  const namespace = options.namespace ?? 'z';
  if (!/^[a-zA-Z][\w-]*$/u.test(namespace)) throw new TypeError('Invalid style namespace.');
  const layers = Object.freeze((options.layers ?? []).map(validateLayer));
  if (new Set(layers).size !== layers.length) throw new TypeError('Duplicate CSS layer.');
  if (options.layer !== undefined && !layers.includes(options.layer))
    throw new TypeError('The default CSS layer must be declared.');
  const owners = options.target
    ? (targets.get(options.target) ?? new Map<string, readonly string[]>())
    : undefined;
  if (owners?.has(namespace))
    throw new Error('A runtime already owns this target namespace: ' + namespace);
  for (const existing of owners?.values() ?? []) {
    const roots = new Set(existing.map((name) => name.split('.')[0]));
    if (
      layers.some((name) => roots.has(name.split('.')[0])) &&
      JSON.stringify(existing) !== JSON.stringify(layers)
    )
      throw new Error('Runtimes sharing CSS layer roots must declare the same layer order.');
  }
  const sheet =
    options.sheet ??
    (options.target
      ? new BrowserStyleSheet(options.target, namespace, options.nonce)
      : new MemoryStyleSheet());
  const registry = new StyleRegistry(
    sheet,
    namespace,
    options.prefix,
    options.variables,
    layers,
    options.layer,
  );
  if (layers.length) registry.resource('@layer ' + layers.join(',') + ';', 'layer-order');
  const theme = options.theme ?? (lightTheme as unknown as Theme<T>);
  const resources = createResources(registry, theme, options.layer);
  if (options.target) {
    owners!.set(namespace, layers);
    targets.set(options.target, owners!);
  }
  const bindings = new Map<string, StyleBinding<T>>();
  const staticRules = new Map<string, RuleRecord>();
  let sequence = 0;
  let disposed = false;
  const targetDocument =
    options.target?.nodeType === 9 ? (options.target as Document) : options.target?.ownerDocument;
  const cssApi = targetDocument?.defaultView?.CSS;
  function alive() {
    if (disposed) throw new Error('Style runtime is disposed.');
  }

  return {
    registry,
    theme,
    layer: options.layer,
    global: resources.global,
    themeStyle: resources.theme,
    keyframes: resources.keyframes,
    fontFace: resources.fontFace,
    property: resources.property,
    css(factory: StyleFactory<T>, source = 'static'): string {
      alive();
      const record = registry.acquire(buildStyle(factory, theme, options.layer), source);
      if (staticRules.has(record.key)) registry.release(record);
      else staticRules.set(record.key, record);
      return record.className;
    },
    binding(
      settings: { id?: string; source?: string; maxStructures?: number; promote?: boolean } = {},
    ): StyleBinding<T> {
      alive();
      const id = settings.id ?? 'b' + sequence++;
      if (bindings.has(id)) throw new Error('Duplicate binding ID: ' + id);
      const binding = new StyleBinding(registry, () => theme, {
        id,
        source: settings.source ?? id,
        maxStructures: settings.maxStructures,
        promote: settings.promote,
        layer: options.layer,
        onDispose: () => {
          bindings.delete(id);
        },
        supports: cssApi ? (property, value) => cssApi.supports(property, value) : undefined,
      });
      bindings.set(id, binding);
      return binding;
    },
    release(binding: StyleBinding<T>): void {
      if (binding.registry !== registry) throw new Error('Binding belongs to another runtime.');
      binding.dispose();
      bindings.delete(binding.options.id);
    },
    cssText: () => registry.cssText(),
    styleTags: () => registry.styleTags(options.nonce),
    finishHydration: () => registry.finishHydration(),
    get bindingCount() {
      return bindings.size;
    },
    get stats() {
      return Object.freeze({
        bindings: bindings.size,
        rules: registry.size,
        sources: registry.sourceCount,
        styleEntries: registry.styleEntries,
        ruleCompilations: registry.ruleCompilations,
      });
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      const releases = [...bindings.values()].map((binding) => () => binding.dispose());
      bindings.clear();
      staticRules.clear();
      runAll(
        [
          ...releases,
          () => resources.dispose(),
          () => registry.dispose(),
          () => {
            owners?.delete(namespace);
          },
        ],
        'Style runtime cleanup failed.',
      );
    },
  };
}
