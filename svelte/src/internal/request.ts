import { createSubscriber } from 'svelte/reactivity';
import { assertKey, itemKey, type ItemKey } from './collection.js';

export interface Page<T, Cursor> {
  readonly items: readonly T[];
  readonly nextCursor?: Cursor;
}
export interface AsyncListOptions<T, Cursor> {
  load: (
    query: string,
    context: { signal: AbortSignal; cursor?: Cursor },
  ) => Promise<readonly T[] | Page<T, Cursor>>;
  getKey?: (item: T) => ItemKey;
  delay?: number;
}
export interface AsyncListState<T, Cursor> {
  readonly query: string;
  readonly items: readonly T[];
  readonly status: 'idle' | 'loading' | 'ready' | 'error';
  readonly loadingMore: boolean;
  readonly nextCursor?: Cursor;
  readonly error?: unknown;
}
interface Request<Cursor> {
  query: string;
  cursor?: Cursor;
  append: boolean;
}

/** 不绑定 HTTP 客户端、不修改选择值；取消既中止可中止请求，也及时结算调用方的 Promise。 */
export class AsyncList<T, Cursor = string> {
  readonly #listeners = new Set<() => void>();
  readonly #track = createSubscriber((update) => {
    this.#listeners.add(update);
    return () => {
      this.#listeners.delete(update);
    };
  });
  #options?: AsyncListOptions<T, Cursor>;
  #state: AsyncListState<T, Cursor> = { query: '', items: [], status: 'idle', loadingMore: false };
  #active?: { abort: AbortController; resolve: (value: boolean) => void };
  #timer?: ReturnType<typeof setTimeout>;
  #failed?: Request<Cursor>;
  #disposed = false;

  constructor(options: AsyncListOptions<T, Cursor>) {
    if (options.delay !== undefined && (!Number.isFinite(options.delay) || options.delay < 0))
      throw new RangeError('Request delay must be finite and non-negative.');
    this.#options = options;
  }
  get state() {
    this.#track();
    return this.#state;
  }
  #set(state: AsyncListState<T, Cursor>) {
    this.#state = Object.freeze(state);
    for (const listener of this.#listeners) listener();
  }

  search(query: string): Promise<boolean> {
    return this.#run({ query, append: false }, false, this.#options?.delay ?? 0);
  }
  refresh(): Promise<boolean> {
    return this.#run({ query: this.#state.query, append: false }, true);
  }
  more(): Promise<boolean> {
    if (this.#active || this.#state.nextCursor === undefined) return Promise.resolve(false);
    return this.#run(
      { query: this.#state.query, cursor: this.#state.nextCursor, append: true },
      true,
    );
  }
  retry(): Promise<boolean> {
    return this.#failed ? this.#run(this.#failed, true) : Promise.resolve(false);
  }

  #run(request: Request<Cursor>, keep: boolean, delay = 0): Promise<boolean> {
    if (this.#disposed) return Promise.reject(new Error('Async list is disposed.'));
    this.cancel();
    this.#failed = undefined;
    this.#set({
      query: request.query,
      items: keep ? this.#state.items : [],
      status: 'loading',
      loadingMore: request.append,
      nextCursor: request.append ? this.#state.nextCursor : undefined,
    });
    return new Promise<boolean>((resolve) => {
      const active = { abort: new AbortController(), resolve };
      this.#active = active;
      const execute = async () => {
        this.#timer = undefined;
        try {
          const result = await this.#options!.load(request.query, {
            signal: active.abort.signal,
            cursor: request.cursor,
          });
          if (this.#active !== active || this.#disposed || active.abort.signal.aborted) return;
          const page: Page<T, Cursor> = Array.isArray(result)
            ? { items: result }
            : (result as Page<T, Cursor>);
          if (
            request.append &&
            page.nextCursor !== undefined &&
            Object.is(page.nextCursor, request.cursor)
          )
            throw new Error('Pagination cursor did not advance.');
          const keys = new Set<ItemKey>();
          const items = request.append ? [...this.#state.items] : [];
          const keyFor = this.#options!.getKey ?? itemKey;
          const positions = new Map(items.map((item, index) => [assertKey(keyFor(item)), index]));
          for (const item of page.items) {
            const key = assertKey(keyFor(item));
            if (keys.has(key)) throw new Error('Duplicate key in a result page: ' + key);
            keys.add(key);
            const position = positions.get(key);
            if (position === undefined) {
              positions.set(key, items.length);
              items.push(item);
            } else items[position] = item;
          }
          this.#set({
            query: request.query,
            items: Object.freeze(items),
            status: 'ready',
            loadingMore: false,
            nextCursor: page.nextCursor,
          });
          resolve(true);
        } catch (error) {
          if (this.#active !== active || this.#disposed || active.abort.signal.aborted) return;
          this.#failed = request;
          this.#set({ ...this.#state, status: 'error', loadingMore: false, error });
          resolve(false);
        } finally {
          if (this.#active === active) this.#active = undefined;
        }
      };
      if (delay > 0)
        this.#timer = setTimeout(() => {
          void execute();
        }, delay);
      else void execute();
    });
  }

  cancel(): void {
    if (this.#timer !== undefined) clearTimeout(this.#timer);
    this.#timer = undefined;
    const active = this.#active;
    this.#active = undefined;
    active?.abort.abort();
    active?.resolve(false);
    if (active && !this.#disposed)
      this.#set({
        ...this.#state,
        status: this.#state.items.length ? 'ready' : 'idle',
        loadingMore: false,
      });
  }
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.cancel();
    this.#options = undefined;
    this.#failed = undefined;
    this.#state = { query: '', items: [], status: 'idle', loadingMore: false };
    this.#listeners.clear();
  }
}
