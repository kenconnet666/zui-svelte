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
4. TypeScript 与 Svelte 检查，以及生成 CSS metadata 一致性。
5. core Node 合同、class 编译与现有 SSR 测试。
6. 构建 core、svelte、docs；从 docs 消费两个库的默认 dist 入口，验证解析和导入。
7. 安装当前 Playwright 版本对应的 Chromium、Firefox、WebKit 与系统依赖。
8. 使用 Vite preview 测试构建后的文档站，并执行 core 三浏览器 DOM/接管测试。
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

当前已配置 Docs 导航与 core 接入、core DOM/接管三浏览器验收，以及 Node、编译和最小 SSR fixture。实际是否执行并通过以对应完整 SHA 的 CI 为准，不固定引用旧测试数量。

当前 HEAD `cc2f9d7` 的 CI [35289205755](https://github.com/kenconnet666/zui-svelte/actions/runs/35289205755) 因两处 Svelte 接入 lint 失败，后续完整验证未获通过证据。下一阶段补真实 SvelteKit、CSP、流式与包外消费，验收矩阵见 [首版生产可用规划](core-production-plan.md)。

本次交付范围是检查、测试、构建与可下载产物，不进行 npm 发布或公网部署。
