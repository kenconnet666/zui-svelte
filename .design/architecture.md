# 架构与边界

core 已完成既定首版生产验收，已验证候选见 [验收台账](core-acceptance.md)。当前转向讨论 Svelte 组件 API；讨论稿不表示已实现或已批准。

## 工作区

```text
core/       框架无关的 TypeScript 样式与主题内核
svelte/     Svelte 编译桥、SSR 接入、样式容器及后续组件
docs/       普通 Svelte + Vite 网站和真实 Demo
.design/    当前合同、验收与设计讨论
scripts/    生成、合同、交付及开发工具脚本
```

依赖方向为 docs → svelte → core，docs 也可直接消费 core。内部依赖使用 workspace:^，外部版本集中于 pnpm-workspace.yaml。各层尽量 5–30 个直接子项，不加 packages/apps，不造空目录凑数。

## 已确认约束

- core 保持 css、theme、runtime 职责；统一从 @zui/core 导入，使用自有 runtime 与 Stylis，不依赖 Svelte。
- css() 返回普通 string；用户绑定 class，编译接入补变量、SSR 与生命周期。首次静态，值变化才安全提升，结构变化保留完整规则；不分析响应式来源、不要求 getter/dynamic 标记。
- 子元素独立绑定；参数与复用优先普通 TS 函数，多个 class 自由组合。复杂组件通过 slotProps 转发已公开节点的属性、class/style 等，不引入 css.parts 或公开样式句柄。
- core 的 baseTheme 没有 UI Token/视觉值；亮暗预设、五档尺度与默认主题 css 属于 svelte，从 baseTheme 扩展。core 默认空主题，Svelte 自动宿主/SSR 默认亮色；显式自定义主题不静默补 UI 值。
- svelte 自行实现有样式组件，不引入无样式组件库；定位、日期等专项工具仅在具体需求出现时选择。
- docs 使用 .svelte 页面及真实示例，不引入 Markdown 内容管线。SvelteKit 只用于消费与 SSR 验证，不成为第四个产品工作区。
- 库默认 exports 指向 dist；zui-source 仅用于仓库联调。包保持 private，正式发布名称、许可证和部署另定。

## 实现与讨论的分界

[core-contracts.md](core-contracts.md) 和包 README 描述已实现能力。[svelte-components.md](svelte-components.md) 讨论组件形态与必要适配，不能让 docs 把候选 API 展示成现有组件。

常规组件保持直接的 Props、状态和模板。只有出现真实重复的行为责任才提取内部工具；不预先建设 recipe、插件管理器、通用组件工厂或全量分类目录。

第二阶段已调整为先规划布局、定位和浮层组件，并同步审计必要 API、命名、目录归属、文件拆分/合并与可删除的重复实现，见 [阶段计划](svelte-phase2.md)。Button/表单/选择组件后移。具体公共组件与迁移方案仍待审阅，不因列入计划就自动开工。

实施必须基础架构与共享设施先行：先闭合配置/主题/样式层、字段语义、交互、浮层/定位/焦点、集合/异步/表单等生产合同，再定稿基础组件，最后组合上层组件。上层必须复用这些责任或适合的专项依赖，不能各写一套。简洁不等于删减可访问性、SSR/CSP、资源回收、完整样式覆盖或异常处理；完整阶段与 S01–S10 门槛见组件规划第 15 节。
