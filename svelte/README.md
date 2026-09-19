# @zui/svelte

Svelte 5 组件库工作区，依赖 @zui/core，使用官方 svelte-package 生成发布产物。

当前实现 class 编译插件、运行时桥、SSR 收集，以及 UI 亮暗预设、五档尺度和带主题补全的 css，尚无业务组件。真实 SvelteKit、独立 tarball 与 prerender 的既有基线见 [验收台账](../.design/core-acceptance.md)，本次主题分包由新 CI 验证。组件 API 见 [讨论稿](../.design/svelte-components.md)。

- 构建：`pnpm --filter @zui/svelte build`
- 类型检查：`pnpm --filter @zui/svelte check`
- 编译与 SSR 测试：`pnpm --filter @zui/svelte test`
- SvelteKit 浏览器测试：`pnpm --filter @zui/svelte test:kit`
- 开发态验收：`pnpm --filter @zui/svelte test:dev`，CI 使用三浏览器；本机默认复用 Chrome，仅按改动运行相关用例。
- 完整包外验收：根目录执行 `pnpm test:packages`，由 CI 在构建与浏览器准备后运行。

## 导入与运行环境

业务组件、公共类型、主题 css、Zod、Decimal 和日期类型统一使用主入口；不再按 Button/Form/主题等拆分业务子入口。已接入 Zod 4、decimal.js 和 @internationalized/date：

```ts
import { Decimal, parseDate, z, css, lightTheme } from '@zui/svelte';

const schema = z.object({ name: z.string().min(2, '名称至少两个字符') });
type Model = z.input<typeof schema>;

const amount = new Decimal('0.1').plus('0.2');
amount.toFixed(2); // '0.30'；传输保留字符串。
const nextDay = parseDate('2026-09-19').add({ days: 1 });
nextDay.toString(); // '2026-09-20'，没有隐式时区转换。
```

Form/Field/DecimalInput 尚未实现，当前只是依赖和统一导出接入。独立 Node 后端若不经过 Svelte 编译，可直接从 zod/decimal.js 导入共享规则和数值类型，不强制加载 UI 入口。Decimal 业务值从字符串构造，运算后赋回响应式属性，接口使用明确十进制字符串，不默认转回 number。

日期公开入口包括 CalendarDate、CalendarDateTime、Time、ZonedDateTime、createCalendar 及 parseDate/parseDateTime/parseTime/parseZonedDateTime。独立后端可直接使用 @internationalized/date；纯日期与时区时间不是同一种业务值。Kit 自定义值传输范例见 tests/kit/src/hooks.ts，完整协议与限制见 [.design](../.design/svelte-components.md#日期类型已接入ssr-传输复用宿主协议)。

| 路径                 | 使用者与边界                                                          |
| -------------------- | --------------------------------------------------------------------- |
| @zui/svelte          | 业务代码：组件/类型/主题/css/z/Decimal，适用于 Svelte 编译消费        |
| @zui/svelte/compiler | Vite/Svelte 构建配置；使用 node:crypto、node:path、编译器等构建期能力 |
| @zui/svelte/server   | Node SSR/SvelteKit 服务端接入；包含 AsyncLocalStorage，不进入浏览器图 |
| @zui/svelte/internal | 生成代码的运行时协议入口；业务无需导入，升级与编译产物配套            |

后三者按执行环境/协议隔离，不是按业务功能分包。直接全部 re-export 到主入口会把 Node 模块带入解析图；条件导出虽可改写入口，但会增加环境 API/类型差异，因此保留现有边界。exports 中的 zui-source/types/svelte/default 是同一个路径的不同解析目标，zui-source 仅供工作区开发与测试。

## 最小接入

配置基础已提供 ConfigProvider、zhCN/enUS 与 Size/Radius 等类型。Provider 不产生额外 DOM，使用 getter 作用域继承 size/radius/locale/dir；实例显式值优先，undefined 继续继承，false 不会被吞掉。组件私有样式和 slotProps 合并只对明确登记的组件启用，事件不会被自动串联。

公开视觉组件尚未发布，因此默认组件配置清单暂为空。库内清单由 components.mjs 维护实际文件与允许配置的字段，组件默认值仍只写在原生 $props() 中；build.mjs 从当前编译器源码 bootstrap 后预编译发布组件，不依赖旧 dist。生成类型是 ComponentProps/Pick，不抄写另一份属性类型。业务自定义组件可用 ConfigProvider 的原生 TS 泛型明确其配置类型，再在 zui 插件 components 选项中登记，未登记的组件不会被改写。

mergeProps/mergeSlotProps 保留 class、CSS 声明字符串和 attachment Symbol，只递归 slotProps；普通数据保持引用，函数按普通覆盖处理。可取消事件由组件显式调用外部回调后判断 defaultPrevented，不能重复组合一次。

普通 Svelte + Vite 项目的 vite.config.ts 中，ZUI 插件放在 Svelte 插件之前。以下写法消费构建后的包，不需要工作区专用的 zui-source 条件：

```ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { zui } from '@zui/svelte/compiler';

export default defineConfig({ plugins: [zui(), svelte()] });
```

业务只写 class，普通 TS 分支和函数仍参与运行时求值。初始值保持静态，同一绑定观察到安全值变化后才自动提升：

```svelte
<script lang="ts">
  import { css } from '@zui/svelte';
  let width = $state(160);
</script>

<button
  onclick={() => (width += 20)}
  class={css((s) => {
    s.display.inlineFlex;
    s.width.px(width);
    s.gap.px(12);
    s.color._text;
  })}
>
  增加宽度
</button>
```

默认浏览器 runtime 随实际样式消费者创建和回收。自定义主题、严格 CSP、ShadowRoot 或 SSR 接管应显式配置 runtime。

### SvelteKit

Vite 插件使用 `plugins: [zui(), sveltekit()]`，导入 sveltekit 的来源为 `@sveltejs/kit/vite`。在 src/hooks.server.ts 创建请求级收集器：

```ts
import { createStyleHandle } from '@zui/svelte/server';
export const handle = createStyleHandle();
```

在 src/app.html 的 head 中加入 `<!--zui:styles-->`。根 +layout.svelte 为浏览器创建对应的宿主，服务端则由 handle 提供请求 runtime：

```svelte
<script lang="ts">
  import { onMount, onDestroy, type Snippet } from 'svelte';
  import { createRuntime } from '@zui/core';
  import { provideStyleRuntime, lightTheme } from '@zui/svelte';
  let { children }: { children: Snippet } = $props();

  if (typeof document !== 'undefined') {
    const runtime = createRuntime({ target: document, theme: lightTheme });
    runtime.themeStyle(':where(:root)');
    provideStyleRuntime(runtime);
    onMount(() => runtime.finishHydration());
    onDestroy(() => runtime.dispose());
  }
</script>

{@render children()}
```

自定义主题须在两端传入兼容配置。启用 CSP 时使用 stylesheet 变量通道，nonce 由宿主逐请求产生并传到客户端，服务端 style 标签和客户端 runtime 使用同值。测试夹具里的固定 nonce 仅用于可重复测试，不能照搬为部署策略。完整可运行接入及严格 CSP 边界见 tests/kit，独立安装配置见 tests/package。

## 编译与运行时合同

编译后的原生元素可以自动提升安全动态值。组件 class/slotProps 边界默认传递完整规则，不根据相对路径或文件扩展名猜测内部变量的消费能力；未使用 ZUI 编译的组件只要正常转发 class 即可接收样式。这条边界优先保证正确性，不承诺跨组件提升。

属性表达式由生成的 snippet 参数交给 Svelte 自身 memo，样式生产者与最终 class 消费分离；无关状态改变不会重新执行其他属性 getter。class/style 的 nullish 值及未改写的组件 ClassValue 形态保留。legacy 组件不会因插件注入 rune 而改变 export let、普通 let 或 $:；legacy SSR 输出完整规则，客户端用 runtime 分配的独立 ID 开始自动提升。新编译桥使用协议 8，升级时应一起重建 core、适配器与应用产物。

SvelteKit 中推荐在根 layout 创建并提供客户端 runtime，在 onMount 完成接管，在根销毁时释放；路由组件由编译接入持有自己的样式。服务端使用 createStyleHandle，每个请求单独持有 runtime。可运行写法见 tests/kit/src/routes/+layout.svelte。

模块常量支持直接 css、同文件同步 helper、map 回调和命名空间导入；初始化保留方法 this 和求值次数。自定义样式入口及跨文件 helper 可在 zui({ cssModules: [...] }) 中声明其导入来源。函数体不绑定到某个请求；模板调用使用消费者上下文，模块初始化产生可跨请求收集的只读定义。顶层 await 参数保留原始求值位置；不承诺在异步 helper 的 await 之后延续同步样式上下文。

HMR 遵循 Svelte 原生生命周期：被修改组件会重建，未修改父组件状态保留，不额外承诺保留被替换组件的局部状态。局部样式/helper/模块样式更新、删除与恢复均释放旧消费者和规则，不依赖整页刷新。

Kit 接入会将页面 HTML 的 transformPageChunk 缓存到 done 后插入完整首屏 CSS，避免 head 标记早于正文样式而漏收规则；页面完成后的延迟数据仍流式透传。页面 HTML 缓冲与延迟数据流是不同合同，不支持在已经发送的 head 中追补任意框架外异步 CSS。错误页和 sequence 组合仍须通过 handle 收集，redirect/非 HTML 响应保留原状态与头。

组件内的 setup 常量、`$state` 初始值和 `$derived`/`$derived.by` 在编译阶段获得独立快照上下文，支持普通跨文件 helper，不需要为动态值增加标记。静态初始快照由组件持有，响应式快照随订阅释放；组件属性转发和这些脚本快照均优先使用完整规则。只有实际调用 css 时才选择 runtime，因此可以先创建和提供自定义 runtime，再生成样式。

事件处理器等无响应式订阅上下文中创建的静态快照也保留到组件销毁，以支持保存后再次使用的普通 class 字符串。持续变化的值应保存在状态中，由模板或 derived 求值；这才具有同一绑定的自动提升与旧快照回收。任意字符串的外部保存期限无法由 runtime 自动推断。

## 主题容器

`StyleProvider` 从 `@zui/svelte` 根入口导入，接收必填 `scope`，默认输出 div，`as` 可选择其他非 void HTML 标签。class、style、通用 HTML 属性与事件原样转发；不提供无容器模式或任意组件替换。为控制类型复杂度，属性类型使用 `HTMLAttributes<HTMLElement>`，不为每个 as 标签展开全部专属属性联合。

```svelte
<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ThemeScope } from '@zui/core';
  import { StyleProvider, lightTheme } from '@zui/svelte';
  const scope = new ThemeScope(lightTheme, { color: { text: '#0f766e' } });
  onDestroy(() => scope.dispose());
</script>

<StyleProvider {scope} as="section" class="panel">
  <!-- 子元素继续使用普通 class={css(...)} -->
</StyleProvider>
```

Provider 复用当前 runtime，只拥有自己的主题规则与订阅，不销毁传入的 scope。同一 scope 可用于多个容器，卸载其中一个不影响其他容器。`scope.fork()` 才建立主题父子关系，DOM 嵌套不会自动改变 scope 的继承关系；替换 scope prop 会先建立新订阅再释放旧订阅。scope 主动销毁后撤销相应主题规则。

容器主题必须与 runtime 使用相同主题 namespace，并包含 runtime 基础主题的全部键及兼容值种类；允许额外键。自定义 Token 应同时配置应用根 runtime / SSR options 与 Provider，不能仅在 Provider 内换一套不兼容 schema。主题规则总是通过 runtime 样式表输出，因此遵守其 nonce，不额外写 style 属性；作者传入的 style 仍受宿主 CSP 策略约束。

SSR 必须通过 renderStyled 或 Kit style handle 收集，初始主题直接进入首屏样式；服务端不保留 scope 订阅。使用者需保证客户端 scope 初值、runtime namespace 和 idPrefix 与服务端一致，多根渲染时按宿主约定隔离。

缺少 SSR 收集器时，首次实际消费样式（包括仅一个模块 class）立即报 runtime.context，不再创建会静默丢失样式的临时 runtime。普通 class、不执行 css 的组件仍可使用原生 Svelte render。

包内 `.svelte` 组件由消费方的 Svelte/Vite 编译器处理。普通 Node 不能直接执行包含组件的根入口；服务端工具仍从 `@zui/svelte/server` 导入，组件 SSR 由 Svelte 集成编译后执行。

## 默认主题语义清单

下表列出系统亮暗预设的实际键和值；baseTheme 不含这些键。前景/背景配对是使用约定，覆盖任意品牌色后应重新验证。默认配对的对比度、两套 schema 与此表的值由 presets.test.ts 核对。

| Token                   | 亮色值                          | 暗色值                          | 用途与配对                                                 |
| ----------------------- | ------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| `spacing.none`          | `0px`                           | `0px`                           | 间距五档；none 为零间距                                    |
| `spacing.xs`            | `4px`                           | `4px`                           | 间距五档；none 为零间距                                    |
| `spacing.sm`            | `8px`                           | `8px`                           | 间距五档；none 为零间距                                    |
| `spacing.md`            | `12px`                          | `12px`                          | 间距五档；none 为零间距                                    |
| `spacing.lg`            | `16px`                          | `16px`                          | 间距五档；none 为零间距                                    |
| `spacing.xl`            | `24px`                          | `24px`                          | 间距五档；none 为零间距                                    |
| `size.none`             | `0px`                           | `0px`                           | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.controlXs`        | `24px`                          | `24px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.controlSm`        | `28px`                          | `28px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.controlMd`        | `36px`                          | `36px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.controlLg`        | `44px`                          | `44px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.controlXl`        | `52px`                          | `52px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.iconXs`           | `12px`                          | `12px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.iconSm`           | `14px`                          | `14px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.iconMd`           | `16px`                          | `16px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.iconLg`           | `20px`                          | `20px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.iconXl`           | `24px`                          | `24px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.full`             | `100%`                          | `100%`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.control`          | `36px`                          | `36px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `size.icon`             | `16px`                          | `16px`                          | 控件/图标尺寸档；control/icon 为默认角色引用，full 为 100% |
| `radius.none`           | `0px`                           | `0px`                           | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `radius.xs`             | `2px`                           | `2px`                           | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `radius.sm`             | `4px`                           | `4px`                           | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `radius.md`             | `8px`                           | `8px`                           | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `radius.lg`             | `12px`                          | `12px`                          | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `radius.xl`             | `16px`                          | `16px`                          | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `radius.full`           | `9999px`                        | `9999px`                        | 圆角五档；none 为直角，full 为胶囊/圆形意图                |
| `borderWidth.none`      | `0px`                           | `0px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.xs`        | `1px`                           | `1px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.sm`        | `1.5px`                         | `1.5px`                         | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.md`        | `2px`                           | `2px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.lg`        | `3px`                           | `3px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.xl`        | `4px`                           | `4px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.thin`      | `1px`                           | `1px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `borderWidth.focus`     | `2px`                           | `2px`                           | 边框五档；none 为零宽，thin/focus 为角色引用               |
| `fontFamily.body`       | `system-ui, sans-serif`         | `system-ui, sans-serif`         | 正文或等宽字体栈                                           |
| `fontFamily.mono`       | `ui-monospace, monospace`       | `ui-monospace, monospace`       | 正文或等宽字体栈                                           |
| `fontSize.xs`           | `12px`                          | `12px`                          | 文字尺寸五档                                               |
| `fontSize.sm`           | `14px`                          | `14px`                          | 文字尺寸五档                                               |
| `fontSize.md`           | `16px`                          | `16px`                          | 文字尺寸五档                                               |
| `fontSize.lg`           | `18px`                          | `18px`                          | 文字尺寸五档                                               |
| `fontSize.xl`           | `20px`                          | `20px`                          | 文字尺寸五档                                               |
| `fontWeight.light`      | `300`                           | `300`                           | 保留轻/常规/中等/半粗/粗的字重语义                         |
| `fontWeight.normal`     | `400`                           | `400`                           | 保留轻/常规/中等/半粗/粗的字重语义                         |
| `fontWeight.medium`     | `500`                           | `500`                           | 保留轻/常规/中等/半粗/粗的字重语义                         |
| `fontWeight.semibold`   | `600`                           | `600`                           | 保留轻/常规/中等/半粗/粗的字重语义                         |
| `fontWeight.bold`       | `700`                           | `700`                           | 保留轻/常规/中等/半粗/粗的字重语义                         |
| `lineHeight.xs`         | `1`                             | `1`                             | 无单位行高五档；tight/normal 为角色引用                    |
| `lineHeight.sm`         | `1.25`                          | `1.25`                          | 无单位行高五档；tight/normal 为角色引用                    |
| `lineHeight.md`         | `1.5`                           | `1.5`                           | 无单位行高五档；tight/normal 为角色引用                    |
| `lineHeight.lg`         | `1.75`                          | `1.75`                          | 无单位行高五档；tight/normal 为角色引用                    |
| `lineHeight.xl`         | `2`                             | `2`                             | 无单位行高五档；tight/normal 为角色引用                    |
| `lineHeight.tight`      | `1.25`                          | `1.25`                          | 无单位行高五档；tight/normal 为角色引用                    |
| `lineHeight.normal`     | `1.5`                           | `1.5`                           | 无单位行高五档；tight/normal 为角色引用                    |
| `letterSpacing.xs`      | `-0.025em`                      | `-0.025em`                      | 字距五档，允许负值；normal 引用 md                         |
| `letterSpacing.sm`      | `-0.0125em`                     | `-0.0125em`                     | 字距五档，允许负值；normal 引用 md                         |
| `letterSpacing.md`      | `0em`                           | `0em`                           | 字距五档，允许负值；normal 引用 md                         |
| `letterSpacing.lg`      | `0.025em`                       | `0.025em`                       | 字距五档，允许负值；normal 引用 md                         |
| `letterSpacing.xl`      | `0.05em`                        | `0.05em`                        | 字距五档，允许负值；normal 引用 md                         |
| `letterSpacing.normal`  | `0em`                           | `0em`                           | 字距五档，允许负值；normal 引用 md                         |
| `duration.none`         | `0ms`                           | `0ms`                           | 过渡时长五档；none 为即时完成                              |
| `duration.xs`           | `75ms`                          | `75ms`                          | 过渡时长五档；none 为即时完成                              |
| `duration.sm`           | `120ms`                         | `120ms`                         | 过渡时长五档；none 为即时完成                              |
| `duration.md`           | `200ms`                         | `200ms`                         | 过渡时长五档；none 为即时完成                              |
| `duration.lg`           | `300ms`                         | `300ms`                         | 过渡时长五档；none 为即时完成                              |
| `duration.xl`           | `500ms`                         | `500ms`                         | 过渡时长五档；none 为即时完成                              |
| `easing.standard`       | `ease`                          | `ease`                          | 缓动角色，不强行套大小档位                                 |
| `easing.linear`         | `linear`                        | `linear`                        | 缓动角色，不强行套大小档位                                 |
| `shadow.none`           | `none`                          | `none`                          | 阴影五档；暗色使用更强透明度，none 关闭阴影                |
| `shadow.xs`             | `0 1px 2px rgb(0 0 0 / 0.08)`   | `0 1px 2px rgb(0 0 0 / 0.24)`   | 阴影五档；暗色使用更强透明度，none 关闭阴影                |
| `shadow.sm`             | `0 1px 3px rgb(0 0 0 / 0.12)`   | `0 1px 3px rgb(0 0 0 / 0.32)`   | 阴影五档；暗色使用更强透明度，none 关闭阴影                |
| `shadow.md`             | `0 4px 8px rgb(0 0 0 / 0.14)`   | `0 4px 8px rgb(0 0 0 / 0.40)`   | 阴影五档；暗色使用更强透明度，none 关闭阴影                |
| `shadow.lg`             | `0 8px 16px rgb(0 0 0 / 0.16)`  | `0 8px 16px rgb(0 0 0 / 0.48)`  | 阴影五档；暗色使用更强透明度，none 关闭阴影                |
| `shadow.xl`             | `0 16px 32px rgb(0 0 0 / 0.20)` | `0 16px 32px rgb(0 0 0 / 0.56)` | 阴影五档；暗色使用更强透明度，none 关闭阴影                |
| `zIndex.base`           | `0`                             | `0`                             | 层叠职责角色；受所在 stacking context 约束                 |
| `zIndex.sticky`         | `100`                           | `100`                           | 层叠职责角色；受所在 stacking context 约束                 |
| `zIndex.popup`          | `1000`                          | `1000`                          | 层叠职责角色；受所在 stacking context 约束                 |
| `zIndex.overlay`        | `1100`                          | `1100`                          | 层叠职责角色；受所在 stacking context 约束                 |
| `zIndex.notification`   | `1200`                          | `1200`                          | 层叠职责角色；受所在 stacking context 约束                 |
| `opacity.none`          | `0`                             | `0`                             | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.xs`            | `0.1`                           | `0.1`                           | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.sm`            | `0.25`                          | `0.25`                          | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.md`            | `0.5`                           | `0.5`                           | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.lg`            | `0.75`                          | `0.75`                          | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.xl`            | `0.9`                           | `0.9`                           | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.full`          | `1`                             | `1`                             | 透明度五档；none=0、full=1，disabled 引用 md               |
| `opacity.disabled`      | `0.5`                           | `0.5`                           | 透明度五档；none=0、full=1，disabled 引用 md               |
| `breakpoint.xs`         | `480px`                         | `480px`                         | 媒体查询阈值；使用 resolved 值，不把 var() 放进媒体条件    |
| `breakpoint.sm`         | `640px`                         | `640px`                         | 媒体查询阈值；使用 resolved 值，不把 var() 放进媒体条件    |
| `breakpoint.md`         | `768px`                         | `768px`                         | 媒体查询阈值；使用 resolved 值，不把 var() 放进媒体条件    |
| `breakpoint.lg`         | `1024px`                        | `1024px`                        | 媒体查询阈值；使用 resolved 值，不把 var() 放进媒体条件    |
| `breakpoint.xl`         | `1280px`                        | `1280px`                        | 媒体查询阈值；使用 resolved 值，不把 var() 放进媒体条件    |
| `color.primary`         | `#4f46e5`                       | `#a5b4fc`                       | 主要操作的实色背景；搭配 onPrimary                         |
| `color.primaryHover`    | `#4338ca`                       | `#c7d2fe`                       | 主要操作悬停背景；搭配 onPrimary                           |
| `color.primaryActive`   | `#3730a3`                       | `#e0e7ff`                       | 主要操作按下背景；搭配 onPrimary                           |
| `color.primarySubtle`   | `#eef2ff`                       | `#312e81`                       | 低强调主色背景；搭配 onPrimarySubtle                       |
| `color.onPrimary`       | `#ffffff`                       | `#1e1b4b`                       | primary/primaryHover/primaryActive 上的文字或图标          |
| `color.onPrimarySubtle` | `#3730a3`                       | `#e0e7ff`                       | primarySubtle 上的文字或图标                               |
| `color.surface`         | `#ffffff`                       | `#1e293b`                       | 普通卡片/容器表面；搭配 text                               |
| `color.surfaceRaised`   | `#ffffff`                       | `#334155`                       | 抬高的弹层/浮动表面；搭配 text                             |
| `color.surfaceSunken`   | `#f1f5f9`                       | `#0f172a`                       | 凹陷区域/次级底色；搭配 text                               |
| `color.surfaceHover`    | `#f1f5f9`                       | `#334155`                       | 普通表面的悬停反馈；搭配 text                              |
| `color.background`      | `#f8fafc`                       | `#0f172a`                       | 页面基础背景；搭配 text 或 muted                           |
| `color.text`            | `#0f172a`                       | `#f8fafc`                       | 普通可读正文；搭配 background 或 surface 系列              |
| `color.muted`           | `#475569`                       | `#cbd5e1`                       | 次要说明；默认对比度验收使用 background                    |
| `color.textDisabled`    | `#64748b`                       | `#94a3b8`                       | 不可操作内容的弱化前景，不代替 disabled 属性               |
| `color.border`          | `#cbd5e1`                       | `#64748b`                       | 弱分隔线；不单独承担控件状态辨识                           |
| `color.borderStrong`    | `#64748b`                       | `#94a3b8`                       | 需要强调的边界线                                           |
| `color.focus`           | `#4f46e5`                       | `#a5b4fc`                       | 焦点指示色；结合 borderWidth.focus 使用                    |
| `color.danger`          | `#b91c1c`                       | `#fca5a5`                       | 危险/错误实色背景；搭配 onDanger                           |
| `color.onDanger`        | `#ffffff`                       | `#450a0a`                       | danger 上的前景                                            |
| `color.success`         | `#15803d`                       | `#86efac`                       | 成功实色背景；搭配 onSuccess                               |
| `color.onSuccess`       | `#ffffff`                       | `#052e16`                       | success 上的前景                                           |
| `color.warning`         | `#92400e`                       | `#fde68a`                       | 警告实色背景；搭配 onWarning                               |
| `color.onWarning`       | `#ffffff`                       | `#451a03`                       | warning 上的前景                                           |
| `color.info`            | `#0369a1`                       | `#7dd3fc`                       | 信息实色背景；搭配 onInfo                                  |
| `color.onInfo`          | `#ffffff`                       | `#082f49`                       | info 上的前景                                              |

例如实色主操作使用 s.backgroundColor._primary 和 s.color._onPrimary；柔和强调改用 primarySubtle/onPrimarySubtle。表面嵌套使用 surfaceRaised/surfaceSunken，而不是在组件中判断暗色并写死颜色。减少动画、密度、方向等由普通 TS 覆盖和原生 CSS 条件组合，不引入第二套主题 DSL。

## 主题尺度与迁移

内置预设已归属 svelte/src/theme.ts，从 @zui/svelte 导入 css、lightTheme、darkTheme、DefaultTokens；core 只提供标准 CSS、空 baseTheme 和通用主题引擎。Svelte 自动宿主与 SSR 默认亮色，显式 core.createRuntime 应传入 theme。旧的 @zui/core 预设导出不保留同义转发，避免反向依赖。

```ts
import { css, lightTheme, darkTheme } from '@zui/svelte';
import { createCss, createRuntime, extendTheme, ThemeScope } from '@zui/core';
const custom = extendTheme(lightTheme, { color: { brand: '#0f766e' } });
const runtime = createRuntime({ theme: custom, target: document });
const customCss = createCss(custom);
```

| 尺度          | xs       | sm        | md    | lg      | xl     | 端点/角色                   |
| ------------- | -------- | --------- | ----- | ------- | ------ | --------------------------- |
| spacing       | 4px      | 8px       | 12px  | 16px    | 24px   | none=0                      |
| size.control* | 24px     | 28px      | 36px  | 44px    | 52px   | control 引用 controlMd      |
| size.icon*    | 12px     | 14px      | 16px  | 20px    | 24px   | icon 引用 iconMd            |
| radius        | 2px      | 4px       | 8px   | 12px    | 16px   | none=0、full=9999px         |
| borderWidth   | 1px      | 1.5px     | 2px   | 3px     | 4px    | none=0，thin=xs、focus=md   |
| fontSize      | 12px     | 14px      | 16px  | 18px    | 20px   | 无 none/full                |
| lineHeight    | 1        | 1.25      | 1.5   | 1.75    | 2      | tight=sm、normal=md         |
| letterSpacing | -0.025em | -0.0125em | 0em   | 0.025em | 0.05em | normal=md                   |
| duration      | 75ms     | 120ms     | 200ms | 300ms   | 500ms  | none=0ms                    |
| opacity       | 0.1      | 0.25      | 0.5   | 0.75    | 0.9    | none=0、full=1、disabled=md |
| breakpoint    | 480px    | 640px     | 768px | 1024px  | 1280px | 无 none/full                |

shadow 为五档加 none，亮暗保持相同几何、不同透明度，具体值见语义清单。size 另有 none=0px/full=100%，但不据此要求所有组件提供 size="none/full"。fontWeight、fontFamily、easing、zIndex 和颜色使用有意义的角色，不机械凑档。

兼容变化：spacing/radius/breakpoint 的 small/medium/large → sm/md/lg；fontSize 的 small/medium/large → xs/sm/lg（按旧数值对应，新的 md=16px）；duration 的 fast/normal/slow → sm/md/lg；shadow.small → sm；size.controlSmall/controlLarge → controlSm/controlLg。control/icon、thin/focus、disabled 等角色保留为真正的 Token 引用，覆盖对应尺度会联动，也可以显式覆盖角色断开引用。

例如 s.padding._sm、s.borderRadius._full、s.height._controlLg。自定义主题可以使用自己的键；这些改名只针对内置预设，不修改用户的独立 schema。五档值是当前起点，组件落地后按实际密度、可读性和触控需求评审，不为了五档数量硬造不适用的参数。
