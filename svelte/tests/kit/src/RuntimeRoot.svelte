<script lang="ts">
  import { onDestroy, onMount, untrack, type Snippet } from 'svelte';
  import { createStyleRuntime, provideStyleRuntime, lightTheme } from '@zui/svelte';
  import { runtimeOptions } from './themes';

  let { custom, children }: { custom: boolean; children: Snippet } = $props();
  if (typeof document !== 'undefined') {
    const options = runtimeOptions(untrack(() => custom));
    const runtime = createStyleRuntime({
      ...options,
      theme: options.theme ?? lightTheme,
      target: document,
    });
    runtime.themeStyle(':where(:root)');
    provideStyleRuntime(runtime);
    onMount(() => {
      runtime.finishHydration();
      document.documentElement.dataset.zuiReady = runtime.registry.namespace;
    });
    onDestroy(() => {
      if (document.documentElement.dataset.zuiReady === runtime.registry.namespace)
        delete document.documentElement.dataset.zuiReady;
      runtime.dispose();
    });
  }
</script>

{@render children()}
