# 第二阶段交付：布局、定位、浮层与架构收敛

状态：九个公共组件、架构调整和自动化验收已交付。完整代码候选 `380d88a897a28799c898ee263f8d2b9a93c482ca` 的 [CI 35440338173](https://github.com/kenconnet666/zui-svelte/actions/runs/35440338173) 已通过；后续提交的结果单独核对，不把旧 SHA 的通过套用到新 HEAD。

实际参数、默认值和复制使用的示例统一维护在 [Svelte README](../svelte/README.md#布局与浮层组件)。本文只保留阶段范围、架构取舍、审计和交付证据；此前长篇候选草案可从 Git 历史查阅。

## 范围与交付

| 批次  | 已交付                                                             | 验收                                                           |
| ----- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| P2-00 | 命名/归属审计；浮层实现迁到 overlays，协议入口迁到 src/internal.ts | 公共包路径不变，源码/声明/测试/包外构建同步                    |
| P2-01 | Stack、Grid、Container、ScrollArea；组件默认值与声明生成           | 配置继承、实例 CSS、窄屏、覆盖滚动条、原生拖动/键盘、SSR       |
| P2-02 | Portal、定位接入、Layer 上下文、OverlaySession                     | 父子宿主、主题/方向、CSP nonce、箭头/等宽、可中断退出          |
| P2-03 | 完整 Popover、Tooltip                                              | 真实触发元素、Tab 顺序、事件取消、描述 ID、hover/focus、长内容 |
| P2-04 | 完整 Dialog、Drawer；共用 Modal/Panel                              | 三层组合、焦点归还、取消关闭、keepMounted、RTL、模态滚动       |
| P2-05 | Docs/Kit/tarball、声明正负例、资源与分发门槛                       | 三浏览器、axe、初始打开 SSR/接管、严格 CSP、独立安装和产物     |

Button、Form/Field、Input、Select、DecimalInput 等公共视觉组件不属于本阶段。已有字段/校验/集合/虚拟化仍是后续可复用基础，不把它们的探针称为视觉组件成品。

## 命名与文件审计结果

```text
svelte/src/
  index.ts / internal.ts / server.ts     业务、生成协议、Node 服务端入口
  types.ts / theme.ts / locale.ts        共享类型、UI 主题、库文字
  ConfigProvider.svelte / StyleProvider.svelte
  compiler/                             作者转换与声明生成
  runtime/                              CSS/配置/主题接入
  layout/                               四个布局组件、scroll.ts、test
  overlays/                             五个公开组件、内部面板/定位/层/退出、test
  internal/                             跨域字段、集合、指针、值等基础
```

- Layer 的资源所有权仍集中，不按行数拆出多个相互抢状态的 manager。internal 不再放浮层专属实现。
- Dialog/Drawer 是小型公共包装，共用内部 Modal；Popover/Tooltip 共用内部 Popup。Panel 只负责真实面板与后代上下文，没有公共 Root/Content/Overlay 拼装体系。
- StyleContainerTag 移到 types.ts，布局不再只为一个类型依赖有状态的 StyleProvider。公开名字保留，未添加同义类型别名。
- 组件专用默认值、类型和样式继续留在 .svelte；没有 buttonClass、BaseComponent、通用 Props DSL。controller 只负责有生命周期或独立算法的重复责任。
- 默认值仅在 $props 声明，components.mjs 只登记允许的键。ComponentDefaults 生成普通类型别名/Pick，避免 interface 的索引约束削弱默认配置检查。
- 测试按职责放置，跨包夹具留 tests。未为每个组件建立一文件目录，也没有保留旧内部路径的无消费者转发壳。

## 最终取舍

### 布局

只保留 Stack，不并列 Flex/Space/HStack/VStack。Grid 使用 CSS Grid，支持整数和模板字符串，不要求 GridItem 或专用 24 栅格。Container 的宽度尺度与控件 size/媒体断点分开。

Stack/Grid/Container 支持非 void HTML 标签 as。ScrollArea 的根和 viewport 固定为 div，保持真实 DOM 属性/滚动事件类型；语义 section/nav 可在外层组合，不给复杂滚动结构强加任意组件多态。

Box、Center、Spacer、Absolute/Fixed/Sticky 和后台 Layout/Sider/Header 暂不新增。标准 CSS 可清楚表达时不加组件；需要真实折叠/占位/持久化行为时再设计。

### 覆盖式滚动条

- 保留原生 overflow、scrollTop/scrollLeft、滚轮、触控板、触摸和键盘滚动；只自绘轨道与滑块，不用 transform 模拟内容滚动。
- 半透明覆盖显示，hover/focus/滚动/拖动时显露，不因显隐更改内容视口宽高。无溢出不显示，always 可常显。
- 隐藏时不拦截内容点击；拖动使用共享 Pointer Capture。高对比使用系统色，减少动态效果时取消淡入淡出。
- 尺寸/内容观察限制在所属区域并合并更新，不全页监听或永久逐帧轮询。处理无滚动距离、短轨道、横纵同时溢出和 RTL。
- CSS 无脚本降级恢复原生滚动条；系统占位条的降级不承诺零占位。边缘内容若需避让，使用固定 content padding，不在 hover 时挤布局。
- root class/style 与 viewport/content slotProps 分工明确；onscroll 和滚动方法指向真实 viewport，供虚拟化和上层面板复用。

### 浮层与交互

Portal 只负责挂载，FloatingController 负责几何，Layer 负责交互资源，Presence/OverlaySession 负责打开与退出次序。业务只写完整 Popover/Tooltip/Dialog/Drawer，Floating/LayerManager 不作为公共 headless 产品导出。

子 Portal 默认在所属面板内、滚动内容之外。Panel 只向后代发布所属层，外层 Portal 读取父宿主，避免把自己搬进自己的容器。跨 Document/ShadowRoot 不静默移动，需明确宿主。

模态陷阱让出非模态子面板自己的 Tab 边界；Tooltip 不抢焦点。Tooltip 增删自己的描述 ID，保留已有 aria-describedby。触发器通过 snippet props 的 Symbol attachment 接入真实元素，Svelte 委托事件的 preventDefault 被尊重。

直接赋 open=false 是业务动作；onclose 处理同步可取消请求，父层销毁不可取消。退出时先逻辑隐藏，随后物理卸载和释放；关闭测试不能把无障碍树隐藏误当成资源已释放。keepMounted 只保留内容，不保留活动的定位/层锁。

root runtime.nonce 让上层复用宿主 CSP，不窥探具体样式表；同 Document 的层基线取根主题 zIndex.popup。局部 ThemeScope 不另建文档层栈。SSR 初始面板有首屏样式，客户端接管后安装焦点/层资源。

### 近期浏览器能力

| 能力                                        | 采用方式与原因                                                     |
| ------------------------------------------- | ------------------------------------------------------------------ |
| scrollbar-width，Baseline 2024              | 隐藏系统条但保留原生滚动；不用历史 overflow:overlay 或预留 gutter  |
| Element.scrollend，Baseline 2025            | 浏览器判断惯性/键盘/平滑滚动结束；缺失时小型延迟退路               |
| Element.moveBefore，尚非完整 Baseline       | 特性检测后保留移动状态，旧浏览器兼容移动并恢复内部焦点             |
| 逻辑尺寸/边缘、Grid/Flex gap、dvh、媒体查询 | 直接使用，不建立 JS 响应式布局系统                                 |
| starting-style / CSS anchor positioning     | 已研究；目前需要虚拟锚点、碰撞结果和统一退出资源，暂不添加并行后端 |

使用 WAAPI 的可取消动画；transitionDuration 读取主题时间，transitionProperty 显式 none，避免默认 all 让 visibility 产生意外过渡。没有为该问题保留多帧等待补丁。

依据：[滚动条属性](https://web.dev/blog/baseline-scrollbar-props?hl=en)、[Baseline 2025](https://web.dev/baseline/2025)、[moveBefore](https://developer.mozilla.org/en-US/docs/Web/API/Element/moveBefore)、[starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)、[CSS 锚点定位](https://web.dev/learn/css/anchor-positioning)。

## 验收与产物

完整候选 CI 已包含库/Docs 类型检查、生成一致性、core 合同、三浏览器、HMR、Kit SSR/接管/CSP、独立 tarball 消费和候选证据。相关本地验证只跑改动的重点用例，不重复全仓矩阵。

本阶段加入：长 Popover 在可用视口内滚动、连续 20 次开关后层样式/锁释放且规则数回到基线、关闭取消与嵌套焦点、RTL Drawer、Portal 内容保留，以及嵌套 slotProps 的声明正负例。既有 1000 控件、10000 行窗口化和 100 轮层销毁继续保留。

UI 入口分发通过 scripts/verify-ui.mjs 检查，预算位于 svelte-distribution-budget.json。初始实测布局组约 64.7 KiB gzip、浮层组约 92.3 KiB gzip，包含 Svelte 和 ZUI runtime，不是单组件净大小，不能相加当作应用总量。门槛保留 15% 审查余量，CI 不自动提高；两组均禁止无关日期/Decimal/虚拟化/完整 schema，布局组还排除定位/焦点库。

[已验收产物](https://github.com/kenconnet666/zui-svelte/actions/runs/35440338173) 包含 workspace-dist 与 browser-report；distribution.json 同其他报告关联到 candidate-evidence.json。最新报告和归档 SHA-256 以对应 CI 为准。

真实 NVDA/VoiceOver、移动 Safari 软键盘和触控滚动锁的设备体验未在本机验证，不能用桌面自动化声称已通过设备认证。旧浏览器降级、用户自定义 CSS、外部 native top layer 和不透明闭合 ShadowRoot 控件也需要按实际宿主集成验证。

## 参考范围

选择性吸收 [MUI Stack](https://mui.com/material-ui/react-stack/) 的布局职责、[Chakra 布局组件](https://chakra-ui.com/docs/components/grid) 的容器/网格分工、[Naive UI Popover](https://github.com/tusen-ai/naive-ui/blob/main/src/popover/src/Popover.tsx) 的触发/内容边界；不照搬 sx、VNode 克隆、双模式状态或大量同义组件。

定位/焦点使用既有 Floating UI 与 focus-trap/tabbable；[WAI Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) 和 [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) 作为行为依据。图标从 Lucide 单图标公开路径导入，避免源码 SSR 载入整个图标表。

后续组件范围另行讨论；本阶段不提前实现 Button/表单/选择组件。
