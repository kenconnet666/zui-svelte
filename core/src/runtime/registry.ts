import type { StyleProgram } from '../css/program.js';
import { canonicalize, hashText, serializeProgram } from '../css/serialize.js';
import { escapeStyleText } from '../css/validate.js';
import type { StyleSheet } from './sheet.js';
import { retainDefinition, type StyleDefinition } from './definitions.js';
import { validateLayer, layerProgram } from '../css/layers.js';

export interface RuleRecord {
  readonly key: string;
  readonly className: string;
  readonly canonical: string;
  readonly css: string;
  readonly order: number;
  readonly source: string;
  program?: StyleProgram;
  variables: Readonly<Record<string, string>>;
  readonly listeners: Set<() => void>;
  references: number;
  releaseDefinition?: () => void;
}

function attribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export class StyleRegistry {
  readonly #records = new Map<string, RuleRecord>();
  readonly #classes = new Map<string, RuleRecord>();
  readonly #orders = new Map<string, { order: number; references: number }>();
  readonly #hydratedOrders = new Map<string, number>();
  #sequence = 0;
  #disposed = false;
  #compilations = 0;
  constructor(
    readonly sheet: StyleSheet,
    readonly namespace = 'z',
    readonly prefix = true,
    readonly variables: 'inline' | 'stylesheet' = 'inline',
    readonly layers: readonly string[] = [],
    readonly layer?: string,
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
    const record: RuleRecord = {
      key,
      className,
      canonical,
      css,
      order: position.order,
      source,
      references: 1,
      variables: Object.freeze({}),
      listeners: new Set(),
    };
    if (css) this.sheet.set(key, css, position.order);
    position.references++;
    this.#orders.set(source, position);
    this.#records.set(key, record);
    if (className) this.#classes.set(className, record);
    return record;
  }

  acquire(program: StyleProgram, source: string): RuleRecord {
    const record = this.#retain(JSON.stringify([source, canonicalize(program)]), source, (key) => {
      this.#compilations++;
      const className = this.namespace + '-r-' + key;
      const css = program.length ? serializeProgram(program, '.' + className, this.prefix) : '';
      return { css, className: css ? className : '' };
    });
    record.program ??= program;
    return record;
  }

  lookup(className: string): RuleRecord | undefined {
    return this.#classes.get(className);
  }

  acquireDefinition(definition: StyleDefinition): RuleRecord {
    const layer = definition.layer === undefined ? this.layer : (definition.layer ?? undefined);
    this.assertLayer(layer);
    const record = this.#retain(
      JSON.stringify([definition.canonical, layer]),
      definition.source,
      () => {
        this.#compilations++;
        return {
          className: definition.className,
          css: serializeProgram(
            layerProgram(definition.program, layer),
            '.' + definition.className,
            this.prefix,
          ),
        };
      },
    );
    record.releaseDefinition ??= retainDefinition(definition);
    return record;
  }

  assertLayer(layer?: string): void {
    if (layer !== undefined && !this.layers.includes(validateLayer(layer)))
      throw new Error('CSS layer must be declared by the runtime: ' + layer);
  }

  updateValues(
    record: RuleRecord,
    variables: Readonly<Record<string, string>>,
    program: StyleProgram,
  ): void {
    if (JSON.stringify(record.variables) === JSON.stringify(variables)) {
      record.program = program;
      return;
    }
    if (this.variables === 'stylesheet') {
      // 复用实例 class 写变量；严格 CSP 下不生成 style 属性，也不重新运行 Stylis。
      const declarations = Object.entries(variables).map(
        ([name, value]) => name + ':' + value + ';',
      );
      if (declarations.length)
        this.sheet.set(
          record.key + ':vars',
          '.' + record.className + '{' + declarations.join('') + '}',
          record.order,
        );
      else this.sheet.remove(record.key + ':vars');
    }
    record.program = program;
    record.variables = Object.freeze({ ...variables });
    for (const notify of record.listeners) notify();
  }

  subscribe(record: RuleRecord, notify: () => void): () => void {
    if (this.#disposed || this.#records.get(record.key) !== record)
      throw new Error('Unknown CSS record.');
    record.references++;
    this.#orders.get(record.source)!.references++;
    const listener = () => notify();
    record.listeners.add(listener);
    let stopped = false;
    return () => {
      if (stopped) return;
      stopped = true;
      record.listeners.delete(listener);
      this.release(record);
    };
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
      if (this.variables === 'stylesheet') this.sheet.remove(record.key + ':vars');
      this.sheet.remove(record.key);
      this.#records.delete(record.key);
      if (record.className) this.#classes.delete(record.className);
      record.releaseDefinition?.();
    }
  }

  get size(): number {
    return this.#records.size;
  }
  get sourceCount(): number {
    return this.#orders.size;
  }
  get ruleCompilations(): number {
    return this.#compilations;
  }
  get styleEntries(): number {
    return this.sheet.entries().length;
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
      if (!this.#records.has(entry.key.replace(/:vars$/u, ''))) this.sheet.remove(entry.key);
    this.#hydratedOrders.clear();
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.sheet.dispose();
    for (const record of this.#records.values()) record.releaseDefinition?.();
    this.#records.clear();
    this.#classes.clear();
    this.#orders.clear();
    this.#hydratedOrders.clear();
  }
}
