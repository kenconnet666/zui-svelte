import { clsx, type ClassValue } from 'clsx';
import { hashText } from '../css/serialize.js';
import { buildStyle, type StyleFactory } from '../css/builder.js';
import type { TokenSchema } from '../theme/types.js';
import type { StyleRuntime } from './runtime.js';
import type { StyleBinding } from './binding.js';
import type { RuleRecord } from './registry.js';
import { createVariableBinding } from './variables.js';
import { findDefinition } from './definitions.js';
import { runAll } from './callbacks.js';
import { withCssEvaluation, type CssEvaluationOptions } from './evaluation.js';

type ErasedFactory = StyleFactory<TokenSchema>;
interface RuntimeAccess<T extends TokenSchema> {
  get(): StyleRuntime<T>;
  peek(): StyleRuntime<T> | undefined;
}
export { css, createCss, hasCssEvaluation, withCssEvaluation } from './evaluation.js';

export function normalizeClass(value: unknown): string {
  if (value === null || value === undefined) return '';
  return typeof value === 'object' ? clsx(value as ClassValue) : String(value);
}

export class ClassController<T extends TokenSchema> {
  #runtime: StyleRuntime<T> | RuntimeAccess<T>;
  readonly #bindings: StyleBinding<T>[] = [];
  readonly #records = new Map<RuleRecord, () => void>();
  readonly #targets = new Set<ReturnType<typeof createVariableBinding>>();
  #variables: Readonly<Record<string, string>> = {};
  #className = '';
  #cursor = 0;
  #disposed = false;

  constructor(
    runtime: StyleRuntime<T> | RuntimeAccess<T>,
    readonly identity: string,
    readonly source: string,
    readonly promote = true,
    readonly onChange?: () => void,
    readonly stableIdentity = true,
  ) {
    this.#runtime = runtime;
  }

  get runtime(): StyleRuntime<T> {
    if (!('registry' in this.#runtime)) this.#runtime = this.#runtime.get();
    return this.#runtime;
  }
  #peek(): StyleRuntime<T> | undefined {
    return 'registry' in this.#runtime ? this.#runtime : this.#runtime.peek();
  }

  #slot(factory: ErasedFactory, options: CssEvaluationOptions = {}): string {
    const layer = options.layer === undefined ? this.runtime.layer : options.layer;
    this.runtime.registry.assertLayer(layer ?? undefined);
    const program = buildStyle<TokenSchema, object>(
      factory,
      options.theme ?? this.runtime.defaultTheme,
      layer ?? undefined,
      options.tokenMap,
    );
    this.runtime.registry.assertTheme(program);
    const slot = this.#cursor++;
    let binding = this.#bindings[slot];
    if (!binding) {
      binding = this.runtime.binding({
        // 无跨端稳定标识的宿主使用 runtime ID；Svelte legacy 服务端不会提前提升变量。
        id: this.stableIdentity ? 'c' + hashText(this.identity) + '_' + slot : undefined,
        source: this.source + ':' + slot,
        promote: this.promote,
      });
      this.#bindings[slot] = binding;
    }
    return binding.update(program);
  }

  run<R>(read: () => R): R {
    if (this.#disposed) throw new Error('Class controller is disposed.');
    this.#cursor = 0;
    return withCssEvaluation(
      () => {
        const result = read();
        runAll(
          this.#bindings.splice(this.#cursor).map((binding) => () => binding.dispose()),
          'Unused class bindings failed to dispose.',
        );
        return result;
      },
      (factory, options) => this.#slot(factory, options),
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
    runAll(
      [
        ...[...this.#targets].map(
          (target) => () =>
            target.update(this.#peek()?.registry.variables === 'stylesheet' ? {} : values),
        ),
        () => {
          if (changed) this.onChange?.();
        },
      ],
      'Class targets failed to update.',
    );
  }

  resolve(value: unknown): string {
    if (this.#disposed) throw new Error('Class controller is disposed.');
    this.#className = normalizeClass(value);
    const acquired: RuleRecord[] = [];
    try {
      const next = new Set(
        this.#className
          .split(/\s+/u)
          .map((name) => {
            const existing = this.#peek()?.registry.lookup(name);
            if (existing) {
              // 只有消费已有规则时才取得宿主引用；普通 class 不创建默认 runtime。
              void this.runtime;
              return existing;
            }
            const definition = findDefinition(name);
            if (!definition) return undefined;
            const record = this.runtime.registry.acquireDefinition(definition);
            acquired.push(record);
            return record;
          })
          .filter((entry): entry is RuleRecord => !!entry),
      );
      const modules = [...next].filter((record) => record.definitionName);
      if (modules.length) {
        const names = new Set(modules.map((record) => record.definitionName));
        // 保留模块标记，替换转发过来的目标别名，避免另一 runtime 的层级泄漏到当前元素。
        const authored = this.#className.split(/\s+/u).filter((name) => {
          const boundary = name.indexOf('--');
          return boundary < 0 || !names.has(name.slice(0, boundary));
        });
        this.#className = [...authored, ...modules.map((record) => record.className)].join(' ');
      }
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
    } finally {
      // 消费引用接管后释放注册时的临时引用，失败时也不泄漏。
      for (const record of acquired) this.runtime.registry.release(record);
    }
  }

  style(authored: string | null | undefined): string | undefined {
    if (this.#peek()?.registry.variables === 'stylesheet') return authored ?? undefined;
    if (!Object.keys(this.#variables).length) return authored ?? undefined;
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
    if (this.#peek()?.registry.variables === 'stylesheet') return () => {};
    const target = createVariableBinding(node, false);
    try {
      target.update(this.#variables);
    } catch (error) {
      // 首次挂载也可能只写入部分变量，失败后不能留下无人持有的节点状态。
      runAll(
        [
          () => {
            throw error;
          },
          () => target.dispose(),
        ],
        'Class target initialization failed.',
      );
    }
    this.#targets.add(target);
    return () => {
      this.#targets.delete(target);
      target.dispose();
    };
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    const releases = [...this.#targets].map((target) => () => target.dispose());
    this.#targets.clear();
    releases.push(...this.#records.values());
    this.#records.clear();
    releases.push(...this.#bindings.map((binding) => () => binding.dispose()));
    this.#bindings.length = 0;
    runAll(releases, 'Class controller cleanup failed.');
  }
}
