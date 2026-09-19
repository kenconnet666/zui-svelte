import { createContext } from 'svelte';
import { createSubscriber } from 'svelte/reactivity';
import { fieldPath, pathKey, type FieldName } from './path.js';
import type { FieldRegistration, FormIssue } from './form.js';

export interface FieldForm {
  register(field: FieldRegistration): () => void;
  blur(id: string): void;
  errors(id: string, includeChildren?: boolean): readonly FormIssue[];
  fieldChanged(): void;
  composing(id: string, active: boolean): void;
}
export interface FieldOptions {
  readonly id: string;
  readonly name?: () => FieldName | undefined;
  readonly controlId?: () => string | undefined;
  readonly required?: () => boolean;
  readonly disabled?: () => boolean;
  readonly error?: () => string | undefined;
  readonly description?: () => string | undefined;
  readonly hasLabel?: () => boolean;
  readonly invalidMessage?: (validity: ValidityState) => string;
}
interface Control {
  element: HTMLElement;
  check?: () => string | undefined;
  focus?: () => boolean | void;
}

/** Field 的语义接入，不包含字段视觉；控件通过稳定 ID 和显式注册协作。 */
export class FieldScope {
  readonly #controls = new Map<string, Control>();
  readonly #cleanups = new Set<() => void>();
  readonly #composing = new Set<string>();
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #unregister?: () => void;
  #disposed = false;
  #settings?: readonly unknown[];

  constructor(
    readonly options: FieldOptions,
    readonly form?: FieldForm,
  ) {
    this.refresh();
  }

  get controlId() {
    return this.options.controlId?.() ?? this.options.id + '-control';
  }
  get labelId() {
    return this.options.id + '-label';
  }
  get errorId() {
    return this.options.id + '-error';
  }
  get errors(): readonly string[] {
    const own = this.options.error?.();
    return own
      ? [own]
      : (this.form?.errors(this.options.id, true) ?? []).map((issue) => issue.message);
  }
  get controlCount() {
    this.#track();
    return this.#controls.size;
  }

  refresh(): void {
    if (this.#disposed) throw new Error('Field scope is disposed.');
    this.#track();
    const name = this.options.name?.();
    const settings = [
      name === undefined ? undefined : pathKey(fieldPath(name)),
      this.options.disabled?.(),
      this.options.required?.(),
      this.options.error?.(),
      this.controlId,
      ...[...this.#controls.values()].map((control) => control.check?.()),
    ];
    const changed =
      !this.#settings || settings.some((value, index) => value !== this.#settings![index]);
    this.#settings = settings;
    const named = name !== undefined;
    const registered = Boolean(this.#unregister);
    if (named && !this.#unregister && this.form)
      this.#unregister = this.form.register({
        id: this.options.id,
        name: () => this.options.name!()!,
        focus: () => this.focus(),
        check: () => this.check(),
        disabled: () => this.options.disabled?.() ?? false,
        element: () =>
          [...this.#controls.values()].find((item) => item.element.isConnected)?.element,
      });
    else if (!named && this.#unregister) {
      this.#unregister();
      this.#unregister = undefined;
    }
    if (changed && registered && this.#unregister) this.form?.fieldChanged();
  }

  attributes(key = 'control', describedBy?: string, labelledBy?: string) {
    const invalid = this.errors.length > 0;
    const ids = [this.options.description?.(), describedBy, invalid ? this.errorId : undefined]
      .filter(Boolean)
      .join(' ')
      .split(/\s+/u)
      .filter(Boolean);
    return {
      id: key === 'control' ? this.controlId : this.options.id + '-' + key,
      'aria-labelledby':
        [
          ...new Set(
            [this.options.hasLabel?.() === false ? undefined : this.labelId, labelledBy]
              .filter(Boolean)
              .join(' ')
              .split(/\s+/u)
              .filter(Boolean),
          ),
        ].join(' ') || undefined,
      'aria-describedby': ids.length ? [...new Set(ids)].join(' ') : undefined,
      'aria-invalid': invalid || undefined,
      'aria-required': this.options.required?.() || undefined,
    };
  }

  attach(
    element: HTMLElement,
    key = 'control',
    options: Omit<Control, 'element'> = {},
  ): () => void {
    if (this.#disposed) throw new Error('Field scope is disposed.');
    if (this.#controls.has(key)) throw new Error('Duplicate field control key: ' + key);
    // attachment 只依赖控件身份，不能读取错误状态，否则验证会触发反复拆装。
    const expected = key === 'control' ? this.controlId : this.options.id + '-' + key;
    if (element.id !== expected)
      throw new Error(
        'Field control id must match its attributes; declare a custom controlId on the field.',
      );
    const control = { element, ...options };
    this.#controls.set(key, control);
    for (const listener of this.#listeners) listener();
    this.form?.fieldChanged();
    const blur = (event: FocusEvent) => {
      // 复合控件内部焦点移动不算离开字段。
      const next = event.relatedTarget as Node | null;
      if (![...this.#controls.values()].some((item) => next && item.element.contains(next)))
        this.form?.blur(this.options.id);
    };
    const input = () => {
      if (!this.#composing.size) this.form?.fieldChanged();
    };
    const start = () => {
      this.#composing.add(key);
      this.form?.composing(this.options.id, true);
    };
    const end = () => {
      this.#composing.delete(key);
      this.form?.composing(this.options.id, this.#composing.size > 0);
      input();
    };
    element.addEventListener('focusout', blur);
    element.addEventListener('input', input);
    element.addEventListener('change', input);
    element.addEventListener('compositionstart', start);
    element.addEventListener('compositionend', end);
    const Observer = element.ownerDocument.defaultView?.MutationObserver;
    const observer = Observer ? new Observer(input) : undefined;
    // 原生约束变更也要重验，不要求每个输入组件再抄一遍监听代码。
    observer?.observe(element, {
      attributes: true,
      attributeFilter: [
        'required',
        'pattern',
        'min',
        'max',
        'step',
        'minlength',
        'maxlength',
        'disabled',
        'readonly',
      ],
    });
    const cleanup = () => {
      observer?.disconnect();
      element.removeEventListener('focusout', blur);
      element.removeEventListener('input', input);
      element.removeEventListener('change', input);
      element.removeEventListener('compositionstart', start);
      element.removeEventListener('compositionend', end);
      this.#composing.delete(key);
      this.form?.composing(this.options.id, this.#composing.size > 0);
      if (this.#controls.get(key) === control) {
        this.#controls.delete(key);
        this.form?.fieldChanged();
        if (!this.#disposed) for (const listener of this.#listeners) listener();
      }
      this.#cleanups.delete(cleanup);
    };
    this.#cleanups.add(cleanup);
    return cleanup;
  }

  check(): string | undefined {
    const own = this.options.error?.();
    if (own) return own;
    for (const { element, check } of this.#controls.values()) {
      if (!element.isConnected) continue;
      const issue = check?.();
      if (issue) return issue;
      // 禁用可跳过浏览器约束，但不能让未完成的领域草稿变成“上次合法值”。
      if (element.matches(':disabled')) continue;
      const native = element as HTMLInputElement;
      if (
        typeof native.checkValidity === 'function' &&
        native.willValidate &&
        !native.validity.valid
      )
        return this.options.invalidMessage?.(native.validity) ?? native.validationMessage;
    }
    return undefined;
  }

  focus(): boolean {
    for (const { element, focus } of this.#controls.values()) {
      if (!element.isConnected || element.matches(':disabled')) continue;
      if (focus) {
        if (focus() !== false) return true;
      } else {
        element.focus();
        const root = element.getRootNode() as Document | ShadowRoot;
        if (root.activeElement === element || element.contains(root.activeElement)) return true;
      }
    }
    return false;
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#listeners.clear();
    this.#unregister?.();
    this.#unregister = undefined;
    for (const cleanup of this.#cleanups) cleanup();
    this.#controls.clear();
    this.#composing.clear();
    this.#settings = undefined;
  }
}

const [getField, setField, hasField] = createContext<FieldScope>();
export const captureField = () => (hasField() ? getField() : undefined);
export const provideField = (field: FieldScope) => setField(field);
const [getForm, setForm, hasForm] = createContext<FieldForm>();
export const captureForm = () => (hasForm() ? getForm() : undefined);
export const provideForm = (form: FieldForm) => setForm(form);
