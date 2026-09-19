<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Placement, ReferenceElement, Boundary } from '@floating-ui/dom';
  import { tabbable } from 'tabbable';
  import { componentCss as css } from '../theme.js';
  import { captureRuntime } from '../runtime/context.js';
  import { captureOverlay, type PortalTarget } from './context.js';
  import { OverlaySession, type OverlayCloseEvent } from './session.js';
  import { FloatingController } from './floating.js';
  import Portal from './Portal.svelte';
  import Panel from './Panel.svelte';

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
    open?: boolean;
    anchor?: ReferenceElement;
    placement?: Placement;
    offset?: number;
    collisionPadding?: number;
    boundary?: Boundary;
    arrow?: boolean;
    matchAnchorWidth?: boolean;
    portal?: PortalTarget;
    keepMounted?: boolean;
    animated?: boolean;
    interactive?: boolean;
    onclose?: (event: OverlayCloseEvent) => void;
    onpanel?: (element: HTMLElement | undefined) => void;
    slotProps?: { arrow?: HTMLAttributes<HTMLDivElement> };
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
    if (node && reference && visible && portal !== null) return floating.connect(reference, node);
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
        ? () =>
            tabbable(element).find((node): node is HTMLElement => 'offsetWidth' in node) ?? element
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
        s.display(visible ? 'block' : 'none');
        s.visibility(position.ready && !position.hidden ? 'visible' : 'hidden');
        if (matchAnchorWidth) s.inlineSize.px(position.referenceWidth);
        s.maxInlineSize.px(position.availableWidth);
        s.maxBlockSize.px(position.availableHeight);
      })}
    >
      <Panel
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
            s.boxSizing.borderBox;
            s.padding._md;
            s.borderRadius._md;
            s.backgroundColor._surfaceRaised;
            s.color._text;
            s.boxShadow._md;
            s.transitionDuration._sm;
            s.transitionProperty.none;
            if (matchAnchorWidth) s.inlineSize('100%');
            s.maxBlockSize.px(position.availableHeight);
            s.maxInlineSize.px(position.availableWidth);
          }),
          className,
        ]}
      >
        {@render children?.()}
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
                s.transform('rotate(45deg)');
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
      </Panel>
    </div>
  </Portal>
{/if}
