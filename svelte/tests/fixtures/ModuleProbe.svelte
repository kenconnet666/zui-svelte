<script module lang="ts">
  import { css } from '@zui/core';

  const modulePanel = css((s) => {
    s.width.px(193);
  });
</script>

<script lang="ts">
  import { panel } from './static-styles.js';
</script>

<div class={panel}>module snapshot</div>
<div class={modulePanel}>module script snapshot</div>
