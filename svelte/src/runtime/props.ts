import { normalizeClass } from '@zui/core';

type Attributes = Record<PropertyKey, unknown>;

function record(value: unknown): value is Attributes {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function merge(sources: readonly unknown[], slots: boolean, ancestors: Set<object>): Attributes {
  const result: Attributes = Object.create(null);
  for (const source of sources) {
    if (source == null) continue;
    if (!record(source)) throw new TypeError('Props and slotProps must be objects.');
    if (ancestors.has(source)) throw new TypeError('Cyclic slotProps are not supported.');
    ancestors.add(source);
    try {
      for (const key of Reflect.ownKeys(source)) {
        if (!Object.getOwnPropertyDescriptor(source, key)?.enumerable) continue;
        const value = source[key];
        if (value === undefined) continue;
        if (slots || key === 'slotProps') {
          result[key] = value === null ? null : merge([result[key], value], !slots, ancestors);
        } else if (key === 'class') {
          result.class = normalizeClass([result.class, value]);
        } else if (key === 'style') {
          if (value !== null && typeof value !== 'string')
            throw new TypeError('ZUI style props use native CSS declaration strings.');
          result.style = value === null ? null : [result.style, value].filter(Boolean).join(';');
        } else {
          // 普通数据不深合并；事件遵循显式的调用顺序，不根据 on 前缀猜测业务语义。
          result[key] = value;
        }
      }
    } finally {
      ancestors.delete(source);
    }
  }
  return result;
}

/** class/style/嵌套 slotProps 合并；不串联事件、不复制普通业务对象。 */
export function mergeProps<P extends object>(
  ...sources: readonly (Partial<P> | null | undefined)[]
): Partial<P> {
  return merge(sources, false, new Set()) as Partial<P>;
}

export function mergeSlotProps<S extends object>(
  ...sources: readonly (Partial<S> | null | undefined)[]
): Partial<S> {
  return merge(sources, true, new Set()) as Partial<S>;
}
