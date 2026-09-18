import { styleProtocol } from './protocol.js';
import { escapeStyleText } from '../css/validate.js';

export interface StyleSheet {
  set(key: string, css: string, order: string): void;
  remove(key: string): void;
  entries(): readonly StyleEntry[];
  dispose(): void;
}
export interface StyleEntry {
  readonly key: string;
  readonly css: string;
  readonly order: string;
}

/** @internal 来源与数字位置决定顺序，不能依赖模块到达或实例挂载时序。 */
export function sourceOrder(source: string): string {
  if (source === 'layer-order') return '0';
  const position = source
    .split(':')
    .map((part) => (/^\d+$/u.test(part) ? part.padStart(16, '0') : part))
    .join(':');
  // 保留原来源作为第二排序项，避免补零后的不同来源变成相同排序键。
  return '1' + JSON.stringify([position, source]);
}

function compareText(a: string, b: string): number {
  // 不使用依赖 locale 的比较，保证 Node 与不同浏览器排序一致。
  return a < b ? -1 : a > b ? 1 : 0;
}

function compareEntries(a: StyleEntry, b: StyleEntry): number {
  return compareText(a.order, b.order) || compareText(a.key, b.key);
}

function validOrder(order: string | undefined): order is string {
  if (order === '0') return true;
  if (!order?.startsWith('1[')) return false;
  try {
    const parts: unknown = JSON.parse(order.slice(1));
    return (
      Array.isArray(parts) &&
      parts.length === 2 &&
      typeof parts[1] === 'string' &&
      sourceOrder(parts[1]) === order
    );
  } catch {
    return false;
  }
}

export class MemoryStyleSheet implements StyleSheet {
  protected readonly records = new Map<string, StyleEntry>();
  readonly #ordered: StyleEntry[] = [];
  set(key: string, css: string, order: string): void {
    const previous = this.records.get(key);
    if (previous?.css === css && previous.order === order) return;
    const entry = Object.freeze({ key, css, order });
    if (previous && previous.order === order) {
      this.#ordered[lowerBound(this.#ordered, previous)] = entry;
    } else {
      if (previous) this.#ordered.splice(lowerBound(this.#ordered, previous), 1);
      this.#ordered.splice(lowerBound(this.#ordered, entry), 0, entry);
    }
    this.records.set(key, entry);
  }
  remove(key: string): void {
    const entry = this.records.get(key);
    if (!entry) return;
    this.#ordered.splice(lowerBound(this.#ordered, entry), 1);
    this.records.delete(key);
  }
  entries(): readonly StyleEntry[] {
    return this.#ordered.slice();
  }
  dispose(): void {
    this.records.clear();
    this.#ordered.length = 0;
  }
}

function lowerBound(entries: readonly StyleEntry[], entry: StyleEntry): number {
  let low = 0;
  let high = entries.length;
  while (low < high) {
    const middle = (low + high) >>> 1;
    if (compareEntries(entries[middle]!, entry) < 0) low = middle + 1;
    else high = middle;
  }
  return low;
}

/** @internal 每次变量更新至多重写一个有界分片，不重写整张样式表。 */
export const styleChunkSize = 64;

function attribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

/** @internal 长度基于 HTML 安全转义后的文本，接管无需重复保存完整 CSS。 */
export function serializeStyleTags(
  entries: readonly StyleEntry[],
  namespace: string,
  nonce?: string,
): string {
  const tags: string[] = [];
  for (let start = 0; start < entries.length; start += styleChunkSize) {
    const chunk = entries.slice(start, start + styleChunkSize);
    const css = chunk.map((entry) => escapeStyleText(entry.css));
    const metadata = chunk.map((entry, index) => [entry.key, entry.order, css[index]!.length]);
    tags.push(
      '<style data-z-ssr="" data-z-protocol="' +
        styleProtocol.version +
        '" data-zui="' +
        attribute(namespace) +
        '" data-z-entries="' +
        attribute(JSON.stringify(metadata)) +
        '"' +
        (nonce ? ' nonce="' + attribute(nonce) + '"' : '') +
        '>' +
        css.join('') +
        '</style>',
    );
  }
  return tags.join('');
}

interface StyleChunk {
  node: HTMLStyleElement;
  entries: readonly StyleEntry[];
}

export class BrowserStyleSheet extends MemoryStyleSheet {
  readonly #chunks: StyleChunk[] = [];
  readonly #owners = new Map<string, StyleChunk>();
  readonly #parent: HTMLElement | ShadowRoot;
  readonly #document: Document;

  constructor(
    target: Document | ShadowRoot,
    readonly namespace: string,
    readonly nonce?: string,
  ) {
    super();
    this.#document = target.nodeType === 9 ? (target as Document) : target.ownerDocument!;
    this.#parent = target.nodeType === 9 ? this.#document.head : (target as ShadowRoot);
    if (!this.#parent) throw new Error('The target document has no head.');
    const elements = [
      ...this.#parent.querySelectorAll<HTMLStyleElement>('style[data-zui][data-z-ssr]'),
    ].filter((element) => element.parentNode === this.#parent && element.dataset.zui === namespace);
    const keys = new Set<string>();
    const parsed: StyleChunk[] = [];
    // 全部校验通过才接管，避免后面的坏数据让前面的 SSR 标记被提前消耗。
    for (const element of elements) {
      styleProtocol.check(
        element.dataset.zProtocol ? Number(element.dataset.zProtocol) : undefined,
      );
      if (element.nonce !== (nonce ?? ''))
        throw new Error('Server and client style nonces must match.');
      let metadata: unknown;
      try {
        metadata = JSON.parse(element.dataset.zEntries ?? 'null');
      } catch {
        throw new Error('Invalid server style metadata.');
      }
      if (!Array.isArray(metadata) || !metadata.length || metadata.length > styleChunkSize)
        throw new Error('Invalid server style metadata.');
      const text = element.textContent ?? '';
      let offset = 0;
      const entries: StyleEntry[] = [];
      for (const item of metadata) {
        if (
          !Array.isArray(item) ||
          item.length !== 3 ||
          typeof item[0] !== 'string' ||
          !item[0] ||
          !validOrder(item[1]) ||
          !Number.isSafeInteger(item[2]) ||
          item[2] < 0 ||
          offset + item[2] > text.length
        )
          throw new Error('Invalid server style metadata.');
        const [key, order, length] = item as [string, string, number];
        if (keys.has(key)) throw new Error('Duplicate server style: ' + key);
        keys.add(key);
        const entry = Object.freeze({ key, order, css: text.slice(offset, offset + length) });
        const previous = entries.at(-1) ?? parsed.at(-1)?.entries.at(-1);
        if (previous && compareEntries(previous, entry) >= 0)
          throw new Error('Invalid server style order.');
        entries.push(entry);
        offset += length;
      }
      if (offset !== text.length) throw new Error('Invalid server style metadata.');
      parsed.push({ node: element, entries });
    }
    for (const chunk of parsed) {
      this.#chunks.push(chunk);
      for (const entry of chunk.entries) {
        this.#owners.set(entry.key, chunk);
        super.set(entry.key, entry.css, entry.order);
      }
      delete chunk.node.dataset.zSsr;
      delete chunk.node.dataset.zEntries;
    }
  }

  #node(): HTMLStyleElement {
    const node = this.#document.createElement('style');
    node.dataset.zui = this.namespace;
    if (this.nonce) node.nonce = this.nonce;
    return node;
  }

  #replace(chunk: StyleChunk, entries: readonly StyleEntry[]): void {
    const index = this.#chunks.indexOf(chunk);
    if (!entries.length) {
      chunk.node.remove();
      this.#chunks.splice(index, 1);
      for (const entry of chunk.entries) this.#owners.delete(entry.key);
      return;
    }
    const split = entries.length > styleChunkSize ? Math.ceil(entries.length / 2) : entries.length;
    const first = entries.slice(0, split);
    const rest = entries.slice(split);
    const next = rest.length ? this.#node() : undefined;
    const previousText = chunk.node.textContent;
    try {
      if (next) {
        next.textContent = rest.map((entry) => entry.css).join('');
        this.#parent.insertBefore(next, chunk.node.nextSibling);
      }
      chunk.node.textContent = first.map((entry) => entry.css).join('');
    } catch (error) {
      try {
        next?.remove();
        chunk.node.textContent = previousText;
      } catch (rollback) {
        throw new AggregateError([error, rollback], 'Stylesheet write and rollback failed.', {
          cause: rollback,
        });
      }
      throw error;
    }
    for (const entry of chunk.entries) this.#owners.delete(entry.key);
    chunk.entries = first;
    for (const entry of first) this.#owners.set(entry.key, chunk);
    if (next) {
      const tail = { node: next, entries: rest };
      this.#chunks.splice(index + 1, 0, tail);
      for (const entry of rest) this.#owners.set(entry.key, tail);
    }
  }

  override set(key: string, css: string, order: string): void {
    const previous = this.records.get(key);
    if (previous?.css === css && previous.order === order) return;
    if (previous && previous.order !== order) {
      this.remove(key);
      try {
        this.set(key, css, order);
      } catch (error) {
        try {
          this.set(previous.key, previous.css, previous.order);
        } catch (rollback) {
          throw new AggregateError([error, rollback], 'Stylesheet reorder and rollback failed.', {
            cause: rollback,
          });
        }
        throw error;
      }
      return;
    }
    const entry = Object.freeze({ key, css, order });
    let chunk = this.#owners.get(key);
    if (!chunk) {
      let low = 0;
      let high = this.#chunks.length;
      while (low < high) {
        const middle = (low + high) >>> 1;
        if (compareEntries(this.#chunks[middle]!.entries.at(-1)!, entry) < 0) low = middle + 1;
        else high = middle;
      }
      chunk = this.#chunks[Math.min(low, this.#chunks.length - 1)];
    }
    if (!chunk) {
      const node = this.#node();
      node.textContent = css;
      this.#parent.appendChild(node);
      chunk = { node, entries: [entry] };
      this.#chunks.push(chunk);
      this.#owners.set(key, chunk);
    } else {
      const entries = chunk.entries.slice();
      entries.splice(lowerBound(entries, previous ?? entry), previous ? 1 : 0, entry);
      this.#replace(chunk, entries);
    }
    super.set(key, css, order);
  }

  override remove(key: string): void {
    const chunk = this.#owners.get(key);
    if (chunk)
      this.#replace(
        chunk,
        chunk.entries.filter((entry) => entry.key !== key),
      );
    super.remove(key);
  }
  override dispose(): void {
    for (const chunk of this.#chunks) chunk.node.remove();
    this.#chunks.length = 0;
    this.#owners.clear();
    super.dispose();
  }
}
