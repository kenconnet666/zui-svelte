<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import { ThemeScope } from '@zui/core';
  import { css, lightTheme, darkTheme } from '@zui/svelte';
  import { StyleProvider } from '@zui/svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const scope = new ThemeScope(untrack(() => (data.scheme === 'dark' ? darkTheme : lightTheme)));
  $effect.pre(() => scope.setTheme(data.scheme === 'dark' ? darkTheme : lightTheme));
  onDestroy(() => scope.dispose());
</script>

<StyleProvider {scope}>
  <p
    data-testid="scheme-target"
    class={css((s) => {
      s.color._text;
      s.backgroundColor._surface;
    })}
  >
    theme from request
  </p>
  <button onclick={() => scope.setTheme(darkTheme)}>Preview dark</button>
  <button onclick={() => scope.setTheme(lightTheme)}>Preview light</button>
  <form method="POST">
    <button name="scheme" value="dark">Save dark</button>
    <button name="scheme" value="light">Save light</button>
  </form>
</StyleProvider>
