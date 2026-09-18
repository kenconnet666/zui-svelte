<svelte:options runes={false} />

<script>
  import { css } from '@zui/core';
  export let data;
  let width = data.width;
  $: caption = 'size:' + width;
</script>

<button onclick={() => (width += 10)}>Resize legacy route</button>
<div
  data-testid="legacy-route"
  class={css((s) => {
    s.width.px(width);
  })}
>
  {caption}
</div>
