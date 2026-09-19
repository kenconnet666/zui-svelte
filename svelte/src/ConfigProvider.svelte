<script lang="ts" generics="Components extends Record<string, object> = ComponentDefaults">
  import type { Snippet } from 'svelte';
  import type { ComponentDefaults } from './component-types.js';
  import type { Locale } from './locale.js';
  import type { Direction, Radius, Size } from './types.js';
  import { provideConfig } from './runtime/config.js';

  let {
    size,
    radius,
    locale,
    dir,
    components,
    children,
  }: {
    size?: Size;
    radius?: Radius;
    locale?: Locale;
    dir?: Direction;
    components?: keyof Components extends never ? never : Partial<NoInfer<Components>>;
    children?: Snippet;
  } = $props();

  // 稳定 getter 对象只追踪实际读取的字段，修改 locale 不必复制整棵配置树。
  const config = {
    get size() {
      return size;
    },
    get radius() {
      return radius;
    },
    get locale() {
      return locale;
    },
    get dir() {
      return dir;
    },
    get components() {
      return components;
    },
  };
  provideConfig(() => config);
</script>

{@render children?.()}
