# ZUI

[![CI](https://github.com/kenconnet666/zui-svelte/actions/workflows/ci.yml/badge.svg)](https://github.com/kenconnet666/zui-svelte/actions/workflows/ci.yml)

由 pnpm 管理的三个工作区：框架无关的运行时 CSS 核心、Svelte 组件库、普通 Svelte 文档网站。

## 当前状态

core 提供生成式标准 CSS 类型、空基础主题与通用主题引擎、动态提升、有界分片和资源回收；内置亮暗主题、五档尺度与默认主题 css 属于 svelte。Svelte 编译、HMR、SSR/hydration/CSP 与独立安装包已有完整基线验收，新变更仍需要自己的 CI。当前合同见 [core 合同](.design/core-contracts.md)，候选和产物证据见 [验收台账](.design/core-acceptance.md)，组件 API 继续在讨论稿中确定。

## 目录

```text
core/       TypeScript 样式核心
svelte/     Svelte 组件与响应式样式适配
docs/       Svelte + Vite 文档网站
.design/     架构、依赖、开发与 core 设计
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

`pnpm dev` 自动先构建 core，再启动 Docs；网站启用工作区源码条件联调，独立消费仍使用包的 `dist/` 入口。构建产物位于各工作区的 `dist/`。

`pnpm test` 检查文档路由与最小 core 接入，使用本机 Chrome。完整类型、构建、core Node/三浏览器和 SSR 验证默认交给 CI；本地只做改动相关的关键检查。

## 文档

- [设计与工程文档索引](.design/README.md)
- [Core API 与主题](core/README.md)
- [Svelte 编译、SSR 与主题容器接入](svelte/README.md)
- [Svelte 组件 API 讨论稿](.design/svelte-components.md)
- [已验证候选与 A01–A40](.design/core-acceptance.md)

`@zui/core`、`@zui/svelte` 目前只是本地工作区名称，所有包保持 private。正式发布名称、版本策略和许可证在发布前确定。
