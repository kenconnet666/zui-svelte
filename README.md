# ZUI

[![CI](https://github.com/kenconnet666/zui-svelte/actions/workflows/ci.yml/badge.svg)](https://github.com/kenconnet666/zui-svelte/actions/workflows/ci.yml)

由 pnpm 管理的三个工作区：框架无关的运行时 CSS 核心、Svelte 组件库、普通 Svelte 文档网站。

## 当前状态

core 已实现生成式 CSS 类型、主题、样式 runtime、自动提升与资源回收；Svelte class 编译与 SSR 接入处于验证阶段，尚未宣称生产完成。换机继续请先读 [交接文档](design/handoff.md) 和 [实施进度](design/implementation.md)。

## 目录

```text
core/       TypeScript 样式核心
svelte/     Svelte 组件与响应式样式适配
docs/       Svelte + Vite 文档网站
design/     架构、依赖、开发与 core 设计
```

三个工作区直接位于根目录。源码内按职责组织，每层尽量有 5–30 个直接子项；不创建空模块或一文件目录来凑数量。

## 开发

环境：Node.js 24、pnpm 11.22.0。

```powershell
pnpm install
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm test
```

`pnpm dev` 启动 Docs；库包使用本地源码联调，不需要先构建。构建产物位于各工作区的 `dist/`。

`pnpm test` 检查文档路由与最小 core 接入，使用本机 Chrome。完整类型、构建、core Node/三浏览器和 SSR 验证默认交给 CI；本地只做改动相关的关键检查。

## 设计

- [架构与边界](design/architecture.md)
- [core 设计草案](design/core.md)
- [选择器、组合与生产级组件](design/core-composition.md)
- [类型生成与主题](design/core-types-theme.md)
- [依赖说明](design/dependencies.md)
- [开发与构建](design/development.md)
- [GitHub CI 与产物交付](design/ci.md)
- [文档站约定](design/documentation.md)

`@zui/core`、`@zui/svelte` 目前只是本地工作区名称，所有包保持 private。正式发布名称、版本策略和许可证在发布前确定。
