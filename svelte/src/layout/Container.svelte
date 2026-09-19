<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Size, Spacing, StyleContainerTag } from '../types.js';
  import { componentCss as css } from '../theme.js';

  let {
    as = 'div',
    maxWidth = 'lg',
    padding = 'md',
    class: className,
    style,
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & {
    /** 承载内容的非空 HTML 标签；默认 div。 */
    as?: StyleContainerTag;
    /** 容器最大宽度档位；默认 lg，full 表示 100%。 */
    maxWidth?: Size | 'full';
    /** 水平内边距的主题 spacing 档位；默认 md。 */
    padding?: Spacing;
  } = $props();
  const widths = {
    xs: '_containerXs',
    sm: '_containerSm',
    md: '_containerMd',
    lg: '_containerLg',
    xl: '_containerXl',
    full: '_full',
  } as const;
</script>

<svelte:element
  this={as}
  {...rest}
  {style}
  class={[
    css((s) => {
      s.boxSizing.borderBox;
      s.inlineSize.raw('100%');
      s.maxInlineSize.token(widths[maxWidth]);
      s.marginInline.auto;
      s.paddingInline.token(`_${padding}`);
      s.minInlineSize.px(0);
    }),
    className,
  ]}
>
  {@render children?.()}
</svelte:element>
