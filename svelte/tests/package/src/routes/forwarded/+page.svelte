<script lang="ts">
  import { css } from '@zui/svelte';
  import { resolve } from '$app/paths';
  import Plain from 'zui-fixture-plain';
  let width = $state(100);
</script>

<button onclick={() => (width += 20)}>Resize forwarded</button>
<Plain
  class={css((s) => {
    s.width.px(width);
  })}
/>
<a href={resolve('/static')}>Static route</a>
