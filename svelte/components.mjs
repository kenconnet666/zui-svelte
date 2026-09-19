// 按实际源码登记公开组件；第二阶段新增组件时只维护字段名，类型和默认值来自组件本身。
export default [
  { file: 'overlays/Portal.svelte', name: 'Portal', defaults: [] },
  {
    file: 'overlays/Popover.svelte',
    name: 'Popover',
    defaults: ['placement', 'offset', 'arrow', 'matchAnchorWidth', 'animated'],
  },
  {
    file: 'overlays/Tooltip.svelte',
    name: 'Tooltip',
    defaults: ['placement', 'offset', 'delay', 'closeDelay', 'arrow', 'animated'],
  },
  { file: 'overlays/Dialog.svelte', name: 'Dialog', defaults: ['size', 'animated', 'closable'] },
  {
    file: 'overlays/Drawer.svelte',
    name: 'Drawer',
    defaults: ['size', 'side', 'animated', 'closable'],
  },
  {
    file: 'layout/Stack.svelte',
    name: 'Stack',
    defaults: ['direction', 'gap', 'align', 'justify', 'wrap'],
  },
  { file: 'layout/Grid.svelte', name: 'Grid', defaults: ['columns', 'gap', 'align'] },
  { file: 'layout/Container.svelte', name: 'Container', defaults: ['maxWidth', 'padding'] },
  {
    file: 'layout/ScrollArea.svelte',
    name: 'ScrollArea',
    defaults: ['axis', 'overscroll', 'scrollbar'],
  },
];
