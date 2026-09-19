<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { componentCss as css } from '../theme.js';
  import { captureThemeHost } from '../runtime/theme-context.js';
  import { PortalMount } from './portal.js';
  import { captureOverlay } from './context.js';

  let {
    target,
    disabled = false,
    class: className,
    style,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & {
    /** Portal 目标；undefined 使用默认目标，null 暂缓挂载。 */
    target?: HTMLElement | ShadowRoot | null;
    /** 禁用搬移并原位渲染；默认 false。 */
    disabled?: boolean;
  } = $props();
  const owner = captureOverlay();
  const theme = captureThemeHost();
  let node = $state<HTMLElement>();
  let portal: PortalMount | undefined;
  const destination = $derived(target === undefined && owner ? (owner.host ?? null) : target);
  function attach(element: HTMLElement) {
    node = element;
    return () => {
      portal?.dispose();
      portal = undefined;
      node = undefined;
    };
  }
  $effect(() => {
    const element = node,
      to = destination,
      host = theme?.();
    if (!element) return;
    if (disabled || to === null) {
      portal?.dispose();
      portal = undefined;
      return;
    }
    untrack(() => {
      if (portal) portal.update(to, host);
      else portal = new PortalMount(element, to, host);
    });
  });
  onDestroy(() => portal?.dispose());
</script>

<div
  {...rest}
  {style}
  {@attach attach}
  class={[
    theme?.().marker,
    css((s) => {
      s.display.token(!disabled && destination === null ? 'none' : 'contents');
    }),
    className,
  ]}
>
  {@render children?.()}
</div>
