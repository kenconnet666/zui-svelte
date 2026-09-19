<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ThemeScope } from '@zui/core';
  import {
    css,
    createStyleRuntime,
    lightTheme,
    provideStyleRuntime,
    StyleProvider,
  } from '@zui/svelte';
  import { VirtualCollection } from '@zui/svelte/internal';
  import FloatingProbe from './FloatingProbe.svelte';

  const runtime = createStyleRuntime({
    target: document,
    namespace: 'infra-probe',
    nonce: 'infra-probe',
    variables: 'stylesheet',
  });
  provideStyleRuntime(runtime);
  const theme = new ThemeScope(lightTheme, { color: { text: 'rgb(200 0 0)' } });
  let dir = $state<'ltr' | 'rtl'>('ltr');
  let active = $state(0);
  let large = $state(false);
  let mounted = $state(true);
  const list = new VirtualCollection({
    count: 10000,
    getKey: (index) => index,
    estimateSize: () => 36,
    activeIndex: 0,
  });
  $effect(() =>
    list.configure({
      count: 10000,
      getKey: (index) => index,
      estimateSize: () => 36,
      activeIndex: active,
    }),
  );
  onDestroy(() => {
    list.dispose();
    theme.dispose();
    runtime.dispose();
  });
</script>

<button
  type="button"
  onclick={() => {
    theme.setOverrides({ color: { text: 'rgb(0 0 200)' } });
    dir = 'rtl';
  }}>更新 Portal 主题</button
>
<button
  type="button"
  onclick={() => {
    active = 9999;
    list.scrollTo(active);
  }}>最后一项</button
>
<button type="button" onclick={() => (large = !large)}>改变行高</button>
<button type="button" onclick={() => (mounted = !mounted)}>切换集合</button>
<StyleProvider scope={theme} {dir}><FloatingProbe /></StyleProvider>
{#if mounted}
  <div
    data-testid="virtual-list"
    role="listbox"
    aria-label="一万条数据"
    tabindex="0"
    aria-activedescendant={'virtual-option-' + active}
    {@attach (node) => list.connect(node)}
    class={css((s) => {
      s.height.px(180);
      s.width.px(300);
      s.overflow.auto;
      s.position.relative;
    })}
  >
    <div
      role="presentation"
      class={css((s) => {
        s.height.px(list.totalSize);
        s.position.relative;
      })}
    >
      {#each list.items as item (item.key)}
        <div
          id={'virtual-option-' + item.index}
          role="option"
          aria-selected={item.index === active}
          data-testid="virtual-row"
          {@attach (node) => list.measure(node, item.index)}
          class={css((s) => {
            s.position.absolute;
            s.top.px(item.start);
            s.left.px(0);
            s.width.raw('100%');
            s.height.px(large ? 54 : 36);
          })}
        >
          数据 {item.index}
        </div>
      {/each}
    </div>
  </div>
{/if}
<output data-testid="virtual-count">{list.items.length}</output>
