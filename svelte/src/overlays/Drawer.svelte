<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Modal from './Modal.svelte';
  let {
    open = $bindable(false),
    size = 'md',
    side = 'end',
    animated = true,
    closable = true,
    class: className,
    style,
    slotProps,
    ...rest
  }: ComponentProps<typeof Modal> = $props();
</script>

<Modal
  {...rest}
  bind:open
  {size}
  {side}
  {animated}
  {closable}
  class={className}
  {style}
  {slotProps}
/>
