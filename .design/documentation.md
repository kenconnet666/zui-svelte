# 文档站约定

## 技术

普通 Svelte 5 + Vite SPA，使用 .svelte 页面。路由由 svelte-spa-router 管理，不使用 Markdown、mdsvex、SvelteKit 或文件系统路由约定。

docs 是 @zui/core/@zui/svelte 的真实消费者：源码、Vite 插件和类型均使用公开包入口及 dist，不启用 zui-source，不相对导入库的 src。根 pnpm dev 先运行 build:libs；修改库后重新构建库即可由 docs 消费，完整源码 HMR 由独立夹具验证。生产构建检查实际模块图，并输出 consumer-boundary.json；发现库 src 模块立即失败。

docs 直接依赖实际使用的 Svelte、路由、Shiki、Lucide 与两个工作区包。Zod/Decimal/日期通过 @zui/svelte 导出，不在 docs 重复安装另一份领域实现；axe 及其 playwright-core peer 是开发依赖，版本与 Playwright 配套。

## 内容组织

当前页面较少，直接放在 src/pages。页面标题、路径和组件在 src/pages.ts 注册，导航与路由共用清单。

除首页和兜底页外按路由加载；回归探针也按测试路径加载，不让首页一次执行全部测试组件。公开主题示例由 docs/src/ui/ThemePreview.svelte 持有，页面与回归共用；部分 __ 测试路径复用仓库测试夹具，其对库的调用仍走公开入口，独立发布消费另由 tarball 任务保证。

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

领域值页面只展示已接入的 Decimal/Zod/日期类型与原生元素，不伪装成已实现的 Field/DecimalInput。CI 在三浏览器运行真实交互、消费边界与 axe 扫描，JSON 报告附在 Playwright 结果中；键盘、读屏和移动软键盘仍有独立人工/设备验收责任。
