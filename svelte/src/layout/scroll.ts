import { createSubscriber } from 'svelte/reactivity';
import { on } from 'svelte/events';
import { capturePointer } from '../internal/interaction.js';

export interface ScrollAxis {
  readonly overflow: boolean;
  readonly length: number;
  readonly offset: number;
  readonly track: number;
  readonly maximum: number;
  readonly position: number;
}
export function scrollAxis(
  view: number,
  extent: number,
  position: number,
  track: number,
  minimum = 24,
): ScrollAxis {
  const maximum = Math.max(0, extent - view);
  const length = maximum ? Math.min(track, Math.max(minimum, (track * view) / extent)) : track;
  const bounded = Math.max(0, Math.min(maximum, position));
  return {
    overflow: maximum > 1,
    length,
    offset: maximum ? ((track - length) * bounded) / maximum : 0,
    track,
    maximum,
    position: bounded,
  };
}
const empty = scrollAxis(0, 0, 0, 0);
interface ScrollState {
  x: ScrollAxis;
  y: ScrollAxis;
  active: boolean;
  rtl: boolean;
}

/** DOM 保存真实滚动位置，这里只协调测量/滑块与一次指针会话，不模拟滚动引擎。 */
export class ScrollController {
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #state = { x: empty, y: empty, active: false, rtl: false };
  #viewport?: HTMLElement;
  #stop?: () => void;
  #cancelPointer = () => {};
  #hover = false;
  #focus = false;
  #drag = false;
  #recent = false;
  #timer?: ReturnType<typeof setTimeout>;
  #disposed = false;
  get state() {
    this.#track();
    return this.#state;
  }
  get viewport() {
    return this.#viewport;
  }
  #publish(next: ScrollState) {
    if (JSON.stringify(next) === JSON.stringify(this.#state)) return;
    this.#state = next;
    for (const listener of this.#listeners) listener();
  }
  #activity() {
    this.#publish({
      ...this.#state,
      active: this.#hover || this.#focus || this.#drag || this.#recent,
    });
  }
  #show = () => {
    this.#recent = true;
    clearTimeout(this.#timer);
    this.#activity();
    this.#timer = setTimeout(() => {
      this.#timer = undefined;
      this.#recent = false;
      this.#activity();
    }, 700);
  };
  measure = () => {
    const viewport = this.#viewport;
    if (!viewport) return;
    const rtl = viewport.ownerDocument.defaultView!.getComputedStyle(viewport).direction === 'rtl';
    // 两条轨道各留一个角，避免同时出现时重叠；不改变 viewport 的尺寸。
    const xOverflow = viewport.scrollWidth > viewport.clientWidth + 1;
    const yOverflow = viewport.scrollHeight > viewport.clientHeight + 1;
    this.#publish({
      ...this.#state,
      rtl,
      x: scrollAxis(
        viewport.clientWidth,
        viewport.scrollWidth,
        rtl ? -viewport.scrollLeft : viewport.scrollLeft,
        Math.max(0, viewport.clientWidth - 4 - (yOverflow ? 12 : 0)),
      ),
      y: scrollAxis(
        viewport.clientHeight,
        viewport.scrollHeight,
        viewport.scrollTop,
        Math.max(0, viewport.clientHeight - 4 - (xOverflow ? 12 : 0)),
      ),
    });
  };
  connect(root: HTMLElement, viewport: HTMLElement, content: HTMLElement): () => void {
    if (this.#disposed) throw new Error('Scroll controller is disposed.');
    this.disconnect();
    this.#viewport = viewport;
    const window = viewport.ownerDocument.defaultView!;
    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          this.measure();
        });
    };
    const observer = new window.ResizeObserver(schedule);
    observer.observe(viewport);
    observer.observe(content);
    // 局部内容节点变化也可能仅改变 scrollWidth，而不改变观察到的边框尺寸。
    const mutation = new window.MutationObserver(schedule);
    mutation.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
    const stops = [
      on(
        viewport,
        'scroll',
        () => {
          this.#recent = true;
          this.#activity();
          if (!('onscrollend' in viewport)) this.#show();
          schedule();
        },
        { passive: true },
      ),
      // 新浏览器用原生结束事件覆盖惯性/键盘/平滑滚动，旧环境保留短延迟退路。
      on(viewport, 'scrollend', this.#show),
      on(root, 'pointerenter', (event) => {
        if (event.pointerType !== 'touch') {
          this.#hover = true;
          this.#activity();
        }
      }),
      on(root, 'pointerleave', () => {
        this.#hover = false;
        this.#show();
      }),
      on(root, 'focusin', () => {
        this.#focus = true;
        this.#activity();
      }),
      on(root, 'focusout', (event) => {
        this.#focus = Boolean(event.relatedTarget && root.contains(event.relatedTarget as Node));
        this.#show();
      }),
      on(window, 'resize', schedule),
    ];
    this.#hover = root.matches(':hover');
    this.#focus = root.matches(':focus-within');
    this.measure();
    this.#activity();
    const cleanup = () => {
      observer.disconnect();
      mutation.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      for (const stop of stops) stop();
    };
    this.#stop = cleanup;
    return () => {
      if (this.#stop === cleanup) this.disconnect();
    };
  }
  drag(event: PointerEvent, axis: 'x' | 'y', thumb: boolean): void {
    if (event.defaultPrevented || event.button !== 0 || !event.isPrimary || !this.#viewport) return;
    this.#cancelPointer();
    this.measure();
    const track = event.currentTarget as HTMLElement;
    const rect = track.getBoundingClientRect();
    const metric = this.#state[axis];
    const coordinate = (pointer: PointerEvent) =>
      axis === 'y'
        ? pointer.clientY - rect.top
        : this.#state.rtl
          ? rect.right - pointer.clientX
          : pointer.clientX - rect.left;
    const grab = thumb ? coordinate(event) - metric.offset : metric.length / 2;
    const update = (pointer: PointerEvent) => {
      const current = this.#state[axis],
        travel = current.track - current.length;
      if (travel <= 0) return;
      const value = Math.max(
        0,
        Math.min(current.maximum, ((coordinate(pointer) - grab) / travel) * current.maximum),
      );
      if (axis === 'y') this.#viewport!.scrollTop = value;
      else this.#viewport!.scrollLeft = this.#state.rtl ? -value : value;
      this.measure();
    };
    if (!thumb) update(event);
    this.#drag = true;
    this.#activity();
    this.#cancelPointer = capturePointer(track, event, {
      move: update,
      end: () => {
        this.#drag = false;
        this.#show();
      },
    });
    event.preventDefault();
  }
  disconnect(): void {
    this.#cancelPointer();
    this.#cancelPointer = () => {};
    this.#stop?.();
    this.#stop = undefined;
    clearTimeout(this.#timer);
    this.#timer = undefined;
    this.#viewport = undefined;
    this.#hover = this.#focus = this.#drag = this.#recent = false;
    this.#publish({ x: empty, y: empty, active: false, rtl: false });
  }
  dispose(): void {
    if (!this.#disposed) {
      this.disconnect();
      this.#disposed = true;
      this.#listeners.clear();
    }
  }
}
