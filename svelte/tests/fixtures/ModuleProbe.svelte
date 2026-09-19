<script module lang="ts">
  import { css } from '@zui/svelte';

  const modulePanel = css((s) => {
    s.width.px(193);
  });
</script>

<script lang="ts">
  import { panel, mappedPanels, receiverPanel } from './static-styles.js';
</script>

<div class={panel}>module snapshot</div>
<div class={modulePanel}>module script snapshot</div>
<div data-testid="receiver-panel" class={receiverPanel}>receiver module helper</div>
{#each mappedPanels as item, index (item)}
  <div data-testid={'mapped-panel-' + index} class={item}>mapped module helper</div>
{/each}
