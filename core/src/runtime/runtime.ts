import type { StyleFactory } from '../css/builder.js';
import { buildStyle } from '../css/builder.js';
import { lightTheme, type DefaultTokens } from '../theme/presets.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { StyleBinding } from './binding.js';
import { StyleRegistry, type RuleRecord } from './registry.js';
import { BrowserStyleSheet, MemoryStyleSheet, type StyleSheet } from './sheet.js';

export interface RuntimeOptions<T extends TokenSchema> {
  theme?: Theme<T>;
  target?: Document | ShadowRoot;
  sheet?: StyleSheet;
  namespace?: string;
  nonce?: string;
  prefix?: boolean;
}

export function createRuntime<T extends TokenSchema = DefaultTokens>(
  options: RuntimeOptions<T> = {},
) {
  const namespace = options.namespace ?? 'z';
  const sheet =
    options.sheet ??
    (options.target
      ? new BrowserStyleSheet(options.target, namespace, options.nonce)
      : new MemoryStyleSheet());
  const registry = new StyleRegistry(sheet, namespace, options.prefix);
  const theme = options.theme ?? (lightTheme as unknown as Theme<T>);
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
    css(factory: StyleFactory<T>, source = 'static'): string {
      alive();
      const record = registry.acquire(buildStyle(factory, theme), source);
      if (staticRules.has(record.key)) registry.release(record);
      else staticRules.set(record.key, record);
      return record.className;
    },
    binding(
      settings: { id?: string; source?: string; maxStructures?: number } = {},
    ): StyleBinding<T> {
      alive();
      const id = settings.id ?? 'b' + sequence++;
      if (bindings.has(id)) throw new Error('Duplicate binding ID: ' + id);
      const binding = new StyleBinding(registry, () => theme, {
        id,
        source: settings.source ?? id,
        maxStructures: settings.maxStructures,
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
    dispose(): void {
      if (disposed) return;
      disposed = true;
      for (const binding of bindings.values()) binding.dispose();
      bindings.clear();
      staticRules.clear();
      registry.dispose();
    },
  };
}
export type StyleRuntime<T extends TokenSchema = DefaultTokens> = ReturnType<
  typeof createRuntime<T>
>;
