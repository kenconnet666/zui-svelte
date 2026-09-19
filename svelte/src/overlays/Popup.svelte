<script lang="ts">
  import { onDestroy, untrack, type ComponentProps } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Placement, ReferenceElement, Boundary } from '@floating-ui/dom';
  import { tabbable } from 'tabbable';
  import { componentCss as css } from '../theme.js';
  import { captureRuntime } from '../runtime/context.js';
  import { captureOverlay, type PortalTarget } from './context.js';
  import { OverlaySession, type OverlayCloseEvent } from './session.js';
  import { FloatingController } from './floating.js';
  import Portal from './Portal.svelte';
  import OverlayHost from './OverlayHost.svelte';
  import ScrollArea from '../layout/ScrollArea.svelte';

  let {
    open = $bindable(false),
    anchor,
    placement = 'bottom-start',
    offset = 6,
    collisionPadding = 8,
    boundary,
    arrow = false,
    matchAnchorWidth = false,
    portal = true,
    keepMounted = false,
    animated = true,
    interactive = true,
    onclose,
    onpanel,
    slotProps = {},
    class: className,
    style,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, 'onclose'> & {
    /** 是否打开，支持 bind:open；默认 false。 */
    open?: boolean;
    /** 定位参考元素或 Floating UI 虚拟参考；与 trigger snippet 二选一。 */
    anchor?: ReferenceElement;
    /** 期望定位方向；碰撞时可能翻转，实际位置由定位结果决定。 */
    placement?: Placement;
    /** 面板与锚点的间距，单位 px。 */
    offset?: number;
    /** 与碰撞边界的最小距离，默认 8px。 */
    collisionPadding?: number;
    /** 定位碰撞边界，沿用 Floating UI Boundary。 */
    boundary?: Boundary;
    /** 是否显示指向锚点的箭头。 */
    arrow?: boolean;
    /** 面板是否匹配锚点宽度；默认 false。 */
    matchAnchorWidth?: boolean;
    /** 是否/向何处转移面板；保持逻辑层和主题关系。 */
    portal?: PortalTarget;
    /** 关闭后是否保留 DOM；默认 false，不表示仍可交互。 */
    keepMounted?: boolean;
    /** 是否启用进入/退出动画；遵循减少动画偏好。 */
    animated?: boolean;
    /** 面板是否可交互；Tooltip 使用非交互面板。 */
    interactive?: boolean;
    /** 关闭请求，cancelable 时可 preventDefault；直接更新绑定值不伪造事件。 */
    onclose?: (event: OverlayCloseEvent) => void;
    /** 内部面板节点变化通知，销毁时传 undefined。 */
    onpanel?: (element: HTMLElement | undefined) => void;
    /** 转发公开部件的参数、class、style 与事件；保留嵌套 slotProps 类型。 */
    slotProps?: {
      /** 是否显示指向锚点的箭头。 */
      arrow?: HTMLAttributes<HTMLDivElement>;
      /** 内部 ScrollArea 的 Props，支持继续传递 viewport/content 的 slotProps。 */
      body?: ComponentProps<typeof ScrollArea>;
    };
  } = $props();
  const runtime = captureRuntime();
  const parent = captureOverlay();
  const session = untrack(
    () =>
      new OverlaySession(open, (value) => {
        open = value;
      }),
  );
  const floating = new FloatingController();
  let positioner = $state<HTMLElement>();
  let arrowNode = $state<HTMLElement>();
  let hadAnchor = false;
  const position = $derived(floating.state);
  const side = $derived(position.placement.split('-')[0]);
  const visible = $derived(open || session.presence.mounted);
  function panel(element: HTMLElement) {
    const stop = session.attach(element);
    onpanel?.(element);
    return () => {
      stop();
      onpanel?.(undefined);
    };
  }
  $effect(() => {
    floating.configure({
      placement,
      gap: offset,
      padding: collisionPadding,
      boundary,
      arrow: arrowNode,
    });
  });
  $effect(() => {
    const node = positioner,
      reference = anchor;
    if (reference) hadAnchor = true;
    else if (node && hadAnchor && open) open = false;
    if (node && reference && visible && portal !== null) return floating.connect(reference, node);
  });
  $effect(() => {
    if (position.hidden && open) open = false;
  });
  $effect(() => {
    const element = session.host;
    const parentLayer = parent?.layer;
    const ready = position.ready;
    if (!element || (open && (!ready || position.hidden))) return;
    const trigger =
      anchor && 'ownerDocument' in anchor && 'focus' in anchor
        ? (anchor as HTMLElement)
        : undefined;
    const options = {
      parent: parentLayer,
      trigger,
      modal: false,
      positioner,
      nonce: runtime().nonce,
      baseZIndex: Number(runtime().defaultTheme.resolved.zIndex?.popup ?? 1000),
      animated,
      closeOnOutside: interactive,
      closeOnFocusOutside: interactive,
      handlesTab: interactive,
      initialFocus: interactive
        ? () => {
            const candidates = tabbable(element).filter(
              (node): node is HTMLElement => 'offsetWidth' in node,
            );
            return (
              candidates.find((node) => !node.hasAttribute('data-zui-scroll-viewport')) ??
              candidates[0] ??
              element
            );
          }
        : (false as const),
      onclose,
    };
    untrack(() => {
      void session.sync(open, options);
    });
  });
  function keydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    rest.onkeydown?.(event);
    if (
      !interactive ||
      event.defaultPrevented ||
      event.isComposing ||
      event.key !== 'Tab' ||
      !anchor ||
      !('focus' in anchor)
    )
      return;
    const element = session.host;
    if (!element) return;
    const items = tabbable(element),
      active = element.ownerDocument.activeElement;
    if (items.length && active !== (event.shiftKey ? items[0] : items.at(-1)) && active !== element)
      return;
    const trigger = anchor as HTMLElement;
    const root = element.getRootNode() as Document | ShadowRoot;
    const outside = tabbable(
      root.nodeType === 9 ? element.ownerDocument.body : (root as unknown as HTMLElement),
    ).filter((node) => !element.contains(node));
    const target = event.shiftKey ? trigger : outside[outside.indexOf(trigger) + 1];
    if (!target) return;
    event.preventDefault();
    session.layer?.requestClose('focus-outside', event);
    target.focus();
  }
  onDestroy(() => {
    floating.dispose();
    session.dispose();
  });
</script>

{#if visible || keepMounted}
  <Portal disabled={portal === false} target={typeof portal === 'boolean' ? undefined : portal}>
    <div
      {@attach (node) => {
        positioner = node;
        return () => {
          positioner = undefined;
        };
      }}
      inert={!open}
      aria-hidden={!open || undefined}
      class={css((s) => {
        s.position.fixed;
        s.zIndex._popup;
        s.left.px(position.x);
        s.top.px(position.y);
        s.display.token(visible ? 'block' : 'none');
        s.visibility.token(position.ready && !position.hidden ? 'visible' : 'hidden');
        if (matchAnchorWidth) s.inlineSize.px(position.referenceWidth);
        s.maxInlineSize.px(position.availableWidth);
        s.maxBlockSize.px(position.availableHeight);
      })}
    >
      <OverlayHost
        context={session}
        attach={panel}
        {...rest}
        {style}
        onkeydown={keydown}
        tabindex={-1}
        data-placement={position.placement}
        class={[
          css((s) => {
            s.position.relative;
            s.display.flex;
            s.flexDirection.column;
            s.overflowWrap.anywhere;
            s.boxSizing.borderBox;
            s.padding._md;
            s.borderRadius._md;
            s.backgroundColor._surfaceRaised;
            s.color._text;
            s.boxShadow._md;
            s.transitionDuration._sm;
            s.transitionProperty.none;
            if (matchAnchorWidth) s.inlineSize.raw('100%');
            s.maxBlockSize.px(position.availableHeight);
            s.maxInlineSize.px(position.availableWidth);
          }),
          className,
        ]}
      >
        {#if interactive}
          <ScrollArea
            {...slotProps.body}
            overscroll="contain"
            class={[
              css((s) => {
                s.flex.raw('1 1 auto');
                s.minBlockSize.px(0);
                s.maxBlockSize.inherit;
                s.maxInlineSize.raw('100%');
              }),
              slotProps.body?.class,
            ]}
          >
            {@render children?.()}
          </ScrollArea>
        {:else}
          {@render children?.()}
        {/if}
        {#if arrow}
          <div
            {...slotProps.arrow}
            aria-hidden="true"
            {@attach (node) => {
              arrowNode = node;
              return () => {
                arrowNode = undefined;
              };
            }}
            class={[
              css((s) => {
                s.position.absolute;
                s.width.px(8);
                s.height.px(8);
                s.backgroundColor.inherit;
                s.transform.raw('rotate(45deg)');
                if (position.arrowX !== undefined) s.left.px(position.arrowX);
                if (position.arrowY !== undefined) s.top.px(position.arrowY);
                if (side === 'top') s.bottom.px(-4);
                else if (side === 'bottom') s.top.px(-4);
                else if (side === 'left') s.right.px(-4);
                else s.left.px(-4);
              }),
              slotProps.arrow?.class,
            ]}
          ></div>
        {/if}
      </OverlayHost>
    </div>
  </Portal>
{/if}
