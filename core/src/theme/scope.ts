import { createVariableBinding } from '../runtime/variables.js';
import { validateValue } from '../css/validate.js';
import { overrideTheme } from './theme.js';
import type { Theme, ThemePatch, TokenSchema, WidenTokens } from './types.js';

export class ThemeScope<T extends TokenSchema> {
  readonly #listeners = new Set<(theme: Theme<WidenTokens<T>>) => void>();
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
        Object.entries(patch).map(([key, values]) => [key, Object.freeze({ ...values })]),
      ),
    ) as ThemePatch<T>;
  }
  #alive() {
    if (this.#disposed) throw new Error('Theme scope is disposed.');
  }
  #refresh() {
    this.#theme = overrideTheme((this.parent?.theme ?? this.#base) as Theme<T>, this.#patch);
    for (const listener of this.#listeners) listener(this.#theme);
    for (const child of this.#children) child.#refresh();
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
    overrideTheme(theme, this.#patch);
    this.#base = theme;
    this.#refresh();
  }
  override(patch: ThemePatch<T>): void {
    this.#alive();
    const copied = this.#copy(patch);
    overrideTheme((this.parent?.theme ?? this.#base) as Theme<T>, copied);
    this.#patch = copied;
    this.#refresh();
  }
  subscribe(listener: (theme: Theme<WidenTokens<T>>) => void): () => void {
    this.#alive();
    this.#listeners.add(listener);
    listener(this.#theme);
    return () => {
      this.#listeners.delete(listener);
    };
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    for (const child of this.#children) child.dispose();
    this.#children.clear();
    this.#listeners.clear();
    if (this.parent) this.parent.#children.delete(this);
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

export function bindTheme<T extends TokenSchema>(
  node: HTMLElement | SVGElement,
  scope: ThemeScope<T>,
): () => void {
  const binding = createVariableBinding(node);
  const stop = scope.subscribe((theme) => binding.update(themeVariables(theme)));
  return () => {
    stop();
    binding.dispose();
  };
}
