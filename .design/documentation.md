# 文档站约定

## 技术

普通 Svelte 5 + Vite SPA，使用 .svelte 页面。路由由 svelte-spa-router 管理，不使用 Markdown、mdsvex、SvelteKit 或文件系统路由约定。

## 内容组织

当前页面较少，直接放在 src/pages。页面标题、路径和组件在 src/pages.ts 注册，导航与路由共用清单。

组件增多后使用 src/components/button 等目录。一个组件目录内直接放 Page.svelte、Basic.svelte、Variants.svelte 等文件，不再嵌套 demos 目录。

每层尽量 5–30 个直接子项；不为了目录数字拆分没有实际职责的模块。

## 示例唯一来源

同一 Demo 以两种方式导入：

```ts
import Basic from './Basic.svelte';
import source from './Basic.svelte?raw';
```

运行示例与展示源码始终来自同一文件。

## 代码展示

目前使用 Shiki 展示 CSS 输出示意，只导入 CSS 语言、GitHub Light 主题与 JavaScript 正则引擎。高亮器在模块级共享，异步失败时保留原始代码。增加更多语言时继续按需导入。

API 页面暂不建立单独的生成框架；组件 Props 与注释稳定后，再评估从同一类型源提取 API 信息。

## 样式与状态

站点基础布局使用自身 CSS；core 已有真实公开 API Demo。后续组件示例随已实现能力增加，不为文档展示单独复制组件实现。

设计中的能力明确标记为设计状态，不展示无法运行的组件作为已完成成果。
