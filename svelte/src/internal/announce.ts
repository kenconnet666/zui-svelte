/** 每个组件树显式拥有一个播报宿主；宿主的隐藏样式由 css 提供，不写 inline style。 */
export class LiveAnnouncer {
  readonly #lanes: Record<'polite' | 'assertive', HTMLDivElement>;
  readonly #timers = new Map<'polite' | 'assertive', ReturnType<typeof setTimeout>>();
  readonly #last = new Map<string, number>();
  #disposed = false;
  constructor(element: HTMLElement) {
    const create = (priority: 'polite' | 'assertive') => {
      const node = element.ownerDocument.createElement('div');
      node.setAttribute('aria-live', priority);
      node.setAttribute('aria-atomic', 'true');
      element.append(node);
      return node;
    };
    this.#lanes = { polite: create('polite'), assertive: create('assertive') };
  }
  announce(text: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (this.#disposed || !text.trim()) return;
    const now = Date.now(),
      key = priority + ':' + text;
    if (now - (this.#last.get(key) ?? -Infinity) < 1000) return;
    for (const [message, time] of this.#last) if (now - time >= 1000) this.#last.delete(message);
    this.#last.set(key, now);
    clearTimeout(this.#timers.get(priority));
    this.#lanes[priority].textContent = '';
    // 清空与写入跨一个任务，使相同文本的后续真实状态变化仍能被读屏感知。
    this.#timers.set(
      priority,
      setTimeout(() => {
        this.#timers.delete(priority);
        this.#lanes[priority].textContent = text;
      }, 50),
    );
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    for (const timer of this.#timers.values()) clearTimeout(timer);
    this.#timers.clear();
    this.#last.clear();
    this.#lanes.polite.remove();
    this.#lanes.assertive.remove();
  }
}
