# 依赖职责

精确版本以 pnpm-workspace.yaml 和 pnpm-lock.yaml 为准，文档不维护第二份版本清单。

| 范围      | 当前职责                                                                                                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| core      | csstype 提供属性类型来源，Stylis 处理 CSS，clsx 处理 class 组合                                                                              |
| svelte    | @zui/core；Zod、decimal.js 与 @internationalized/date 提供校验和领域值；TypeScript 与 magic-string 用于编译；Svelte 为 peer，Kit 为可选 peer |
| docs      | 两个本地库、Svelte、svelte-spa-router、Shiki、Lucide                                                                                         |
| 构建/检查 | TypeScript、svelte-package、Vite、svelte-check、ESLint、Prettier                                                                             |
| 测试      | Vitest、Playwright、axe 及对应 provider；Kit/adapter 仅为消费验收                                                                            |
| 开发工具  | MCP/LSP 依赖在 languageServices catalog，安装于用户工具目录，不进入产品包                                                                    |

外部依赖用 catalog:，内部用 workspace:^；严格 peer 检查，关闭自动补装 peer。Vitest/provider 与 Playwright/@playwright/test 保持配套版本。新增需运行安装脚本的依赖时单独检查 allowBuilds。

组件图标已确定使用官方 @lucide/svelte；当前 Docs 已安装，开始实现组件时在 svelte 包中直接声明同一 catalog 依赖。普通图标倾向使用 LucideIcon 组件类型，具体入口见组件讨论稿。

表单校验已选择 Zod 4，产品依赖使用默认 catalog；languageServices 中的 Zod 3 属于现有 MCP/LSP 工具依赖，不因产品升级而顺带修改。业务优先从 @zui/svelte 导入 z，使用原生 Zod 规则与类型，不再增加 ZUI 校验 DSL 或通用 schema 适配器。表单调度与 Field 关联尚待实现。

精确十进制已安装 decimal.js，作为 svelte 直接依赖并从主入口导出原生 Decimal，版本走默认 catalog。职责是 Svelte 数值领域及 Zod/序列化适配，不进入 core 的 CSS 引擎，不替代所有普通 number。不再引入第二套 decimal 实现或包装类；DecimalInput、编辑中间态、表单快照与 SSR 传输仍待实现，详见组件规划第 3 节。

其余工具按定位、焦点、日期与无障碍等具体职责评估。普通 TS/CSS/浏览器能力足够时不加依赖；不预装未来组件的全部工具，不引入无样式组件库。

## 完整性复核：新增缺项与依赖候选

用户本轮要求查依赖/基础能力的遗漏，不是继续重复已接受的业务交互选择。定位、焦点、虚拟化、locale/RTL、层管理已在主规划中；以下是尚未落成具体合同、需要补齐的能力。本轮已按用户要求安装日期库和 axe；其余采用/暂缓取舍如下，不因此安装额外框架。

| 补充项             | 实际消费者/缺口                                                                                            | 依赖与实现取舍                                                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 日期/时间领域值    | 日期、纯时间、本地日期时间与时区时间不能都塞进 Date；Calendar/DatePicker/TimePicker 需要一致的算术和序列化 | 已安装 @internationalized/date，svelte 主入口导出领域类型与解析函数；只用日期工具，不引入 React Aria 组件                                                                       |
| 特殊值 SSR 传输    | 已有 Decimal 后，Kit load/actions 到浏览器需要保留类型；将来日期类型同样需要                               | 优先 Kit 原生 universal transport 与明确 encode/decode；普通 Vite/API 边界用 Zod codec，不另造通用 serializer。transport 两端都执行，不能从 Node-only server 子入口给浏览器导入 |
| 自动无障碍审计     | docs 公共页面的生产消费者检查和 axe 审计                                                                   | 已在 docs 安装 @axe-core/playwright 和配套 playwright-core peer，CI 三浏览器扫描并附 JSON；人工键盘/读屏仍独立验收                                                              |
| 动态播报           | 搜索结果数量、加载失败、上传完成、排序结果需要适量通知读屏用户                                             | 小型内部 live-region 服务，明确作用域、排队/去重、语言和卸载；不把所有状态都挂 role=alert，不引入整套 UI 依赖                                                                   |
| 快捷键作用域       | 表格、菜单、对话框、业务快捷键要避免抢占输入/IME 与互相重复处理                                            | 原生键盘事件 + 小型作用域约定，复用既有层/集合所有权；Escape 不再建立另一套处理栈，原生按钮不重复模拟键盘点击                                                                   |
| 指针/拖动/调整尺寸 | Slider、列宽、分隔条需共享 pointer capture、取消、越界、触摸滚动边界                                       | Pointer Events 为基础；复杂树/列表重排再评估专项拖放工具，不把原生文件 drop、滑动与排序全部揉成一个框架                                                                         |
| 文本计数与编辑格式 | emoji/组合字符长度、maxlength、Zod 长度语义及搜索比较要一致，Decimal 的 locale 输入不能转回 number         | Intl.Segmenter/Collator/NumberFormat 等原生能力优先，明确 code unit/code point/grapheme 差别；不自动安装模糊搜索/拼音/输入掩码库                                                |
| 移动视口与输入设备 | 软键盘、VisualViewport、触摸下浮层避让与滚动锁不能只靠桌面 resize                                          | 纳入现有定位/层管理/指针基础的实际设备验证；不新增平行 viewport manager。Playwright 的浏览器覆盖不冒充真实软键盘/读屏验收                                                       |

@internationalized/date 已作为 svelte 运行时依赖，@axe-core/playwright 已作为 docs 开发依赖；docs 从 @zui/svelte 消费领域值，不重复声明这些运行时库。动态播报、键盘/指针作用域、Intl 文本处理和移动视口采用原生能力配小型内部实现，不引入新的库。表格计算引擎、图片裁剪、富文本/代码编辑器等在明确组件范围后专项选型，不以“可能用到”为理由预装。

依据：[Internationalized Date](https://react-aria.adobe.com/internationalized/date/)、[Kit transport](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport)、[Playwright 无障碍检查](https://playwright.dev/docs/accessibility-testing)、[Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)、[WAI 键盘交互](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)。
