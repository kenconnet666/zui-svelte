# @zui/svelte

Svelte 5 组件库工作区，依赖 @zui/core，使用官方 svelte-package 生成发布产物。

当前仅实现验证 core 所需的 class 编译插件、运行时桥和 SSR 收集原型，没有业务组件库。完整接入尚待 CI 验证，继续工作前读 [换机交接](../design/handoff.md)。

- 构建：`pnpm --filter @zui/svelte build`
- 类型检查：`pnpm --filter @zui/svelte check`
- 已配置浏览器测试相关依赖；首个真实组件加入时再添加测试配置与测试用例。
- 组件按 basic、layout、input、form、data、navigation、feedback、overlay 分类；随实现创建目录。
