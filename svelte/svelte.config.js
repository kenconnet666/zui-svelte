import { fileURLToPath } from 'node:url';
import { preprocess } from 'svelte/compiler';
import components from './components.mjs';

// 仅包构建注入刚 bootstrap 的编译器；IDE 仍读取普通 Svelte 作者源码。
const compiler = process.env.ZUI_COMPONENT_COMPILER
  ? await import(process.env.ZUI_COMPONENT_COMPILER)
  : undefined;
const options = {
  root: fileURLToPath(new URL('./src', import.meta.url)),
  components,
  cssModules: ['@zui/core', '@zui/svelte', '../theme.js'],
};

export default {
  preprocess: compiler && {
    name: 'zui-package',
    async markup({ content, filename }) {
      return preprocess(
        content,
        [compiler.componentPreprocess(options), compiler.classPreprocess(options)],
        { filename },
      );
    },
  },
};
