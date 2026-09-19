# 第一阶段：架构与基础设施实施计划

状态：第一阶段代码与既定自动化验收已完成；候选 b1c1ae2 的完整 CI 已通过。本文记录交付物、验收证据和边界；业务 API/类型/slotProps/Zod/Decimal 的唯一合同仍是 [组件主规划](svelte-components.md)，依赖职责见 [依赖取舍](dependencies.md)。第二阶段只提出 [组件实施计划](svelte-phase2.md)，没有提前铺视觉组件。

## 目标与阶段边界

让后续 Button、Input、Select、Dialog 等组件能够直接复用已验证的基础设施，作者仍写原生 Svelte、内联 TS 类型、$props() 默认值和模板 css。基础可在独立消费者、SSR、严格 CSP、多实例及销毁/异常场景下工作；不交付只有接口的骨架。

本阶段对应主规划 A0–A3。已完成的依赖与测试准备是起点，不等于本阶段已执行：

- 已有 core、Svelte 样式桥、StyleProvider、Zod/Decimal/日期公开导出；本次接入日期库和 axe。
- docs 已按公开 dist 入口消费；新增领域值页面、消费边界检查和 axe 用例。共享回归夹具仍是仓库测试资源，独立安装由 tarball 任务保证。
- 特殊值 transport 在真实 Kit 夹具中作为接入范例，CI 包含 SSR/hydration/action/导航/预渲染；尚不是一个新的公共序列化产品。
- 本阶段不铺完整视觉组件库、不实现业务 Table/DatePicker/Upload，不改造 docs 为 Kit。Form/Field/DecimalInput 等公共视觉组件在基础合同完成后进入第二阶段；可以有明确标为测试用的原生元素/薄组件探针。

## 交付顺序

每项交付是可构建、可单独审查的中文提交；推送后继续下一项，不等待 CI，下次推送前检查上次的具体失败。

| 顺序                 | 工作与主要位置                                      | 必须交付                                                                                           | 退出条件                                                                                                         |
| -------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| P1-01 合同原型       | svelte/src/compiler、runtime；类型和消费夹具        | 用一个最小测试组件贯通内联 Props、默认配置、class/slotProps、声明生成；明确编译顺序和源码标记      | 原始/转换后语义对照、显式 false/undefined、导入别名、变量碰撞、SSR 和包外类型正负例通过；不修改任意业务 $props   |
| P1-02 配置与定制     | ConfigProvider、runtime/config/merge；沿用 theme.ts | 动态嵌套配置视图、配置字段清单、自动默认值接入、限定 slot 合并、统一 UI CSS 层序                   | 原生值优先级、Symbol attachment、事件一次执行、嵌套 slot、CSP、Portal 主题与多根隔离通过；不引入全局可变业务单例 |
| P1-03 字段与 Zod     | internal 字段/表单模块、测试原生输入夹具            | ID/描述/焦点接入、编辑态与模型边界、Zod 调度、错误来源、reset 基线、submit 版本保护、原生 FormData | IME、程序改值、跨字段、异步乱序、数组重排/卸载、非法草稿、服务端错误与首错聚焦通过；不复制表单 store             |
| P1-04 数值与日期接入 | 小型领域值模块、Zod schema/codec、Kit hooks 范例    | Decimal 比较/快照/字符串边界、日期四种语义、locale/时区、Zod 严格 CSP 初始化策略                   | 高精度、负零/非有限值、默认与自定义构造器边界、日历/时区元数据、SSR 请求隔离及类型还原通过；不靠 JSON 克隆       |
| P1-05 层与定位焦点   | internal layer/floating/focus/退出协调              | Document/应用树所有权、父子层、Portal、Escape/outside、焦点恢复、滚动锁/inert、测量与退出状态      | 三层嵌套、父层销毁、触发器移除、滚动/resize、RTL、子 Portal、退出中断和所有监听/锁回收通过                       |
| P1-06 集合与异步     | internal collection/selection/request/virtual       | key/活动项/选中项、默认 id/label、对象保留、搜索/分页、取消/版本、窗口化协议                       | 缺项/重复 key、同 key 刷新、原地数组变更、跨页选择、请求乱序、大集合活动项可达与卸载通过                         |
| P1-07 跨组件交互     | internal locale/a11y/pointer 与既有层/集合模块      | 内部 live-region、键盘作用域、指针捕获/取消、字符单位与格式化边界、减少动态效果/高对比             | 不抢 IME/输入快捷键、不重复 Escape、触摸取消、状态播报去重、axe 与键盘对照通过；只做已有消费者需要的能力         |
| P1-08 消费与交付闭合 | docs、Kit、独立 tarball、CI/报告                    | 各基础能力的可运行说明与组合探针、公开 API/声明、分发与性能基线、特殊值传输说明                    | 同一候选 SHA 的完整 CI 通过，失败不靠跳过；声明范围、人工/设备验证边界和已知限制可审查                           |

P1-02/P1-03 等可以在原型证明必要时调整文件粒度，但不能绕开 P1-01 的类型/编译/分发验证。纯行为复用优先函数、明确上下文和清理函数，不创建 BaseComponent、通用插件生命周期或自动表单生成器。

## 依赖与工具策略

- 已采用：Svelte 5、core/Stylis、Lucide、Zod、decimal.js、@internationalized/date；axe 仅测试。使用原生公开 API，版本集中 catalog。
- P1-05：已锁定 @floating-ui/dom 与 focus-trap/tabbable；定位只提供几何，Document 层管理只保留一个有效模态焦点陷阱，关闭/归属由 ZUI 负责。
- P1-06：已锁定 @tanstack/virtual-core 的薄接入，不再引入另一套虚拟化框架。活动项额外进入窗口、动态测量、断开观察器和 SSR 初始范围均有测试。
- 动效、Pointer Events、Intl、ResizeObserver/VisualViewport 等原生优先。复杂排序拖放、富文本、图表、图片裁剪暂不引入；与本阶段消费者无关的功能不作为“预留扩展”写入运行时。
- 每次会话先核对原生 MCP/LSP。局部优先 WebStorm，超时不计通过，可用逐文件 LSP/小范围 TypeScript 与必要 Chrome 用例替代；完整类型、浏览器和包外验收由 CI 执行，不轮询等待。

## 范围和维护约束

- 根工作区仍为 core/svelte/docs。按实际职责增加少量 internal/compiler/runtime 文件；不为每个能力预建空目录、不为每个组件拆固定的四五个文件。
- ConfigProvider 等宿主可作为基础公开入口；字段/层/选择的内部模型不默认全部导出。第二阶段组件通过组合使用它们，slotProps 引用实际子组件 Props。
- UI 预设和领域类型留 svelte；core 保持框架无关，不增加 Zod/Decimal/日期依赖。
- 默认值清单只记录可配置键，不重复默认值/类型。业务事件顺序写清楚；编译器不猜业务取消语义，也不以同名属性自动转发所有参数。
- 新增 dependency/runtime 导出需经过消费者与类型检查；不因主入口统一而混入 Node-only 编译/服务端代码。

## 完成与审阅标准

详尽验收沿用主规划 S01–S10，不复制第二份检查表。阶段至少包含：1000 控件配置/样式探针、10000 项集合窗口化、3 层浮层、100 轮挂载/销毁，以及交错 SSR/异步请求。时间/堆预算先用固定环境测量后锁定，不编造数字或为失败提高门槛。

最终交付包括代码、同源运行示例、类型正负例、CI/浏览器/axe/包外报告和候选产物。未测到的真实读屏/移动软键盘能力必须标明，不能用浏览器模拟结果替代。第一阶段结束后再审阅基础组件的实际作者代码，确认简洁性和能力复用，再开始第二阶段。

用户已批准本阶段实施，并要求适当参考成熟项目后取舍。实施记录与候选证据在本文件持续更新，第二阶段只规划，不在本阶段提前铺组件实现。

## 已落地交付与证据

| 交付              | 实际入口与验收                                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 配置与作者编译    | ConfigProvider、runtime/config/props、compiler/components；登记真实路径和允许键，自动生成声明；动态嵌套、false/undefined、Symbol、事件一次执行、包内预编译由独立 node_modules 消费 |
| UI 样式层与主题桥 | createStyleRuntime、StyleProvider/theme-context；components/defaults/app 同序；Portal 复用 marker 与方向，null dir 在宿主归一为 undefined                                          |
| 字段与校验        | internal/form/field/path/values；Zod jitless，唯一模型，草稿/IME/提交版本/reset/服务端错误/动态字段路径与完整 schema；公共视觉组件尚未交付                                         |
| 领域值            | Decimal 构造器和精度快照、日期/时间/时区实例、明确字符串 transport；Map/Set 表单模型明确拒绝，未知不可变实例保留引用，不假造通用克隆                                               |
| 层与交互生命周期  | internal/layers/portal/floating/presence/dom；3 层关闭顺序、取消/退出、ShadowRoot、触发器移除、100 轮释放、CSP 与 viewport 更新                                                    |
| 集合与请求        | internal/collection/request/virtual；对象保留、重复 key 拒绝、异步失序/中止/重试/分页、10000 项窗口化、活动节点和动态高度                                                          |
| 跨组件交互        | internal/interaction/announce/text；局部键盘不抢 IME/修饰键/输入框/Escape、Pointer Capture 清理、分级去重播报、grapheme 与精确数值编辑边界、原生媒体偏好                           |
| 消费与规模        | Docs dist 消费、真实 Kit、独立 tarball、1000 控件与资源基线；新增用例加入既有 CI，不引入只跑本机的验收通道                                                                         |

最终代码候选 b1c1ae2662ef1513cfdf1fadc174da69fc3a6c34 的[完整 CI 35435194810](https://github.com/kenconnet666/zui-svelte/actions/runs/35435194810) 已通过，包含类型/构建、三浏览器/axe、SSR/hydration、独立安装包与产物/资源预算。1000 控件、交互/指针取消、并发 SSR 配置隔离和字段重排均已纳入；源码和包外消费者没有使用 declare module 或路径别名掩盖类型错误。设备验证边界见下文。

本地重点证据：层/Portal/虚拟化、配置规模、键盘/指针、减少动态效果/高对比与 axe 的相关 Chrome 用例通过；相关 Svelte 文件经 WebStorm/LSP 和官方 autofixer 检查。server 9 项、集合/请求/退出/文本 9 项、表单/文本补充 11 项、配置 SSR 2 项在各自修改后通过。完整验证以候选 CI 为准，不把这些分批数量相加当成独立测试总量。

## 明确边界

- 这是一套可供库内组件复用的基础，internal 不是承诺长期兼容的公共 headless 产品。后续组件必须复用已经明确的资源/错误/模型所有权。
- Portal 不跨 Document/ShadowRoot 偷搬 DOM。跨根显式挂载 runtime + StyleProvider 子树；同 Document 多个应用共用层协调时必须使用相同 nonce/基础 z-index。
- 原生事件和 CSS 层叠规则保留。未分层样式、内联 style 和 !important 不服从 class 字符串顺序；组件作者显式规定可取消事件先后。
- 局部键盘监听通过 svelte/events.on 尊重子元素委托事件的 preventDefault；Escape 只有 Layer 一套责任方。一次外部点击只请求最上层关闭，父层显式销毁会关闭全部子层，不能给遮罩另加重复关闭链。
- LiveAnnouncer 是作用域内两种优先级的最新状态播报和短时去重，不把每次搜索中间结果排成长队。真正的读屏朗读质量仍需设备验收。
- 数值编辑使用 locale 小数分隔与数字，拒绝分组/货币/百分比的含混输入，不经过 Number 丢失精度；科学计数法、位数/舍入属于 DecimalInput 第二阶段的明确选择。
- 已测试 DOM/浏览器模拟不能冒充 NVDA/VoiceOver、移动 Safari 软键盘和触控滚动锁的设备结论；这些是公开组件发布前的明确验收项。
- 时间/堆没有编造普适阈值。配置规模用例附浏览器与耗时 JSON，绑定/监听/样式资源有确定归零或回到基线的断言；既有 core 数值预算继续执行。

## 参考与取舍

| 参考                                                                                                                                                          | 采用                                             | 舍弃/调整                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [MUI slot 合并](https://mui.com/material-ui/guides/composition/#forwarding-slot-props)、[Bits mergeProps](https://www.bits-ui.com/docs/utilities/merge-props) | class/style 与普通属性区别处理、嵌套定制保留     | 不引入依赖，不复制 sx/React ref/按名字猜测事件串联；普通数据不深合并，事件由作者明确调用 |
| [Svelte context](https://svelte.dev/docs/svelte/context)                                                                                                      | 原生 createContext、稳定 getter 视图和原生 Props | 不用 effect 把 Provider 复制到另一份 store，不用受控/非受控镜像                          |
| [Floating UI](https://floating-ui.com/docs/autoUpdate)、[focus-trap](https://github.com/focus-trap/focus-trap)                                                | 专项定位与焦点算法、明确挂载/更新/清理           | 关闭顺序、父子归属仍由统一层服务管理，不让两个库争抢 Escape/恢复焦点                     |
| [TanStack Virtual](https://tanstack.com/virtual/latest/docs/api/virtualizer)                                                                                  | 复用窗口、测量与稳定 key 算法                    | 使用 virtual-core 薄接入，几何由 css 消费；活动项补入窗口，不引入其他 UI 框架            |
