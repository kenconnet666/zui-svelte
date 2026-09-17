# @zui/docs

普通 Svelte 5 + Vite 网站，使用 hash 路由与 .svelte 页面，不包含 Markdown 渲染或 SvelteKit。

- 开发：在根目录运行 `pnpm dev`。
- 构建：`pnpm --filter @zui/docs build`。
- 预览：`pnpm preview`。
- 浏览器检查：`pnpm test`，默认使用本机 Chrome，不自动下载浏览器。
- CI：使用 Playwright 管理的 Chromium、Firefox、WebKit，运行构建产物并上传报告。
- 页面清单位于 `src/pages.ts`，导航与路由共用。
- 当前页面说明工程状态；core 和组件包尚未实现公开 API。
