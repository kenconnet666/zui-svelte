import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import icss from './scripts/eslint-icss.mjs';

export default defineConfig(
  globalIgnores([
    '**/dist/**',
    '**/.svelte-kit/**',
    '**/node_modules/**',
    '**/test-results/**',
    '**/playwright-report/**',
    '.idea/**',
  ]),
  js.configs.recommended,
  ts.configs.recommended,
  svelte.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.svelte'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { zui: icss },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'zui/no-unused-expressions': 'error',
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: { parserOptions: { parser: ts.parser } },
    // Svelte/TypeScript 语言服务检查未声明标识符；核心规则不认识 ScrollToOptions 等纯 DOM 类型。
    rules: { 'no-undef': 'off' },
  },
  prettier,
  svelte.configs.prettier,
);
