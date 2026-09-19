<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Modal from './Modal.svelte';
  let {
    open = $bindable(false),
    size = 'md',
    animated = true,
    closable = true,
    class: className,
    style,
    slotProps,
    ...rest
  }: Omit<ComponentProps<typeof Modal>, 'side'> = $props();
</script>

<Modal {...rest} bind:open {size} {animated} {closable} class={className} {style} {slotProps} />
