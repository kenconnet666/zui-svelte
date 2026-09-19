import {
  autoUpdate,
  arrow,
  computePosition,
  flip,
  hide,
  offset,
  shift,
  size,
  type Placement,
  type ReferenceElement,
  type Strategy,
  type Boundary,
} from '@floating-ui/dom';
import { createSubscriber } from 'svelte/reactivity';

export interface FloatingOptions {
  placement?: Placement;
  strategy?: Strategy;
  gap?: number;
  padding?: number;
  boundary?: Boundary;
  arrow?: HTMLElement;
  animationFrame?: boolean;
  onError?: (error: unknown) => void;
}
export interface FloatingState {
  readonly x: number;
  readonly y: number;
  readonly placement: Placement;
  readonly strategy: Strategy;
  readonly availableWidth: number;
  readonly availableHeight: number;
  readonly referenceWidth: number;
  readonly hidden: boolean;
  readonly ready: boolean;
  readonly arrowX?: number;
  readonly arrowY?: number;
}

/** 专项库只负责几何；返回状态交给 css 绑定，不直接写 style 破坏 CSP。 */
export class FloatingController {
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #stop?: () => void;
  #reference?: ReferenceElement;
  #element?: HTMLElement;
  #version = 0;
  #disposed = false;
  #options: FloatingOptions;
  #state: FloatingState = {
    x: 0,
    y: 0,
    placement: 'bottom-start',
    strategy: 'fixed',
    availableWidth: 0,
    availableHeight: 0,
    referenceWidth: 0,
    hidden: false,
    ready: false,
  };

  constructor(options: FloatingOptions = {}) {
    this.#options = options;
  }
  get state(): FloatingState {
    this.#track();
    return this.#state;
  }
  get connected() {
    return Boolean(this.#stop);
  }

  connect(reference: ReferenceElement, element: HTMLElement): () => void {
    if (this.#disposed) throw new Error('Floating controller is disposed.');
    this.disconnect();
    const context = 'ownerDocument' in reference ? reference : reference.contextElement;
    if (context && context.ownerDocument !== element.ownerDocument)
      throw new Error('Floating elements must share a Document.');
    this.#reference = reference;
    this.#element = element;
    const update = () => {
      void this.update();
    };
    let stop: () => void;
    try {
      stop = autoUpdate(reference, element, update, {
        animationFrame: this.#options.animationFrame,
      });
    } catch (error) {
      this.disconnect();
      throw error;
    }
    const viewport = element.ownerDocument.defaultView?.visualViewport;
    viewport?.addEventListener('resize', update);
    viewport?.addEventListener('scroll', update);
    const cleanup = () => {
      stop();
      viewport?.removeEventListener('resize', update);
      viewport?.removeEventListener('scroll', update);
    };
    this.#stop = cleanup;
    return () => {
      if (this.#stop === cleanup) this.disconnect();
    };
  }

  configure(options: FloatingOptions): void {
    this.#options = options;
    void this.update();
  }

  async update(): Promise<void> {
    if (!this.#reference || !this.#element || this.#disposed) return;
    const version = ++this.#version;
    const reference = this.#reference,
      element = this.#element,
      options = this.#options;
    const context = 'ownerDocument' in reference ? reference : reference.contextElement;
    if (context && !context.isConnected) {
      this.#set({ ...this.#state, hidden: true, ready: false });
      return;
    }
    let availableWidth = 0,
      availableHeight = 0,
      referenceWidth = 0;
    try {
      const result = await computePosition(reference, element, {
        placement: options.placement ?? 'bottom-start',
        strategy: options.strategy ?? 'fixed',
        middleware: [
          offset(options.gap ?? 4),
          flip({ padding: options.padding ?? 8, boundary: options.boundary }),
          shift({ padding: options.padding ?? 8, boundary: options.boundary }),
          size({
            padding: options.padding ?? 8,
            boundary: options.boundary,
            apply(data) {
              availableWidth = Math.max(0, data.availableWidth);
              availableHeight = Math.max(0, data.availableHeight);
              referenceWidth = data.rects.reference.width;
            },
          }),
          ...(options.arrow ? [arrow({ element: options.arrow, padding: 6 })] : []),
          hide({ boundary: options.boundary }),
        ],
      });
      if (this.#disposed || version !== this.#version || !element.isConnected) return;
      this.#set({
        x: result.x,
        y: result.y,
        strategy: result.strategy,
        placement: result.placement,
        availableWidth,
        availableHeight,
        referenceWidth,
        hidden: Boolean(result.middlewareData.hide?.referenceHidden),
        ready: true,
        arrowX: result.middlewareData.arrow?.x,
        arrowY: result.middlewareData.arrow?.y,
      });
    } catch (error) {
      if (this.#disposed || version !== this.#version) return;
      this.#set({ ...this.#state, ready: false });
      if (options.onError) options.onError(error);
      else throw error;
    }
  }

  #set(state: FloatingState) {
    if (
      Object.keys(state).every(
        (key) => state[key as keyof FloatingState] === this.#state[key as keyof FloatingState],
      )
    )
      return;
    this.#state = Object.freeze(state);
    for (const listener of this.#listeners) listener();
  }
  disconnect(): void {
    this.#version++;
    this.#stop?.();
    this.#stop = undefined;
    this.#reference = undefined;
    this.#element = undefined;
    this.#set({ ...this.#state, ready: false });
  }
  dispose(): void {
    if (!this.#disposed) {
      this.disconnect();
      this.#disposed = true;
      this.#listeners.clear();
    }
  }
}
