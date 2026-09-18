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
