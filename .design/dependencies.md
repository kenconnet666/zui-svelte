# 依赖职责

精确版本以 pnpm-workspace.yaml 和 pnpm-lock.yaml 为准，文档不维护第二份版本清单。

| 范围      | 当前职责                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| core      | csstype 提供属性类型来源，Stylis 处理 CSS，clsx 处理 class 组合                                                   |
| svelte    | @zui/core；Zod 直接集成校验并从主入口导出 z；TypeScript 与 magic-string 用于编译；Svelte 为 peer，Kit 为可选 peer |
| docs      | 两个本地库、Svelte、svelte-spa-router、Shiki、Lucide                                                              |
| 构建/检查 | TypeScript、svelte-package、Vite、svelte-check、ESLint、Prettier                                                  |
| 测试      | Vitest、Playwright 及对应 provider；Kit/adapter 仅为消费验收                                                      |
| 开发工具  | MCP/LSP 依赖在 languageServices catalog，安装于用户工具目录，不进入产品包                                         |

外部依赖用 catalog:，内部用 workspace:^；严格 peer 检查，关闭自动补装 peer。Vitest/provider 与 Playwright/@playwright/test 保持配套版本。新增需运行安装脚本的依赖时单独检查 allowBuilds。

组件图标已确定使用官方 @lucide/svelte；当前 Docs 已安装，开始实现组件时在 svelte 包中直接声明同一 catalog 依赖。普通图标倾向使用 LucideIcon 组件类型，具体入口见组件讨论稿。

表单校验已选择 Zod 4，产品依赖使用默认 catalog；languageServices 中的 Zod 3 属于现有 MCP/LSP 工具依赖，不因产品升级而顺带修改。业务优先从 @zui/svelte 导入 z，使用原生 Zod 规则与类型，不再增加 ZUI 校验 DSL 或通用 schema 适配器。表单调度与 Field 关联尚待实现。

其余工具按定位、焦点、日期与无障碍等具体职责评估。普通 TS/CSS/浏览器能力足够时不加依赖；不预装未来组件的全部工具，不引入无样式组件库。
