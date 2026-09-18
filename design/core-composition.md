# Core class 字符串、编译绑定与 slotProps

2026-09-18 补充：模块级静态 class、调用位置、所有权、编译协议与生产验收按 [首版生产可用规划](core-production-plan.md) 继续讨论和实现。本文为前期推导，不作为完成报告。

状态：讨论稿，2026-09-17。已按用户新的公开 API 边界重写；本文 API 示例尚未实现。

## 1. 已确认的公开边界

- css() 返回原始字符串，可以直接放进 class。
- 每个元素独立绑定，不提供 css.parts 或统一命名样式部位模型。
- 使用者不写 panel.props()、StyleHandle、attachment 或生成的 CSS 变量绑定。
- 编译阶段补齐变量、原生元素绑定、SSR 输出与生命周期。
- 普通值初次保持静态，运行时观察变化后提升；结构或语义复杂变化切换哈希规则。
- 多个 class 可以正常并列、条件选择和拼接，不强制先组合成一个 StyleProgram。
- 参数复用优先普通 TS 函数。
- 组件 class 控制根元素；slotProps 转发子元素或子组件的参数、class、style 等。
- 首版支持 SvelteKit/SSR；Docs 仍是普通 Svelte + Vite。

这里接受的是 class 绑定编译，并未重新引入响应式来源分析。类型生成仍是另一个独立的构建步骤。

## 2. 推荐的用户写法

优先直接在模板 class 内调用 css()，局部样式与元素放在一起。只有需要复用或逻辑明显较长时，再提取普通 TS 函数。

```svelte
<button
  class={css((s) => {
    s.display.inlineFlex;
    s.alignItems.center;
    s.width.px(width);
    s.gap.px(12);
  })}>保存</button
>
```

这种写法不要求额外的 $derived。本机 Svelte 5.57.0 已验证其 client/server 语法编译均通过；客户端生成的模板响应式计算包含 width 读取。此验证仅覆盖 Svelte 编译路径，不代表尚未实现的 ZUI runtime 或编译桥已经完成。

编译优化优先处理稳定消费身份、隐藏变量桥、已证明安全的静态描述复用与无变化时跳过提交。不得为了优化把常量提前变量化，或把 switch/函数调用的控制流改成不同语义。

参数复用示例：

```svelte
<script lang="ts">
  let width = $state(240);
  let iconSize = $state(16);

  function rootClass(value: number) {
    return css((s) => {
      s.display.inlineFlex;
      s.width.px(value);
      s.gap.px(12);
    });
  }

  function iconClass(value: number) {
    return css((s) => {
      s.width.px(value);
      s.height.px(value);
    });
  }
</script>

<button class={rootClass(width)}>
  <span class={iconClass(iconSize)}>...</span>
  <span
    class={css((s) => {
      s.whiteSpace.nowrap;
    })}>保存</span
  >
</button>
```

每个 class 值都是字符串，底层 DOM 写入由编译产物协调。s.gap.px(12) 始终保持静态，除非该声明位置的输出确实变化。

公开返回类型可以有 erased brand 提供工具识别，但 typeof 仍必须是 string，不是 String 对象、可调用对象或代理对象。brand 不能代替运行时元数据传递。

## 3. 响应式求值遵循普通 Svelte

推荐将动态调用放在 class 表达式或普通 TS 函数中，由模板在相关状态变化时重新求值。

```svelte
<div
  class={css((s) => {
    s.width.px(width);
  })}
></div>
<div class={rootClass(width)}></div>
```

需要命名响应式结果时，可以使用 Svelte 正常的 $derived：

```ts
const panelClass = $derived(rootClass(width));
```

这是整个计算的标准响应式声明，不是要求为每个 CSS 值写 dynamic 标记。

普通 const panelClass = rootClass(width) 默认仍是一次求值的快照。不能承诺返回的原始字符串会自行变异。

如果将来要自动改写 const panelClass = css(...) 为持续响应式计算，需要定义显式的编译合同、引用传播范围与诊断；当前不默默改变任意 TS const 的语义。

## 4. 编译阶段与运行时的分工

编译阶段：

1. 识别受管 class 消费点、class/style 指令与属性展开。
2. 为消费点生成稳定的实例/调用位置身份。
3. 在客户端连接 class 对应的变量更新与清理。
4. 在 SSR 生成初始 class/style 并收集规则。
5. 在组件边界或最终 DOM 消费点恢复变量绑定。
6. 保留 source map、HMR 和重复转换保护。

运行时：

1. 执行完整同步 JS/TS 回调，包括函数、switch 和循环。
2. 收集有序 CSS 描述，比较结构和值。
3. 默认静态，检测变化后安全提升。
4. 编译/哈希/注册规则并管理引用。
5. 生成元素变量差量，协调多个受管 class。
6. 提交到客户端或请求级 SSR 收集器。

编译器不需要把整个 JS 程序翻译成 CSS，也不根据是不是 $state 预先变量化普通值。

## 5. 字符串与绑定元数据的核心难题

两个实例可以在提升后拥有相同的规则模板：

```css
width: var(--internal-width);
```

但一个值为 240px，另一个为 360px。仅有“规则哈希 → 当前变量值”的全局 Map 会互相覆盖。

必须分离：

- 规则身份：描述可共享的规则。
- 样式实例身份：描述一份独立的结果及其版本。
- DOM 消费身份：描述哪个元素正在消费哪些 class。

候选 A：纯哈希字符串 + 编译器传递旁路元数据。
优点：字符串简洁。代价：任意拼接、跨函数、组件包装、slotProps 对象重建会丢失值与元数据之间的关联；只能支持有明确合同的传递路径，不能只附加一个 Symbol 就宣称所有路径都支持。

候选 B：字符串包含规则 class 与内部绑定标记 class。
例如 "z-r-a31 z-b-17"。标记本身不承载视觉样式，最终 DOM 消费桥可从标准 class 字符串找到实例记录。
优点：保留普通字符串和常规拼接转发。代价：多一个内部标记、实例记录、SSR identity 和释放管理。

推荐验证 B，但是否接受该返回值形式仍待用户选择。此标记不等于要求使用者创建命名样式部位。

不得使用全局 document.querySelectorAll 扫描元素补写变量。绑定发生在编译产生的 DOM 消费点。

## 6. class 不变时变量仍然要更新

提升后 width 从 240 到 241，规则 class 可能完全不变。

Svelte 的派生值如果仍是相同字符串，下游 class 属性更新可能被跳过。因此变量更新不能只监听字符串是否改变。

需要独立的内部结果版本/提交通知：class 相同但变量不同，已挂载消费点仍收到差量。此版本不暴露为用户必须传的 prop。

求值、记录更新和 DOM 提交分离；不能在 $derived 或服务端纯渲染阶段写 DOM。放弃的渲染不留下永久记录。

## 7. 多个独立 class 是正式能力

应支持：

```svelte
<div class={[baseClass, active && activeClass, extraClass]}></div>
<div class={baseClass + ' ' + extraClass}></div>
<div class={{ [baseClass]: true, selected }}></div>
```

兼容 Svelte ClassValue 规范。不要重新发明一套与 Svelte 不同的 false/null/array/object 处理规则。重复 class token 按 class 语义去重，引用不能被重复计数。

受管 class、普通字符串 class、Svelte scoped class 可以共存。普通 class 不要求参与 ZUI 编译元数据。

不强制预先合并。可选的样式函数复用或 compose 只是工具，不是合法使用前提。

覆盖仍遵循原生 CSS；class 字符串或数组的位置不自动表示样式优先级。库基础样式和业务样式可使用明确的层级合同，但不改变第三方 class 的语义。

## 8. 多 class 的变量命名冲突

只按结构哈希命名变量并不总是安全。

假设两个独立 class 在同一元素上都设置 width，并且都提升了动态值。若它们共享 --z-width 或同一个模板变量名，元素级 inline 变量会让两条规则读取同一个值，破坏各自声明的意义。

需要两种可评估策略：

- 变量命名包含样式实例/独立声明来源的命名空间；规则模板仍可缓存，具体变量化规则可能需要按实例物化。
- 若某种共享优化无法保证多 class 同元素时的语义，相关声明回退到普通带具体值的哈希规则，保留两个独立 class。

建议以正确隔离优先。静态规则共享、编译模板共享和物理动态规则共享是三件不同的事；不能承诺有实例变量的所有规则仍能全局合并为一条。

一个元素需要内部协调者管理所有受管 class 的变量集合。删除一个 class，只清理它独有且无人消费的变量，不清掉其他 class 或用户 style。

这不要求使用者组合 class，协调由编译产物完成。

## 9. class 的可传递范围

| 路径                                       | 目标                                       |
| ------------------------------------------ | ------------------------------------------ |
| 原生 class 内直接 css()                    | 首版必需                                   |
| TS helper 返回 css() 字符串，在模板调用    | 首版必需                                   |
| Svelte 字符串、数组、对象、条件 class      | 首版必需                                   |
| ZUI 组件根 class                           | 首版必需                                   |
| ZUI slotProps 中 class                     | 首版必需                                   |
| 第一方包装组件转发 class/rest props        | 首版必需                                   |
| 多个 keyed 重复项                          | 首版必需，绑定历史按实例隔离               |
| 动态 style、style: 指令与 class 共存       | 首版必需                                   |
| 未经过集成的第三方组件内部 DOM             | 不能无条件承诺自动变量注入                 |
| 截断、重命名、持久化后跨请求恢复内部 class | 不属于可靠的活绑定传递                     |
| 原生 DOM className 赋值，绕过编译消费点    | 保留完整静态规则能力；自动提升需要明确集成 |

对无法接入变量消费的边界，必须保持完整 class 规则路径，或提供可定位诊断，不能输出一个依赖缺失变量的 class。尤其是同一结果同时被已集成和未集成目标使用时，不允许提升一个目标就使另一目标失效。

普通 JS 任意变化不必被全部静态分析。存在不可靠 identity 时可以放弃提升而继续生成正确哈希规则，不能拿另一个实例的历史来猜测。

## 10. 组件根 class 和 slotProps

根 class 直接控制组件根元素，库内部 class 与用户 class 并列保留：

```svelte
<ZSelect
  class={rootClass(width)}
  slotProps={{
    input: {
      placeholder: '搜索',
      class: inputClass(fontSize),
    },
    popup: {
      class: popupClass(maxHeight),
      style: 'min-width: 280px',
    },
    clearButton: {
      title: '清空',
      'aria-label': '清空选择',
    },
  }}
/>
```

slotProps 是组件参数转发合同，不是 core 的样式部位定义。每个内部节点仍有独立 class。

某个 slot 可以是真实 DOM，也可以是子组件：

- DOM slot 的类型来自对应 HTML/SVG 属性。
- 子组件 slot 的类型来自其公开 ComponentProps。
- 参数、class、style、事件各自保留明确含义。
- 不把任意 slot 参数传播到组件根元素。
- 不为样式强制增加 wrapper 元素。
- 当前组件没有的 slot key 在类型层报错。

slotProps 中的 class 到达最终元素后，与直接写在该元素上的 class 使用相同消费桥。不能因为它经过了对象或 Portal 就退化成不更新的静态字符串。

## 11. 重复子元素与 slotProps 回调

Select option、Table row/cell 的参数可能依赖具体项。建议允许对象与工厂两种形式：

```svelte
<ZSelect
  slotProps={{
    option: ({ item, selected, disabled }) => ({
      title: item.label,
      class: optionClass({ selected, disabled }),
    }),
  }}
/>
```

这是普通参数函数，不是 CSS 动态 getter。

每个实际项在自己的生命周期和响应式上下文中解析，CSS 比较历史不能在所有 option 之间共用。虚拟化回收需清理旧记录；key 变化必须重建对应绑定身份。

上下文只暴露稳定的公开数据，例如 item/index/selected/disabled，不把内部引用、缓存或所有状态公开。

函数可以按当前状态返回新对象，缓存基于样式和参数语义，不以对象引用相等作为正确性的前提。

## 12. slotProps 合并规则

| 内容                                      | 处理原则                                         |
| ----------------------------------------- | ------------------------------------------------ |
| 普通可覆盖参数                            | 组件默认值后应用用户值                           |
| class                                     | 保留内部与用户 class，遵守 CSS 层叠              |
| style                                     | 按明确顺序合并，不覆盖掉 runtime 内部变量        |
| style: 指令                               | 保留 Svelte 自身优先级与 important 语义          |
| 事件                                      | 组件 API 指定执行顺序及是否尊重 defaultPrevented |
| 内部 ref/节点引用                         | 与用户回调协调，不能覆盖组件自身引用             |
| role/id/ARIA 关系/value/disabled 等受控项 | 按具体 slot 声明哪些允许覆盖，不能盲目展开       |
| Portal 定位所需 style                     | 明确哪些是受控值、哪些可以自定义                 |

style 不能用简单按分号切割的解析器处理复杂 CSS 值。保留标准 style 字符串能力，内部变量通过独立保留命名区差量处理。

用户直接写原生 style="width:..." 具有原生覆盖语义，可能覆盖 class 中的 width；runtime 不应为了“生效”偷偷增加 important。

事件不能承诺永远两边都执行：会改变组件行为的事件，需要明确 defaultPrevented 的合同和例外。类型与运行时都应约束重要受控属性。

## 13. 参数优先普通 TS 函数

```ts
function panelClass(options: { width: number; compact: boolean }): string {
  return css((s) => {
    s.width.px(options.width);
    s.gap.px(options.compact ? 8 : 16);
  });
}
```

```svelte
<div class={panelClass({ width, compact })}></div>
```

不按 options 对象地址生成规则 key。样式回调支持同步函数、switch、循环和普通计算。

css 调用如果出现在复杂 helper 中，编译/运行时需要明确其所属求值上下文。能稳定关联调用位置时学习历史；不能稳定关联时退回完整规则更新。不能把函数字符串或堆栈当成生产身份。

异步回调与随机副作用不属于推荐样式函数合同；普通不可分析的同步计算仍应能按执行结果生成正确 CSS。

## 14. 选择器与独立子元素

继续保留 _selector、_media、_supports、_container，以及高频状态 helper。

- & 指向当前 class 对应的元素。
- 子级、兄弟、祖先条件保持标准 CSS 语义。
- 同元素状态和明确可安全处理的伪元素值可以提升。
- 作用于其他元素的规则不能把变量随意写到当前元素；可独立绑定目标，或保持普通规则更新。
- 不需要 css.parts 才能表达 child selector。
- 外部稳定 class 可用于选择器；自动哈希 class 会变化，不建议截取并持久化。
- 若允许选择器引用另一个动态 class 字符串，必须跟随引用更新；字符串包含多个 token 时不能简单加一个点拼接，且内部绑定标记不能泄漏成错误的复合选择器。
- 嵌套同类组件的后代选择器仍然按 CSS 匹配，不暗中解释为“只属于本组件”。

样式组、ref selector 或 helper 可以以后讨论，不作为独立 class 能力的前提。

## 15. 覆盖、顺序与规则回收

多 class 的自由组合保留 CSS 层叠。库可以定义 components/overrides 等正常声明层，但 important 和未分层样式仍按浏览器规则处理。

首次提升或结构切换不能因为把新规则追加到末尾而改变无关规则之间的覆盖结果。registry 需要稳定的逻辑顺序，去重考虑必要的放置上下文。

同文本规则在不同必要优先级位置未必可共享物理记录。缓存优化必须服从层叠正确性。

释放分为样式求值记录、DOM 消费引用、规则引用。字符串暂时没有被消费时不能无限累积注册记录；分支退出、虚拟项复用、组件销毁和 HMR 都需要回收。常量 class 若长期复用，需要模块或明确 runtime scope 持有，不依赖永不回收的全局 Map。

## 16. SSR 与编译发布链路

- client/server 使用同一套 class 变换规则。
- 服务端请求级记录、主题与样式收集，不共享当前变量值。
- 第一轮静态规则与客户端初值一致，hydrate 后才开始学习。
- 内部绑定 ID 使用可复现或可接管的生成方案，不用全局随机数/进程计数器。
- class 不变时的内部版本同步在 hydration 后正常工作。
- class 与 style 属性和 style 标签内容正确转义。
- SvelteKit 实际消费验证 nonce、首屏、并发请求、Portal 与主题一致。
- 内部桥接版本写入编译契约，编译插件与 runtime 不兼容时给明确错误。
- 第一方库包预处理自己的 .svelte 源文件，消费项目再处理自身代码；需要去重标记，避免双重转换。
- 未编译第三方组件须有明确正确回退，不声称插件可以恢复所有已编译 DOM 语义。

实现应基于 Svelte AST 与公开 preprocess/compiler 能力，并保留 source map；不能用字符串正则替换 HTML class。

三个 workspace 不变。编译入口可放在 svelte 包的工具子路径中；具体位置需避免将 Node 构建依赖带入浏览器入口。

## 17. 类型合同

- css() 对用户始终返回 string，可用编译期 brand，但不携带公开对象方法。
- 组件 class 使用 Svelte ClassValue，接受合法字符串/数组/对象。
- slotProps 的 key 来自组件自己的公开转发定义，不来自 core 样式系统。
- DOM slot 继承适当的 HTMLAttributes，组件 slot 继承 ComponentProps，再精确排除内部受控项。
- option 工厂的参数从组件 item 泛型和公开状态推导。
- 不使用 Record<string, any> 容纳所有 slot。
- CSS 属性、关键词、单位、主题 Token 继续走共用 metadata 生成。
- 需验证 class 字符串经过 TS helper、数组、组件 props、slotProps 后的类型和实际行为，两者缺一不可。

## 18. 首版验证重点

1. 原始字符串返回类型与常规 class 语法。
2. 常量不参数化，变化后提升，复杂结构换规则。
3. 两实例同规则不同变量不串值。
4. class 字符串不变时，变量仍正确更新。
5. 同元素两个独立受管 class 的变量不冲突。
6. 删除一个 class 不删除另一个的变量与用户 style。
7. wrapper、slotProps、Portal、重复项和虚拟化的转发。
8. scoped CSS、普通外部 class、动态 style 和 style: 指令共存。
9. SSR、hydration、请求隔离和稳定绑定身份。
10. 未集成第三方边界保持完整规则或明确诊断，不能静默失效。
11. 规则位置、important 和动态迁移前后的计算样式。
12. 编译 source map、HMR、双重处理和包外消费。
13. 编译期无需推断任意 JS 的响应式来源或把用户函数改写成 CSS。

先做这些契约的可验证原型，再定最终 compiler/runtime 数据结构；当前只讨论，不把未验证的字符串元数据方案描述成已经可用。

## 19. 尚待定的重点

1. 返回字符串是否允许内部绑定标记；推荐方向已询问用户，未答复前保持候选。
2. class 根覆盖与 slotProps 事件/受控属性的具体优先级。
3. 单纯 const css(...) 是否保持普通快照语义；推荐保持，动态调用放模板或正常 $derived。
4. 针对第三方未编译组件的正确回退与集成方式。
5. 动态规则变量隔离与物理规则共享的平衡，需要真实原型验证。

## 20. 参考

- [Svelte class / ClassValue](https://svelte.dev/docs/svelte/class)
- [Svelte derived](https://svelte.dev/docs/svelte/$derived)
- [Svelte compiler](https://svelte.dev/docs/svelte/svelte-compiler)
- [Svelte style 指令](https://svelte.dev/docs/svelte/style)
- [CSS cascade](https://www.w3.org/TR/css-cascade-5/)
- [MUI slotProps 与内部结构](https://mui.com/material-ui/customization/overriding-component-structure/)
- 本地参考：zadmin/ui/zui/src/compiler 与 runtime/foundation/compiler-bridge.ts。其编译 carrier 和组件边界回退可提供经验，不直接复制其动态值来源分析。
