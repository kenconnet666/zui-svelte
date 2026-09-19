<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { componentCss as css } from '../theme.js';
  import { ScrollController } from './scroll.js';

  let {
    axis = 'y',
    overscroll = 'auto',
    scrollbar = 'auto',
    tabindex = 0,
    'aria-label': label,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
    onscroll,
    class: className,
    style,
    slotProps = {},
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, 'onscroll'> & {
    axis?: 'x' | 'y' | 'both';
    overscroll?: 'auto' | 'contain' | 'none';
    scrollbar?: 'auto' | 'always';
    onscroll?: HTMLAttributes<HTMLDivElement>['onscroll'];
    slotProps?: {
      viewport?: HTMLAttributes<HTMLDivElement>;
      content?: HTMLAttributes<HTMLDivElement>;
    };
  } = $props();
  const controller = new ScrollController();
  const state = $derived(controller.state);
  function connect(content: HTMLElement) {
    // 子 attachment 可早于祖先 bind:this 赋值；这两个父节点由本组件模板独占。
    const viewport = content.parentElement!;
    return untrack(() => controller.connect(viewport.parentElement!, viewport, content));
  }
  onDestroy(() => controller.dispose());
  export function getViewport() {
    return controller.viewport;
  }
  export function scrollTo(options: ScrollToOptions) {
    controller.viewport?.scrollTo(options);
  }
  export function scrollBy(options: ScrollToOptions) {
    controller.viewport?.scrollBy(options);
  }
</script>

<div
  {...rest}
  {style}
  class={[
    css((s) => {
      s.position.relative;
      s.minInlineSize.px(0);
      s.minBlockSize.px(0);
      s.overflow.hidden;
      s.isolation.isolate;
    }),
    className,
  ]}
>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (原生滚动视口必须支持键盘操作，不应伪装成按钮。) -->
  <div
    {...slotProps.viewport}
    tabindex={slotProps.viewport?.tabindex ?? tabindex}
    role={slotProps.viewport?.role ?? (label || labelledBy ? 'region' : undefined)}
    aria-label={label ?? slotProps.viewport?.['aria-label']}
    aria-labelledby={labelledBy ?? slotProps.viewport?.['aria-labelledby']}
    aria-describedby={describedBy ?? slotProps.viewport?.['aria-describedby']}
    onscroll={(event) => {
      onscroll?.(event);
      if (slotProps.viewport?.onscroll !== onscroll) slotProps.viewport?.onscroll?.(event);
    }}
    class={css((s) => {
      s.inlineSize('100%');
      s.blockSize('100%');
      s.minInlineSize.px(0);
      s.minBlockSize.px(0);
      s.boxSizing.borderBox;
      s.overflowX(axis === 'y' ? 'hidden' : 'auto');
      s.overflowY(axis === 'x' ? 'hidden' : 'auto');
      s.overscrollBehavior(overscroll);
      s.scrollbarWidth.none;
      // 无脚本时恢复原生可拖动条；正常 SSR 与接管始终保持零占位。
      s._media('(scripting: none)', (s) => {
        s.scrollbarWidth.auto;
      });
    })}
  >
    <div
      {...slotProps.content}
      {@attach connect}
      class={css((s) => {
        s.display.flowRoot;
        s.minInlineSize('100%');
      })}
    >
      {@render children?.()}
    </div>
  </div>
  {#each ['x', 'y'] as orientation (orientation)}
    {@const direction = orientation as 'x' | 'y'}
    {@const metric = state[direction]}
    {#if metric.overflow && (axis === 'both' || axis === direction)}
      <!-- 滑块是原生 viewport 的指针替代；键盘仍操作可聚焦的原生滚动区域。 -->
      <div
        aria-hidden="true"
        role="presentation"
        data-scrollbar={direction}
        onpointerdown={(event) =>
          controller.drag(
            event,
            direction,
            (event.target as Element).hasAttribute('data-scroll-thumb'),
          )}
        class={css((s) => {
          const visible = scrollbar === 'always' || state.active;
          s.position.absolute;
          s.zIndex(1);
          s.touchAction.none;
          s.userSelect.none;
          s.opacity(visible ? 1 : 0);
          s.pointerEvents(visible ? 'auto' : 'none');
          s.transition('opacity 120ms ease');
          if (direction === 'y') {
            s.insetBlockStart.px(2);
            s.insetInlineEnd.px(0);
            s.inlineSize.px(12);
            s.blockSize.px(metric.track);
          } else {
            s.insetInlineStart.px(2);
            s.insetBlockEnd.px(0);
            s.blockSize.px(12);
            s.inlineSize.px(metric.track);
          }
          s._media('(forced-colors: active)', (s) => {
            s.opacity(1);
            s.pointerEvents.auto;
          });
          s._media('(prefers-reduced-motion: reduce)', (s) => {
            s.transition.none;
          });
          s._supports('not (scrollbar-width: none)', (s) => {
            s.display.none;
          });
        })}
      >
        <div
          data-scroll-thumb
          class={css((s) => {
            s.position.absolute;
            s.borderRadius._full;
            s.backgroundColor._muted;
            s.opacity._md;
            if (direction === 'y') {
              s.insetInlineStart.px(3);
              s.insetBlockStart.px(metric.offset);
              s.inlineSize.px(6);
              s.blockSize.px(metric.length);
            } else {
              s.insetBlockStart.px(3);
              s.insetInlineStart.px(metric.offset);
              s.blockSize.px(6);
              s.inlineSize.px(metric.length);
            }
            s._hover((s) => {
              s.opacity._lg;
            });
            s._media('(forced-colors: active)', (s) => {
              s.backgroundColor('ButtonText');
              s.opacity(1);
              s.forcedColorAdjust.none;
            });
          })}
        ></div>
      </div>
    {/if}
  {/each}
</div>
