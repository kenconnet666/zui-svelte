<script lang="ts">
  import type { Snippet } from 'svelte';
  import RuntimeRoot from '../RuntimeRoot.svelte';

  let { children, data }: { children: Snippet; data: { customTheme: boolean } } = $props();
</script>

{#key data.customTheme}
  <RuntimeRoot custom={data.customTheme}>{@render children()}</RuntimeRoot>
{/key}
