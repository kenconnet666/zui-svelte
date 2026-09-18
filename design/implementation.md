# Core 实施进度

2026-09-18 规划更新：下一阶段采用 [首版生产可用规划](core-production-plan.md) 的 P0–P8 与 A01–A40 验收合同。规划已落盘，尚未执行这些阶段。以下 C1–C5 保留为历史实施记录。

当前 `cc2f9d7` 的 CI [35289205755](https://github.com/kenconnet666/zui-svelte/actions/runs/35289205755) 已确认失败于两处 Svelte 接入 lint；尚未取得该提交后续完整验证通过证据。

目标：以 core 为主，组件库与文档站只补必要验证。公开 class 字符串、模板内 css、运行时自动提升、编译桥、SSR 与生成类型沿用已经讨论的方向。

## 阶段

- C1：生成式 CSS 属性/关键字、builder、有序序列化、主题定义与类型合同。
- C2：作用域、规则注册、引用释放、持续绑定、自动变量提升和 SSR 样式输出。
- C3：主题作用域、全局资源、组合与生产边界。
- C4：最小 Svelte class 编译桥、SSR 和真实浏览器验证。
- C5：外部包消费、回归与生产能力审计。

## 工作方式

每个可构建阶段中文提交并推送。推送前检查上一轮 CI；新 CI 不等待、不轮询。本地只做针对改动的关键验证。

本会话未暴露 WebStorm/JetBrains 工具，不将本地脚本结果称作 IDE 检查。完整类型检查、全套测试与浏览器验收由 CI 运行。

额度初查：周额度已用 36%，剩余 64%。至少保留 15%；阶段间重新查询，在接近边界前预留收尾余量。

## 当前事实

C1 已加入生成式 857 属性/262 关键字组、builder、主题和序列化。局部 7 项测试、生成一致性检查通过；完整类型检查交给 CI。core runtime 与 Svelte 编译桥尚未完成，不宣称生产能力已经具备。

C1 的 CI 报出 builder 重载与主题覆盖值收窄两处类型问题，已在 C2 修复并针对这两个文件做类型确认。

C2 已加入请求/DOM 样式表、引用注册、持续绑定、自动提升、变量差量、SSR 样式输出与清理。局部 6 项 runtime 测试通过，包含 1000 次更新规则数稳定、多实例隔离和结构历史上限。下一步继续补主题资源、浏览器消费和编译接入。

C2 的完整 CI 已通过（35235308799）。C3 加入 ThemeScope、嵌套主题覆盖、独立 Portal 变量绑定、SSR 样式接管标记，以及三浏览器 core 验收。局部主题作用域 2 项测试通过；三浏览器测试由本轮 CI 执行，不在本地运行或等待。

最近额度检查：周额度已用 37%，剩余 63%。

C3 的完整 CI 已通过（35236622296），包含三浏览器 core DOM/SSR 接管验收。继续补入带引用释放的全局样式、主题规则、keyframes、font-face 和 @property，局部资源 3 项测试通过。编译桥尚未实现，公开 class-only 模板语法仍不能直接使用。

资源阶段补齐全局样式与动画资源的引用释放、嵌套主题销毁清理、来源顺序记录回收，以及按 SSR 原始顺序接管。局部 runtime/资源 10 项测试通过；下一阶段实现最少的 class 编译验证。

C4 已加入 class 字符串求值上下文、独立 class 元数据与变量通知、Svelte Vite 编译插件，以及 renderStyled/SvelteKit handle 的 SSR 收集原型。局部 class controller 4 项、编译器 4 项测试通过。新增浏览器/SSR 实际渲染验收交给 CI，尚不宣称接入链路已完成。

编译原型对 Snippet/await 中无法直接确定持久实例身份的位置采用完整规则快照，并在效果释放时清理，优先保证并发渲染正确；不把该路径冒充已经具备自动提升优化。

2026-09-18：用户要求尽快保存文档、推送并结束本机工作，换机继续。详细接续步骤与未验证边界见 handoff.md。已确认 501fa9b 的 CI 35238179716 成功；本次交接 C4 提交的新 CI 不等待。额度已用 39%，剩余约 61%。

## 生产规划执行：P0

2026-09-18：用户确认 core 统一从 @zui/core 导入，其余规划开始执行；周额度初查已用 40%，保留至少 15%。已修复 scope.ts 的 prefer-const 和 CoreProbe.svelte 的无效 mustache。定向 ESLint、scope.ts 聚焦 TypeScript 检查通过。IDEA 未打开当前项目，未执行 IDE 检查；完整检查交给本次 CI，推送后不等待。

## P1：类型化 css 求值入口

P0 提交 ef0677a 的完整 CI 已通过（35296371987）。本批修复编译器替换 css 时丢失原函数的问题，改为保留入口并包裹同步求值上下文，兼容自定义 createCss 主题与嵌套异常恢复。局部 core 5 项、编译/SSR 6 项测试通过；WebStorm MCP 对 classes.ts、scope.ts、preprocess.ts 和 TypedProbe.svelte 检查无错误。自定义模块目前仍需 cssModules 配置，自动识别和模块静态定义尚未完成，不宣称 P1 全部完成。

## P1：严格 CSP 的变量输出通道

fb37d44 的完整 CI 已通过（35296738893）。新增 runtime 的 variables: 'stylesheet' 选项，复用实例 class 将变量写入 nonce 样式表，不生成内部 style 属性；inline 默认行为不变。变量更新不重新运行 Stylis，最后消费者释放后清理变量规则，变量规则写入失败保留旧快照。局部相关 15 项测试通过；WebStorm 对 registry.ts、binding.ts、CspProbe.svelte 无错误。已加入真实 CSP 响应头的生产构建三浏览器用例，本次交给 CI，不在推送后等待。主题 scope 的双通道和完整 SSR 接管仍需后续完善。

## P1：模块静态样式与请求收集

b6e3196 的完整 CI 已通过（35297002200），含严格 CSP 生产构建三浏览器用例。新增只读模块定义与模块/消费者引用管理，TS/JS 编译在顶层 css 调用处建立模块所有权，保留参数求值顺序和顶层 await，普通 helper 函数体继续使用消费者上下文。同一已缓存模块的样式可被不同 SSR 请求独立收集；HMR 释放模块时保留仍在使用的定义。局部 core 10 项、编译/SSR 9 项通过；WebStorm 对 definitions.ts、classes.ts、module.ts 无错误，其后一个请求返回 HTTP 404，缺失部分用聚焦 tsc 补验（显式使用工作区现有 Node 类型路径）。已加生产浏览器模块注册/回收用例，交给 CI。当前仅识别已配置入口的顶层直接调用，完整重导出图、模块 helper 初始化和 HMR 浏览器验收仍未完成。

## P1：SvelteKit 流式响应与请求生命周期

模块阶段 eed2762 的完整 CI 已通过（35297348116）。锁定 SvelteKit 2.70.3，并核对实际源码：先生成并转换完整 HTML shell，再发送延迟数据片段。createStyleHandle 改用真实 Handle 类型和 transformPageChunk 注入首屏样式，保留响应流、头和背压，结束/取消/AbortSignal/错误时释放请求资源；支持逐请求 runtime 配置，原始非页面响应保持原样。renderStyled 补传 idPrefix/CSP/错误处理选项。局部响应生命周期 4 项、SSR 3 项验证通过；聚焦 TypeScript 检查通过，WebStorm 对 server.ts 和 Kit page 无错误。

已增加真正的 Kit Node 构建/三浏览器 CI fixture，使用显式服务端数据放行验证 styled shell 先返回，并检验 hydration、晚到 await 内容及严格 CSP。本地没有运行完整 Kit 构建或浏览器套件。本实现覆盖锁定 Kit 的数据流式模型，不声称支持任意宿主的晚到 HTML/CSS 分块协议；包外 tarball、静态 prerender 和复杂取消压力仍待后续验收。

4a7cf01 的 CI 35297816273 在 Kit fixture 类型检查失败：独立 package.json 阻断父包自引用解析。为 fixture 显式声明 link 依赖并在 CI 检查前准备本地链接；这仍是 P1 工作区消费验证，不能替代 P6 的 tarball 外部消费。hooks.server.ts 聚焦类型检查通过。后续构建/浏览器结果以新 CI 为准。

## P2：主题引用、别名与原子更新

新增统一入口 tokenRef、类型化 theme.variable/ref、只读 definition/resolved。别名按最终覆盖后的定义解析，检测循环、缺失和跨类别引用；类型推导深度有界，已知类别的值约束由类型/运行时共用表维护。覆盖和扩展保持已有值种类，ThemeScope 先计算整棵子树再提交，单个订阅者异常不阻断其余通知。局部主题/模块 12 项测试及正反类型用例通过，定向 ESLint 通过，WebStorm 对主题核心文件检查无错误。

9faf98f 的 CI 35298060285 已通过之前各项并到达 Kit 构建，但自定义 resolve.conditions 丢失 browser 默认条件，误解析服务端代码。fixture 改为追加 Vite 官方默认 client/server conditions；本批交给 CI 继续验证，尚未宣布真实 Kit 验收完成。

## 主题样式表通道与 Kit CSP 边界

bindTheme 增加可选 runtime，严格 CSP 模式下复用普通绑定写主题变量规则，保持无 style 属性并按 scope/消费者回收；加入 DOM 与真实 CSP 主题切换用例，交给 CI。聚焦类型、ESLint 与 WebStorm 检查通过。

a31eed1 的 CI 35298784160 已通过 core/Docs 与 Kit 构建；Kit 六项测试中四项通过，Chromium/Firefox 报框架自带 #svelte-announcer 的 style-src-attr 违规。核对锁定 Kit 的 write_root.js 确认固定内联样式来源，fixture 改为仅许可其精确 SHA-256 hash；ZUI 独立测试继续要求 style-src-attr none，不过滤违规、不放开 unsafe-inline。此宿主限制已同步生产规划。
