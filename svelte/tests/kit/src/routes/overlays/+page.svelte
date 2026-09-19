<script lang="ts">
  import { untrack } from 'svelte';
  import { Dialog, Popover, ScrollArea, css } from '@zui/svelte';
  let { data }: { data: { initial: boolean } } = $props();
  let open = $state(untrack(() => data.initial));
</script>

<h1>浮层 SSR 与 CSP</h1>
<button type="button" onclick={() => (open = true)}>Open server dialog</button>
<Dialog bind:open title="服务端弹窗" data-testid="server-dialog" animated={false}>
  <Popover aria-label="服务端子面板" animated={false} arrow>
    {#snippet trigger(props)}<button type="button" {...props}>Open server popup</button>{/snippet}
    <input aria-label="server search" />
  </Popover>
  <ScrollArea
    aria-label="server list"
    class={css((s) => {
      s.height.px(120);
    })}
  >
    <div
      class={css((s) => {
        s.height.px(500);
      })}
    >
      scrolling content
    </div>
  </ScrollArea>
</Dialog>
