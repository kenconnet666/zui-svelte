import { createRuntime, type StyleResource, type StyleRuntime } from '@zui/core';
import { createFocusTrap, type FocusTrap } from 'focus-trap';
import { isFocusable, tabbable } from 'tabbable';
import { createSubscriber } from 'svelte/reactivity';
import { activeElement, cleanAll, composedContains, styleRoot } from '../internal/dom.js';

export type CloseReason =
  'escape' | 'outside' | 'focus-outside' | 'programmatic' | 'parent' | 'removed';
export interface CloseRequest {
  readonly reason: CloseReason;
  readonly originalEvent?: Event;
  readonly cancelable: boolean;
  readonly defaultPrevented: boolean;
  preventDefault(): void;
}
export interface LayerOptions {
  element: HTMLElement;
  parent?: LayerHandle;
  trigger?: HTMLElement;
  backdrop?: HTMLElement;
  modal?: boolean;
  nonce?: string;
  baseZIndex?: number;
  closeOnEscape?: boolean;
  closeOnOutside?: boolean;
  closeOnFocusOutside?: boolean;
  initialFocus?: HTMLElement | false | (() => HTMLElement | false);
  returnFocus?: false | (() => HTMLElement | undefined);
  getShadowRoot?: (element: Element) => ShadowRoot | null;
  onClose: (request: CloseRequest) => void;
}
type Sheet = StyleRuntime<Record<never, never>>;
type State = 'open' | 'closing' | 'closed';
const managers = new WeakMap<Document, LayerManager>();
let nextManager = 0;

function request(reason: CloseReason, originalEvent?: Event, cancelable = true): CloseRequest {
  let prevented = false;
  return {
    reason,
    originalEvent,
    cancelable,
    get defaultPrevented() {
      return prevented;
    },
    preventDefault() {
      if (cancelable) prevented = true;
    },
  };
}

export class LayerHandle {
  stateValue: State = 'open';
  indexValue = 0;
  resources: StyleResource[] = [];
  readonly previousFocus: Element | null;
  readonly saved = new Map<HTMLElement, Map<string, string | null>>();

  constructor(
    readonly manager: LayerManager,
    readonly id: string,
    readonly options: LayerOptions,
  ) {
    this.previousFocus = activeElement(options.element.ownerDocument, (node) =>
      manager.shadow(node),
    );
  }
  get state() {
    this.manager.track();
    return this.stateValue;
  }
  get zIndex() {
    this.manager.track();
    return this.indexValue;
  }
  requestClose(reason: CloseReason = 'programmatic', event?: Event): boolean {
    if (this.stateValue !== 'open') return false;
    const close = request(reason, event);
    // 回调失败时仍保持受管理的 open 状态；外部模型若已改变会由所属组件清理。
    this.options.onClose(close);
    if (close.defaultPrevented) return false;
    if (this.stateValue === 'open') this.beginExit();
    return true;
  }
  beginExit(): void {
    this.manager.beginExit(this);
  }
  cancelExit(): void {
    if (this.stateValue === 'closed') throw new Error('Closed layers cannot reopen.');
    this.stateValue = 'open';
    this.manager.refresh();
  }
  dispose(): void {
    this.manager.remove(this);
  }
}

class LayerManager {
  readonly #entries: LayerHandle[] = [];
  readonly #sheets = new Map<Document | ShadowRoot, Sheet>();
  readonly #inert = new Map<HTMLElement, string | null>();
  readonly #listeners = new Set<() => void>();
  readonly #subscribe = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  readonly #trapStack: FocusTrap[] = [];
  readonly #token = 'zui-layer-' + ++nextManager;
  #sequence = 0;
  #trap?: FocusTrap;
  #trapOwner?: LayerHandle;
  #observer?: MutationObserver;
  #scroll?: StyleResource;
  #savedLock: string | null = null;
  #touch?: { layer: LayerHandle; id: number; x: number; y: number; moved: boolean };
  #syncing = false;

  constructor(
    readonly document: Document,
    readonly nonce?: string,
    readonly base = 1000,
  ) {}
  track() {
    this.#subscribe();
  }
  get stats() {
    return {
      layers: this.#entries.length,
      sheets: this.#sheets.size,
      inert: this.#inert.size,
      traps: this.#trap ? 1 : 0,
      listening: Boolean(this.#observer),
    };
  }

  shadow(element: Element): ShadowRoot | null {
    if (element.shadowRoot) return element.shadowRoot;
    for (const entry of this.#entries) {
      const supplied = entry.options.getShadowRoot?.(element);
      if (supplied) return supplied;
      let root: Node = entry.options.element.getRootNode();
      while (root.nodeType === 11 && 'host' in root) {
        if ((root as ShadowRoot).host === element) return root as ShadowRoot;
        root = (root as ShadowRoot).host.getRootNode();
      }
    }
    return null;
  }
  #descendant(entry: LayerHandle, parent: LayerHandle): boolean {
    for (let current = entry.options.parent; current; current = current.options.parent)
      if (current === parent) return true;
    return false;
  }
  #branch(entry: LayerHandle): LayerHandle[] {
    return this.#entries.filter((item) => item === entry || this.#descendant(item, entry));
  }
  #inside(entry: LayerHandle, target: Node | null, trigger = true): boolean {
    return (
      this.#branch(entry).some((item) => composedContains(item.options.element, target)) ||
      Boolean(trigger && entry.options.trigger && composedContains(entry.options.trigger, target))
    );
  }
  #top() {
    return this.#entries.at(-1);
  }
  #modal() {
    return this.#entries.findLast((entry) => entry.options.modal);
  }

  add(options: LayerOptions): LayerHandle {
    if (!Number.isSafeInteger(this.base) || this.base < 0 || this.base > 2_000_000_000)
      throw new RangeError('Layer base z-index must be a non-negative safe CSS integer.');
    if (
      options.backdrop &&
      (!options.backdrop.isConnected || options.backdrop.ownerDocument !== this.document)
    )
      throw new Error('A backdrop must be connected to the same Document.');
    if (!options.element.isConnected || options.element.ownerDocument !== this.document)
      throw new Error('Layer elements must be connected to their owning Document.');
    if (this.#entries.some((entry) => entry.options.element === options.element))
      throw new Error('An element already owns a layer.');
    if (options.parent && (options.parent.manager !== this || options.parent.stateValue !== 'open'))
      throw new Error('The parent layer is not open in this Document.');
    const modal = this.#modal();
    if (
      modal &&
      !options.modal &&
      options.parent !== modal &&
      !(options.parent && this.#descendant(options.parent, modal))
    )
      throw new Error('A non-modal layer must belong to the active modal.');
    const handle = new LayerHandle(this, this.#token + '-' + ++this.#sequence, options);
    this.#entries.push(handle);
    try {
      this.#attribute(handle, options.element, 'data-zui-layer', handle.id);
      if (!options.element.hasAttribute('tabindex'))
        this.#attribute(handle, options.element, 'tabindex', '-1');
      if (options.backdrop)
        this.#attribute(handle, options.backdrop, 'data-zui-backdrop', handle.id);
      this.#start();
      this.refresh(true);
      if (!options.modal && options.initialFocus) {
        const target =
          typeof options.initialFocus === 'function'
            ? options.initialFocus()
            : options.initialFocus;
        if (target) target.focus({ preventScroll: true });
      }
      return handle;
    } catch (error) {
      try {
        this.remove(handle, false);
      } catch (cleanup) {
        throw new AggregateError([error, cleanup], 'Layer activation and rollback failed', {
          cause: cleanup,
        });
      }
      throw error;
    }
  }

  #attribute(entry: LayerHandle, element: HTMLElement, name: string, value: string) {
    let saved = entry.saved.get(element);
    if (!saved) {
      saved = new Map();
      entry.saved.set(element, saved);
    }
    if (!saved.has(name)) saved.set(name, element.getAttribute(name));
    element.setAttribute(name, value);
  }
  #sheet(root: Document | ShadowRoot): Sheet {
    let sheet = this.#sheets.get(root);
    if (!sheet) {
      sheet = createRuntime({
        target: root,
        namespace: this.#token,
        nonce: this.nonce,
        variables: 'stylesheet',
      });
      this.#sheets.set(root, sheet);
      if (root.nodeType === 11) this.#observer?.observe(root, { childList: true, subtree: true });
    }
    return sheet;
  }

  beginExit(entry: LayerHandle) {
    if (entry.stateValue !== 'open') return;
    entry.stateValue = 'closing';
    const children = this.#branch(entry)
      .filter((child) => child !== entry)
      .reverse();
    try {
      cleanAll(children.map((child) => () => this.remove(child, false, 'parent')));
    } finally {
      this.refresh();
    }
  }

  remove(entry: LayerHandle, restore = true, forced?: CloseReason): void {
    if (entry.stateValue === 'closed') return;
    const branch = this.#branch(entry).reverse();
    const active = activeElement(this.document, (node) => this.shadow(node));
    const restoreAllowed =
      restore && (!active || active === this.document.body || this.#inside(entry, active, false));
    const errors: unknown[] = [];
    // 先原子撤销分支，再调用可能重入的业务回调，避免 splice(-1) 或重复关闭。
    for (const item of branch) {
      item.stateValue = 'closed';
      const index = this.#entries.indexOf(item);
      if (index >= 0) this.#entries.splice(index, 1);
    }
    for (const item of branch) {
      try {
        cleanAll(item.resources.map((resource) => () => resource.dispose()));
      } catch (error) {
        errors.push(error);
      }
      item.resources = [];
      for (const [element, attributes] of item.saved)
        for (const [name, value] of attributes) {
          if (value === null) element.removeAttribute(name);
          else element.setAttribute(name, value);
        }
      item.saved.clear();
    }
    for (const item of branch) {
      const reason = item === entry ? forced : 'parent';
      if (reason)
        try {
          item.options.onClose(request(reason, undefined, false));
        } catch (error) {
          errors.push(error);
        }
    }
    try {
      this.refresh();
    } catch (error) {
      errors.push(error);
    }
    const current = activeElement(this.document, (node) => this.shadow(node));
    const stillOwned =
      !current ||
      current === this.document.body ||
      branch.some((item) => composedContains(item.options.element, current));
    if (restoreAllowed && stillOwned && entry.options.returnFocus !== false) {
      const target = entry.options.returnFocus?.() ?? entry.options.trigger ?? entry.previousFocus;
      const modal = this.#modal();
      const permitted =
        target && target.isConnected && (!modal || this.#inside(modal, target, false));
      if (
        permitted &&
        isFocusable(target, { getShadowRoot: (node) => this.shadow(node) ?? undefined })
      )
        (target as HTMLElement).focus({ preventScroll: true });
      else if (modal) {
        const first = tabbable(modal.options.element, {
          getShadowRoot: (node) => this.shadow(node) ?? undefined,
        })[0];
        (first ?? modal.options.element).focus({ preventScroll: true });
      }
    }
    if (errors.length) throw new AggregateError(errors, 'Layer cleanup failed');
  }

  refresh(opening = false): void {
    if (this.#syncing) return;
    this.#syncing = true;
    try {
      const modal = this.#modal();
      if (modal !== this.#trapOwner) {
        this.#trap?.deactivate({ returnFocus: false });
        this.#trap = undefined;
        this.#trapOwner = undefined;
      }
      for (const [index, entry] of this.#entries.entries()) {
        entry.indexValue = this.base + index * 2 + 1;
        const next = [
          this.#sheet(styleRoot(entry.options.element)).global(
            '[data-zui-layer="' + entry.id + '"]',
            (s) => {
              s.zIndex(entry.indexValue);
              if (entry.stateValue === 'closing') s.pointerEvents.none;
            },
          ),
        ];
        try {
          if (entry.options.backdrop)
            next.push(
              this.#sheet(styleRoot(entry.options.backdrop)).global(
                '[data-zui-backdrop="' + entry.id + '"]',
                (s) => {
                  s.zIndex(entry.indexValue - 1);
                },
              ),
            );
        } catch (error) {
          try {
            cleanAll(next.map((resource) => () => resource.dispose()));
          } catch (cleanup) {
            throw new AggregateError([error, cleanup], 'Layer style rollback failed', {
              cause: cleanup,
            });
          }
          throw error;
        }
        const previous = entry.resources;
        entry.resources = next;
        cleanAll(previous.map((resource) => () => resource.dispose()));
      }
      this.#restoreInert();
      if (modal) {
        const allowed = this.#branch(modal).flatMap((entry) => [
          entry.options.element,
          ...(entry.options.backdrop ? [entry.options.backdrop] : []),
        ]);
        const visit = (element: Element) => {
          if (['STYLE', 'SCRIPT', 'LINK', 'TEMPLATE'].includes(element.tagName)) return;
          if (allowed.some((root) => composedContains(root, element))) return;
          if (!allowed.some((root) => composedContains(element, root))) {
            const node = element as HTMLElement;
            this.#inert.set(node, node.getAttribute('inert'));
            node.setAttribute('inert', '');
          } else {
            for (const child of element.children) visit(child);
            const shadow = this.shadow(element);
            if (shadow) for (const child of shadow.children) visit(child);
          }
        };
        for (const child of this.document.body.children) visit(child);
        this.#lockScroll();
        const containers = this.#branch(modal).map((entry) => entry.options.element);
        if (this.#trap) this.#trap.updateContainerElements(containers);
        else {
          const initial = opening ? modal.options.initialFocus : false;
          this.#trap = createFocusTrap(containers, {
            document: this.document,
            trapStack: this.#trapStack,
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
            allowOutsideClick: true,
            returnFocusOnDeactivate: false,
            delayInitialFocus: false,
            preventScroll: true,
            initialFocus: initial,
            fallbackFocus: modal.options.element,
            tabbableOptions: { getShadowRoot: (node) => this.shadow(node) ?? undefined },
          });
          this.#trapOwner = modal;
          this.#trap.activate();
        }
      } else this.#unlockScroll();
      if (!this.#entries.length) this.#stop();
      for (const listener of this.#listeners) listener();
    } finally {
      this.#syncing = false;
    }
  }

  #lockScroll() {
    if (this.#scroll) return;
    const root = this.document.documentElement,
      window = this.document.defaultView!;
    const gap = Math.max(0, window.innerWidth - root.clientWidth);
    const padding = window.getComputedStyle(root).paddingInlineEnd;
    this.#savedLock = root.getAttribute('data-zui-scroll-lock');
    this.#scroll = this.#sheet(this.document).global(
      'html[data-zui-scroll-lock="' + this.#token + '"]',
      (s) => {
        s.overflow.hidden;
        s.overscrollBehavior.none;
        if (gap) s.paddingInlineEnd('calc(' + padding + ' + ' + gap + 'px)');
      },
    );
    root.setAttribute('data-zui-scroll-lock', this.#token);
  }
  #unlockScroll() {
    if (!this.#scroll) return;
    const resource = this.#scroll;
    this.#scroll = undefined;
    const root = this.document.documentElement;
    try {
      resource.dispose();
    } finally {
      if (root.getAttribute('data-zui-scroll-lock') === this.#token) {
        if (this.#savedLock === null) root.removeAttribute('data-zui-scroll-lock');
        else root.setAttribute('data-zui-scroll-lock', this.#savedLock);
      }
    }
  }
  #restoreInert() {
    for (const [element, value] of this.#inert) {
      if (element.getAttribute('inert') !== '') continue;
      if (value === null) element.removeAttribute('inert');
      else element.setAttribute('inert', value);
    }
    this.#inert.clear();
  }

  #key = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || event.isComposing || event.defaultPrevented) return;
    const top = this.#top();
    if (!top) return;
    if (top.stateValue === 'closing') {
      event.preventDefault();
      return;
    }
    if (top.options.closeOnEscape !== false && top.requestClose('escape', event))
      event.preventDefault();
  };
  #down = (event: PointerEvent) => {
    const top = this.#top();
    if (!top || event.defaultPrevented || event.button !== 0) return;
    if (event.pointerType === 'touch' && !event.isPrimary) {
      this.#touch = undefined;
      return;
    }
    const target = event.composedPath()[0] as Node;
    if (
      this.#inside(top, target) ||
      top.stateValue !== 'open' ||
      top.options.closeOnOutside === false
    )
      return;
    if (event.pointerType === 'touch') {
      this.#touch = event.isPrimary
        ? { layer: top, id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
        : undefined;
    } else if (top.requestClose('outside', event) && top.options.modal) {
      // 模态背景的原生 pointerdown 聚焦发生在回调之后，会覆盖刚恢复的触发器焦点。
      event.preventDefault();
    }
  };
  #move = (event: PointerEvent) => {
    if (
      this.#touch?.id === event.pointerId &&
      Math.hypot(event.clientX - this.#touch.x, event.clientY - this.#touch.y) > 10
    )
      this.#touch.moved = true;
  };
  #up = (event: PointerEvent) => {
    const touch = this.#touch;
    if (!touch || touch.id !== event.pointerId) return;
    this.#touch = undefined;
    if (
      !touch.moved &&
      !event.defaultPrevented &&
      this.#top() === touch.layer &&
      !this.#inside(touch.layer, event.composedPath()[0] as Node)
    )
      touch.layer.requestClose('outside', event);
  };
  #cancel = () => {
    this.#touch = undefined;
  };
  #focus = (event: FocusEvent) => {
    const top = this.#top();
    if (
      top?.stateValue === 'open' &&
      top.options.closeOnFocusOutside &&
      !this.#inside(top, event.composedPath()[0] as Node)
    )
      top.requestClose('focus-outside', event);
  };

  #start() {
    if (this.#observer) return;
    this.document.addEventListener('keydown', this.#key);
    this.document.addEventListener('pointerdown', this.#down);
    this.document.addEventListener('pointermove', this.#move);
    this.document.addEventListener('pointerup', this.#up);
    this.document.addEventListener('pointercancel', this.#cancel);
    this.document.addEventListener('focusin', this.#focus);
    const Observer = this.document.defaultView!.MutationObserver;
    this.#observer = new Observer(() => {
      const detached = this.#entries.filter((entry) => !entry.options.element.isConnected);
      cleanAll(detached.map((entry) => () => this.remove(entry, false, 'removed')));
      if (this.#entries.length) this.refresh();
    });
    this.#observer.observe(this.document.body, { childList: true, subtree: true });
  }
  #stop() {
    this.#observer?.disconnect();
    this.#observer = undefined;
    this.document.removeEventListener('keydown', this.#key);
    this.document.removeEventListener('pointerdown', this.#down);
    this.document.removeEventListener('pointermove', this.#move);
    this.document.removeEventListener('pointerup', this.#up);
    this.document.removeEventListener('pointercancel', this.#cancel);
    this.document.removeEventListener('focusin', this.#focus);
    this.#touch = undefined;
    try {
      cleanAll([...this.#sheets.values()].map((sheet) => () => sheet.dispose()));
    } finally {
      this.#sheets.clear();
    }
  }
}

export function createLayer(options: LayerOptions): LayerHandle {
  const document = options.element.ownerDocument;
  let manager = managers.get(document);
  if (
    !manager ||
    (manager.stats.layers === 0 &&
      !manager.stats.listening &&
      (manager.nonce !== options.nonce || manager.base !== (options.baseZIndex ?? 1000)))
  ) {
    manager = new LayerManager(document, options.nonce, options.baseZIndex ?? 1000);
    managers.set(document, manager);
  }
  if (manager.nonce !== options.nonce || manager.base !== (options.baseZIndex ?? 1000))
    throw new Error('Layers sharing a Document must use the same nonce and base z-index.');
  return manager.add(options);
}

export function layerStats(document: Document) {
  const manager = managers.get(document);
  manager?.track();
  return manager?.stats ?? { layers: 0, sheets: 0, inert: 0, traps: 0, listening: false };
}
