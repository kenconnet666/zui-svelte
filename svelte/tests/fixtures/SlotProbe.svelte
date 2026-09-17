<script lang="ts">
  import type { ClassValue, HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

  let {
    class: className,
    slotProps = {},
  }: {
    class?: ClassValue;
    slotProps?: {
      input?: HTMLInputAttributes;
      row?: (state: { itemWidth: number; selected: boolean }) => HTMLAttributes<HTMLDivElement>;
    };
  } = $props();
</script>

<div data-testid="forwarded" class={className}>
  <input data-testid="forwarded-input" {...slotProps.input} />
  {#each [40, 60] as itemWidth (itemWidth)}
    <div
      data-testid={'option-' + itemWidth}
      {...slotProps.row?.({ itemWidth, selected: itemWidth === 40 })}
    >
      option
    </div>
  {/each}
</div>
