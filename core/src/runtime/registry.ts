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
  readonly source: string;
  references: number;
}

function attribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export class StyleRegistry {
  readonly #records = new Map<string, RuleRecord>();
  readonly #orders = new Map<string, { order: number; references: number }>();
  readonly #hydratedOrders = new Map<string, number>();
  #sequence = 0;
  #disposed = false;
  constructor(
    readonly sheet: StyleSheet,
    readonly namespace = 'z',
    readonly prefix = true,
  ) {
    if (!/^[a-zA-Z][\w-]*$/u.test(namespace)) throw new TypeError('Invalid style namespace.');
    for (const entry of sheet.entries()) {
      this.#hydratedOrders.set(entry.key, entry.order);
      this.#sequence = Math.max(this.#sequence, entry.order + 1);
    }
  }

  #retain(
    canonical: string,
    source: string,
    render: (key: string) => { css: string; className: string },
  ): RuleRecord {
    if (this.#disposed) throw new Error('Style registry is disposed.');
    // 同一来源的各个版本保持逻辑顺序，不能因提升改变与其他来源的覆盖关系。
    const key = hashText(canonical);
    const existing = this.#records.get(key);
    if (existing) {
      if (existing.canonical !== canonical) throw new Error('CSS hash collision.');
      existing.references++;
      this.#orders.get(source)!.references++;
      return existing;
    }
    const { css, className } = render(key);
    const position = this.#orders.get(source) ?? {
      order: this.#hydratedOrders.get(key) ?? this.#sequence++,
      references: 0,
    };
    const record = { key, className, canonical, css, order: position.order, source, references: 1 };
    if (css) this.sheet.set(key, css, position.order);
    position.references++;
    this.#orders.set(source, position);
    this.#records.set(key, record);
    return record;
  }

  acquire(program: StyleProgram, source: string): RuleRecord {
    return this.#retain(JSON.stringify([source, canonicalize(program)]), source, (key) => {
      const className = this.namespace + '-r-' + key;
      const css = program.length ? serializeProgram(program, '.' + className, this.prefix) : '';
      return { css, className: css ? className : '' };
    });
  }

  resource(css: string, source: string): RuleRecord {
    return this.#retain(JSON.stringify(['resource', source, css]), source, () => ({
      css,
      className: '',
    }));
  }

  release(record: RuleRecord): void {
    if (this.#disposed) return;
    if (this.#records.get(record.key) !== record || record.references < 1)
      throw new Error('Invalid CSS reference release.');
    const position = this.#orders.get(record.source)!;
    if (--position.references === 0) this.#orders.delete(record.source);
    if (--record.references === 0) {
      this.sheet.remove(record.key);
      this.#records.delete(record.key);
    }
  }

  get size(): number {
    return this.#records.size;
  }
  get sourceCount(): number {
    return this.#orders.size;
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
          '<style data-z-ssr="" data-zui="' +
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
    this.#hydratedOrders.clear();
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.sheet.dispose();
    this.#records.clear();
    this.#orders.clear();
    this.#hydratedOrders.clear();
  }
}
