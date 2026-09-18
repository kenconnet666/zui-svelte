import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { zui } from '@zui/svelte/compiler';

export default defineConfig({ plugins: [zui(), sveltekit()] });
