<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import { css, createRuntime, lightTheme, ThemeScope } from '@zui/core';
  import { StyleProvider, provideStyleRuntime } from '@zui/svelte';

  const root = new ThemeScope(lightTheme, { color: { text: 'red' } });
  const child = root.fork({ color: { text: 'blue' } });
  const alternate = new ThemeScope(lightTheme, { color: { text: 'purple' } });
  let selected = $state(root);
  let visible = $state(true);
  let completed = $state(0);
  let clicks = $state(0);
  if (typeof document !== 'undefined') {
    const runtime = createRuntime({
      target: document,
      namespace: 'provider',
      variables: 'stylesheet',
    });
    provideStyleRuntime(runtime);
    onDestroy(() => runtime.dispose());
  }
  onDestroy(() => {
    root.dispose();
    alternate.dispose();
  });

  async function switchTheme() {
    for (let i = 0; i < 100; i++) {
      root.override({ color: { text: i % 2 ? 'green' : 'red' } });
      await tick();
    }
    completed++;
  }
</script>

<button onclick={switchTheme}>Switch theme 100 times</button>
<button onclick={() => (visible = !visible)}>Toggle provider</button>
<button onclick={() => (selected = selected === root ? alternate : root)}>Replace scope</button>
<button onclick={() => root.dispose()}>Dispose scope</button>
<output data-testid="provider-completed">{completed}</output>
<output data-testid="provider-clicks">{clicks}</output>

{#if visible}
  <StyleProvider
    scope={selected}
    as="section"
    class="custom-provider"
    style="padding: 7px"
    data-testid="provider-container"
    onclick={() => clicks++}
  >
    <p
      data-testid="provider-root"
      class={css((s) => {
        s.color._text;
      })}
    >
      root scope
    </p>
    <StyleProvider scope={child}>
      <p
        data-testid="provider-child"
        class={css((s) => {
          s.color._text;
        })}
      >
        child scope
      </p>
    </StyleProvider>
  </StyleProvider>
{/if}
<StyleProvider scope={root}>
  <p
    data-testid="provider-shared"
    class={css((s) => {
      s.color._text;
    })}
  >
    shared scope
  </p>
</StyleProvider>
