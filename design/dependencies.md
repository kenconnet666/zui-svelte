# 依赖与版本

核对日期：2026-09-17。精确版本以根目录 pnpm-workspace.yaml 与锁文件为准。

## 基础工具链

Node 24、pnpm 11.22、TypeScript 6.0.3、Svelte 5.57、Vite 8.3。

暂不升级 TypeScript 7：当前 svelte-check 声明支持 TypeScript 5/6，typescript-eslint 8.70 的 peer 范围小于 6.1。

## 工作区依赖

| 工作区      | 依赖                                                                  | 用途                         |
| ----------- | --------------------------------------------------------------------- | ---------------------------- |
| core        | csstype、stylis                                                       | CSS 类型及 CSS 处理          |
| core 开发   | @types/stylis、typescript、vite、vitest                               | 类型、构建与后续纯逻辑测试   |
| svelte      | @zui/core、@lucide/svelte                                             | 样式核心及图标               |
| svelte peer | svelte                                                                | 由消费项目提供 Svelte 运行时 |
| svelte 开发 | @sveltejs/package、svelte-check、Vite 插件                            | 包构建及类型检查             |
| svelte 测试 | vitest、vitest-browser-svelte、@vitest/browser-playwright、playwright | 后续真实组件测试             |
| docs        | 两个本地库、svelte-spa-router、shiki、Lucide、Svelte                  | 普通文档 SPA                 |
| docs 开发   | Vite、Svelte 插件、svelte-check、@playwright/test                     | 开发、构建及浏览器检查       |
| 根目录      | ESLint、TypeScript ESLint、Svelte ESLint、Prettier、Changesets        | 统一工程规范                 |

测试依赖已经准备；尚无 core 或组件实现，因此不创建通过空测试来制造覆盖率的用例。

## 按实际功能引入

- @floating-ui/dom：定位浮层。
- runed：确有需要的 observer、清理或防抖工具。
- focus-trap / tabbable：根据模态实现选择直接使用的工具。
- @internationalized/date：日期组件。
- @standard-schema/spec：表单校验适配。
- color2k：确认颜色派生需求后加入。
- @axe-core/playwright：开始实现交互组件后加入无障碍验证。

不预装未来组件的全部依赖，不引入无样式组件库。

## 安装与版本约定

- 外部依赖用 catalog:，catalog 使用当前明确版本。
- 内部依赖用 workspace:^，只解析本地包。
- 一个 pnpm-lock.yaml，开启严格 peer 检查，关闭自动补装 peer。
- 新增构建脚本依赖时明确检查 allowBuilds；当前仅列出 esbuild。
- Vitest 与其官方浏览器 provider 保持相同版本。
- Playwright 与 @playwright/test 保持相同版本。
- 不继承旧项目中的 Lucide 上限等历史补丁，当前版本通过新项目实际检查验证。

## 官方依据

- [pnpm workspaces](https://pnpm.io/workspaces)
- [pnpm catalogs](https://pnpm.io/catalogs)
- [Svelte 打包](https://svelte.dev/docs/kit/packaging)
- [Stylis](https://github.com/thysultan/stylis)
- [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)
- [Shiki bundles](https://shiki.style/guide/bundles)
