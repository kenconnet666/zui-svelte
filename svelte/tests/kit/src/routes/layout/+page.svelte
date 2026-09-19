<script lang="ts">
  import {
    ConfigProvider,
    Stack,
    Grid,
    Container,
    ScrollArea,
    css,
    type Spacing,
  } from '@zui/svelte';
  let gap = $state<Spacing>('sm');
</script>

<h1>布局 SSR</h1>
<button type="button" onclick={() => (gap = 'xl')}>Change layout spacing</button>
<ConfigProvider components={{ Stack: { gap } }}>
  <Container maxWidth="md" padding="none">
    <Stack data-testid="ssr-stack">
      <Grid columns={2}><span>left</span><span>right</span></Grid>
      <ScrollArea
        aria-label="server scrolling"
        class={css((s) => {
          s.height.px(100);
        })}
      >
        <div
          class={css((s) => {
            s.height.px(400);
          })}
        >
          server content
        </div>
      </ScrollArea>
    </Stack>
  </Container>
</ConfigProvider>
