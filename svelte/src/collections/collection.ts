import { createSubscriber } from 'svelte/reactivity';
import { hashText } from '@zui/core';

export type ItemKey = string | number;
export function itemKey(item: unknown): ItemKey {
  const key = item && typeof item === 'object' ? Reflect.get(item, 'id') : undefined;
  return assertKey(key);
}
export function assertKey(key: unknown): ItemKey {
  if (typeof key !== 'string' && (typeof key !== 'number' || !Number.isFinite(key)))
    throw new TypeError('Options need a stable string/number id or an explicit getKey.');
  return key;
}
export const optionId = (prefix: string, key: ItemKey) =>
  prefix + '-option-' + hashText(typeof key + ':' + key);

export interface CollectionOptions<T> {
  items: () => readonly T[];
  getKey?: (item: T) => ItemKey;
  getLabel?: (item: T) => string;
  isDisabled?: (item: T) => boolean;
  locale?: () => string;
}
export interface CollectionItem<T> {
  readonly key: ItemKey;
  readonly item: T;
  readonly label: string;
  readonly disabled: boolean;
  readonly index: number;
}

/** 只持有展示索引与活动项；选中对象始终由外部模型持有，不随 options 刷新回写。 */
export class Collection<T> {
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #rows: readonly CollectionItem<T>[] = [];
  #index = new Map<ItemKey, CollectionItem<T>>();
  #active?: ItemKey;
  #locale = '';
  #collator?: Intl.Collator;
  #segmenter?: Intl.Segmenter;
  #buffer = '';
  #typedAt = 0;
  #disposed = false;
  constructor(readonly options: CollectionOptions<T>) {
    this.sync();
  }
  get rows() {
    this.#track();
    return this.#rows;
  }
  get activeKey() {
    this.#track();
    return this.#active;
  }
  get activeIndex() {
    this.#track();
    return this.#active === undefined ? -1 : (this.#index.get(this.#active)?.index ?? -1);
  }
  key(item: T) {
    return assertKey(this.options.getKey ? this.options.getKey(item) : itemKey(item));
  }
  label(item: T): string {
    const label = this.options.getLabel
      ? this.options.getLabel(item)
      : item && typeof item === 'object'
        ? Reflect.get(item, 'label')
        : undefined;
    if (typeof label !== 'string')
      throw new TypeError('Options need label text or an explicit getLabel.');
    return label;
  }
  #notify() {
    for (const listener of this.#listeners) listener();
  }

  sync(): void {
    if (this.#disposed) throw new Error('Collection is disposed.');
    const locale = this.options.locale?.() ?? 'zh-CN';
    const localeChanged = locale !== this.#locale;
    if (localeChanged) {
      this.#collator = new Intl.Collator(locale, { usage: 'search', sensitivity: 'base' });
      this.#segmenter = new Intl.Segmenter(locale, { granularity: 'grapheme' });
      this.#locale = locale;
      this.#buffer = '';
    }
    const index = new Map<ItemKey, CollectionItem<T>>();
    const rows = this.options.items().map((item, position) => {
      const key = this.key(item);
      if (index.has(key)) throw new Error('Duplicate option key: ' + String(key));
      const row = Object.freeze({
        key,
        item,
        label: this.label(item),
        disabled: Boolean(this.options.isDisabled?.(item)),
        index: position,
      });
      index.set(key, row);
      return row;
    });
    const changed =
      localeChanged ||
      rows.length !== this.#rows.length ||
      rows.some((row, i) => {
        const previous = this.#rows[i];
        return (
          !previous ||
          previous.key !== row.key ||
          previous.item !== row.item ||
          previous.label !== row.label ||
          previous.disabled !== row.disabled
        );
      });
    if (!changed) return;
    const position = this.#active === undefined ? -1 : (this.#index.get(this.#active)?.index ?? -1);
    this.#rows = Object.freeze(rows);
    this.#index = index;
    if (
      this.#active !== undefined &&
      (!index.has(this.#active) || index.get(this.#active)!.disabled)
    ) {
      this.#active =
        rows.slice(Math.max(0, position)).find((row) => !row.disabled)?.key ??
        rows.slice(0, Math.max(0, position)).findLast((row) => !row.disabled)?.key;
    }
    this.#notify();
  }

  activate(key: ItemKey | undefined): void {
    this.sync();
    this.#activate(key);
  }
  #activate(key: ItemKey | undefined): void {
    if (key !== undefined && (!this.#index.has(key) || this.#index.get(key)!.disabled)) return;
    if (key !== this.#active) {
      this.#active = key;
      this.#notify();
    }
  }
  move(direction: 1 | -1 | 'first' | 'last', loop = false): ItemKey | undefined {
    this.sync();
    const enabled = this.#rows.filter((row) => !row.disabled);
    if (!enabled.length) {
      this.#activate(undefined);
      return undefined;
    }
    let index = enabled.findIndex((row) => row.key === this.#active);
    if (direction === 'first') index = 0;
    else if (direction === 'last') index = enabled.length - 1;
    else if (index === -1) index = direction === 1 ? 0 : enabled.length - 1;
    else
      index = loop
        ? (index + direction + enabled.length) % enabled.length
        : Math.max(0, Math.min(enabled.length - 1, index + direction));
    this.#activate(enabled[index]!.key);
    return this.#active;
  }

  typeahead(text: string, now = performance.now()): ItemKey | undefined {
    this.sync();
    if (!text) return this.#active;
    this.#buffer = now - this.#typedAt > 500 ? text : this.#buffer + text;
    this.#typedAt = now;
    const parts = [...this.#segmenter!.segment(this.#buffer)].map((item) => item.segment);
    const repeated = parts.every((part) => this.#collator!.compare(part, parts[0]!) === 0);
    const query = repeated ? parts[0]! : this.#buffer;
    const length = [...this.#segmenter!.segment(query)].length;
    const active = this.#active === undefined ? -1 : (this.#index.get(this.#active)?.index ?? -1);
    const start = active + (repeated ? 1 : 0);
    for (let offset = 0; offset < this.#rows.length; offset++) {
      const row = this.#rows[(Math.max(0, start) + offset) % this.#rows.length]!;
      const prefix = [...this.#segmenter!.segment(row.label)]
        .slice(0, length)
        .map((part) => part.segment)
        .join('');
      if (!row.disabled && this.#collator!.compare(prefix, query) === 0) {
        this.#activate(row.key);
        break;
      }
    }
    return this.#active;
  }

  select(current: T | undefined, item: T): T | undefined {
    this.sync();
    const row = this.#index.get(this.key(item));
    return row && !row.disabled ? row.item : current;
  }
  toggle(current: readonly T[], item: T): T[] {
    this.sync();
    const key = this.key(item),
      row = this.#index.get(key);
    if (!row || row.disabled) return [...current];
    return current.some((value) => this.key(value) === key)
      ? current.filter((value) => this.key(value) !== key)
      : [...current, row.item];
  }
  isSelected(value: T | undefined, item: T): boolean {
    return value !== undefined && this.key(value) === this.key(item);
  }
  dispose(): void {
    this.#disposed = true;
    this.#rows = [];
    this.#index.clear();
    this.#active = undefined;
    this.#buffer = '';
    this.#listeners.clear();
  }
}
