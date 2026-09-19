<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Size, Spacing, StyleContainerTag } from '../types.js';
  import { componentCss as css, lightTheme as theme } from '../theme.js';

  let {
    as = 'div',
    maxWidth = 'lg',
    padding = 'md',
    class: className,
    style,
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & {
    as?: StyleContainerTag;
    maxWidth?: Size | 'full';
    padding?: Spacing;
  } = $props();
  const widths = {
    xs: 'containerXs',
    sm: 'containerSm',
    md: 'containerMd',
    lg: 'containerLg',
    xl: 'containerXl',
    full: 'full',
  } as const;
</script>

<svelte:element
  this={as}
  {...rest}
  {style}
  class={[
    css((s) => {
      s.boxSizing.borderBox;
      s.inlineSize('100%');
      s.maxInlineSize(theme.ref('size', widths[maxWidth]));
      s.marginInline.auto;
      s.paddingInline(theme.ref('spacing', padding));
      s.minInlineSize.px(0);
    }),
    className,
  ]}
>
  {@render children?.()}
</svelte:element>
