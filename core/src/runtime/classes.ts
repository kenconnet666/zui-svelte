import { clsx, type ClassValue } from 'clsx';
import { hashText } from '../css/serialize.js';
import { buildStyle, type StyleFactory } from '../css/builder.js';
import type { DefaultTokens } from '../theme/presets.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import type { StyleRuntime } from './runtime.js';
import type { StyleBinding } from './binding.js';
import type { RuleRecord } from './registry.js';
import { createVariableBinding } from './variables.js';

type ErasedFactory = StyleFactory<TokenSchema>;
let activeEvaluation: ((factory: ErasedFactory, theme?: Theme<TokenSchema>) => string) | undefined;

/** @internal 只在同步样式求值期间切换上下文，异常和嵌套调用都必须恢复。 */
export function withCssEvaluation<R>(
  read: () => R,
  evaluate: (factory: ErasedFactory, theme?: Theme<TokenSchema>) => string,
): R {
  const previous = activeEvaluation;
  activeEvaluation = evaluate;
  try {
    return read();
  } finally {
    activeEvaluation = previous;
  }
}

export function hasCssEvaluation(): boolean {
  return activeEvaluation !== undefined;
}

export function css<T extends TokenSchema = DefaultTokens>(
  factory: StyleFactory<T>,
  theme?: Theme<T>,
): string {
  if (!activeEvaluation)
    throw new Error(
      'css() requires the class compiler; use runtime.css() for explicit runtime ownership.',
    );
  return activeEvaluation(factory as unknown as ErasedFactory, theme);
}

export function createCss<T extends TokenSchema>(theme: Theme<T>) {
  return (factory: StyleFactory<T>): string => css(factory, theme);
}

export function normalizeClass(value: unknown): string {
  if (value === null || value === undefined) return '';
  return typeof value === 'object' ? clsx(value as ClassValue) : String(value);
}

export class ClassController<T extends TokenSchema> {
  readonly #bindings: StyleBinding<T>[] = [];
  readonly #records = new Map<RuleRecord, () => void>();
  readonly #targets = new Set<ReturnType<typeof createVariableBinding>>();
  #variables: Readonly<Record<string, string>> = {};
  #className = '';
  #cursor = 0;
  #disposed = false;

  constructor(
    readonly runtime: StyleRuntime<T>,
    readonly identity: string,
    readonly source: string,
    readonly promote = true,
    readonly onChange?: () => void,
  ) {}

  #slot(factory: ErasedFactory, theme?: Theme<TokenSchema>): string {
    const slot = this.#cursor++;
    let binding = this.#bindings[slot];
    if (!binding) {
      binding = this.runtime.binding({
        id: 'c' + hashText(this.identity) + '_' + slot,
        source: this.source + ':' + slot,
        promote: this.promote,
      });
      this.#bindings[slot] = binding;
    }
    return theme
      ? binding.update(buildStyle(factory, theme))
      : binding.evaluate(factory as unknown as StyleFactory<T>);
  }

  run<R>(read: () => R): R {
    if (this.#disposed) throw new Error('Class controller is disposed.');
    this.#cursor = 0;
    return withCssEvaluation(
      () => {
        const result = read();
        for (const binding of this.#bindings.splice(this.#cursor)) binding.dispose();
        return result;
      },
      (factory, theme) => this.#slot(factory, theme),
    );
  }

  #refresh(): void {
    const values: Record<string, string> = Object.create(null);
    for (const record of this.#records.keys()) {
      for (const [name, value] of Object.entries(record.variables)) {
        if (Object.hasOwn(values, name) && values[name] !== value)
          throw new Error('Conflicting internal CSS variable: ' + name);
        values[name] = value;
      }
    }
    const changed = JSON.stringify(this.#variables) !== JSON.stringify(values);
    this.#variables = Object.freeze(values);
    for (const target of this.#targets) target.update(values);
    if (changed) this.onChange?.();
  }

  resolve(value: unknown): string {
    this.#className = normalizeClass(value);
    const next = new Set(
      this.#className
        .split(/\s+/u)
        .map((name) => this.runtime.registry.lookup(name))
        .filter((entry): entry is RuleRecord => !!entry),
    );
    // 先保留新引用，再释放旧引用，避免共享规则在两个消费者之间短暂消失。
    for (const record of next)
      if (!this.#records.has(record)) {
        this.#records.set(
          record,
          this.runtime.registry.subscribe(record, () => this.#refresh()),
        );
      }
    for (const [record, stop] of this.#records)
      if (!next.has(record)) {
        stop();
        this.#records.delete(record);
      }
    this.#refresh();
    return this.#className;
  }

  style(authored: string | null | undefined): string | undefined {
    if (this.runtime.registry.variables === 'stylesheet') return authored ?? undefined;
    const variables = Object.entries(this.#variables)
      .map(([name, value]) => name + ':' + value)
      .join(';');
    const original = authored?.trim().replace(/;+$/u, '') ?? '';
    return (
      (original && variables ? original + ';' + variables : original || variables) || undefined
    );
  }

  mount(node: HTMLElement | SVGElement): () => void {
    if (this.#disposed) throw new Error('Class controller is disposed.');
    if (this.runtime.registry.variables === 'stylesheet') return () => {};
    const target = createVariableBinding(node, false);
    this.#targets.add(target);
    target.update(this.#variables);
    return () => {
      target.dispose();
      this.#targets.delete(target);
    };
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    for (const target of this.#targets) target.dispose();
    this.#targets.clear();
    for (const stop of this.#records.values()) stop();
    this.#records.clear();
    for (const binding of this.#bindings) binding.dispose();
    this.#bindings.length = 0;
  }
}
