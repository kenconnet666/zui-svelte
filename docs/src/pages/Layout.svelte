<script lang="ts">
  import {
    ConfigProvider,
    Container,
    Grid,
    Stack,
    ScrollArea,
    css,
    type Spacing,
  } from '@zui/svelte';
  let gap = $state<Spacing>('md');
  let columns = $state(3);
  let long = $state(false);
  let wide = $state(false);
</script>

<h1>布局与滚动</h1>
<p>布局使用原生 CSS，间距使用主题尺度；实例 class 可以继续覆盖布局。</p>
<button type="button" onclick={() => (gap = gap === 'md' ? 'xl' : 'md')}>切换布局间距</button>
<button type="button" onclick={() => (columns = columns === 3 ? 2 : 3)}>切换列数</button>
<ConfigProvider components={{ Stack: { gap }, Grid: { gap } }}>
  <Container as="section" maxWidth="md" padding="lg" data-testid="layout-container">
    <Stack data-testid="layout-stack">
      <h2>原生网格</h2>
      <Grid {columns} data-testid="layout-grid">
        {#each ['内容一', '内容二', '内容三'] as text (text)}
          <article
            class={css((s) => {
              s.padding._md;
              s.backgroundColor._surfaceSunken;
              s.borderRadius._md;
            })}
          >
            {text}
          </article>
        {/each}
      </Grid>
      <Stack direction="row" wrap gap="sm" data-testid="layout-explicit">
        <span>实例间距不受默认值切换影响</span><a href="#/components">组件</a>
      </Stack>
      <Grid
        columns={3}
        data-testid="layout-override"
        class={css((s) => {
          s.gridTemplateColumns.raw('minmax(0, 1fr)');
        })}
      >
        <span>实例 CSS 覆盖组件的列数</span>
      </Grid>
    </Stack>
  </Container>
</ConfigProvider>

<h2>不占位的覆盖式滚动条</h2>
<p>鼠标进入、键盘聚焦或滚动时显示；原生滚动机制与内容视口尺寸保持不变。</p>
<button type="button" onclick={() => (long = !long)}>切换长内容</button>
<button type="button" onclick={() => (wide = !wide)}>切换横向溢出</button>
<ScrollArea
  axis="both"
  data-testid="scroll-root"
  aria-label="滚动示例"
  slotProps={{ viewport: { 'data-testid': 'scroll-viewport' } }}
  class={css((s) => {
    s.height.px(160);
    s.width.px(320);
    s.maxWidth.raw('100%');
    s.borderStyle.solid;
    s.borderWidth.px(1);
  })}
>
  <div
    class={css((s) => {
      s.width.raw(wide ? '640px' : '100%');
    })}
  >
    {#each Array(long ? 25 : 1).keys() as index (index)}
      <p>滚动内容 {index + 1}</p>
    {/each}
  </div>
</ScrollArea>
