<script lang="ts">
  import { css } from '@zui/core';
  let rows = $state([
    { id: 'one', width: 101 },
    { id: 'two', width: 202 },
  ]);
  let depth = $state(2);
</script>

<button
  onclick={() => {
    rows = rows.toReversed();
    depth = 3;
  }}>Change structure</button
>
<!-- 此用例专门验证原生 unkeyed DOM 复用，不应改成 keyed。 -->
<!-- eslint-disable-next-line svelte/require-each-key -->
{#each rows as row}
  <div
    data-testid="unkeyed"
    class={css((s) => {
      s.width.px(row.width);
    })}
  >
    {row.id}
  </div>
{/each}
{#each rows as row (row)}
  <div
    data-testid="object-key"
    class={css((s) => {
      s.width.px(row.width);
    })}
  >
    {row.id}
  </div>
{/each}
{#snippet branch(level: number)}
  <div
    data-depth={level}
    class={css((s) => {
      s.width.px(70 + level);
    })}
  >
    {#if level > 0}{@render branch(level - 1)}{/if}
  </div>
{/snippet}
{@render branch(depth)}
