# Core 当前合同

本文合并早期 core、组合、类型、主题和生产规划，保留已经选择的方案。通用引擎签名见 [core README](../core/README.md)，UI Token 与尺度见 [Svelte README](../svelte/README.md)；编译与宿主配置见 [svelte README](../svelte/README.md)；验收范围保留 [A01–A40](core-acceptance.md)。

CSS 属性对象现已不可调用，第三层提供关键字/单位、严格 token 与开放 raw；类型/悬停/生成器和模块整理见 [实施记录第 18 节](svelte-components.md#18-coresvelte-属性对象类型体验与模块整理)。没有独立组件 Token/变量层。

## 样式求值与组合

css(factory) 返回原始 string。@zui/core 的入口只含标准 CSS，@zui/svelte 的入口绑定内置亮色主题；自定义主题使用 core.createCss(theme, options)。factory 同步执行并返回 void，if/switch/循环/普通 TS 函数保持 JS 语义。推荐模板内 class={css(...)}，复杂或复用逻辑再提取函数。

普通值初次静态。同一绑定发现安全值变化才提升；不因存在 $state 而提前参数化常量。结构、目标或值无法证明等价时换完整规则；CSS-wide、转义、重复回退声明、简写/继承等保持保守处理。声明顺序不为哈希去重而排序。

多个 class 正常组合，**不承诺字符串右侧覆盖左侧**。来源顺序不依赖首次挂载、模块到达或重挂；明确优先级使用原生 specificity 与显式 layers。同来源不同变体也不以拼接顺序表达覆盖。

模块常量保持初始化快照语义；组件 const 不是自动变化的字符串，需要响应式计算时使用模板或 $derived。跨未编译组件转发 class/slotProps 使用完整规则，不假设对方能够消费内部变量；组件必须实际转发属性。

## 类型与主题

csstype + TypeScript Compiler API + CSS schema 生成属性载体和运行时表，二者共用数据。生成输入为已安装的锁定依赖，输出稳定，不依赖抓网页或机器绝对路径。generate:check 比较内容并报告属性/关键字/单位/Token 映射；不能把未映射语义的属性当作不支持，也不能让未知能力变成 any。

- baseTheme 是 defineTheme({})，标准 CSS 关键字/单位不依赖主题 Token。
- 属性的 token 方法严格接受系统值与当前类别的 `_主题键`；raw 方法提供相同候选并开放字符串，仅将已存在的完整主题键转为引用。两种方法与成员访问共用声明/依赖记录，操作返回 void；s.raw/s.set 可强制原样写入，复合 CSS 不做片段替换。
- lightTheme/darkTheme、五档尺度和 DefaultTokens 属于 svelte 包，从 core.baseTheme 分别扩展，schema 一致。core runtime 默认空主题；Svelte 自动宿主/SSR 默认亮色，显式自有 schema 不混入 UI 键。
- defineTheme 从零定义；extendTheme 新增键并兼容覆盖；overrideTheme 只覆盖已知键。tokenRef 只引用同类别，缺失/循环报错，长别名链迭代解析。
- definition 保存原定义，resolved 保存解析值，ref/variable 返回 CSS 引用与变量名。resolved 可能含 calc/外部 var，不等于 computed style。
- ThemeScope 用 setTheme/setOverrides/fork 管理切换；schema 以创建时为准。先验证子树再提交，重入更新跳过过期通知；父子关系由 fork 建立，不由 DOM 嵌套隐式建立。
- 纯 Token 引用只改变量、不换消费 class。resolved 参与 JS 运算时由调用方响应式重算。
- Theme 的 colorScheme 元数据处理原生控件颜色方案。偏好读取、Cookie/localStorage/system 选择属于宿主；导入 core 不注册监听或存储单例。

## 所有权与异常

| 所有者        | 持有内容与释放点                                          |
| ------------- | --------------------------------------------------------- |
| runtime       | registry、sheet、绑定和全局资源；dispose 统一释放         |
| 动态 binding  | 结构历史、规则引用、快照与订阅；dispose/release           |
| 元素消费      | class 引用、变量写入与订阅；解除绑定不越权销毁调用方对象  |
| ThemeScope    | 当前主题、局部覆盖、fork 子级与订阅；dispose 递归释放子级 |
| StyleProvider | 自己的规则与订阅，不销毁传入 scope                        |
| 模块定义      | 只读静态定义，由模块/HMR 和实际消费者持有                 |
| SSR 请求      | collector/runtime，到渲染或流结束、异常、取消时释放       |

新引用先取得、旧引用后释放。准备/写入失败保留旧快照；提交后通知/旧资源清理失败，当前快照已是新版，仍继续其他清理并上报。不能承诺后端拒绝删除时所有物理 CSS 都能回滚。

哈希只作索引，复用仍核对完整内容；同模块、跨模块与绑定碰撞均拒绝，不静默共享错误样式。用户 factory 异常保持原对象；CSS/主题/协议接入错误按已公开 StyleError code 分类。

同一 Document/ShadowRoot 的独立 runtime 使用不同 namespace。变量名编码隔离主题与实例；同文档 @property 注册协调冲突，但不扫描应用在 ZUI 外注册的同名属性。

## DOM、SSR 与编译

浏览器与 SSR 使用最多 64 条逻辑记录的分片，单条更新只重写相关分片；删除会合并相邻稀疏分片，不跨外部 DOM 节点移动 CSS。stats.styleEntries 是逻辑条数。自定义后端实现同步 set/remove/entries/dispose。

协议当前为 8；升级必须同步重建 core、适配器、SSR 与客户端。接管前原子校验版本、顺序、长度和 nonce，计入 HTML 换行归一化。首轮消费者就绪后 finishHydration，再释放未认领规则。

Svelte 编译器以 AST/协议识别已转换源码，保留原表达式跨度与 source map；属性表达式由 Svelte memo，legacy 不被强制变成 runes。真实 HMR 验证修改、删除、恢复及回收；被替换组件遵循 Svelte 原生重建语义。

SSR 使用 renderStyled 或 Node SvelteKit createStyleHandle，请求隔离，不共享可变 runtime。缺少 collector 时实际消费样式立即报错。Kit 等 HTML done 后插入完整首屏 CSS，之后延迟数据继续流式；明确区分 HTML 缓冲与延迟数据流，不承诺已发送 head 后任意异步新 CSS 的首屏注入。

默认 inline 变量通道；严格样式 CSP 使用 stylesheet 与同请求 nonce。宿主框架自带样式仍遵循它的 CSP 合同。支持 Portal、ShadowRoot、多根、禁 JS、prerender；不宣称 CJS、非 Node Edge SSR、全部历史浏览器或 Safari 真机均已验收。

## 参考取舍与取消项

保留的机制：Tailwind 的值/引用区分，UnoCSS 的明确合并与条件顺序，MUI 的变量输出和首屏选择分工，Chakra 的前景/背景角色，Naive UI 的公共主题先合并、组件值后派生。未引入这些库。

历史源码依据：[Tailwind Theme](https://github.com/tailwindlabs/tailwindcss/blob/41d9cae8e53378d16087fcf359eb785c2fd42ce4/packages/tailwindcss/src/theme.ts)、[UnoCSS 合并](https://github.com/unocss/unocss/blob/93b642097a367f7e39a17bfcc386f52ef21442bd/packages-engine/core/src/config.ts)、[MUI CSS 变量](https://github.com/mui/material-ui/blob/dc06362fe023de533614d3b4b6985f83e1e8d885/packages/mui-system/src/cssVars/prepareCssVars.ts)。这些固定提交记录当时设计依据，不表示其最新状态。

已取消：必需 schemes 工厂、第二套主题 controller、通用 recipe/条件 Token DSL、css.parts/公开样式句柄、自动响应式来源分析、任意 JS 零运行时提取、长期保留同义 API 别名。

迁移：css 第二参数 → createCss；tokens → resolved；scope.update/override → setTheme/setOverrides；runtime.theme → defaultTheme；bindingCount → stats.bindings；宿主通过 runtime.binding 获取绑定。内部 @internal 导出只供同版本编译桥，不作为业务扩展承诺。
