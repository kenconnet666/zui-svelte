import { styleProtocol } from './protocol.js';

export interface StyleSheet {
  set(key: string, css: string, order: number): void;
  remove(key: string): void;
  entries(): readonly StyleEntry[];
  dispose(): void;
}
export interface StyleEntry {
  readonly key: string;
  readonly css: string;
  readonly order: number;
}

export class MemoryStyleSheet implements StyleSheet {
  protected readonly records = new Map<string, StyleEntry>();
  set(key: string, css: string, order: number): void {
    this.records.set(key, Object.freeze({ key, css, order }));
  }
  remove(key: string): void {
    this.records.delete(key);
  }
  entries(): readonly StyleEntry[] {
    return [...this.records.values()].sort(
      (a, b) => a.order - b.order || a.key.localeCompare(b.key),
    );
  }
  dispose(): void {
    this.records.clear();
  }
}

export class BrowserStyleSheet extends MemoryStyleSheet {
  readonly #nodes = new Map<string, HTMLStyleElement>();
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
    // 全部校验通过才接管，避免后面的坏数据让前面的 SSR 标记被提前消耗。
    for (const element of elements) {
      styleProtocol.check(
        element.dataset.zProtocol ? Number(element.dataset.zProtocol) : undefined,
      );
      const key = element.dataset.zKey;
      const order = Number(element.dataset.zOrder);
      if (!key || !element.dataset.zOrder || !Number.isFinite(order))
        throw new Error('Invalid server style metadata.');
      if (keys.has(key)) throw new Error('Duplicate server style: ' + key);
      if (element.nonce !== (nonce ?? ''))
        throw new Error('Server and client style nonces must match.');
      keys.add(key);
    }
    for (const element of elements) {
      const key = element.dataset.zKey!;
      const order = Number(element.dataset.zOrder);
      this.#nodes.set(key, element);
      super.set(key, element.textContent ?? '', order);
      delete element.dataset.zSsr;
    }
  }

  override set(key: string, css: string, order: number): void {
    let node = this.#nodes.get(key);
    const previous = this.records.get(key);
    if (node && previous?.css === css && previous.order === order) return;
    if (!node) {
      node = this.#document.createElement('style');
      node.dataset.zui = this.namespace;
      node.dataset.zKey = key;
      if (this.nonce) node.nonce = this.nonce;
    }
    node.dataset.zOrder = String(order);
    node.textContent = css;
    const next = this.entries().find(
      (entry) =>
        entry.key !== key &&
        (entry.order > order || (entry.order === order && entry.key.localeCompare(key) > 0)),
    );
    this.#parent.insertBefore(node, next ? this.#nodes.get(next.key)! : null);
    this.#nodes.set(key, node);
    super.set(key, css, order);
  }

  override remove(key: string): void {
    this.#nodes.get(key)?.remove();
    this.#nodes.delete(key);
    super.remove(key);
  }
  override dispose(): void {
    for (const node of this.#nodes.values()) node.remove();
    this.#nodes.clear();
    super.dispose();
  }
}
