<script lang="ts">
  import { onDestroy, untrack, type Snippet, type ComponentProps } from 'svelte';
  import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import X from '@lucide/svelte/icons/x';
  import { componentCss as css, lightTheme as theme } from '../theme.js';
  import type { Size } from '../types.js';
  import { captureRuntime } from '../runtime/context.js';
  import { captureLocale } from '../runtime/config.js';
  import { captureOverlay, type PortalTarget } from './context.js';
  import { OverlaySession, type OverlayCloseEvent } from './session.js';
  import type { LayerOptions } from './layers.js';
  import ScrollArea from '../layout/ScrollArea.svelte';
  import Portal from './Portal.svelte';
  import Panel from './Panel.svelte';

  const generatedId = $props.id();
  let {
    open = $bindable(false),
    title,
    description,
    side,
    size = 'md',
    portal = true,
    keepMounted = false,
    animated = true,
    closable = true,
    closeOnEscape = true,
    closeOnOutside = true,
    initialFocus,
    returnFocus,
    onclose,
    footer,
    children,
    slotProps = {},
    class: className,
    style,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onclose'> & {
    open?: boolean;
    title?: string;
    description?: string;
    side?: 'start' | 'end' | 'top' | 'bottom';
    size?: Size | 'full';
    portal?: PortalTarget;
    keepMounted?: boolean;
    animated?: boolean;
    closable?: boolean;
    closeOnEscape?: boolean;
    closeOnOutside?: boolean;
    initialFocus?: LayerOptions['initialFocus'];
    returnFocus?: LayerOptions['returnFocus'];
    onclose?: (event: OverlayCloseEvent) => void;
    footer?: Snippet;
    slotProps?: {
      backdrop?: HTMLAttributes<HTMLDivElement>;
      header?: HTMLAttributes<HTMLElement>;
      title?: HTMLAttributes<HTMLHeadingElement>;
      description?: HTMLAttributes<HTMLParagraphElement>;
      body?: ComponentProps<typeof ScrollArea>;
      footer?: HTMLAttributes<HTMLElement>;
      closeButton?: HTMLButtonAttributes;
      closeIcon?: ComponentProps<typeof X>;
    };
  } = $props();
  const runtime = captureRuntime(),
    locale = captureLocale(),
    parent = captureOverlay();
  const session = untrack(
    () =>
      new OverlaySession(open, (value) => {
        open = value;
      }),
  );
  let backdrop = $state<HTMLElement>();
  const visible = $derived(open || session.presence.mounted);
  function attach(element: HTMLElement) {
    return session.attach(element);
  }
  $effect(() => {
    const element = session.host,
      parentLayer = parent?.layer,
      background = backdrop,
      desired = open;
    const options = {
      parent: parentLayer,
      backdrop: background,
      modal: true,
      nonce: runtime().nonce,
      baseZIndex: Number(runtime().defaultTheme.resolved.zIndex?.popup ?? 1000),
      animated,
      closeOnEscape,
      closeOnOutside,
      initialFocus,
      returnFocus,
      onclose,
    };
    if (!element || portal === null) return;
    if (desired && !title && !rest['aria-label'] && !rest['aria-labelledby'])
      throw new Error('Dialog and Drawer require title, aria-label or aria-labelledby.');
    untrack(() => {
      void session.sync(desired, options);
    });
  });
  onDestroy(() => session.dispose());
</script>

{#if visible || keepMounted}
  <Portal disabled={portal === false} target={typeof portal === 'boolean' ? undefined : portal}>
    <div
      {...slotProps.backdrop}
      {@attach (node) => {
        backdrop = node;
        return () => {
          backdrop = undefined;
        };
      }}
      inert={!open}
      aria-hidden={!open || undefined}
      class={[
        css((s) => {
          s.position.fixed;
          s.zIndex._overlay;
          s.inset.px(0);
          s.boxSizing.borderBox;
          s.display(visible ? 'flex' : 'none');
          s.backgroundColor._backdrop;
          if (!side) {
            s.alignItems.center;
            s.justifyContent.center;
            s.padding._lg;
          } else if (side === 'start' || side === 'end') {
            s.alignItems.stretch;
            s.justifyContent(side === 'start' ? 'flex-start' : 'flex-end');
          } else {
            s.flexDirection.column;
            s.justifyContent(side === 'top' ? 'flex-start' : 'flex-end');
          }
        }),
        slotProps.backdrop?.class,
      ]}
    >
      <Panel
        context={session}
        {attach}
        {...rest}
        {style}
        role="dialog"
        aria-modal="true"
        tabindex={-1}
        aria-labelledby={rest['aria-labelledby'] ?? (title ? generatedId + '-title' : undefined)}
        aria-describedby={rest['aria-describedby'] ??
          (description ? generatedId + '-description' : undefined)}
        class={[
          css((s) => {
            s.position.relative;
            s.boxSizing.borderBox;
            s.display.flex;
            s.flexDirection.column;
            s.minInlineSize.px(0);
            s.minBlockSize.px(0);
            s.backgroundColor._surface;
            s.color._text;
            s.boxShadow._xl;
            s.transitionDuration._md;
            s.transitionProperty.none;
            if (!side) {
              s.inlineSize.token(`panel.${size}`);
              s.maxInlineSize('100%');
              s.maxBlockSize('calc(100dvh - 32px)');
              s.borderRadius._lg;
            } else if (side === 'start' || side === 'end') {
              s.inlineSize.token(`panel.${size}`);
              s.maxInlineSize('100%');
              s.blockSize('100dvh');
            } else {
              s.inlineSize('100%');
              s.blockSize.token(`panel.${size}`);
              s.maxBlockSize('100dvh');
            }
          }),
          className,
        ]}
      >
        {#if title || closable}
          <header
            {...slotProps.header}
            class={[
              css((s) => {
                s.display.flex;
                s.alignItems.center;
                s.gap._md;
                s.padding._lg;
                s.flexShrink(0);
              }),
              slotProps.header?.class,
            ]}
          >
            {#if title}<h2
                {...slotProps.title}
                id={generatedId + '-title'}
                class={[
                  css((s) => {
                    s.margin.px(0);
                    s.fontSize._lg;
                    s.minInlineSize.px(0);
                  }),
                  slotProps.title?.class,
                ]}
              >
                {title}
              </h2>{/if}
            {#if closable}
              <button
                {...slotProps.closeButton}
                type="button"
                aria-label={slotProps.closeButton?.['aria-label'] ?? locale().messages.close}
                onclick={(event) => {
                  slotProps.closeButton?.onclick?.(event);
                  if (!event.defaultPrevented) session.close(event);
                }}
                class={[
                  css((s) => {
                    s.marginInlineStart.auto;
                    s.display.inlineFlex;
                    s.alignItems.center;
                    s.justifyContent.center;
                    s.width._controlSm;
                    s.height._controlSm;
                    s.borderWidth._none;
                    s.backgroundColor.transparent;
                    s.color.inherit;
                    s.borderRadius._sm;
                    s.cursor.pointer;
                    s._focusVisible((s) => {
                      s.outline('2px solid ' + theme.ref('color', 'focus'));
                      s.outlineOffset.px(2);
                    });
                  }),
                  slotProps.closeButton?.class,
                ]}
                ><X
                  size={18}
                  {...slotProps.closeIcon}
                  aria-hidden="true"
                  focusable="false"
                /></button
              >
            {/if}
          </header>
        {/if}
        {#if description}<p
            {...slotProps.description}
            id={generatedId + '-description'}
            class={[
              css((s) => {
                s.margin.px(0);
                s.paddingInline._lg;
                s.paddingBlockEnd._md;
                s.color._muted;
              }),
              slotProps.description?.class,
            ]}
          >
            {description}
          </p>{/if}
        <ScrollArea
          {...slotProps.body}
          tabindex={slotProps.body?.tabindex ?? 0}
          overscroll="contain"
          class={[
            css((s) => {
              s.flex('1 1 auto');
              s.minBlockSize.px(0);
              s.paddingInline._lg;
              s.paddingBlockEnd._lg;
            }),
            slotProps.body?.class,
          ]}
        >
          {@render children?.()}
        </ScrollArea>
        {#if footer}<footer
            {...slotProps.footer}
            class={[
              css((s) => {
                s.display.flex;
                s.justifyContent.end;
                s.gap._sm;
                s.padding._lg;
                s.flexShrink(0);
              }),
              slotProps.footer?.class,
            ]}
          >
            {@render footer()}
          </footer>{/if}
      </Panel>
    </div>
  </Portal>
{/if}
