<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Spacing, StyleContainerTag } from '../types.js';
  import { componentCss as css } from '../theme.js';

  let {
    as = 'div',
    columns = 1,
    gap = 'md',
    align = 'stretch',
    class: className,
    style,
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & {
    /** 承载内容的非空 HTML 标签；默认 div。 */
    as?: StyleContainerTag;
    /** 正整数列数，或原始 grid-template-columns 字符串；默认 1。 */
    columns?: number | string;
    /** 布局间距的主题 spacing 档位；默认 md。 */
    gap?: Spacing;
    /** 交叉轴对齐方式；默认 stretch。 */
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  } = $props();
  const tracks = $derived.by(() => {
    if (typeof columns === 'string') return columns;
    if (!Number.isSafeInteger(columns) || columns < 1)
      throw new RangeError('Grid columns must be a positive integer or a CSS template.');
    // 零最小轨道宽度允许长内容收缩；不改写每个子元素的布局。
    return `repeat(${columns}, minmax(0, 1fr))`;
  });
</script>

<svelte:element
  this={as}
  {...rest}
  {style}
  class={[
    css((s) => {
      s.display.grid;
      s.gridTemplateColumns.raw(tracks);
      s.gap.token(`_${gap}`);
      s.alignItems.token(align);
      s.minInlineSize.px(0);
      s.minBlockSize.px(0);
    }),
    className,
  ]}
>
  {@render children?.()}
</svelte:element>
