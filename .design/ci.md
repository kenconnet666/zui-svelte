# GitHub CI 与产物交付

[CI 工作流](https://github.com/kenconnet666/zui-svelte/actions/workflows/ci.yml) 对 master 推送、PR 和手动触发生效。master 按提交保留验收，避免持续推送取消上一候选；同 PR 新运行取消旧运行。仓库权限只读，第三方 Action 固定 SHA。

## 验收顺序

1. Ubuntu 24.04、Node 24、pnpm 锁文件安装，准备 Kit fixture。
2. 格式/lint，先构建库分发产物，再执行类型与 Svelte 检查、500 Token 类型规模预算、生成一致性和覆盖报告；docs 的类型不走源码条件。
3. core Node 合同、class 编译与服务端合同；docs 消费 dist 构建，实际模块图必须通过源码泄漏检查。
4. 公开 API 快照、浏览器依赖及体积预算、基础主题裁剪、Node 性能与资源预算。
5. Chromium、Firefox、WebKit 的生产 Docs 交互/axe 无障碍检查、开发态真实 HMR、core DOM/接管与双变量通道性能验收。axe 报告附入浏览器结果，不能代替人工键盘/读屏。
6. 真实 SvelteKit 生产 SSR、hydration、主题、CSP、路由/错误页/redirect；特殊值 transport 验证 Decimal/日期类型、非公历、时区 offset、action 和客户端导航。独立临时目录安装 tarball，重新检查类型、构建、预渲染及三浏览器消费，不能只验证 workspace 链接。
7. 核对报告提交一致性和被测试归档的 SHA-256，生成 candidate-evidence.json，再上传成功构建产物。

每一步的成功均是后续步骤的前提。证据清单关联实际报告，不能替代测试断言；最终结果应绑定具体完整 SHA。完整验收范围见 [A01–A40](core-acceptance.md)。

组件基础设施探针纳入相同流程：配置/slotProps、字段与 Zod、嵌套浮层、Portal/严格 CSP、虚拟化、键盘/指针/播报。1000 控件用例附 `configuration-scale.json`，记录浏览器版本、耗时和卸载前后的资源基线；10000 行列表限制实际 DOM 数量并保留活动节点，100 轮层销毁检查锁/陷阱/样式表归零。它们与既有 core 性能预算分别验证，不把固定桌面的耗时当成所有设备的保证。

## 下载和追溯

在运行页面 Artifacts 下载：

- workspace-dist-提交SHA：core/dist、svelte/dist、docs/dist，以及经过独立安装验证的两个 .tgz 和 candidate-evidence.json。
- browser-report-提交SHA：浏览器结果、失败截图/trace、类型/生成/合同/性能报告、包外验证报告及证据清单。

保留 14 天。失败运行保留存在的报告，不上传成功构建产物。归档不重新打包，下载者可用证据清单里的 SHA-256 验证它就是测试过的文件。包仍 private；没有 npm 自动发布或公网部署。

## 本地工作约定

本地只执行改动相关的重点检查，优先原生 WebStorm/LSP。浏览器局部验证使用已安装的 Chrome，完整矩阵交 CI。推送后不等待或轮询；继续有意义的工作，并在下次推送前检查上一轮结果。当前阶段状态维护在 [验收台账](core-acceptance.md)，不在多个文档复制易过期的 HEAD/测试数量。

UI 分发验收从 @zui/svelte 主入口分别构建布局组与浮层组，检查无关专项依赖及 Node 模块不得进入产物。distribution.json 与现有报告一并进入 candidate-evidence.json；svelte-distribution-budget.json 是测量后保留审查余量的门槛，不在 CI 自动更新。
