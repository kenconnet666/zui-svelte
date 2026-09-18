<script lang="ts">
  import { onDestroy } from 'svelte';
  import { css, createRuntime } from '@zui/core';
  import { provideStyleRuntime } from '@zui/svelte';

  const runtime = createRuntime({ target: document, variables: 'stylesheet', nonce: 'zui-probe' });
  runtime.themeStyle(':root');
  provideStyleRuntime(runtime);
  onDestroy(() => runtime.dispose());
  let width = $state(100);
</script>

<button
  onclick={() => {
    width += 20;
  }}>Resize CSP</button
>
<div
  data-testid="csp-target"
  class={css((s) => {
    s.width.px(width);
    s.height.px(20);
    s.backgroundColor._primary;
  })}
>
  CSP
</div>
