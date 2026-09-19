import { fileURLToPath } from 'node:url';

// 只登记这个原型，不会因为业务组件也叫 Control 就改写它。
export const componentManifest = [
  {
    file: fileURLToPath(new URL('./fixtures/ConfigControl.svelte', import.meta.url)),
    name: 'Control',
    defaults: ['size', 'block'],
  },
] as const;
