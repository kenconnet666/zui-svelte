# 架构与边界

状态：基础工程已搭建，core 公开 API 待讨论。

## 已确认的约束

1. 根目录直接是 core、svelte、docs，不使用 packages 或 apps。
2. 每层尽量 5–30 个直接子项，以同类文件或同类目录为主，允许入口和配置文件例外。
3. core 使用自有运行时 CSS，动态值自动提升，不要求使用者声明动态值或写 getter。
4. svelte 自行实现完整组件，不采用无样式组件库。
5. docs 使用普通 Svelte + Vite 网站，正文和示例为 .svelte 文件。
6. 基础工程完成后先讨论 core 设计，再实现运行时。
7. 默认静态，观察值变化后自动提升，结构变化切换规则；不分析响应式来源。
8. 首版必须覆盖 SvelteKit/SSR 消费、hydration 和请求隔离；文档站仍是普通 Svelte 网站。
9. css() 返回字符串，使用者只绑定 class；编译器补齐变量、SSR 和生命周期。独立子元素分别绑定，多个 class 自由组合。
10. 复杂组件通过 slotProps 转发子元素/组件参数、class、style；不使用 css.parts、panel.props() 作为公开 API。

## 依赖方向

```text
docs ──→ svelte ──→ core
  └──────────────→ core
```

- core 不导入 Svelte。纯计算与 DOM 副作用分离，服务端导入不得访问 document。
- svelte 负责订阅、DOM 绑定、Provider、组件生命周期和具体组件样式。
- docs 消费公开包入口，用于学习、真实演示与集成验证。
- 通用 recipe 机制在 core；Button 等组件自己的 recipe 和 Token 与组件一起维护。
- 编译桥是 class-only 自动变量绑定的实现条件；运行时负责完整 CSS 计算。未集成的目标需保持普通规则更新或明确诊断，不能静默丢失动态值。

## 当前目录与后续模块

当前只建立可构建的包入口，不创建没有实现的空模块。

core/src 后续按 css、theme、recipe、runtime、preset 分组。简单模块直接放文件，复杂模块超过合理规模再拆分。

svelte/src 后续按 basic、layout、input、form、data、navigation、feedback、overlay、config、theme、locale、internal 分组。简单组件平放，复杂组件单独建目录。

docs/src 当前包含页面、页面清单、站点入口、样式与 UI。组件文档增长后按实际数量增加分类。

## 本地联调与发布边界

库包默认 exports 指向 dist；自定义 zui-source 条件指向 src，仅由当前仓库的开发工具显式启用。

- Docs 的 Vite 与 TypeScript 使用 zui-source，无需手写指向另一个项目的路径 alias。
- 正常 Node 导入使用 dist，构建后应单独验证。
- 所有包暂为 private，发布 scope 未确定。
- 不增加 SvelteKit、Markdown、Emotion、无样式组件依赖。

## 参考取舍

- zui-old：参考独立 core、ICSS 属性载体与主题类型，移除 Emotion 绑定假设。
- zadmin：参考 StyleProgram、规则注册、变量写入与 owner 回收，重新评估结构比较及规则迁移。
- Naive UI：参考主题覆盖与组件使用体验。
- MUI：参考主题 CSS 变量与样式定制层次。
- Ant Design：参考 Token 派生及组件交互约定。

这些是选择性参考，不代表旧项目的 API、编译器或所有工具都要迁移。
