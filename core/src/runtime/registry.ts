import type { StyleProgram } from '../css/program.js';
import { canonicalize, hashText, serializeProgram } from '../css/serialize.js';
import { escapeStyleText } from '../css/validate.js';
import type { StyleSheet } from './sheet.js';

export interface RuleRecord {
  readonly key: string;
  readonly className: string;
  readonly canonical: string;
  readonly css: string;
  readonly order: number;
  references: number;
}

function attribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export class StyleRegistry {
  readonly #records = new Map<string, RuleRecord>();
  readonly #orders = new Map<string, number>();
  #disposed = false;
  constructor(
    readonly sheet: StyleSheet,
    readonly namespace = 'z',
    readonly prefix = true,
  ) {
    if (!/^[a-zA-Z][\w-]*$/u.test(namespace)) throw new TypeError('Invalid style namespace.');
  }

  acquire(program: StyleProgram, source: string): RuleRecord {
    if (this.#disposed) throw new Error('Style registry is disposed.');
    // 相同源码位置的各个规则版本留在同一个逻辑位置，更新不会跑到其他来源之后。
    let order = this.#orders.get(source);
    if (order === undefined) {
      order = this.#orders.size;
      this.#orders.set(source, order);
    }
    const canonical = JSON.stringify([source, canonicalize(program)]);
    const key = hashText(canonical);
    const existing = this.#records.get(key);
    if (existing) {
      if (existing.canonical !== canonical) throw new Error('CSS hash collision.');
      existing.references++;
      return existing;
    }
    const className = this.namespace + '-r-' + key;
    const css = program.length ? serializeProgram(program, '.' + className, this.prefix) : '';
    const record = { key, className: css ? className : '', canonical, css, order, references: 1 };
    if (css) this.sheet.set(key, css, order);
    this.#records.set(key, record);
    return record;
  }

  release(record: RuleRecord): void {
    if (this.#disposed) return;
    if (this.#records.get(record.key) !== record || record.references < 1)
      throw new Error('Invalid CSS reference release.');
    if (--record.references === 0) {
      this.sheet.remove(record.key);
      this.#records.delete(record.key);
    }
  }

  get size(): number {
    return this.#records.size;
  }
  cssText(): string {
    return this.sheet
      .entries()
      .map((entry) => entry.css)
      .join('');
  }
  styleTags(nonce?: string): string {
    return this.sheet
      .entries()
      .map(
        (entry) =>
          '<style data-zui="' +
          attribute(this.namespace) +
          '" data-z-key="' +
          attribute(entry.key) +
          '" data-z-order="' +
          entry.order +
          '"' +
          (nonce ? ' nonce="' + attribute(nonce) + '"' : '') +
          '>' +
          escapeStyleText(entry.css) +
          '</style>',
      )
      .join('');
  }
  finishHydration(): void {
    for (const entry of this.sheet.entries())
      if (!this.#records.has(entry.key)) this.sheet.remove(entry.key);
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.sheet.dispose();
    this.#records.clear();
    this.#orders.clear();
  }
}
