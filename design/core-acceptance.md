# Core 首版验收台账

本表对应生产规划 A01–A40。`部分证据` 不等于该项完成；测试路径说明已有覆盖入口，缺口列说明尚不能作出的完成结论。最后全矩阵必须绑定同一候选 SHA。

已核实基线：`9f6fa79`，完整 CI [35322425654](https://github.com/kenconnet666/zui-svelte/actions/runs/35322425654) 通过。下表旧有测试证据来自该基线；本轮新回归另列，不能套用旧 CI 证明。

路径缩写：`CR = core/src/runtime/test`，`CC = core/src/css/test`，`CT = core/src/theme/test`，`CB = core/tests/browser.test.ts`，`ST = svelte/tests`，`DC = docs/tests/core.spec.ts`。这些是阅读简写，不新增目录。

| ID  | 合同                        | 状态     | 现有证据入口                                                    | 待补或复核                                            |
| --- | --------------------------- | -------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| A01 | 统一导出与内部协议          | 部分证据 | core/src/index.ts；scripts/verify-packages.mjs                  | 正式导出/声明快照，内部导出的稳定性说明               |
| A02 | string 与 builder 类型      | 部分证据 | core/tests/types.ts；CC/builder.test.ts                         | 候选版本包外签名统一核对                              |
| A03 | 声明顺序、简写与结构        | 部分证据 | CC/builder.test.ts；CR/binding.test.ts；CB                      | 到达顺序与重挂回归，更多简写/长写组合                 |
| A04 | 选择器/条件隔离             | 部分证据 | CC/validate.test.ts；CB                                         | 复杂嵌套/条件组合审计                                 |
| A05 | 标准值与注入边界            | 部分证据 | CC/validate.test.ts；CC/builder.test.ts                         | 边界输入与 raw/global 合同复核                        |
| A06 | 模板/helper/setup/derived   | 部分证据 | ST/compiler.test.ts；ST/ssr.test.ts；DC                         | 原生语义对照和候选版本确认                            |
| A07 | 模块/重导出/typed css       | 部分证据 | ST/module.test.ts；ST/ssr.test.ts；DC                           | 重导出与自定义入口组合                                |
| A08 | chunk/tree shaking/重复编译 | 部分证据 | ST/compiler.test.ts；scripts/verify-packages.mjs                | 真实动态 chunk 与裁剪产物断言                         |
| A09 | 同 class revision 更新      | 部分证据 | CR/classes.test.ts；DC                                          | 候选版本集成复验                                      |
| A10 | 实例/多 class/移除          | 部分证据 | CR/variables.test.ts；CB；DC                                    | 同节点来源顺序与重挂回归                              |
| A11 | 分支/循环/helper 数变化     | 部分证据 | CR/classes.test.ts；ST/compiler.test.ts                         | 分支调用位置变化的运行对照                            |
| A12 | each/key/递归               | 部分证据 | ST/compiler.test.ts；DC                                         | unkeyed 复用、对象 key、递归 hydration                |
| A13 | snippet/await/错误边界      | 待补验收 | svelte/src/compiler/preprocess.ts                               | 多实例、异常与退出资源的真实渲染                      |
| A14 | props/slotProps/第三方      | 部分证据 | DC；ST/package.spec.ts                                          | 预编译依赖与嵌套转发组合                              |
| A15 | spread/getter/事件/指令     | 待补验收 | ST/compiler.test.ts；svelte/src/compiler/preprocess.ts          | 求值次数/顺序、bind、style:/class:、action/attachment |
| A16 | 提升前后层叠一致            | 部分证据 | CR/layers.test.ts；CB                                           | 来源顺序修复及同来源多变体边界                        |
| A17 | unsafe 值回退               | 部分证据 | CR/promotion.test.ts；CB                                        | 回退后重新进入安全路径的跨浏览器组合                  |
| A18 | 事务/重入/dispose           | 部分证据 | CR/binding.test.ts；CR/stylesheet.test.ts；CR/element.test.ts   | 重入/取消组合，后端改动后故障回归                     |
| A19 | 生产者/多消费者生命周期     | 部分证据 | CR/classes.test.ts；CR/definitions.test.ts；CB                  | 候选版本回收复验                                      |
| A20 | 多根/Document/ShadowRoot    | 部分证据 | CB                                                              | 多 Document 消费及 Provider 目标接入                  |
| A21 | 主题类别/扩展/别名          | 部分证据 | CT/theme.test.ts；CT/scope.test.ts；core/tests/types.ts         | 候选版本类型与生成映射审计                            |
| A22 | typed css 与 scope 匹配     | 待补实现 | CT/requirements.test.ts；ST/ssr.test.ts                         | StyleProvider 正负例                                  |
| A23 | 嵌套主题/Portal/父销毁      | 待补实现 | CT/scope.test.ts；CB                                            | Provider SSR、共享容器与提前销毁                      |
| A24 | 多轴主题与偏好              | 待补实现 | core/src/theme/presets.ts                                       | 密度/对比度/motion/forced-colors/方向最小探针         |
| A25 | 资源所有权与冲突            | 部分证据 | CR/resources.test.ts；CB                                        | 字体/动画退出生命周期及 HMR                           |
| A26 | 无 JS SSR 首屏              | 部分证据 | ST/package.spec.ts                                              | Provider 与分片加入后复验                             |
| A27 | SSR 并发/异常/取消          | 部分证据 | ST/ssr.test.ts；ST/server.test.ts                               | 嵌套渲染与新增资源的请求回收                          |
| A28 | hydration/多根/晚到         | 部分证据 | CB；ST/kit.spec.ts                                              | 多根、晚到边界和提前销毁                              |
| A29 | 路由/错误页/redirect        | 部分证据 | ST/package.spec.ts；ST/server.test.ts                           | 错误页、redirect 和 handle 组合                       |
| A30 | prerender/静态部署          | 部分证据 | scripts/verify-packages.mjs；ST/package.spec.ts                 | 新增主题/后端能力后的禁 JS 复验                       |
| A31 | 流式/CSS/背压/取消          | 部分证据 | ST/server.test.ts；ST/kit.spec.ts                               | 首次产生晚到新 CSS 与数据流式分别举证                 |
| A32 | 变量双通道等价              | 部分证据 | CR/stylesheet.test.ts；CB；DC                                   | 新来源顺序与后端规模负载                              |
| A33 | 严格 CSP                    | 部分证据 | DC；ST/kit.spec.ts                                              | Provider/分片复验；保留 Kit 固定 hash 例外            |
| A34 | HMR                         | 待补验收 | ST/module.test.ts                                               | 真实开发服务器编辑/删除/恢复，资源归零                |
| A35 | source map/错误定位         | 待补验收 | ST/compiler.test.ts                                             | 映射行列与堆栈，不只检查 sourcesContent               |
| A36 | 生成一致性                  | 部分证据 | scripts/generate-css.mjs；CI generate:check                     | 属性/单位/类别覆盖审计与最终 SHA                      |
| A37 | tarball 独立消费            | 部分证据 | scripts/verify-packages.mjs                                     | Provider 与协议升级后重新安装验证                     |
| A38 | 性能/规模/回收              | 待补实现 | scripts/benchmark-core.mjs；design/core-performance-budget.json | DOM 分片、主题切换、堆趋势与浏览器预算                |
| A39 | 公开 API 文档示例           | 部分证据 | core/README.md；svelte/README.md；DC                            | 最终 API 示例与说明同步检查                           |
| A40 | 浏览器依赖边界              | 部分证据 | CI 入口导入；scripts/verify-packages.mjs                        | 显式 bundle 依赖与体积证据                            |

## 本轮增量：稳定来源顺序

`CR/order.test.ts` 先证明反向取得来源、释放来源后重挂会改变 CSS 顺序（旧实现两项失败）。改为稳定来源键后局部回归通过；层顺序声明固定在首位，数字源码位置按数值位数排序，不依赖 locale，来源引用归零仍释放。

SSR order 改为字符串键，内部协议从 5 升到 6；自定义 StyleSheet 的 set 第三个参数及 StyleEntry.order 同步改为 string，不可将其当作数字相减。旧 SSR/编译产物明确报版本不匹配。CB 新增双通道提升/重挂计算样式、SSR 反向接管及损坏 order 检查，浏览器结果待本轮 CI，尚不标为已验收。

后续核实：`398f483` 的完整 CI [35325762599](https://github.com/kenconnet666/zui-svelte/actions/runs/35325762599) 已通过，上述新增来源顺序与协议回归已有三浏览器和包外证据；A03/A08/A16 的其他组合仍保留缺口。

## 本轮增量：StyleProvider 基础接入

新增容器组件、SSR 正负例、公开属性类型检查、共享/嵌套 scope 与 100 次切换的 Docs 回归，以及独立 tarball 的禁 JS 初始主题与客户端切换。A22/A23 已从仅底层能力推进到 Provider 实现；新浏览器/包外回归等待对应提交 CI，Provider 跨 Document/ShadowRoot 接入与多轴偏好仍待补，不能标记整个 R1 完成。

组件使用通用 HTMLAttributes，避免按全部标签展开泛型联合；as 排除 void 标签。根入口包含标准 .svelte 源组件后，普通 Node 直接导入根入口不再是有效消费方式，CI 保留 core 的直接 Node 导入，Svelte 根入口由真实 Vite/Kit 外部安装消费验证。

Provider 基础提交 `734324b` 的完整 CI [35326735754](https://github.com/kenconnet666/zui-svelte/actions/runs/35326735754) 已通过，包含共享/嵌套 scope、100 次主题切换、替换/销毁、独立包禁 JS 和客户端更新。随后增加 ProviderTarget 的 Portal/ShadowRoot 及独立目的地 SSR，PreferenceProbe 的亮暗/密度/对比度/方向/减少动画/forced-colors；新浏览器结果尚待对应 CI。forced-colors 以报告中的媒体能力注解为准，不直接计为所有引擎都已模拟。
