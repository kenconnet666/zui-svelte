import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { zui } from '@zui/svelte/compiler';

const sourceRoots = ['../core/src/', '../svelte/src/'].map((path) =>
  fileURLToPath(new URL(path, import.meta.url))
    .replaceAll('\\', '/')
    .toLowerCase(),
);

export default defineConfig({
  base: './',
  plugins: [
    zui(),
    svelte(),
    {
      name: 'zui-docs-consumer-boundary',
      generateBundle() {
        // Docs 必须消费公开构建产物，不能因 workspace 联调条件绕过分发问题。
        const modules = [...this.getModuleIds()];
        const leaked = modules.filter((id) => {
          const path = id.replaceAll('\\', '/').toLowerCase();
          return sourceRoots.some((root) => path.startsWith(root));
        });
        if (leaked.length) this.error('Docs imported library source: ' + leaked.join(', '));
        this.emitFile({
          type: 'asset',
          fileName: 'consumer-boundary.json',
          source: JSON.stringify({ libraries: ['@zui/core', '@zui/svelte'], sourceLeaks: leaked }),
        });
      },
    },
  ],
  resolve: {
    dedupe: ['svelte'],
  },
});
