<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import { css } from '@zui/svelte';
  import { captureThemeHost, FloatingController, PortalMount } from '@zui/svelte/internal';

  const theme = captureThemeHost();
  const floating = new FloatingController();
  let anchor = $state<HTMLButtonElement>();
  let open = $state(false);
  let portal = $state<PortalMount>();
  const position = $derived(floating.state);
  function attach(element: HTMLElement) {
    const source = untrack(() => anchor);
    if (!source) return;
    const mount = new PortalMount(
      element,
      undefined,
      untrack(() => theme?.()),
    );
    portal = mount;
    const stop = floating.connect(source, element);
    return () => {
      stop();
      mount.dispose();
      if (portal === mount) portal = undefined;
    };
  }
  $effect(() => {
    portal?.update(undefined, theme?.());
  });
  onDestroy(() => floating.dispose());
</script>

<button
  type="button"
  bind:this={anchor}
  data-testid="floating-anchor"
  onclick={() => (open = !open)}
  class={css((s) => {
    s.position.fixed;
    s.bottom.px(8);
    s.right.px(8);
  })}>切换定位层</button
>
{#if open}
  <div
    {@attach attach}
    role="status"
    data-testid="floating-panel"
    data-placement={position.placement}
    class={[
      theme?.().marker,
      css((s) => {
        s.position.fixed;
        s.left.px(position.x);
        s.top.px(position.y);
        s.width.px(180);
        s.height.px(72);
        s.padding.px(8);
        s.visibility(position.ready ? 'visible' : 'hidden');
        s.color._text;
        s.backgroundColor._surface;
        s.borderStyle.solid;
      }),
    ]}
  >
    Portal 主题
  </div>
{/if}
