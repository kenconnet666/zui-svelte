// 按实际源码登记公开组件；第二阶段新增组件时只维护字段名，类型和默认值来自组件本身。
export default [
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
