import { createContext } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Locale } from '../locale.js';
import { zhCN } from '../locale.js';
import type { Direction, Radius, Size } from '../types.js';
import { normalizeClass } from '@zui/core';
import { mergeProps, mergeSlotProps } from './props.js';

export interface ConfigValues {
  size?: Size;
  radius?: Radius;
  locale?: Locale;
  dir?: Direction;
  components?: Readonly<Record<string, object | undefined>>;
}

const common = new Set(['size', 'radius', 'locale', 'dir']);
type Attributes = Record<PropertyKey, unknown>;

/** 只读作用域链；读取 Provider 的 getter 保留 Svelte 依赖，不同步另一份状态。 */
export class ConfigScope {
  constructor(
    readonly read: () => ConfigValues,
    readonly parent?: ConfigScope,
  ) {}

  value(name: string, key: string): unknown {
    const values = this.read();
    const component =
      values.components && Object.hasOwn(values.components, name)
        ? (values.components[name] as Attributes | undefined)
        : undefined;
    if (component && Object.hasOwn(component, key) && component[key] !== undefined)
      return component[key];
    if (common.has(key)) {
      const value = values[key as keyof ConfigValues];
      if (value !== undefined) return value;
      if (key === 'dir' && values.locale) return values.locale.dir;
    }
    // 没有 Provider 值时交还源码中的默认表达式，不在运行时复制一份默认值表。
    return this.parent?.value(name, key);
  }

  styles(name: string): Attributes {
    const inherited = this.parent?.styles(name);
    const components = this.read().components;
    const own =
      components && Object.hasOwn(components, name)
        ? (components[name] as Attributes | undefined)
        : undefined;
    return mergeProps<Attributes>(
      inherited,
      own && {
        class: Object.hasOwn(own, 'class') ? own.class : undefined,
        style: Object.hasOwn(own, 'style') ? own.style : undefined,
        slotProps: Object.hasOwn(own, 'slotProps') ? own.slotProps : undefined,
      },
    ) as Attributes;
  }
}

const [getScope, setScope, hasScope] = createContext<ConfigScope>();
export const captureConfig = () => (hasScope() ? getScope() : undefined);
export const provideConfig = (read: () => ConfigValues) =>
  setScope(new ConfigScope(read, captureConfig()));

/** @internal 由编译器插入，必须在组件初始化期间捕获 context。 */
export function readComponentConfig(name: string, keys: readonly string[], version = 1) {
  if (version !== 1) throw new Error('Component configuration protocol mismatch.');
  const scope = captureConfig();
  const allowed = new Set(keys);
  return {
    value<T>(key: string, fallback: () => T): T {
      if (!allowed.has(key)) throw new TypeError('Undeclared configurable prop: ' + key);
      const value = scope?.value(name, key);
      return value === undefined ? fallback() : (value as T);
    },
    // class/slotProps 要合并实例值，不能写成普通 fallback 而丢掉上级定制。
    class: (value: HTMLAttributes<HTMLElement>['class']) =>
      normalizeClass([scope?.styles(name).class, value]),
    style: (value: string | null | undefined) =>
      mergeProps<{ style: string | null }>(
        { style: scope?.styles(name).style as string | undefined },
        { style: value },
      ).style,
    slots: <S extends object>(value: S | undefined) =>
      mergeSlotProps<S>(scope?.styles(name).slotProps as Partial<S> | undefined, value),
  };
}

export function captureLocale(): () => Locale {
  const scope = captureConfig();
  return () => (scope?.value('', 'locale') as Locale | undefined) ?? zhCN;
}
