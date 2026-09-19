import { on } from 'svelte/events';

/** 局部键盘行为只处理本组件明确消费的键；Escape 统一交给 Layer。 */
export function keyboardScope(
  element: HTMLElement,
  handle: (event: KeyboardEvent) => boolean,
  options: { editable?: boolean } = {},
): () => void {
  const keydown = (event: KeyboardEvent) => {
    if (
      event.defaultPrevented ||
      event.isComposing ||
      event.keyCode === 229 ||
      event.key === 'Escape' ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    )
      return;
    const target = event.composedPath()[0];
    if (
      !options.editable &&
      target instanceof element.ownerDocument.defaultView!.HTMLElement &&
      (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/u.test(target.tagName))
    )
      return;
    if (handle(event)) event.preventDefault();
  };
  // 先运行 Svelte 委托的子元素处理器，使用者 preventDefault 才能取消库行为。
  return on(element, 'keydown', keydown);
}

export interface PointerSession {
  move: (event: PointerEvent) => void;
  end: (canceled: boolean, event?: PointerEvent) => void;
}

/** 一次原生指针会话；拥有者卸载时调用返回的取消函数，不另建拖放框架。 */
export function capturePointer(
  element: HTMLElement,
  start: PointerEvent,
  callbacks: PointerSession,
): () => void {
  if (start.button !== 0 || !start.isPrimary || start.defaultPrevented) return () => {};
  const window = element.ownerDocument.defaultView!;
  const id = start.pointerId;
  let active = true;
  const finish = (canceled: boolean, event?: PointerEvent) => {
    if (!active || (event && event.pointerId !== id)) return;
    active = false;
    element.removeEventListener('pointermove', move);
    element.removeEventListener('pointerup', up);
    element.removeEventListener('pointercancel', cancel);
    element.removeEventListener('lostpointercapture', cancel);
    window.removeEventListener('blur', blur);
    try {
      if (element.hasPointerCapture(id)) element.releasePointerCapture(id);
    } finally {
      callbacks.end(canceled, event);
    }
  };
  const move = (event: PointerEvent) => {
    if (event.pointerId !== id) return;
    try {
      callbacks.move(event);
    } catch (error) {
      finish(true, event);
      throw error;
    }
  };
  const up = (event: PointerEvent) => finish(false, event);
  const cancel = (event: PointerEvent) => finish(true, event);
  const blur = () => finish(true);
  try {
    element.setPointerCapture(id);
  } catch (error) {
    finish(true);
    throw error;
  }
  element.addEventListener('pointermove', move);
  element.addEventListener('pointerup', up);
  element.addEventListener('pointercancel', cancel);
  element.addEventListener('lostpointercapture', cancel);
  window.addEventListener('blur', blur);
  return () => finish(true);
}
