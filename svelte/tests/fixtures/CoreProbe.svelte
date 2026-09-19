<script lang="ts">
  import { untrack } from 'svelte';
  import { css } from '@zui/svelte';
  import SlotProbe from './SlotProbe.svelte';

  let { initialWidth = 100 }: { initialWidth?: number } = $props();
  let width = $state(untrack(() => initialWidth));
  let fontSize = $state(12);
  let rows = $state([
    { id: 'a', width: 40 },
    { id: 'b', width: 80 },
  ]);

  function resize() {
    width += 20;
    fontSize += 2;
  }
</script>

<h1>Core integration probe</h1>
<button onclick={resize}>Resize</button>
<button
  onclick={() => {
    rows = [...rows].reverse();
  }}>Reverse</button
>
<button
  onclick={() => {
    rows = rows.filter((row) => row.id !== 'a');
  }}>Remove A</button
>

<div
  data-testid="direct"
  style="color: red"
  class={css((s) => {
    s.width.px(width);
    s.height.px(20);
    s.gap.px(12);
  })}
>
  direct
</div>

<SlotProbe
  class={css((s) => {
    s.width.px(width);
  })}
  slotProps={{
    input: {
      class: css((s) => {
        s.fontSize.px(fontSize);
      }),
      placeholder: 'Search',
    },
    row: ({ itemWidth, selected }) => ({
      class: css((s) => {
        s.width.px(itemWidth + width / 10);
        s.opacity(selected ? 1 : 0.6);
      }),
    }),
  }}
/>

{#each rows as row (row.id)}
  <div
    data-testid={'row-' + row.id}
    class={css((s) => {
      s.width.px(row.width + width);
    })}
  >
    {row.id}
  </div>
{:else}
  <p class="empty">empty</p>
{/each}

{#snippet sample(offset: number)}
  <div
    data-testid={'snippet-' + offset}
    class={css((s) => {
      s.width.px(width + offset);
    })}
  >
    snippet
  </div>
{/snippet}
{@render sample(1)}
{@render sample(2)}
