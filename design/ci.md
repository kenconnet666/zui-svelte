# GitHub CI 与构建产物交付

工作流：[CI](https://github.com/kenconnet666/zui-svelte/actions/workflows/ci.yml)。配置位于 `.github/workflows/ci.yml`。

## 触发条件

- 推送到 master。
- 向 master 提交 pull request。
- 在 GitHub Actions 手动触发 workflow_dispatch。

同一 ref 的新运行取消旧运行。工作流使用只读仓库权限，第三方 Action 固定到已核对的 commit SHA。

## 执行内容

1. Ubuntu 24.04、Node 24、packageManager 指定的 pnpm。
2. `pnpm install --frozen-lockfile`，验证干净环境依赖安装。
3. ESLint 与 Prettier。
4. TypeScript 与 Svelte 检查。
5. 构建 core、svelte、docs。
6. 从 docs 消费两个库的默认 dist 入口，验证解析和导入。
7. 安装当前 Playwright 版本对应的 Chromium、Firefox、WebKit 与系统依赖。
8. 使用 Vite preview 测试构建后的文档站。
9. 上传浏览器报告，并在全部验证成功后上传构建产物。

## 下载产物

打开某次运行页面的 Artifacts：

- `workspace-dist-<commit>`：保留 core/dist、svelte/dist、docs/dist 的目录结构。
- `browser-report-<commit>`：HTML 报告，失败时包含截图和 trace。

产物保留 14 天。失败运行不发布成功构建产物，测试报告在存在时保留。

## 本地与 CI 差异

本地 `pnpm test` 使用已安装的 Chrome 和开发服务器。

CI 使用三种 Playwright 浏览器和构建后的站点。CI 的浏览器安装是显式步骤，不假设 runner 预装版本匹配。

## 验证范围

当前每个浏览器运行两项 Docs 集成测试，总计六项。覆盖导航、刷新、CSS 高亮、未知页面、浏览器错误与窄屏溢出。

core 与 svelte 仍为空公开入口，CI 成功只表示基础工程链路可用，不代表自动提升、SSR 或组件功能已经实现。相应验收随实现补入。

本次交付范围是检查、测试、构建与可下载产物，不进行 npm 发布或公网部署。
