# 开发与构建

## 环境

使用 Node.js 24 和 packageManager 指定的 pnpm 11.22.0。命令均从项目根目录执行。

## 命令

| 命令                           | 作用                               |
| ------------------------------ | ---------------------------------- |
| pnpm install                   | 安装工作区依赖                     |
| pnpm install --frozen-lockfile | 按已保存的锁文件重装               |
| pnpm dev                       | 启动 Docs 开发服务器               |
| pnpm build                     | 按依赖顺序构建 core、svelte、docs  |
| pnpm preview                   | 预览 Docs 构建产物                 |
| pnpm check                     | 检查三个工作区的类型与 Svelte 模板 |
| pnpm lint                      | ESLint 与格式检查                  |
| pnpm format                    | 格式化源码和设计文档               |
| pnpm test                      | Docs 浏览器集成测试                |
| pnpm changeset                 | 编写版本变更记录                   |

## 构建方式

- core：tsc 输出 ESM、声明文件和 source map。
- svelte：svelte-package --input src，保留供使用者编译的 Svelte 源文件。
- docs：Vite 构建客户端网站，使用相对资源路径及 hash 路由。
- 各包 dist 是正常构建产物，已被 Git 忽略。

文档站显式启用 zui-source 条件，开发时直接解析工作区源码；默认包入口仍是 dist。首次启动 Docs 不依赖预构建。

## 验证边界

目前 core 和 svelte 为空入口，构建通过只代表包配置可用，不代表样式运行时或组件已实现。

Docs 测试覆盖导航、刷新、未知页面、代码高亮、浏览器异常和窄屏溢出。默认使用已安装的 Chrome；其他机器缺少浏览器时，可先安装 Chrome 或按需修改 Playwright 配置。

GitHub CI 使用 Playwright 管理的 Chromium、Firefox、WebKit，测试构建后的 Docs，并上传测试报告与验证通过的构建产物。配置见 [CI 与产物交付](ci.md)。

core 第一批实现后加入算法测试，首个组件实现后加入组件浏览器测试。不要把无测试执行报告为功能验证。

## 发布准备

所有包保持 private。正式发布前需要确定 npm scope、许可证、Git 主分支和版本策略，并验证实际 tarball 的外部消费。

仓库已连接 kenconnet666/zui-svelte，主分支为 master，Changesets 已使用相同基线。已配置 CI 和构建产物上传，未配置 npm 自动发布或文档站部署。

## 清理规则

旧模板 src、public 与根目录 Vite/Svelte 应用配置已迁移或清理。IDE 配置保留。浏览器测试产生的临时报告在成功验证后清理，失败证据保留到问题解决。

## 本轮验证记录（2026-09-17）

- pnpm install：四个 workspace 项目安装成功，严格 peer 检查通过。
- pnpm run check：core 检查通过；svelte 与 docs 均为 0 errors / 0 warnings。
- pnpm run lint：ESLint 与 Prettier 检查通过。
- pnpm run build：三个工作区构建通过。
- pnpm run test：Chrome 中两项浏览器集成测试通过。
- Node 默认导入：两个库包均解析到各自 dist/index.js，导入成功。

上述记录仅验证基础工程，未验证尚未实现的 core 自动提升或组件行为。
