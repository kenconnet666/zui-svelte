# 第二阶段：布局、定位、浮层与架构收敛

状态：用户已认可本阶段规划，并补充 ScrollArea 使用半透明、无布局占位的覆盖式滚动条。布局/定位/浮层、架构 API 补齐/优化/精简、命名与目录/文件审计按本文推进；实施中具体 API 仍以真实示例和验收收敛。本文替代旧的“Button → 表单 → Select”排期。

第一阶段实现与验收见 [svelte-phase1.md](svelte-phase1.md)，既定状态绑定、主题、class、slotProps 合同见 [svelte-components.md](svelte-components.md)。用户已授权实施，当前按批次推进，实际进度见文末。

## 1. 目标与范围

让应用首先能够排布页面、建立可靠滚动区域、挂载和定位内容、使用完整浮层。补齐真实组件需要的基础设施，同时删除重复或已经不合适的设计；不把现有实现当作不可修改的约束。

公共组件提供完整用法，内部能力按职责组合。Dialog 不要求业务拼装 Root/Trigger/Content/Overlay。Button、Form/Input、数值与选择组件整体后移；本阶段的交互样例可使用原生 button/input 和 Lucide，不为关闭按钮先完成整个 Button 产品。

## 2. 先审计命名、归属与文件边界

审计不是只写清单：确定的重命名、迁移、拆分和合并在所属批次真正完成，并检查声明、入口、测试、文档、构建和源码映射。

### 当前结构的具体审计点

本次只读盘点：src/internal 有 16 个直接子项，tests/fixtures 有 22 个文件，未超出目录数量偏好。internal/layers.ts 约 565 个非空行、compiler/preprocess.ts 约 470 行、internal/form.ts 约 405 行，属于职责审查重点，行数本身不是拆分理由。

| 位置/名称                                 | 风险或待审查点                                                    | 建议处理                                                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| src/internal                              | 字段、集合、浮层、交互混在一个目录；增加组件后容易成为杂物目录    | 浮层专属实现迁入 overlays，与消费者同处一域；真正跨域的基础保留 internal，不建立第二个 utils/common/helpers 杂物目录     |
| internal/layers.ts                        | 层栈、焦点、inert、滚动锁、DOM 监听均由一文件协调                 | 保留一个所有者；仅将可独立说明和验证的锁/DOM 操作抽出。不要按行数拆成互相访问私有状态的多个 manager                      |
| compiler/preprocess.ts                    | 组件默认值与 class 改写已经分别有责任；新增组件可能诱发继续堆逻辑 | 检查 AST 遍历/改写边界与 source map，真实重复再抽；不为每种 AST 节点创建文件                                             |
| runtime/styles.ts / internal/layers.ts    | CSS 层序与浮层堆叠容易混淆                                        | 目录/注释明确 UI CSS layer 与 overlay layer；若改名，分别采用职责清楚的 ui-runtime / layer，不建立同义导出               |
| runtime/internal.ts                       | 名叫 internal，实际是包的生成代码协议出口                         | 保留 exports./internal 兼容边界；考虑源码移为 src/internal.ts 薄入口，避免误当运行时实现文件；迁移须核对 package exports |
| internal/text.ts / values.ts / request.ts | 短名称有作用域才清楚，可能随未来功能膨胀                          | 当前几十行不强拆；数值编辑/表单快照/异步列表增长时按消费者归属，不能逐渐塞进日期请求、上传与任意对象克隆                 |
| tests/fixtures                            | Probe 与 Target 夹具数量增长，临时用途可能留成永久文件            | 分清跨包集成夹具和模块测试；只在超过可维护规模或出现真实分组时按 compiler/overlay 等分域，不为每个 Probe 建目录          |
| .design                                   | 阶段文件与主合同容易重复或保留过期排期                            | 阶段文件记录顺序与验收，主合同记录 API；更新冲突段落，不新增 final-v2/new-plan/archive 副本                              |

### 建议目录

根目录仍为 core / svelte / docs。新增目录随真实代码形成，不提前创建空骨架：

```text
svelte/src/
  index.ts                  公共业务入口
  internal.ts               可选迁移：生成代码协议薄入口
  server.ts
  theme.ts / types.ts / locale.ts / component-types.ts
  ConfigProvider.svelte / StyleProvider.svelte
  compiler/                 编译转换与声明生成
  runtime/                  CSS / 配置 / 主题接入
  layout/                   Stack / Grid / Container / ScrollArea + test
  overlays/                 Portal / Popover / Tooltip / Dialog / Drawer
                            浮层专属 TS、内部 Floating 视图 + test
  internal/                 仍有跨域消费者的字段、集合、交互与值工具
```

overlays 不再套 components/primitives/utils 三层；当前职责相近的 TS 文件与组件可以同目录。某个目录达到实际规模后再分，不为了 5–30 个数量范围拆同一个责任。

命名与拆分准则：

- .svelte 使用 PascalCase；普通 TS 文件用小写或 kebab-case；测试与主体同名并放所属模块 test。不用公共/private 两份同名实现。
- 统一 open、anchor、placement、offset、portal、side、onClose/onclose 的边界：内部 TS 回调与 Svelte 公共事件命名分别沿现有规范；不同时公开 show/visible/open 或 target/reference/anchor 三套同义 Props。
- public 只经 @zui/svelte 出口；内部文件不自动全部 re-export。不要仅因有 Controller/Handle 类就将其升级为公共 API。
- 组件专用类型、默认值、常量与样式优先留在该 .svelte。只有跨消费者复用、独立算法或明显可读性收益才拆 .ts；不规定每组件必须有 types/styles/hooks/constants 四件套。
- 不用超长文件掩盖多个所有者，也不把五十行组件拆成六个小文件。拆分前先回答“谁持有状态、谁创建、谁释放”。
- 移动时同步 ESM .js 导入、src 条件、构建排除、Vitest 范围、包外夹具和文档；Windows 仅大小写改名需经临时名称完成，CI Linux 必须复验。
- 不保留无消费者的兼容转发文件；涉及已公开的名字需明确迁移，不静默破坏入口。

## 3. 建议公共组件

| 层次     | 组件       | 职责与边界                                                       |
| -------- | ---------- | ---------------------------------------------------------------- |
| 一维布局 | Stack      | 横/纵排列、gap、换行、对齐；单根、原生 flex gap，不包装每个子项  |
| 二维布局 | Grid       | 等分列或 CSS 模板列、gap；普通元素就是网格项，跨行跨列通过 css   |
| 页面容器 | Container  | 内容最大宽度、水平居中、主题内边距；不接管导航和路由             |
| 滚动区域 | ScrollArea | 原生滚动机制 + 半透明覆盖滚动条；交互时显露，显隐不占布局空间    |
| 挂载     | Portal     | 同渲染根目标、原位禁用、SSR 接管和主题方向；不负责关闭或模态语义 |
| 锚点面板 | Popover    | 完整交互内容面板，触发、打开状态、定位、关闭和非模态焦点         |
| 描述提示 | Tooltip    | hover/focus、延迟、Escape、描述关联；不可交互，不抢焦点          |
| 模态面板 | Dialog     | 标题/说明/内容/页脚/关闭按钮、初始和恢复焦点、inert/滚动锁/退出  |
| 边缘面板 | Drawer     | 共用模态协调，仅改变位置/尺寸/动效；不套 Dialog 再撤销其布局     |

建议 9 个公共组件。内部 Floating 视图负责定位，Layer 上下文负责父子层；模态面板、触发和退出协调按实际重复提取，不要求逐个建文件。

一维布局默认建议只保留 Stack；如果更喜欢 CSS 命名，可以统一叫 Flex，能力相同，不并列 Stack/Flex/Space/HStack/VStack/Row/Col。

Box、Center、AspectRatio、Spacer、GridItem、Position、Absolute、Fixed、Sticky 暂不独立导出：普通 HTML + css 已能表达。带边界检测/占位/状态的 Affix 与简单 sticky 不同，需明确场景后再纳入。Divider/Surface 有真实复用或语义收益再增加，不为凑组件数量创建。

## 4. 布局 API 建议

统一原生属性、class/style、snippet children；as 仅支持合适的非 void HTML 标签，复用现有 StyleContainerTag/HTMLAttributes，不扩展成任意组件多态系统。不提供 sx、全量 style props 或新的 responsive 对象引擎。

| 组件       | 高频 Props                           | 建议默认值                                                    |
| ---------- | ------------------------------------ | ------------------------------------------------------------- |
| Stack      | direction、gap、align、justify、wrap | column、md、stretch、start、false                             |
| Grid       | columns、gap、align                  | columns=1；整数生成 repeat(n,minmax(0,1fr))，字符串是原生模板 |
| Container  | maxWidth、padding、as                | maxWidth=lg、padding=md                                       |
| ScrollArea | axis、overscroll、scrollbar、as      | axis=y；页面默认保留原生滚动传播，面板按场景使用 contain      |

gap/padding 五档 + none，full 不适用。Container 的 maxWidth 五档 + full，与 breakpoint 分开定义，避免控件 size 的配置意外改变页面宽度。复杂单位/响应式仍用 css。

```svelte
<Container maxWidth="xl" padding="lg" as="main">
  <Stack gap="lg">
    <header>页面标题</header>
    <Stack direction="row" align="center" justify="space-between" wrap gap="sm">
      <nav>页面导航</nav>
      <div>操作区</div>
    </Stack>
    <Grid columns="16rem minmax(0, 1fr)" gap="lg">
      <aside>筛选条件</aside>
      <section>内容区</section>
    </Grid>
  </Stack>
</Container>
```

```svelte
<Grid
  columns={3}
  gap="md"
  class={css((s) => {
    s._media('(max-width: 48rem)', (s) => {
      s.gridTemplateColumns('minmax(0, 1fr)');
    });
  })}
>
  <article>一</article>
  <article>二</article>
  <article>三</article>
</Grid>
```

Stack/Grid/Container 的纯布局不引入 ResizeObserver 或 JS 断点状态；ScrollArea 为滚动条几何测量可使用观察器。明确根节点 min-inline-size/min-block-size 的收缩行为，不通过通配选择器无条件修改子元素。长文本、图片、overflow、嵌套滚动和 RTL 都验收，视觉重排不伪装成 DOM/Tab 顺序变化。

### ScrollArea：原生滚动 + 覆盖式滚动条

用户补充的默认方向：半透明滚动条浮在内容上方，鼠标进入区域才显露，有无溢出和滚动条显隐均不改变内容视口尺寸。保留原生 overflow:auto、scrollTop/scrollLeft、滚轮、触控板和触摸惯性，只自行绘制/拖动滚动条，不通过 transform 模拟整个内容滚动。

原生滚动条是否覆盖由浏览器/系统决定，scrollbar-width/scrollbar-color 不能强制所有平台采用同一覆盖模式；overflow:overlay 是历史兼容别名，不能作为实现基础。scrollbar-gutter:stable 通过预留空间稳定布局，也不符合本次零占位目标。依据：[CSS Scrollbars](https://www.w3.org/TR/css-scrollbars-1/)、[scrollbar-gutter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter)、[overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow)。

**推荐显隐规则：**

| 状态                       | 行为                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| 没有对应方向溢出           | 不显示、不接受拖动，任何情况下都不预留滚动条宽高                 |
| 鼠标进入区域               | 有溢出的方向显示半透明滑块；鼠标停留时保持                       |
| 键盘焦点进入区域/子元素    | 同样显示，保证非鼠标用户可发现滚动内容                           |
| 正在滚动或拖动             | 保持可见；触摸设备滚动时显示位置提示，不依赖 hover               |
| 指针和焦点均离开、停止滚动 | 短暂延迟后淡出；减少动态效果时直接切换可见性                     |
| 明确要求常显/强制高对比    | 保持可辨识的覆盖式滑块；高对比采用系统色和轮廓，不靠低透明度表达 |

建议只增加 scrollbar='auto' | 'always'，默认 auto；两者都覆盖显示，不扩展成多套滚动引擎。焦点/触摸规则是对鼠标显露机制的可访问性补充。隐藏原生条后仍需提供鼠标可拖动的替代和可聚焦的原生 viewport，不能只剩滚轮手势。

**DOM 与定制边界调整：** 覆盖轨道需要留在滚动内容之外，使用 root → viewport → content，轨道与 viewport 同级且绝对定位。class/style 控制 root 的尺寸和外观；slotProps.viewport 控制滚动视口，slotProps.content 控制内容。onscroll 和滚动方法对应真实 viewport，标签/焦点属性明确转发到该语义节点；不要把原来“根就是 viewport”的假设继续带进类型/文档。as 限于允许该结构的容器标签。

内部滚动条是同一组件的实现细节，不要求业务拼 Scrollbar/Thumb。确需定制时再暴露有稳定意义的位置；不为每个薄 DOM 节点建公共组件/类型文件。视觉滑块保持细窄，可拖动命中范围适当扩大；隐藏时不拦截内容点击，拖动使用现有 Pointer Capture，释放/取消/卸载都清理。

**布局承诺与边界：** 不根据滚动条显隐修改 width/height/padding，滑块增粗也只改变覆盖绘制。验收无溢出→溢出、hover/focus、横纵同时溢出、内容增删、zoom/RTL 时 clientWidth/clientHeight 和内容几何不因滚动条变化。覆盖条可能短暂遮住最边缘内容，这是覆盖方案固有取舍；需要防遮挡的场景由内容提供始终固定的内边距，不在显示滚动条时临时挤布局。

**测量与接入：** 读取真实 scrollWidth/scrollHeight/clientWidth/clientHeight，监听 viewport/content 尺寸与必要的内容变化，合并到帧内更新；不常驻逐帧轮询或全页 MutationObserver。滚动位置由 DOM 持有，仅保存绘制滑块所需派生数据。复用现有 ScrollArea 方法与 VirtualCollection，处理 RTL scrollLeft、最短滑块、无可滚动距离的除零、动态内容与虚拟列表总高度。几何仍通过现有 class/runtime 写入，严格 CSP 下不写内联 style。

SSR 输出相同宿主结构和零占位 CSS，接管测量前只隐藏自绘滑块，不让有/无条引发二次收窄。无 JS 或不支持必要 CSS 时保留明确的原生可操作降级；该降级可能使用系统占位条，不能伪称仍保证覆盖几何。业务无需为默认效果多写参数。

此能力在 P2-01 与 ScrollArea 一起验收，不留到上层 Dialog/Select 才补。

## 5. 挂载、定位与交互的分工

```text
布局/滚动组件
    ↓
Portal：挂在哪里      Floating：相对谁、放哪里、避让多少
    ↓
Popover / Tooltip    Dialog / Drawer
    ↓
后续 Select / Autocomplete / Menu / DatePicker
```

Portal 不自动变成模态层，Floating 不猜 role。建议 Floating 先内部复用，业务用完整 Popover/Tooltip；若确有自定义图形标注或跟随面板需求，本阶段可评审小型公开定位入口，但不公开一套 LayerManager/FocusTrap/OutsideClick 拼装系统。

现有 FloatingController 已有 offset/flip/shift/size/hide 和版本保护。本阶段还需要：

- 箭头、实际 placement 与动画原点联动；不能只按请求方位画箭头。
- 可配置碰撞边界/留白；matchAnchorWidth 和可用尺寸约束，避免测量反馈循环。
- 合理的 fixed/absolute 策略、transform containing block、滚动/VisualViewport 更新。
- 虚拟锚点复用 Floating UI 标准形态与 contextElement，不再造 x/y、rect、getter 四套同义 API。
- 锚点被 transform 动画移动时可选 animationFrame 更新，不默认永久逐帧测量。
- 替换锚点、关闭、异常、过期异步计算和卸载都释放订阅；几何继续经 class/runtime，严格 CSP 不依赖内联 style。

placement 是实际方位而非五档；offset 是像素几何量。普通 absolute/fixed/sticky 继续用 css，定位组件只承担跨元素测量与避让这种确有价值的责任。

## 6. 完整浮层的消费形态

以下均为候选 API，不是当前已导出组件。

### 触发器优先 Svelte snippet

```svelte
<Popover bind:open placement="bottom-start">
  {#snippet trigger(props)}
    <button type="button" {...props}>筛选</button>
  {/snippet}
  <Stack gap="sm">
    <label>关键字<input /></label>
    <button type="button" onclick={() => (open = false)}>完成</button>
  </Stack>
</Popover>
```

trigger props 建议携带 ARIA 与原生 attachment Symbol，spread 到真实元素，行为使用 svelte/events.on；子元素自己的 onclick/preventDefault 有明确优先级。无包装 span、不扫描第一个子元素、不克隆 VNode；CSS 仍只写 class。Symbol 经未来 Button 的 rest/slotProps 必须只绑定一次。

已有外部锚点保留显式备用模式：

```svelte
<button
  bind:this={anchor}
  type="button"
  onclick={() => (open = !open)}
  aria-expanded={open}
  aria-controls="filters">筛选</button
>
<Popover id="filters" {anchor} bind:open>筛选内容</Popover>
```

此模式由使用者编写外部触发器的事件与 ARIA，组件不偷偷改写任意元素；与 trigger snippet 二选一，冲突时报错。没有真实触发器的虚拟锚点不能假造触发语义。

### Tooltip

```svelte
<Tooltip content="复制链接">
  {#snippet trigger(props)}
    <button type="button" {...props} aria-label="复制链接">…</button>
  {/snippet}
</Tooltip>
```

默认 hover/focus，延迟定时器随卸载清理；Escape 关闭后直到新一次触发才重开。指针移入提示内容时保持，aria-describedby 合并已有 ID；不放按钮/表单、不改变焦点。禁用原生按钮的触发与标签需明确示例，不自动套 span 掩盖；触摸不强制使用有歧义的长按菜单。

Popover 默认点击打开、非模态可交互，Tab/Shift+Tab 应按逻辑触发点/内容顺序进出；不锁背景，不把面板一律标为 tooltip/menu。复杂角色由以后对应组件承担。

### Dialog / Drawer

```svelte
<Dialog
  bind:open={editing}
  title="布局设置"
  size="md"
  slotProps={{ body: { class: bodyClass }, closeButton: { 'aria-label': '关闭设置' } }}
>
  <Grid columns={2} gap="md">设置内容</Grid>
  {#snippet footer()}
    <button type="button" onclick={() => (editing = false)}>关闭</button>
  {/snippet}
</Dialog>

<Drawer bind:open={inspecting} title="详情" side="end" size="md">详情内容</Drawer>
```

Dialog 保持完整标题/说明/页脚/关闭原因与取消、初始/恢复焦点和滚动。Drawer 共用模态生命周期，side=start/end/top/bottom，逻辑边缘尊重 RTL。关闭按钮先用原生 button + Lucide，其 slotProps 为真实 HTML 属性；以后真正替换为 Button 时再采用其 Props，不先假造未实现组件类型。

class/style 控制可见面板。slotProps 只公开 backdrop/header/body/footer/closeButton/arrow 等有稳定定制意义的位置；定位外壳持有几何，内容面板可写 transform，不让定位与内容变换抢同一属性。根、滚动 viewport、Portal 宿主关系必须写清，不公开整棵 DOM 树。

## 7. 本阶段架构补齐与精简

| 议题            | 当前基础/缺口                                     | 建议处理                                                                                                      |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 父子层          | 有显式 parent handle，组件还要自己传递            | 原生 createContext 提供所属层和默认 Portal 宿主，自动登记；不按 DOM 猜逻辑父级                                |
| 模态子 Portal   | 逻辑归属与主题已有，body 挂载不自动保证 ARIA 所属 | 子浮层默认落到所属模态的专用宿主，位于滚动内容之外；验收语义后代、裁切和 stacking context                     |
| 非模态焦点      | 模态陷阱可用，Popover 完整 Tab 顺序未实现         | 补逻辑进出和必要 focus guards；Tab 离开时不强拉回触发器，Escape 仍仅 Layer 管理                               |
| Portal SSR/目标 | 当前是 DOM 工具，未有公共 Portal SSR 合同         | 默认关闭不输出；初始打开 Dialog 原位 SSR 后接管移动；锚点内容测量前不可见/不可聚焦；目标未就绪不悄悄回退 body |
| 打开/退出       | Presence 与 Layer 已有，易在每组件复制协调        | open 是唯一业务意图，Presence 管 DOM 保留，Layer 持有交互资源；收敛一处可中断的内部协调                       |
| 定位 API        | 缺箭头、等宽、碰撞配置、变换原点                  | 小幅扩展现有 FloatingController，不引入任意 middleware 插件框架或另一定位后端                                 |
| Props/类型/编译 | 有生成和合并原型，真实组件还要证明简洁            | 用 Stack/Popover 对照源代码和生成结果；改善声明推导/错误定位，禁止配置覆盖 open/DOM 引用/snippet 等状态       |
| 样式/配置性能   | 已有资源回收，真实组件尚无体积基线                | 布局仅 CSS；检查重复 styles() 读取/分配，有证据再缓存并测试失效；布局 bundle 不带定位/虚拟化/完整 schema      |
| API/文件收敛    | 内部目录不能持续膨胀或无意义分层                  | 结合第 2 节真正重命名、迁移、拆分/合并，删除无消费者兼容层，保留单一状态/清理责任                             |
| core 补齐       | 可能暴露标准属性/关键字/类型缺口                  | 用现有元数据/生成脚本修复，标准能力留 core；不在 svelte 另手写 CSS 类型补丁                                   |

直接把 open=false 是业务赋值，不由 onClose 反向否决；可取消回调只处理组件提出的关闭请求。一次外部事件只请求最上层关闭，关闭父层清理子层，退出过程中不提前解锁背景。

沿用 Portal + Layer，不新增可随意切换的 native top-layer 后端；与宿主原生 dialog/popover 混用需显式宿主和实际验证，不能用更大的 z-index 保证覆盖。keepMounted 若提供，关闭状态必须 inert/hidden、停止几何/层监听，仅保留内容状态。

主题继续 ThemeScope，默认配置继续 ConfigProvider；不加第二份全局主题或每实例全量 Token。响应式继续 _media/_container 和普通 TS；只有重复 breakpoint→query 拼接证明确有价值时才增加小型纯函数，不同时引入 responsive Props DSL。

## 8. 批次与退出门槛

| 批次  | 工作                                                  | 退出条件                                                                                    |
| ----- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| P2-00 | 命名/文件/目录/API 审计，确定迁移表                   | 公共与内部出口、每个状态所有者、迁移后路径可审阅；必要迁移分批实施，不做巨型搬家提交        |
| P2-01 | Stack/Grid/Container/ScrollArea；验证配置和作者形态   | SSR/响应式、长内容/收缩/RTL/滚动、原生属性/事件、声明/产物裁剪                              |
| P2-02 | Portal 与内部 Floating、层上下文、挂载/退出协调       | 初始打开 SSR/hydration、目标延迟/切换、ShadowRoot/CSP、箭头/避让/等宽、滚动/viewport 和回收 |
| P2-03 | Popover/Tooltip                                       | snippet 与外部锚点、事件取消、非模态 Tab、hover/focus/触摸、ARIA、keepMounted/减少动态效果  |
| P2-04 | Dialog/Drawer、共享面板与内容滚动                     | Dialog 内 Popover/Tooltip、三层、恢复焦点、父层销毁、动画中断、RTL/移动视口、slotProps      |
| P2-05 | 删除重复实现、冻结必要公共 API、Docs/Kit/tarball 交付 | 页面壳 + 设置 Dialog + 内部锚点面板；三浏览器/axe/SSR/CSP、独立安装、类型、资源与体积证据   |

本地只做相关 IDE/LSP 与聚焦验证，完整检查交 CI。中文提交推送，下次推送前检查上一轮，不等待新 CI。设备读屏、移动 Safari 软键盘/触控滚动锁单独记录；自动化不冒充实机通过。

## 9. 选择性参考

| 来源                                                                                                                                                                                     | 吸收                                   | 不照搬                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| [MUI Stack](https://mui.com/material-ui/react-stack/)                                                                                                                                    | 一维/二维责任、单根布局                | sx 全属性系统、margin 间隔模式；直接用 gap        |
| [Chakra Container](https://chakra-ui.com/docs/components/container)、[Grid](https://chakra-ui.com/docs/components/grid)、[ScrollArea](https://chakra-ui.com/docs/components/scroll-area) | 容器约束、网格、真实滚动视口           | 大量同义组件、强制 GridItem 和复合 scrollbar 拼装 |
| [Naive UI Popover 源码](https://github.com/tusen-ai/naive-ui/blob/main/src/popover/src/Popover.tsx)                                                                                      | 触发/内容分工、延迟与清理、箭头/方位   | VNode 克隆、双模式状态同步、过时别名兼容          |
| [Floating UI autoUpdate](https://floating-ui.com/docs/autoUpdate)、[size](https://floating-ui.com/docs/size)、[virtual elements](https://floating-ui.com/docs/virtual-elements)          | 几何算法、订阅生命周期、尺寸与虚拟锚点 | React 运行时、直接内联 style                      |
| [WAI Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)、[Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)                                                       | 名称、焦点、键盘、描述关系的验收依据   | 只复制 role/aria 就宣称无障碍完整                 |

## 10. 本轮可选择项

1. Stack 或 Flex：建议 Stack，横纵用 direction，不同时保留两套。
2. Floating 是否公开：建议先内部，普通业务用完整 Popover/Tooltip；有大量自定义跟随面板再公开小定位入口。
3. 页面 Layout/Sider/Header 是否加入：建议先用布局组件做完整页面壳示例；若要负责侧栏折叠、移动抽屉和持久化尺寸等行为，再设计 Layout，避免几个标签包装没有额外价值。

用户已认可整体规划；具体 API 在实施样例中继续收敛，ScrollArea 默认改为半透明覆盖条。已明确的“先布局/定位/浮层，同时审计并优化架构、命名、目录和文件拆分”不再回退。

## 实施记录

P2-00/P2-01 首批：浮层专属的 layers/floating/portal/presence 与对应测试迁到 overlays，生成协议薄入口迁到 src/internal.ts，公开 @zui/svelte/internal 路径保持不变。保留 Layer 单一资源所有者，不按行数拆出多个 manager；短小的跨领域工具继续留 internal。

已实现 Stack/Grid/Container/ScrollArea，源码默认值经清单编译，类型自动生成并格式化。新增 Container 五档语义宽度。Docs 使用构建后的公共组件；Chrome 验证配置与实例覆盖、覆盖滚动条零占位、滑块拖动和键盘滚动。主题/几何/退出相关 10 个聚焦用例通过，SSR 与独立包布局用例加入 CI。P2-02 起仍在实施，不能把当前批次当作第二阶段完成。

### 近期浏览器能力取舍

- 采用 scrollbar-width（Baseline 2024）隐藏系统条但保留原生滚动；不使用历史 overflow:overlay 或预留 gutter 破坏零占位。
- 采用 Element.scrollend（Baseline 2025）识别真实滚动结束，缺失时保留小型延迟退路；不依赖猜测惯性结束的永久轮询。
- 研究 @starting-style/离散过渡与 CSS anchor positioning；当前浮层需要虚拟锚点、碰撞测量、跨宿主和统一退出资源，暂不增加并行定位/动效后端。单个能力的支持不等于全部组合合同已验证。
- 继续使用逻辑尺寸/边缘、原生 CSS Grid/Flex gap、媒体与容器查询；不为响应式布局再建 JS 状态系统。

依据：[滚动条属性](https://web.dev/blog/baseline-scrollbar-props?hl=en)、[Baseline 2025](https://web.dev/baseline/2025)、[starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)、[锚点定位](https://web.dev/learn/css/anchor-positioning)。
