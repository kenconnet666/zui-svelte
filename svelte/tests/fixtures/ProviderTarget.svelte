<script lang="ts">
  import { untrack } from 'svelte';
  import { css, type DefaultTokens, type StyleRuntime, type ThemeScope } from '@zui/core';
  import { StyleProvider, provideStyleRuntime } from '@zui/svelte';
  let {
    scope,
    runtime,
    label,
  }: { scope: ThemeScope<DefaultTokens>; runtime?: StyleRuntime<DefaultTokens>; label: string } =
    $props();
  // 独立挂载目标显式选择 runtime；SSR 使用当前请求 collector。
  untrack(() => {
    if (runtime) provideStyleRuntime(runtime);
  });
</script>

<StyleProvider {scope}>
  <p
    data-testid={label}
    class={css((s) => {
      s.color._text;
    })}
  >
    independent theme target
  </p>
</StyleProvider>
