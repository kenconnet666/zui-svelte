import {
  Virtualizer,
  defaultRangeExtractor,
  elementScroll,
  observeElementOffset,
  observeElementRect,
  type VirtualItem,
} from '@tanstack/virtual-core';
import { createSubscriber } from 'svelte/reactivity';
import { assertKey, type ItemKey } from './collection.js';

export interface VirtualOptions {
  count: number;
  getKey: (index: number) => ItemKey;
  estimateSize: (index: number) => number;
  activeIndex?: number;
  overscan?: number;
  initialRect?: { width: number; height: number };
}

/** TanStack 的小型 Svelte 接入；只输出几何，DOM 仍用 css 与稳定 key 渲染。 */
export class VirtualCollection {
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  readonly #virtualizer: Virtualizer<HTMLElement, HTMLElement>;
  #options: VirtualOptions;
  #keys: readonly ItemKey[] = [];
  #getKey = (index: number): ItemKey => index;
  #element?: HTMLElement;
  #cleanup?: () => void;
  #disposed = false;

  constructor(options: VirtualOptions) {
    this.#options = options;
    this.#setKeys(options);
    this.#virtualizer = new Virtualizer(this.#settings());
  }
  get items(): readonly VirtualItem[] {
    this.#track();
    return this.#disposed ? [] : this.#virtualizer.getVirtualItems();
  }
  get totalSize(): number {
    this.#track();
    return this.#disposed ? 0 : this.#virtualizer.getTotalSize();
  }
  get measuredCount() {
    return this.#virtualizer.elementsCache.size;
  }
  get connected() {
    return Boolean(this.#cleanup);
  }
  #notify = () => {
    for (const listener of this.#listeners) listener();
  };

  #setKeys(options: VirtualOptions) {
    if (!Number.isSafeInteger(options.count) || options.count < 0)
      throw new RangeError('Virtual count must be a non-negative safe integer.');
    const keys = Array.from({ length: options.count }, (_, index) =>
      assertKey(options.getKey(index)),
    );
    if (new Set(keys).size !== keys.length)
      throw new Error('Virtual items require unique stable keys.');
    if (keys.length !== this.#keys.length || keys.some((key, index) => key !== this.#keys[index])) {
      this.#keys = keys;
      this.#getKey = (index) => keys[index]!;
    }
  }
  #settings() {
    const options = this.#options;
    return {
      count: options.count,
      getItemKey: this.#getKey,
      getScrollElement: () => this.#element ?? null,
      estimateSize: (index: number) => {
        const size = this.#options.estimateSize(index);
        if (!Number.isFinite(size) || size <= 0)
          throw new RangeError('Virtual size estimates must be positive and finite.');
        return size;
      },
      initialRect: options.initialRect ?? { width: 0, height: 360 },
      overscan: options.overscan ?? 2,
      scrollToFn: elementScroll,
      observeElementOffset,
      observeElementRect,
      useAnimationFrameWithResizeObserver: true,
      onChange: this.#notify,
      rangeExtractor: (range: Parameters<typeof defaultRangeExtractor>[0]) => {
        const indexes = defaultRangeExtractor(range);
        const active = options.activeIndex;
        // aria-activedescendant 指向的节点必须实际存在，即使滚动窗口已移开。
        if (
          active !== undefined &&
          active >= 0 &&
          active < options.count &&
          !indexes.includes(active)
        )
          indexes.push(active);
        return indexes.sort((a, b) => a - b);
      },
    };
  }

  configure(options: VirtualOptions): void {
    if (this.#disposed) throw new Error('Virtual collection is disposed.');
    this.#setKeys(options);
    this.#options = options;
    this.#virtualizer.setOptions(this.#settings());
    if (this.#element) this.#virtualizer._willUpdate();
    this.#notify();
  }
  connect(element: HTMLElement): () => void {
    if (this.#disposed) throw new Error('Virtual collection is disposed.');
    this.disconnect();
    this.#element = element;
    const stop = this.#virtualizer._didMount();
    this.#cleanup = stop;
    this.#virtualizer._willUpdate();
    return () => {
      if (this.#cleanup === stop) this.disconnect();
    };
  }
  measure(element: HTMLElement, index: number): () => void {
    if (this.#disposed) throw new Error('Virtual collection is disposed.');
    element.setAttribute('data-index', String(index));
    this.#virtualizer.measureElement(element);
    return () => {
      // Svelte 在清理 attachment 后才移除 DOM；下一微任务清掉已经脱离的测量节点。
      queueMicrotask(() => {
        if (!this.#disposed) this.#virtualizer.measureElement(null);
      });
    };
  }
  scrollTo(index: number): void {
    if (index >= 0 && index < this.#options.count)
      this.#virtualizer.scrollToIndex(index, { align: 'auto', behavior: 'auto' });
  }
  disconnect(): void {
    this.#cleanup?.();
    this.#cleanup = undefined;
    this.#element = undefined;
    this.#virtualizer.elementsCache.clear();
  }
  dispose(): void {
    if (this.#disposed) return;
    this.disconnect();
    this.#disposed = true;
    this.#keys = [];
    this.#options = { count: 0, getKey: () => 0, estimateSize: () => 1 };
    this.#getKey = () => 0;
    this.#virtualizer.setOptions({ ...this.#settings(), enabled: false });
    this.#virtualizer.measure();
    this.#virtualizer.getVirtualItems();
    this.#listeners.clear();
  }
}
