<script lang="ts">
  import { onDestroy, untrack, type ComponentProps, type Snippet } from 'svelte';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import { on } from 'svelte/events';
  import Popup from './Popup.svelte';

  const generatedId = $props.id();
  let {
    open = $bindable(false),
    content,
    trigger,
    id = generatedId,
    placement = 'top',
    offset = 8,
    delay = 300,
    closeDelay = 120,
    disabled = false,
    arrow = true,
    animated = true,
    class: className,
    style,
    slotProps,
    onclose,
    ...rest
  }: Omit<
    ComponentProps<typeof Popup>,
    'children' | 'anchor' | 'interactive' | 'matchAnchorWidth' | 'onpanel' | 'slotProps'
  > & {
    /** 纯文本提示内容；不承载交互控件。 */
    content: string;
    /** 触发器 snippet；必须把收到的原生属性/attachment 转发到触发元素。 */
    trigger: Snippet<[HTMLAttributes<HTMLElement>]>;
    /** 提示打开延迟，单位 ms；默认 300。 */
    delay?: number;
    /** 提示关闭延迟，单位 ms；默认 120。 */
    closeDelay?: number;
    /** 禁用提示触发；默认 false。 */
    disabled?: boolean;
    /** 转发公开部件的参数、class、style 与事件；保留嵌套 slotProps 类型。 */
    slotProps?: Pick<NonNullable<ComponentProps<typeof Popup>['slotProps']>, 'arrow'>;
  } = $props();
  const key = createAttachmentKey();
  const panelId = $derived(id ?? generatedId);
  let anchor = $state<HTMLElement>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let hovered = false,
    focused = false,
    panelHovered = false,
    suppressed = false;
  function clear() {
    clearTimeout(timer);
    timer = undefined;
  }
  function show() {
    clear();
    if (disabled || suppressed) return;
    timer = setTimeout(
      () => {
        timer = undefined;
        if (!disabled && !suppressed) open = true;
      },
      Math.max(0, delay),
    );
  }
  function hide() {
    clear();
    if (hovered || focused || panelHovered) return;
    suppressed = false;
    timer = setTimeout(
      () => {
        timer = undefined;
        open = false;
      },
      Math.max(0, closeDelay),
    );
  }
  function attach(node: HTMLElement) {
    anchor = node;
    $effect(() => {
      if (!open) return;
      const token = panelId;
      const update = () => {
        const previous = node.getAttribute('aria-describedby')?.split(/\s+/u).filter(Boolean) ?? [];
        if (!previous.includes(token))
          node.setAttribute('aria-describedby', [...previous, token].join(' '));
      };
      update();
      const observer = new MutationObserver(update);
      observer.observe(node, { attributes: true, attributeFilter: ['aria-describedby'] });
      return () => {
        observer.disconnect();
        const remaining = node
          .getAttribute('aria-describedby')
          ?.split(/\s+/u)
          .filter((value) => value && value !== token)
          .join(' ');
        if (remaining) node.setAttribute('aria-describedby', remaining);
        else node.removeAttribute('aria-describedby');
      };
    });
    const stops = [
      on(node, 'pointerdown', (event) => {
        if (event.pointerType === 'touch') {
          suppressed = true;
          clear();
          open = false;
        }
      }),
      on(node, 'pointerenter', (event) => {
        if (event.pointerType !== 'touch') {
          hovered = true;
          show();
        }
      }),
      on(node, 'pointerleave', () => {
        hovered = false;
        hide();
      }),
      on(node, 'focusin', () => {
        focused = true;
        show();
      }),
      on(node, 'focusout', () => {
        focused = false;
        hide();
      }),
    ];
    return () => {
      clear();
      for (const stop of stops) stop();
      hovered = focused = panelHovered = suppressed = false;
      anchor = undefined;
    };
  }
  // SSR 初始描述关系与客户端一致；后续只增删自己的 ID，保留用户已有描述。
  const triggerProps = {
    [key]: attach,
    'aria-describedby': untrack(() => (open ? panelId : undefined)),
  };
  $effect(() => {
    if (disabled && open) {
      clear();
      open = false;
    }
  });
  onDestroy(clear);
</script>

{@render trigger(triggerProps)}
<Popup
  {...rest}
  bind:open
  {anchor}
  id={panelId}
  {placement}
  {offset}
  {arrow}
  {animated}
  {slotProps}
  interactive={false}
  class={className}
  {style}
  role="tooltip"
  onpointerenter={(event) => {
    rest.onpointerenter?.(event);
    panelHovered = true;
    clear();
  }}
  onpointerleave={(event) => {
    rest.onpointerleave?.(event);
    panelHovered = false;
    hide();
  }}
  onclose={(event) => {
    onclose?.(event);
    if (!event.defaultPrevented && event.reason === 'escape') {
      suppressed = true;
      clear();
    }
  }}
>
  {content}
</Popup>
