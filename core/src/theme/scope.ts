import { createVariableBinding } from '../runtime/variables.js';
import { bindElement } from '../runtime/element.js';
import type { StyleRuntime } from '../runtime/runtime.js';
import { runAll } from '../runtime/callbacks.js';
import { validateValue } from '../css/validate.js';
import { overrideTheme, tokenRef, isReference } from './theme.js';
import type { Theme, ThemePatch, TokenSchema, WidenTokens } from './types.js';

export class ThemeScope<T extends TokenSchema> {
  readonly #listeners = new Map<(theme: Theme<WidenTokens<T>>) => void, (() => void) | undefined>();
  readonly #children = new Set<ThemeScope<T>>();
  #base: Theme<T>;
  #patch: ThemePatch<T>;
  #theme: Theme<WidenTokens<T>>;
  #disposed = false;

  constructor(
    base: Theme<T>,
    patch: ThemePatch<T> = {},
    readonly parent?: ThemeScope<T>,
  ) {
    this.#base = base;
    this.#patch = this.#copy(patch);
    this.#theme = overrideTheme(base, this.#patch);
  }

  #copy(patch: ThemePatch<T>): ThemePatch<T> {
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
    for (const child of this.#children) child.#prepare(theme as Theme<T>, child.#patch, pending);
    return pending;
  }
  #commit(pending: Map<ThemeScope<T>, Theme<WidenTokens<T>>>) {
    // 先验证整棵子作用域，再统一提交，避免子级别名失败导致父级已切换。
    for (const [scope, theme] of pending) scope.#theme = theme;
    const notifications: (() => void)[] = [];
    for (const [scope, theme] of pending)
      for (const listener of [...scope.#listeners.keys()]) {
        notifications.push(() => {
          if (scope.#listeners.has(listener)) listener(theme);
        });
      }
    runAll(notifications, 'Theme subscribers failed.');
  }
  get theme(): Theme<WidenTokens<T>> {
    return this.#theme;
  }

  fork(patch: ThemePatch<T>): ThemeScope<T> {
    this.#alive();
    const child = new ThemeScope(this.#theme as Theme<T>, patch, this);
    this.#children.add(child);
    return child;
  }
  update(theme: Theme<T>): void {
    this.#alive();
    if (this.parent) throw new Error('Update the root theme, or change this scope overrides.');
    if (theme.namespace !== this.#base.namespace)
      throw new Error('Theme namespace cannot change in a live scope.');
    for (const [category, tokens] of Object.entries(this.#base.tokens))
      for (const [key, value] of Object.entries(tokens))
        if (
          !Object.hasOwn(theme.tokens[category] ?? {}, key) ||
          typeof theme.tokens[category]![key] !== typeof value
        )
          throw new Error('Incompatible theme token: ' + category + '.' + key);
    const pending = this.#prepare(theme, this.#patch);
    this.#base = theme;
    this.#commit(pending);
  }
  override(patch: ThemePatch<T>): void {
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

export function themeVariables<T extends TokenSchema>(
  theme: Theme<T>,
): Readonly<Record<string, string>> {
  return Object.fromEntries(
    Object.entries(theme.tokens).flatMap(([category, tokens]) =>
      Object.entries(tokens).map(([key, value]) => [
        theme.variable(category, key),
        validateValue(String(value)),
      ]),
    ),
  );
}

export function bindTheme<T extends TokenSchema, U extends TokenSchema = TokenSchema>(
  node: HTMLElement | SVGElement,
  scope: ThemeScope<T>,
  runtime?: StyleRuntime<U>,
): () => void {
  if (runtime?.registry.variables === 'stylesheet') {
    const binding = runtime.binding({ source: 'theme-scope', promote: false });
    const detach = bindElement(node, binding);
    return scope.subscribe(
      (theme) => {
        binding.update(
          Object.entries(themeVariables(theme)).map(([property, value]) => ({
            kind: 'declaration',
            property,
            value,
            important: false,
          })),
        );
      },
      () => {
        runAll([detach, () => binding.dispose()], 'Theme binding cleanup failed.');
      },
    );
  }
  const binding = createVariableBinding(node);
  return scope.subscribe(
    (theme) => binding.update(themeVariables(theme)),
    () => binding.dispose(),
  );
}
