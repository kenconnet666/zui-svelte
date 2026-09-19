import type { ComponentProps, Snippet } from 'svelte';
import { Dialog, Drawer, Popover, Tooltip, ScrollArea, Grid, Stack } from '../src/index.js';

function checkComponentTypes(
  trigger: NonNullable<ComponentProps<typeof Popover>['trigger']>,
  children: Snippet,
) {
  Dialog(null as never, {
    title: 'Settings',
    open: true,
    onclose: (event) => {
      if (event.reason === 'escape') event.preventDefault();
    },
    slotProps: {
      body: { scrollbar: 'always', slotProps: { viewport: { 'aria-label': 'body' } } },
      closeButton: { disabled: false },
    },
    children,
  });
  Drawer(null as never, { side: 'start', size: 'xs', title: 'Details' });
  Popover(null as never, { trigger, placement: 'bottom-end', offset: 6 });
  Tooltip(null as never, { trigger, content: 'Help' });
  ScrollArea(null as never, {
    axis: 'both',
    scrollbar: 'auto',
    onscroll: (event) => void event.currentTarget.scrollTop,
  });
  Grid(null as never, { columns: 'minmax(0, 1fr) 12rem' });
  Stack(null as never, { direction: 'row', gap: 'none', as: 'nav' });
  // @ts-expect-error Dialog 没有 Drawer 的方向属性。
  Dialog(null as never, { side: 'end' });
  // @ts-expect-error 打开状态只能是布尔值。
  Drawer(null as never, { open: 'yes' });
  // @ts-expect-error 定位方位使用专项库的有限联合。
  Popover(null as never, { placement: 'around' });
  // @ts-expect-error Tooltip 必须有描述内容。
  Tooltip(null as never, { trigger });
  // @ts-expect-error 嵌套 slotProps 保留 ScrollArea Props 类型。
  Dialog(null as never, { slotProps: { body: { axis: 'diagonal' } } });
  // @ts-expect-error 间距无 full 档。
  Stack(null as never, { gap: 'full' });
}
void checkComponentTypes;
