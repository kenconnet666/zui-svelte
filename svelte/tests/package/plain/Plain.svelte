<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  let { class: className }: Pick<HTMLAttributes<HTMLDivElement>, 'class'> = $props();
</script>

<div data-testid="plain-target" class={className}>unmanaged component</div>
