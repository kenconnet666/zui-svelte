<script lang="ts">
  import { page } from '$app/state';
  import { css } from '@zui/core';
</script>

<h1
  data-testid="error-title"
  class={css((s) => {
    s.color._danger;
  })}
>
  Error {page.status}
</h1>
