# Core 生产重构统一规划

实施授权：2026-09-18 用户确认“按照推荐进行 core 模块重构和修改，直到生产可用”。本文的推荐 API 收敛与 P0–P5 路线已获实施授权；下文原讨论状态保留历史语境，完成进度以 implementation.md 和 core-acceptance.md 为准。

更新：2026-09-18。核对基线：776a8b1；完整 CI [35340956063](https://github.com/kenconnet666/zui-svelte/actions/runs/35340956063) 通过，但当前矩阵仍有缺口，core 未达到生产完成条件。

本文替换原 R0–R5 剩余清单，保存此次重构的设计依据。用户已授权推荐方向，主要实现已经落地；下文“推荐”“待确认”等措辞属于原设计阶段，不再表示等待授权。当前 API 以 core/README.md、svelte/README.md 和公开合同快照为准，完成状态以 core-acceptance.md 为准。core-production-plan.md 的 A01–A40 继续作为验收范围，theme-production-plan.md 仅保留研究背景。

## 1. 目标与已确认约束

core 是框架无关的运行时 CSS 与主题内核；Svelte 编译与宿主接入让业务只写 class。生产完成意味着类型、求值、主题、DOM、SSR 和独立安装整条链路可靠。

- 根目录 core、svelte、docs；内部继续 css、theme、runtime，不为计划创建空目录。
- css() 返回原始 string，推荐模板内调用，参数和复用优先普通 TS 函数。
- 首次普通值静态，同实例观察到变化才尝试变量提升；不要求 dynamic，不分析响应式来源。
- 多 class 自由组合、子元素独立绑定、复杂组件用 slotProps；不增加 parts 或句柄式业务 API。
- CSS 基础层不含预设 Token 或视觉值；亮暗两套主题从基础层扩展，默认使用亮色。用户可 extend 基础层、亮色或暗色，分类 Token 随扩展推导，切换纳入首版。
- 业务及稳定宿主能力统一从 @zui/core 导入；core 不依赖 Svelte。
- SvelteKit/Node SSR、hydration、严格 CSP 通道、资源回收属于必需支持；svelte/docs 只做必要接入。

## 2. 能力准入与参考收敛

每项新增/重构必须说明实际问题、最小解法、对 API/状态/依赖的影响、验收证据。普通 TS/CSS 或已有 API 能解决时先复用。减少公开概念优先于减少必要校验。

参考只保留机制：Tailwind 的分类和值/引用分离；UnoCSS 的确定合并与条件顺序；MUI 的变量输出和首屏选择分工；Chakra 的前景/背景/边界角色；Naive UI 的公共值先合并、组件值后派生。它们不对应五个新模块，也不引入这些库。

- [既有源码研究](theme-production-plan.md)
- [Chakra 语义颜色](https://github.com/chakra-ui/chakra-ui/blob/1ff9873754e9913fc3d849d23c0844a628f5f20d/packages/react/src/theme/semantic-tokens/colors.ts)
- [Naive UI 主题合并](https://github.com/tusen-ai/naive-ui/blob/42a52e6436b38bed456fee19eb0b89cdcd00fcc2/src/_mixins/use-theme.ts)

明确取消或暂不引入：必需 defineThemeSchemes 工厂、第二套主题 controller、通用插件生命周期、条件 Token/recipe DSL、命名部位、每种颜色全部状态组合、全局偏好存储单例、任意 JS 的零运行时提取。

双主题预输出保留为首屏/性能的候选实现，不强制新增公共 API；首屏正确性要求不降低。

## 3. 代码事实与重构动机

| 当前事实                                               | 影响                     | 推荐处理                                     |
| ------------------------------------------------------ | ------------------------ | -------------------------------------------- |
| 根入口同时导出业务、宿主、编译协议和工具函数           | 稳定性边界模糊           | 分级导出，业务仍统一入口                     |
| css(factory, theme?) 与 createCss(theme)(factory) 共存 | 自定义主题有近似入口     | 推荐移除 css 第二参数，统一用 createCss      |
| tokens/resolved 指向同一对象                           | 名称暗示不存在的区别     | 推荐公开只保留 resolved，definition 独立     |
| scope.override 替换整个 patch；update 仅根 scope 可用  | 容易误以为增量合并       | 推荐 setOverrides/setTheme，保留 fork        |
| scope、requirements、Provider 分别校验主题             | 合同易漂移               | 共享底层校验，区分 schema 与消费子集要求     |
| 原生 bindTheme 与 Provider 独立处理输出                | CSP/失败/释放易分叉      | 共享快照准备与输出合同，保留宿主生命周期差异 |
| BrowserStyleSheet 每 entry 一个 style，写入时全表排序  | DOM 与热路径成本         | 有序存储和有界分片                           |
| preprocess 用 includes(marker) 并整段改写属性          | 普通文本误判、源映射失真 | AST 协议识别、保留原源码跨度                 |
| 属性生成与单位/Token 语义表来源不同                    | 属性数量不等于语义完整   | 分别审计并生成覆盖报告                       |

上表是重构开始前的事实与动机。两个编译问题、API 收敛、长别名链与联合值推导、有序分片及生成审计已经实施；候选全矩阵证据单独维护，不使用设计文本判断当前缺口。

## 4. 公共 API 的保留、简化与内收

### 日常 API

保留 css、createCss、defineTheme、extendTheme、overrideTheme、tokenRef、lightTheme、darkTheme、ThemeScope，以及 Theme/ThemePatch/DefaultTokens/StyleBuilder/StyleFactory/CssOptions/PropertyTokenMap 等必要类型。按新增确认的需求，提供一个不含 Token 的基础主题值（候选名 baseTheme），复用 Theme 与 extendTheme，不增加基础层工厂或独立 builder。

defineTheme 从零定义；extendTheme 增加键并兼容覆盖；overrideTheme 只改已有键以捕获拼写错误；createCss 绑定类型和配置；css 服务默认主题。它们有不同职责，不合并为多模式万能函数。

推荐形态（含待确认改名，不是当前全部可用的 API）：

```ts
const appLight = extendTheme(lightTheme, {
  color: { chartLine: tokenRef('color', 'primary') },
  spacing: { panelGap: '20px' },
});
const appDark = extendTheme(darkTheme, {
  color: { chartLine: tokenRef('color', 'primary') },
  spacing: { panelGap: '20px' },
});
const themes = { light: appLight, dark: appDark };
const css = createCss(themes.light);

// 在应用实例或 SSR 请求中创建可变 scope。
const scope = new ThemeScope(themes.light);
scope.setTheme(themes.dark);
scope.setOverrides({ spacing: { panelGap: '12px' } });
scope.setOverrides({});
const child = scope.fork({ spacing: { panelGap: '8px' } });
```

themes/typed css 可模块共享，scope/runtime 不得跨 SSR 请求共享。普通方案对象足够；在绑定与切换边界复用校验，不先增加 schemes 工厂。

若用户选择保留旧方法名，则只保留旧名并明确替换语义，不同时增加 update/set/patch/merge 等同义入口。

### 宿主 API

createRuntime、bindTheme、bindElement、StyleSheet/StyleEntry、MemoryStyleSheet/BrowserStyleSheet 及资源句柄保留为高级接入面。宿主通过 runtime.binding() 获取绑定，推荐将直接 new StyleBinding 的构造能力内收。

runtime.css() 明确为 runtime 生命周期持有的静态入口，不能反复传入高频变化值当作自动提升。动态宿主使用 binding，常规业务使用编译 css。暂不仅为命名统一再造入口。

runtime.theme 推荐改为 defaultTheme，表示默认值/schema 基准；当前局部主题在 scope.theme。创建选项仍用 theme。stats 保留用于诊断，重复的 bindingCount getter 建议内收。

global/keyframes/fontFace/property、cssText/styleTags 保留；资源必须有清理所有者。set/raw/custom 三种出口分别解决标准键类型、未来 CSS 和自定义变量，不因都能写声明而贸然合并。

### 内部协议

ClassController、createStyleModule、styleProtocol、withCssEvaluation/hasCssEvaluation、normalizeClass、hashText、canonicalize、buildStyle、底层序列化和 StyleProgram 默认不属于稳定业务 API。

必要跨包符号暂以 @internal 从原入口提供给同版本 svelte/编译器。先清点消费者，再缩小桥接类型，不能直接删除仍被 Svelte 导入的函数，也不创建装载所有内部能力的万能对象。@internal 是稳定性标记，不是访问控制；协议不匹配仍要运行时诊断。

@zui/svelte 的 css 转导出可保留兼容，文档推荐 @zui/core 或应用 typed css。业务入口不再分拆；既有编译器/服务端工具入口保留。

## 5. 主题合同与类型

基础层保留标准 CSS 属性、关键字、单位及选择器等 builder 能力，没有预设 Token。系统两套主题从该基础扩展，采用相同类别/键集合与合法值种类，默认 light。保留既有语义，补真实需要的表面、文字、边界、焦点、主色前景配对与反馈配对；不批量制造无人消费的状态 Token。用户从基础层扩展的主题不必包含系统预设键。

语义清单逐条记录用途、配对关系、亮暗值、类别和验收示例。组件私有 Token 留在组件库；布局零值、百分比和业务计算值不机械 Token 化。

Theme 保留 definition/resolved/namespace/ref/variable。definition 保存别名，resolved 保存解析值；它可能含 calc/外部 var/相对单位，不等于 computed style。推荐删除 tokens 别名，同步 DefaultTokens 与全部消费。

同类别 tokenRef 检查缺失和循环；源值改变后别名重算；覆盖别名本身则断开该引用。派生用确定性普通函数，不增加任意 getter 图。默认颜色有配对验收，任意用户品牌色不宣称自动满足可读性。

类型键精确、值适度拓宽。extend 自动推导，override 捕获未知键，数字键规范化。fontWeight/lineHeight 合法联合值与别名递归预算在类型、覆盖、切换中一致；不能把 string | number 错误缩窄为 string。

兼容规则分别定义：系统两套 schema 一致；活跃 scope 切换须满足已经承诺的键和值种类；绑定只校验实际消费需求。额外键不自动扩大既有 typed css，改变 schema 时显式建立新入口/作用域。初始化为扩展主题后不能切到缺失扩展键的系统主题。

纯 Token 引用消费在切换时只更新变量，不重跑 factory、不换 class；resolved 参与 JS 计算的消费需要响应式重算，分别验收。scope patch 在父切换后保留，父子关系由 fork 明确建立，DOM 嵌套不自动建立 JS 父子。

## 6. 内部职责与所有权

| 单元               | 主要职责                               | 不应承担                |
| ------------------ | -------------------------------------- | ----------------------- |
| css                | 载体、校验、有序 StyleProgram、序列化  | DOM 生命周期、请求状态  |
| theme              | schema、别名、不可变快照、scope 与兼容 | 存储/系统偏好、组件注册 |
| binding            | 实例结构历史、提升、快照提交           | 重建主题、解析 Svelte   |
| registry/resources | 规则共享、引用、资源所有权、顺序       | 决定组件挂载、重排声明  |
| sheet/variables    | DOM/内存输出、目标隔离、变量通道       | 第二套主题合并          |
| compiler/adapter   | 身份、响应式/生命周期、请求收集        | 提前执行任意业务函数    |

runtime 拥有 registry/sheet；绑定拥有历史和规则引用；元素消费拥有订阅和变量写入；scope 拥有状态和子 scope；Provider 仅拥有自己的输出/订阅；请求拥有 collector/runtime 直到渲染或流结束。

主题准备与校验共用，DOM bind 与 SSR Provider 的必要差异保留。服务端规则不能随组件销毁提前释放。不为了合并代码制造一个到处判断环境的大函数。

同步 css 求值上下文用 try/finally 恢复嵌套状态，不跨 await；异步请求上下文隔离不得依赖全局 activeEvaluation。缓存、监听、身份映射均需明确创建者与清理时机。

## 7. 动态 CSS、组合与层叠

首次静态；安全值改变才提升；多个独立安全位置可分别提升；结构变化或不能证明等价时换完整规则。CSS-wide 关键字、无效值、简写/回退、后代关系按语义判断，不按字符串长短或变化频率判断。

保留声明顺序与重复声明，不为哈希复用排序声明。提升不得改变继承、无效声明丢弃、important 与条件语义。哈希用于索引/标识，冲突处理需要可验证策略。

多 class 不承诺右侧覆盖；来源顺序稳定，不依赖挂载或异步到达。明确覆盖通过 layers 和原生 specificity。外部普通 class 共存，无必需 merge/recipe API。

实例历史有界；新引用先取得、旧引用后释放；class 不变而 revision 改变仍传播变量。跨未编译第三方组件的提升不得作无条件保证，支持范围、回退或诊断必须清楚。

slotProps 合同留在 svelte，明确受控属性、事件、style/class 和节点引用；core 不认识 slot 名称。编译后的原生属性/指令行为与未接入 ZUI 的对照一致。

## 8. 编译器先修语义

加入已复现的 marker 文本误判、source map 行列失败用例。用 AST 和协议证据识别编译产物，保留重复编译保护和旧协议诊断；改写保留原表达式源码区间。

覆盖 spread/getter/事件/bind/style:/class:/attachment 的顺序与次数，以及普通 helper、typed css、模块重导出、动态 chunk、列表/snippet/await/错误边界、真实 HMR。不能仅断言生成代码合法或带 hot.dispose。

不承诺任意异步调用图。优化 controller 数量和重复求值必须在行为与源映射通过之后，不把编译复杂度转嫁成用户注解。

## 9. 输出后端与性能

先固定真实浏览器基准，再将全表排序改为持久有序索引，逻辑规则与物理 style 分片分离。分片容量有界，按受影响范围更新；优先现有 HTMLStyleElement 路径，不同时引入另一份未验证后端。

验证删除/空洞、nonce、顺序、SSR metadata、接管和外部 CSS。不能把全表字符串重写包装成节点数优化。协议改变时 compiler/runtime/SSR 同步升级，无无限双协议兼容。

保留 inline/stylesheet 双变量通道，后者用于严格 CSP。基准覆盖 1,000 静态实例、1,000 动态实例多轮更新、10,000 稳定更新、100 次主题切换、100 轮挂载销毁、独立目标及大 schema 的 TS/LSP 成本。

固定环境比较 p50/p95；跨设备硬判资源数量与持续增长，不承诺任意机器相同毫秒数。性能门槛在改后端前锁定，不事后放宽到刚好通过。

## 10. SSR、首屏与边界

默认无偏好亮色，服务端已知暗色直接输出暗色；客户端从相同快照接管。宿主同步 color-scheme。Cookie/localStorage/system 显式接入，core 导入不注册监听器。

无 JS 首屏、请求并发隔离、异常/取消释放、prerender、严格 CSP 是硬门槛。本地存储在禁 JS 时不可读，不承诺该偏好恢复。需要本地偏好首帧生效时验证可选初始化脚本和预输出 CSS；默认路径不依赖脚本。嵌套亮暗边界不能被外层选择器穿透。

数据流式与首次晚到新 CSS 分开验证。CSS 应在依赖内容展示前到达，或采用明确缓冲；不能第一段 head 输出后假定再无新规则。背压、取消、错误页、redirect、handle 组合、多根和晚到接管一并覆盖。

style/script 边界转义、nonce、变量保留命名区与局部选择器约束需要测试。raw 保留未来 CSS，不意味着关闭结构边界校验；core 不承诺充当任意不可信 CSS 的沙箱。

## 11. 错误、迁移与依赖

误用提供稳定 code、必要来源/Token 路径和 cause，不公开大量内部异常类。准备失败保留旧快照；提交后的通知/清理失败明确已提交状态并继续清理。后端拒绝删除要报告残留，不能宣称所有 DOM 输出可全局回滚。

推荐迁移：css 第二参数 → createCss；tokens → resolved；scope.update/override → setTheme/setOverrides；runtime.theme → defaultTheme；直接构造 StyleBinding → runtime.binding。改名前检查迁移量和实际收益，用户确认后执行。

包尚 private，优先一次迁移仓库和独立包 fixtures，不长期保留重复别名。每批可构建；扫描源码、编译产物断言和包外消费，不只改 imports。内部协议升级联动服务端和客户端构建。

不新增主题框架、deepmerge、偏好 manager 或插件依赖。继续使用现有专项依赖；类型依赖/Node-only 代码不得进入浏览器执行路径，tarball 声明依赖必须可解析。

## 12. 单一实施路线

| 批次 | 工作                            | 主要验收                            | 退出标准                                    |
| ---- | ------------------------------- | ----------------------------------- | ------------------------------------------- |
| P0   | API 分级/改名讨论、基线和迁移表 | A01/A02/A39；全台账校正             | 用户确认 API，每个变更有案例和迁移位置      |
| P1   | 编译语义、映射、真实 HMR/chunk  | A06–A08/A11–A15/A34/A35             | R2 缺陷消除，原生行为对照通过               |
| P2   | 主题类型、校验/输出职责、双主题 | A21–A24/A36                         | 推导、切换、嵌套/多目标、别名与故障合同一致 |
| P3   | 绑定/资源所有权、层叠、输出规模 | A03–A05/A09/A10/A16–A20/A25/A32/A38 | 双通道等价、缓存/分片有界、DOM 预算通过     |
| P4   | SSR 首屏、晚到 CSS、接管、CSP   | A26–A31/A33                         | 无 JS、请求隔离、流/错误页/多根通过         |
| P5   | API/类型/体积快照、独立包与文档 | A37/A40，复验全部 A01–A40           | 同一候选 SHA 的完整矩阵与产物闭合           |

P0 不一次重写全仓；P1–P4 按相关模块迁移。P2/P3 改动协议时立即补 SSR 回归，不等 P4 才发现破坏。现有关键回归保留，增加行为对照；失败测试不得删除以换取绿色。

完成条件：没有已知实例串值、层叠漂移、请求污染、必需首屏缺样式、接管误删或持续资源增长；已承诺 API 的类型负例与独立包消费通过；必需矩阵有同一 SHA 证据。否则如实保持部分完成。

## 13. 文档和执行规则

本文是当前统一讨论/实施入口；core-acceptance.md 是验收账；implementation.md 记完成记录；handoff.md 记恢复点。旧主题研究/完整规划是背景，不再独立扩张 T/R 路线。

本轮待审阅的选择：候选改名和重复值入口删除；编译工具导出内收；schemes 校验先内置、双方案输出按首屏目标选择实现。未确认部分不可在后续当作用户已批准。

本地用 WebStorm/已验证 LSP 与针对性测试，完整验证交 CI。每个可构建阶段中文提交推送，下次推送前检查上一轮，不等待新 CI。用户已取消 token/周额度保留线和定期检查要求，不再主动轮询用量；性能预算、缓存上限和产品资源约束继续有效。

## 14. 工具能力与阶段验证

2026-09-18 本机实测记录见 [语言服务与工具能力](language-services.md#当前任务工具实测与使用分工)。每个新会话重新发现可调用工具，按当前任务做最小探针；注册、连接、项目定位、语义正确、完整验收分别报告。

| 工作                  | 首选工具及证据                                                                                     | 边界与回退                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| P0 API/类型迁移       | LSP hover/definitions/references/completions；逐文件 diagnostics；WebStorm 项目检查                | IDE 空错误列表不能独立证明类型正确，文件未纳入 tsconfig 时另补相关模块检查 |
| P1 Svelte 编译接入    | 官方 Svelte MCP 文档与 autofixer；原生 LSP；针对性行为/映射测试                                    | autofixer 不替代 TS 项目语义；真实 HMR 只做局部复现，完整矩阵进 CI         |
| P2 主题推导           | 临时类型正负例、LSP；Chrome DevTools 计算样式/控制台                                               | 要证明能报错且修正后清零，不能仅看补全                                     |
| P3/P4 DOM、首屏、接管 | Chrome DevTools 优先检查 DOM/CSS/网络；Browser Use 用于交互；必要时 Computer Use 检查 IDE/原生窗口 | 不用桌面坐标代替已有 DOM 工具；本地只验证相关变化；全浏览器/SSR 矩阵在 CI  |
| P5 交付与回归         | GitHub MCP 读取提交/PR；gh 读取 Actions 结果与失败日志；脚本检查生成与 tarball                     | 不将连接成功写成 CI 通过；下次推送前查上一轮，新推送不等待                 |
| 源码研究              | GitHub MCP 读取固定提交，Context7 先 resolve 再 query；Svelte 问题优先官方 MCP                     | 只有源码/文档证据与当前需求对应时才引入能力                                |

工具失败时先记录失败层：未暴露、启动失败、连接失败、无项目、调用失败、结果不完整；只对该层处理，不反复重装或修改无关配置。独立 MCP 客户端是原生工具缺席时的回退，不能伪称当前任务已原生加载。

浏览器只操作本任务页面，关闭测试页、释放临时视口/模拟和探针文件；Computer Use 使用已读取技能和真实窗口观察，不操作终端或借 UI 执行命令。当前截图读取成功不等于所有键鼠注入能力已验证。

## 15. 已确认的基础主题与预设关系

用户明确选择：基础层只有标准 CSS 能力；系统亮色、暗色主题由它扩展；用户既可以 extend 基础层，也可以 extend 亮色或暗色。不保留一份要求用户填满的系统 Token 空壳。

```text
CSS 生成元数据：属性 / 标准关键字 / 单位 / builder 辅助能力
  + baseTheme：空 Token、无视觉值
      ├─ extend → lightTheme → 用户扩展
      ├─ extend → darkTheme  → 用户扩展
      └─ extend → 用户完全自定义主题
```

baseTheme 为候选公开名称；实现可复用 defineTheme({})，不引入新主题类型或独立 CSS 语法。CSS 元数据属于 builder，不能复制进每个主题的 tokens。基础主题是可用的空 Token 主题，不是尚未完成的值模板。

```ts
// 规划形态，baseTheme 导出尚未实现。
const plainCss = createCss(baseTheme);
plainCss((s) => {
  s.display.flex;
  s.width.px(240);
  s.color('rebeccapurple');
  // s.color._primary 应为类型错误：基础主题没有预设 Token。
});

const customTheme = extendTheme(baseTheme, {
  color: { ink: '#172554', paper: '#fffdf5' },
  spacing: { gutter: '18px' },
});
const customCss = createCss(customTheme);
customCss((s) => {
  s.color._ink;
  s.backgroundColor._paper;
  s.gap._gutter;
});
```

应用默认 css 与未指定 theme 的 runtime 继续使用 lightTheme；显式选择 baseTheme/customTheme 时必须尊重其空/自定义 schema，不补入 lightTheme 的键或变量。createCss/runtime/SSR 必须配置兼容主题，编译接入不能在默认泛型处悄悄恢复 DefaultTokens。

内置预设实现建议从基础层分别 extend，共用无视觉倾向的类别定义与适用的尺度数据，两套颜色表独立可审阅；不将暗色实现绑定到亮色新增字段的隐式继承。系统两套 schema 一致性继续验收。

用户从基础层扩展的主题不强制实现 primary/surface 等系统键。消费方只要不依赖这些键即可使用；已有系统主题组件若依赖缺失 Token，要明确报兼容错误，不静默补亮色或注入 undefined。若需要兼容该组件，可由用户补充它所需的 Token/映射。

自定义主题名称不限于 light/dark；名称与宿主 color-scheme 分离。同 scope 切换仍满足它已承诺的键和值种类，完全不同 schema 应建立独立 typed css/scope。

新增验收：基础层标准关键字/单位可用且不输出主题变量；基础层不存在系统 Token 补全；扩展只增加用户键；亮暗预设从基础构建且结构一致；用户主题独立 runtime、SSR 禁 JS、hydration、包外类型消费均不偷带默认主题。分别纳入 P2、P4、P5。
