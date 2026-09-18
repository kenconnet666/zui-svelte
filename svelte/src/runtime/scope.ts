import { onDestroy } from 'svelte';
import { createSubscriber } from 'svelte/reactivity';
import { createAttachmentKey } from 'svelte/attachments';
import {
  ClassController,
  buildStyle,
  hasCssEvaluation,
  withCssEvaluation,
  hashText,
  styleProtocol,
  type TokenSchema,
} from '@zui/core';
import { captureRuntime } from './context.js';

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

export function createStyleScope(owner: () => string, moduleId: string, protocol: number) {
  styleProtocol.check(protocol);
  const getRuntime = captureRuntime();
  const roots = new Map<string, Branch>();
  const entries = new Set<Entry>();
  const statics = new Map<string, () => void>();
  const snapshots = new Set<() => void>();
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
      { get: getRuntime, peek: getRuntime.peek },
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
    const releases = [...entries].map((entry) => {
      entry.disposed = true;
      return () => entry.controller.dispose();
    });
    releases.push(...snapshots, ...statics.values());
    entries.clear();
    roots.clear();
    snapshots.clear();
    statics.clear();
    // 适配层也要完整释放本组件的所有者，再把清理异常交给宿主。
    const errors: unknown[] = [];
    for (const release of releases) {
      try {
        release();
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length) throw new AggregateError(errors, 'Style scope cleanup failed.');
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

  function snapshot<R>(read: () => R): R {
    return withCssEvaluation(read, (factory, options = {}) => {
      const runtime = getRuntime();
      const { theme, tokenMap } = options;
      const layer = options.layer === undefined ? runtime.layer : options.layer;
      runtime.registry.assertLayer(layer ?? undefined);
      const record = runtime.registry.acquire(
        buildStyle<TokenSchema, object>(
          factory,
          theme ?? runtime.defaultTheme,
          layer ?? undefined,
          tokenMap,
        ),
        moduleId + ':setup',
      );
      let released = false;
      const stop = () => {
        if (released) return;
        released = true;
        snapshots.delete(stop);
        runtime.registry.release(record);
      };
      let tracked = false;
      // 每次求值单独持有快照，不能因 derived 退出而释放 setup 常量的同一规则。
      createSubscriber(() => {
        tracked = true;
        return stop;
      })();
      if (tracked) snapshots.add(stop);
      else if (statics.has(record.key)) stop();
      else statics.set(record.key, stop);
      return record.className;
    });
  }

  return {
    snapshot,
    wrapSnapshot<F extends (...args: never[]) => unknown>(original: F): F {
      return function (this: unknown, ...args: never[]) {
        return snapshot(() => original.apply(this, args));
      } as F;
    },
    attrs: <P extends Attributes>(
      site: string,
      factory: () => P,
      keys: readonly unknown[] = [],
      transient = false,
    ) => read(site, factory, keys, true, true, transient),
    // 组件是否消费内部变量不能靠导入路径推断；边界传递完整规则，保持普通 class 转发。
    component: <P extends Attributes>(
      site: string,
      factory: () => P,
      keys: readonly unknown[] = [],
      transient = false,
    ) => read(site, factory, keys, false, false, transient),
    wrapCss<F extends (...args: never[]) => string>(original: F): F {
      // 保留用户的类型化入口；直接替换成默认 css 会丢失自定义主题。
      return ((...args: never[]) => {
        if (hasCssEvaluation()) return original(...args);
        return snapshot(() => original(...args));
      }) as F;
    },
  };
}
