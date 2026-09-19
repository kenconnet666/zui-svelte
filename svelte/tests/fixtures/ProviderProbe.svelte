<script lang="ts">
  import { mount, unmount, onMount, onDestroy, tick } from 'svelte';
  import { createRuntime, ThemeScope, type StyleRuntime } from '@zui/core';
  import { css, lightTheme, type DefaultTokens } from '@zui/svelte';
  import { StyleProvider, provideStyleRuntime } from '@zui/svelte';
  import ProviderTarget from './ProviderTarget.svelte';

  const root = new ThemeScope(lightTheme, { color: { text: 'red' } });
  const child = root.fork({ color: { text: 'blue' } });
  const alternate = new ThemeScope(lightTheme, { color: { text: 'purple' } });
  let selected = $state(root);
  let visible = $state(true);
  let completed = $state(0);
  let clicks = $state(0);
  let runtime: StyleRuntime<DefaultTokens> | undefined;
  if (typeof document !== 'undefined') {
    runtime = createRuntime({
      theme: lightTheme,
      target: document,
      namespace: 'provider',
      variables: 'stylesheet',
    });
    provideStyleRuntime(runtime);
    onDestroy(() => runtime?.dispose());
  }
  onMount(() => {
    const portal = document.createElement('div');
    const host = document.createElement('div');
    document.body.append(portal, host);
    const shadow = host.attachShadow({ mode: 'open' });
    const shadowRuntime = createRuntime({
      theme: lightTheme,
      target: shadow,
      namespace: 'provider-shadow',
      variables: 'stylesheet',
    });
    const portalComponent = mount(ProviderTarget, {
      target: portal,
      props: { scope: root, runtime, label: 'provider-portal' },
    });
    const shadowComponent = mount(ProviderTarget, {
      target: shadow,
      props: { scope: root, runtime: shadowRuntime, label: 'provider-shadow' },
    });
    return () => {
      void Promise.all([unmount(portalComponent), unmount(shadowComponent)]).finally(() => {
        shadowRuntime.dispose();
        portal.remove();
        host.remove();
      });
    };
  });
  onDestroy(() => {
    root.dispose();
    alternate.dispose();
  });

  async function switchTheme() {
    for (let i = 0; i < 100; i++) {
      root.setOverrides({ color: { text: i % 2 ? 'green' : 'red' } });
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
