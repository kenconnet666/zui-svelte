<script lang="ts">
  import { css } from '@zui/core';
</script>

<div
  data-testid="prerender-target"
  class={css((s) => {
    s.width.px(213);
    s.color('red');
  })}
>
  static package consumer
</div>
