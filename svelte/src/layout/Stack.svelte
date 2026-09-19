<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { StyleContainerTag } from '../StyleProvider.svelte';
  import type { Spacing } from '../types.js';
  import { componentCss as css, lightTheme as theme } from '../theme.js';

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
    as?: StyleContainerTag;
    direction?: 'row' | 'column';
    gap?: Spacing;
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
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
      s.flexDirection(direction);
      s.flexWrap(wrap ? 'wrap' : 'nowrap');
      s.gap(theme.ref('spacing', gap));
      s.alignItems(align);
      s.justifyContent(justify);
      s.minInlineSize.px(0);
      s.minBlockSize.px(0);
    }),
    className,
  ]}
>
  {@render children?.()}
</svelte:element>
