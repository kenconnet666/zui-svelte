<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { StyleContainerTag } from '../StyleProvider.svelte';
  import type { Spacing } from '../types.js';
  import { componentCss as css, lightTheme as theme } from '../theme.js';

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
    as?: StyleContainerTag;
    columns?: number | string;
    gap?: Spacing;
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
      s.gridTemplateColumns(tracks);
      s.gap(theme.ref('spacing', gap));
      s.alignItems(align);
      s.minInlineSize.px(0);
      s.minBlockSize.px(0);
    }),
    className,
  ]}
>
  {@render children?.()}
</svelte:element>
