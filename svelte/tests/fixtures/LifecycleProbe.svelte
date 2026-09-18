<script lang="ts">
  import { tick } from 'svelte';
  import { css } from '@zui/core';

  let width = $state(100);
  let visible = $state(true);
  let completed = $state(0);
  const fixed = css((s) => {
    s.width.px(100);
  });
  const changing = $derived(
    css((s) => {
      s.width.px(width);
    }),
  );

  async function updateMany() {
    for (let index = 0; index < 100; index++) {
      width++;
      // 每一轮实际渲染，避免把批处理合并后的单次更新误算为压力回归。
      await tick();
    }
    completed++;
  }
</script>

<button onclick={updateMany}>Update 100 times</button>
<button onclick={() => (visible = !visible)}>Toggle derived</button>
<output data-testid="completed">{completed}</output>
<div data-testid="fixed" class={fixed}>setup constant</div>
{#if visible}
  <!-- 先在普通文本求值，确保不借用 class 消费端的求值上下文。 -->
  <output data-testid="derived-class">{changing}</output>
  <div data-testid="changing" class={changing}>derived snapshot</div>
{/if}
