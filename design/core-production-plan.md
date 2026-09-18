# Core 首版生产可用规划

日期：2026-09-18。基线：`cc2f9d798009d52628225b9689aeee64c14377cf`。

本文是下一阶段的完整实施提案，不是完成报告。用户已明确首版以生产可用为目标；本文给出推荐决策、实现边界、依赖顺序和可验证的发布条件。新增 API 的名称与签名仍需在对应阶段通过类型和集成原型确认，不能当作当前可调用 API。

本文统筹 `core.md`、`core-composition.md`、`core-types-theme.md` 的后续实施；这些文档保留设计推导，历史交接与旧 CI 记录不作为新版本完成证据。与旧稿不一致的推荐方案以本文为讨论基线，不能把推荐方案表述为用户已经逐项确认。

## 1. 目标与首版边界

首版交付框架无关的 TypeScript 样式核心，以及证明它可生产消费的最少 Svelte/Vite/SvelteKit 接入。完整组件库和文档产品不在本次范围。

生产可用意味着：公开 API 有稳定合同；支持范围内的样式语义正确；SSR 与浏览器结果一致；请求、实例和样式目标隔离；资源可回收；真实构建包可消费；失败可诊断；性能有测量与预算。文档、生成数量、编译成功或少量 Demo 均不能独立证明这些目标。

必须保留的产品约束：

- `css()` 返回原始 `string`，使用者只写 `class`。
- 普通值初次静态，同一持续绑定首次发现变化后才尝试提升；不分析响应式来源，不要求 getter、dynamic 标记或手写变量。
- 不公开 `css.parts`、`StyleHandle`、`panel.props()` 或业务必须手写的 attachment。
- 每个子元素独立绑定，多个 class 可组合，参数用普通 TS 函数。
- core 不导入 Svelte、Vite 或 Node 专有模块；编译与宿主接入位于 svelte。
- 三个 workspace 保持 `core`、`svelte`、`docs`；SvelteKit 仅作独立消费 fixture，不改造 Docs，不新增顶级业务 workspace。
- 生产正确性是要求；自动提升属于内部优化，不满足安全条件时必须生成等价完整规则。

### 1.1 支持矩阵

| 场景                                        | 首版要求                           | 边界                                                                   |
| ------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| 普通 Svelte + Vite CSR                      | 必须                               | 使用受支持的编译插件与适配层                                           |
| SvelteKit Node SSR + hydration              | 必须                               | 首屏、并发请求、导航、错误和取消均验收                                 |
| SvelteKit prerender/静态部署                | 必须                               | 产物中存在首屏 CSS，不能依赖服务器 import 副作用                       |
| SvelteKit 延迟数据与流式响应                | 必须做前期可行性验证并作为首版门槛 | 禁止把整页缓冲实现称为流式支持；无法达到时回到范围决策，不静默删除要求 |
| 普通 TS 模块级静态 class                    | 纳入首版推荐方案                   | 通过模块编译和定义清单接入；保持 JS 快照语义                           |
| 原生 DOM / 其他框架                         | core 提供稳定宿主接口              | 自动响应式由宿主实现；首版不交付所有框架适配器                         |
| Portal、ShadowRoot、多应用根                | 必须                               | 目标 registry、主题传递与卸载各自明确                                  |
| 未经过 ZUI 编译的第三方组件                 | 必须正确回退                       | 前提是组件确实把 class 传到目标 DOM；库无法替组件补造不存在的转发      |
| Chromium、Firefox、WebKit                   | 必须                               | 发布记录写明实测版本；Playwright WebKit 不冒充全部 Safari 真机验收     |
| 严格 CSP，允许 nonce style、禁止 style 属性 | 必须                               | 通过样式表变量通道；由 ZUI 输出的动态样式不要求 unsafe-inline          |
| 禁止任何运行时样式的 CSP / 仅固定 hash      | 不作为动态 runtime 支持目标        | 静态部署另验；不能声称 nonce 可以解决全部策略                          |
| 非 Node 边缘 SSR、旧浏览器、CJS             | 暂不宣称支持                       | 保留 core 可移植性；支持新宿主须增加对应集成证据                       |

当前锁定的 Node 24、Svelte 5.57.0、Vite 8.3.0、TypeScript 6.0.3 作为初始验证基线。SvelteKit 及 adapter 版本在建立 fixture 时核对并集中锁定；不得在未验证时写宽泛支持范围。

## 2. 当前实现与差距

| 模块                   | 当前事实                                                                  | 首版差距                                                    |
| ---------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `core/src/css`         | csstype + schema 生成属性/关键字；有序 StyleProgram、Stylis、声明边界检查 | 单位/Token 映射审计、选择器分支隔离、类型性能、语法覆盖说明 |
| `runtime/binding.ts`   | 静态起步、值提升、历史上限、快照订阅                                      | 更完整的等价性、异常事务和消费者生命周期证明                |
| `runtime/promotion.ts` | 属性/选择器白名单，复杂值保守处理                                         | 白名单依据、简写影响、值阶段变化的真实浏览器回归            |
| `runtime/registry.ts`  | 来源顺序、引用回收、class 查找与变量通知                                  | 稳定顺序与异步模块、定义/实例数据分离、跨目标转发           |
| `runtime/sheet.ts`     | Memory/DOM 样式表与 SSR 标记接管                                          | 每规则 style 节点的规模成本、分片接管、多根共享、严格 CSP   |
| `runtime/classes.ts`   | 隐藏同步求值上下文、字符串返回                                            | 模块级样式、无上下文行为、typed css 和上下文嵌套合同        |
| `theme`                | 定义/扩展/覆盖、预设、作用域                                              | 类别值校验、类型化引用、别名解析、主题实际输出与入口联动    |
| `runtime/resources.ts` | global、keyframes、font-face、property 与 dispose                         | 定义复用、跨 runtime 同名注册冲突、作用域与规则顺序         |
| `svelte/src/compiler`  | `.svelte` class 消费点原型                                                | `.ts/.js` 模块、导入追踪、符号遮蔽、求值语义、版本协议      |
| `svelte/src/server.ts` | renderStyled、Node ALS、缓冲 HTML 的 handle                               | 真实 SvelteKit、逐请求配置、CSP 对接、流式生命周期          |
| 验证                   | 有 Node、core 三浏览器和最小编译/SSR/Docs fixture                         | 发布矩阵尚未闭合；不能复用旧绿色 CI 证明新增能力            |

本次实时核对：当前 HEAD 的 CI `35289205755` 失败，已见两处 lint 阻塞：`svelte/src/runtime/scope.ts:66` 的 prefer-const；`svelte/tests/fixtures/CoreProbe.svelte:75` 的 no-useless-mustaches。该运行未提供后续全部门槛通过的证据。本轮仅规划，不修实现。

现有测试有价值，但多为单条合同的初始证明。后续逐条对应第 11 节的矩阵，不能用测试文件存在替代通过记录。

## 3. 对外统一入口

### 3.1 已确认的入口约定

2026-09-18 用户确认：对外 API 不作细分，统一入口；其余生产规划按本文推进。

样式、主题、预设、runtime、资源和必要类型均从 `@zui/core` 导入，不新增 core/presets、core/runtime 或 core/internal 业务入口。内部继续按职责组织文件，统一入口不等于把所有内部工具都列为稳定公共 API。

`@zui/svelte` 提供框架接入。现有 compiler/server 子路径仅隔离 Node 构建/服务端代码，避免浏览器导入 Node 依赖，不用于细分业务 API。编译产物所需的内部协议仍由框架接入管理并校验版本。

`StyleBinding`、`ClassController`、`hashText`、`canonicalize`、`hasCssEvaluation` 的稳定性按实际用途标注，不要求业务使用者理解内部对象。`StyleRuntime` 使用明确 interface，避免通过 ReturnType 意外公开所有实现成员；内部依赖收敛随实现进行，不能为了统一入口破坏现有集成。

### 3.2 样式作者主入口

```ts
css(factory: StyleFactory<DefaultTokens>): string;
createCss<T>(theme: Theme<T>, options?: CssOptions): TypedCss<T>;
```

`CssOptions` 首版仅建议开放固定的层归属 `layer`，具体类型由应用配置校验。namespace 从主题/宿主统一派生，不在每个调用点另设一份。不开放 promote、结构缓存容量、DOM 目标等逐调用优化开关。

```svelte
<div
  class={css((s) => {
    s.display.flex;
    s.width.px(width);
    s.padding.px(12, 16);
    s.color._text;
    s.backgroundColor._surface;
    s._hover((s) => {
      s.backgroundColor._surfaceHover;
    });
    s._media('(width >= 768px)', (s) => {
      s.gap.px(24);
    });
  })}
></div>
```

普通 TS 复用是正式 API 使用方式：

```ts
export function panelClass(width: number, compact: boolean): string {
  return css((s) => {
    s.width.px(width);
    s.padding.px(compact ? 8 : 16);
  });
}
```

不增加平行对象 DSL、链式 builder、响应式值包装器。复杂值使用标准 CSS 字符串；recipe 与组件变体系统不作为 core 完成前提。

### 3.3 Builder 合同

| 形式                                       | 行为                                                 |
| ------------------------------------------ | ---------------------------------------------------- |
| `s.display.flex`                           | 记录关键字，访问即产生声明，返回 void                |
| `s.width.px(120)`                          | 明确单位；长度不隐式加 px                            |
| `s.padding.px(8, 16)`                      | 按属性 arity 产生一条简写声明                        |
| `s.width('clamp(12rem, 50vw, 36rem)')`     | 保留标准表达式，不自行解释完整 CSS 语法              |
| `s.color._primary`                         | 引用当前类型化主题的 color 类别                      |
| `s._selector('&[data-open] > .label', fn)` | 标准选择器语义，必须验证每个选择器分支均受当前根约束 |
| `_media/_supports/_container`              | 保留条件原文及顺序，变化按结构处理                   |
| `_hover/_focusVisible/_before/_after`      | 高频快捷入口，与等价 selector 同语义                 |
| `_important(fn)`                           | 明确重要性，不通过值字符串夹带优先标记               |
| `s.custom('--app-progress', value)`        | 用户自定义属性，拒绝内部保留前缀                     |
| `s.set('color', value)`                    | 已知属性的类型化动态键入口                           |
| `s.raw('future-property', value)`          | 未收录属性逃生口，仍保持单声明和本地作用域边界       |

回调同步执行，正常 if/switch/循环/函数均允许。返回 Promise、返回业务结果、NaN/Infinity、未知 carrier 成员给明确错误。回调可被重复求值，不承担业务副作用的执行次数保证。

null/undefined 省略声明；重复声明保留顺序与回退；声明数、属性、选择器、条件、important、层变化属于结构变化。保留浏览器对合法但不支持的属性值的处理，不通过不完整正则武断拒绝新语法。

首版支持条件块、全局规则、keyframes、font-face、property 和固定层配置。`@import/@namespace/@page` 等样式表级规则不塞进本地 builder；确有需要可使用应用 CSS 文件。新规则进入公共 API 前须补作用域、序列化和浏览器合同。

## 4. 调用位置、模块样式与字符串合同

### 4.1 调用矩阵

| 位置                                 | 语义                                              | 资源所有者                    |
| ------------------------------------ | ------------------------------------------------- | ----------------------------- |
| 模板 class 表达式                    | 随宿主响应式重新求值，安全时自动提升              | 实际渲染实例                  |
| 模板调用普通 helper                  | 使用当前求值上下文；任意同步计算有效              | 调用所在实例，多个调用独立    |
| 组件 setup 的 `const x = css(...)`   | 一次快照；主题引用仍可随作用域变量变化            | 组件 + 仍在使用的消费者       |
| `$derived(css(...))`                 | 按标准 Svelte 派生语义，消费者同步内部版本        | 派生记录与消费者引用共同管理  |
| 普通模块 `export const x = css(...)` | 一次静态定义，不读取隐式请求主题                  | 模块定义 + 每个目标的消费引用 |
| 事件回调临时求值                     | 在受管组件所有权内允许快照；重复结果有界释放      | 组件的受管计算/当前消费者     |
| 无编译、无 runtime 的任意 TS 调用    | 明确报缺少所有权/集成，不自动创建全局 DOM runtime | 无                            |

模块级写法纳入首版推荐范围，不要求用户改写为 StyleHandle：

```ts
import { css } from './styling.js';

export const panel = css((s) => {
  s.display.grid;
  s.gap._panelGap;
});
```

模块顶层只执行一次，闭包内的时间、随机数、浏览器全局或可变请求数据不会被库神奇冻结成跨端一致值。开发诊断已知错误，文档明确确定性要求；不能静态证明所有 JS 的纯度。

### 4.2 模块定义方案与可行性门槛

推荐插件处理 `.svelte`、业务 `.ts/.js` 与 `.svelte.ts/.svelte.js` 中已解析到受管入口的调用。编译器仅建立调用位置与所有权，不分析响应式来源，也不在构建时任意执行用户回调。

模块求值产生不可变 StyleDefinition，`css()` 仍返回对应 class 字符串。定义包含可复现的来源、程序/主题 schema/层/协议信息；按构建清单或生成的注册代码让最终消费者找到定义，并在自己的 runtime/SSR 请求收集和保留规则。

允许共享只读模块定义；禁止在进程级定义表存放请求主题值、动态变量、请求引用计数、DOM 节点。HMR 的定义版本由模块 owner 替换；旧消费者仍持有旧版本直到迁移或释放。不能用永增的运行时 class Map 代替模块生命周期。

打包器必须保留必要定义注册，不能被当前 `sideEffects: false` 错误裁掉；无用样式又应能随不可达模块被裁剪。导入顺序与代码分块不能改变声明层次。动态 import、预编译库、模块重导出、typed css 别名均纳入验证。

仅 preprocessing `.svelte` 的接入无法独立实现全部模块合同。完整 Vite 插件为主路径，preprocess 单独使用时报告实际能力，不能声称具有完整模块支持。

前期必须证明：静态模块定义在两个 SSR 请求分别收集；浏览器按需注册；动态 chunk 和 HMR 可回收；未消费定义不写 DOM。失败则修改定义/编译协议后再推进，不用运行时全局状态兜底。

### 4.3 字符串跨边界

- 返回值可含多个内部 class token；数量、内容、hash、是否含绑定标记均不作为业务稳定合同。
- 字符串必须作为整体保留；允许拼接、数组、条件 class 和 props 转发。
- 消费者依赖内部 revision/订阅，不依赖字符串是否改变来判断变量是否更新。
- 一个静态定义可用于多个目标；各目标独立持有规则引用。
- 一个动态结果转发到多个目标时，每个目标获得完整本地变量；脱离生产者后保留最后有效快照直到自身释放。
- 动态 class 不是持久化格式，不承诺存数据库、跨版本复制或任意截取 token 后仍能恢复元数据。
- 未编译第三方组件收到完整规则快照 class，不能收到依赖其未写入变量的提升规则。在边界物化快照，更新时给出新 class，跟随边界所有者释放。
- 跨 Document/ShadowRoot 的转发需要在目标重新注册定义与主题，不把源 registry 的 lookup 成功当成目标有样式。

## 5. Runtime 的生产合同

### 5.1 定义、规则、绑定、消费者分离

推荐分离五种职责：StyleDefinition（只读模块/样式定义）、RuleRecord（目标内的不可变规则）、StyleBinding（实例比较历史与当前变量）、Consumer（实际 DOM/SSR 消费引用）、ResourceOwner（模块/组件/请求/HMR 归属）。

共享规则不等于共享变量。当前 RuleRecord 同时带 program、variables、listeners 的设计需要审计并收敛；不能让后求值的实例覆盖先求值实例的数据。是否共享物理规则以层叠和变量隔离为前提，不能只看 CSS 文本相同。

稳定宿主接口推荐围绕 `createRuntime`、`runtime.binding`、绑定的 evaluate/subscribe/dispose、主题 scope、资源注册、SSR 收集定义；业务根入口不提供绑定对象。宿主可以手动连接 DOM，Svelte 用户由编译层代管。

### 5.2 更新事务

一次更新按收集 → 校验 → 准备新规则与变量 → 提交 class/变量 → 释放旧引用进行。收集、序列化、规则插入或宿主写入失败时，保留最后有效输出，并回滚本次新增引用/订阅。

class 与变量不能跨可见渲染帧处于不一致状态。精确 DOM 写入顺序由浏览器回归证明；新变量先可用、旧规则不提前删除。多消费者各自提交，单个消费者退出不清除他人的变量或样式。

dispose 幂等；所有已销毁对象的修改方法统一拒绝调用；监听器重入、更新期间取消、错误边界、嵌套求值均须测试。同步求值栈用 try/finally 恢复，不能跨 await 持有全局 activeEvaluation。

### 5.3 自动提升

- 首次普通值不参数化；第一次不同后，仅安全的声明位置提升。
- 后续只有已提升的值变化时，不重新运行 Stylis、不改规则 class，仅提交差量变量。
- 不满足安全条件立即回到完整规则，并正确移除自身旧变量。
- null/undefined、条件、顺序等变化按结构处理；不同实例不能共享学习历史。
- 长写、简写、逻辑属性与物理属性互相覆盖必须纳入比较；重复回退声明不随意变量化。
- var/env/attr、CSS-wide 关键字、未知 raw、其他元素目标等默认保守；每次扩大提升范围有等价性用例。
- `CSS.supports` 是辅助判断，不能证明所有变量替换、回退、简写语义等价。
- 使用有界结构历史；当前默认 8 可作为初始实现值，性能阶段再决定正式内部预算。
- helper 分支/循环调用数变化不能错配身份。无法稳定归属时可保守快照，但仍需正确更新和回收。

CSS 变量替换可能在计算值阶段才失败，回退行为与直接无效声明不同；这是保守提升的依据，见 [CSS Variables](https://www.w3.org/TR/css-variables-1/#invalid-variables)。

### 5.4 样式表、层叠与顺序

`class="a b"` 不保证 b 覆盖 a。原生重要性、层、选择器、style 属性等规则保持不变，见 [CSS Cascade](https://www.w3.org/TR/css-cascade-5/#cascade-sort)。

推荐应用一次声明正常样式层顺序 `zui.reset, zui.theme, zui.components, zui.app, zui.overrides`。应用默认 css 归 zui.app，未来组件默认样式归 zui.components；集成方可固定指定其他层或显式无层。important 的反向层顺序和无层规则必须文档化，不能宣称 overrides 永远最高。

层配置进入 runtime 与 SSR 的同一 manifest。一个目标出现冲突层顺序必须诊断。配置后不能在同一活跃 runtime 中任意重排层。

同层内固定构建来源顺序和声明顺序；自动提升、结构切换、异步挂载、SSR 接管不能靠“追加到末尾”改变优先级。运行时生成的未知来源使用明确的 owner 顺序策略，并记录与编译来源的关系。

DOM 样式表按目标/层/有界分片组织，避免每一条规则固定增加一个 style 元素。CSSOM 或文本批处理由性能与浏览器结果选择；动态更新不整表重建，删除不破坏其他引用的索引。全局规则和 @property 的实际作用域不能简单等同于本地 selector scope。

同 Document 下多个 runtime 必须具备独立 owner 标识；相同 namespace 不应互相接管/删除 style 节点。共享静态规则需由目标级协调器计数；不共享时也要保证名称和清理隔离。

## 6. 主题完整方案

### 6.1 定义与类型化入口

```ts
import { createCss, extendTheme, overrideTheme } from '@zui/core';
import { lightTheme } from '@zui/core';

export const appTheme = extendTheme(lightTheme, {
  color: { brandAccent: '#0f766e' },
  spacing: { panelGap: '18px' },
});
export const compactTheme = overrideTheme(appTheme, {
  spacing: { panelGap: '12px' },
});
export const css = createCss(appTheme);
```

`defineTheme` 定义；`extendTheme` 增键/类别并允许兼容覆盖；`overrideTheme` 只改已有键。原对象不可变。扩展不可把同一已知 Token 从长度类别偷偷变为任意数值；值覆盖后类型正确拓宽，不使用会产生 never 的字面量交叉。

建立 typed css 入口不自动安装页面主题。StyleProvider/runtime 必须持有兼容的主题 schema/namespace；只有无显式配置时安装默认主题。自定义入口缺少必需 Token 时给出定义来源和缺失路径，不静默引用不存在的 CSS 变量。

`css(factory, theme)` 现有第二参数建议迁入内部协议，业务统一通过 createCss 携带类型。多个主题实例、多个 typed css 入口可并存；不要求全局 module augmentation。

### 6.2 Token、引用、别名与派生

默认类别覆盖 color、spacing、size、radius、borderWidth、fontFamily、fontSize、fontWeight、lineHeight、letterSpacing、duration、easing、shadow、zIndex、opacity、breakpoint。

长度/时间类保持明确单位；无量纲值保持 number；接受标准 CSS 表达式的类别不声称能在 TS 中解析完整 CSS。类别规则同时供类型与运行时生成/校验，特别验证默认主题与 darkTheme 键集合一致。

推荐增加类型化 `theme.ref(category, token): string` 返回 `var(...)`，用于复杂 CSS 表达式；`theme.variable` 仅返回变量名，两者分清。JS 读取计算前的解析值使用独立 `theme.resolved` 视图；不得把 CSS var() 当作可直接计算的颜色。

首版主题别名采用显式 `tokenRef(category, token)` 描述，名称为候选。引用目标按最终主题 schema 校验，检测缺失、类别不兼容、循环及自循环。先解析基础/别名 → 应用覆盖 → 重新解析依赖；输出最终解析值与稳定变量引用，嵌套覆盖不继承一个在错误祖先上已解析的别名结果。

复杂派生使用普通纯函数 `makeTheme(seed, preferences)`；不引入任意 Token getter 隐式执行图。种子派生语义值，应用语义覆盖，未来组件再派生组件 Token；显式覆盖最终 primary 不自动猜 hover/onPrimary。

自定义类别首版通过显式 schema 映射扩展：类别值规则 + CSS 属性映射共同定义，类型和 runtime 共用。多个类别映射同属性时检测快捷 Token 重名；歧义使用 `theme.ref` 明确引用，不靠先后顺序取值。具体配置函数名在 P2 类型原型后冻结。

### 6.3 作用域与偏好

- scope 持有有效主题，根 update、局部 override、fork 和 dispose 的含义稳定；override 为替换当前 patch，若需增量更新另用明确动作。
- 嵌套 scope 继承父主题的未覆盖项；父更新和子覆盖都先校验后事务提交。
- Provider 配置对应实际 DOM 主题容器；不凭 JS context 假设 CSS 已继承。容器是否产生布局节点必须公开说明。
- Portal 将有效 scope 绑定到目标主题容器；关闭动画结束前保持引用。
- ShadowRoot 有自己的规则目标，可从 host 继承主题或明确安装 scope，分别验收。
- light/dark、comfortable/compact、normal/more contrast、full/reduced motion 与 ltr/rtl 分轴；system 的解析归宿主，core 只接收确定值。
- 预设必须覆盖文字、背景、边框、焦点、危险/成功、禁用等语义，并以最小控件探针验证对比、forced-colors、减少动画；不借此扩展整套组件库。
- SSR 从请求偏好或明确默认值确定初始主题，客户端先使用同一值接管，再处理系统偏好变化。可选媒体规则或 CSP 兼容初始化方案必须有真实首屏证据。

## 7. 资源与集成配置

全局资源继续使用显式所有权：

```ts
const animation = runtime.keyframes({
  from: (s) => {
    s.opacity(0);
  },
  to: (s) => {
    s.opacity(1);
  },
});
const reset = runtime.global('body', (s) => {
  s.margin.px(0);
});
// 由宿主/框架的作用域结束回调执行
animation.dispose();
reset.dispose();
```

global、themeStyle、keyframes、fontFace、property 是首版资源；引用计数、重复注册、冲突、部分失败、SSR 与 HMR 都纳入同一 owner 模型。动画/字体在退出过渡完成前不得提前删除。删除 font-face 规则不等于浏览器清除了已下载字体缓存，验收只断言可管理的资源行为。

`@property` 在同一实际 CSS 作用域中的同名不同定义必须诊断，不能仅检查单个 runtime 的 Map；同定义可计数复用。跨 ShadowRoot 行为以规范和浏览器实际验证确定。

候选宿主配置：theme、target/sheet、namespace、nonce、layers、变量输出通道、诊断回调。互斥的 target/sheet 必须校验；namespace、层序和输出通道在活跃 runtime 内保持固定。

`runtime.css()` 明确为 runtime 持有的静态快照，重复结果复用；高频变化应进入受管 binding，以便及时释放旧规则。若保留该方法，文档和诊断必须防止误把它当成自动学习入口。

全局初始化可以写在受管应用作用域中；不提供导入模块即偷偷修改所有 Document 的全局 helper。模块静态动画如需无 runtime 定义，复用第 4 节不可变定义协议，由首个消费者所在目标获取资源。

## 8. Svelte 编译与组件边界

首版需要证明的编译能力：

1. 基于公开 AST/编译接口定位真实符号；导入别名、重导出、typed css、自定义入口、局部同名变量不误判。
2. 保留属性与 spread 的从左到右求值、覆盖、getter 次数、事件引用、bind、style:、class:、attachments 和 action 语义。
3. 不把所有普通 props 放入一个新响应式求值单元而改变无关副作用或更新粒度；可控改写有正反用例。
4. 每个渲染实例有身份；keyed 重排、unkeyed 复用、KeyBlock、递归、snippet 多调用、await 多分支、错误边界都隔离。
5. 对象 each key 不通过 String(key) 压缩身份；服务端/客户端身份可重现或有接管映射，不能依赖随机数或不受控全局计数。
6. 任意同步 helper 不要求源码内联；调用次序改变不得借用其他实例的动态历史。
7. class 字符串不变仍通知变量变化；$derived/跨组件 props 的订阅与销毁顺序正确。
8. 第三方组件按是否具备版本化消费协议判断，不以“相对 .svelte 导入”猜测支持能力。
9. slotProps 是组件转发接口；core 只处理其中抵达实际消费者的 class，不定义任意 slot 名称或 Record<string, any>。
10. source map 指向用户源码；错误包含模块、调用位置和原因；双重编译按结构化版本标记检测，不靠任意注释文本命中。
11. 已编译包和应用自身分工明确，consumer 不需要重新处理全部 node_modules；不兼容协议在构建/启动时报错。
12. HMR 按模块 owner 迁移或释放，热更新不会要求整页刷新才能恢复样式。

原生 style、style: 指令及外部 class 保留原有优先级，内部变量使用保留命名区差量写入。不得解析用户 style 时按分号粗暴拆分。组件转发事件的合并不属于 core 自动处理范围，最小 fixture 只验证编译过程没改原语义。

## 9. SSR、hydration、流式与 CSP

### 9.1 SSR 与请求隔离

每个请求独立拥有 runtime、主题、nonce、规则集合、计数与错误状态；模块定义可只读共享。Node 接入使用 ALS 或显式上下文，core 不依赖 ALS。嵌套 render、并发、失败和取消后都释放请求对象。

`renderStyled` 保留 Svelte render 的 props/context/idPrefix/CSP 等必要选项与结果；不能复制一个宽泛 Record 类型后丢失必填 props 推导。实际支持项跟随锁定 Svelte 版本核实，见 [Svelte server](https://svelte.dev/docs/svelte/svelte-server)。

`createStyleHandle` 使用真实 SvelteKit Handle/ResolveOptions 类型；允许按 event 计算 theme、nonce 和初始偏好。与 sequence/其他 handle、错误页面、redirect、非 HTML、prerender、客户端导航兼容。

样式必须在依赖它的内容首次可见前可用；首屏不能等客户端运行后补 CSS。复用的静态模块样式也必须进入每个请求，不能只在第一次 import 时输出。

### 9.2 Hydration 协议

服务端输出 schema/协议版本、目标 owner、规则标识、逻辑顺序、主题作用域与必要接管数据。序列化内容可校验，正确转义，不包含任意可执行对象。

客户端先校验并接管自身目标的服务端规则；按真实消费情况保留，不重复插入、不误删其他应用节点。hydration 完成后再释放未消费 SSR 规则。首轮与服务端保持静态表示，完成接管后开始学习动态变化。

双根、异步边界、部分 hydration、提前销毁与不一致恢复必须有路径；不能用一个全局 finishHydration 提前清理尚未到达的晚到边界。恢复策略保留可见有效样式并发出诊断，不能吞掉所有 mismatch。

### 9.3 流式响应

当前 `response.text()` 会缓冲整份响应，不能直接作为流式实现。前期原型必须核实 SvelteKit 的公开 chunk 接口、延迟数据发生时间与可获得的 HTML 边界，见 [SvelteKit hooks](https://svelte.dev/docs/kit/hooks)。

推荐分为：首屏已知静态定义预收集、请求内已生成规则增量 flush、晚到边界自己的有序样式片段。每个片段对应的规则在内容使用前送达，并携带相同 nonce/接管协议；不能假定每个字符串 chunk 都是完整 HTML，也不能简单在每个 chunk 尾部拼 style。

请求 owner 在流完成、取消或报错时释放，不能在 resolve 返回 Response 就提前销毁。处理背压、AbortSignal、错误页、超时和响应头；不无条件重写非 HTML 或已压缩内容。缓冲模式可作为显式配置，但不能无声关闭用户的流式语义。

如果公开宿主能力不能做到任意晚到规则在内容前送达，P1 必须形成证据与可行替代（例如路由静态清单或明确的缓冲边界），在宣称首版范围完成前解决，不能将其移入“已支持”表。

### 9.4 严格 CSP 双通道

候选配置 `variables: 'inline' | 'stylesheet'` 在宿主初始化时确定，不能猜测浏览器 CSP。inline 路径差量写元素变量；stylesheet 路径使用实例绑定 class 与受 nonce 保护的规则保存变量，主题也使用对应通道。两条路径业务 API 相同。

stylesheet 通道可以采用实例变量规则或保守完整规则，必须保持实例隔离、层叠与有界回收。不能以禁用功能换取“通过 CSP”；自动提升与变量输出位置是不同问题。

nonce 由宿主逐请求提供，与实际 CSP 响应头和 SvelteKit CSP 配置一致；库不自行生成一个与宿主无关的 nonce。静态 prerender 的 hash 策略单独验证。

按 [CSP3](https://www.w3.org/TR/CSP3/#directive-style-src-attr)，style 标签与 style 属性属于不同控制范围。真实浏览器测试使用实际响应头并收集 violation，不能只断言 style 元素有 nonce。作者主动写入被策略禁止的 style 属性不由 ZUI 自动放宽。

2026-09-18 实施发现：锁定的 SvelteKit 2.70.3 会为自身的 `#svelte-announcer` 写入固定 style 属性。ZUI 独立三浏览器验收继续使用 `style-src-attr 'none'`；Kit fixture 仅为该固定上游片段提供精确 hash 许可，不能把此结果描述为整个 Kit 应用在完全禁止 style 属性时无违规。升级 Kit 后重新核对该例外，禁止扩大为 unsafe-inline 或过滤违规事件。

## 10. 生成、诊断、健壮性与性能

### 10.1 生成和类型

- csstype 固定版本 + property schema 共同生成声明与 runtime metadata，生成结果字节稳定。
- 补属性/单位/arity/Token 类别审计，错误映射有负向测试；单位快捷方式未提供不代表标准字符串值不能使用。
- 保留 vendor、SVG、废弃信息，明确上游覆盖范围，不用“857”宣称完整 CSS 规范实现。
- 类型覆盖合法/非法属性、关键词、单位、Token、主题扩展/覆盖、typed css、真实模板及实际 tarball 消费。
- 测量 TypeScript 时间、内存与有代表性的 IDE 补全；避免全属性 × 全 Token 的组合爆炸。
- 上游升级提供可审阅差异与生成一致性检查，不手改生成文件。

### 10.2 诊断与输入边界

错误使用稳定 code、消息、来源和必要上下文；候选分类为 missing-owner、theme-schema-mismatch、protocol-mismatch、invalid-css-boundary、invalid-local-selector、resource-conflict、hydration-mismatch、disposed-owner。

开发模式给可定位原因；生产模式保留必要硬错误和精简 code，诊断回调不能泄漏请求内容。调试统计只读，覆盖活动定义、规则、绑定、消费者、样式节点、缓存结构、订阅、Stylis 次数和输出字节。

校验 declaration/selector/style-tag 边界，覆盖转义、注释、字符串、URL、自定义属性、闭合标签和原型键。局部 selector 的每个逗号分支需受根约束，不能只检查字符串含一个 &。使用结构化解析或证明过的标准工具，不继续堆不完整正则。

raw、global 仍是开发者样式 API，不是任意不可信 CSS 的消毒器；URL 的业务来源策略由应用决定。防止明显超大嵌套/定义增长造成不可诊断资源耗尽，限制应有合理默认和错误信息，不破坏正常复杂样式。

### 10.3 性能验收预算

以下计数不变量是硬门槛，时延/体积值在 P1 建立基线后冻结，不能在失败后临时放宽：

| 工作负载                         | 必须证明                                                |
| -------------------------------- | ------------------------------------------------------- |
| 单绑定稳定结构更新 10,000 次     | 完成提升后新增 Stylis 次数为 0，规则数不随更新次数增长  |
| 1,000 个相同静态实例             | 同层同逻辑位置可共享规则，不按实例复制所有声明          |
| 1,000 个独立动态实例 × 100 轮    | 值不串用；变量规则/绑定数随活跃实例有界，回收后回到基线 |
| 100 轮挂载/卸载与结构分支        | 来源、订阅、DOM 节点、历史等计数回到应有基线            |
| 100 次主题切换                   | Token 引用 class 稳定，无主题规则线性增长               |
| 100 个交错 SSR 请求，含失败/取消 | 主题/nonce/CSS 不串请求，结束后请求资源归零             |
| 大量规则创建与删除               | style 节点按分片/层有界组织，无全表重复排序/重写热路径  |
| 真实主题扩展和包外类型检查       | 记录耗时、峰值内存与基准环境，无明显泛型爆炸            |

基线记录机器、浏览器、构建模式、样本与 p50/p95；比较同环境默认 CSS/无提升路径/提升路径，不能从不同机器单次时间得出加速结论。P1 产出首版预算文件（JS/gzip、CSS/HTML 字节、挂载与更新 p95、类型检查耗时），P7 阻止超预算回归。内存以内部计数和多轮堆趋势结合判断，不用一次 GC 后数字证明无泄漏。

## 11. 验收矩阵与证据

每项对应测试路径、命令、环境、完整 commit SHA 和结果链接。状态只有未实现、已实现未验收、已验收、阻塞；跳过/未执行不能计为已验收。

| ID  | 合同                                      | 验证层                        |
| --- | ----------------------------------------- | ----------------------------- |
| A01 | 根入口只暴露承诺的 API，内部版本匹配      | API 快照 + tarball            |
| A02 | string 返回、关键字/单位/Token/逃生口类型 | 类型 + runtime                |
| A03 | 声明顺序、回退、简写/长写、null 结构      | 单元 + 三浏览器               |
| A04 | 选择器各分支隔离、复杂嵌套/条件           | 单元 + 三浏览器               |
| A05 | 未知标准值保留，注入边界正确              | 属性用例 + 边界输入           |
| A06 | 模板/helper/setup const/$derived          | 编译 + 真实渲染               |
| A07 | 模块常量、重导出、typed css、自定义入口   | 模块编译 + CSR/SSR            |
| A08 | 动态 chunk、tree shaking、双重编译        | 生产构建 + 包外               |
| A09 | 同 class 不同 revision 可更新             | runtime + DOM                 |
| A10 | 两实例、同元素多 class、移除一项          | 三浏览器计算样式              |
| A11 | 分支/循环/helper 调用数变化               | 编译 + runtime                |
| A12 | keyed/unkeyed、对象 key、递归             | 浏览器 + hydration            |
| A13 | snippet 多实例、await、错误边界           | 浏览器 + SSR                  |
| A14 | props/slotProps/第三方已编译组件          | 包外 + 浏览器                 |
| A15 | spread/getter/事件/bind/style:/class:     | 改写前后语义对照              |
| A16 | 动态提升前后层叠一致                      | 三浏览器计算样式              |
| A17 | unsafe 值回退与重新进入安全路径           | 单元 + 浏览器                 |
| A18 | 异常事务、重入、dispose 幂等              | 故障注入 + 单元               |
| A19 | 生产者先销毁、多个消费者                  | runtime + DOM                 |
| A20 | 多应用/多 Document/ShadowRoot             | 浏览器隔离                    |
| A21 | 主题类别/扩展/覆盖/别名循环               | 类型 + 单元                   |
| A22 | typed css 与实际主题 scope 匹配           | 集成 + 负向诊断               |
| A23 | 嵌套主题、Portal、父销毁                  | 浏览器 + SSR                  |
| A24 | light/dark/density/motion/forced-colors   | 最小探针 + 浏览器             |
| A25 | global/keyframes/font/property 引用/冲突  | runtime + 浏览器              |
| A26 | SSR 首屏无 JS 也有样式                    | HTTP HTML + 浏览器禁 JS       |
| A27 | SSR 并发、嵌套、异常、取消                | Node 集成                     |
| A28 | hydration、多根、晚到边界                 | SvelteKit 浏览器              |
| A29 | 路由导航、错误页、redirect、非 HTML       | SvelteKit HTTP/浏览器         |
| A30 | prerender 与静态部署                      | 独立构建产物                  |
| A31 | 流式首屏、晚到 CSS、背压与取消            | HTTP 分块 + 浏览器            |
| A32 | inline/stylesheet 变量通道等价            | 三浏览器计算样式              |
| A33 | nonce + style-src-attr none               | 真实响应头 + violation        |
| A34 | HMR 更新样式/主题/helper/模块删除         | 开发服务器集成                |
| A35 | source map 与错误定位                     | 编译用例 + 人工抽查           |
| A36 | 生成一致性与 metadata 覆盖                | 干净环境生成比较              |
| A37 | tarball 独立 TS/SvelteKit 消费            | 无 workspace alias 的临时项目 |
| A38 | 高频更新、卸载、结构缓存、主题切换        | 计数 + 基准                   |
| A39 | 文档示例通过实际公开 API                  | 类型/编译示例检查             |
| A40 | 浏览器入口不带 Node/编译依赖              | bundle 分析 + SSR import      |

真实 SvelteKit fixture 放在 svelte 测试资源目录，CI 在临时外部目录安装打包产物；不加入第四个产品 workspace，不用 zui-source 或源码路径 alias 绕过发布入口。

## 12. 实施阶段与顺序

所有阶段仅在达到退出条件后标记完成。下表为串行依赖计划，不自动启动子代理。

| 阶段              | 主要交付                                                                            | 依赖/退出条件                                                 |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| P0 基线恢复       | 修两处已知 lint；执行已有 CI；建立差距/证据登记                                     | HEAD 的已有检查得到真实结果；具体失败归入后续阶段             |
| P1 架构验证       | 模块常量跨请求收集、typed css 识别、严格 CSP 通道、流式晚到样式原型；性能基线       | 四项高风险路径有可运行证据；失败必须修订方案，不进入 API 冻结 |
| P2 API/类型/主题  | 统一导出、明确 runtime interface、builder 合同、主题类别/引用/别名/扩展映射、层配置 | A01–A05/A21/A36 初次通过；例子经包外类型原型检验              |
| P3 Runtime/所有权 | 定义/绑定/消费者分离、事务、稳定顺序、资源和样式表后端                              | A09–A11/A16–A20/A25/A32 通过；计数不变量成立                  |
| P4 编译与模块交付 | 模块注册、各种调用位置、语义保持、边界回退、协议/HMR/source map                     | A06–A15/A34/A35 通过；真实依赖包消费不靠路径猜测              |
| P5 主题与宿主整合 | StyleProvider、主题输出、嵌套/Portal/ShadowRoot、首屏偏好                           | A22–A24 通过；自定义 Token 在页面实际生效                     |
| P6 SSR/发布形态   | 真实 SvelteKit、流式、接管、prerender、CSP、取消与错误页                            | A26–A33/A37/A40 通过                                          |
| P7 性能与完成审计 | 大规模回归、预算锁定核对、文档示例和完整能力审计                                    | A38/A39 与全部矩阵通过，风险台账无未处理发布阻塞              |
| P8 候选交付       | tarball/报告/变更说明/支持矩阵/API 文档                                             | 同一完整 SHA 的发布门槛通过；包继续 private，外部发布另行决定 |

P1 是生产架构的风险验证，不是降低目标的 MVP。P2 的 API 冻结只在 P1 证明可行后进行；实现过程中发现合同不可满足，先修订设计并解释影响，不能为追求阶段进度悄悄改变语义。

每阶段按可构建小步中文提交并推送；推送前检查上一轮结果并修具体失败，推送后不等待或轮询新 CI。下次工作继续核对；最终完成状态必须有最后一次提交的已完成 CI 证据，不能在推送当刻宣称全绿。

本地只跑改动相关关键验证，优先 IDE。未发现可用 IDE 工具时明确记录，改用聚焦的类型/测试/格式命令，不运行全仓库代替 CI。本轮只有文档修改，检查格式、链接与 diff 即可。

阶段间查询周额度，至少保留 15%，接近阈值提前整理可继续的证据和状态，不以消耗额度换取形式上的完成。

## 13. 发布门槛与变更治理

首版完成必须同时满足：

1. 支持矩阵中的必须项全部有当前版本证据，A01–A40 不以 skipped 计数。
2. API 文档区分业务入口、宿主接口和内部协议；所有公开方法说明输入、返回、生命周期、错误与 SSR 适用性。
3. 流式、模块样式、CSP 等前期风险已解决；若最终范围有调整须明确讨论记录，不能靠换措辞完成。
4. 干净环境生成、完整类型、单元、构建、三浏览器、SSR、包外消费均通过。
5. 同一提交的 tarball、构建产物、测试报告、预算报告与已知边界可对应。
6. 没有已知实例串值、请求污染、CSS 逃逸、接管误删、线性泄漏或层叠漂移问题。
7. 升级策略包含 compiler/runtime 协议不兼容诊断、旧 API 迁移说明与回退方式。
8. private 状态、包名/许可证/发布范围另行确定；生产可用交付不自动授权 npm 发布或公网部署。

建议用一份可机器读取的验收清单追踪 ID、状态、测试路径、SHA、CI URL、限制；由测试/审计更新，不能预先把规划条目填为通过。CI 分类型/单元/浏览器/SSR/包外/基准任务输出证据，合理拆分当前单 job 的超时压力。

本规划之后的首个实施批次是 P0 + P1；不先铺完整组件库，也不先扩大优化白名单。公开语法大体沿用现有方向，新增复杂度集中在内部协议和宿主接入，并通过生产验收证明。

## 14. 官方依据与本地证据

官方资料于 2026-09-18 核对，依赖具体能力仍以锁定版本实测为准：

- [CSS Cascade Level 5](https://www.w3.org/TR/css-cascade-5/#cascade-sort)：层叠排序依据；本规划的层命名与固定来源顺序是项目设计。
- [CSS Variables](https://www.w3.org/TR/css-variables-1/#invalid-variables)：计算值阶段无效与变量替换；不推出“所有值都安全提升”的结论。
- [CSP Level 3](https://www.w3.org/TR/CSP3/#directive-style-src-attr)：style 属性与样式元素策略边界；双通道实现是项目方案。
- [Svelte server](https://svelte.dev/docs/svelte/svelte-server)：render 的服务端合同；ZUI 需保留必要选项并实测。
- [SvelteKit hooks](https://svelte.dev/docs/kit/hooks)：Handle 与响应转换接入；不等同于已经证明任意流式样式注入可行。
- [当前基线 CI](https://github.com/kenconnet666/zui-svelte/actions/runs/35289205755)：已知 lint 阻塞。
- 本地实现：`core/src/index.ts`、`css/builder.ts`、`css/schema.ts`、`runtime/{classes,binding,promotion,registry,sheet,resources}.ts`、`theme/{types,theme,scope}.ts`。
- 集成证据：`svelte/src/compiler/preprocess.ts`、`svelte/src/server.ts`、`svelte/src/runtime/{context,scope}.ts`、`svelte/tests`、`core/tests`、`docs/tests/core.spec.ts`。
