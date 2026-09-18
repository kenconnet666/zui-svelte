# @zui/core

框架无关的 CSS 与主题系统工作区。已配置 TypeScript 构建、类型声明、Stylis 与 CSS 类型依赖。

已实现生成式属性/关键字载体、buildStyle、序列化、主题、作用域、规则注册、自动变量提升与全局资源回收。生成器覆盖 857 个属性。class 字符串编译接入仍在验证；下一阶段以 [首版生产可用规划](../design/core-production-plan.md) 为讨论和实施基线，历史状态见 [换机交接](../design/handoff.md)。

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
