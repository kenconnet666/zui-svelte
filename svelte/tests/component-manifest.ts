import { fileURLToPath } from 'node:url';
import components from '../components.mjs';

// 源码消费夹具和包构建使用同一登记清单，发布产物则已完成作者转换。
export const libraryManifest = components.map((component) => ({
  ...component,
  file: fileURLToPath(new URL('../src/' + component.file, import.meta.url)),
}));

// 只登记这个原型，不会因为业务组件也叫 Control 就改写它。
export const componentManifest = [
  {
    file: fileURLToPath(new URL('./fixtures/ConfigControl.svelte', import.meta.url)),
    name: 'Control',
    defaults: ['size', 'block'],
  },
] as const;
