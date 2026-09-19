<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Spacing, StyleContainerTag } from '../types.js';
  import { componentCss as css } from '../theme.js';

  let {
    as = 'div',
    direction = 'column',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    class: className,
    style,
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & {
    /** 承载内容的非空 HTML 标签；默认 div。 */
    as?: StyleContainerTag;
    /** 堆叠方向；默认 column。 */
    direction?: 'row' | 'column';
    /** 布局间距的主题 spacing 档位；默认 md。 */
    gap?: Spacing;
    /** 交叉轴对齐方式；默认 stretch。 */
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    /** 主轴剩余空间的分配方式；默认 start。 */
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    /** 是否允许换行；默认 false。 */
    wrap?: boolean;
  } = $props();
</script>

<svelte:element
  this={as}
  {...rest}
  {style}
  class={[
    css((s) => {
      s.display.flex;
      s.flexDirection.token(direction);
      s.flexWrap.token(wrap ? 'wrap' : 'nowrap');
      s.gap.token(`_${gap}`);
      s.alignItems.token(align);
      s.justifyContent.token(justify);
      s.minInlineSize.px(0);
      s.minBlockSize.px(0);
    }),
    className,
  ]}
>
  {@render children?.()}
</svelte:element>
