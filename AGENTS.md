# ZUI workspace

- 用中文讨论和编写设计文档；代码标识符与代码注释使用英文。
- 三个工作区直接位于根目录：core、svelte、docs。不要增加 packages 或 apps 中间层。
- 目录保持扁平，每层尽量有 5–30 个直接子项；不为凑数量创建空目录或一文件目录。
- core 是框架无关的 TypeScript 样式系统，使用自有 runtime 与 Stylis。
- 动态 CSS 值由运行时自动识别和提升。不要要求使用者手动声明动态值、getter 或 dynamic 标记。
- 普通值初次保持静态，同一绑定内首次检测到值变化才提升；不预先参数化所有值，不分析响应式来源。
- css() 返回原始字符串，用户只写 class。编译阶段补齐变量、SSR 和生命周期；不公开 css.parts、StyleHandle、panel.props() 或 attachment 绑定 API。
- 子元素独立绑定，多个 class 可以直接组合。参数优先普通 TS 函数；复杂组件使用 slotProps 转发子元素/组件参数、class、style。
- 推荐直接在模板 class={css((s) => { ... })} 中编写局部样式；复用或复杂逻辑再提取普通 TS 函数，性能工作由编译与 runtime 承担。
- SvelteKit/SSR 消费是首版验收项，必须设计首屏样式输出、hydration 与请求隔离；文档站保持普通 Svelte。
- svelte 自行实现组件，不引入无样式组件库。底层专项工具按实际需要选择。
- docs 是普通 Svelte + Vite 网站，使用 .svelte 页面与真实 Demo；不使用 SvelteKit 或 Markdown 内容管线。
- 当前只完成工作区基础工程。core 的设计见 design/core.md；未决 API 不视为已批准规范。
- 依赖版本集中在 pnpm-workspace.yaml；内部依赖用 workspace:^。
- 使用 pnpm check、pnpm lint、pnpm build 验证基础工程；pnpm test 验证 Docs 路由。
- 包名 @zui/core、@zui/svelte 暂用于本地工作区，包保持 private，发布名称另行确定。
