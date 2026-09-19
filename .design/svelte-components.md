# Svelte 组件 API 讨论稿

状态：讨论中，尚未实施业务组件。已确认原则：用户优先双向绑定和方便，拿到同一响应式模型的地方都可直接修改，不套用严格受控/不可变更新的传统限制。下文其余名字、默认值和组件形态是建议，等待讨论后再落库。

## 1. 使用形态：直接组件 + 双向绑定 + 普通对象

```svelte
<script lang="ts">
  import { Button, Input, Checkbox, Dialog } from '@zui/svelte';
  const form = $state({ name: '', enabled: true, editing: false });

  function reset() {
    form.name = '';
    form.enabled = true;
  }
</script>

<Input bind:value={form.name} placeholder="名称" />
<Checkbox bind:checked={form.enabled}>启用</Checkbox>
<Button onclick={() => (form.editing = true)}>编辑</Button>
<Dialog bind:open={form.editing} title="编辑资料">
  <Input bind:value={form.name} />
  <Button onclick={reset}>重置</Button>
</Dialog>
```

所有位置读写同一个模型，父组件、嵌套表单、弹窗和普通函数的修改都可反映到控件。控件用 $bindable 声明 value/checked/open 等少量实际可写状态；不要求写 setter、dispatch、reducer 或每次克隆对象。事件用于业务副作用，不是同步数据的必经路径。

可复用模型放 .svelte.ts：

```ts
export function createForm() {
  return $state({ name: '', enabled: true, editing: false });
}
```

一个页面或 SSR 请求创建一次，再通过 props/context 共享同一引用；不将可变表单对象做成跨请求模块单例。普通非响应式 JS 对象不会因为传给组件自动获得跨任意位置的响应能力，文档应明确使用 $state 或既有响应式模型。

建议不增加 React 式 value/defaultValue 双模式、modelValue、valueStore 等平行状态通道；原生 defaultValue/defaultChecked 的 form.reset 语义仍保留，不能混为一谈。允许业务模型字段暂未填写：建议组件把 undefined 显示为空/未勾选/关闭，而不是要求每个表单都手动铺满初值，也不在挂载时偷偷回写模型。实现时允许 undefined 的绑定不能使用非 undefined 的 $bindable fallback，避免 Svelte 的回退值歧义；数字和选择组件的空值另有明确类型合同。

普通 value prop 遵循 Svelte 本身行为，不额外承诺 React 式“父级未更新就拒绝改变”。列表模型可以直接 push/splice 或修改子项，组件实现不能依赖用户必须更换数组引用；是否共用对象身份由具体数据组件说明。

暂不做万能 FormModel。基础控件先支持 bind:value={form.field}，表单校验/提交另按真实需求接入；不能为便利模型先造第二套响应式框架。

## 2. 公共表面尽量小

建议用命名导出 Button/Input/Select/Dialog，不默认加 Z 前缀；冲突时 import { Button as ZButton } 即可。每个组件明确主状态，通常只需 value、checked、open、selected 其中之一；不机械让每个内部状态都变成公开 prop。

| 需求         | 推荐入口                                      | 暂不增加的平行入口                          |
| ------------ | --------------------------------------------- | ------------------------------------------- |
| 行为/语义    | 明确 Props 和原生属性                         | 通用 options/config 大对象                  |
| 数据同步     | bind:value / checked / open                   | 统一 setter、受控镜像状态                   |
| 内容         | children 和少量具名 snippet                   | label/text/renderX/slot 四套别名            |
| 根样式       | class、style                                  | sx、css、styles、rootClass 同时存在         |
| 内部公开节点 | slotProps                                     | 每个节点单独的 inputProps/popupProps 等别名 |
| 状态事件     | 原生 onclick/oninput/onchange；必要的语义回调 | 自动把所有事件包装成 CustomEvent/detail     |

组件的默认值集中于 Props 解构或一个就近的常量，不引入全局默认值注册机制。不要为了统一外观给所有组件强加 tone/variant/size。

## 3. 内容使用 Svelte snippet

```svelte
<Button loading={saving} onclick={save}>
  {#snippet leading()}<SaveIcon />{/snippet}
  保存
</Button>

<Dialog bind:open={form.editing} title="编辑资料">
  <Input bind:value={form.name} />
  {#snippet footer()}
    <Button onclick={() => (form.editing = false)}>关闭</Button>
  {/snippet}
</Dialog>
```

建议标题等简单内容接收 string 或 Snippet，正文始终 children。图标入口接收 snippet，不绑具体图标包、不混合组件构造器/字符串名字/渲染函数三种类型。优先 leading/trailing 表示位置，避免 icon prop 隐含布局及 loading 状态。

重复项 snippet 接收一个有类型的上下文对象，如 { item, index, selected, disabled }。组件保留 option/row 的语义壳和键盘行为，snippet 默认替换内容；不轻易开放整个交互节点替换，避免用户承担焦点、ARIA 与测量合同。

Dialog 先采用 bind:open + title/body/footer 的完整组件；不要求每次写 Root/Trigger/Portal/Overlay/Content 多层结构。Tabs、复杂布局等确实需要组合时再讨论少量子组件，不把复合组件风格强加给全库。

## 4. 原生属性透传：先固定目标

Button 真实根是 button，继承 HTMLButtonAttributes；默认 type="button"，submit/reset 显式指定。class/style、ARIA、data 属性和原生事件透传，loading 与 disabled 的交互要有明确合同。

输入组件需要先选一种形态，不能暗中改变根元素：

- 推荐简单 Input 以原生 input 为根；Field 管 label/help/error 关联，需要前后装饰时再加 InputGroup。原生 id/name/autocomplete/events 的目标没有歧义。
- 若更看重单标签完成清空、前后缀，可选一体 Input，根始终是容器，顶层 class/style 作用于容器，输入原生属性作用于内层 input，slotProps.input 修改内层。需要额外说明两个目标，不能让有无前缀决定 DOM 根。

两者都是有样式完整组件，不引入无样式依赖。初步倾向前者，但这项未确认；若常用场景导致过多模板，可选择后一种。

原生属性与库 Props 的名称冲突要显式处理，例如 input 的 size 本来表示字符宽度。建议视觉尺寸使用 size，但在 Input 类型中 Omit 原生 size；若确有原生字符宽需求，提供单独且有说明的 nativeSize，而非悄悄改变类型。

## 5. class、slotProps 与覆盖

```svelte
<Select
  bind:value={form.role}
  options={roles}
  class={css((s) => {
    s.width.px(240);
  })}
  slotProps={{
    input: { 'aria-label': '角色' },
    popup: { class: popupClass, style: 'max-height: 320px' },
    option: ({ item, selected }) => ({
      title: item.label,
      class: optionClass(selected),
    }),
  }}
/>
```

slotProps 是属性转发合同，不是命名样式部位系统。只公开真正需要定制的节点；普通节点使用对象，重复节点支持接收公开状态的函数。子组件节点用其 Props 推导，DOM 节点用 svelte/elements 类型；未知键报错。不公开内部缓存或无限扩展的 state 对象。

| 内容                                     | 约定建议                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| 普通展示属性                             | 用户值覆盖默认值                                                                            |
| class                                    | 内部和用户 class 都保留；不以字符串顺序实现覆盖                                             |
| style                                    | 保留原生字符串；作者 style 不覆盖受管变量保留域，不用分号 split 解析 CSS                    |
| 行为事件                                 | 逐事件声明顺序及 defaultPrevented；选择动作通常用户事件在前，可取消动作，必要清理不能被取消 |
| id/role/ARIA 关系/value/checked/disabled | 由主 Props/组件语义维护，不允许 slotProps 悄悄破坏；类型省略、运行时显式最后写入            |
| Portal 定位和测量属性                    | 明确保留控制字段，常规尺寸/样式走公开定制点                                                 |
| 元素引用                                 | 优先少量明确方法，复杂时用 Svelte attachment 透传；不公开整棵 DOM 引用对象                  |

CSS 覆盖还需要一个明确的接入决定：建议库样式放 zui.components，应用样式放 zui.app，采用现有 core layers。当前 runtime 默认没有这些层；实施时必须同时补齐普通 Svelte 自动 runtime、显式 runtime 与 SSR 的默认配置/诊断，不能只给 Button 指定层后让默认应用报错，也不能承诺 class 写在后面就覆盖。

组件边界目前采用完整规则回退，转发 class 仍能动态更新，但不保证跨组件自动变量提升。这是已有编译合同，不向用户暴露私有绑定句柄来换性能。

## 6. 变体与主题

建议 Button 的语义用 tone（先 neutral/primary/danger），视觉用 variant（先 solid/outline/soft/text），尺寸用 size（small/medium/large）。避免 primary/danger/ghost/text 多个布尔值相互冲突；这些枚举未确认，不为追求统一给每个组件都加全套。

组件内部直接使用既有语义 Token 和普通 TS 样式函数。先不新增 buttonTheme、useTheme、recipe、extendComponent 等公开系统；真实重复出现后再决定是否提炼。主题仍由 core + StyleProvider 管理。

从 lightTheme/darkTheme 扩展即可复用系统组件。完全自有 baseTheme schema 需要满足组件实际消费的 Token 合同，缺失要明确诊断，不能偷偷补亮色。长期如需品牌语义映射，先设计明确类型合同，不把主题泛型强塞到每个 Button 的使用处。

## 7. 数据组件与事件

Select 建议简单项采用 { value, label, disabled? }，复杂业务对象再增加 getValue/getLabel 普通函数；默认用稳定的 string/number key 作为选中值，避免远程重载对象后引用比较失效。若业务更需要直接绑定对象，可明确提供对象模式，但不在首个实现里同时塞多种互斥模式。

多选、树选、表格编辑等也遵循直接绑定模型的方向。组件不能私自深克隆传入业务对象；但临时搜索词、聚焦索引、测量缓存不等于业务模型，不默认暴露为一大份可写内部 state。

原生事件保持原生 Event 和 Svelte 的绑定顺序，不暗中重排；原生 oninput 触发时不能保证 bind 已写回。若需要变更原因，可对特定组件提供 onValueChange(value, { reason, event? }) / onOpenChange；它们是可选通知，不是控制数据的唯一渠道。只对用户操作发语义事件，外部直接赋值不反向产生重复事件。语义通知在内部绑定写入后触发，不能撤销已经发生的写入，需要阻止操作时用明确可取消的交互事件。

## 8. 内部实现与验收

简单组件一份 .svelte，Props 靠近实现，用 HTMLAttributes/ComponentProps/Snippet 复用已有类型；复杂组件超过合理规模再拆同名目录。最初只增加真实需要的入口，不提前建 basic/input/data 等空分类。

可以有极小的内部 slot 属性解析/事件组合函数，但不能生成全部 DOM 或藏住状态迁移。重复内容先用 snippet；参数和样式先用 TS 函数。专项依赖按定位/焦点/日期等具体职责选择，不导入组件框架。

建议首批依次验证 Button、Input/Field、Dialog、Select，四类足以检验原生透传、双向数据、snippets、slotProps、浮层与主题覆盖。键盘、焦点、表单 reset/name/disabled、IME、SSR/CSP、跨浏览器与资源回收进入各组件验收，不以 API 看起来短代替行为正确。

## 待讨论的三项

1. Input 保持原生根 + Field/InputGroup 组合，还是一体化容器 Input？
2. Button 的 tone/variant 是否采用上述分离方式，或改成一个较小的 appearance 枚举？
3. slotProps 重复项用对象/函数，内容用 snippet，先不开放任意交互节点替换，是否足够？

官方依据：[双向绑定](https://svelte.dev/docs/svelte/$bindable)、[Props 与原生属性](https://svelte.dev/docs/svelte/$props)、[Snippets](https://svelte.dev/docs/svelte/snippet)、[包装组件类型](https://svelte.dev/docs/svelte/typescript)、[ClassValue](https://svelte.dev/docs/svelte/class)。这些只证明 Svelte 基础能力，本文组件名字与约定仍是 ZUI 的讨论方案。
