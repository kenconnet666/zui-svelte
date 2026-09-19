# 语言服务与工具

保留可迁移的配置和有效排障结论。以下实测来自 2026-09-18/19，不表示未来会话自动可用；配置存在、连接成功、项目识别、语义诊断和完整 CI 是不同证据。

## 能力与边界

| 能力            | 已有证据 / 使用方式                                                                         |
| --------------- | ------------------------------------------------------------------------------------------- |
| WebStorm MCP    | 原生 43 个工具曾验证项目、文件问题和类型查询；每次新会话先轻量调用                          |
| zui_lsp         | TS/Svelte 的 diagnostics、hover、definitions、references、completions 五项已验收            |
| 官方 Svelte MCP | 文档与 autofixer；不替代项目类型检查                                                        |
| GitHub / gh     | MCP 读取仓库，gh 读取 Actions 与失败日志；不以认证成功证明 CI 通过                          |
| Context7        | 第三方文档先 resolve 再 query，按需使用                                                     |
| 浏览器工具      | DOM/CSS/网络优先用浏览器语义工具；局部 Playwright 复用本机 Chrome                           |
| Computer Use    | 已做窗口/截图探针；只在原生交互需要时使用，先读当前可用 skill，不据此宣称所有键鼠能力已验证 |

WebStorm 返回 timedOut=true 时，空问题列表不算完成。空列表也不能独立证明 TS 语义无误：必要时补已验证的 LSP 或相关文件/模块类型检查。完整仓库检查交 CI。

测试夹具由 `svelte/tests/tsconfig.json` 显式纳入语言服务，继承包的 Bundler 模块解析与 `zui-source` 条件。只有 `tsconfig.check.json` 收录测试不足以让 IDE 自动选择它；文件不属于常规 tsconfig 时会出现 `Cannot find module '@zui/core'/'@zui/svelte'` 及连带的隐式 any。Kit 夹具保留自己的生成配置，包外消费夹具仍在独立安装中验收。不要用 `declare module` 或关闭类型检查掩盖问题，也不要给 docs 添加源码别名；docs 首次打开前需执行 `pnpm run build:libs` 生成真实声明。

## 安装和换机

前置：PowerShell 7、Node 24、项目指定 pnpm、可用 codex CLI。在仓库根目录：

```powershell
pnpm install --frozen-lockfile
./scripts/language-services/setup.ps1 -Verify
# 只安装与验收，不注册 Codex：
./scripts/language-services/setup.ps1 -Verify -SkipRegistration
```

脚本读取 languageServices catalog，把工具装入 CODEX_HOME/tools/zui-language-services，先验收，再备份并更新 config.toml 中 zui_lsp/svelte 条目；不覆盖其他服务/模型配置。移动 checkout 后重跑。一个同名 zui_lsp 配置对应一个 checkout，不要由多个 checkout 并发覆盖。

不要提交用户配置、备份、凭据或 .idea/workspace.xml。初次传递依赖由当时包仓库解析，用户工具目录保留自己的锁文件；升级后重验。

## WebStorm 本机连接

### 使用项目锁定的语言服务

WebStorm 的 TypeScript/Svelte 服务与 Codex 的 zui_lsp 是不同宿主。根 package.json 已将 svelte-language-server 和 typescript-svelte-plugin 声明为开发依赖，复用 languageServices catalog；不进入 core/svelte/docs 的运行时依赖或发布产物。Codex 工具仍由既有用户工具目录管理，选择 IDE 软件包不需要改 MCP 配置。

本次查询 npm 稳定版标签：svelte-language-server 最新为 0.18.4，typescript-svelte-plugin 最新为 0.3.52；TypeScript 最新为 7.0.2，但服务器的 peer 范围为 ^5.9.2 || ^6.0.2，因此使用最新 6.x 的 6.0.3，而不是跨大版本强行配对。实际版本以 catalog/锁文件为准，后续升级重新检查 peer 范围。

在 WebStorm 设置中选择包根目录，不选择 .pnpm 内含版本的真实路径，也不选择 bin/server.js/tsserver.js：

| 设置位置                                            | 软件包路径（相对项目根）              | 当前版本 |
| --------------------------------------------------- | ------------------------------------- | -------- |
| 语言和框架 → TypeScript → TypeScript 软件包         | node_modules/typescript               | 6.0.3    |
| 语言和框架 → TypeScript → Svelte → 语言服务器软件包 | node_modules/svelte-language-server   | 0.18.4   |
| 同页 → TypeScript 插件软件包                        | node_modules/typescript-svelte-plugin | 0.3.52   |

TypeScript 页面保持语言服务开启，Node.js runtime 使用项目 Node 24；Svelte 页面选择“已启用”，保留 a11y 警告与服务驱动的类型引擎。TypeScript 的服务驱动类型引擎也推荐启用。若希望本地仅诊断打开的文件，可关闭 TypeScript 的“显示项目错误”，全量检查交 CI。

WebStorm 直接使用 typescript 包的语言服务，不需要将 typescript-language-server 配到该下拉框；后者是通用 LSP 客户端使用的适配服务器。IDE 通过 Svelte 页面加载插件，本次不额外重复写 tsconfig.plugins。

点击应用/确定后由 IDE 重新启动相应语言服务；若仍显示旧版本，使用 IDE 的 Language Services 重启入口，或关闭再打开项目。只有 Codex MCP 连接本身失效时才排查 Codex 重启，不能把 IDE 软件包选择当成已经修改了 Codex 的 LSP。

换机只需先 pnpm install --frozen-lockfile，再选择上述稳定路径。依据：[JetBrains TypeScript 设置](https://www.jetbrains.com/help/webstorm/settings-languages-typescript.html)、[语言服务](https://www.jetbrains.com/help/webstorm/language-services.html)、[Svelte 支持](https://www.jetbrains.com/help/webstorm/svelte.html)。

### IDE MCP 连接

本机验证过的 HTTP 配置如下，其他机器从 IDE 设置读取自己的地址：

```toml
[mcp_servers.webstorm]
url = "http://127.0.0.1:64542/stream"
enabled = true
startup_timeout_sec = 30
tool_timeout_sec = 90
```

URL 不带 Markdown 包装，不固定 IJ_MCP_SERVER_PROJECT_PATH header；每次项目工具调用显式传 projectPath。

本机代理曾让 loopback initialize 返回 503，最终用 NO_PROXY=localhost,127.0.0.1,::1 解决。合并已有 NO_PROXY 项，不关闭外网代理。更新用户环境后，旧桌面/终端进程未必继承新值；需要时完整重开宿主，再验证原生工具。注册列表和独立 SDK 客户端成功都不能证明当前任务已经热加载。无须恢复旧的 stdio/转接工具试验。

## 诊断验收

```powershell
node scripts/language-services/verify.mjs
```

成功输出 VERIFIED，报告写入用户工具目录 verification.json。脚本拒绝覆盖同名探针，并在退出时清理自己创建的文件与进程树。覆盖：

- TS/Svelte 三处预置错误，反复“错误 → 正确”清零；包含未知 Token、错误单位和普通赋值类型。
- TS 引用 Svelte ComponentProps 的真实类型。
- 类型 hover、定义、引用、补全和 500 Token 的完整诊断/补全。

500 Token 的本机暖服务诊断加补全曾约 1.64 秒，不包含冷启动，不作跨设备承诺。TS 使用项目 TypeScript 与完整语义服务；Svelte 使用 pull diagnostics，TS 使用同步语法/语义请求，超时是错误，不是空报告。

长期 TS 服务曾报 resolutionCache 内部错误，新服务验收通过；遇到时重启该语言服务/宿主或用相关模块检查，不静默忽略。包外 fixture 在仓库内缺少其独立安装条件时可产生配置扫描日志，真正消费正确性由 CI 外部安装验证。

历史自动审批曾拒绝删除部分工具排障目录和下载副本；它们未进入仓库。不要为清理旧排障数据结束全部 Node 进程或删除共享 pnpm store。
