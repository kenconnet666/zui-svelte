# Codex、WebStorm 与语言服务

本文记录 2026-09-18 的实际验证和跨电脑配置方式。语言工具辅助日常开发；core 首版是否可交付，仍按生产规划和 GitHub CI 验收。

## 当前任务工具实测与使用分工

2026-09-18 新电脑当前任务复验。以下只说明实际测到的范围，不保证另一会话自动可用。

| 能力                                | 实测结果                                                                       | 使用边界                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| GitHub MCP                          | 原生读取本仓库 master 提交成功                                                 | 仓库/PR/源码读取优先；Actions 具体日志使用 gh                                                         |
| Context7                            | 原生 resolve Svelte、query 文档成功                                            | 查第三方当前 API，先 resolve 再 query                                                                 |
| 官方 Svelte MCP                     | 原生 autofixer 调用成功，简单 Svelte 5 探针无 issues                           | 文档/代码建议，不代替项目 TS 语义                                                                     |
| zui_lsp                             | 五个工具原生调用成功：hover、completions、definitions、references、diagnostics | TS 与 Svelte 临时文件各检出一处 2322 错误，修正后 complete=true/errors=0；跨文件定义和 Token 补全有效 |
| WebStorm MCP                        | HTTP 独立客户端连接成功，列出 43 个工具，项目定位和文件检查成功                | 当前任务原生工具列表缺席；重启后仍须验收，不能把独立客户端成功当作宿主已加载                          |
| Chrome DevTools                     | 原生列页、新建隔离 data 页面、按钮交互、读取结果 passed 和 CSS 能力成功        | 用于局部 DOM/CSS/网络/控制台诊断；未在此探针验证性能 trace/堆快照或完整浏览器矩阵                     |
| Browser Use / cua_repl              | 内置浏览器和 Edge 扩展均成功打开 example.com 并读取页面                        | 普通网页交互可用；不把 Edge 扩展等同于 Chrome 扩展；原生 Windows API 在该入口未启用                   |
| Computer Use / node_repl + @oai/sky | 初始化、窗口枚举、WebStorm 可访问性树及截图捕获成功                            | 可访问性树仅含基本窗口控件；未验证所有编辑器元素及键鼠写入，不夸大语义导航能力                        |

TS/Svelte 临时探针已删除；Chrome/IAB/Edge 测试页已关闭，用户原有页面未修改。Computer Use 只读窗口观察，没有编辑 IDE 文件或执行桌面命令。

### WebStorm 原生加载排障与最终配置

Codex 桌面本任务启动日志在 2026-09-18 11:37:05 UTC 记录 WebStorm HTTP initialize 收到 503，因此没有进入原生列表。后续 Node SDK 独立客户端无请求头和带项目请求头都连接成功；仅凭这些证据不能认定 503 的确切来源或已经修复。

本机官方 webstorm64.exe stdioMcpServer 探针失败于 Java loopback/UnixDomainSockets connect。临时安装 mcp-remote 0.14.2 的 Node 转接路径已通过 43 工具枚举和项目检查，但未写入启用配置。按用户最终选择，继续原生 HTTP，去掉固定项目请求头，设置启动 30 秒、调用 90 秒超时：

```toml
[mcp_servers.webstorm]
url = "http://127.0.0.1:64542/stream"
enabled = true
startup_timeout_sec = 30
tool_timeout_sec = 90
```

不要填 Markdown URL，也不保留 IJ_MCP_SERVER_PROJECT_PATH header。调用项目工具时显式传 projectPath。配置修改前已备份用户 config.toml；备份及凭据不进入 Git。临时转接工具目录位于用户 .codex/tools/webstorm-mcp-adapter，未启用；递归清理被执行策略拒绝，本轮保留，共享 pnpm store 不清理。

下一步让用户完全退出并重开 Codex，保持 WebStorm 打开当前仓库。先检查原生工具目录出现 mcp__webstorm__*，再原生调用 get_project_modules 和 get_file_problems；如失败，读取这次新启动日志的具体错误，不能仅再次增大超时或重复安装。原生出现并调用成功后，才更新本表为通过。

其他已注册 IDE 服务不作为 WebStorm 的替代：当前未实测 IDEA 项目接入成功，也未为本任务修改其配置。

## 另一台 Windows 电脑如何安装

前置条件：PowerShell 7、Node.js 24、项目指定的 pnpm 11，以及可在终端执行的 `codex`。先克隆仓库、安装工作区依赖，再从仓库根目录执行：

```powershell
pnpm install
./scripts/language-services/setup.ps1 -Verify
```

脚本从自身位置确定仓库路径，从 `CODEX_HOME` 或用户的 `.codex` 目录确定工具目录，不依赖本机的 `C:\code` 或用户名。它会：

1. 读取 `pnpm-workspace.yaml` 的版本 catalog，将工具安装在 `<CODEX_HOME>/tools/zui-language-services`，跳过依赖安装脚本。
2. 在真实 TS/Svelte 项目中验证诊断、类型、定义、引用和补全。失败即停止，不改 Codex 配置。
3. 备份 `<CODEX_HOME>/config.toml`，注册 `zui_lsp`，更新已有的 `svelte` 服务。其他服务和模型配置保留。
4. 将这两个服务的启动超时设为 30 秒、调用超时设为 90 秒，避免首次加载大型 CSS 类型时被默认时限打断。

`zui_lsp` 和 `svelte` 这两个具名条目由脚本管理；如果本机给这两个名字配置过不同服务，请先检查备份。不要把整个用户配置、备份、凭据或机器上的 `.idea/workspace.xml` 提交到仓库。

只安装和验收，不注册 Codex：

```powershell
./scripts/language-services/setup.ps1 -Verify -SkipRegistration
```

代码迁移到新路径后重新运行安装脚本。一个用户配置中的 `zui_lsp` 对应一个 checkout；多个 checkout 不应并发覆盖同名配置。直接依赖版本由 catalog 固定，工具目录保留自己的 pnpm lockfile；首次安装的传递依赖仍由当时的包仓库解析，升级后需重新验收。

## 三种工具的职责

### 2026-09-18 新电脑安装记录

在当前 checkout 执行安装脚本并通过独立客户端验收：TS 与 Svelte 预置三处类型错误均能检出，反复修正后归零；TS 消费 Svelte 组件的错误属性类型能检出；hover、定义、引用和补全均通过。报告位于本机 `<CODEX_HOME>/tools/zui-language-services/verification.json`，临时探针已清理。

官方 Svelte MCP `0.1.26` 已完成工具枚举和 `svelte-autofixer` 实际调用，Svelte 5 探针返回空 issues/suggestions。WebStorm 的 `http://127.0.0.1:64542/stream` 在本机重新握手成功，识别 `zui-svelte` 项目，并完成导航测试文件检查；已单独注册 `webstorm`，保留其他 IDE 配置。该文件检查无报错，但仍不视为全仓类型验证。

本次运行环境为 Node.js `24.18.0`、pnpm `11.22.0`、Codex CLI `0.153.4`。工作区依赖按锁文件补齐。三个 MCP 已写入本机用户配置，当前任务尚未原生加载新工具；用户重启 Codex 后应重新枚举并实际调用，不能把独立客户端通过写成宿主已加载。

| 工具              | 用途                                                   | 边界                                                                      |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| WebStorm MCP      | IDE 符号、导航、检查与安全重构                         | 当前实测 `get_file_problems` 会漏报 TS 语义错误，不能凭空列表宣布类型通过 |
| `zui_lsp`         | 已保存的 TS/JS/Svelte 文件的语义类型、导航、补全、诊断 | 每次查询一个文件；不代替整个项目的类型检查、构建和浏览器测试              |
| 官方 `svelte` MCP | Svelte 文档、代码分析与修复建议                        | 不等同于项目 TypeScript language service                                  |

`zui_lsp` 仅提供五个只读工具：`hover`、`definitions`、`references`、`completions`、`diagnostics`。不提供重命名或文件写入接口；语言服务发出的 `workspace/applyEdit` 请求会被拒绝。

文件路径相对仓库根目录，行列均从 **1** 开始。补全建议使用 `prefix` 和 `limit`，避免一次输出全部 CSS 属性。例如：

```json
{ "filePath": "core/tests/types.ts", "line": 19, "column": 11 }
```

这是当前 `_100` 的 hover 示例，源码修改后应以实际行列为准。诊断调用只需要 `filePath`；检查返回的 `isError`、`complete` 和 `errors`，超时不等于零错误。当前工具读取磁盘文件，不读取 IDE 尚未保存的缓冲区。文件不在实际 tsconfig 中时可能进入推断项目，结果不能代表该工作区完整的类型配置。

## 能否不重启 Codex

[官方 App Server 文档](https://learn.chatgpt.com/docs/app-server) 提供 `config/mcpServer/reload`：重新读取配置，为已加载任务排队刷新 MCP。它是 App Server 协议方法，并不是所有环境中都直接提供给模型的 MCP 工具。

要执行热重载，需要能连接到**承载当前任务的 App Server**。CLI `codex app-server proxy` 用来连接已有控制 socket；新启动一个独立 `codex app-server`，再向它发送 reload，并不能刷新桌面正在运行的任务。

本机 Codex CLI 0.154.0 的实测结果：`codex app-server daemon version` 无法连接默认 `app-server-control.sock`，返回 Windows socket 错误 10050；桌面 App Server 使用独立 stdio 进程，当前任务工具目录也没有重载方法。因此，本机尚未验证“助手直接热加载到当前任务”，不能承诺完全不需要重启。

配置完成后可先检查 Codex 设置中服务的连接状态，并在下一轮确认实际出现的工具。只有看到工具并成功调用，才算当前任务加载完成。如果宿主没有刷新入口且新工具始终不可用，再重启 Codex。仅 `codex mcp list` 能列出配置，不足以证明已连接。

2026-09-18 重启 Codex 后复验：当前任务已原生加载 `zui_lsp` 的五个工具，官方 `svelte` MCP 调用正常。直接通过当前任务验证了 TS/Svelte hover、定义、引用和补全；两个临时文件分别检出三处预置类型错误，修正后均返回 `complete: true`、`errors: 0`，随后清理探针。这证明重启后的宿主接入可用；不作为无重启热加载的证据。

即使当前任务工具目录没有刷新，也可以通过独立 MCP 客户端调用仓库桥接服务；下面的验收就是这样执行的，不需要重启 Codex，不调用模型 API。工具开发与 core 的关键验证不必等待宿主重启。

## 验收与排障

已安装工具后，在仓库根目录重新验收：

```powershell
node scripts/language-services/verify.mjs
```

成功输出 `VERIFIED`，报告保存在工具目录的 `verification.json`。脚本会拒绝覆盖同名现有探针文件，创建临时文件，并在正常结束或断言失败时清理。不要并发运行两次；强制终止后如有遗留，先检查内容再手动移除探针。

验收覆盖：

- `.ts` 与 `.svelte` 中的数字/字符串不匹配、不存在的中文 token、错误 CSS 单位；同一服务进程反复经历“错误 → 正确 → 错误 → 正确”。
- TS 消费真实 Svelte 组件时，`ComponentProps` 能识别错误的属性类型，修复后清零。
- `_100: void` 与 `byCallback: string` 的语义 hover、跨文件定义、引用及 token 补全。

语言服务扫描独立 SvelteKit/安装包测试夹具时，未构建的包入口可能产生配置加载日志。不能据此假定全项目通过，也不应静默删除夹具；这些项目由 CI 在准备依赖、构建与 Kit sync 后单独检查。当前探针的逐文件诊断与返回内容才是本地验收证据。

### WebStorm

本机 2026.2.3 的 MCP 地址为 `http://127.0.0.1:64542/stream`，**其他电脑请使用自己 IDE 设置中显示的地址**。它与已有 IDEA 服务的端口不是同一个。重启 WebStorm 后应重新 initialize MCP 会话，不复用旧 session id。

`.idea/workspace.xml` 中 `SvelteServiceSettings.useServicePoweredTypesEnabledManually=true` 表明启用了服务驱动类型；还应检查 IDE TypeScript 路径是否指向当前仓库的 `node_modules/typescript/lib`。这些是用户/机器设置，本文记录检查方法，不复制配置文件。

启用后实测 hover 能看到 `_100: void`、`byCallback: string` 和主题泛型；大型主题类型仍可能被 IDE 展示层截断。另一方面，故意写入三处 TS 类型错误时，`get_file_problems` 曾返回空错误列表。因此，hover 更完整与诊断完整是两件事。

本机 `.iml` 的 content URL 指向 `$MODULE_DIR$`，而 `.iml` 位于 `.idea`，值得在 IDE 中检查实际 Content Root 是否覆盖仓库根目录。这只是待验证线索，未确认是漏报原因，也未自动修改项目模型。

### TypeScript 与 Svelte

- `.svelte` 内部使用官方 `svelte-language-server`；TS/JS 引用 `.svelte` 的类型由 `typescript-svelte-plugin` 补充，二者不是同一个能力。插件的项目识别、安装位置与实际 tsconfig 都会影响结果。
- 桥接的 TypeScript 服务使用项目的 `node_modules/typescript/lib`，设置 `useSyntaxServer: 'never'`。本机此前独立 syntax service 返回了 `any`，完整语义服务才返回准确 token 类型。
- LSP 使用 `pathToFileURL` 生成 Windows URI，由 `vscode-jsonrpc` 处理 UTF-8 报文长度。不能用 `file://` 拼接盘符路径，也不能把 JavaScript 字符串长度当作 UTF-8 字节数。
- TS 诊断使用同步语法/语义请求，Svelte 使用 pull diagnostics，避免把尚未推送的诊断缓存当作“零错误”。请求超时会报错并回收本服务进程；下一次查询重新启动。
- 桥接只结束自己创建的子进程树，不按进程名批量结束 Node，也不操作 WebStorm 进程。

参考：[Svelte MCP 本地配置](https://svelte.dev/docs/ai/local-setup)、[Svelte language server](https://github.com/sveltejs/language-tools/tree/master/packages/language-server)、[TypeScript Svelte plugin](https://github.com/sveltejs/language-tools/tree/master/packages/typescript-plugin)、[Codex MCP 配置](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)。
