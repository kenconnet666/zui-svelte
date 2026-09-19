<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Attachment } from 'svelte/attachments';
  import { provideOverlay, type OverlayContext } from './context.js';
  import { untrack } from 'svelte';
  let {
    context,
    attach,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & {
    context: OverlayContext;
    attach: Attachment<HTMLDivElement>;
  } = $props();
  // 只发布给面板的后代，外层 Portal 必须读取父层而不是把自己搬进自己的宿主。
  untrack(() => provideOverlay(context));
</script>

<div {...rest} {@attach attach}>{@render children?.()}</div>
