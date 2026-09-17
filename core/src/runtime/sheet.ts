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
    for (const element of this.#parent.querySelectorAll<HTMLStyleElement>('style[data-zui]')) {
      if (element.parentNode !== this.#parent || element.dataset.zui !== namespace) continue;
      const key = element.dataset.zKey;
      const order = Number(element.dataset.zOrder);
      if (!key || !Number.isFinite(order)) throw new Error('Invalid server style metadata.');
      if (this.#nodes.has(key)) throw new Error('Duplicate server style: ' + key);
      this.#nodes.set(key, element);
      super.set(key, element.textContent ?? '', order);
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
