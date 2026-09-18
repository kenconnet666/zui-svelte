import { onDestroy } from 'svelte';
import { createSubscriber } from 'svelte/reactivity';
import { createAttachmentKey } from 'svelte/attachments';
import {
  ClassController,
  buildStyle,
  hasCssEvaluation,
  withCssEvaluation,
  hashText,
  type TokenSchema,
} from '@zui/core';
import { captureRuntime, type Runtime } from './context.js';

type Attributes = Record<string | symbol, unknown>;
interface Entry {
  controller: ClassController<TokenSchema>;
  key: symbol;
  track: () => void;
  attach: (node: Element) => () => void;
  evaluating: boolean;
  disposed: boolean;
  update?: () => void;
}
interface Branch {
  children: Map<unknown, Branch>;
  entry?: Entry;
}

export function createStyleScope(owner: () => string, moduleId: string) {
  const getRuntime = captureRuntime();
  const roots = new Map<string, Branch>();
  const entries = new Set<Entry>();
  const statics = new Map<string, { runtime: Runtime; stop: () => void }>();
  let sequence = 0;

  function entryFor(
    site: string,
    keys: readonly unknown[],
    promote: boolean,
    transient = false,
  ): Entry {
    const rootKey = site + ':' + promote + (transient ? ':snapshot:' + sequence++ : '');
    let root = roots.get(rootKey);
    if (!root) {
      root = { children: new Map() };
      roots.set(rootKey, root);
    }
    let branch = root;
    const path: [Branch, unknown][] = [];
    for (const key of keys) {
      path.push([branch, key]);
      let child = branch.children.get(key);
      if (!child) {
        child = { children: new Map() };
        branch.children.set(key, child);
      }
      branch = child;
    }
    if (branch.entry) return branch.entry;
    const leaf = branch;
    const runtime = getRuntime();
    const identity = hashText(owner() + ':' + site + ':' + sequence++);
    function dispose() {
      if (entry.disposed) return;
      entry.disposed = true;
      entry.controller.dispose();
      entries.delete(entry);
      leaf.entry = undefined;
      for (const [parent, key] of [...path].reverse()) {
        const child = parent.children.get(key);
        if (child && !child.entry && child.children.size === 0) parent.children.delete(key);
      }
      if (!root!.entry && root!.children.size === 0) roots.delete(rootKey);
    }
    const controller = new ClassController(
      runtime,
      identity,
      moduleId + ':' + site,
      promote,
      () => {
        if (!entry.evaluating && entry.update) {
          queueMicrotask(() => {
            if (!entry.disposed) entry.update?.();
          });
        }
      },
    );
    const entry: Entry = {
      controller,
      key: createAttachmentKey(),
      evaluating: false,
      disposed: false,
      track: createSubscriber((update) => {
        entry.update = update;
        return dispose;
      }),
      attach: (node) => controller.mount(node as HTMLElement | SVGElement),
    };
    leaf.entry = entry;
    entries.add(entry);
    return entry;
  }

  onDestroy(() => {
    // SSR 的样式由请求收集器在 render 完成后统一释放。
    if (typeof document === 'undefined') return;
    for (const entry of entries) {
      entry.disposed = true;
      entry.controller.dispose();
    }
    entries.clear();
    roots.clear();
    for (const item of statics.values()) item.stop();
    statics.clear();
  });

  function read<P extends Attributes>(
    site: string,
    factory: () => P,
    keys: readonly unknown[],
    native: boolean,
    promote: boolean,
    transient = false,
  ): P {
    const entry = entryFor(site, keys, promote && !transient, transient);
    entry.track();
    entry.evaluating = true;
    try {
      const original = entry.controller.run(factory);
      getRuntime.assertCollected();
      const className = entry.controller.resolve(original.class);
      const style = original.style;
      if (style != null && typeof style !== 'string')
        throw new TypeError('The style attribute must be a string.');
      const result: Attributes = { ...original };
      if ('class' in original) result.class = className;
      const merged = entry.controller.style(style as string | null | undefined);
      if (merged !== undefined || 'style' in original) result.style = merged;
      if (native) result[entry.key] = entry.attach;
      return result as P;
    } finally {
      entry.evaluating = false;
    }
  }

  return {
    attrs: <P extends Attributes>(
      site: string,
      factory: () => P,
      keys: readonly unknown[] = [],
      transient = false,
    ) => read(site, factory, keys, true, true, transient),
    component: <P extends Attributes>(
      site: string,
      factory: () => P,
      keys: readonly unknown[] = [],
      managed = false,
      transient = false,
    ) => read(site, factory, keys, false, managed, transient),
    wrapCss<F extends (...args: never[]) => string>(original: F): F {
      // 保留用户的类型化入口；直接替换成默认 css 会丢失自定义主题。
      return ((...args: never[]) => {
        if (hasCssEvaluation()) return original(...args);
        return withCssEvaluation(
          () => original(...args),
          (factory, theme) => {
            const runtime = getRuntime();
            const record = runtime.registry.acquire(
              buildStyle(factory, theme ?? runtime.theme),
              moduleId + ':setup',
            );
            if (statics.has(record.key)) runtime.registry.release(record);
            else statics.set(record.key, { runtime, stop: () => runtime.registry.release(record) });
            getRuntime.assertCollected();
            return record.className;
          },
        );
      }) as F;
    },
  };
}
