# @zui/svelte

Svelte 5 组件库工作区，依赖 @zui/core，使用官方 svelte-package 生成发布产物。

当前实现验证 core 所需的 class 编译插件、运行时桥和 SSR 收集，没有业务组件库。真实 SvelteKit、独立 tarball 与 prerender 已纳入 CI；首版完整验收仍按 [生产规划](../design/core-production-plan.md) 和 [实施记录](../design/implementation.md) 推进。

- 构建：`pnpm --filter @zui/svelte build`
- 类型检查：`pnpm --filter @zui/svelte check`
- 编译与 SSR 测试：`pnpm --filter @zui/svelte test`
- SvelteKit 浏览器测试：`pnpm --filter @zui/svelte test:kit`
- 开发态验收：`pnpm --filter @zui/svelte test:dev`，CI 使用三浏览器；本机默认复用 Chrome，仅按改动运行相关用例。
- 完整包外验收：根目录执行 `pnpm test:packages`，由 CI 在构建与浏览器准备后运行。

## 最小接入

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
  import { css } from '@zui/core';
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
  import { provideStyleRuntime } from '@zui/svelte';
  let { children }: { children: Snippet } = $props();

  if (typeof document !== 'undefined') {
    const runtime = createRuntime({ target: document });
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
  import { lightTheme, ThemeScope } from '@zui/core';
  import { StyleProvider } from '@zui/svelte';
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
