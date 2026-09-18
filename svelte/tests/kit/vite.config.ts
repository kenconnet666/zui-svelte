import { defineConfig, defaultClientConditions, defaultServerConditions } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { zui } from '../../src/compiler/preprocess.js';

export default defineConfig({
  plugins: [zui(), sveltekit()],
  resolve: { conditions: ['zui-source', ...defaultClientConditions] },
  ssr: {
    noExternal: ['@zui/core', '@zui/svelte'],
    resolve: { conditions: ['zui-source', ...defaultServerConditions] },
  },
});
