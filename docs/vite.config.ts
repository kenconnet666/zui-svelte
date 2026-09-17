import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { zui } from '../svelte/src/compiler/preprocess.ts';

export default defineConfig({
  base: './',
  plugins: [zui(), svelte()],
  resolve: {
    conditions: ['zui-source', 'module', 'browser', 'development|production'],
    dedupe: ['svelte'],
  },
});
