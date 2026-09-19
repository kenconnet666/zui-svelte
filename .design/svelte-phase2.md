# 第二阶段：基础组件与组合消费

状态：供用户审阅，尚未开始实现。第一阶段交付见 [基础设施台账](svelte-phase1.md)，公共 API 的既有决定仍以 [组件合同](svelte-components.md) 为准。本文只确定实现批次、实际作者形态与验收样例，不再增加第二套组件 DSL。

## 目标与实施顺序

把第一阶段的内部能力用于真实组件，检验写法是否足够直接。每批都有普通 Vite Docs 和独立 Kit 消费示例；不把基础设施探针改名后当成视觉成品，不扩展到 Table、Tree、DatePicker、Upload。

| 批次  | 交付                                | 复用与重点                                                                                                                                            |
| ----- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2-01 | Icon、Spinner、Button、ButtonGroup  | Lucide 直接传组件；Button 的 color/variant/size 五档及 radius；原生 type/form/disabled；组只负责布局与默认值，不变成选择组                            |
| P2-02 | Field、Form、Input、Textarea        | FieldScope/FormController；标签与错误分离、唯一模型、原生事件/IME、Zod 输入输出、reset、服务端错误、描述 ID；先完成一个真实注册表单                   |
| P2-03 | NumberInput、DecimalInput、Checkbox | 数值草稿与有效模型分离、undefined 清空、步长/精度/locale、原生 name/FormData；Checkbox 为多选和布尔字段提供基础，不额外复制校验引擎                   |
| P2-04 | Dialog、Select、Autocomplete        | 用 Dialog 内 Select 验证层/焦点/Portal/退出；对象选择与自由文本分别建模，复用集合、请求、虚拟化；依赖前面 Button/Input/Checkbox，而非复制其样式和行为 |

共 14 个组件，分四个可验收批次。Dialog 是完整组件；Select 内部定位内容不必先公开另一个 Popover 组件。Radio/Switch、Tooltip/Popover/Drawer、Tabs、Card 等后续组件按真实复用需要进入下一阶段；不为凑目录或组件数量一并实现。

## 作者代码保持直接

组件共享样式只有确实被多处使用时才提取。单个 Button 的颜色分支、大小判断留在模板 `class={componentCss(...)}`；不要求 buttonClass、getComponentDefaults、ControlAppearance、工厂函数或 BaseComponent。

```svelte
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Size, Radius, Color } from '../types.js';

  // 示意作者的声明形态；视觉分支与子组件将在 P2-01 完整实现。
  let {
    color = 'neutral',
    variant = 'solid',
    size = 'md',
    radius = 'md',
    block = false,
    loading = false,
    disabled = false,
    type = 'button',
    class: className,
    children,
    ...rest
  }: Omit<HTMLButtonAttributes, 'color'> & {
    color?: Color;
    variant?: 'solid' | 'soft' | 'outline' | 'text' | 'link';
    size?: Size;
    radius?: Radius;
    block?: boolean;
    loading?: boolean;
  } = $props();
</script>
```

集中清单只登记 `Button` 的实际源码路径和 `color/variant/size/radius/block` 五个允许配置的键。默认值和类型只存在于上述作者声明；编译器注入 getter 继承，构建脚本生成 ComponentDefaults。loading/disabled/value/open/事件不进入默认配置。未登记的业务组件保持原生 Svelte 语义。

完整实现补入 icon 和 slotProps 类型时，直接使用 `ComponentProps<typeof Icon>`、`ComponentProps<typeof Spinner>` 和 HTMLAttributes 组合。只有多个真实组件重复使用的联合类型才抽取；不预建通用 Props 巨型交叉类型。

## 消费形态与组合边界

以下为拟实施 API，当前版本尚未导出这些视觉组件。

```svelte
<Button color="primary" variant="solid" size="md" icon={Save} loading={saving}>保存</Button>

<Field name="name" label="姓名" help="用于页面展示">
  <Input bind:value={model.name} autocomplete="name" slotProps={{ input: { class: inputClass } }} />
</Field>

<Field name="amount" label="金额">
  <DecimalInput bind:value={model.amount} scale={2} step="0.01" />
</Field>

<Dialog
  bind:open={editing}
  title="编辑资料"
  slotProps={{ closeButton: { size: 'sm', slotProps: { icon: { strokeWidth: 1.5 } } } }}
>
  <Field name="owner" label="负责人">
    <Select options={users} bind:value={model.owner} getLabel={(user) => user.name} />
  </Field>
</Dialog>
```

`model.owner` 是整条对象；同 id 的新 options 不改写它，也不悄悄改变其选中显示。普通 TS 显式赋新对象就能同步业务数据。Autocomplete 的 value 则是文本，选建议项通过单独通知交给业务；两者不共享混合的 value 联合模型。

公共根的 class/style 只控制明确的根元素：Button 原生 button、Input 的控件容器、Dialog 的可见内容面板。Input 的 id/name/autocomplete/输入事件进真实 input；容器定制通过 root，输入元素附加参数通过 slotProps.input。Field 不包办 Input 的所有属性转发。

Dialog.closeButton 使用实际 Button Props，保留它自己的 slotProps.icon/spinner 等，不复制一份 CloseButtonProps。安全必需的 type/aria 及内部事件顺序由 Dialog 显式设置；不能让一次 close 点击经自动事件合并重复执行。native event 可取消时，先调用使用者回调再判断 defaultPrevented。

## 主题与配置

- ThemeScope 继续承担亮暗与用户主题，ConfigProvider 只承担默认值/locale/dir/组件定制，不把两个上下文合并为全局单例。
- 视觉规则按 `componentCss → defaultsCss → css` 的 UI 层序覆盖。Provider 可配置某组件的 class/style/slotProps；不另造 theme.components 样式对象 DSL、sx 或命名部位运行时。
- 默认 md；size 对应控件高/字号/间距的协调组合，并不要求每个属性都读自己的 md。Dialog.size 是面板宽度，不转发给关闭按钮。
- radius 支持五档与 none/full。只有适合的维度提供端点，不为所有 Props 机械增加 none/full。
- 品牌色/状态色先复用现有语义 Token。若 soft/outline 的亮暗对比实测不足，再增加有明确职责的配对 Token；不预先生成所有颜色 × variant × 状态 × 部位的庞大主题表。

## 每批完成条件

1. 作者 `.svelte` 只有必要 props、状态、共享设施接入和模板；审查是否出现可以删掉的镜像状态/重复类型/层层转发函数。
2. DOM 正确：表单 form/name/disabled/reset、原生按钮键盘、标签和描述关系、复合字段唯一 ID；业务模型修改立即反映，输入编辑不丢光标或草稿。
3. 定制正确：公共 root class/style、两层以上 slotProps、Symbol attachments、Provider 更新和事件只调用一次；自定义包装使用 ComponentProps 即可扩展。
4. 组合正确：Dialog 内搜索 Select、异步失序/失败/重试、同 key 对象保留、多选 FormData、虚拟列表活动项、连续退出/重新打开、卸载期间请求和动画停止。
5. 消费正确：SSR 首屏/接管、严格 CSP、亮暗/RTL/高对比/减少动态效果、axe 与键盘；包外生成声明能推导值和 snippet 参数。三浏览器和完整仓库验证交 CI。
6. 交付正确：每批中文提交推送，下次推送前查上一轮 CI；文档演示从包入口消费，安装产物不带测试代码。只用 Button 的 bundle 应排除定位/虚拟化/完整表单依赖，新增具体组件后再固定其体积基线。

真实读屏（NVDA/VoiceOver）、触屏软键盘和移动 Safari 滚动锁作为发布前设备验收，记录实际设备与结果。当前桌面模拟不能替代它们，未执行不标为通过。

## 审阅时重点看什么

推荐维持上述四批顺序。P2-01 交付时先审查完整 Button/包装 Button 作者代码；若配置编译或 slotProps 合并使源代码反而更难维护，及时收敛生成边界，不再叠一层抽象。

第二阶段无须再选择框架、主题引擎或表单规则库。需要在具体组件落地时给出可运行样例评审的，只剩有实际业务影响的细节，例如 Select 多选呈现、Dialog footer 的 snippet 参数、DecimalInput 超位数在 blur 时舍入还是保留错误；先提供两种真实效果再决定，不用一串抽象 Props 问题让用户猜。
