<script lang="ts">
  import { untrack } from 'svelte';
  import { css } from '@zui/svelte';

  let { data }: { data: { width: number; delayed: Promise<string> } } = $props();
  let width = $state(untrack(() => data.width));
</script>

<button
  onclick={() => {
    width += 20;
  }}>Resize</button
>
<div
  data-testid="kit-target"
  class={css((s) => {
    s.width.px(width);
    s.height.px(20);
  })}
>
  initial-shell
</div>
{#await data.delayed}
  <p>waiting</p>
{:then text}
  <p
    data-testid="late-target"
    class={css((s) => {
      s.color.token('red');
    })}
  >
    {text}
  </p>
{/await}
