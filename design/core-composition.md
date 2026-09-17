# Core 生产级组合设计

状态：讨论稿，2026-09-17。本文的 API 都是候选写法，尚未实现。

已确认：默认静态，观察同一绑定的输出变化后自动提升；复杂变化切换规则；不追踪响应式来源，不要求手动 dynamic/getter。首版支持 SvelteKit/SSR 消费，Docs 仍是普通 Svelte + Vite。

类型生成与主题的详细合同见 [类型与主题设计](core-types-theme.md)。

## 1. 首版生产目标

首版至少能正确支撑 Button、Input/Field、Select/Combobox、Dialog/Drawer、虚拟列表行、嵌套主题和 SSR，并非只支持单元素的 width 演示。

生产可用不要求所有声明都变量化。不能证明提升保持原有语义时，自动回退到普通哈希规则更新，功能仍然完整。

不把 API 限制扩大为 CSS 能力限制：任意有效选择器、复杂值、动态条件可经标准 CSS 入口表达；优化路径只覆盖能保证正确的情况。

## 2. 一套描述，两种执行环境

建议核心分为：

- 有序样式描述与组合：纯计算，不访问 DOM。
- 规则编译与注册：按样式作用域和逻辑顺序管理。
- 实例绑定：比较历史、自动提升、管理变量和引用。
- 服务端收集：请求级生成首屏规则与渲染快照。
- Svelte 适配：参数读取、响应式订阅、渲染属性和挂载提交。

渲染阶段只准备可复现的结果，客户端 DOM 提交阶段才取得活动引用与写入。尚未挂载或放弃的渲染不能产生永久绑定。SSR 请求结束时销毁请求容器。

## 3. SSR 使原生元素入口需要升级

单独的 {@attach panel} 不能输出服务器首屏 class/style。

| 候选         | 用户写法                                                           | 评价                               |
| ------------ | ------------------------------------------------------------------ | ---------------------------------- |
| 分开输出     | class={panel.className} style={panel.style} {@attach panel.attach} | 最显式，但易漏项和重复合并         |
| 统一属性载体 | {...panel.props()}                                                 | 推荐深入验证，可统一首屏和挂载     |
| 包装组件     | <ZBox css={...}>                                                   | 使用简单，但不适合所有原生语义元素 |
| 编译插件     | 自动改写原生模板                                                   | 当前不作为必需条件                 |

候选主入口：

```svelte
<script lang="ts">
  let width = $state(240);
  const panel = css((s) => {
    s.width.px(width);
    s.gap.px(12);
  });
</script>

<div {...panel.props()}>...</div>
```

props() 输出当前渲染快照的 class、必要的 style，以及 Svelte createAttachmentKey 对应的 attachment。这只是实现方向，不能只返回一个可变对象就认为响应式和 SSR 已完成。

用户已有属性通过同一入口合并：

```svelte
<div {...panel.props({ class: className, style: userStyle, onclick })}>...</div>
```

- 不要求用户手写 CSS 变量或动态声明。
- class/style 必须由单一协调者输出并更新，避免 Svelte 重写属性后丢失 runtime 内容。
- 原生事件和 ARIA 继续正常传递；css 工具不接管业务事件。
- 不推荐 <div {...a.props()} {...b.props()}>，原生对象展开不会自动合并 class/style。
- 同一 StyleHandle 默认对应一个渲染绑定位置；在多个位置复用时，必须创建独立绑定。复用的是样式函数/定义，避免同一可变 handle 混用多个 DOM。
- 重复行由每个行组件或 keyed block 的实例持有自己的绑定。

SSR 必须同步得到首次静态结果；客户端从相同初始状态接管，挂载后再学习动态值。不能把客户端历史提升掩码依赖于服务器不存在的执行次数。

## 4. 选择器：标准入口 + 少量便利入口

以当前元素为锚点的 & 表达标准 CSS 关系：

```ts
css((s) => {
  s.display.flex;

  s._hover((s) => {
    s.backgroundColor._surfaceHover;
  });

  s._selector('&[data-state="open"]', (s) => {
    s.borderColor._primary;
  });

  s._selector('& > [data-z-part="icon"]', (s) => {
    s.marginInlineEnd.px(8);
  });

  s._selector('&:has(input:invalid)', (s) => {
    s.borderColor._danger;
  });
});
```

候选通用入口只有 _selector、_media、_supports、_container；hover/focusVisible/before 等高频入口由 metadata 描述或薄包装提供。不为每一种 CSS 语法创建新概念。

| 类型                                            | 支持方式               | 自动提升目标                                   |
| ----------------------------------------------- | ---------------------- | ---------------------------------------------- |
| &:hover、&:focus-visible、&[data-*]             | 同元素状态选择器       | 当前元素                                       |
| &::before、&::after、&::placeholder             | 伪元素选择器           | 必须验证变量继承与适用属性                     |
| & > .child、& .descendant                       | 子级/后代              | 优先让目标元素独立绑定；普通选择器保留规则更新 |
| & + .peer、& ~ .peer                            | 兄弟关系               | 当前元素变量不能直接到达，默认规则更新         |
| .ancestor &                                     | 祖先条件、当前元素目标 | 能证明目标仍是当前绑定时可提升                 |
| &:is(...)、&:not(...)、&:where(...)、&:has(...) | 标准 CSS               | 不把函数内部被匹配元素误认为声明目标           |
| :nth-child(...)、复杂列表及组合器               | 标准 CSS               | 分类不明时回退到规则更新                       |
| @media / @supports / @container 内声明          | 保留嵌套条件           | 条件不变且目标明确时可提升                     |
| 条件字符串或选择器变化                          | 新结构                 | 切换规则                                       |

不得用一次正则检测是否包含 & 就认定声明作用于当前元素。可以让明确的 helper 携带目标信息；通用字符串选择器在没有可靠语法分类时走保守路径。

默认局部 selector 要有明确锚点；全局规则使用单独的 globalStyles 注册入口，防止一次局部配置意外污染页面。全局规则也要有作用域、释放和 SSR 收集合同。

CSS 浏览器支持仍遵循宿主浏览器。现代选择器可以在 @supports 中提供降级；不会通过 JS 模拟所有新选择器。

## 5. 子 class 与命名部位

复杂组件需要让每个有独立样式和生命周期的 DOM 部位拥有绑定。

候选：

```ts
const button = css.parts({
  root: (s) => {
    s.display.inlineFlex;
    s.alignItems.center;
    s.gap.px(gap);
  },
  icon: (s) => {
    s.width.px(iconSize);
    s.height.px(iconSize);
  },
  label: (s) => {
    s.whiteSpace.nowrap;
  },
});
```

```svelte
<button {...button.root.props({ type: 'button', disabled })}>
  <span {...button.icon.props()}>...</span>
  <span {...button.label.props()}>保存</span>
</button>
```

root、icon、label 是样式部位，不等于 Svelte 的内容插槽。命名集合在定义时固定，支持类型补全与未知部位报错。

每个 part 有独立 class/变量/挂载引用，允许某个 part 不存在，也允许 root 外的 Portal part。不应一次让每个 option 使用同一份可变 part handle；重复项需要实例级绑定。

三种选择器身份必须区分：

1. 哈希类：规则的内部身份，不能成为稳定的外部 API。
2. 稳定标记：如 data-z-part="icon"，用于调试及声明过的语义定制。
3. 实例归属：需要严格区分嵌套同类组件时，由绑定组管理，不能只靠全局 .icon 名称。

.root .icon 会匹配内部嵌套组件的 icon，这是 CSS 的正常含义。原始 selector 保留该含义，不暗中改成“属于当前组件的所有图标”。

对于组件内强隔离的样式：

- 优先在目标 part 自己的回调里定义样式。
- 已知直接子级可以使用 > 关系。
- 跨多层归属关系需要明确的 owner scope 或受支持的 @scope 实现；不能假设它天然存在。
- 如果采用实例 owner 选择器，关系规则可能无法跨实例共享；允许以少量规则换正确隔离。
- @scope 不是未经浏览器矩阵验证就依赖的唯一隔离机制。

不查询所有匹配后代再给它们批量写变量；这会引入 MutationObserver、清理竞态和不清楚的 DOM 所有权。

## 6. 变量必须写到合适的元素

root 自身 width 变化：变量写 root。
icon 自身尺寸变化：变量写 icon。
Portal popup 宽度变化：变量写 popup。
伪元素不能直接绑定 DOM：由其来源元素传递变量，并验证同名覆盖。

避免把所有变量都写根节点：

- 兄弟或 Portal 不继承根节点变量。
- 嵌套同类组件可能覆盖相同变量。
- 将包含 var(--theme-token) 的表达式从子节点移到祖先，可能改变变量解析所处的主题环境。
- 后代上的主题覆盖必须在后代继续生效。

内部变量按规则及位置隔离。所有使用变量规则的元素必须拥有自己的必要值，不能通过变量缺失借用祖先实例的值。

## 7. 多个 class：身份组合与样式组合分开

浏览器不按 class="a b" 中 a/b 的文本顺序决定同优先级规则谁覆盖谁。决定因素仍是层叠层、重要性、specificity 和规则顺序。

推荐在生成规则之前组合样式：

```ts
function surface(s: StyleBuilder) {
  s.backgroundColor._surface;
}

function compactLayout(s: StyleBuilder) {
  s.gap.px(8);
}

const panel = css((s) => {
  surface(s);
  if (compact) compactLayout(s);
  localCss?.(s);
});
```

普通函数调用就能复用和传参，不需要先创造大量 recipe/mixin 包装类型。

处理原则：

- 同一通道内按执行顺序保留声明与嵌套块。
- 同条件、同优先级的冲突遵守正常 CSS 顺序。
- 不使用对象最后赋值直接丢掉前面的回退声明。
- shorthand、longhand、important、不同 selector 不被一个简单“后者覆盖前者”算法扁平化。
- 若提供数组组合，数组顺序成为明确的组合输入，不等于 HTML class 顺序。
- 用户给定的外部 class 保留正常 CSS 行为，不解析第三方样式表，不承诺数组后项一定压过它。

同一元素的组件样式和用户 css 可输出多个 class，但逻辑优先级由固定通道决定，不靠碰巧的挂载顺序。

## 8. 覆盖合同与规则位置

候选正常声明层：

```css
@layer zui.reset, zui.theme, zui.components, zui.overrides;
```

- reset 显式启用，避免库导入就重置整页。
- theme 输出主题作用域与基础变量。
- components 包含基础、选中变体和复合变体的有序结果。
- overrides 包含应用级组件定制和本地 css，二者仍需确定内部顺序。
- 外部未分层样式对正常声明有自己的原生优先级。
- important 的层顺序与正常声明不同，不承诺上述箭头对 important 同样成立。
- 原生 style="width:..." 保留其正常层叠语义；自动生成的是 --z-* 内部变量。
- CSS 覆盖不改变 disabled 等真实交互状态。

通道内部若依赖规则先后，registry 必须保留稳定的逻辑位置。首次提升时不能把新规则无条件追加到末尾。

去重 key 应包含必要的优先级/放置上下文。两个文本相同但处于不同必要顺序位置的规则，不一定可以合并成同一物理记录；不能为了最大化共享破坏层叠。

一个受管组合输出一份有序程序，比多个互不知情的 attachment 竞争同一属性更容易保证稳定。因此默认每个元素一个样式协调者。低层多绑定必须明确顺序与共享所有权，不默认承诺“后挂载胜出”。

## 9. 参数与复用

推荐普通 TS 参数，在被追踪的样式回调内部读取：

```ts
interface SurfaceOptions {
  padding: number;
  muted: boolean;
}

function surface(s: StyleBuilder, options: SurfaceOptions) {
  s.padding.px(options.padding);
  if (options.muted) s.opacity(0.6);
}

const panel = css((s) => {
  surface(s, { padding, muted });
  s.width.px(width);
});
```

- 不要求用户提供动态值 getter。
- 不按参数对象引用作为 CSS 缓存 key；比较规范化的样式结果。
- 在组件初始化时把 width 复制进普通对象，不会自动保持后续响应式关系；文档需要说明取值时机。
- 支持纯同步函数、switch、循环；不把 async 回调加入样式合同。
- 循环项顺序/数量改变属于结构变化。稳定 key 用于组件或绑定实例，不通过参数对象深 hash 猜生命周期。
- DOM 测量在挂载之后执行，结果进入响应式状态；SSR 的样式回调本身不能依赖 getComputedStyle。

## 10. Recipe 与复杂组件

Recipe 是可选的类型化变体组织方式，不替代普通 JS：

- base
- variants
- compoundVariants
- defaultVariants
- parts

变体选项和 part 名称应从定义推导。候选执行顺序为 base → 定义顺序的 variants → compound 列表 → 应用定制 → 实例 css。不要依赖调用方参数对象的键顺序。

状态表达有两类：

- 浏览器状态：hover、focus-visible、disabled 等，用原生伪类或真实属性。
- 组件状态：selected、open、invalid、loading 等，用经过定义的 data/ARIA 属性。

相同结构的变体输出可以自然被提升；改变声明或选择器的变体走规则切换，不强制将所有变体编码为变量。

组件外部定制备选：

| 方案                       | 优点                                  | 代价                                 |
| -------------------------- | ------------------------------------- | ------------------------------------ |
| css + partCss + classNames | 样式职责直观                          | 参数数量较多，扩展原生属性需再加入口 |
| 根 css + partProps         | 每个部位集中 css/class/style/安全属性 | 需要精确约束允许覆盖的属性           |
| 只公开深层 selector        | 最少 props                            | 耦合 DOM，Portal 和嵌套隔离困难      |

推荐继续讨论根 css + 类型化 partProps，root 原生属性仍直接传组件；避免同时有两个不同的 root 定制入口。

例如：

```svelte
<ZSelect
  css={(s) => {
    s.width.px(320);
  }}
  partProps={{
    popup: {
      css: (s) => {
        s.maxHeight.px(360);
      },
    },
    option: { class: 'app-option' },
  }}
/>
```

重复 option 的 css 在每个实际 option 绑定中执行，可额外接收公开的只读状态，如 selected/disabled。不要把组件全部内部状态作为样式上下文公开。

partProps 不能绕过组件控制的 role、id、aria 关系和内部事件合同。事件是否可阻止默认内部行为由组件 API 明确规定，不由 CSS 合并器猜测。

## 11. Select 与 Dialog 的首版验收样例

Select：

- trigger、value、icon、popup、list、option、empty、loading 分开绑定。
- popup 进入 Portal 后仍获得正确主题作用域和自身变量。
- option 重复项使用独立实例，虚拟化回收后清理旧变量。
- selected/disabled/active 状态与交互模块协调。
- matchWidth 的测量结果只更新 popup 宽度，不影响其他 Select。

Dialog：

- overlay、content、header、body、footer、close 分开绑定。
- 动画结束前保留需要的样式引用，避免 DOM 尚在退出动画但规则被删掉。
- 外层主题与 body Portal 的主题同步，嵌套 Dialog 不能串值。
- 样式 core 不负责焦点锁、滚动锁、键盘事件或业务关闭策略。
- 多 Document/iframe 的目标 realm 使用正确样式表。

这些样例应在首版实现过程中成为真实消费验收，不靠一批字符串快照代替。

## 12. SSR、hydration、CSP 与 HMR

SSR：

- registry、主题选择和收集缓冲区按请求隔离。
- 收集首屏规则并在内容展示前提供，不依赖客户端 effect。
- 哈希由规范化内容与必要的版本/上下文决定，不依赖模块导入或请求执行顺序。
- 首次结果保持静态；服务端与客户端同状态生成同样规则。
- 服务器输出需要正确转义 style 标签终止序列和 HTML 属性，不能直接拼接未经处理的字符串。
- 流式输出需要增量去重与规则先于内容的策略；首版至少保证普通 SSR 正确，对流式消费明确支持范围。
- 实际消费测试包含普通 svelte/server 和 SvelteKit；SvelteKit 可作为验收 fixture，不改变 docs 的架构。

Hydration：

- 识别和接管已存在的规则，避免重复插入。
- 保留声明优先级、主题 scheme、首屏状态。
- 接管完成后再开始学习动态位置。
- 浏览器测量导致的更新属于挂载后的正常变化，不能在 hydration 前伪造服务端不存在的尺寸。

CSP：

- stylesheet nonce 支持与 SSR style 属性策略分开。
- 若策略不允许某种变量写入路径，应自动保留规则更新路径，不能默认要求 unsafe-inline。
- 按具体策略测试 CSSOM 写入和序列化 HTML，不能把一种浏览器行为推广到全部。
- CSP 下仍能呈现正确内容，变量提升是可降级优化。

HMR：

- 以模块/作用域/绑定生命周期释放资源。
- 首先保证旧规则与监听清理，保留提升历史属于可选优化。
- 不强制普通使用者手动传 import.meta。

## 13. 动画与其他全局资源

- keyframes 使用共享注册与引用计数，不能每帧生成一组新名称。
- 高频动画参数可以通过消费元素变量表达；结构变化才更新 keyframes 定义。
- @font-face、@property、全局 reset 分别有注册语义，不能混进普通元素声明 diff。
- 原生 transition/animation 的延续与首次提升是否产生额外过渡，要在真实浏览器验证。
- reduced-motion 属于主题/用户偏好策略，组件需实际响应。
- @property 只在需要明确类型、继承或动画插值时显式注册，不为每个内部变量自动生成全局注册。

## 14. 必须建立的生产合同

| 范围     | 验收要求                                               |
| -------- | ------------------------------------------------------ |
| 自动提升 | 常量不参数化；首次变化提升；后续值更新不增规则         |
| 多实例   | 一实例提升不影响另一实例；嵌套同类不串值               |
| 选择器   | 状态、伪元素、子级、兄弟、祖先条件、复杂列表与条件块   |
| 层叠     | 组合顺序、层、specificity、important、提升前后计算样式 |
| 删除     | 撤销声明后外部样式接管，不遗留 var 声明                |
| 多部位   | 独立变量、重复项、可选 part、Portal、嵌套与虚拟化      |
| 参数     | 普通函数、条件、循环、参数值相同不多写 DOM             |
| 生命周期 | 挂载卸载、转移目标、HMR、退出动画、错误回滚            |
| SSR      | 请求隔离、首屏 CSS、hydrate 去重、主题一致             |
| 运行环境 | Chromium、Firefox、WebKit，以及声明支持的 WebView      |
| 包发布   | 两个真实 tarball、纯 Svelte/Vite 与 SvelteKit 消费     |
| 类型     | 生成器一致性、公开声明、未知属性/Token/part 的负向检查 |
| 性能     | 高频更新、千级重复项、切换结构、回收后的内存与规则数量 |

编译和插入新规则失败时，保留最后有效样式；错误需要可定位的属性/条件/组件信息，不吞错。不能先释放旧规则再发现新规则不可用。

性能目标使用实际测量，不提前承诺固定倍数。稳定值更新仍有回调执行、比较和浏览器样式计算成本。

## 15. 待讨论，不提前锁死的 API

1. 原生元素是否采用 panel.props(existingProps) 作为兼顾 SSR 的统一入口。
2. 多部位是否采用 css.parts，组件对外是否使用根 css + partProps。
3. 可复用样式优先普通函数；是否需要额外的数组 compose 入口。
4. 库正常样式是否采用固定 @layer 通道，外部 CSS 的覆盖规则如何文档化。
5. 关系 selector 使用原生语义，严格“本组件所属 part”是否提供高层 scope 能力。

类型与主题的决定单独在 core-types-theme.md 讨论。已确认的自动提升方向和 SSR 范围不再重复请求确认。

## 16. 来源与参考

- [CSS Cascade 5](https://www.w3.org/TR/css-cascade-5/)
- [Selectors 4](https://www.w3.org/TR/selectors-4/)
- [CSS Variables](https://www.w3.org/TR/css-variables-1/)
- [CSS Cascade 6 / scope](https://www.w3.org/TR/css-cascade-6/)
- [Svelte attachments](https://svelte.dev/docs/svelte/@attach)
- [Svelte createAttachmentKey](https://svelte.dev/docs/svelte/svelte-attachments)
- [MUI 定制与部位](https://mui.com/material-ui/customization/how-to-customize/)
- 本地参考：zadmin/ui/zui/src/recipes/define.ts 与 slots.ts。参考其组织方式，不继承所有 API、计数器 identity 或固定分支上限。
