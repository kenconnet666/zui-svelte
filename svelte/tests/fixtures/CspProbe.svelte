<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { createRuntime, bindTheme, overrideTheme, ThemeScope } from '@zui/core';
  import { css, lightTheme } from '@zui/svelte';
  import { provideStyleRuntime } from '@zui/svelte';

  const runtime = createRuntime({
    target: document,
    theme: lightTheme,
    variables: 'stylesheet',
    nonce: 'zui-probe',
  });
  runtime.themeStyle(':root');
  provideStyleRuntime(runtime);
  onDestroy(() => runtime.dispose());
  const theme = new ThemeScope(lightTheme);
  let themed: HTMLDivElement | undefined;
  onMount(() => {
    if (themed) return bindTheme(themed, theme, runtime);
  });
  onDestroy(() => theme.dispose());
  let width = $state(100);
</script>

<button onclick={() => theme.setTheme(overrideTheme(lightTheme, { color: { primary: 'red' } }))}
  >Switch theme</button
>
<div
  bind:this={themed}
  data-testid="csp-theme"
  class={css((s) => {
    s.color._primary;
  })}
>
  Theme
</div>

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
