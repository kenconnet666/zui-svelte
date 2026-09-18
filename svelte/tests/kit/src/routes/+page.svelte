<script lang="ts">
  import { onDestroy, onMount, untrack } from 'svelte';
  import { css, createRuntime } from '@zui/core';
  import { provideStyleRuntime } from '@zui/svelte';

  let { data }: { data: { width: number; delayed: Promise<string> } } = $props();
  let width = $state(untrack(() => data.width));
  if (typeof document !== 'undefined') {
    const runtime = createRuntime({
      target: document,
      nonce: 'kit-probe',
      variables: 'stylesheet',
    });
    runtime.themeStyle(':where(:root)');
    provideStyleRuntime(runtime);
    onMount(() => {
      runtime.finishHydration();
    });
    onDestroy(() => {
      runtime.dispose();
    });
  }
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
      s.color('red');
    })}
  >
    {text}
  </p>
{/await}
