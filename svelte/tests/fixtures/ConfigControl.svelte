<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAttributes } from 'svelte/elements';
  import { css, type Size } from '@zui/svelte';

  let {
    size = 'sm',
    block = false,
    class: className,
    style,
    slotProps = {},
    ...rest
  }: HTMLButtonAttributes & {
    size?: Size;
    block?: boolean;
    slotProps?: { content?: HTMLAttributes<HTMLSpanElement> };
  } = $props();
</script>

<button
  {...rest}
  type="button"
  data-testid="config-control"
  data-size={size}
  data-block={block}
  {style}
  class={[
    css((s) => {
      s.width.px(size === 'lg' ? 180 : size === 'md' ? 120 : 80);
    }),
    className,
  ]}
>
  <span {...slotProps.content} class="control-content">配置按钮</span>
</button>
