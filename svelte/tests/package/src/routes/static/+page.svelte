<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ThemeScope } from '@zui/core';
  import { css, lightTheme } from '@zui/svelte';
  import { StyleProvider } from '@zui/svelte';
  import type { Values } from '../../value-fixture.js';
  let { data }: { data: Values } = $props();
  const scope = new ThemeScope(lightTheme, { color: { text: 'red' } });
  const child = scope.fork({ color: { text: 'blue' } });
  onDestroy(() => scope.dispose());
</script>

<button onclick={() => scope.setOverrides({ color: { text: 'green' } })}
  >Change package theme</button
>
<StyleProvider {scope} as="article">
  <p data-testid="prerender-values">
    {data.amount.plus('0.20').toFixed(2)} / {data.day.toString()}
  </p>
  <div
    data-testid="prerender-target"
    class={css((s) => {
      s.width.px(213);
      s.color._text;
    })}
  >
    static package consumer
  </div>
  <StyleProvider scope={child}>
    <p
      data-testid="prerender-nested"
      class={css((s) => {
        s.color._text;
      })}
    >
      nested package theme
    </p>
  </StyleProvider>
</StyleProvider>
