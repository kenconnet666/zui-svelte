<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import { css } from '@zui/svelte';
  import {
    LiveAnnouncer,
    keyboardScope,
    capturePointer,
    animateElement,
  } from '@zui/svelte/internal';

  let value = $state(0);
  let keyCount = $state(0);
  let dragState = $state('idle');
  let animated = $state(0);
  let visible = $state(true);
  let announcer: LiveAnnouncer | undefined;
  let cancelPointer = () => {};
  const abort = new AbortController();
  function attachAnnouncer(node: HTMLElement) {
    const next = new LiveAnnouncer(node);
    announcer = next;
    return () => {
      next.dispose();
      announcer = undefined;
    };
  }
  function attachKeys(node: HTMLElement) {
    return keyboardScope(node, (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return false;
      value = Math.max(0, Math.min(100, value + (event.key === 'ArrowRight' ? 1 : -1)));
      keyCount++;
      return true;
    });
  }
  function pointer(event: PointerEvent) {
    cancelPointer();
    dragState = 'dragging';
    const node = event.currentTarget as HTMLElement;
    const rect = node.getBoundingClientRect();
    cancelPointer = capturePointer(node, event, {
      move: (next) => {
        value = Math.max(
          0,
          Math.min(100, Math.round(((next.clientX - rect.x) / rect.width) * 100)),
        );
      },
      end: (canceled) => {
        dragState = canceled ? 'canceled' : 'complete';
      },
    });
  }
  function attachPointer() {
    return () => untrack(() => cancelPointer());
  }
  onDestroy(() => {
    cancelPointer();
    abort.abort();
  });
</script>

<h1>跨组件交互验收</h1>
<button type="button" onclick={() => announcer?.announce('找到三个结果')}>播报结果</button>
<button type="button" onclick={() => announcer?.announce('保存失败', 'assertive')}>播报错误</button>
<button type="button" onclick={() => (visible = !visible)}>切换交互宿主</button>
<button
  type="button"
  onclick={async (event) => {
    await animateElement(
      event.currentTarget,
      [{ opacity: 0.3 }, { opacity: 1 }],
      { duration: 500 },
      abort.signal,
    );
    animated++;
  }}>测试动效</button
>
{#if visible}
  <div
    data-testid="announcer"
    {@attach attachAnnouncer}
    class={css((s) => {
      s.position.absolute;
      s.width.px(1);
      s.height.px(1);
      s.overflow.hidden;
      s.clipPath('inset(50%)');
    })}
  ></div>
  <div {@attach attachKeys}>
    <label>原生编辑<input aria-label="原生编辑" /></label>
    <div
      role="slider"
      aria-label="指针和键盘探针"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={value}
      tabindex="0"
      onpointerdown={pointer}
      {@attach attachPointer}
      class={css((s) => {
        s.width.px(200);
        s.height.px(40);
        s.touchAction.none;
        s.borderStyle.solid;
        s.borderWidth.px(2);
        s._focusVisible((focus) => {
          focus.outline('2px solid Highlight');
        });
        s._media('(forced-colors: active)', (forced) => {
          forced.borderColor('ButtonText');
        });
      })}
    >
      {value}
    </div>
  </div>
{/if}
<output data-testid="key-count">{keyCount}</output>
<output data-testid="drag-state">{dragState}</output>
<output data-testid="animation-count">{animated}</output>
