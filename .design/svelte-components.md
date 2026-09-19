# Svelte 组件与主题合同讨论

已确认：共享响应式模型可直接修改；Lucide 组件直传；一体 Input 包含 label/help/error；Dialog 为完整组件；五档使用 xs/sm/md/lg/xl；标准 CSS 与通用主题引擎留 core，UI 预设与默认主题 css 在 svelte。业务组件尚未实施，本文明确区分已经确认的边界与后续建议。

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

## 5. Button：参考成熟库后建议采用正交组合

核对的成熟接口：MUI 使用 color/variant/size；Ant Design 支持 color + variant，type 只是组合快捷方式且存在优先级；Chakra 使用 colorPalette 与 variant。吸收“语义颜色、表现方式、尺寸、行为状态分开”，不照搬 recipe 系统、React 状态或多个重复快捷入口。

建议 ZUI 统一为以下形态，仍待确认字段名与取值：

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

## 6. Select：ID 与对象是业务值选择，不是响应式能力选择

### 默认 ID 模式的建议

```svelte
<Select
  label="负责人"
  options={users}
  getValue={(user) => user.id}
  getLabel={(user) => user.name}
  bind:value={form.ownerId}
/>
```

form.ownerId 只保存稳定 ID，form.ownerId = 2 立即改变选择。表单提交天然只含 ID；options 换成新的对象数组时仍按 ID 匹配，不需要原对象身份。删除、权限或远程查询使选项暂时不可见时，不能擅自清空 ID；显示占位/缓存标签的策略应明确。

需要完整对象时可以派生，而非维护第二份可写选中状态：

```ts
const owner = $derived(users.find((user) => user.id === form.ownerId));
```

远程分页不能仅依赖当前页 find，应由业务提供已选项/查询缓存，组件后续可提供按 ID 解析标签的明确接口。不要把临时搜索结果缺项误判为模型失效。

### 显式对象模式的建议

```svelte
<Select
  label="负责人"
  options={users}
  valueMode="item"
  getKey={(user) => user.id}
  getLabel={(user) => user.name}
  bind:value={form.owner}
/>
```

form.owner 是对象，拿到同一响应式对象的地方可直接修改其字段；组件不主动深克隆。getKey 仍是必须明确的身份规则，不能用引用相等判断 API 重载后的选中状态。

对象模式建议把传入模型作为显示真相：options 重载时按 key 保持选中，但不偷偷换掉 form.owner；用户重新选择才写入当次项目。后台数据更新如何合并进已有实体，由业务数据层决定。ID 模式通常显示最新 options 中的标签；对象模式可显示正在编辑的对象字段，这个差异不能隐藏。

对象共享与“取消编辑”是不同语义。需要取消时，业务显式创建草稿，例如 structuredClone($state.snapshot(form.owner))；组件不默认克隆所有对象，也不替业务维护事务。

### 场景选择与空值

| 场景                                           | 更合适的主值    |
| ---------------------------------------------- | --------------- |
| 后台表单提交外键、远程分页选人、URL/缓存持久化 | ID              |
| 本地数据编辑器，选择后直接编辑完整记录         | 对象            |
| 多选外键                                       | ID[]            |
| 多选共享记录                                   | 对象[] + getKey |

建议 ID 为默认，对象模式明确启用；两种模式都双向、都允许业务直接赋值。不要再加一个与 value 并列且可任意写入的 selectedItem，造成两份真相。

清空建议：文本 Input 写空字符串，Checkbox 写 false，单选 Select 写 null，多选写 []；undefined 可作为初始未提供状态，不在挂载时自动改成 null。0 和空字符串若是合法 ID 不得按 falsy 清除。null 是否作为统一空值仍待用户确认；NumberInput/日期也需相同层面的约定。

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

## 下一轮建议讨论

1. 是否采纳 Button 的 color + 五种 variant，而不保留 tone 或外观 type 别名？
2. 是否采用 Select 默认 ID、显式对象模式，以及单选 null/多选 [] 的清空合同？
3. 字段默认纵向 label + control + message，是否需要统一支持横向标签与固定消息空间？
4. 是否由组件库提供一次性应用默认配置（size、radius、locale、disabled），主题仍独立用 ThemeScope？避免第二套主题 controller。
5. 浮层在 Dialog 内的挂载/层级/焦点是否采用统一管理；仅写死五个 z-index 无法解决嵌套层叠上下文。
6. 后续加入组件主题角色时，优先少量稳定语义还是颜色派生；不在 core 加回 UI Token。

参考基础能力：[Svelte 双向绑定](https://svelte.dev/docs/svelte/$bindable)、[Snippets](https://svelte.dev/docs/svelte/snippet)、[LucideIcon](https://lucide.dev/guide/svelte/advanced/typescript)。
