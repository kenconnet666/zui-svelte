# @zui/core

框架无关的 CSS 与主题系统工作区。已配置 TypeScript 构建、类型声明、Stylis 与 CSS 类型依赖。

已实现生成式属性/关键字载体、buildStyle、序列化、主题、作用域、规则注册、自动变量提升与全局资源回收。生成器覆盖 857 个属性。class 字符串编译、SSR 与独立包验收入口已建立，当前候选的生产验收状态见 [A01–A40 台账](../design/core-acceptance.md)，设计依据见 [统一重构路线](../design/core-remaining-plan.md)。

- 构建：`pnpm --filter @zui/core build`
- 类型检查：`pnpm --filter @zui/core check`
- 实现模块：`css/`、`theme/`、`runtime/`；不增加通用 recipe 或插件配置层。

## 统一入口与主题

样式、主题、预设和 runtime 均从 `@zui/core` 导入。下面是当前已实现的主题写法；`css()` 的组件/模块调用仍需接入 ZUI 编译插件。

```ts
import {
  createCss,
  createRuntime,
  extendTheme,
  lightTheme,
  overrideTheme,
  tokenRef,
} from '@zui/core';

const theme = extendTheme(lightTheme, {
  color: { brandText: tokenRef('color', 'primary') },
  spacing: { panelGap: '18px' },
});
const css = createCss(theme);
const alternate = overrideTheme(theme, { color: { primary: '#0f766e' } });

theme.ref('color', 'brandText'); // var(--z-color-brandText)，可用于复杂 CSS 值
alternate.resolved.color.brandText; // #0f766e
```

Token 别名只能引用同类别的已有键，覆盖后从完整定义重新解析；循环、缺失目标和类别错误会报错。`definition` 保留只读原始定义，`resolved` 是只读解析值，不等于浏览器 computed style。主题作用域先验证整棵子树再提交，子级别名失败不会让父级停留在半次更新状态。

订阅回调可同步再次切换主题或修改子级覆盖。新提交生效后，尚未发出的过期快照会跳过，避免消费者退回旧主题；已经开始执行的回调自行遵循普通同步函数语义。通知异常仍继续处理其他有效订阅，再统一上报。

### 无预设 Token 的基础主题

```ts
import { baseTheme, createCss, extendTheme, ThemeScope } from '@zui/core';

const custom = extendTheme(baseTheme, {
  color: { ink: '#172554', paper: '#fffdf5' },
  spacing: { gutter: '18px' },
});
const customCss = createCss(custom);
customCss((s) => {
  s.display.flex;
  s.color._ink;
  s.gap._gutter;
});
const scope = new ThemeScope(custom);
scope.setOverrides({ spacing: { gutter: '12px' } });
scope.setOverrides({}); // 替换整份覆盖；空对象恢复基础主题。
```

baseTheme 没有 primary/surface 等系统键；标准属性、关键字、单位与选择器能力不依赖 Token。系统 lightTheme/darkTheme 分别从基础层扩展，默认仍为亮色。显式自定义主题的 runtime/SSR 必须配置兼容 schema，不自动补系统 Token。scope.setTheme(theme) 只在根作用域切换；子级通过 fork 与 setOverrides 保留局部覆盖。

scope 的 schema 以创建时的合同为准，临时选择兼容的更大主题不会阻止随后切回原主题。父子关系只通过 fork 建立，constructor 不再接收 parent 参数。程序生成的 Token 字典可混用普通值与同类别引用；长别名链用迭代解析，循环错误会报告引用链。

原生颜色方案由可选元数据 `colorScheme: 'light' | 'dark'` 表达，不占用 Token 类别。`defineTheme(values, { colorScheme })` 或 `extendTheme(base, values, { colorScheme })` 可显式声明；override/继续 extend 默认保留。基础主题不声明，亮暗预设分别声明。DOM 绑定、Provider 和 SSR 共用声明生成，切换同步更新原生控件的 color-scheme；themeVariables() 仍只返回自定义变量。

### 本次 API 迁移

`css(factory, theme)` 改为 `createCss(theme)(factory)`；`theme.tokens` 改为 `theme.resolved`；`scope.update/override` 改为 `scope.setTheme/setOverrides`；`runtime.theme` 改为 `runtime.defaultTheme`；`bindingCount` 改为 `stats.bindings`。根入口标记 @internal 的工具属于同版本编译协议，不是稳定业务扩展 API。高级宿主通过 runtime.binding() 管理动态绑定，runtime.css() 持有静态规则直到 runtime 销毁。

主题定义支持 `color: { 100: '#fff' }` 这样的数字色阶键，类型会按 JavaScript 对象键归一化为字符串；可使用 `s.color._100`、`theme.ref('color', '100')` 和 `tokenRef('color', '100')`。扩展与别名遵守相同规则，数字键不能绕过类别或既有值类型检查。

`s.color._brand` 等快捷引用会记录实际 Token 需求，并在目标 runtime 使用前检查 namespace、键和值种类。仅要求实际使用的键，允许组件消费兼容主题的子集。普通 CSS 字符串及手写 var() 保留原生语义，其外部变量由宿主提供。

长度、时间、颜色等类别使用字符串，opacity/zIndex 使用数值；新增值遵守类别约束，覆盖和扩展不能改变已有 Token 的值种类。CSS 标准值的完整语法仍由浏览器解释。

宿主使用 `bindTheme(element, scope, runtime)` 可以沿用 runtime 的变量输出通道；`variables: 'stylesheet'` 时主题切换同样不写 style 属性。返回的清理函数或 scope 销毁会释放对应主题规则。

同一元素、scope 和 runtime 的重复绑定共享订阅与规则，最后一个消费者离开时释放；同一元素上同 namespace 的不同 scope/runtime 会立即报错，避免两个主题相互覆盖。嵌套主题绑定到各自的容器元素；不同 namespace 可以共存。

## 显式层级

宿主一次声明层顺序，类型化 css 入口选择所属层；未配置时保持原生无层样式。

```ts
const runtime = createRuntime({
  theme,
  layers: ['zui.components', 'zui.app'],
  layer: 'zui.app',
});
const componentCss = createCss(theme, { layer: 'zui.components' });
const plainCss = createCss(theme, { layer: null });
```

默认层作用于局部 css、普通 binding 和 global 样式，模块静态样式遵守相同规则。`null` 明确选择无层；未声明、重复或无效层名会报错。层顺序并不改变浏览器对 important 的反向优先规则，也不赋予 class 字符串从右向左覆盖语义。

同一 Document/ShadowRoot 中的独立 runtime 使用不同 namespace；也可以由多个组件共享一个 runtime。声明相同层根的 runtime 必须使用一致的完整层序。模块 class 在最终消费时会补充目标别名，以隔离不同 runtime 的样式位置；返回值和转发值仍为普通字符串。

同一 runtime 内的来源优先关系由稳定来源标识与数字源码位置决定，不由模块到达、首次挂载或重挂顺序决定；跨文件优先关系不作为业务覆盖 API，需要明确覆盖时使用 layers。相同来源的多个不同值变体没有 class 书写顺序覆盖保证，不应靠拼接它们表达优先级。

哈希只用于索引，复用时仍核对完整内容。同模块、跨模块或绑定遇到相同哈希但不同内容时会明确报错，保留旧定义与快照，不把碰撞当成可共享样式；这是故障隔离策略，不是密码学安全承诺。

自定义 `StyleSheet.set(key, css, order)` 的 `order` 与 `StyleEntry.order` 为字符串排序键；按字符串码元顺序比较，再以 key 打破平局，不能作数字相减或使用依赖系统 locale 的排序。层顺序声明由内部保留键排在最前。

SSR 样式携带内部协议版本，客户端接管前统一校验版本、规则标识、顺序与 nonce；服务端和客户端必须使用相同 nonce。数据不兼容时直接报错并保留原始 SSR 标记，不接管半份样式。编译插件与框架 runtime 也会核对协议，升级时应一起重新构建，不能混用旧编译产物。

当前内部协议为 8。浏览器与 SSR 使用最多 64 条逻辑记录的样式分片；变量更新只重写所在分片，物理 style 数与 stats.styleEntries（逻辑记录数）不同。SSR metadata 记录各条规则的 key、顺序和转义后长度，全部验证后才接管。自定义 StyleSheet 仍按逻辑记录实现，不必模拟浏览器分片。

删除规则时会合并相邻的稀疏分片；不跨外部节点移动 CSS。单次更新仍保持有界分片写入，合并失败但回滚成功时保留原分片继续服务。HTML 的 CRLF 归一化已计入 SSR 长度协议。

## 自定义 Token 类别

自定义类别在应用入口显式映射到属性，类型提示与运行时使用同一份配置，嵌套规则也继承该映射。

```ts
const layoutTheme = extendTheme(theme, { layoutSpace: { card: '18px' } });
const layoutCss = createCss(layoutTheme, { tokenMap: { gap: 'layoutSpace' } });

layoutCss((s) => {
  s.gap._card;
  s._hover((s) => {
    s.gap._card;
  });
  s.padding.px(12, 16);
});
```

映射替换指定属性的默认类别，不影响它的关键字、单位和普通值调用。配置在入口创建时复制并冻结；未知属性、未知类别和已知的值种类冲突会报错。普通 CSS 值的完整语法仍由浏览器解释。

## 局部选择器与安全提升

`_selector()` 要求每个逗号分支在函数和属性选择器之外显式包含 `&`。支持 `&:is(.a, .b)`、`.theme &` 和 `& > .label, &:hover`；`:is(&, body)`、`:not(&)` 或仅在引号中出现 `&` 不能证明局部约束，会报错。可将复杂条件放在显式根之后；需要全局规则时使用 runtime.global。

自动提升只作用于确认安全的属性、值和目标组合。CSS-wide 关键字忽略大小写和前后空白识别；转义值及无法确认语义的值保持完整规则。在没有 `CSS.supports` 的 SSR/其他宿主中使用更保守的属性值白名单，避免把原本应由浏览器丢弃的无效声明变成计算值阶段无效的变量声明。

## 资源与异常

CSS 声明/选择器/层、主题输入/引用和编译协议等接入错误使用 `StyleError`，可以按 `code` 区分 `css.value`、`css.selector`、`css.layer`、`theme.invalid`、`theme.namespace`、`theme.token`、`theme.reference`、`runtime.context`、`runtime.protocol`。消息保留相关 Token 路径；用户 factory 和样式表后端抛出的错误不包装成另一对象，聚合失败保留 cause。

`runtime.property()` 的同名注册在同一 Document 的 ZUI runtimes 之间协调（含该文档下的 ShadowRoot）。相同定义可共存，不兼容定义立即报错；每个 runtime 保留自己的规则和引用，最后持有者退出后可重新注册。ZUI 不扫描外部 CSS 或 `CSS.registerProperty()`，这些宿主注册需自行避免同名冲突。

绑定的新规则或变量写入失败时保留旧快照；旧规则删除或消费者回调失败发生在提交之后，此时当前快照已是新版。清理会继续处理其余引用，异常统一上报，写入与回滚同时失败时保留两类错误。自定义样式表后端若拒绝删除，物理 CSS 可能仍存在；内部零引用记录不会参与复用，应恢复后端或销毁 runtime 完成物理清理。

## Builder 与宿主 API 速查

样式 factory 必须同步执行并返回 void；使用花括号语句体。async 函数或返回对象不受支持，即使 TypeScript 的 void 回调规则允许赋值，运行时仍会拒绝。函数中的 if/switch/循环为普通 JS 语义。

| Builder 写法                                | 输入与行为                                        |
| ------------------------------------------- | ------------------------------------------------- |
| s.display.flex                              | 读取关键字即追加声明；属性及关键字由生成表约束    |
| s.width.px(240)                             | 单位方法，支持的单位和参数数量由属性决定          |
| s.color._primary                            | 当前主题类别的 Token 引用；扩展后自动补全         |
| s.gridTemplateColumns('repeat(3, 1fr)')     | 原生 CSS 值出口；复杂计算仍使用 TS 函数           |
| s.set('display', 'grid')                    | 标准属性的类型化直接写入                          |
| s.raw('future-property', 'value')           | 尚未纳入类型表的属性；仍检查声明边界              |
| s.custom('--app-offset', '12px')            | 自定义变量声明；不同于自动提升后的内部变量        |
| s._selector('& > button', factory)          | 局部选择器；每个逗号分支必须显式包含根            |
| s._hover / _focusVisible / _before / _after | 常用伪类/伪元素的局部回调                         |
| s._media / _supports / _container           | 条件字符串与嵌套 factory，可组合嵌套              |
| s._important(factory)                       | 为该回调的声明设置优先级，不在值中拼接 !important |

标准值出口中的 null/undefined 按对应签名跳过声明，不生成字符串 null。raw 是未来属性出口，不是任意样式表文本入口；全局选择器和资源使用下面的宿主方法。

高级宿主负责求值时机及销毁，Svelte 用户通常不需要直接调用这些方法：

| API                                          | 返回 / 所有权 / SSR                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| createRuntime(options)                       | 一个宿主；无 target 默认内存表，有 target 输出到 Document/ShadowRoot；调用方负责 dispose        |
| runtime.css(factory, source?)                | string；静态规则保留到 runtime 销毁，不用于无限次高频动态值                                     |
| runtime.binding(settings?)                   | 动态绑定；id 在 runtime 内唯一，source 决定来源，maxStructures 默认 8，promote 可由高级宿主关闭 |
| binding.evaluate(factory)                    | 求值并返回当前 string；新快照包含 className、variables、revision                                |
| binding.subscribe(listener)                  | 立即通知并返回取消订阅函数；更新失败的提交边界见异常说明                                        |
| binding.dispose() / runtime.release(binding) | 释放绑定；清空快照并通知消费者；release 拒绝其他 runtime 的绑定                                 |
| bindElement(node, binding)                   | 绑定 DOM class/变量并返回解除函数；解除消费者不自动销毁调用方绑定；仅浏览器使用                 |
| runtime.global(selector, factory)            | 可 dispose 的全局规则资源，遵循 runtime 层配置                                                  |
| runtime.themeStyle(selector, theme?)         | 可 dispose 的主题规则资源，默认使用 defaultTheme；SSR 也可输出                                  |
| runtime.keyframes(frames)                    | 带 name 与 dispose 的动画资源；仅普通声明，不接受嵌套规则或 important                           |
| runtime.fontFace(descriptors)                | 可 dispose 的字体规则资源；文件加载、授权和缓存由浏览器/应用负责                                |
| runtime.property(name, registration)         | 可 dispose 的 @property 资源；校验 syntax、inherits、initialValue 及同文档冲突                  |
| runtime.cssText() / styleTags()              | 当前样式文本 / 带协议与 nonce 的 SSR 标签；不转移资源所有权                                     |
| runtime.finishHydration()                    | 首轮消费者接管完成后释放未被认领的服务端规则；不能提前到首轮消费之前                            |
| runtime.stats                                | 只读诊断快照；styleEntries 为逻辑记录数，ruleCompilations 为累计编译次数                        |
| runtime.dispose()                            | 幂等释放绑定、规则与宿主占用；之后不能继续写入；自定义后端拒绝清理时会上报异常                  |

资源句柄可提前 dispose；未提前释放的资源仍由 runtime 销毁兜底。全局规则、动画与属性注册也必须按 SSR 请求隔离，不能共享一个可变服务端 runtime。

ThemeScope 的 constructor、setTheme、setOverrides、fork、theme/parent 已在主题章节说明。subscribe(listener, cleanup?) 立即发送当前主题，返回取消函数；取消或 scope 销毁会调用对应 cleanup。dispose 会递归销毁 fork 子级，不销毁不可变 Theme 对象。themeVariables(theme) 返回 CSS 变量名到字符串值的只读视图；bindTheme 返回解除函数，scope 及可选 runtime 仍由调用方拥有。

MemoryStyleSheet 和 BrowserStyleSheet 都实现 set/remove/entries/dispose。entries 返回有序逻辑记录快照；BrowserStyleSheet 的物理分片是实现细节。自定义后端必须在方法返回前完成写入、失败时抛错，不使用异步写入协议。内部 StyleProgram、直接构造 StyleBinding、编译求值上下文及 @internal 导出不作为业务扩展面。

## 支持范围与升级

| 范围        | 支持合同                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| core 消费   | 统一 ESM 入口、框架无关 TypeScript；不提供 CJS 或其他框架的编译适配                                   |
| Svelte 接入 | 锁定版本的 Svelte 5 / Vite，包含 runes 与 legacy 组件；插件必须先于 Svelte 编译                       |
| 服务端      | Node.js 24 的 renderStyled / SvelteKit handle、SSR 与 prerender；Edge runtime 未纳入首版验收          |
| 浏览器      | CI 锁定 Playwright 对应的 Chromium、Firefox、WebKit；不据此宣称所有历史浏览器或真机设备已测试         |
| CSP         | inline 默认通道；严格样式策略使用 stylesheet + 同请求 nonce，宿主框架自身样式另遵循其 CSP 合同        |
| 扩展        | 普通 TS 函数、自定义 Token 类别与映射、自定义 StyleSheet、独立绑定；没有通用插件生命周期或 recipe DSL |

升级前同时重建 core、编译适配器和应用，避免协议 8 与旧 SSR/编译缓存混用；接口迁移见上文。需要回退时回退整组包和应用产物，不仅替换浏览器 runtime。CI 产物的 candidate-evidence.json 关联提交、报告与被测试归档的 hash；这些包仍 private，发布命名和许可另行确定。

## 默认主题语义清单

下表列出系统亮暗预设的实际键和值；baseTheme 不含这些键。前景/背景配对是使用约定，覆盖任意品牌色后应重新验证。默认配对的对比度、两套 schema 与此表的值由 presets.test.ts 核对。

| Token                   | 亮色值                        | 暗色值                        | 用途与配对                                                    |
| ----------------------- | ----------------------------- | ----------------------------- | ------------------------------------------------------------- |
| `spacing.none`          | `0px`                         | `0px`                         | 布局间距尺度                                                  |
| `spacing.xs`            | `4px`                         | `4px`                         | 布局间距尺度                                                  |
| `spacing.small`         | `8px`                         | `8px`                         | 布局间距尺度                                                  |
| `spacing.medium`        | `12px`                        | `12px`                        | 布局间距尺度                                                  |
| `spacing.large`         | `16px`                        | `16px`                        | 布局间距尺度                                                  |
| `spacing.xl`            | `24px`                        | `24px`                        | 布局间距尺度                                                  |
| `size.controlSmall`     | `28px`                        | `28px`                        | 控件高度或图标尺寸                                            |
| `size.control`          | `36px`                        | `36px`                        | 控件高度或图标尺寸                                            |
| `size.controlLarge`     | `44px`                        | `44px`                        | 控件高度或图标尺寸                                            |
| `size.icon`             | `16px`                        | `16px`                        | 控件高度或图标尺寸                                            |
| `radius.small`          | `4px`                         | `4px`                         | 圆角尺度；full 表示胶囊/圆形意图                              |
| `radius.medium`         | `8px`                         | `8px`                         | 圆角尺度；full 表示胶囊/圆形意图                              |
| `radius.large`          | `12px`                        | `12px`                        | 圆角尺度；full 表示胶囊/圆形意图                              |
| `radius.full`           | `9999px`                      | `9999px`                      | 圆角尺度；full 表示胶囊/圆形意图                              |
| `borderWidth.thin`      | `1px`                         | `1px`                         | 细边界或焦点轮廓宽度                                          |
| `borderWidth.focus`     | `2px`                         | `2px`                         | 细边界或焦点轮廓宽度                                          |
| `fontFamily.body`       | `system-ui, sans-serif`       | `system-ui, sans-serif`       | 正文或等宽字体栈                                              |
| `fontFamily.mono`       | `ui-monospace, monospace`     | `ui-monospace, monospace`     | 正文或等宽字体栈                                              |
| `fontSize.small`        | `12px`                        | `12px`                        | 文字尺寸尺度                                                  |
| `fontSize.medium`       | `14px`                        | `14px`                        | 文字尺寸尺度                                                  |
| `fontSize.large`        | `18px`                        | `18px`                        | 文字尺寸尺度                                                  |
| `fontWeight.normal`     | `400`                         | `400`                         | 字重尺度                                                      |
| `fontWeight.medium`     | `500`                         | `500`                         | 字重尺度                                                      |
| `fontWeight.bold`       | `700`                         | `700`                         | 字重尺度                                                      |
| `lineHeight.normal`     | `1.5`                         | `1.5`                         | 无单位行高比例                                                |
| `lineHeight.tight`      | `1.25`                        | `1.25`                        | 无单位行高比例                                                |
| `letterSpacing.normal`  | `0px`                         | `0px`                         | 普通字距                                                      |
| `duration.fast`         | `120ms`                       | `120ms`                       | 交互过渡时长                                                  |
| `duration.normal`       | `200ms`                       | `200ms`                       | 交互过渡时长                                                  |
| `duration.slow`         | `300ms`                       | `300ms`                       | 交互过渡时长                                                  |
| `easing.standard`       | `ease`                        | `ease`                        | 过渡曲线                                                      |
| `easing.linear`         | `linear`                      | `linear`                      | 过渡曲线                                                      |
| `shadow.small`          | `0 1px 3px rgb(0 0 0 / 0.12)` | `0 1px 3px rgb(0 0 0 / 0.12)` | 轻量浮起阴影                                                  |
| `zIndex.popup`          | `1000`                        | `1000`                        | 弹出层/遮罩/通知的相对层级                                    |
| `zIndex.overlay`        | `1100`                        | `1100`                        | 弹出层/遮罩/通知的相对层级                                    |
| `zIndex.notification`   | `1200`                        | `1200`                        | 弹出层/遮罩/通知的相对层级                                    |
| `opacity.disabled`      | `0.5`                         | `0.5`                         | 禁用状态透明度；不自动满足文字对比度                          |
| `breakpoint.small`      | `640px`                       | `640px`                       | 媒体查询阈值；通过 resolved 生成查询，不把 var() 放入媒体条件 |
| `breakpoint.medium`     | `768px`                       | `768px`                       | 媒体查询阈值；通过 resolved 生成查询，不把 var() 放入媒体条件 |
| `breakpoint.large`      | `1024px`                      | `1024px`                      | 媒体查询阈值；通过 resolved 生成查询，不把 var() 放入媒体条件 |
| `color.primary`         | `#4f46e5`                     | `#a5b4fc`                     | 主要操作的实色背景；搭配 onPrimary                            |
| `color.primaryHover`    | `#4338ca`                     | `#c7d2fe`                     | 主要操作悬停背景；搭配 onPrimary                              |
| `color.primaryActive`   | `#3730a3`                     | `#e0e7ff`                     | 主要操作按下背景；搭配 onPrimary                              |
| `color.primarySubtle`   | `#eef2ff`                     | `#312e81`                     | 低强调主色背景；搭配 onPrimarySubtle                          |
| `color.onPrimary`       | `#ffffff`                     | `#1e1b4b`                     | primary/primaryHover/primaryActive 上的文字或图标             |
| `color.onPrimarySubtle` | `#3730a3`                     | `#e0e7ff`                     | primarySubtle 上的文字或图标                                  |
| `color.surface`         | `#ffffff`                     | `#1e293b`                     | 普通卡片/容器表面；搭配 text                                  |
| `color.surfaceRaised`   | `#ffffff`                     | `#334155`                     | 抬高的弹层/浮动表面；搭配 text                                |
| `color.surfaceSunken`   | `#f1f5f9`                     | `#0f172a`                     | 凹陷区域/次级底色；搭配 text                                  |
| `color.surfaceHover`    | `#f1f5f9`                     | `#334155`                     | 普通表面的悬停反馈；搭配 text                                 |
| `color.background`      | `#f8fafc`                     | `#0f172a`                     | 页面基础背景；搭配 text 或 muted                              |
| `color.text`            | `#0f172a`                     | `#f8fafc`                     | 普通可读正文；搭配 background 或 surface 系列                 |
| `color.muted`           | `#475569`                     | `#cbd5e1`                     | 次要说明；默认对比度验收使用 background                       |
| `color.textDisabled`    | `#64748b`                     | `#94a3b8`                     | 不可操作内容的弱化前景，不代替 disabled 属性                  |
| `color.border`          | `#cbd5e1`                     | `#64748b`                     | 弱分隔线；不单独承担控件状态辨识                              |
| `color.borderStrong`    | `#64748b`                     | `#94a3b8`                     | 需要强调的边界线                                              |
| `color.focus`           | `#4f46e5`                     | `#a5b4fc`                     | 焦点指示色；结合 borderWidth.focus 使用                       |
| `color.danger`          | `#b91c1c`                     | `#fca5a5`                     | 危险/错误实色背景；搭配 onDanger                              |
| `color.onDanger`        | `#ffffff`                     | `#450a0a`                     | danger 上的前景                                               |
| `color.success`         | `#15803d`                     | `#86efac`                     | 成功实色背景；搭配 onSuccess                                  |
| `color.onSuccess`       | `#ffffff`                     | `#052e16`                     | success 上的前景                                              |
| `color.warning`         | `#92400e`                     | `#fde68a`                     | 警告实色背景；搭配 onWarning                                  |
| `color.onWarning`       | `#ffffff`                     | `#451a03`                     | warning 上的前景                                              |
| `color.info`            | `#0369a1`                     | `#7dd3fc`                     | 信息实色背景；搭配 onInfo                                     |
| `color.onInfo`          | `#ffffff`                     | `#082f49`                     | info 上的前景                                                 |

例如实色主操作使用 s.backgroundColor._primary 和 s.color._onPrimary；柔和强调改用 primarySubtle/onPrimarySubtle。表面嵌套使用 surfaceRaised/surfaceSunken，而不是在组件中判断暗色并写死颜色。减少动画、密度、方向等由普通 TS 覆盖和原生 CSS 条件组合，不引入第二套主题 DSL。
