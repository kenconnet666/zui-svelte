# Core 主题生产合同与源码参考规划

状态：2026-09-18 讨论稿。分类结构、内置亮暗两套、默认亮色、用户 extend 自动推导类型、主题切换纳入首版，均已由用户确认。本文的新增 API 和细化合同仍待讨论，不代表已实现；本轮不修改产品代码。它细化 core-types-theme.md 和 core-remaining-plan.md 的主题部分，不替代 A01–A40 整体生产验收。

## 1. 源码依据与吸收范围

阅读时固定提交，避免移动分支让结论失去依据。这些是研究快照，不表示要安装三个库，也不是版本升级建议。

| 项目     | 固定提交                                 | 实际阅读的文件与机制                                                                             | ZUI 的取舍                                                                                                                      |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Tailwind | 41d9cae8e53378d16087fcf359eb785c2fd42ce4 | theme.ts 的 DEFAULT/INLINE/REFERENCE/STATIC/USED、add、resolve、resolveValue、命名空间处理       | 区分默认值与用户覆盖、解析值与变量引用；记录 Token 使用需求。公共主题变量首版完整输出，不能把构建期裁剪直接用于运行时动态消费者 |
| UnoCSS   | 93b642097a367f7e39a17bfcc386f52ef21442bd | config.ts 的 sources、mergeThemes、mergeConfigs；variants.ts 的断点解析与 parentOrder            | 合并顺序明确、输入不变、扩展组合可预测；响应式条件要有边界和排序合同。继续使用普通 TS 函数和既有 builder                        |
| MUI      | dc06362fe023de533614d3b4b6985f83e1e8d885 | prepareCssVars、cssVarsParser、useCurrentColorScheme、InitColorSchemeScript、createThemeWithVars | 分离定义/变量/方案选择/首屏初始化；默认方案先输出；区分选择偏好与实际方案；存储失败有回退；初始化脚本有安全序列化和 nonce       |

源码链接：

- [Tailwind Theme](https://github.com/tailwindlabs/tailwindcss/blob/41d9cae8e53378d16087fcf359eb785c2fd42ce4/packages/tailwindcss/src/theme.ts)
- [UnoCSS 配置合并](https://github.com/unocss/unocss/blob/93b642097a367f7e39a17bfcc386f52ef21442bd/packages-engine/core/src/config.ts)
- [UnoCSS 条件变体](https://github.com/unocss/unocss/blob/93b642097a367f7e39a17bfcc386f52ef21442bd/packages-presets/rule-utils/src/variants.ts)
- [MUI 变量与方案输出](https://github.com/mui/material-ui/blob/dc06362fe023de533614d3b4b6985f83e1e8d885/packages/mui-system/src/cssVars/prepareCssVars.ts)
- [MUI 变量解析](https://github.com/mui/material-ui/blob/dc06362fe023de533614d3b4b6985f83e1e8d885/packages/mui-system/src/cssVars/cssVarsParser.ts)
- [MUI 方案状态](https://github.com/mui/material-ui/blob/dc06362fe023de533614d3b4b6985f83e1e8d885/packages/mui-system/src/cssVars/useCurrentColorScheme.ts)
- [MUI 首屏脚本](https://github.com/mui/material-ui/blob/dc06362fe023de533614d3b4b6985f83e1e8d885/packages/mui-system/src/InitColorSchemeScript/InitColorSchemeScript.tsx)
- [MUI 主题构建](https://github.com/mui/material-ui/blob/dc06362fe023de533614d3b4b6985f83e1e8d885/packages/mui-material/src/styles/createThemeWithVars.js)

不照搬的具体机制：MUI 解析器按路径对部分数值追加 px，ZUI 继续要求长度值明确带单位；UnoCSS 的通用深合并不替代 ZUI 的类别/Token 两层语义合并；Tailwind 的 namespace 清空不直接用于活跃主题，删除必需 Token 属于 schema 变更。MUI 的两个初始化入口默认模式并不完全相同，ZUI 所有入口统一默认 light。

## 2. 现有实现与实际缺口

已有：lightTheme/darkTheme、defineTheme/extendTheme/overrideTheme/tokenRef、createCss、ThemeScope、bindTheme、StyleProvider、变量双通道、SSR 主路径。darkTheme 当前由覆盖 lightTheme 生成，两者共享键结构。

主要缺口：

1. 系统语义不全：primary 缺 hover/active/subtle，反馈色缺成对背景/文字/边界；默认值尚需配对验收。
2. 两套用户扩展主题缺集中、双向的键集合和值种类一致性检查。scope.update 目前相对于最初基准检查兼容，不等于完整的两方案合同。
3. 属性生成覆盖不等于单位/Token 映射完整；fontWeight/lineHeight 的字符串和数字兼容策略需统一。
4. 别名链超过类型递归预算后会退化为 string | number；需要审计后续 WidenTokens/ThemePatch 是否错误缩窄，不能把联合类型误当成 string。
5. 默认亮色、选暗色、保存偏好、SSR 首屏和 hydration 缺统一的一致性合同。
6. ThemeScope 的定义校验与 JS 状态提交有事务设计，但多个 DOM 订阅者写入失败不等于整棵 DOM 自动回滚；需明确并测试故障语义。
7. 主题切换的真实 DOM 工作量、嵌套/独立目标和大 schema 类型成本仍需量化。

## 3. 系统主题形态

继续保持 Theme<Category<Token, Value>> 的两层结构，系统导出 lightTheme、darkTheme 和 DefaultTokens。默认 css/createRuntime 沿用亮色；未显式选择 system 时不跟随系统暗色。

两套主题采用同一份语义清单与值种类。共用尺寸、排版、动画等基础定义，暗色显式覆盖需要改变的值；不复制两份独立的 Token 名单，也不限制用户的暗色方案只能改颜色。

建议补齐的系统语义：

| 类别                                                    | 建议内容                                                                        | 约束                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| color                                                   | background、surface、surfaceRaised、surfaceSunken、surfaceHover、surfaceActive  | 表面层级与交互状态分开，不用单个背景承担全部用途              |
| color                                                   | text、muted、textDisabled、textInverse、border、borderStrong、focus             | 正文/次要/禁用文字、边界和焦点有明确用途                      |
| color                                                   | primary、primaryHover、primaryActive、primarySubtle、onPrimary、onPrimarySubtle | 实色按钮和柔和底色需要不同的前景色                            |
| color                                                   | success/warning/danger/info 及其 Subtle、Border、onX、onXSubtle                 | 每种反馈角色按固定清单补齐，配对验证；已有 danger 命名保留    |
| spacing                                                 | none、xs、small、medium、large、xl                                              | 保留现有尺度，按实际需求补极小/极大尺度，不发布无限自动数字键 |
| size                                                    | controlSmall、control、controlLarge、iconSmall、icon、iconLarge                 | 组件共享尺寸语义，不加入 Button 私有字段                      |
| radius、borderWidth、shadow                             | 常用圆角、边框、浮层阴影                                                        | 暗色允许用不同阴影，不能只反转背景                            |
| fontFamily/fontSize/fontWeight/lineHeight/letterSpacing | 共用排版尺度                                                                    | 不把字体大小与复合 typography 对象混进一个 Token 值           |
| duration/easing/opacity/zIndex                          | 时长、曲线、禁用透明度、浮层层级                                                | opacity 有范围校验；zIndex 有数值合同；零时长用于减少动画     |
| breakpoint                                              | 已有 small/medium/large                                                         | 作为生成条件的配置值；不能承诺 var() 可直接用于 media 条件    |

最终键表先审阅再写入默认主题。类型从数据推导；重复反馈角色可以用简单脚本生成可审阅输出，视觉颜色值仍需人工确定，不能由脚本臆造。

不自动保证用户任意自定义颜色的可读性；默认系统主题的正文/背景、实色/前景、焦点与反馈组合必须有真实计算样式和视觉验收。

## 4. 用户扩展与推导

已有 API 继续作为主路径：

```ts
import { createCss, darkTheme, extendTheme, lightTheme, tokenRef } from '@zui/core';

const extension = {
  color: { chartLine: tokenRef('color', 'primary') },
  spacing: { panelGap: '20px' },
};

export const appLight = extendTheme(lightTheme, extension);
export const appDark = extendTheme(darkTheme, extension);
export const css = createCss(appLight);

// 新键由 extend 推导，无须全局声明合并。
css((s) => {
  s.color._chartLine;
  s.gap._panelGap;
});
```

默认两套主题只要求系统键一致。用户要在两套方案间切换时，应给两套方案增加兼容的扩展键；只扩亮色却切到未扩展的暗色必须有明确错误。

建议只新增一个纯校验/推导函数，名称暂定 defineThemeSchemes：

```ts
// 待实现的提案 API；不是当前可调用代码。
const themes = defineThemeSchemes({
  light: appLight,
  dark: appDark,
});

const css = createCss(themes.light);
```

返回只读的 { light, dark }，不创建 runtime、scope、监听器或存储。两方案 namespace、类别、键集合和值种类一致；值本身可以不同。检查必须双向进行，错误定位到方案/category/token；JS/JSON 消费也要有运行时校验。

类型按 light 的键集合校验 dark，不能用两者宽泛联合或共同键交集抹掉缺失键。定义时兼容的值种类同时用于 ThemePatch、扩展、切换校验；fontWeight/lineHeight 等联合值需要统一合同而非分散 typeof 假设。用户仍能独立使用单个 Theme，无须创建方案集合。

自定义类别继续使用 createCss(theme, { tokenMap })；映射明确替换目标属性默认类别。属性值、关键字、单位调用不受影响。系统主题不内置用户业务类别。

## 5. 解析值、别名与派生

三种表示保持明确：definition 保存别名和原始定义，resolved 保存解析后的 Token 值，ref 返回 CSS 变量引用。tokens 为现有 resolved 别名，暂时保留兼容，不另存一份状态。

resolved 不等于浏览器 computed style：其中的 calc()、外部 var() 或相对单位仍由浏览器求值。

顺序固定为：系统定义 → 用户 extend/override → 完整别名解析 → scope patch → 对当前 scope 再解析 → 输出变量。覆盖源 Token 后，仍引用它的别名重新解析；别名自身被显式覆盖后不再联动。只有显式 tokenRef 参与依赖图。

例如上面的 chartLine 在亮暗方案中分别引用各自 primary；把 chartLine 覆盖为固定字符串后，primary 再变不应重写它。

维持同类别别名，检查缺失目标和循环，错误包含完整链。类型递归预算耗尽不表示运行时接受循环；运行时仍完整检查。很长链要有可控实现和异常，不能依赖 JS 栈溢出。

品牌派生继续是普通纯函数：输入品牌/方案/密度，返回明确的 Theme/patch。core 不承诺从一个 primary 自动推导全部可访问性合格的颜色，也不引入每 Token 任意 getter。复杂颜色算法在选定需求后再选专项依赖。

## 6. 切换 API 与所有权

使用既有 API，不添加第二套 controller：

```ts
const scope = new ThemeScope(themes.light);

scope.update(themes.dark);
scope.update(themes.light);

const local = scope.fork({ spacing: { panelGap: '12px' } });
// fork 的 patch 在父主题切换后继续生效。
local.override({ spacing: { panelGap: '16px' } });
```

scope 必须在应用实例/请求上下文中创建。可以模块级共享不可变 themes/css 工厂，SSR 不得模块级共享可变 scope 或 DOM runtime。

StyleProvider 继续只消费 scope；重复使用同一 scope 的多个目标同步更新，Provider 卸载不销毁调用者拥有的 scope。Portal 显式绑定主题；ShadowRoot/跨 Document 使用正确目标 runtime，不能依赖 DOM 继承自动穿越。

主题模式属于应用选择状态，普通函数将 light/dark 映射到 themes 后调用 update。core 不自动写 localStorage/Cookie，不默认订阅系统偏好，不因 import 增加监听器。system 可以由应用显式解析成 light/dark，密度/对比度仍用普通主题工厂组合。

切换必须同步影响容器 color-scheme，使原生控件/滚动条与实际方案一致。建议把该属性作为宿主方案元数据处理，不把 mode 字符串塞进 color Token 类别。Svelte 宿主及 SSR 输出使用同一个已解析方案；具体适配入口在 T3 一并定稿。

主要性能合同：仅使用 Token 引用的组件不重新求值其 css factory、不更换样式 class；主题容器更新变量即可。读取 resolved 后执行普通 JS 分支的样式需要业务响应式重新求值，不能宣称同样零求值。

## 7. 首屏、持久化与双方案输出

首版强制验收的默认路径：无偏好时服务端/客户端均亮色；服务端拿到用户保存的 dark 时，在输出 HTML 前选择暗色；客户端从同一个初始快照接管，不能先亮后暗。Cookie 的读写由宿主应用负责，core 不绑定具体存储。

同时规划可选的双方案 CSS 输出，保持默认亮色：

1. 同一个目标输出 light/dark 完整变量集合，稳定规则顺序，公共命名一致。
2. 显式方案标记决定生效集合；没有标记时落在 light。
3. 从只更新当前变量的默认路径切入该优化，不改变 scope.update 的调用形态；内部必须只在快照确实属于已注册方案时选择预输出规则，任意 patch 仍走正确的变量写入。
4. 嵌套边界必须阻止外层 dark 选择器穿透覆盖内层 light。不能只拼接 [data-theme=dark] 的后代选择器。
5. 每个独立主题边界输出完整解析变量或语义等价结果；只输出与 light 不同的少数值可能泄漏父级主题值，优化前必须证明正确。
6. 如果启用本地存储，首屏选择脚本、Provider 和 SSR 必须共用默认值、标记与键。脚本放在首次绘制前，处理存储拒绝/无效值、脚本内容转义和 CSP nonce/hash；不能保证脚本被 CSP 拦截时仍读取本地偏好。
7. 默认路径不依赖初始化脚本。仅 localStorage 的偏好在禁 JS 时无法读取，不能宣称该场景无 JS 暗色恢复。system 如启用，可通过 media 对预输出 CSS 做视觉选择，但 JS 状态接管还需独立一致性验证。

双方案输出列入首版支持矩阵中的显式能力，但不要求所有消费者采用；初始化脚本/存储适配属于 Svelte/宿主接入，core 负责纯方案校验与 CSS 输出，公共名字待适配原型后确定，避免先锁定错误的 scope/选择器双重状态。

## 8. 变量协议、输出与异常

公共 theme.variable/theme.ref 的命名稳定、可供普通 CSS 使用；保留现有 namespace 和分段编码。内部动态绑定变量与公共主题变量的命名域分离。

首版输出已注册主题的完整变量集合，支持延迟模块、外部 CSS 和运行时扩展消费。借鉴 Tailwind 的使用记录用于依赖检查和诊断，不直接按当前挂载节点裁剪公共变量。后续按需输出必须成为显式合同，并处理依赖闭包与晚到消费者。

颜色方案、共享变量、局部 patch 的样式资源遵守同一引用与目标所有权，不能无限追加 style。严格 CSP 的 stylesheet 变量通道同样覆盖主题切换。

先验证 namespace、schema、别名与值，再变更状态。JS 状态提交与 DOM 输出故障分别说明：订阅通知后发生写入失败时，保留可诊断的已提交状态，继续必要清理，支持重试/重新绑定；不虚称所有第三方样式表后端可原子回滚。内部可控写入尽量先准备后替换。

## 9. 扩展及职责边界

默认系统预设可直接使用；用户通过 extend 定义自己的语义，不必接入插件协议。样式复用继续普通 TS 函数，条件使用 _selector/_media/_supports/_container。Tailwind/UnoCSS 共存通过明确 layers 和公共变量映射，不生成它们的工具类。

借鉴 UnoCSS 的条件排序能力时保留用户 builder 声明顺序；自动排序只针对具有明确生成合同的响应式辅助器。断点的范围端点、单位兼容和嵌套顺序需要测试，不能把任意混合单位按 parseFloat 排序。

未来组件 Token/defaultProps/slotProps 配置留在 svelte。core 的首版范围包括全局样式、keyframes、字体、自定义属性注册的生命周期，但不因此注册组件名称或内置业务配方。

## 10. 类型与运行时验收矩阵

| 范围     | 必须证明的结果                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| 系统语义 | light/dark 键和值种类一致，常用角色完整，默认亮色，组合视觉验收                                                 |
| 类型推导 | extend 后新增类别/数字键/Token 有补全；缺失键、错误单位、类别和跨方案缺键会报错；深别名不错误缩窄               |
| 运行时   | JS 输入也能检出缺失/循环/类型变化；输入冻结，覆盖和切换不修改原定义                                             |
| 嵌套     | 父切换、子 patch 保留、别名重新解析、同一 scope 多容器、Portal/ShadowRoot/不同 Document                         |
| 首屏     | 默认亮色、Cookie 暗色、双方案预输出、可选本地偏好、禁 JS、严格 CSP、hydration 一致                              |
| 性能     | 100 次亮暗切换后资源回到稳定水平，纯 Token 消费 factory 不重跑；大 schema/多容器记录真实 DOM p50/p95 和类型成本 |
| 失败     | 子级校验失败前不提交；样式写入/订阅者失败有明确状态和恢复证据                                                   |
| 分发     | 同一 SHA 的三浏览器、独立 tarball、Node 导入无 DOM、SvelteKit 请求隔离与清理                                    |

类型负例必须检查具体错误，不能用 any 或宽索引签名消除问题。绝对性能门槛先由固定环境基线确定，资源数量和无持续增长可以直接硬验收。

## 11. 实施顺序与文件落点

| 批次 | 工作                                             | 主要落点                                                         | 退出条件                               |
| ---- | ------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------- |
| T0   | 确认语义清单、类型合同和新增纯函数               | 本文、core-types-theme.md                                        | API 讨论完成，无重复主题管理器         |
| T1   | 完整系统语义与两套默认值                         | core/src/theme/presets.ts、theme/test                            | 同 schema、默认亮色、颜色配对验收入口  |
| T2   | extend/override/别名类型收口、defineThemeSchemes | theme/types.ts、theme.ts、必要时 schemes.ts、core/tests/types.ts | 正负类型与运行时一致、包外补全         |
| T3   | 切换与宿主一致性，color-scheme、嵌套与多目标     | theme/scope.ts、svelte/StyleProvider.svelte、相关 tests          | 现有 update 合同完整、资源稳定         |
| T4   | SSR 默认路径与可选双方案输出/首屏初始化          | svelte/src/server.ts、runtime/context、Kit/package fixtures      | 无闪烁支持条件明确，CSP/禁 JS/请求隔离 |
| T5   | 真实 DOM、声明规模与变量输出优化                 | runtime/sheet、基准、类型测试                                    | 正确性不退化、性能证据可重复           |
| T6   | 公共 API 快照、指南、同 SHA 总验收               | core/README.md、design/core-acceptance.md、CI                    | 主题生产合同闭合                       |

不为这些批次创建空目录；当前 theme/css/runtime 结构继续使用。先修与阶段相关的既有 R2 编译缺陷，再对其上的主题 SSR/首屏方案作最终验收，避免以新能力掩盖已知错误。

本地仅关键验证和已接通的语言工具；完整矩阵由 CI 承担。实施阶段按批次中文提交推送，下一批检查上一轮具体结果，不阻塞等待。主题规划完成不代表 core 的 R2–R5、A01–A40 已完成。
