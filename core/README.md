# @zui/core

框架无关的 CSS 与主题系统工作区。已配置 TypeScript 构建、类型声明、Stylis 与 CSS 类型依赖。

已实现生成式属性/关键字载体、buildStyle、序列化、主题、作用域、规则注册、自动变量提升与全局资源回收。生成器覆盖 857 个属性。class 字符串编译接入仍在验证，状态见 [换机交接](../design/handoff.md)。

- 构建：`pnpm --filter @zui/core build`
- 类型检查：`pnpm --filter @zui/core check`
- 规划模块：`css/`、`theme/`、`recipe/`、`runtime/`、`preset/`，有实现后再创建。
