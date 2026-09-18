<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte';
  import { createRuntime } from '@zui/core';
  import { provideStyleRuntime } from '@zui/svelte';

  let { children }: { children: Snippet } = $props();
  if (typeof document !== 'undefined') {
    // 应用根持有 runtime，路由组件只持有各自样式，导航不重复占用 Document。
    const runtime = createRuntime({
      target: document,
      nonce: 'kit-probe',
      variables: 'stylesheet',
    });
    runtime.themeStyle(':where(:root)');
    provideStyleRuntime(runtime);
    onMount(() => runtime.finishHydration());
    onDestroy(() => runtime.dispose());
  }
</script>

{@render children()}
