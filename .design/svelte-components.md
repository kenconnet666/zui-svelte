# Svelte 组件与主题合同讨论

已确认：共享响应式模型可直接修改；Lucide 组件直传；一体 Input 包含 label/help/error；Dialog 为完整组件；五档使用 xs/sm/md/lg/xl；标准 CSS 与通用主题引擎留 core，UI 预设与默认主题 css 在 svelte；Button 使用 color + variant + size，集中默认配置与统一浮层管理。业务组件尚未实施，本文明确区分已经确认的边界与后续建议。

## 1. 包与默认值边界

| @zui/core                                        | @zui/svelte                                |
| ------------------------------------------------ | ------------------------------------------ |
| 标准属性/关键字/单位、生成器、样式 runtime       | lightTheme/darkTheme、五档尺度、语义 Token |
| defineTheme/extendTheme/overrideTheme/ThemeScope | DefaultTokens、带内置主题类型的 css        |
| 空 baseTheme、纯 CSS 的 css、createCss           | Svelte 默认宿主、SSR、Provider、后续组件   |

core 不导入 svelte。core.createRuntime() 默认 baseTheme；Svelte 自动宿主和 renderStyled/createStyleHandle 默认 lightTheme。显式 core runtime 需要传 theme: lightTheme 或自定义主题；显式自定义配置不能静默补 UI 键。自定义主题继续用 core.createCss(theme)，无需全局 TS 模块扩展。

```ts
import { css, lightTheme, darkTheme } from '@zui/svelte';
import { createCss, createRuntime, extendTheme, ThemeScope } from '@zui/core';
const appTheme = extendTheme(lightTheme, { color: { brand: '#0f766e' } });
const appCss = createCss(appTheme);
```

## 2. 共享模型与原生双向绑定

```svelte
<script lang="ts">
  const form = $state({ name: '', enabled: true, editing: false });
  function reset() {
    form.name = '';
    form.enabled = true;
  }
</script>

<Input bind:value={form.name} label="名称" />
<Checkbox bind:checked={form.enabled}>启用</Checkbox>
<Dialog bind:open={form.editing} title="编辑资料">
  <Input bind:value={form.name} />
  <Button onclick={reset}>重置</Button>
</Dialog>
```

组件和业务代码持有同一响应式模型即可直接修改，数组也可 push/splice；不强制 setter、reducer、不可变更新或 value/defaultValue 双模式。事件是可选通知，不是同步数据的必经入口。

可复用模型由 .svelte.ts 的普通工厂返回 $state，在页面/请求内创建，再通过 props/context 共享；不创建跨 SSR 请求的可变单例。普通裸 JS 对象不会自动变响应式。

建议允许 undefined 初值，展示为空而不在挂载时回写。内部 $bindable 不为这些字段设置非 undefined fallback。原生 defaultValue/defaultChecked 的 form.reset 合同另行保留。原生事件遵循 Svelte 顺序；可选语义通知在内部写入后发出，外部赋值不伪造用户事件。

## 3. 一体 Input，对内组合公共表单结构

```svelte
<Input
  label="邮箱"
  help="用于接收通知"
  error={errors.email}
  required
  icon={Mail}
  clearable
  bind:value={form.email}
/>
```

用户无需包 Field。Input 的根始终是整个字段容器；有无 label/error 只影响可选内容，不改变根的类型。class/style 控制字段根，原生 id/name/autocomplete/输入事件传给 input；slotProps.control 管输入外壳，slotProps.input 管真实输入元素，其他公开节点可含 label/help/error/clearButton。

公共部分建议内部组合为 FieldFrame：负责 label、required 标记、help/error、控件 ID、aria-describedby/aria-invalid、间距和尺寸上下文。Input、Select、NumberInput、DatePicker 都复用它，各自保留真实控件及行为。它不是所有组件都必须继承的通用基类。

Svelte 模板优先组合；Props 用 TS extends/Pick/Omit 复用 FieldProps；行为用普通函数或共享模型。仅真正重复的有状态业务模型才考虑类继承，不用 class 继承链模拟 Svelte 组件树。

label/help 可用 string 或 snippet；error 的首个建议是文字消息，复杂消息再用 snippet。建议 error 非空时显示错误并标记 invalid，普通 help 的展示/保留空间要统一。校验执行不塞进每个 Input，验证工具产出的 errors 可以直接绑定。

```svelte
<Select
  label="负责人"
  help="选择负责本项目的用户"
  error={errors.owner}
  bind:value={form.ownerId}
  options={users}
/>
<NumberInput label="预算" error={errors.budget} bind:value={form.budget} />
```

这两种控件的 label/error 实现来自同一个 FieldFrame，而不是复制 Input。首个 Input 应明确支持的文本输入类型；number/checkbox/file 不通过一个巨型 type 分支混入文本 Input。

## 4. Lucide 与内容

```svelte
<script lang="ts">
  import { Save, ArrowRight } from '@lucide/svelte';
</script>

<Button icon={Save}>保存</Button>
<Button icon={ArrowRight} iconPosition="end">下一步</Button>
```

icon 接收 LucideIcon，尺寸随 size，颜色继承 currentColor；特殊属性用 slotProps.icon。内部图标也使用 Lucide，不再提供字符串注册表。复杂金额单位、徽标等内容用 leading/trailing snippet，同位置 snippet 优先。纯图标按钮要有 aria-label，装饰图标不重复朗读。

## 5. Button：已确认 color + variant + size

核对的成熟接口：MUI 使用 color/variant/size；Ant Design 支持 color + variant，type 只是组合快捷方式且存在优先级；Chakra 使用 colorPalette 与 variant。吸收“语义颜色、表现方式、尺寸、行为状态分开”，不照搬 recipe 系统、React 状态或多个重复快捷入口。

字段组合已确认；具体颜色/变体取值、默认值和行为细节仍按下表讨论：

```svelte
<Button color="primary" variant="solid" size="md" icon={Save}>保存</Button>
<Button color="danger" variant="outline">删除</Button>
<Button color="success" variant="soft">已完成</Button>
<Button color="neutral" variant="text">取消</Button>
<Button color="primary" variant="link">查看详情</Button>
```

| 维度              | 建议                                        | 含义                                                 |
| ----------------- | ------------------------------------------- | ---------------------------------------------------- |
| color             | neutral/primary/success/warning/danger/info | 业务语义；六种不是大小档位，不强凑五个               |
| variant           | solid/soft/outline/text/link                | 实色/柔和底/描边/文字按钮/链接外观；每个都可搭配颜色 |
| size              | xs/sm/md/lg/xl，默认 md                     | 控件高、字号、图标、间距的协同映射                   |
| radius            | none/xs/sm/md/lg/xl/full                    | 外形；不与 size 混为同一个枚举                       |
| block             | boolean                                     | 占满可用行宽；不使用 size="full" 混淆高度和宽度      |
| loading、disabled | boolean                                     | 独立行为状态，不充当颜色或 variant                   |
| type              | button/submit/reset                         | 原生含义，默认 button；不新增 htmlType 别名          |

建议默认 neutral + solid + md；正常 hover/active/focus-visible/disabled/loading 由内部状态规则组合，不提供 defaultPressed/hovered 等成组状态参数。link 仅表示外观，不偷偷改变 button 语义；真实导航组件是否独立在后续决定。

color 相比前稿 tone 更接近成熟库，但不要同时保留 color/tone/type 三个表达相同语义的入口。当前配色已有主色和反馈色实色配对；更多 soft/hover 角色需明确派生还是新增 Token，不机械批量扩展颜色键。

参考：[MUI Button](https://mui.com/material-ui/react-button/)、[Ant Design Button](https://ant.design/components/button)、[Chakra Button](https://chakra-ui.com/docs/components/button)。这只是方案依据，ZUI API 尚未实现。

## 6. Select：选中以后，变量里装什么？

两种做法的下拉框看起来一样。假设 users 有两个人：

```ts
const users = [
  { id: 1, name: '张三', email: 'zhang@example.com' },
  { id: 2, name: '李四', email: 'li@example.com' },
];
```

选中李四以后，区别只有业务变量中的内容：

| 选择         | 变量内容                                                 | 适合                                 |
| ------------ | -------------------------------------------------------- | ------------------------------------ |
| 只保存编号   | owner = 2                                                | 提交负责人编号给接口，选项由列表提供 |
| 保存整条数据 | owner = { id: 2, name: '李四', email: 'li@example.com' } | 选择后马上读/编辑邮箱等完整字段      |

两种都可双向绑定，也都可以在普通函数中直接修改；不是一种能响应另一种不能响应。

### 成熟库实际如何处理

- Naive UI：value 主要是 string/number/null 或数组；on-update:value 同时提供 value 和 option。因此“绑定编号”不妨碍在一次操作中拿到整条选项。
- Ant Design：默认返回选项 value。labelInValue 返回 { value, label }，只是多带显示文字，不等于完整的用户对象；其他字段不能据此假定都在绑定值里。
- Element Plus：el-option 的 value 可以给 user.id，也可以给 user。绑定对象时用 value-key 指定唯一键，避免同名数据或重新加载对象造成身份问题。

依据：[Naive UI Select](https://github.com/tusen-ai/naive-ui/blob/main/src/select/demos/enUS/index.demo-entry.md)、[Ant Design Select](https://ant.design/components/select)、[Element Plus Select](https://element-plus.org/en-US/component/select)。只借鉴选中值与身份的分离，不搬它们的受控状态规则或框架写法。

### ZUI 的建议写法（尚未拍板）

只保存编号：

```svelte
<Select
  label="负责人"
  options={users}
  getValue={(user) => user.id}
  getLabel={(user) => user.name}
  bind:value={form.ownerId}
/>
<!-- 选中李四后：form.ownerId === 2 -->
```

保存整条数据：

```svelte
<Select
  label="负责人"
  options={users}
  valueMode="item"
  getKey={(user) => user.id}
  getLabel={(user) => user.name}
  bind:value={form.owner}
/>
<!-- 选中李四后：form.owner.email === 'li@example.com' -->
```

valueMode="item" 只是候选拼写；用户应先决定更常需要哪个结果，再决定是否以该参数明确选择。建议多数表单默认保存编号，需要完整对象时再明确启用；不自动根据初始值猜模式，因为初始值常常为空。

只想保存编号、偶尔需要对象时，不必改为对象绑定：可以由 users 派生当前对象，或在可选变更通知中拿 option。不要因此再增加一份独立可写的 selectedItem，让 value 和 selectedItem 互相竞争。

### 仅有两件边界值得现在说明

1. 列表重新请求后，ID 相同仍是同一个人。对象模式也必须按 getKey 匹配，而不是依赖对象引用相同。ID 模式可使用新列表的名称；对象模式不应在后台刷新时偷偷覆盖正在编辑的 form.owner。
2. 保存整条对象时，持有同一响应式对象的其他地方也会看到字段修改。需要“取消编辑”时，业务显式创建草稿；Select 不自动深克隆所有对象，也不负责实体缓存归并。

远程分页暂时缺少选中项时，两种模式都不擅自清空模型；显示已缓存标签或明确占位，标签解析接口到远程搜索设计时再定。多选分别是 ID[] 或对象[]。

### 清空值仍待确认

建议文本 Input 清空为 ''，Checkbox 为 false，单选 Select 为 null，多选为 []。undefined 可表示初始未提供，不在挂载时自动改写；0/空字符串若是合法 ID，不得用 falsy 判断清除。NumberInput、日期控件的空值也要统一说明。

## 7. 五档是尺度原则，不是所有参数都必须五个

已落地的 UI 预设在 svelte/src/theme.ts，见 [主题尺度与迁移](../svelte/README.md#主题尺度与迁移)。core 只保留通用引擎及空基础主题。

- spacing、duration、shadow：五档 + none。
- radius：五档 + none + full。
- fontSize、breakpoint：五档，不提供无意义的 none/full。
- size：control 与 icon 两组五档，另有 none/full；control/icon 作为默认角色引用。
- borderWidth：五档 + none，thin/focus 是角色引用。
- opacity：五档 + none/full，disabled 是角色引用；opacity=0 不等于禁用或从布局移除。
- lineHeight、letterSpacing：五档，保留 normal/tight 等合理角色。
- fontWeight 保留 light/normal/medium/semibold/bold；fontFamily/easing/color/zIndex 以语义职责为主。

组件 size=md 表示中等规模，不表示所有属性都取自己的 md：字号、行高、控件高要协调。size.full 的 CSS 值为 100%，不等于所有组件都有 size="full"。Dialog 可另有五档内容宽度及明确 fullscreen 行为；不能把按钮高度与弹窗宽度共用同一数列。

## 8. 组合、样式和接入

class/style 控制根，slotProps 转发少量公开节点；重复项支持普通回调，内容使用 snippet。class 不以字符串顺序决定覆盖；建议库样式层 zui.components 与应用层 zui.app，但必须统一自动 runtime/显式 runtime/SSR 的配置后再实施，不只在单个 Button 中硬写 layer。

普通可覆盖属性按默认值后应用用户值；内部/用户 class 都保留，style 保留原生字符串能力，不用按分号拆分的自制解析器。value/checked/disabled 与关键 id/role/ARIA 关系由主 Props 和控件语义维护，slotProps 不再成为另一份状态来源。事件逐项声明顺序与 defaultPrevented：可取消交互可以阻止默认动作，不能取消必要的资源清理。节点类型来自 svelte/elements 或子组件 Props，未知 slot key 应报类型错误。

Dialog 采用完整组件，提供 title/children/footer 与 slotProps；不要求用户每次拼 Root/Overlay/Content。内部 Portal、焦点、关闭行为可由小型共享工具负责，不新增万能组件工厂。

共享 FieldFrame、Overlay 行为、Lucide 渲染是有意义的复用；core 不认识 label、error、option 或 Button variant。普通 TS 映射和组件组合优先，避免从五档需求推导出一套通用 recipe DSL。

## 9. 集中默认配置：已确认方向，入口暂名 ConfigProvider

```svelte
<ConfigProvider size="md" radius="sm" locale={zhCN}>
  <Input label="名称" bind:value={form.name} />
  <Button>继承默认尺寸</Button>
  <Button size="lg">局部大按钮</Button>
  <ConfigProvider size="sm">
    <Input label="紧凑区域" bind:value={form.code} />
  </ConfigProvider>
</ConfigProvider>
```

优先级建议：组件显式 prop > 最近 Provider 对应字段 > 上级 Provider > 库默认值。内层只改 size 时，radius/locale 仍实时继承；undefined 表示继承，none 是实际圆角值，不能混淆。配置可来自 $state，业务直接修改它就能更新继承者。

Provider 默认只提供逻辑上下文，不为配置新增布局 DOM；即使不写 Provider，组件也可使用库默认值。locale 负责清空/关闭/暂无数据等库内文字，业务 label/help 仍由应用提供；不另造完整 i18n 框架。dir、日期/数字格式及组件专属默认值的范围后续细化。

主题仍由 ThemeScope 和已有 StyleProvider 输出 CSS 变量，ConfigProvider 不再增加 themeOverrides/colorMode 等平行状态。若以后提供一个更短的组合入口，也只组合已有能力，不产生第二个主题控制器。

这套全局默认值不能改变业务模型，例如切换 locale 不重写 value，改 size 不清空选中项。SSR 每个应用/请求有自己的配置，不能使用共享可变模块单例。

## 10. 统一浮层管理：已确认方向，规则建议

统一处理 Dialog/Drawer/Popover/Select 等的父子归属、挂载、焦点、关闭与资源清理。它与 CSS @layer 是两回事，也不等于给每个组件分配一个固定 z-index。

```text
应用
└─ Dialog
   └─ Select 下拉框
      └─ 子菜单或提示
```

| 操作/责任                      | 默认建议                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| Select 在 Dialog 中展开        | 注册为 Dialog 子层，挂到所属弹窗的浮层容器，不盲目丢到 body                        |
| Escape                         | 先关最上面的可关闭层；关 Select 后再按一次才关 Dialog；IME 组合输入中不抢 Escape   |
| 点击 Dialog 内容但在 Select 外 | 关闭 Select，Dialog 保持                                                           |
| 点击 Select 的 Portal 内容     | 仍算 Dialog 内部交互，不能误触发父层 outside                                       |
| 明确点击 Dialog 遮罩           | 只有允许遮罩关闭时才关 Dialog，同时释放其子层；同一事件不重复派发多次关闭          |
| 焦点范围                       | 模态 Dialog 的焦点范围包含注册的子浮层，不把 Select 的焦点拉走                     |
| 恢复焦点                       | 关 Select 回触发点；关 Dialog 回原入口；入口已移除或已打开新模态层时不能强行抢焦点 |
| 滚动锁与背景不可交互           | 按实际模态层持有数量管理，关内层不能提前解锁外层                                   |
| 退出动画                       | 关闭请求与物理移除分开处理，避免穿透点击、提前放开焦点或泄漏资源                   |
| 主题/配置                      | Portal 保留逻辑配置，并显式继承/绑定同一 ThemeScope；不能因为 DOM 搬家丢主题变量   |
| CSP/SSR                        | 定位和滚动补偿沿用已有样式通道；SSR 不碰 document，不产生跨请求可变层列表          |

层管理是 svelte 内部的小型服务，先不做公开的万能 LayerManager 类。组件自己处理业务状态，管理器负责栈、归属与清理。多应用根在同一 Document 时要协调焦点和模态锁；ShadowRoot 的宿主与样式目标要明确。若使用原生顶层弹窗能力，挂载策略必须随之验证，不能假设调高 z-index 就够了。

## 下一轮更值得确定的细节

1. Select 选中后，业务最常想拿“编号”还是“整条数据”？是否保留第二种作为显式选项？
2. 清空是否统一单值 null、多值 []；数字输入的空值和精度另定。
3. FieldFrame 默认纵向标签是否合适；错误出现时是否预留消息空间，支持几条错误。
4. loading 默认是否阻止重复提交，是否支持直接传 Promise；建议先显式 boolean，异步任务由业务持有。
5. Dialog 默认点击遮罩能否关闭，关闭后是否保留表单状态；不让关闭行为隐式等于重置。
6. Select 的本地搜索与远程搜索由谁发请求，如何处理取消/乱序和缺失标签；建议组件先发意图，业务或明确适配器管理数据请求。

参考基础能力：[Svelte 双向绑定](https://svelte.dev/docs/svelte/$bindable)、[Snippets](https://svelte.dev/docs/svelte/snippet)、[LucideIcon](https://lucide.dev/guide/svelte/advanced/typescript)。
