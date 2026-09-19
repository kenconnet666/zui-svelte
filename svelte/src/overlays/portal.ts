import { activeElement, composedContains, styleRoot } from '../internal/dom.js';
import type { ThemeHost } from '../runtime/theme-context.js';

/** 同一渲染根内移动 DOM，逻辑 Svelte context 不变；主题复用现有 marker，不复制整份 Token。 */
export class PortalMount {
  readonly #placeholder: Comment;
  readonly #root: Document | ShadowRoot;
  readonly #originalDir: string | null;
  #target?: HTMLElement | ShadowRoot;
  #marker?: string;
  #addedMarker = false;
  #appliedDir?: string;
  #disposed = false;

  constructor(
    readonly element: HTMLElement,
    target?: HTMLElement | ShadowRoot,
    theme?: ThemeHost,
  ) {
    this.#root = styleRoot(element);
    this.#placeholder = element.ownerDocument.createComment('zui-portal');
    this.#originalDir = element.getAttribute('dir');
    element.before(this.#placeholder);
    try {
      this.update(target, theme);
    } catch (error) {
      this.#placeholder.remove();
      throw error;
    }
  }

  update(target?: HTMLElement | ShadowRoot, theme?: ThemeHost): void {
    if (this.#disposed) throw new Error('Portal is disposed.');
    const destination =
      target ??
      (this.#root.nodeType === 9 ? (this.#root as Document).body : (this.#root as ShadowRoot));
    if (styleRoot(destination) !== this.#root)
      throw new Error(
        'Cross-root portals require an explicitly hosted subtree; styles cannot silently cross ShadowRoot boundaries.',
      );
    if (composedContains(this.element, destination))
      throw new Error('A portal cannot contain its destination.');
    if (destination !== this.#target) {
      const focused = activeElement(this.element.ownerDocument);
      // 支持时保留 DOM 状态；旧浏览器只恢复本次移动前已有的内部焦点。
      if ('moveBefore' in destination && this.element.isConnected && destination.isConnected)
        destination.moveBefore(this.element, null);
      else {
        destination.append(this.element);
        if (focused && composedContains(this.element, focused) && 'focus' in focused)
          (focused as HTMLElement).focus({ preventScroll: true });
      }
      this.#target = destination;
    }
    if (theme?.marker !== this.#marker) {
      if (this.#marker && this.#addedMarker) this.element.classList.remove(this.#marker);
      this.#marker = theme?.marker;
      this.#addedMarker = Boolean(this.#marker && !this.element.classList.contains(this.#marker));
      if (this.#marker) this.element.classList.add(this.#marker);
    }
    if (this.#originalDir === null) {
      const direction =
        theme?.dir ??
        this.element.ownerDocument.defaultView?.getComputedStyle(
          this.#placeholder.parentElement ?? this.element,
        ).direction;
      if (direction === 'ltr' || direction === 'rtl' || direction === 'auto') {
        this.element.setAttribute('dir', direction);
        this.#appliedDir = direction;
      }
    }
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    const focused = activeElement(this.element.ownerDocument);
    if (this.#marker && this.#addedMarker) this.element.classList.remove(this.#marker);
    if (this.#originalDir === null && this.element.getAttribute('dir') === this.#appliedDir)
      this.element.removeAttribute('dir');
    if (this.element.isConnected && this.#placeholder.isConnected) {
      const parent = this.#placeholder.parentNode!;
      if ('moveBefore' in parent && typeof parent.moveBefore === 'function')
        parent.moveBefore(this.element, this.#placeholder);
      else this.#placeholder.replaceWith(this.element);
      if (focused && composedContains(this.element, focused) && 'focus' in focused)
        (focused as HTMLElement).focus({ preventScroll: true });
    } else this.element.remove();
    this.#placeholder.remove();
    this.#target = undefined;
  }
}
