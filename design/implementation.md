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

## Runtime 接口与性能基线

0b604d1 的完整 CI 已通过（35299148400），包含主题 stylesheet 通道、ZUI 严格 CSP 以及真实 Kit 流式/接管三浏览器验收（Kit 固定播报样式使用精确 hash 例外）。StyleRuntime 改为显式公共 interface，增加只读 stats；规则编译计数用于验证持续更新不反复调用本地规则编译。补上 registry 销毁后拒绝新增资源，以及互斥 target/sheet、变量通道校验。局部 runtime 14 项、聚焦类型和 WebStorm 检查通过。

CI 新增构建产物基准：10,000 次稳定更新、1,000 实例各 100 次更新、100 轮挂载销毁；规则共享、无额外编译和全部活动计数归零作为硬门槛，耗时输出 core/test-results/benchmark.json。首份真实基线尚待本次 CI，不提前给出性能完成结论。

## 显式层级与动态迁移

a8cf60f 的完整 CI 已通过（35299462819），首份 Node 基线已产生：10,000 更新 p95 75.41ms，1,000 实例各 100 更新 p95 806.18ms，100 轮挂载销毁 p95 2.48ms（Linux / Node 24.20.0 / Xeon 8573C；不是浏览器 DOM 性能）。硬计数门槛全部通过。

加入 runtime.layers/layer 和 createCss(theme, {layer})，统一入口，未配置保持原生无层；null 可显式退出默认层。模块定义、setup 快照、模板和普通 binding 共用层合同，安全提升保留层结构；不允许未声明/重复/无效层名。局部相关 core 13 项与 SSR 3 项、后续资源/层级 7 项通过，聚焦类型、ESLint 和 WebStorm 检查通过。新增三浏览器层叠/important 迁移用例交给 CI。多 runtime 共享目标的层序冲突协调仍待后续处理。

## P3：异常通知与资源清理

增加共用的小型 runAll 回调工具，更新提交后完整通知消费者，销毁时即使一个回调失败也继续释放其余资源。registry 值写入与通知分离，避免将消费者异常误当作插入失败回滚；首次订阅失败立即移除订阅。局部相关 22 项与聚焦类型检查通过，WebStorm 对 binding/runtime 无错误。将首次 CI 性能样本和同环境回归门槛固化到 core-performance-budget.json；跨机器只记录时间，所有环境仍执行计数硬门槛。

## P3：同目标的 runtime 与模块样式隔离

c047dcb 的完整 CI 已通过（35300813045），包括固定性能门槛。模块定义保留原标记，消费端追加 namespace 别名；跨 runtime 转发时替换旧别名，避免相同定义在不同默认层互相污染。重复 target/namespace 和相同层根的冲突声明明确拒绝，销毁后可重新使用 namespace；runtime 配置采用快照。相关 core 19 项、SSR 3 项、聚焦类型和 WebStorm 检查通过，新增真实 DOM 多 runtime 隔离用例交给 CI。

## P2：Token 需求与实际消费环境

19730c1 的完整 CI 已通过（35301277901）。Builder 为快捷 Token 引用记录只读需求，随 StyleProgram 弱引用回收；模块定义携带相同需求，目标 runtime 在插入/更新前校验 namespace、实际使用的键和值种类。允许兼容主题子集，不扫描或猜测任意 CSS 字符串。失败发生在创建新绑定之前，已存在绑定保留旧快照。registry 初始化改用具名配置，减少位置参数。局部相关 core 15 项，补充需求用例后 10 项、SSR 3 项及聚焦类型/ESLint/WebStorm 检查通过。

## P2：自定义 Token 类别映射

964c7d3 的完整 CI 已通过（35302290442）。createCss 增加 tokenMap，支持自定义类别到属性的显式映射，嵌套状态/条件继承；保留属性原有值类型、关键字和单位。配置复制冻结，运行时检查属性/类别及已知值种类，Token 需求校验继续有效。Carrier 与生成脚本直接携带映射，避免上层 Omit/Parameters 重组导致的 TypeScript 联合类型膨胀；普通入口与内部收集器分离类型展开。内部求值选项改为具名对象，减少位置参数。

生成仍为 857 属性/262 关键字组，生成一致性检查通过。包含可选映射、错误类别/属性和错误单位的正反类型用例通过；局部 core 12 项、编译/SSR 7 项与 WebStorm 检查通过。阶段额度检查已用 50%，剩余 50%，继续保留至少 15%。

## P3：共享变量释放与测试目录整理

7c4013c 的完整 CI 已通过（35303659415）。同一元素的 CSS 变量按消费者引用计数，最后一次释放才恢复初始值和优先级；外部后续修改值或 important 时保留外部结果。绑定 ID 采用与主题路径共用的片段编码，避免跨 namespace 的分隔符碰撞。新增重复绑定的真实 DOM 回归，交给 CI。

按维护约定将全部 core 单元测试移至所属模块的 test 子目录，更新相对引用和 Vitest 发现规则；构建排除整个 test 目录，跨模块浏览器测试继续留在 core/tests。关键所有权与编码边界使用中文注释说明。局部 23 项测试、聚焦 TypeScript、定向 ESLint 和 WebStorm 检查通过。阶段额度检查剩余 49%；15% 是保留底线，达到验收要求即可提前结束。

## P3：主题绑定的共享与冲突诊断

309fce7 的完整 CI 已通过（35306669534），包含迁移后的单元测试发现与重复 DOM 绑定回归。bindTheme 对同一元素、scope 和 runtime 共享订阅与规则，最后一次释放才清理；scope 销毁或初始化失败也撤销元素占用。同一 namespace 的不同 scope/runtime 拒绝竞争，嵌套容器与不同 namespace 仍可独立使用，合同已写入 README。

局部主题 6 项、聚焦 TypeScript、定向 ESLint 和 WebStorm 检查通过；stylesheet 重复绑定的真实 DOM 回归已加入 CI。周额度剩余 49%。

## P4：响应式脚本快照的释放

5efb2de 的完整 CI 已通过（35306872555）。脚本 css 在响应式求值中通过 Svelte 公开 createSubscriber 绑定快照生命周期，重算/消费者销毁后释放旧快照；setup 常量仍保留到组件销毁。同一规则的响应式与 setup 持有者分别计数，防止先释放一个导致另一个失效。该路径保持完整快照，不猜测脚本循环的稳定实例身份。

新增 LifecycleProbe：先在文本中读取 derived，避免测试只覆盖 class 求值上下文；逐次 tick 完成 100 次实际更新，检查规则数有界、setup 样式保留、条件隐藏/恢复和导航回收。相关 SSR 4 项、聚焦 TypeScript、定向 ESLint 与 WebStorm 检查通过；真实浏览器的生命周期结论以本次 CI 为准。

## P6：真实 tarball 与 prerender 验收入口

47a3587 的完整 CI 已通过（35307386168），包括响应式快照 100 次逐次渲染、条件隐藏/恢复和导航回收的三浏览器回归。

新增 test:packages：实际打包 core/svelte，在系统临时目录独立安装 tarball，使用包的 compiler/server/root 入口，不设置 zui-source，不链接工作区源码。依赖版本读取集中配置实际安装的版本；复制完整 core 类型正反用例做包外检查，核对安装路径和产物无测试文件。外部项目构建 Node adapter 与 static adapter，再复用 Kit 三浏览器测试，并直接读取 prerender HTML 在禁用 JavaScript 的浏览器验证首屏样式。成功清理临时项目，失败保留路径，CI 保存步骤报告。

脚本语法、定向 ESLint、聚焦 TypeScript 和 WebStorm 检查通过；没有在本地运行完整安装/构建/浏览器流程，结果待本次 CI。阶段额度剩余 48%。

## P4：Svelte module 脚本静态定义

为 script module 复用 TS 模块定义编译，覆盖没有 instance script、仅导出常量以及模板消费等形式；使用同一 MagicString 与原始偏移编辑，保留源文件位置。模块常量不绑定某个 SSR 请求，每个消费者单独注册和回收。局部编译/SSR 11 项、聚焦 TypeScript、定向 ESLint 和 WebStorm 检查通过。包外阶段 Playwright 配置的首次 IDE 检查超时，单文件重查已通过。

75b70e3 的 CI 35308087996 已通过原有工作区门槛，新包外阶段在安装时失败：pnpm 11 不读取 package.json.pnpm.overrides，尝试从 npm 下载未发布的 core。依据 pnpm 官方 package.json 文档，将覆盖写到独立临时项目自己的 pnpm-workspace.yaml；本地 pnpm 11.22.0 config get 已确认可读，完整安装留给 CI。

## P4/P6：协议版本与原子接管预检

30998bb 的完整 CI 已通过（35308397801），新增 tarball 独立安装、包外类型检查、Node/static adapter 构建、Kit 三浏览器以及无 JavaScript prerender 样式验收均已执行通过。

增加内部 styleProtocol：编译产物嵌入版本，框架 scope 在触及生命周期前校验；模块定义入口与 SSR 元数据使用相同版本。BrowserStyleSheet 在接管任何节点前先校验全部版本、key、顺序、重复记录和 nonce，失败保留原始 SSR 标记，可修正后重试。移除 registry 中重复的 disposed 检查，补充升级与 nonce 合同说明。

相关 core 6 项、编译/SSR 12 项、聚焦 TypeScript、定向 ESLint 和 WebStorm 检查通过；协议/nonce/重复 key 失败后重新接管的 DOM 用例交给 CI。

## P2/P3：选择器边界与保守提升

d815fe4 的完整 CI 已通过（35308700961），包含协议/nonce/重复元数据失败后的完整接管回归与包外验收。

局部选择器逐个外层分支检查显式 &，忽略引号、转义、属性与函数内部的假锚点，拒绝 :is(&, body)/:not(&) 等不能证明局部约束的表达式；支持显式根后的复杂条件与祖先上下文，边界已记录 README。声明值拒绝字符串中的未转义换行，避免 CSS 字符串被浏览器提前终止。

提升前规范化 CSS-wide 关键字的大小写/空白，转义值回退完整规则；无 CSS.supports 时按属性和值组合检查保守子集，防止 width:red、无单位非零长度、无效 hex 颜色、负尺寸等从解析期无效变成变量计算期无效。依据 W3C CSS Nesting 与 CSS Variables 的语义，未确认安全的值不改变输出功能。

局部相关 51 项、新增换行后定向 39 项、聚焦 TypeScript、ESLint 和 WebStorm 检查通过。继承值与选择器隔离三浏览器回归交给 CI。周额度仍剩余 48%。

## P6：交错请求与初始化失败的释放

67110d8 的完整 CI 已通过（35308963271），包含选择器隔离与 CSS-wide 关键字三浏览器回归。新增 100 个交错 createStyleHandle 请求，实际 Svelte 渲染通过 ALS 获取各自 runtime，分别验证主题、nonce、namespace、width 输出与响应消费后样式表归零。首屏主题规则写入纳入 renderStyled 的 try/finally，初始化失败同样释放 runtime。

相关 SSR/响应生命周期 10 项和聚焦 TypeScript 检查通过。WebStorm 对 server.ts 通过；SSR 测试首轮超时，单文件重查通过。测试替身最初的 Component 返回类型不匹配已修正，未绕过类型检查。

## P3：变量域隔离与 DOM 异常清理

66915d5 的完整 CI 已通过（35309303459），包含百路交错 SSR 请求回收。主题与动态绑定的 namespace 也采用片段编码，保证主题变量的三段结构与绑定变量的四段结构不能相互冒充；内部协议递增为 2，编译产物和 SSR 接管同时核对新版本。加入跨 namespace 的单元和真实 DOM 回归。

ClassController 完整通知各个挂载目标，首次挂载失败撤销部分变量；bindElement 首次订阅失败同样清理，销毁时变量异常不阻断 class/订阅释放。共用既有 runAll，未增加业务 API；测试 DOM 替身集中放在 runtime/test/target.ts，不进入产物。相关 19 项、故障注入与引用相关 13 项、聚焦 TypeScript、ESLint 和 WebStorm 检查通过。格式化曾因临时文件占用失败，单文件重跑已成功。

## P4/P6：组件边界回退与 Kit 应用根所有权

e7edac2 的完整 CI 已通过（35309711239），覆盖协议 2、变量域隔离和 DOM 故障回收。删除按相对 .svelte 导入推断 managed 的逻辑；组件 class/slotProps 边界统一传递完整规则，原生模板元素仍按安全条件自动提升。该选择保留功能、减少协议猜测，暂不承诺跨组件提升，规划和 README 已明确。调用参数变更将内部协议递增为 3。

Kit 客户端 runtime 改由根 layout 持有，路由只管理各自规则。独立消费项目增加真实 node_modules 内的无 ZUI 组件包，验证普通 class 转发、连续更新、路由导航释放及返回；fixture 的安装路径另行断言，避免误用工作区编译证明第三方能力。工作区仅使用测试声明补全虚拟包名，包外项目不复制该声明，直接检查真实 .svelte 类型。

局部编译/SSR 13 项、聚焦 TypeScript 和 WebStorm 检查通过；IDE/ESLint 发现 Kit 链接须 resolve() 已修正。新包外导航与转发浏览器用例交给 CI。

## P3：跨 runtime 的属性注册冲突

依据 CSS Properties and Values 的 Document 级注册语义，增加同一 Document 的 ZUI @property 所有者协调（包含关联 ShadowRoot），允许相同定义共存，拒绝不兼容定义；释放资源或 runtime 后撤销自身占用，不影响其他所有者。只管理 ZUI 创建的声明，不扫描外部 CSS/registerProperty。资源清理复用 runAll，补充非有限初始值/字体数值检查。相关资源/层级 7 项、聚焦 TypeScript、ESLint 与 WebStorm 检查通过；真实 DOM 重复引用/销毁/重新注册交给 CI。

39daee7 的 CI 35310155914 在工作区 Svelte 检查失败：两个独立 Kit fixture 的生成路由类型发生交叉，/static 被当作另一个应用的动态路由。工作区类型检查排除 tests/kit 与 tests/package；它们仍由 test:packages 在独立安装、svelte-kit sync 后完整 svelte-check，未减少真实消费者验收。删除为工作区临时补的虚拟包声明，避免掩盖实际依赖类型。根 dev 命令先构建 core，保证编译插件在全新 checkout 可读到依赖协议。周额度剩余 47%。

## P4：同步模块初始化中的 helper 与回调

f90a0d4 的完整 CI 已通过（35310553071），包括未经过 ZUI 编译的 node_modules 组件转发、Kit 路由往返释放与跨 runtime 的属性注册冲突回归。

模块编译追踪本文件显式 helper 引用与命名空间 css/createCss，对含样式的同步初始化建立一个上下文，覆盖 map 回调、多层 helper、对象方法 this 和嵌套调用；函数体保持原样，含顶层 await 的调用继续在原位置求值。自定义 cssModules 入口支持导入 helper；不声称自动解析任意跨模块调用图或维持跨 await 的同步上下文，README 已明确。

局部编译/SSR 14 项，增加 this/调用次数后定向 8 项通过；源码类型、ESLint、WebStorm 检查通过。静态 fixture 首次 IDE 检查超时，单文件重查通过；真实 fixture 的 each key 已补齐。浏览器 module helper 样式与导航回收交给 CI。

## P4：组件脚本与外部 helper 的快照上下文

5eb82d0 的完整 CI 已通过（35311178346），包括模块 helper/map/方法 this 的浏览器样式与导航回收。组件 scope 将快照收集提为共用函数，编译器为 setup 调用、state 初始值、derived 表达式和 derived.by 回调补充上下文，支持普通跨文件 helper。Rune 保持原声明位置，顶层 await 不搬进同步闭包；仅实际执行 css 时选择 runtime，避免普通初始化抢占默认实例。新内部能力将协议递增为 4。

LifecycleProbe 改为导入普通 TS helper，覆盖 setup/state/两种 derived、100 次逐次更新、隐藏恢复和卸载；相关编译/SSR 12 项、聚焦 TypeScript、ESLint 与 WebStorm 检查通过，浏览器和自定义 CSP runtime 的初始化顺序交给 CI。

## P7：普通 class 不创建默认 runtime

6783994 的完整 CI 已通过（35311842191），包含普通外部 helper 在 setup/state/derived/by 中的百次更新、隐藏恢复、严格 CSP 自定义 runtime 与包外验收。

ClassController 接受内部 get/peek 访问器，普通 class/style 只规范化值，不创建默认 runtime 或注入主题；真正产生/消费受管规则时才取得组件引用，之后固定使用同一 runtime。惰性挂载在后续选择 stylesheet 通道时不写内部 style 变量。内部接入协议递增为 5。顺带修复批量丢弃无用 binding 时一个清理异常阻断其余释放的问题。

相关 core 10 项、SSR 6 项、聚焦 TypeScript、ESLint 和 WebStorm 检查通过；新增普通 class 页面验证零 data-zui 样式节点，交给 CI。周额度剩余 46%。

## P2：数字 Token 键的类型一致性

db02c4d 的完整 CI 已通过（35312345458），验证普通 class 页面不创建 data-zui 样式节点，受管样式、SSR 与包外消费均正常。

主题类型将数字类别/Token 键按 Object.entries 语义归一化为字符串，色阶 100/200 支持快捷 Token、引用、别名、扩展与覆盖。合并类型使用局部 Extract 约束，未添加宽字符串索引，错误 Token/类别与既有值类型检查继续有效。类型用例也覆盖自定义数值类别，防止仅依靠 color/opacity 的类别约束掩盖扩展错误。

相关主题/Token 映射 11 项、正反类型与适配层源码类型、ESLint 和 WebStorm 检查通过；包外声明验证由 CI 复用同一类型用例。

## P3：后端清理失败后的内部状态

89b4467 的完整 CI 已通过（35312839889），数字 Token 键的完整类型与包外声明验收通过。registry 最后引用释放时先撤销内部索引，再完整尝试变量规则、主规则与模块定义清理，避免 references=0 的残留记录污染下一次注册。Binding 在新规则写入成功后先提交快照，再释放旧版本；删除旧规则失败后仍可继续更新。写入与回滚同时失败保留两个错误，README 区分写入失败与提交后清理失败。

适配层销毁继续处理本组件的全部控制器/快照；默认 runtime 在调用可能抛错的 dispose 前从缓存移除。相关 21 项与新增双重故障后的定向 6 项、聚焦 TypeScript、ESLint 和 WebStorm 检查通过。自定义后端拒绝删除时不承诺物理 CSS 已消失，内部所有权与物理清理结果分别报告。

用户已确认 StyleProvider 使用容器：默认 div，as 可选标签，接收 ThemeScope 与普通 class/style，接下来据此实现最少框架接入。

## 验证修正与语言服务接入调查

3ef459f 的 CI 35314320650 在 preserve-caught-error 阻塞：AggregateError 虽包含两个原异常，仍须显式声明 cause。已补充 cause 并单独执行 ESLint 通过。上一批组合命令未在 lint 失败后立即退出，后续 tsc 的成功掩盖了该失败；以本次独立检查和后续 CI 为准。

用户重启 WebStorm 并启用服务驱动类型后，MCP 可返回数字 Token 的 _100: void 和 Svelte derived 的 string 类型，但受控探针的三个 TS 类型错误仍未由 get_file_problems 返回。临时探针已删除。用户授权研究并配置 LSP/MCP，必要时由用户重启 Codex；StyleProvider 容器方案保持已确认，尚未实现。

## 开发工具：可迁移的语言服务与 MCP 配置

54f5eef 的完整 CI 已通过（35315724030）。增加 scripts/language-services 中的只读 MCP 桥接、独立依赖安装脚本和验收脚本，版本集中在 pnpm-workspace.yaml 的 languageServices catalog，不增加产品依赖。design/language-services.md 记录另一台 Windows 电脑的安装、验收、WebStorm 诊断边界和 Codex 重载条件。

本机 setup.ps1 -Verify 已成功：TS/Svelte 错误与修复反复检查、真实 Svelte ComponentProps、hover/定义/引用/补全通过，临时探针已清理；脚本的 PATH 多 Node 命中问题已修复。相关脚本 ESLint 和文档/代码格式检查通过。官方 Svelte MCP 的工具发现和 $props 文档调用通过。全局配置已备份，zui_lsp 与原 svelte 条目完成注册。

Codex CLI 0.154.0 的 daemon version 与 app-server proxy 均无法连接默认控制 socket（Windows 10050）；当前工具目录无重载入口。官方协议支持重载，但本机尚未证明当前桌面任务可热加载，不能以配置写入或独立客户端成功冒充宿主重载成功。独立 MCP 客户端可继续用于关键检查，不阻断 core 工作。

用户重启 Codex 后，原生工具目录已出现 zui_lsp 五个工具，并全部调用成功；官方 Svelte MCP 正常。原生诊断验证 TS/Svelte 各三处错误，修改后清零，临时文件已删除。环境为 PowerShell 7.6.6、Node 24.12.0、pnpm 11.22.0、Codex CLI 0.154.0。08c1c23 的完整 CI 已通过（35321234678）；周额度剩余 40%。本轮只验证环境和补充文档，未修改产品代码。

## R0：验收台账与稳定来源顺序

9f6fa79 的完整 CI 已通过（35322425654）。建立 core-acceptance.md，将 A01–A40 的已有证据入口与缺口逐项列出；不把旧 CI 的部分用例解释成整项验收完成。

新增两项来源顺序反例，在旧实现中均失败：反向取得两个来源、来源完全释放后重挂会改变 CSS 输出顺序。改为由稳定来源与数字源码位置生成字符串排序键，Node/浏览器使用相同码元比较，层声明在前；来源归零后仍释放，不永久记录挂载历史。StyleSheet.order 合同改为 string，SSR metadata 统一转义/校验，内部协议升至 6，旧编译和 SSR 数据明确拒绝。

相关 14 项局部单元、core 类型检查、ESLint、LSP 单文件诊断通过。新增双通道提升/重挂、SSR 反向接管与损坏 order 的三浏览器回归，结果交给本轮 CI；未将浏览器用例存在计作通过。同来源不同值变体仍不提供 class 拼接顺序优先级，明确覆盖使用 layers。

## R1：StyleProvider 容器基础接入

398f483 的完整 CI 已通过（35325762599），稳定来源排序、双通道提升/重挂与 SSR 反向接管均已通过三浏览器及包外验证。

新增 @zui/svelte 根入口 StyleProvider：默认 div、非 void 的 as、通用 HTML 属性/class/style/事件、调用方拥有的 ThemeScope；复用 runtime，先安装新主题再释放旧规则，切换 scope 后释放旧订阅，SSR 不订阅且将规则留到请求收集完成。自定义主题要求匹配 runtime namespace 和基础 Token schema。泛型标签的属性全集触发 TS 联合类型过大，采用 HTMLAttributes<HTMLElement> 保持类型可维护；实际类型用例覆盖必填 scope 和 void 标签拒绝。

10 项相关 SSR 测试、svelte-check（0 errors / 0 warnings）、ESLint 和 Svelte autofixer 的结构检查通过。LSP 对组件诊断正常；单独查询 tests/provider-types.ts 时进入未带 zui-source 的推断项目而报包解析错误，此处以项目实际 tsconfig.check.json 的 svelte-check 结果为准，未把 LSP 结果计作通过。独立 Kit/package fixture 尚未本地构建，配置加载日志沿用既有隔离检查边界。

新增 Docs 的共享/嵌套 scope、100 次切换、scope 替换/销毁、容器属性及卸载回收回归；独立 tarball 增加 Provider 禁 JS 首屏、嵌套主题与客户端切换。上述浏览器/包外结果交给 CI。根入口包含 .svelte 后普通 Node 不直接执行该入口，CI 保留 core Node 导入，Svelte 根入口交给真实外部 Vite/Kit 编译消费。R1 的 Portal/ShadowRoot 与偏好探针仍未收口。
