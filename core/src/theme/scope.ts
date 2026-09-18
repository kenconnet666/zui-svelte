import { createVariableBinding } from '../runtime/variables.js';
import { bindElement } from '../runtime/element.js';
import type { StyleRuntime } from '../runtime/runtime.js';
import { runAll } from '../runtime/callbacks.js';
import { StyleError } from '../css/errors.js';
import {
  overrideTheme,
  tokenRef,
  isReference,
  assertThemeCompatible,
  assertThemeRecord,
  themeDeclarations,
} from './theme.js';
import type { Theme, ThemePatch, TokenSchema, WidenTokens } from './types.js';

export class ThemeScope<T extends TokenSchema> {
  readonly #listeners = new Map<(theme: Theme<WidenTokens<T>>) => void, (() => void) | undefined>();
  readonly #children = new Set<ThemeScope<T>>();
  readonly #schema: Theme<T>;
  #parent: ThemeScope<T> | undefined;
  #base: Theme<T>;
  #patch: ThemePatch<T>;
  #theme: Theme<WidenTokens<T>>;
  #disposed = false;

  constructor(base: Theme<T>, patch: ThemePatch<T> = {}) {
    if (arguments.length > 2)
      throw new StyleError('theme.invalid', 'Use scope.fork() to create a child theme scope.');
    this.#schema = base;
    this.#base = base;
    this.#patch = this.#copy(patch);
    this.#theme = overrideTheme(base, this.#patch);
  }

  #copy(patch: ThemePatch<T>): ThemePatch<T> {
    assertThemeRecord(patch, 'overrides');
    for (const [category, values] of Object.entries(patch))
      if (values !== undefined) assertThemeRecord(values, 'overrides.' + category);
    return Object.freeze(
      Object.fromEntries(
        Object.entries(patch).map(([key, values]) => [
          key,
          Object.freeze(
            Object.fromEntries(
              Object.entries(values ?? {}).map(([token, value]) => [
                token,
                isReference(value) ? tokenRef(value.category, value.token) : value,
              ]),
            ),
          ),
        ]),
      ),
    ) as ThemePatch<T>;
  }
  #alive() {
    if (this.#disposed) throw new Error('Theme scope is disposed.');
  }
  #prepare(
    base: Theme<T>,
    patch: ThemePatch<T>,
    pending = new Map<ThemeScope<T>, Theme<WidenTokens<T>>>(),
  ) {
    const theme = overrideTheme(base, patch);
    pending.set(this, theme);
    // scope 允许值拓宽；子级仍使用相同键结构，实际值类别由 overrideTheme 校验。
    for (const child of this.#children)
      child.#prepare(theme as unknown as Theme<T>, child.#patch, pending);
    return pending;
  }
  #commit(pending: Map<ThemeScope<T>, Theme<WidenTokens<T>>>) {
    // 先验证整棵子作用域，再统一提交，避免子级别名失败导致父级已切换。
    for (const [scope, theme] of pending) scope.#theme = theme;
    const notifications: (() => void)[] = [];
    for (const [scope, theme] of pending)
      for (const listener of [...scope.#listeners.keys()]) {
        notifications.push(() => {
          // 回调可同步再次切换主题；不得把已被新提交替换的快照发给剩余消费者。
          if (scope.#theme === theme && scope.#listeners.has(listener)) listener(theme);
        });
      }
    runAll(notifications, 'Theme subscribers failed.');
  }
  get theme(): Theme<WidenTokens<T>> {
    return this.#theme;
  }

  get parent(): ThemeScope<T> | undefined {
    return this.#parent;
  }

  fork(patch: ThemePatch<T>): ThemeScope<T> {
    this.#alive();
    const child = new ThemeScope(this.#theme as unknown as Theme<T>, patch);
    child.#parent = this;
    this.#children.add(child);
    return child;
  }
  setTheme(theme: Theme<T>): void {
    this.#alive();
    if (this.parent) throw new Error('Update the root theme, or change this scope overrides.');
    assertThemeCompatible(this.#schema, theme);
    const pending = this.#prepare(theme, this.#patch);
    this.#base = theme;
    this.#commit(pending);
  }
  setOverrides(patch: ThemePatch<T>): void {
    this.#alive();
    const copied = this.#copy(patch);
    const pending = this.#prepare((this.parent?.theme ?? this.#base) as Theme<T>, copied);
    this.#patch = copied;
    this.#commit(pending);
  }
  subscribe(listener: (theme: Theme<WidenTokens<T>>) => void, cleanup?: () => void): () => void {
    this.#alive();
    const notify = (theme: Theme<WidenTokens<T>>) => listener(theme);
    this.#listeners.set(notify, cleanup);
    try {
      notify(this.#theme);
    } catch (error) {
      this.#listeners.delete(notify);
      runAll(
        [
          () => {
            throw error;
          },
          () => cleanup?.(),
        ],
        'Initial theme notification failed.',
      );
    }
    return () => {
      if (this.#listeners.delete(notify)) cleanup?.();
    };
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    const releases = [...this.#children].map((child) => () => child.dispose());
    this.#children.clear();
    for (const cleanup of this.#listeners.values()) if (cleanup) releases.push(cleanup);
    this.#listeners.clear();
    if (this.parent) this.parent.#children.delete(this);
    runAll(releases, 'Theme scope cleanup failed.');
  }
}

export { themeVariables } from './theme.js';

interface ThemeBinding {
  scope: object;
  runtime: object | undefined;
  references: number;
  stop: () => void;
}
const themesByNode = new WeakMap<Element, Map<string, ThemeBinding>>();

export function bindTheme<T extends TokenSchema, U extends TokenSchema = TokenSchema>(
  node: HTMLElement | SVGElement,
  scope: ThemeScope<T>,
  runtime?: StyleRuntime<U>,
): () => void {
  if (runtime) assertThemeCompatible(runtime.defaultTheme, scope.theme);
  const namespace = scope.theme.namespace;
  let bindings = themesByNode.get(node);
  if (!bindings) themesByNode.set(node, (bindings = new Map()));
  let entry = bindings.get(namespace);
  if (entry && (entry.scope !== scope || entry.runtime !== runtime))
    throw new Error('A different theme scope or runtime already owns this element namespace.');
  if (!entry) {
    entry = { scope, runtime, references: 0, stop: () => {} };
    bindings.set(namespace, entry);
    const releases: (() => void)[] = [];
    let disposed = false;
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      bindings.delete(namespace);
      if (!bindings.size) themesByNode.delete(node);
      runAll(releases, 'Theme binding cleanup failed.');
    };
    try {
      if (runtime?.registry.variables === 'stylesheet') {
        const binding = runtime.binding({ source: 'theme-scope', promote: false });
        releases.push(() => binding.dispose());
        releases.push(bindElement(node, binding));
        entry.stop = scope.subscribe((theme) => {
          assertThemeCompatible(runtime.defaultTheme, theme);
          binding.update(
            Object.entries(themeDeclarations(theme)).map(([property, value]) => ({
              kind: 'declaration',
              property,
              value,
              important: false,
            })),
          );
        }, dispose);
      } else {
        const binding = createVariableBinding(node);
        releases.push(() => binding.dispose());
        entry.stop = scope.subscribe((theme) => {
          if (runtime) assertThemeCompatible(runtime.defaultTheme, theme);
          binding.update(themeDeclarations(theme));
        }, dispose);
      }
    } catch (error) {
      runAll(
        [
          () => {
            throw error;
          },
          dispose,
        ],
        'Theme binding initialization failed.',
      );
    }
  }
  // 同源重复挂载共享一次订阅；不同主题必须放在不同元素，不能靠挂载顺序竞争变量。
  entry.references++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--entry.references === 0) entry.stop();
  };
}
