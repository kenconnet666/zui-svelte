<script lang="ts" generics="Components extends Record<string, object> = ComponentDefaults">
  import type { Snippet } from 'svelte';
  import type { ComponentDefaults } from './component-types.generated.js';
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
    /** 组件五档尺寸，md 为默认；full 的含义由组件定义。 */
    size?: Size;
    /** 圆角档位，可从 ConfigProvider 继承。 */
    radius?: Radius;
    /** 本地化文本及区域设置；默认 zhCN，可由内层覆盖。 */
    locale?: Locale;
    /** 显式书写方向；未指定时由区域配置继承。 */
    dir?: Direction;
    /** 按组件白名单设置默认参数及 class/style/slotProps，实例值优先。 */
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
