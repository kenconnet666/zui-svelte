<script lang="ts">
  import { onDestroy } from 'svelte';
  import { createCss, ThemeScope } from '@zui/core';
  import { StyleProvider } from '@zui/svelte';
  import { resolve } from '$app/paths';
  import { customTheme } from '../../themes';

  const css = createCss(customTheme);
  const scope = new ThemeScope(customTheme);
  onDestroy(() => scope.dispose());
  let width = $state(137);
</script>

<button
  onclick={() => {
    width += 10;
    scope.setOverrides({ color: { ink: '#008000' } });
  }}
>
  Change custom theme
</button>
<StyleProvider {scope}>
  <div
    data-testid="custom-target"
    class={css((s) => {
      s.display.flex;
      s.width.px(width);
      s.gap._gutter;
      s.color._ink;
      s.backgroundColor._paper;
    })}
  >
    custom-only schema
  </div>
</StyleProvider>
<a href={resolve('/theme')}>Default schema route</a>
