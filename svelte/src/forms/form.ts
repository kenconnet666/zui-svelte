import { createSubscriber } from 'svelte/reactivity';
import { z } from '../validation.js';
import { snapshotValue, equalValue } from './values.js';
import {
  fieldPath,
  samePath,
  valueAt,
  withinPath,
  type FieldName,
  type FieldPath,
} from './path.js';

export interface FormIssue {
  readonly path: FieldPath;
  readonly message: string;
  readonly source: 'schema' | 'native' | 'server' | 'system';
}
export interface FieldRegistration {
  readonly id: string;
  readonly name: () => FieldName;
  readonly focus: () => boolean | void;
  readonly check?: () => string | undefined;
  readonly disabled?: () => boolean;
  readonly element?: () => HTMLElement | undefined;
}
export interface FormState {
  readonly version: number;
  readonly dirty: boolean;
  readonly validating: boolean;
  readonly submitting: boolean;
  readonly submitted: boolean;
  readonly issues: readonly FormIssue[];
}
export interface SubmissionContext {
  readonly signal: AbortSignal;
  setErrors(issues: readonly { path: FieldPath; message: string }[]): void;
}
export interface FormOptions<Model, Schema extends z.ZodType> {
  value: () => Model;
  setValue: (value: Model) => void;
  schema: () => Schema;
  onValid?: (data: z.output<Schema>, context: SubmissionContext) => void | Promise<void>;
  onError?: (error: unknown) => void;
  revalidateDelay?: number;
  error?: () => z.core.$ZodErrorMap | undefined;
}

/** 内部协调器：外部模型始终是唯一数据源，这里只持有基线、快照和校验状态。 */
export class FormController<Model, Schema extends z.ZodType> {
  readonly #fields = new Map<string, FieldRegistration>();
  readonly #touched = new Set<string>();
  readonly #composing = new Set<string>();
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #baseline?: { value: Model };
  #observed?: { value: Model };
  #schema?: Schema;
  #errorMap?: z.core.$ZodErrorMap;
  #options?: FormOptions<Model, Schema>;
  #validation = 0;
  #submission = 0;
  #scheduled = 0;
  #timer?: ReturnType<typeof setTimeout>;
  #disposed = false;
  #abort?: AbortController;
  #state: FormState = Object.freeze({
    version: 0,
    dirty: false,
    validating: false,
    submitting: false,
    submitted: false,
    issues: [],
  });

  constructor(options: FormOptions<Model, Schema>) {
    this.#options = options;
    this.#baseline = { value: snapshotValue(options.value()) };
    this.#observed = { value: snapshotValue(options.value()) };
    this.#schema = options.schema();
    this.#errorMap = options.error?.();
  }

  get state(): FormState {
    this.#track();
    return this.#state;
  }
  get fieldCount() {
    this.#track();
    return this.#fields.size;
  }

  #assertActive() {
    if (this.#disposed) throw new Error('Form controller is disposed.');
  }
  #patch(patch: Partial<FormState>) {
    if (this.#disposed) return;
    this.#state = Object.freeze({ ...this.#state, ...patch });
    for (const listener of this.#listeners) listener();
  }

  /** 在拥有模型的 Svelte effect 中调用；深读取普通模型以观察原地数组/对象更新。 */
  observe(): void {
    this.#assertActive();
    const value = snapshotValue(this.#options!.value());
    const schema = this.#options!.schema();
    const errorMap = this.#options!.error?.();
    if (
      schema === this.#schema &&
      errorMap === this.#errorMap &&
      equalValue(value, this.#observed!.value)
    )
      return;
    const previous = this.#observed!.value;
    this.#observed = { value };
    this.#schema = schema;
    this.#errorMap = errorMap;
    this.#validation++;
    const issues = this.#state.issues.filter(
      (issue) =>
        issue.source === 'server' &&
        (!issue.path.length ||
          equalValue(valueAt(previous, issue.path), valueAt(value, issue.path))),
    );
    this.#patch({
      version: this.#state.version + 1,
      dirty: !equalValue(value, this.#baseline!.value),
      validating: false,
      issues,
    });
    if (this.#state.submitted || this.#touched.size) this.#schedule();
  }

  register(field: FieldRegistration): () => void {
    this.#assertActive();
    if (this.#fields.has(field.id)) throw new Error('Duplicate field id: ' + field.id);
    fieldPath(field.name());
    this.#fields.set(field.id, field);
    this.fieldChanged();
    return () => {
      const removed = this.#fields.delete(field.id);
      this.#touched.delete(field.id);
      this.#composing.delete(field.id);
      // 卸载不删除业务值；其错误仍属于完整 schema，可由表单摘要显示。
      if (removed) this.fieldChanged();
    };
  }

  fieldChanged(): void {
    if (this.#disposed) return;
    this.#patch({ issues: this.#state.issues.filter((issue) => issue.source !== 'native') });
    if (!this.#state.submitting && (this.#state.submitted || this.#touched.size)) this.#schedule();
  }

  blur(id: string): void {
    if (!this.#fields.has(id)) return;
    this.#touched.add(id);
    this.observe();
    this.#schedule(true);
  }

  composing(id: string, active: boolean): void {
    if (!this.#fields.has(id) || this.#disposed) return;
    if (active) {
      this.#composing.add(id);
      this.#validation++;
      this.#cancelSchedule();
      this.#patch({ validating: false });
    } else {
      this.#composing.delete(id);
      if (this.#state.submitted || this.#touched.size) this.#schedule(true);
    }
  }

  errors(id: string, includeChildren = false): readonly FormIssue[] {
    this.#track();
    const field = this.#fields.get(id);
    if (!field) return [];
    const path = fieldPath(field.name());
    return this.#state.issues.filter(
      (issue) =>
        (includeChildren ? withinPath(issue.path, path) : samePath(issue.path, path)) &&
        (this.#state.submitted || this.#touched.has(id) || issue.source === 'server'),
    );
  }

  #cancelSchedule() {
    this.#scheduled++;
    if (this.#timer !== undefined) clearTimeout(this.#timer);
    this.#timer = undefined;
  }

  #schedule(immediate = false) {
    this.#cancelSchedule();
    const scheduled = this.#scheduled;
    const run = () => {
      if (scheduled !== this.#scheduled) return;
      this.#timer = undefined;
      if (
        !this.#disposed &&
        (this.#state.submitted || this.#touched.size) &&
        !this.#composing.size &&
        !(this.#state.submitting && this.#state.validating)
      )
        void this.#run().catch((error) => this.#report(error));
    };
    const delay = immediate ? 0 : Math.max(0, this.#options!.revalidateDelay ?? 0);
    if (delay) this.#timer = setTimeout(run, delay);
    else queueMicrotask(run);
  }

  #report(error: unknown) {
    if (this.#disposed) return;
    this.#patch({
      issues: [
        ...this.#state.issues.filter((issue) => issue.source !== 'system'),
        {
          path: [],
          message: error instanceof Error ? error.message : String(error),
          source: 'system',
        },
      ],
    });
    this.#options!.onError?.(error);
  }

  async #run(): Promise<{ data: z.output<Schema>; snapshot: Model; version: number } | undefined> {
    this.#assertActive();
    const run = ++this.#validation;
    const version = this.#state.version;
    const snapshot = snapshotValue(this.#options!.value());
    const schema = this.#options!.schema();
    const native: FormIssue[] = [];
    this.#patch({ validating: true });
    try {
      const parsed = await schema.safeParseAsync(snapshot, {
        error: this.#options!.error?.(),
        jitless: true,
      });
      if (
        this.#disposed ||
        run !== this.#validation ||
        version !== this.#state.version ||
        schema !== this.#options!.schema() ||
        !equalValue(snapshot, this.#options!.value())
      )
        return undefined;
      // 在提交边界读最新草稿，避免异步期间卸载/禁用控件留下旧的原生错误。
      for (const field of this.#fields.values()) {
        const message = field.check?.();
        if (message) native.push({ path: fieldPath(field.name()), message, source: 'native' });
      }
      if (!equalValue(snapshot, this.#options!.value()) || schema !== this.#options!.schema())
        return undefined;
      const issues: FormIssue[] = parsed.success
        ? []
        : parsed.error.issues.map((issue) => ({
            // Symbol 路径没有 HTML 字段名，保留为表单级错误，不丢掉失败。
            path: issue.path.some((part) => typeof part === 'symbol')
              ? []
              : (issue.path as FieldPath),
            message: issue.message,
            source: 'schema',
          }));
      for (const issue of native)
        if (!issues.some((item) => samePath(item.path, issue.path))) issues.push(issue);
      issues.push(...this.#state.issues.filter((issue) => issue.source === 'server'));
      this.#patch({ issues });
      return parsed.success && !issues.length
        ? { data: parsed.data, snapshot, version }
        : undefined;
    } catch (error) {
      if (
        this.#disposed ||
        run !== this.#validation ||
        version !== this.#state.version ||
        !equalValue(snapshot, this.#options!.value())
      )
        return undefined;
      throw error;
    } finally {
      if (run === this.#validation) this.#patch({ validating: false });
    }
  }

  async validate(): Promise<boolean> {
    this.observe();
    this.#cancelSchedule();
    if (this.#composing.size) return false;
    this.#patch({ submitted: true });
    try {
      return Boolean(await this.#run());
    } catch (error) {
      this.#report(error);
      return false;
    }
  }

  async submit(): Promise<boolean> {
    this.#assertActive();
    if (this.#state.submitting) return false;
    this.observe();
    this.#cancelSchedule();
    if (this.#composing.size) return false;
    const submission = ++this.#submission;
    const abort = new AbortController();
    this.#abort = abort;
    this.#patch({ submitting: true, submitted: true });
    try {
      const valid = await this.#run();
      if (!valid || submission !== this.#submission || this.#disposed) {
        if (!this.#disposed) this.focusFirstError();
        return false;
      }
      await this.#options!.onValid?.(valid.data, {
        signal: abort.signal,
        setErrors: (issues) => {
          if (
            submission !== this.#submission ||
            this.#disposed ||
            valid.version !== this.#state.version ||
            !equalValue(valid.snapshot, this.#options!.value())
          )
            return;
          this.#patch({
            issues: [
              ...this.#state.issues.filter((issue) => issue.source !== 'server'),
              ...issues.map((issue): FormIssue => ({
                ...issue,
                path: [...issue.path],
                source: 'server',
              })),
            ],
          });
        },
      });
      return (
        submission === this.#submission &&
        !this.#disposed &&
        valid.version === this.#state.version &&
        equalValue(valid.snapshot, this.#options!.value()) &&
        !this.#state.issues.length
      );
    } catch (error) {
      if (submission === this.#submission && !this.#disposed && !abort.signal.aborted)
        this.#report(error);
      return false;
    } finally {
      if (submission === this.#submission) {
        this.#abort = undefined;
        this.#patch({ submitting: false });
      }
    }
  }

  focusFirstError(): void {
    const fields = [...this.#fields.values()].sort((a, b) => {
      const left = a.element?.(),
        right = b.element?.();
      if (!left || !right) return 0;
      const position = left.compareDocumentPosition(right);
      if (position & left.DOCUMENT_POSITION_DISCONNECTED) return 0;
      return position & left.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : position & left.DOCUMENT_POSITION_PRECEDING
          ? 1
          : 0;
    });
    for (const field of fields) {
      if (!field.disabled?.() && this.errors(field.id, true).length && field.focus() !== false)
        return;
    }
  }

  reset(...next: [] | [Model]): void {
    this.#assertActive();
    this.#validation++;
    this.#submission++;
    this.#abort?.abort();
    this.#abort = undefined;
    this.#cancelSchedule();
    this.#touched.clear();
    this.#composing.clear();
    if (next.length) this.#baseline = { value: snapshotValue(next[0]) };
    const value = snapshotValue(this.#baseline!.value);
    this.#options!.setValue(value);
    this.#observed = { value: snapshotValue(value) };
    this.#patch({
      version: this.#state.version + 1,
      dirty: false,
      validating: false,
      submitting: false,
      submitted: false,
      issues: [],
    });
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#validation++;
    this.#submission++;
    this.#abort?.abort();
    this.#abort = undefined;
    this.#cancelSchedule();
    this.#fields.clear();
    this.#touched.clear();
    this.#composing.clear();
    this.#listeners.clear();
    this.#baseline = this.#observed = undefined;
    this.#options = undefined;
    this.#schema = undefined;
    this.#errorMap = undefined;
    this.#state = Object.freeze({
      ...this.#state,
      validating: false,
      submitting: false,
      issues: [],
    });
  }
}
