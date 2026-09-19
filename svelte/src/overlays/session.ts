import { createSubscriber } from 'svelte/reactivity';
import { tick } from 'svelte';
import { createLayer, type LayerHandle, type LayerOptions, type CloseRequest } from './layers.js';
import { Presence, animateElement } from './presence.js';
import type { OverlayContext } from './context.js';

export type OverlayCloseEvent = CloseRequest;
export interface SessionOptions extends Omit<LayerOptions, 'element' | 'onClose'> {
  animated?: boolean;
  onclose?: (event: OverlayCloseEvent) => void;
}

/** 打开意图由组件持有；此处统一 DOM 保留、Layer 与动画资源的先后顺序。 */
export class OverlaySession implements OverlayContext {
  readonly presence: Presence;
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #element?: HTMLElement;
  #layer?: LayerHandle;
  #desired?: boolean;
  #options?: SessionOptions;
  #disposed = false;
  #revision = 0;
  constructor(
    open: boolean,
    readonly write: (open: boolean) => void,
  ) {
    this.presence = new Presence(open);
  }
  get host() {
    this.#track();
    return this.#element;
  }
  get layer() {
    this.#track();
    return this.#layer;
  }
  #notify() {
    for (const listener of this.#listeners) listener();
  }
  attach(element: HTMLElement): () => void {
    this.#element = element;
    this.#notify();
    return () => {
      if (this.#element === element) {
        this.#revision++;
        this.#layer?.dispose();
        this.#layer = undefined;
        this.#element = undefined;
        this.#desired = undefined;
        this.#notify();
      }
    };
  }
  requestClose = (event: CloseRequest) => {
    try {
      this.#options?.onclose?.(event);
    } finally {
      if (!event.cancelable) this.write(false);
    }
    if (event.cancelable && !event.defaultPrevented) this.write(false);
  };
  close = (event?: Event) => {
    this.#layer?.requestClose('programmatic', event);
  };
  async sync(open: boolean, options: SessionOptions): Promise<void> {
    if (this.#disposed) return;
    this.#options = options;
    const element = this.#element;
    if (!element) return;
    const revision = ++this.#revision;
    if (open && (!this.#layer || this.#layer.stateValue === 'closed')) {
      // 定位状态更新和 DOM 可见性先提交，再读取 tabbable，避免聚焦仍隐藏的面板。
      await tick();
      if (this.#disposed || revision !== this.#revision || element !== this.#element) return;
    }
    if (open) {
      if (!this.#layer || this.#layer.stateValue === 'closed') {
        this.#layer = createLayer({ ...options, element, onClose: this.requestClose });
        this.#notify();
      } else {
        Object.assign(this.#layer.options, options);
        if (this.#layer.stateValue === 'closing') this.#layer.cancelExit();
      }
    }
    if (this.#desired === open) return;
    this.#desired = open;
    if (!open) this.#layer?.beginExit();
    await this.presence.set(open, async (signal) => {
      try {
        if (options.animated !== false) {
          const duration = element.ownerDocument
            .defaultView!.getComputedStyle(element)
            .transitionDuration.split(',')[0]!;
          const ms = Number.parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000);
          await animateElement(
            element,
            open ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }],
            { duration: Number.isFinite(ms) ? ms : 0 },
            signal,
          );
        }
      } finally {
        if (!open && !signal.aborted) {
          this.#layer?.dispose();
          this.#layer = undefined;
          this.#notify();
        }
      }
    });
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#revision++;
    this.presence.dispose();
    this.#layer?.dispose();
    this.#layer = undefined;
    this.#element = undefined;
    this.#options = undefined;
    this.#listeners.clear();
  }
}
