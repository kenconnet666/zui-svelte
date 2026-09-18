<script lang="ts">
  import { css } from './styling.js';

  const snapshot = css((s) => {
    s.color._brand;
  });
</script>

<div class={snapshot}>snapshot</div>
<div
  class={css((s) => {
    s.backgroundColor._brand;
  })}
>
  inline
</div>
