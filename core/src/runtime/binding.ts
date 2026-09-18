import { buildStyle, type StyleFactory } from '../css/builder.js';
import { replaceValues, type StyleProgram } from '../css/program.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { canPromote, declarationsOf, structureOf } from './promotion.js';
import type { RuleRecord, StyleRegistry } from './registry.js';

export interface StyleSnapshot {
  readonly className: string;
  readonly variables: Readonly<Record<string, string>>;
  readonly revision: number;
}
export interface BindingOptions {
  readonly id: string;
  readonly source: string;
  readonly maxStructures?: number;
  readonly supports?: (property: string, value: string) => boolean;
  readonly onDispose?: () => void;
  readonly promote?: boolean;
  readonly layer?: string;
}
interface History {
  program: StyleProgram;
  promoted: Set<number>;
}
const emptySnapshot: StyleSnapshot = Object.freeze({
  className: '',
  variables: Object.freeze({}),
  revision: 0,
});

export class StyleBinding<T extends TokenSchema> {
  readonly #history = new Map<string, History>();
  readonly #listeners = new Set<(snapshot: StyleSnapshot) => void>();
  readonly #limit: number;
  #record: RuleRecord | undefined;
  #structure = '';
  #snapshot = emptySnapshot;
  #disposed = false;

  constructor(
    readonly registry: StyleRegistry,
    readonly theme: () => Theme<T>,
    readonly options: BindingOptions,
  ) {
    if (!/^[a-zA-Z0-9_-]+$/u.test(options.id)) throw new TypeError('Invalid binding ID.');
    this.#limit = options.maxStructures ?? 8;
    if (!Number.isInteger(this.#limit) || this.#limit < 1)
      throw new TypeError('Invalid structure cache size.');
  }

  get snapshot(): StyleSnapshot {
    return this.#snapshot;
  }
  get cachedStructures(): number {
    return this.#history.size;
  }

  evaluate(factory: StyleFactory<T>): string {
    if (this.#disposed) throw new Error('Style binding is disposed.');
    const program = buildStyle(factory, this.theme(), this.options.layer);
    return this.update(program);
  }

  update(program: StyleProgram): string {
    if (this.#disposed) throw new Error('Style binding is disposed.');
    const structure = structureOf(program);
    const current = declarationsOf(program);
    const history = this.#history.get(structure);
    const previous = history ? declarationsOf(history.program) : [];
    const promoted = new Set(history?.promoted);
    let changed = false;
    let maskChanged = false;
    const counts = new Map<string, number>();
    for (const { declaration, path } of current) {
      const key = JSON.stringify([path, declaration.property]);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    for (let i = 0; i < current.length; i++) {
      const { declaration, path } = current[i]!;
      const before = previous[i]?.declaration;
      const safe =
        this.options.promote !== false &&
        counts.get(JSON.stringify([path, declaration.property])) === 1 &&
        canPromote(declaration, path, this.options.supports);
      if (promoted.has(i) && !safe) {
        promoted.delete(i);
        maskChanged = true;
      }
      if (before?.value !== declaration.value) {
        changed = true;
        if (safe && before && canPromote(before, path, this.options.supports) && !promoted.has(i)) {
          promoted.add(i);
          maskChanged = true;
        }
      }
    }
    const variables: Record<string, string> = Object.create(null);
    const slots = new Map<number, string>();
    for (const index of promoted) {
      const name = '--' + this.registry.namespace + '-b-' + this.options.id + '-' + index;
      variables[name] = current[index]!.declaration.value;
      slots.set(index, 'var(' + name + ')');
    }
    let record = this.#record;
    let acquired = false;
    const onlyVariables =
      !!history &&
      current.every(
        ({ declaration }, index) =>
          previous[index]?.declaration.value === declaration.value || promoted.has(index),
      );
    if (!record || structure !== this.#structure || maskChanged || (changed && !onlyVariables)) {
      // 先取得新规则；失败时原规则和快照仍然有效。
      record = this.registry.acquire(replaceValues(program, slots), this.options.source);
      acquired = true;
    }
    try {
      this.registry.updateValues(record, variables, program);
    } catch (error) {
      if (acquired) this.registry.release(record);
      throw error;
    }
    // 变量规则也写入成功后再释放旧版本，避免 CSP/样式表异常留下半次更新。
    if (acquired && this.#record) this.registry.release(this.#record);
    this.#record = record;
    this.#structure = structure;
    this.#history.delete(structure);
    this.#history.set(structure, { program, promoted });
    while (this.#history.size > this.#limit)
      this.#history.delete(this.#history.keys().next().value!);
    const sameVariables = JSON.stringify(variables) === JSON.stringify(this.#snapshot.variables);
    if (record.className !== this.#snapshot.className || !sameVariables) {
      this.#snapshot = Object.freeze({
        className: record.className,
        variables: Object.freeze(variables),
        revision: this.#snapshot.revision + 1,
      });
      for (const listener of this.#listeners) listener(this.#snapshot);
    }
    return this.#snapshot.className;
  }

  subscribe(listener: (snapshot: StyleSnapshot) => void): () => void {
    if (this.#disposed) throw new Error('Style binding is disposed.');
    this.#listeners.add(listener);
    listener(this.#snapshot);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#snapshot = emptySnapshot;
    for (const listener of this.#listeners) listener(emptySnapshot);
    this.#listeners.clear();
    if (this.#record) this.registry.release(this.#record);
    this.#record = undefined;
    this.#history.clear();
    this.options.onDispose?.();
  }
}
