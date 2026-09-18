<script lang="ts">
  import { onDestroy } from 'svelte';
  import { css, lightTheme, ThemeScope } from '@zui/core';
  import { StyleProvider } from '@zui/svelte';
  const scope = new ThemeScope(lightTheme, { color: { text: 'red' } });
  const child = scope.fork({ color: { text: 'blue' } });
  onDestroy(() => scope.dispose());
</script>

<button onclick={() => scope.override({ color: { text: 'green' } })}>Change package theme</button>
<StyleProvider {scope} as="article">
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
