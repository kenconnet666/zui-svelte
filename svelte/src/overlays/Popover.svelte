<script lang="ts">
  import { untrack, type Snippet, type ComponentProps } from 'svelte';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import { on } from 'svelte/events';
  import Popup from './Popup.svelte';

  const generatedId = $props.id();
  let {
    open = $bindable(false),
    anchor,
    trigger,
    id = generatedId,
    placement = 'bottom-start',
    offset = 6,
    arrow = false,
    matchAnchorWidth = false,
    keepMounted = false,
    animated = true,
    class: className,
    style,
    slotProps,
    children,
    ...rest
  }: Omit<ComponentProps<typeof Popup>, 'interactive' | 'onpanel'> & {
    trigger?: Snippet<[HTMLAttributes<HTMLElement>]>;
  } = $props();
  const key = createAttachmentKey();
  const panelId = $derived(id ?? generatedId);
  let triggerElement = $state<HTMLElement>();
  const reference = $derived(anchor ?? triggerElement);
  function attach(node: HTMLElement) {
    if (untrack(() => anchor))
      throw new Error('Choose a Popover trigger snippet or an external anchor.');
    triggerElement = node;
    const stop = on(node, 'click', (event) => {
      if (!event.defaultPrevented && !node.matches(':disabled')) open = !open;
    });
    return () => {
      stop();
      triggerElement = undefined;
    };
  }
  const triggerProps = $derived({
    [key]: attach,
    id: generatedId + '-trigger',
    'aria-expanded': open,
    'aria-controls': panelId,
    'aria-haspopup': 'dialog' as const,
  });
</script>

{@render trigger?.(triggerProps)}
<Popup
  {...rest}
  bind:open
  anchor={reference}
  id={panelId}
  {placement}
  {offset}
  {arrow}
  {matchAnchorWidth}
  {keepMounted}
  {animated}
  {slotProps}
  class={className}
  {style}
  role="dialog"
  aria-labelledby={rest['aria-labelledby'] ??
    (!rest['aria-label'] && trigger ? triggerElement?.id || generatedId + '-trigger' : undefined)}
>
  {@render children?.()}
</Popup>
