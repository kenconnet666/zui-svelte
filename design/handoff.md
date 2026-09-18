# Core 工作交接

更新：2026-09-19。core 生产重构已进入最终验收，仓库 kenconnet666/zui-svelte，分支 master。组件库和 Docs 仅服务 core 验证，包保持 private。

## 当前状态

P0–P5 的主要实现已进入仓库：CSS-only baseTheme 与亮暗扩展、公共 API 简化、统一主题校验和错误分类、类型生成覆盖审计、有界 DOM 分片、协议 8、独立属性 memo 与 legacy 语义、真实 HMR、Kit SSR/主题/CSP 和包外消费。编译标记误判与 source map 缺陷已经修复，不再是待处理任务。

剩余工作是候选全矩阵收口与发现问题后的修复，不重新启动另一套架构。详细合同见 [验收台账](core-acceptance.md)，设计依据见 [统一路线](core-remaining-plan.md)，历史实施见 implementation.md。

最近核实 5accd126064a2f953859ecbc2fde1360bae849b7 的 CI 35370072639 全部成功，已修正文档测试缺少 Node 类型的问题。此前 ff7bf3b 的成功产物也已下载核对 hash。最终组合审计又发现自定义 baseTheme schema 缺少真实 Kit/包外完整链路，现新增 /custom 验证禁 JS、hydration、自动提升、主题覆盖及跨 schema 根回收，本机 Chrome 两项通过。下一步检查这一批的生产三浏览器和独立包 CI；没有新缺陷就完成目标，不扩大架构。65 Token 清单、500 Token LSP、API/体积/内存预算与最小接入文档均已具备。

## 接续方式

先检查 git status 并保留本地改动，正常同步 master，不硬重置。Node.js 24、pnpm 11.22.0、PowerShell 7；依赖使用 pnpm install --frozen-lockfile。不迁移 node_modules、dist、IDE 用户状态和凭据。

先核对最近候选完整 SHA 的 CI；若失败读取具体失败步骤，然后继续相关修复。没有完整绿色证据，不把目标标记完成。成功后核对产物中的 candidate-evidence.json 与归档 SHA-256，更新验收台账；不运行 npm 发布或公网部署。

## 工具和本地验证

本机原生 WebStorm MCP、zui_lsp 与 Svelte MCP 已调用验证；每次新会话仍需发现与轻量探针。WebStorm 空列表且 timedOut=true 不算完成诊断。配置和重装见 [language-services.md](language-services.md)。WebStorm 地址按本机 IDE 提供，不能复制另一台机器的端口或项目路径；当前本机 NO_PROXY 包括 localhost,127.0.0.1,::1。

本地仅变更相关检查，优先 WebStorm/LSP；需要时做聚焦 Node/Chrome 回归。完整 lint/类型/构建/三浏览器/Kit/包外交 CI。每个阶段中文提交并推送，推送后不轮询；下次推送前检查上一轮。用户已取消 token 额度保留线及定期查询。
