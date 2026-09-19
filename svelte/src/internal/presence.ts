import { createSubscriber } from 'svelte/reactivity';

export type PresencePhase = 'closed' | 'entering' | 'open' | 'exiting';
export type Transition = (signal: AbortSignal) => void | Promise<void>;

/** 退出期间保留 DOM/层资源；反向切换只接受最新一次过渡的完成结果。 */
export class Presence {
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #phase: PresencePhase;
  #abort?: AbortController;
  #version = 0;
  #disposed = false;

  constructor(open = false) {
    this.#phase = open ? 'open' : 'closed';
  }
  get phase() {
    this.#track();
    return this.#phase;
  }
  get mounted() {
    this.#track();
    return this.#phase !== 'closed';
  }
  #set(phase: PresencePhase) {
    this.#phase = phase;
    for (const listener of this.#listeners) listener();
  }

  async set(open: boolean, transition?: Transition): Promise<boolean> {
    if (this.#disposed) throw new Error('Presence is disposed.');
    const target = open ? 'open' : 'closed';
    if (this.#phase === target && !this.#abort) return true;
    this.#abort?.abort();
    const abort = new AbortController();
    this.#abort = abort;
    const version = ++this.#version;
    this.#set(open ? 'entering' : 'exiting');
    try {
      await transition?.(abort.signal);
      if (this.#disposed || version !== this.#version || abort.signal.aborted) return false;
      this.#set(target);
      return true;
    } catch (error) {
      if (this.#disposed || version !== this.#version || abort.signal.aborted) return false;
      this.#set(target);
      throw error;
    } finally {
      if (version === this.#version) this.#abort = undefined;
    }
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#version++;
    this.#abort?.abort();
    this.#abort = undefined;
    this.#phase = 'closed';
    this.#listeners.clear();
  }
}

export async function animateElement(
  element: HTMLElement,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
  signal: AbortSignal,
): Promise<void> {
  if (
    signal.aborted ||
    element.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return;
  const animation = element.animate(frames, { ...options, fill: 'both' });
  const abort = () => animation.cancel();
  signal.addEventListener('abort', abort, { once: true });
  try {
    await animation.finished;
  } finally {
    signal.removeEventListener('abort', abort);
    animation.cancel();
  }
}
