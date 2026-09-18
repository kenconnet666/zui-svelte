# Core 首版验收台账

更新：2026-09-19。范围沿用 core-production-plan.md 的 A01–A40；当前实现路线为 core-remaining-plan.md 的 P0–P5。下表列出实际覆盖入口与支持边界，覆盖存在不等于候选版本已经全绿。

## 当前证据

- c2c772e 的 [完整 CI 35346989755](https://github.com/kenconnet666/zui-svelte/actions/runs/35346989755) 成功，属于协议 7 后端基线。
- 协议 8 候选 ebbdeed17017fa448d8d51beb1e7856daa1aa3b5 的 [CI 35366193117](https://github.com/kenconnet666/zui-svelte/actions/runs/35366193117) 已通过格式、类型规模、生成、Node/编译合同、构建、API/体积、Node 预算、三浏览器 Docs 和真实 HMR。
- 该轮 core DOM 三浏览器都在同一个旧 fixture 上失败：自定义 scope 未与 runtime 默认主题保持兼容。现已显式把 fixture 的 theme 传入 runtime，本机 Chrome 聚焦回归通过。后续浏览器预算、Kit 和包外步骤被跳过，仍须下一候选 CI 确认。
- 最终生产验收必须同一候选 SHA 全部步骤成功，并保留 candidate-evidence.json、报告和被测试 tarball。当前不标记整体完成。

路径缩写：CR = core/src/runtime/test，CC = core/src/css/test，CT = core/src/theme/test，CB = core/tests/browser.test.ts，ST = svelte/tests，DC = docs/tests/core.spec.ts。仅用于阅读，不新增目录。

## A01–A40 覆盖映射

| ID  | 合同                        | 覆盖入口                                                                                 | 判定边界                                                                              |
| --- | --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| A01 | 统一导出与内部协议          | core/src/index.ts；scripts/verify-contracts.mjs；ST/compiler.test.ts                     | 公开声明快照；@internal 不承诺跨版本兼容；协议 8 必须一致重建                         |
| A02 | string 与 builder 类型      | core/tests/types.ts；CC/builder.test.ts；包外 core-types                                 | 普通字符串返回；类型负例必须生效                                                      |
| A03 | 声明顺序、简写与结构        | CC/builder.test.ts；CR/order.test.ts；CR/binding.test.ts；CB                             | 到达/重挂不改来源顺序；不承诺 class 从右向左覆盖                                      |
| A04 | 选择器/条件隔离             | CC/validate.test.ts；CC/builder.test.ts；CB                                              | 局部 selector 每分支显式根；全局使用 global                                           |
| A05 | 标准值与注入边界            | CC/validate.test.ts；CC/builder.test.ts                                                  | 字符串序列化安全检查；完整 CSS 语法由浏览器解释                                       |
| A06 | 模板/helper/setup/derived   | ST/compiler.test.ts；ST/ssr.test.ts；ST/dev.spec.ts；DC                                  | 独立表达式 memo 与原生行为对照；legacy/runes 分别覆盖                                 |
| A07 | 模块/重导出/typed css       | ST/module.test.ts；ST/ssr.test.ts；DC                                                    | 模块定义在消费 runtime 中取得所有权                                                   |
| A08 | chunk/tree shaking/重复编译 | ST/compiler.test.ts；ST/module.test.ts；ST/dev.spec.ts；scripts/verify-contracts.mjs     | AST 标记；真实动态导入；baseTheme 窄入口无预设颜色                                    |
| A09 | 同 class revision 更新      | CR/classes.test.ts；DC                                                                   | class 不变时仍更新提升后的值                                                          |
| A10 | 实例/多 class/移除          | CR/variables.test.ts；CB；DC                                                             | 独立绑定、共享规则、最后消费者释放                                                    |
| A11 | 分支/循环/helper 数变化     | CR/classes.test.ts；ST/compiler.test.ts；DC                                              | 结构变化保留完整规则切换                                                              |
| A12 | each/key/递归               | ST/kit.spec.ts；ST/kit/src/routes/structure                                              | unkeyed 复用、对象 key、递归 snippet 的 SSR/hydration                                 |
| A13 | snippet/await/错误边界      | ST/dev.spec.ts；ST/ssr.test.ts                                                           | 多实例隔离、异常资源释放和恢复                                                        |
| A14 | props/slotProps/第三方      | DC；ST/dev.spec.ts；ST/package.spec.ts                                                   | 动态 legacy 组件与 node_modules 中未变换组件转发；边界使用完整规则                    |
| A15 | spread/getter/事件/指令     | ST/dev.spec.ts；ST/compiler.test.ts                                                      | 与原生组件对照次数、事件、bind、class/style 指令、action/attachment                   |
| A16 | 提升前后层叠一致            | CR/layers.test.ts；CR/order.test.ts；CB                                                  | 普通/important 层序；来源重挂；同来源不同变体不保证拼接优先级                         |
| A17 | unsafe 值回退               | CR/promotion.test.ts；CB                                                                 | 不安全/无法确认的值保持完整规则，CSS-wide 与转义不贸然提升                            |
| A18 | 事务/重入/dispose           | CR/binding.test.ts；CR/stylesheet.test.ts；CR/element.test.ts；CB                        | 后端写入失败回滚；提交后清理失败保留已提交快照                                        |
| A19 | 生产者/多消费者生命周期     | CR/classes.test.ts；CR/definitions.test.ts；ST/dev.spec.ts                               | 最后消费者/源退出后计数归零                                                           |
| A20 | 多根/Document/ShadowRoot    | CB；ST/fixtures/ProviderTarget.svelte；DC                                                | 独立 Document、ShadowRoot 和 Portal 目标隔离                                          |
| A21 | 主题类别/扩展/别名          | CT/theme.test.ts；CT/scope.test.ts；core/tests/types.ts                                  | baseTheme 无默认 Token；长链、数字键、混合引用与值类型                                |
| A22 | typed css 与 scope 匹配     | CT/requirements.test.ts；ST/ssr.test.ts；ST/provider-types.ts                            | namespace/schema 兼容；实际使用 Token 需求检查                                        |
| A23 | 嵌套主题/Portal/父销毁      | CT/scope.test.ts；CB；DC；ST/ssr.test.ts                                                 | fork 所有权、共享容器、Provider 不销毁调用方 scope                                    |
| A24 | 多轴主题与偏好              | ST/fixtures/PreferenceProbe.svelte；DC；ST/kit.spec.ts                                   | 密度/对比/方向/运动用 TS/CSS 组合；forced-colors 以浏览器模拟注解为准                 |
| A25 | 资源所有权与冲突            | CR/resources.test.ts；CB；ST/dev.spec.ts                                                 | keyframes/font/property 与 runtime 生命周期；不扫描外部注册                           |
| A26 | 无 JS SSR 首屏              | ST/kit.spec.ts；ST/package.spec.ts                                                       | 默认亮色、Cookie 暗色、Provider 首屏与禁 JS 表单                                      |
| A27 | SSR 并发/异常/取消          | ST/ssr.test.ts；ST/server.test.ts                                                        | 请求隔离、缺少 collector 立即报错、取消后释放                                         |
| A28 | hydration/多根/晚到         | CB；ST/kit.spec.ts                                                                       | 原子 metadata 校验、CRLF 归一化、反向接管；HTML 完成时汇总规则                        |
| A29 | 路由/错误页/redirect        | ST/kit.spec.ts；ST/package.spec.ts；ST/server.test.ts                                    | 真实 sequence、错误页样式和 redirect header                                           |
| A30 | prerender/静态部署          | scripts/verify-packages.mjs；ST/package.spec.ts                                          | 独立包 adapter-static 构建和无 JS 首屏                                                |
| A31 | 流式/CSS/背压/取消          | ST/server.test.ts；ST/kit.spec.ts                                                        | HTML done 后发送完整样式 shell，延迟数据继续流式；不承诺已发送 head 后任意新 CSS 首屏 |
| A32 | 变量双通道等价              | CR/stylesheet.test.ts；CB；DC；scripts/benchmark-browser.mjs                             | inline/stylesheet 动态值、主题与大规模更新                                            |
| A33 | 严格 CSP                    | DC；ST/kit.spec.ts；ST/package.spec.ts                                                   | nonce 一致；无 style 属性通道；Kit 自身固定 hash 例外有明确说明                       |
| A34 | HMR                         | ST/dev.spec.ts                                                                           | 真实文件编辑/删除/恢复、状态保留和资源回收；CI 轮询文件内容避免 OS 通知遗漏           |
| A35 | source map/错误定位         | ST/compiler.test.ts；ST/module.test.ts                                                   | 检查原表达式行列；StyleError 保留分类与路径；用户异常不改对象                         |
| A36 | 生成一致性                  | scripts/generate-css.mjs；CI generate:check                                              | 属性/关键字/单位/Token 映射分别报告；不把无语义映射误报为属性缺失                     |
| A37 | tarball 独立消费            | scripts/verify-packages.mjs；ST/package.spec.ts                                          | 系统临时目录安装，禁止偷用源码/祖先依赖；保留同份归档及 hash                          |
| A38 | 性能/规模/回收              | scripts/benchmark-core.mjs；scripts/benchmark-browser.mjs；scripts/measure-types.mjs；CB | 1000 元素、100 生命周期、500 Token；时间与机器环境绑定，不宣传跨设备绝对性能          |
| A39 | 公开 API 文档示例           | core/README.md；svelte/README.md；DC；design/core-api.json                               | 示例与合同快照同步；当前 API 以包 README 为准                                         |
| A40 | 浏览器依赖边界              | scripts/verify-contracts.mjs；CI 默认入口；包外构建                                      | 无 Node builtin；bundle/gzip/声明预算及基础主题裁剪                                   |

## 最终判定

旧提交的成功只证明旧提交。新候选必须完整通过；报告中跳过的能力不能计入已验证。浏览器受限模拟、SSR 流式边界和未变换第三方组件的完整规则策略属于明确的支持合同，不通过隐藏失败或删除验收项来收口。历史阶段与故障修复见 implementation.md 和 Git 历史。
