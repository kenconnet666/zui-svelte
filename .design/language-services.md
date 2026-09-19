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

前置：PowerShell 7、Node 24、pnpm 11.22.0、可用 codex CLI；Git/gh 按各自账号登录。仓库可以放在任意目录，不要求复用旧机器用户名或盘符。在仓库根目录：

```powershell
./scripts/language-services/setup.ps1 -Verify
# 只运行语言服务验收：
node scripts/language-services/verify.mjs
```

脚本顺序执行锁文件安装、build:libs、生成本机项目配置；-Verify 再读取 codex mcp get 的真实启动参数，检查两个 MCP 的初始化和工具发现，最后运行 TS/Svelte 语义探针。首次构建是必要准备：docs 消费公开 dist，缺少声明时不能判断语言服务是否正常。无需手动复制 node_modules 或旧机器工具目录。

可迁移模板为 .codex/config.example.toml，生成的 .codex/config.toml 已忽略。配置使用检测到的绝对 Node、仓库与入口路径，避免桌面宿主 PATH/工作目录差异；换目录、切换 Node 安装位置后重新运行脚本。重复运行只更新带 BEGIN/END 标记的 ZUI 配置区，保留其他设置；遇到未管理的同名服务会明确中止，不覆盖用户配置。不调用 codex mcp add，也不改写全局配置。

在 Codex 中打开并信任仓库后重新加载 MCP/重启 Codex，再检查原生工具列表：zui_lsp 应有 diagnostics、hover、definitions、references、completions；svelte 应有文档、autofixer 等工具。至少再做一次项目文件诊断。若 -Verify 提示未识别配置，先完成项目信任再重试。SDK 验证成功仍不等于已有任务热加载成功。

项目配置不含凭据，只配置本项目两个服务；其他全局 MCP 继续按用户配置加载。不要提交用户配置、备份、凭据或 .idea/workspace.xml。语言服务升级统一修改 catalog/锁文件后重验。

换机还需手动完成两件事：WebStorm 选择下表三个项目软件包；在新机启用 IDE MCP，并使用该机显示的 URL 注册 WebStorm。GitHub、Context7 等通用工具的认证属于本机账号，不随仓库复制。旧电脑最后提交并推送，新电脑 git pull 后重跑上述命令；不要拷贝包含凭据的 ~/.codex。

## WebStorm 本机连接

### 使用项目锁定的语言服务

WebStorm 的 TypeScript/Svelte 服务与 Codex 的 zui_lsp 是不同宿主。根 package.json 已将 svelte-language-server 和 typescript-svelte-plugin 声明为开发依赖，复用 languageServices catalog；不进入 core/svelte/docs 的运行时依赖或发布产物。Codex 的项目级 zui_lsp 也读取这些包；两边共用版本和文件，各自启动独立进程，不共享正在运行的 IDE 服务会话。

本次查询 npm 稳定版标签：svelte-language-server 最新为 0.18.4，typescript-svelte-plugin 最新为 0.3.52；TypeScript 最新为 7.0.2，但服务器的 peer 范围为 ^5.9.2 || ^6.0.2，因此使用最新 6.x 的 6.0.3，而不是跨大版本强行配对。实际版本以 catalog/锁文件为准，后续升级重新检查 peer 范围。

在 WebStorm 设置中选择包根目录，不选择 .pnpm 内含版本的真实路径，也不选择 bin/server.js/tsserver.js：

| 设置位置                                            | 软件包路径（相对项目根）              | 当前版本 |
| --------------------------------------------------- | ------------------------------------- | -------- |
| 语言和框架 → TypeScript → TypeScript 软件包         | node_modules/typescript               | 6.0.3    |
| 语言和框架 → TypeScript → Svelte → 语言服务器软件包 | node_modules/svelte-language-server   | 0.18.4   |
| 同页 → TypeScript 插件软件包                        | node_modules/typescript-svelte-plugin | 0.3.52   |

TypeScript 页面保持语言服务开启，Node.js runtime 使用项目 Node 24；Svelte 页面选择“已启用”，保留 a11y 警告与服务驱动的类型引擎。TypeScript 的服务驱动类型引擎也推荐启用。若希望本地仅诊断打开的文件，可关闭 TypeScript 的“显示项目错误”，全量检查交 CI。

WebStorm 直接使用 typescript 包的语言服务，不需要将 typescript-language-server 配到该下拉框；后者是通用 LSP 客户端使用的适配服务器。IDE 通过 Svelte 页面加载插件，本次不额外重复写 tsconfig.plugins。

点击应用/确定后由 IDE 重新启动相应语言服务；若仍显示旧版本，使用 IDE 的 Language Services 重启入口，或关闭再打开项目。IDE 设置只重载 IDE 的服务；修改项目 MCP/桥接脚本后，需要重载 Codex 的对应 MCP 或重启 Codex，不能据安装成功宣称旧会话已切换。

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

成功输出 VERIFIED，报告写入被 Git 忽略的 test-results/language-services/verification.json，并记录实际项目包版本/路径。脚本拒绝覆盖同名探针，并在退出时清理自己创建的文件与进程树。覆盖：

- TS/Svelte 三处预置错误，反复“错误 → 正确”清零；包含未知 Token、错误单位和普通赋值类型。
- TS 引用 Svelte ComponentProps 的真实类型。
- 类型 hover、定义、引用、补全和 500 Token 的完整诊断/补全。

500 Token 的本机暖服务诊断加补全曾约 1.64 秒，不包含冷启动，不作跨设备承诺。TS 使用项目 TypeScript 与完整语义服务；Svelte 使用 pull diagnostics，TS 使用同步语法/语义请求，超时是错误，不是空报告。

长期 TS 服务曾报 resolutionCache 内部错误，新服务验收通过；遇到时重启该语言服务/宿主或用相关模块检查，不静默忽略。包外 fixture 在仓库内缺少其独立安装条件时可产生配置扫描日志，真正消费正确性由 CI 外部安装验证。

历史自动审批曾拒绝删除部分工具排障目录和下载副本；它们未进入仓库。不要为清理旧排障数据结束全部 Node 进程或删除共享 pnpm store。

## 项目级 Codex LSP 分工

- .codex/config.example.toml：随 Git 保存的启动模板；setup.ps1 生成本机忽略的 config.toml。本项目专用 zui_lsp 与官方 svelte MCP，项目外不自动启用。
- scripts/language-services/environment.mjs：只从本项目 node_modules 解析服务器，不回退到用户目录的旧版本。TypeScript 使用项目 lib，typescript-svelte-plugin 的探测根也为本项目。
- typescript-language-server 6.0.0：Codex 的通用 LSP 协议适配器，运行在项目 Node 24 上；WebStorm 不需要把它选为 TypeScript 软件包。
- MCP SDK、vscode-jsonrpc、官方 @sveltejs/mcp 也为根开发依赖；桥使用 Zod 4 的 zod/v3 兼容入口保持既有工具 schema，不另安装全局 Zod。
- WebStorm 擅长项目上下文、编辑与重构；zui_lsp 适合作为独立语义诊断、hover/补全/定义/引用通道。优劣以同一探针比较，不以工具数量或空诊断列表推断。

项目级作用域依据：[Codex 配置](https://learn.chatgpt.com/docs/config-file/config-basic)、[项目配置路径规则](https://learn.chatgpt.com/docs/config-file/config-advanced#project-config-files-codexconfigtoml)。

本次项目化验证：新的项目桥完成 TS/Svelte 预置错误反复检出/清零、跨 Svelte 类型、hover/定义/引用/补全和 500 Token 探针，输出 VERIFIED。与 WebStorm MCP 对照时，同一份三处类型错误的临时 Svelte 文件，独立 LSP 返回 3 条（2322/2339/2339），WebStorm get_file_problems 在打开文件后多次返回空；修正后 LSP 清零。此证据只说明当前 MCP 检查接口覆盖有差异，不代表 IDE 编辑器没有红线。建议保留项目 LSP 做语义复核，WebStorm 做 IDE 操作与重构；样本文件和临时进程已清理。

旧全局 zui_lsp/svelte 条目已在核对归属并备份用户 config.toml 后迁出；其他全局 MCP 未修改。旧用户工具目录保留用于回退，不做共享目录清理。

2026-09-19 重启后桌面日志确认旧相对路径配置的两个服务在 initialize 握手时断开，当前原生列表没有它们；日志未给出更底层原因。因此改为本机生成明确路径，并增加使用 Codex 实际配置的启动探针。配置修正后的原生会话注入仍需下一次重载验证，不将独立进程 VERIFIED 写成已在原生列表生效。排障可检查本机 %LOCALAPPDATA%/Codex/Logs 下最新 MCP 启动记录，只提取相关服务错误，避免提交日志或账号配置。

本次修正验收：setup.ps1 -Verify 完整执行成功；Codex 解析的配置分别启动 zui_lsp（5 个工具）和官方 svelte（4 个工具）；语义探针输出 VERIFIED，临时源码和自建服务进程已清理。PowerShell 语法、管理区幂等更新/保留其他设置、改动 JS 的 ESLint 与 WebStorm 检查通过。上一提交 b871db9 的完整 CI 已通过；本次推送后的 CI 不同步等待。

随后重载已闭合原生会话验收：当前任务实际调用 zui_lsp 的 TS/Svelte 逐文件诊断、补全和悬停成功，官方 Svelte 文档/检查工具可用，WebStorm 能返回组件成员定义与说明。此前“等待重载”属于历史排障状态；新会话仍需轻量探针。本轮符号探针确认 `_`/`$` 在 TS/Svelte 成员、字符串候选和 Svelte 模板中均可用，源文件已清理。随后用户取消了 `$` 组件 Token 方案；符号可用不等于决定采用。最新产品范围见 .design/svelte-components.md 第 18 节，只增强系统/主题关键字，不实现组件变量层。
