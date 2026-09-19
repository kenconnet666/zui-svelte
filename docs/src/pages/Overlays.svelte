<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ThemeScope } from '@zui/core';
  import {
    Dialog,
    Drawer,
    Popover,
    Tooltip,
    Portal,
    Stack,
    StyleProvider,
    lightTheme,
    css,
  } from '@zui/svelte';
  let editing = $state(false),
    confirming = $state(false),
    details = $state(false),
    filters = $state(false);
  let blockClosing = $state(false),
    rtl = $state(false);
  let saved = $state('');
  let lastClose = $state('');
  let host = $state<HTMLDivElement>();
  let portalled = $state(false);
  const scope = new ThemeScope(lightTheme);
  onDestroy(() => scope.dispose());
</script>

<h1>定位与浮层</h1>
<p>浮层保留所属页面的主题，多个浮层共用关闭顺序与焦点管理。</p>
<StyleProvider {scope} dir={rtl ? 'rtl' : 'ltr'}>
  <Stack direction="row" wrap gap="sm">
    <button type="button" onclick={() => (editing = true)}>打开设置弹窗</button>
    <button type="button" onclick={() => (details = true)}>打开详情抽屉</button>
    <button type="button" onclick={() => (rtl = !rtl)}>切换方向</button>
    <button type="button" onclick={() => scope.setOverrides({ color: { text: 'rgb(0 100 80)' } })}
      >切换局部主题</button
    >
    <Tooltip content="这是一段说明" delay={50}>
      {#snippet trigger(props)}<button
          type="button"
          {...props}
          aria-describedby="existing-description">查看提示</button
        >{/snippet}
    </Tooltip>
  </Stack>
  <p id="existing-description">已有说明应继续保留。</p>
  <label><input type="checkbox" bind:checked={blockClosing} />阻止弹窗关闭</label>
  <output data-testid="overlay-saved">{saved}</output>
  <output data-testid="overlay-close">{lastClose}</output>
  <output data-testid="overlay-open">{String(editing)}</output>

  <Dialog
    bind:open={editing}
    title="布局设置"
    description="测试嵌套面板与滚动内容"
    keepMounted
    onclose={(event) => {
      lastClose = `${event.reason}:${blockClosing}`;
      if (blockClosing) event.preventDefault();
    }}
    slotProps={{
      body: {
        class: 'custom-dialog-body',
        slotProps: { viewport: { 'data-testid': 'dialog-viewport' } },
      },
      closeButton: { title: '关闭设置' },
    }}
  >
    <label>名称<input aria-label="设置名称" bind:value={saved} /></label>
    <Popover bind:open={filters} aria-label="筛选面板" arrow matchAnchorWidth>
      {#snippet trigger(props)}<button type="button" {...props}>打开筛选面板</button>{/snippet}
      <label>查询<input aria-label="筛选查询" /></label>
      <button type="button" onclick={() => (filters = false)}>完成筛选</button>
    </Popover>
    <button type="button" onclick={() => (confirming = true)}>打开确认弹窗</button>
    <Dialog bind:open={confirming} title="第二层确认" size="xs">
      <p>关闭这里只回到设置弹窗。</p>
    </Dialog>
    {#snippet footer()}
      <button type="button" onclick={() => (blockClosing = false)}>允许关闭</button>
      <button type="button" onclick={() => (editing = false)}>完成设置</button>
    {/snippet}
  </Dialog>
  <Drawer bind:open={details} title="详情" side="end" size="xs">
    {#each Array(40).keys() as index (index)}<p>详情内容 {index + 1}</p>{/each}
  </Drawer>

  <h2>独立 Portal</h2>
  <button type="button" onclick={() => (portalled = !portalled)}>切换挂载位置</button>
  <div
    bind:this={host}
    data-testid="portal-destination"
    class={css((s) => {
      s.borderWidth._thin;
      s.borderStyle.dashed;
      s.padding._sm;
    })}
  >
    目标区域
  </div>
  <Portal disabled={!portalled} target={host ?? null}>
    <label data-testid="portal-label">可移动输入<input aria-label="Portal 输入" /></label>
  </Portal>
</StyleProvider>
