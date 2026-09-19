# 开发与构建

使用 Node.js 24、packageManager 指定的 pnpm 11.22.0。命令从项目根目录执行。

## 常用命令

| 命令                           | 作用                                                   |
| ------------------------------ | ------------------------------------------------------ |
| pnpm install --frozen-lockfile | 按锁文件安装依赖                                       |
| pnpm dev                       | 构建 core/svelte 的公开产物后启动 Docs                 |
| pnpm build:libs                | 只构建两个库，供 docs/工具链按消费者方式解析           |
| pnpm build                     | 按依赖顺序构建三个工作区                               |
| pnpm preview                   | 预览 Docs 构建产物                                     |
| pnpm check                     | 工作区类型、Svelte 与 core 类型规模预算                |
| pnpm lint                      | ESLint 与格式检查                                      |
| pnpm generate:check            | 核对 CSS 类型和运行时表的可重复生成                    |
| pnpm contracts:check           | 核对公开声明快照和浏览器产物预算，须先构建             |
| pnpm test                      | Docs 浏览器集成测试                                    |
| pnpm test:packages             | 临时目录独立安装 tarball、类型、构建、SSR 与浏览器验收 |

## 构建与入口

core 使用 tsc 输出 ESM、声明及 source map；svelte 使用 svelte-package 保留供消费者编译的 Svelte 源组件；docs 使用 Vite 输出普通客户端网站。dist 和测试报告不进入 Git。

Docs 的运行、编译插件和类型均消费 dist，不再启用 zui-source。首次 dev/check 前运行 build:libs，根 dev 已自动执行；库改动后重新构建库，源码 HMR 继续由专门测试夹具负责。core 可直接由 Node 导入；Svelte 根入口含 .svelte 组件，由 Vite/Kit 消费，不能用无 Svelte loader 的普通 Node 导入代替验证。

## 验证分工

本地只做变更相关的关键测试和 WebStorm/LSP 逐文件诊断，不运行完整仓库验收。IDE 空列表不能单独证明 TS 语义通过，必要时补模块类型检查。具体能力发现与配置见 [语言服务](language-services.md)。

完整检查、三浏览器、真实开发态 HMR、生产 Kit、严格 CSP 和独立包消费由 [CI](ci.md) 执行。每批中文提交并推送；推送后不等待、不轮询，下次推送前检查上一批并修复具体失败。报告未执行、跳过或失败的边界，不将旧 SHA 的结果套给新实现。

修改 CSP 接入时，可只构建 Docs 并设置 ZUI_DOCS_PREVIEW=1，使用本机 Chrome 聚焦运行对应 Playwright 用例。该入口使用生产 preview 与真实策略，不能用开发服务器的通过代替严格 CSP 验收；完整三浏览器仍交 CI。

本地 Playwright 使用已安装 Chrome；CI 使用当前 Playwright 配套的 Chromium、Firefox、WebKit。core 的聚焦浏览器测试可设置 ZUI_BROWSER_CHANNEL=chrome。完整矩阵入口与证据见 [验收台账](core-acceptance.md)。

## 交付和清理

包保持 private；当前交付为可下载构建产物和实际验证过的 tarball，未发布 npm、未部署公网。发布前另行确定 scope、版本和许可证。

开发态测试仅清理自己创建的 .zui-hmr-* 目录；包外消费成功后只清理已校验路径的临时项目，并保留被测试的归档和报告。失败现场保留用于诊断。不清理共享缓存、已有依赖或用户数据。

局部排查 Kit fixture 时可先执行 pnpm --filter @zui/svelte run test:kit:prepare，再在 PowerShell 中设置 $env:ZUI_KIT_DEV='1'，运行 pnpm --filter @zui/svelte exec playwright test --project chromium --grep '相关用例名称'。该模式仅使用本机 Chrome 与开发服务器；CI 禁止启用，仍验证生产构建。命令结束后删除当前 shell 的该环境变量再运行生产测试，避免混淆两种证据。

浏览器局部迭代可用 pnpm --filter @zui/svelte build:code 更新代码并保留上次声明，随后构建 Docs；它不证明新声明有效，API 改动仍须完整 build 与逐文件/聚焦声明检查。CI 始终调用完整 build，不使用此快捷入口。pnpm contracts:ui 检查布局/浮层两组实际分发及依赖裁剪，初始预算只在人工复核后用 node scripts/verify-ui.mjs --update 更新。
