# @zui/svelte

Svelte 5 组件库工作区，依赖 @zui/core，使用官方 svelte-package 生成发布产物。

当前实现验证 core 所需的 class 编译插件、运行时桥和 SSR 收集，没有业务组件库。真实 SvelteKit、独立 tarball 与 prerender 已纳入 CI；首版完整验收仍按 [生产规划](../design/core-production-plan.md) 和 [实施记录](../design/implementation.md) 推进。

- 构建：`pnpm --filter @zui/svelte build`
- 类型检查：`pnpm --filter @zui/svelte check`
- 编译与 SSR 测试：`pnpm --filter @zui/svelte test`
- SvelteKit 浏览器测试：`pnpm --filter @zui/svelte test:kit`
- 完整包外验收：根目录执行 `pnpm test:packages`，由 CI 在构建与浏览器准备后运行。

编译后的原生元素可以自动提升安全动态值。组件 class/slotProps 边界默认传递完整规则，不根据相对路径或文件扩展名猜测内部变量的消费能力；未使用 ZUI 编译的组件只要正常转发 class 即可接收样式。这条边界优先保证正确性，不承诺跨组件提升。

SvelteKit 中推荐在根 layout 创建并提供客户端 runtime，在 onMount 完成接管，在根销毁时释放；路由组件由编译接入持有自己的样式。服务端使用 createStyleHandle，每个请求单独持有 runtime。可运行写法见 tests/kit/src/routes/+layout.svelte。

模块常量支持直接 css、同文件同步 helper、map 回调和命名空间导入；初始化保留方法 this 和求值次数。自定义样式入口及跨文件 helper 可在 zui({ cssModules: [...] }) 中声明其导入来源。函数体不绑定到某个请求；模板调用使用消费者上下文，模块初始化产生可跨请求收集的只读定义。顶层 await 参数保留原始求值位置；不承诺在异步 helper 的 await 之后延续同步样式上下文。

组件内的 setup 常量、`$state` 初始值和 `$derived`/`$derived.by` 在编译阶段获得独立快照上下文，支持普通跨文件 helper，不需要为动态值增加标记。静态初始快照由组件持有，响应式快照随订阅释放；组件属性转发和这些脚本快照均优先使用完整规则。只有实际调用 css 时才选择 runtime，因此可以先创建和提供自定义 runtime，再生成样式。

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

包内 `.svelte` 组件由消费方的 Svelte/Vite 编译器处理。普通 Node 不能直接执行包含组件的根入口；服务端工具仍从 `@zui/svelte/server` 导入，组件 SSR 由 Svelte 集成编译后执行。
