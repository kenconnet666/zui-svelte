# 依赖职责

精确版本以 pnpm-workspace.yaml 和 pnpm-lock.yaml 为准，文档不维护第二份版本清单。

| 范围      | 当前职责                                                                        |
| --------- | ------------------------------------------------------------------------------- |
| core      | csstype 提供属性类型来源，Stylis 处理 CSS，clsx 处理 class 组合                 |
| svelte    | @zui/core；TypeScript 与 magic-string 用于编译；Svelte 为 peer，Kit 为可选 peer |
| docs      | 两个本地库、Svelte、svelte-spa-router、Shiki、Lucide                            |
| 构建/检查 | TypeScript、svelte-package、Vite、svelte-check、ESLint、Prettier                |
| 测试      | Vitest、Playwright 及对应 provider；Kit/adapter 仅为消费验收                    |
| 开发工具  | MCP/LSP 依赖在 languageServices catalog，安装于用户工具目录，不进入产品包       |

外部依赖用 catalog:，内部用 workspace:^；严格 peer 检查，关闭自动补装 peer。Vitest/provider 与 Playwright/@playwright/test 保持配套版本。新增需运行安装脚本的依赖时单独检查 allowBuilds。

组件阶段按具体职责评估定位、焦点、日期与无障碍工具。普通 TS/CSS/浏览器能力足够时不加依赖；不预装未来组件的全部工具，不引入无样式组件库，也不将图标包强制绑进组件 API。
