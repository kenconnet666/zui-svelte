# @zui/svelte

Svelte 5 组件库工作区，依赖 @zui/core，使用官方 svelte-package 生成发布产物。

当前入口保持为空，组件 API 与响应式 CSS 绑定尚未实现。组件自身的交互由本项目实现，不引入无样式组件库。

- 构建：`pnpm --filter @zui/svelte build`
- 类型检查：`pnpm --filter @zui/svelte check`
- 已配置浏览器测试相关依赖；首个真实组件加入时再添加测试配置与测试用例。
- 组件按 basic、layout、input、form、data、navigation、feedback、overlay 分类；随实现创建目录。
