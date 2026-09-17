import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [svelte()],
  resolve: {
    conditions: ['zui-source', 'module', 'browser', 'development|production'],
    dedupe: ['svelte'],
  },
});
