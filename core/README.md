# @zui/core

框架无关的 CSS 与主题系统工作区。已配置 TypeScript 构建、类型声明、Stylis 与 CSS 类型依赖。

当前入口有意保持为空；runtime、ICSS、主题、自动变量提升尚未实现，设计草案见 [core 设计](../design/core.md)。

- 构建：`pnpm --filter @zui/core build`
- 类型检查：`pnpm --filter @zui/core check`
- 规划模块：`css/`、`theme/`、`recipe/`、`runtime/`、`preset/`，有实现后再创建。
