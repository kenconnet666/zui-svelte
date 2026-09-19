<script lang="ts">
  import { onDestroy, untrack, type Snippet, type ComponentProps } from 'svelte';
  import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import X from '@lucide/svelte/icons/x';
  import { componentCss as css, lightTheme as theme, type DefaultTokens } from '../theme.js';
  import type { Size } from '../types.js';
  import { captureRuntime } from '../runtime/context.js';
  import { captureLocale } from '../runtime/config.js';
  import { captureOverlay, type PortalTarget } from './context.js';
  import { OverlaySession, type OverlayCloseEvent } from './session.js';
  import type { LayerOptions } from './layers.js';
  import ScrollArea from '../layout/ScrollArea.svelte';
  import Portal from './Portal.svelte';
  import OverlayHost from './OverlayHost.svelte';

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
    /** 是否打开，支持 bind:open；默认 false。 */
    open?: boolean;
    /** 面板标题及可访问名称来源。 */
    title?: string;
    /** 面板描述，通过 aria-describedby 关联。 */
    description?: string;
    /** Drawer 停靠边；start/end 随 RTL 改变物理方向。 */
    side?: 'start' | 'end' | 'top' | 'bottom';
    /** 组件五档尺寸，md 为默认；full 的含义由组件定义。 */
    size?: Size | 'full';
    /** 是否/向何处转移面板；保持逻辑层和主题关系。 */
    portal?: PortalTarget;
    /** 关闭后是否保留 DOM；默认 false，不表示仍可交互。 */
    keepMounted?: boolean;
    /** 是否启用进入/退出动画；遵循减少动画偏好。 */
    animated?: boolean;
    /** 是否显示关闭按钮；默认 true。 */
    closable?: boolean;
    /** 是否响应 Escape 关闭请求；默认 true。 */
    closeOnEscape?: boolean;
    /** 是否响应外部点击关闭请求；默认 true。 */
    closeOnOutside?: boolean;
    /** 打开后初始焦点；false 禁用自动选择，可提供元素或查询函数。 */
    initialFocus?: LayerOptions['initialFocus'];
    /** 关闭后恢复焦点的目标函数；false 禁用恢复。 */
    returnFocus?: LayerOptions['returnFocus'];
    /** 关闭请求，cancelable 时可 preventDefault；直接更新绑定值不伪造事件。 */
    onclose?: (event: OverlayCloseEvent) => void;
    /** 页脚内容 snippet。 */
    footer?: Snippet;
    /** 转发公开部件的参数、class、style 与事件；保留嵌套 slotProps 类型。 */
    slotProps?: {
      /** 遮罩元素的属性及样式。 */
      backdrop?: HTMLAttributes<HTMLDivElement>;
      /** 标题区域的原生属性及样式。 */
      header?: HTMLAttributes<HTMLElement>;
      /** 面板标题及可访问名称来源。 */
      title?: HTMLAttributes<HTMLHeadingElement>;
      /** 面板描述，通过 aria-describedby 关联。 */
      description?: HTMLAttributes<HTMLParagraphElement>;
      /** 内部 ScrollArea 的 Props，支持继续传递 viewport/content 的 slotProps。 */
      body?: ComponentProps<typeof ScrollArea>;
      /** 页脚内容 snippet。 */
      footer?: HTMLAttributes<HTMLElement>;
      /** 关闭按钮的原生属性及事件。 */
      closeButton?: HTMLButtonAttributes;
      /** Lucide 关闭图标组件的 Props。 */
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
  const widths = {
    xs: '_panelXs',
    sm: '_panelSm',
    md: '_panelMd',
    lg: '_panelLg',
    xl: '_panelXl',
    full: '_full',
  } as const satisfies Record<Size | 'full', `_${keyof DefaultTokens['size'] & string}`>;
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
          s.display.token(visible ? 'flex' : 'none');
          s.backgroundColor._backdrop;
          if (!side) {
            s.alignItems.center;
            s.justifyContent.center;
            s.padding._lg;
          } else if (side === 'start' || side === 'end') {
            s.alignItems.stretch;
            s.justifyContent.token(side === 'start' ? 'flex-start' : 'flex-end');
          } else {
            s.flexDirection.column;
            s.justifyContent.token(side === 'top' ? 'flex-start' : 'flex-end');
          }
        }),
        slotProps.backdrop?.class,
      ]}
    >
      <OverlayHost
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
              s.inlineSize.token(widths[size]);
              s.maxInlineSize.raw('100%');
              s.maxBlockSize.raw('calc(100dvh - 32px)');
              s.borderRadius._lg;
            } else if (side === 'start' || side === 'end') {
              s.inlineSize.token(widths[size]);
              s.maxInlineSize.raw('100%');
              s.blockSize.raw('100dvh');
            } else {
              s.inlineSize.raw('100%');
              s.blockSize.token(widths[size]);
              s.maxBlockSize.raw('100dvh');
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
                s.flexShrink.raw(0);
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
                      s.outline.raw('2px solid ' + theme.ref('color', 'focus'));
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
              s.flex.raw('1 1 auto');
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
                s.flexShrink.raw(0);
              }),
              slotProps.footer?.class,
            ]}
          >
            {@render footer()}
          </footer>{/if}
      </OverlayHost>
    </div>
  </Portal>
{/if}
