# Svelte 生产架构、基础设施与组件规划

已确认：共享响应式模型可直接修改；Lucide 组件直传；Field 独立负责 label/help/error，Input/Select 等专注控件本身；Dialog 为完整组件；五档使用 xs/sm/md/lg/xl；标准 CSS 与通用主题引擎留 core，UI 预设与默认主题 css 在 svelte；Button 使用 color + variant + size，Select 默认返回整条选项数据，集中默认配置与统一浮层管理。布局/浮层九个公共组件已经实现，用法以 svelte/README.md 为准；其他组件仍按本文区分已确认方向与后续建议。

作者侧偏好已更新：专用样式直接写在模板，类型按需内联/复用，默认值只写在 $props() 解构；配置接入可由编译器生成。上层复用底层 Props 和嵌套 slotProps，不强制 ControlAppearance 或另一套组件定义语法。第 8 节记录作者约定；其编译/合并基础已经过第一阶段验证。第 16 节是长期组件目录，第二阶段的建议实施范围单独见 svelte-phase2.md，不把全部目录视为已批准发布。

## 1. 包与默认值边界

| @zui/core                                        | @zui/svelte                                |
| ------------------------------------------------ | ------------------------------------------ |
| 标准属性/关键字/单位、生成器、样式 runtime       | lightTheme/darkTheme、五档尺度、语义 Token |
| defineTheme/extendTheme/overrideTheme/ThemeScope | DefaultTokens、带内置主题类型的 css        |
| 空 baseTheme、纯 CSS 的 css、createCss           | Svelte 默认宿主、SSR、Provider、后续组件   |

core 不导入 svelte。core.createRuntime() 默认 baseTheme；Svelte 自动宿主和 renderStyled/createStyleHandle 默认 lightTheme。显式 core runtime 需要传 theme: lightTheme 或自定义主题；显式自定义配置不能静默补 UI 键。自定义主题继续用 core.createCss(theme)，无需全局 TS 模块扩展。

用户已接受执行环境隔离：业务组件/类型/css/主题/z 统一从 @zui/svelte 导入；compiler、server、internal 保留为构建期、Node SSR、生成代码协议子入口。不能为减少 exports 数量而把 Node API 并入浏览器依赖图。解析条件与使用说明见 [Svelte 包入口](../svelte/README.md#导入与运行环境)。

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

<Field label="名称"><Input bind:value={form.name} /></Field>
<Checkbox bind:checked={form.enabled}>启用</Checkbox>
<Dialog bind:open={form.editing} title="编辑资料">
  <Input bind:value={form.name} />
  <Button onclick={reset}>重置</Button>
</Dialog>
```

组件和业务代码持有同一响应式模型即可直接修改，数组也可 push/splice；不强制 setter、reducer、不可变更新或 value/defaultValue 双模式。事件是可选通知，不是同步数据的必经入口。

可复用模型由 .svelte.ts 的普通工厂返回 $state，在页面/请求内创建，再通过 props/context 共享；不创建跨 SSR 请求的可变单例。普通裸 JS 对象不会自动变响应式。

```ts
// form.svelte.ts：先在变量声明中建立状态，再返回共享代理。
export function createForm() {
  const form = $state({ name: '', editing: false });
  return form;
}
```

$state 是编译语法，不能在普通 .ts 中随意调用，也不能直接 return $state(...)。业务拿到 form 后，普通 TS 函数可以直接修改它的字段；这不需要把所有业务文件都改成 runes 文件。

建议允许 undefined 初值，展示为空而不在挂载时回写。内部 $bindable 不为这些字段设置非 undefined fallback。原生 defaultValue/defaultChecked 的 form.reset 合同另行保留。原生事件遵循 Svelte 顺序；可选语义通知在内部写入后发出，外部赋值不伪造用户事件。

## 3. Field 与控件分离，直接集成 Zod

```svelte
<Field label="邮箱" help="用于接收通知" error={errors.email}>
  <Input type="email" icon={Mail} clearable bind:value={form.email} />
</Field>
```

用户已决定保留公开 Field，并把标题、帮助和错误移出 Input。这替代早期一体 Input 方案，不再同时维护两套同义入口。Input 可以独立用在搜索栏/工具栏；需要字段展示时外包 Field。Dialog 等完整交互组件的方向不变。

职责：Field 负责 label/help/error、字段身份、描述/错误 ID、invalid 与表单关联；Input 负责原生输入、图标/清空/密码、IME/光标等编辑行为；Form 负责注册、校验调度、提交与 reset。Field 不持有第二份业务值，也不要求各控件继承通用基类。不同时公开职责相同的 Field 和 FieldFrame。

Field.class/style 控制字段容器，slotProps.label/help/error 定制展示；Input.class/style 控制输入控件根，slotProps.input/clearButton 等面向真实输入元素与按钮。原生 id/name/autocomplete/输入事件仍由 Input 转发到 input，不能挂到外壳。上层 Field 不需要经多层 slotProps 才能控制输入框，直接给子 Input 传参即可。

ZUI 控件通过薄字段上下文接入 ID、aria-describedby/invalid 与焦点注册；一个 Field 默认一个主控件。多输入组合要有明确组语义，不能重复使用同一个 input ID；任意原生元素/第三方编辑器需显式 ID 或接入协议，不靠查询 DOM 猜控件。label/help 可用 string 或 snippet，error 支持消息展示；required 与 schema 规则的关系必须明确，不从复杂 schema 内部结构猜测必填。

```svelte
<Field label="负责人" error={errors.owner}>
  <Select bind:value={form.owner} options={users} />
</Field>
<Field label="预算" error={errors.budget}>
  <NumberInput bind:value={form.budget} />
</Field>
```

这些控件不复制字段展示。Input 的文本类型范围明确，number/checkbox/file 不塞进一个巨型 type 分支。Checkbox/Radio 的选项文字属于控件内容，可以保留；整组标题、帮助和错误属于外部 Field，必要时使用 fieldset/legend 语义。

### 校验已确定：直接集成 Zod 4

用户已选择绑定 Zod 做深度定制。Zod 已作为 @zui/svelte 的直接运行时依赖安装，精确版本以根 catalog 和锁文件为准；主入口直接导出原生 z 命名空间，不再提供 ZUI 规则 DSL、通用校验器插件注册或多套并行规则入口。

```ts
import { z } from '@zui/svelte';

const schema = z
  .object({
    name: z.string().min(2, '名称至少 2 个字符'),
    password: z.string().min(8, '密码至少 8 个字符'),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: '两次密码不一致',
    path: ['confirmPassword'],
  });

type Model = z.input<typeof schema>;
type Submission = z.output<typeof schema>;
```

ZUI 直接使用 Zod 的解析、错误与类型能力；自定义业务规则用 refine 等原生能力，不再同时设计 rules/validator/Standard Schema 适配层。业务可以直接 import { z } from 'zod' 使用同一库；给不经过 Svelte 编译的独立 Node 后端共享 schema 时，不应强制依赖 UI 包主入口。

按用户要求采用推荐方案推进文档合同：Form bind:value={model} schema={schema} onvalid={save}；同一份业务 $state，Field.name 关联错误路径/注册，Input 显式 bind:value。onvalid 接收校验输出，onsubmit 保留原生事件。FormController/FieldScope 已实现并验证调度、草稿、异步版本、reset 与字段关联；公共视觉 Form/Field 在第二阶段实现。

深度集成的具体范围：

- 用 z.input/z.output 复用规则的输入/输出类型，校验通过的提交数据保持 z.output；编辑态可能包含尚未合法的 undefined，不要求把必填 schema 改 optional 或用类型断言伪装合法。Form 接受实际编辑模型，不把字段名字符串假装成从父级泛型自动推导，也不新增万能递归 Draft 类型。
- 统一处理 ZodError.issues 的路径、消息和来源，支持字段/表单级及服务端错误、动态数组、首错聚焦和多错误保留；Field 默认显示首条，复杂展示通过 snippet。
- 支持同步/异步 schema，含异步 refine/transform；小型调度器处理 touched/dirty、模型版本、过期结果和提交互斥。默认策略已确认：初始不报错，首次离开字段后校验，之后修改时更新，提交时完整校验。字段展示时机与 schema 的完整执行范围分开。
- 跨字段校验保留完整 schema 语义；按字段展示不等于只截取字段 schema。先保证完整性，再测量大表单并决定是否需要明确的依赖声明；不对任意函数静态猜依赖。
- 输入和输出分开，trim/coerce/default/transform 用于提交结果，不在每次校验后自动回填输入框或替换业务选项对象。reset/新值/卸载使旧校验结果失效；提交只能使用一致版本的数据。
- Promise 没有通用取消能力；支持 signal 的业务请求才实际 Abort，其余至少忽略过期结果。校验函数异常/网络故障与正常字段不合法分别处理，不吞异常。
- 本地化使用 schema 消息或按次解析的错误配置，禁止在并发 SSR 请求中切换全局 z.config。locale 的优先级和服务端错误清除规则在表单实现前固定。
- 严格 CSP 路径采用解释器模式：计划在 ZUI 的 z 导出初始化模块中、业务创建 schema 之前一次性设置 jitless=true，并将该初始化准确标记为不可裁剪的副作用。公开说明它影响同一 Zod 实例的解析优化，不按请求切换；不自动启用 compile/JIT。直接绕过 ZUI 导入 Zod 并更早创建 schema 的应用需自己保证初始化顺序；不能只在 parse 时传选项就宣称解决。本次只确定方案，尚未改变运行时代码；隔离进程阻断 Function 的探针通过，真实 CSP/SSR/打包仍须验收。
- 可针对绑定版本封装小型 Zod 接入模块，但不遍历所有内部结构来自动生成 UI。required/原生 minlength/数字约束只在映射语义明确时使用；Unicode 长度、transform、union 和条件必填不能盲目映射成 HTML 约束。

清空值已确认：文本为 ''，数字输入和单选 Select 为 undefined，多选为 []。undefined 只表示当前为空，不表示业务允许为空；必填用 z.number()/必需对象规则，选填才用 optional()。JSON 序列化会省略 undefined，后端若要求显式 null，由提交边界明确转换。

### Form/Field 的实施合同

以下按推荐写入实施规划，后续用真实场景验证，不再保留平行规则引擎：

| 范围         | 约定                                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 模型与类型   | 业务 $state 是唯一编辑模型；校验入口允许未合法的编辑值，成功提交得到 z.output。临时文本草稿属于控件编辑态，不能伪装成另一份全表模型                                                              |
| 初始/修改    | 初始不展示错误；首次 blur 后展示对应字段结果，之后修改重新验证，submit 全量验证。程序赋值使结果失效但不伪造 touched/用户事件；IME 组合期间延后验证                                               |
| 执行与展示   | 统一通过 safeParseAsync 调度，包括同步 schema；验证完整快照，按 touched/提交状态决定展示路径。复杂跨字段规则先保证完整性，不通过自动抽子 schema 破坏语义                                         |
| 原生约束     | Form 接管统一错误展示并抑制重复浏览器气泡；注册控件报告编辑态/原生约束错误，再合并 Zod 业务错误，同路径优先具体 Zod 消息。只要仍有控件编辑错误就不提交，不能以“模型保留上一次合法值”绕过输入错误 |
| Field 接入   | 内置控件读取薄 context，显式 id 优先并登记主控件/聚焦目标，合并描述关系；单字段一个主控件，组用 fieldset/legend。第三方通过明确属性和焦点接入，不查询 DOM 猜测；Field 不执行另一份校验规则       |
| 提交流程     | 原生 onsubmit 可取消 → 校验控件草稿与模型快照 → 检查模型版本 → 调用 onvalid → 等待其 Promise。正在提交时默认抑制重复提交；校验期间模型变更使本次提交失效，保存已开始后不假装能撤销服务端动作     |
| 异步与异常   | 新值/reset/卸载使旧结果过期；能 Abort 的业务请求才真正取消。校验函数抛异常、网络故障和业务字段错误分开，不能转成“校验通过”或吞掉异常                                                             |
| reset/基线   | 首次初始化保存 reset/dirty 基线；reset() 恢复基线，reset(nextValues) 显式替换模型并建立新基线，用于切换编辑记录。普通外部赋值不暗中重设基线；取消旧校验并清理提交展示/错误状态                   |
| 错误生命周期 | 保留全部 issue/path/source，Field 默认首条；服务端错误与提交版本关联，相关值改变后失效，不清空其他字段。Field 显式 error 由调用方管理；表单级错误不随任意无关输入消失                            |
| locale       | 控件文案、schema 消息和按次 error 配置有明确优先级；不在并发请求中切换 Zod 全局 locale。语言变化后更新展示，不能直接拼接旧消息猜翻译                                                             |
| 值语义       | plain object/array 可递归处理，特殊值按类型保持语义；禁止用 JSON.stringify/parse 作为通用快照/比较。未知可变类不自动深代理，也不声称默认 reset 已支持其私有状态                                  |

尚未完成的是上述合同的实现和验收。重点回归：同路径多错误、交叉字段、异步乱序、事件执行一次、非法编辑草稿、外部改值/换记录、数组删除重排、reset、服务端错误清除、Portal/SSR/i18n/CSP，以及 z.input/z.output 与实际编辑态的类型边界。

依据：[Zod 基础与输入输出](https://zod.dev/basics)、[Zod API](https://zod.dev/api)、[错误定制](https://zod.dev/error-customization)。

### Decimal：依赖与导出已接入，控件和领域适配按约定实现

用户已采用推荐并要求安装 decimal.js。它作为 @zui/svelte 的直接依赖，精确版本走根 catalog，主入口导出原生 Decimal，不增加包装类或 /decimal 业务子入口。它适合金额、税率、价格、精确步长和超出 number 精度的十进制值，不替代 CSS/像素/计数等所有普通 number。数据从一开始就用十进制字符串或 Decimal 构造，不能先经过 Number/parseFloat 再声称精度恢复。

只使用 decimal.js，不并行引入 big.js 等数值实现。decimal.js 的运算 precision 是有效数字，不是小数位数；默认精度也不是无限，必须依据允许位数和业务运算设定。TC39 Decimal 仍为提案，不能当作已普及的原生类型依赖。

```ts
import { Decimal, z } from '@zui/svelte';

const finiteDecimal = z.custom<Decimal>(
  (value) => Decimal.isDecimal(value) && value.isFinite(),
  '请输入有效小数',
);
const price = new Decimal('19.90');
const total = price.times('3');
total.toFixed(2); // '59.70'；接口边界保留字符串。
```

| 层次        | 必须适配的行为                                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 控件        | NumberInput 保持 number；已采用独立 DecimalInput 绑定 Decimal 或 undefined，内部复用文本编辑/步进基础，不让单个 value 自动猜 number/string/Decimal。控件实现尚未开始                                        |
| 编辑态      | DOM 文本、领域值、显示格式分离；保留 '-', '1.', '1.00'、光标、IME、粘贴和 locale。可解析的编辑结果更新领域值；不完整/非法草稿必须报告字段状态并阻止提交旧合法值，失焦不静默抹掉用户输入                     |
| 精度与舍入  | step/min/max 从字符串或 Decimal 读取；支持位数范围与计算精度明确。decimalPlaces/显示尾零与 precision 分开；默认超出业务小数位报错，不暗中舍入，舍入模式由业务明确                                           |
| Zod         | 使用原生 custom/instanceof/refine 检查类型、finite、范围和小数位；仅 instanceof 不够，因为 Decimal 可表示 NaN/Infinity。不 monkey-patch z.decimal，不再创造链式规则引擎；重复的少量 schema 可用普通函数提取 |
| 响应式      | Decimal 按不可变值使用，运算后赋回 $state 属性；Svelte 不深代理普通类实例，不能承诺直接改 Decimal 内部字段也触发响应                                                                                        |
| dirty/reset | 使用数值 equals 比较 Decimal，'1.0' 与 '1.00' 数值等价；显示尾零另管。快照保留类型与构造器配置，不走通用 JSON 克隆；默认不篡改选项等普通业务对象身份                                                        |
| 序列化      | 后端/JSON/FormData 使用明确十进制字符串，不能 toNumber。普通 toJSON/toString 会规范化尾零或采用指数形式，不等于固定小数位合同；按业务选择 toFixed/显式 codec                                                |
| codec       | Zod codec 负责 API 字符串与 Decimal 的边界转换；Form 的 schema 验证领域模型本身。不要把期待字符串输入的 codec 当成验证已是 Decimal 的表单 schema；SSR/Kit loader 数据同样需要显式编码/还原                  |
| 隔离        | 需要不同精度时使用独立构造器 clone 或显式运算配置，不按组件/SSR 请求改变全局 Decimal.set；对多个构造器/副本的类型识别和运算结果应验收                                                                       |

核心取舍：支持有明确用途的领域值，不建立万能 ValueAdapter/类型插件系统。Decimal 的内部 parse/format/compare/step 仅服务精确数值控件；Form 的快照/比较只在确有特殊值消费者时增加明确处理。core 的 CSS 值仍保持 string/number，不给样式引擎强加 Decimal 依赖。

其他类型按需求处理：bigint 用于大整数而非小数，传输需显式编码；Date 要区分时间点和无时区日期，留给日期域；File/Blob 由 Upload 管理引用与资源生命周期。不要为了“可扩展”现在就预装全部库或为每种类型建立公共基类。

已完成依赖安装/主入口导出，并通过小范围精确步进、Zod finite/保留实例、字符串 codec 与 clone 构造器探针；独立安装包的实例/命名空间类型用例交 CI。Form 特殊值快照/比较、locale 数值草稿边界和 Kit transport 已实现。DecimalInput 仍需在后续数值组件阶段完成位数/舍入/极长输入/科学计数法策略、编辑清空、步进及组件体积验收，不能把领域值支持等同于完整控件。

依据：[decimal.js API](https://mikemcl.github.io/decimal.js/)、[不可变运算](https://github.com/MikeMcl/decimal.js)、[big.js](https://github.com/MikeMcl/big.js)、[Zod codecs](https://zod.dev/codecs)、[Svelte 类实例](https://svelte.dev/docs/svelte/$state#Classes)、[TC39 Decimal 提案](https://tc39.es/proposal-decimal/)。

### 日期类型已接入，SSR 传输复用宿主协议

已安装 @internationalized/date 并从 @zui/svelte 导出 CalendarDate、CalendarDateTime、Time、ZonedDateTime、createCalendar 和对应 parse 函数。它是独立日期工具，不引入 React 组件；DatePicker/Calendar 的视觉与交互尚未实现。纯日期、纯时间、本地日期时间和时区时间保持不同语义，不统一强制转换成原生 Date。

SSR 采用明确的边界，不建立新的通用序列化框架：

| 消费方式                    | 处理                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| 普通 Svelte/Vite + JSON API | DTO 与领域对象通过 Zod codec/显式函数转换；不会因安装日期库就自动反序列化                              |
| SvelteKit load/actions      | 在 universal hooks.ts 登记原生 transport；服务端 encode、浏览器 decode，都通过公共 UI 入口获得同一类型 |
| 普通 Node renderStyled      | 渲染本身可接收领域实例，但应用自行负责提供给客户端的数据编码/还原；不能假装 HTML 输出携带类原型        |
| SSR 请求与配置              | 编解码函数保持无请求可变状态；不通过全局 locale/Decimal.set/时区设置重建每次请求配置                   |

真实范例见 [Kit hooks.ts](../svelte/tests/kit/src/hooks.ts)。成功编码返回数组，即使值为零/午夜也不会被 transport 当作未匹配；不匹配返回 false。Decimal 使用保留负零的字符串，不通过 number，范例只承诺默认构造器，clone 的特殊运算配置需业务另行登记。日期编码保存 calendar identifier、era、日期和时间字段；ZonedDateTime 额外保存 IANA timeZone 与 offset，不能只 toString 再 parse 丢掉历法/时代或重新猜测夏令时重复小时。

transport 是宿主边界适配，不是输入验证或业务 API codec。只登记明确的类型，未知值不猜 class、不自动恢复任意原型；API 输入仍由 Zod 校验。hooks 两端执行，不能从 @zui/svelte/server 导入 Node-only API，也不把 Kit 类型作为普通浏览器业务包的强制依赖。

新增 CI 覆盖默认 Decimal、负零、四类日期/时间、佛历元数据、DST 重复小时 offset、SSR 无 JS、hydration、客户端导航、enhanced/native form action，以及独立 tarball 的类型和预渲染。这里只说明新用例范围，当前完整矩阵结果仍以该候选 CI 为准。

依据：[Kit transport](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport)、[Internationalized Date](https://react-aria.adobe.com/internationalized/date/)、[CalendarDate 历法与时代](https://react-aria.adobe.com/internationalized/date/CalendarDate)。

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

## 6. Select：已确认默认返回整条选项数据

```svelte
<Field label="负责人">
  <Select options={users} getLabel={(user) => user.name} bind:value={form.owner} />
</Field>
```

选中李四后，form.owner 就是用户传入的那条选项，可以直接读 email 或编辑字段；不会自动请求选项中原本不存在的数据。多选对应选项数组。组件不主动深克隆、不以替换数组引用作为唯一更新信号。

“返回对象”和“识别对象”分开：value 保存项目，getKey 提供稳定 string/number 身份，用于匹配、键盘活动项、重载及 keyed each；getLabel 提供可搜索/朗读的文字，视觉内容可以另用 snippet。已确认标准对象默认 {id, label}，非标准对象用 getKey/getLabel；不猜多个字段名，不将重复/缺失 key 静默改成数组下标。原始 string/number 选项如需支持，另明确其模型和身份合同，不由这条对象约定自动推导。

已确认：后台重新加载同 ID 的新对象时仍按 key 匹配选中状态，但不替换 form.owner；选中展示也沿用绑定对象的内容，而不是显示新标签却返回旧数据。业务需要同步时明确赋新对象或归并数据；选中项暂时不在搜索结果/当前页也不能自动清空。对象字段要跨多个位置联动，应共享同一 $state 代理；普通原始 JSON 对象不会因为一处被代理就自动同步所有原始引用。

Autocomplete 已确认独立：value 为自由文本，选择建议项另有类型化通知；复用 Select 的集合/搜索/定位/层管理设施，但不增加混合对象/文本的 Select 模式。搜索、远端加载与分页的具体输入协议仍需结合场景讨论。

### 建议推翻旧 valueMode 方案：保持一个值模型

默认已是整项，建议删除前稿的 valueMode="item" 和 getValue，先不在 Select 里维护“对象/ID”两条写入路径。只保存 ID 的少数场景可以使用 Svelte 原生函数绑定：

```svelte
<Select
  options={users}
  getKey={(user) => user.id}
  getLabel={(user) => user.name}
  bind:value={
    () => users.find((user) => user.id === form.ownerId), (user) => (form.ownerId = user?.id)
  }
/>
```

普通使用者无需写 getter/setter；这里只是边界适配。该例要求本地列表完整，远程分页时应从业务实体缓存查询，不假装当前页包含所有已选数据。若 ID 适配将来高频使用，可以增加薄包装或业务辅助函数，不先增加平行可写 selectedItem。此项精简是新建议，尚未批准实施。

Naive UI 的基础 value 常用编号、回调另带 option；Ant Design labelInValue 是 {value,label}，不是完整业务对象；Element Plus 明确支持对象值与 value-key。我们吸收身份/内容分离，默认值形态以用户已确认的整项为准，不再以这些库的默认值约束 ZUI。

清空值已确定：单选 undefined、多选 []，不在挂载时改写业务初值。默认对象模式下提交原生表单的序列化需要独立合同：建议 name 提交 getKey(value)，不能产生 [object Object]；空值是否省略或输出空字符串应与 JSON 提交边界分别明确。

参考：[Svelte 函数绑定](https://svelte.dev/docs/svelte/bind#Function-bindings)、[Element Plus](https://element-plus.org/en-US/component/select)、[Naive UI](https://github.com/tusen-ai/naive-ui/blob/main/src/select/demos/enUS/index.demo-entry.md)、[Ant Design](https://ant.design/components/select)。

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

### 作者形态：原生语法、就近实现

- 组件专用样式直接写在模板 class={css((s) => { ... })}；局部 if/switch、尺寸映射和常量默认留在同一 .svelte 文件。不为文件短而增加 buttonClass/applyVariant/BaseButton/组件工厂。
- 普通 TS 函数和专项基础设施承担真实共享责任；公共数据只有在多个消费者确实语义一致时才提取。Dialog.size 表示内容宽度，不能自动转发为关闭按钮的 size。
- 原生属性来自 svelte/elements；包装组件使用 ComponentProps<typeof Component>。优先内联类型，较长或被复用时再命名；Size/Radius/Color 等基础联合类型按需集中，不强制 ControlAppearance 或万能 BaseProps。
- 用 Pick/Omit/Partial 和普通交叉类型即可。& 不会覆盖同名属性，替换定义先 Omit；不一律 Partial 子组件 Props 来抹掉必选关系。slotProps 引用实际元素/组件类型，不使用 Record<string, any>。

```svelte
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Size } from './types';

  let {
    size = 'md',
    block = false,
    loading = false,
    children,
    ...rest
  }: HTMLButtonAttributes & {
    size?: Size;
    block?: boolean;
    loading?: boolean;
  } = $props();
</script>
```

这是声明形态示意，不是删减后的生产 Button。默认值只在解构中写一次，不额外维护 ButtonDefaults/fallback/definition 对象。外部需要命名类型可用 ComponentProps<typeof Button>，发布时须验证声明产物保留完整补全。

### 默认配置接入：编译补代码，运行时读作用域

作者形态已选定；以下转换方案待 A0/A1 实现。对明确登记的字段，生成等价代码：

```ts
// 自动生成；不修改 Svelte 编译器，不要求组件作者维护。
const __config = readComponentConfig('Button');
let { size = __config.size ?? 'md', block = __config.block ?? false, loading = false } = $props();
```

__config 是在初始化时捕获上下文的读取视图，不是配置快照。实例明确值优先；undefined 继承；false/none 是有效值。默认表达式保留原求值位置，不在构建时执行用户函数，不用 effect 复制状态。配置字段不接受 null 时应由类型和开发诊断拒绝，而非增加含糊的清空语义。

- 必须明确可配置字段，不能把所有有默认值的属性都自动纳入。候选是一份构建清单，如 Button: ['color', 'variant', 'size', 'radius', 'block']；只列键，不重复默认值/类型。清单载体与第三方组件登记入口仍待讨论。
- 使用 AST 和真实导入/源码身份，生成名称避冲突、source map、重复转换标记和清楚的错误。不按文件 basename/运行时函数名猜组件身份，不替换任意业务 $props。
- 配置类型从真实 Props 与字段清单产生普通 Pick 等声明；TS 错误必须回指原文件。复杂泛型、别名、动态声明不可可靠处理时显式诊断，不丢类型或静默跳过。
- $bindable 的 value/open/checked 不自动走视觉默认配置；保留原生双向绑定和请求内业务状态。
- 开发、SSR、发布使用同一转换。当前 Vite class 插件会跳过 node_modules，因此库发布前必须完成所需预处理；独立安装包验证不能依赖工作区恰好扫描到源码。配置转换与现有 CSS 编译桥分别明确顺序、幂等和协议兼容。

当前证据：ConfigProvider、默认值转换、Symbol/slotProps、声明生成与独立包消费已经过第一阶段及九个布局/浮层组件的验证，详见阶段台账；作者仍只维护原生 Props 默认值和集中键清单。

### slotProps：继承类型、原样转发、有限合并

class/style 控制公开根，slotProps 转发稳定职责位置；内容使用 snippet，重复项可按实际需要使用类型化回调。Dialog 保持完整组件，不要求使用者拼 Root/Overlay/Content。公开根要明确，例如 Dialog 的可见内容容器，不将 Portal 占位当作样式目标。

纯包装组件直接继承 ComponentProps 并转发 rest，原有 slotProps/children/事件/attachment 自然保留；需要双向绑定时显式 $bindable + bind:value，spread 不会建立双向绑定。上层组合示例：

```ts
slotProps?: {
  body?: HTMLAttributes<HTMLDivElement>;
  closeButton?: Omit<ComponentProps<typeof Button>, 'children' | 'type'>;
};
```

Dialog.slotProps.closeButton 接收 Button 参数，并保留 closeButton.slotProps.icon 等底层能力；不重新抄一份按钮颜色/尺寸/图标类型。上层只消费自己的位置，新增 badge 等位置需从转发对象分离。公开位置属于稳定 API，不暴露 header.actions.wrapper 等整棵 DOM 树；高频业务参数放顶层 Props，不用深层路径承担 title/error/value。

| 内容           | 合并/所有权合同                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 普通可覆盖属性 | 内部位置默认 → 配置覆盖 → 实例覆盖；undefined 不抹掉前值。上层没特殊要求时继续给底层 undefined，保留底层配置继承                             |
| class/style    | class 全保留、style 遵循原生声明能力；不按 class 数组顺序保证 CSS 优先级，不用按分号拆分的自制解析器                                         |
| 嵌套 slotProps | 只对已定义的 slotProps 结构逐位置合并；普通 options/item/Date 等数据保留完整值，不做通用深合并                                               |
| 状态与语义     | value/checked、内部关联 ID/ARIA、按钮 type 等由对应组件负责；类型排除和最终运行时赋值都需保证，不能仅信 TS                                   |
| 业务事件       | 明确执行顺序、取消与异常行为；例如外部 onclick 后检查 defaultPrevented 再 requestClose。不能取消必要清理；显式调用外部事件后不再自动串联一次 |
| attachment     | 保留可枚举 Symbol 与目标节点身份、清理生命周期；仅 Object.keys/entries 的工具不完整，不能把子节点 attachment 挂到根                          |

有限编译增强可为已登记 slot 的消费位置生成 class/style/slotProps 合并，作者保留普通 spread；原生 Svelte spread 本身只按覆盖规则工作。不得改写所有业务 spread、猜测事件语义、在纯包装中反复合并同一份 Button 配置。无编译增强的业务包装若主动添加定制，可显式调用同一个小型合并工具；不能维护两套规则。

层序已实现为 zui.components → zui.defaults → zui.app，自动 CSR、createStyleRuntime、SSR 使用一致顺序；详细覆盖边界见第 14 节。已登记组件的编译接入使用同一 mergeProps/mergeSlotProps，保留嵌套定制与 Symbol attachments，普通值/事件仍遵循明确覆盖。

验收须覆盖多层包装/嵌套 slot 的类型正负例、透传/覆盖/undefined、符号 attachment、事件只执行一次、属性移除、共享同一 slot 对象给多实例、响应式重赋值与数组变更、CSP/SSR/hydration 和底层组件独立发布。不能因为小样本可编译就宣称这些全部通过。

## 9. 集中默认配置：已确认方向，入口暂名 ConfigProvider

```svelte
<ConfigProvider size="md" radius="sm" locale={zhCN}>
  <Field label="名称"><Input bind:value={form.name} /></Field>
  <Button>继承默认尺寸</Button>
  <Button size="lg">局部大按钮</Button>
  <ConfigProvider size="sm">
    <Field label="紧凑区域"><Input bind:value={form.code} /></Field>
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

| 操作/责任                      | 默认建议                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Select 在 Dialog 中展开        | 注册为 Dialog 子层，显式选择同渲染根内的挂载目标；主题与焦点按父子归属处理                                |
| Escape                         | 先关最上面的可关闭层；关 Select 后再按一次才关 Dialog；IME 组合输入中不抢 Escape                          |
| 点击 Dialog 内容但在 Select 外 | 关闭 Select，Dialog 保持                                                                                  |
| 点击 Select 的 Portal 内容     | 仍算 Dialog 内部交互，不能误触发父层 outside                                                              |
| 明确点击 Dialog 遮罩           | 一次外部事件只请求最上层关闭；若 Select 在上层则先关它，再次点击才关 Dialog。显式关闭父层时释放其全部子层 |
| 焦点范围                       | 模态 Dialog 的焦点范围包含注册的子浮层，不把 Select 的焦点拉走                                            |
| 恢复焦点                       | 关 Select 回触发点；关 Dialog 回原入口；入口已移除或已打开新模态层时不能强行抢焦点                        |
| 滚动锁与背景不可交互           | 按实际模态层持有数量管理，关内层不能提前解锁外层                                                          |
| 退出动画                       | 关闭请求与物理移除分开处理，避免穿透点击、提前放开焦点或泄漏资源                                          |
| 主题/配置                      | Portal 保留逻辑配置，并显式继承/绑定同一 ThemeScope；不能因为 DOM 搬家丢主题变量                          |
| CSP/SSR                        | 定位和滚动补偿沿用已有样式通道；SSR 不碰 document，不产生跨请求可变层列表                                 |

层管理是 svelte 内部的小型服务，先不做公开的万能 LayerManager 类。组件自己处理业务状态，管理器负责栈、归属与清理。多应用根在同一 Document 时要协调焦点和模态锁；ShadowRoot 的宿主与样式目标要明确。若使用原生顶层弹窗能力，挂载策略必须随之验证，不能假设调高 z-index 就够了。

## 11. Svelte 原生能力：必须先用，再考虑自建

本次核对官方文档和仓库锁定的 Svelte 5.57.0。createContext 的本机类型/实现确实返回 get/set/has；下列能力以锁定版本为基线，不只根据最新版网页假定可用。

| 能力                                   | ZUI 应省掉的代码                                                  | 必须保留的边界                                                                               |
| -------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| $state 深层代理、.svelte.ts            | 业务 store 包装、强制不可变复制、组件专用 model 类                | 普通对象/数组自动代理；class 实例不自动深代理，跨模块重赋值和原始对象引用有边界              |
| $bindable + bind:value/open            | 两套受控/非受控状态、手写父子同步事件链                           | 少量真实业务状态可绑定；不开放每个内部缓存为可写 prop，允许 undefined 时不制造 fallback 冲突 |
| $derived / $derived.by                 | $effect 中复制 props、手维护 label/过滤列表/选中键镜像            | 派生保持纯计算；不要用可覆盖 derived 偷造另一套 value 状态                                   |
| 函数绑定                               | 为偶尔的 ID 映射再增加 valueMode/getValue/returnObject 组合       | 普通对象绑定无需 getter，只有边界适配使用；异步数据仍需明确来源                              |
| snippet / children                     | renderLabel/renderOption/slot 三套并行接口、额外展示组件          | snippet 替换内容，关键 option/label 壳及无障碍关系仍由组件维护                               |
| $props / 原生 HTML 属性类型 / generics | 逐个重写原生属性、表单对象转 any、万能基类 Props                  | 泛型联系 options/value/snippet；单选与多选的类型区别要验证                                   |
| $props.id()                            | 自建全局递增 ID、SSR 两端随机 ID                                  | 用户 id 优先，label/help/error 引用要一致，多根按宿主规则隔离                                |
| createContext                          | 新 UI 配置中的字符串 key 注册表、无意义 Provider 工厂             | 在组件初始化时取得上下文，事件中使用已捕获的引用；继承必须保持响应性                         |
| bind:this + export function            | 每个控件的 ref 管理器、React 式 imperative handle 包装            | 只暴露 focus/select/blur 等少量实际方法，组件引用不是 DOM 引用                               |
| @attach / createAttachmentKey          | 为 observer、定位或 DOM 集成新增 actions 数组/inputRef 等平行入口 | 清理和重跑随实际依赖；透传不能丢 Symbol；根 attachment 与 slotProps.input 目标不同           |
| 原生 class 数组/对象                   | 强制要求用户调用 mergeClasses                                     | class 顺序不等于 CSS 优先级；不能引入 tailwind-merge 处理 ZUI 哈希类                         |
| svelte/events.on                       | 自行修复手动监听与声明式事件委托顺序的样板                        | 在需要手动监听时使用并清理；不能替代浮层的业务事件优先级                                     |
| 原生 transition/生命周期               | 通用动画组件层、重复挂载/退出计时器                               | 退出 DOM 仍可能存在，层锁释放需对齐；减少动画和 CSP 不能假定已自动满足                       |

CSS 的公开用法仍只有 class。attachment 是高级 DOM 行为接入，不是把 CSS 变量绑定 API 暴露回用户。slotProps 的语义规则仍由本库负责，原生 spread 不能替代受控字段/事件合并合同。

### 公平比较 Vue 与 React

这些并非全是 Svelte 独有。Vue 的 reactive/defineModel/scoped slots/provide-inject 也能减少对应样板；Svelte 的价值在于直接使用本框架的语法，不搬 Vue 的 modelValue/update 约定。React useState 的对象更新通常需要新值，但 React 19 已简化 ref 传递，React Compiler 也减少手写 memo；不能把旧版 React 的样板当成当前必需项。

不承诺“没有 getter、没有 effect、没有 ref”。对用户，常规写法应短；对内部，少量 getter/effect 只用于实际副作用或继承视图。$effect 不用于 SSR 初值，onDestroy 可能在 SSR 执行；定位、DOM 监听和主题首屏各走现有正确生命周期。

ConfigProvider 建议用类型化 context 和稳定视图，让内层未覆盖的字段实时读取父级，而不是 setContext 一份 props 快照后不断同步副本。已有 StyleRuntime 的跨包 Symbol 协议不因 createContext 更方便就全仓替换。

### 本轮验证边界

已用本机编译器和现有 ZUI class 变换验证“组件函数绑定 + Symbol attachment spread + 动态 class”能同时生成客户端/服务端代码；文字 label 和 snippet label 各自可编译，同时提供会报 snippet_shadowing_prop；模型工厂先声明状态再返回可编译，直接 return $state 会被拒绝。这些是语法集成证据，不是完整组件行为、类型或 SSR 验收。attachment 的实际转发/清理、泛型单多选、函数绑定读写次数仍列入 A0。

## 12. Svelte 组件库参考与取舍

本轮查阅当前官方文档/公开组件源码，不以搜索排序或星数判断适用性，也不把旧版文档和当前 API 混用。

| 项目                     | 类型与本轮事实                                                                     | 学习什么                                         | 明确不搬什么                                                     |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| shadcn-svelte            | 基于 Bits UI/Tailwind 的源码式组件集合，Button 文档展示 $props/$bindable/restProps | 薄封装、代码就近可读、公开 Props 一致            | Tailwind/cn/variants 栈、要求用户拼很多部位、源码分发 CLI        |
| Flowbite Svelte          | 有样式完整组件，Select/Modal 展示 bind:value/bind:open                             | 常见业务场景的短用法、原生表单属性与明确清空行为 | 它的图标/主题系统、Tailwind 类、把其标量 Select 默认值强加给 ZUI |
| Bits UI                  | Svelte 无样式 primitives，Select 支持函数绑定、Dialog 有焦点/滚动等行为合同        | 键盘、焦点、可取消关闭、类型和相关回归思路       | 依赖安装、对外 Root/Content/Item 全套形态、headless 公共架构     |
| Skeleton                 | Tailwind 设计系统，当前官网列 React/Svelte 功能组件及 Zag.js                       | 主题/尺度一致性、复杂交互有哪些状态              | Tailwind 主题、Zag 状态机依赖、另一套框架中立运行时              |
| Carbon Components Svelte | Carbon 设计系统的 Svelte 实现                                                      | 后续企业表单和数据展示案例候选                   | Carbon 样式/主题/命名；本轮不宣称已逐个审完其复杂组件            |
| SMUI                     | Material 风格 Svelte 组件；当前仓库说明 v8+ 使用 Svelte 5                          | 原生属性、内部节点定制和 RTL 的具体需求          | Material 视觉、专用 $ 属性转发语法、actions 数组入口、另一套图标 |
| Melt UI                  | 低层无样式 builders                                                                | 必要时查某个行为的职责与清理                     | builder DSL、依赖引入；不与 Bits UI 重复采纳同一层架构           |

深入阅读优先 shadcn-svelte、Flowbite Svelte、Bits UI；其他按具体需求查，避免把七套模式拼成一套。Bits/Melt 仅是行为资料，仍遵守“不引入无样式组件库”。现有 MUI 的完整 TextField 组合、Ant 的颜色/变体分离、Naive 的搜索/缺失选项语义继续作为专项依据。

原文：[shadcn-svelte](https://www.shadcn-svelte.com/docs)、[Button 源码示例](https://www.shadcn-svelte.com/docs/components/button)、[Flowbite Select](https://flowbite-svelte.com/docs/forms/select)、[Flowbite Modal](https://flowbite-svelte.com/docs/components/modal)、[Bits Select](https://www.bits-ui.com/docs/components/select)、[Bits Dialog](https://www.bits-ui.com/docs/components/dialog)、[Skeleton](https://www.skeleton.dev/)、[Carbon](https://github.com/carbon-design-system/carbon-components-svelte)、[SMUI](https://github.com/hperrin/svelte-material-ui)、[Melt](https://www.melt-ui.com/docs/introduction)。

## 13. 对旧稿的精简/推翻建议

1. Select 默认整项已确定；建议取消内置 ID 模式，而不是只把旧模式的默认值翻转。函数绑定承担少量转换。这是待讨论的 API 精简。
2. 不新增通用 Model/FormModel/store 层；先直接 $state + bind，后续 Form 只承担真实校验/提交/字段注册责任。
3. 不做通用 ref/elementRefs/actions 框架；少量 export 方法 + 原生 attachment。组件根和内部 input 的目标必须不同且明确。
4. 不仿照 shadcn/Bits 的全部公开拼装接口；保留完整控件/交互行为；Field 独立承担字段展示，Input/Select 通过字段协议接入，Dialog 复用浮层基础。
5. title/label 保留 string | Snippet 的单一入口：文字 prop 或同名 snippet 二选一。不增加 renderTitle/titleContent 等别名，也不设计同一调用同时传文字和同名 snippet 的覆盖优先级；Svelte 会拒绝这种冲突。
6. 不为每种状态建立组件 Token 全矩阵。先补 Button 五种 variant 真正缺少的颜色角色与状态；派生颜色需对比度证据，不能为了省键随意混透明度。

## 14. 组件主题覆盖：能力完整，入口复用

目标是生产可用的完整覆盖能力，简洁是减少重复机制，不是删除高级定制场景。既有实现以第一、二阶段验收为准；本节保留覆盖能力边界，第 18 节已取消独立组件 Token/变量层；沿用本节的主题、参数和 class/slotProps 覆盖边界，不新增覆盖框架。

成熟库依据：MUI 把 defaultProps、styleOverrides、variants 分开；Naive UI 有 common、组件覆盖及更深的 peers；Element Plus 支持 CSS 变量定制。这里只吸收“系统值、组件默认值和局部定制职责不同”，不照搬多层 overrides/peers 结构或另一套样式引擎。[MUI](https://mui.com/material-ui/customization/theme-components/)、[Naive UI](https://github.com/tusen-ai/naive-ui/blob/main/demo/pages/docs/customize-theme/zhCN/index.md)、[Element Plus](https://element-plus.org/en-US/guide/theming)。

### 三种需求分开处理，不新增一份万能主题对象

| 要改什么                               | 唯一入口建议                                     | 例子                                                                        |
| -------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| 品牌色、间距等系统视觉值；局部区域明暗 | 现有 ThemeScope + overrideTheme/extendTheme/fork | 改 color.primary；在某个区域切暗色                                          |
| 所有某类组件默认怎么使用               | ConfigProvider.components 的白名单默认 Props     | Button 默认 color=primary、variant=soft；Input 默认 clearable               |
| 某个组件独有且值得稳定公开的视觉值     | 按需扩展普通主题键，或通过 class/slotProps 定制  | color.inputBorder → color.border；color.dialogSurface → color.surfaceRaised |

整类组件和单实例都必须能覆盖任意 CSS 与公开内部节点，建议复用 class/slotProps；不把“没有 styleOverrides 这个名字”误解为不提供整类样式覆盖。下面明确 CSS 层序，不靠 class 拼接顺序。

### 组件默认参数保持扁平

```svelte
<ConfigProvider
  size="md"
  radius="sm"
  locale={zhCN}
  components={{
    Button: { color: 'primary', variant: 'soft' },
    Input: { clearable: true },
  }}
>
  <Button>继承配置</Button>
  <Button variant="outline">只覆盖自己的表现方式</Button>
</ConfigProvider>
```

components.Button 保持扁平的默认参数和样式入口，不再套 defaultProps/defaultVariants 两层。用明确类型列出支持的视觉/便利参数以及 class/slotProps 样式定制；value/open/checked/options、业务事件、label/error 和 DOM 引用不进入全局默认值，不是 Partial<ComponentProps> 任意灌入所有 props。全局 slotProps 的边界先限定为样式与声明的视觉字段；实例 slotProps 仍有正常的完整公开转发合同。

配置优先级建议按作用域逐层解析：实例显式值 > 最近 Provider 的该组件字段 > 该 Provider 的通用字段 > 上级 Provider 同样规则 > 库默认值。如此内层 size=lg 能覆盖外层 Button.size=sm；同一层内 Button.size 比通用 size 更具体。undefined 继续查父级，none 是实际值。不要预先深合并成丢失来源的一份对象。

### 整类组件的任意 CSS 覆盖

```svelte
<script lang="ts">
  import { createCss } from '@zui/core';
  import { lightTheme } from '@zui/svelte';
  // 在应用配置文件中定义一次，仍是既有 CSS 工具，不新增样式 DSL。
  const defaultsCss = createCss(lightTheme, { layer: 'zui.defaults' });
</script>

<ConfigProvider
  components={{
    Button: {
      variant: 'soft',
      class: defaultsCss((s) => {
        s.letterSpacing.em(0.02);
        s._selector('&[data-variant="outline"]', (s) => {
          s.borderWidth.px(2);
        });
      }),
    },
  }}
>
  <Button>使用组件默认样式</Button>
</ConfigProvider>
```

统一层序建议为 zui.components → zui.defaults → zui.app：库实现、整类默认覆盖、实例/应用覆盖。必须先在基础接入中验证自动 CSR、显式 runtime、SSR、模块 class 和 slotProps 都一致；上例现在只是候选合同，不声称现有默认宿主已经注册这三层。

实例 css 进入 app 层。外部未分层 class、inline style、!important 仍遵循原生 CSS，不虚构绝对优先级。Props 的优先级与 CSS 的优先级是两回事：硬写 height 的 CSS 覆盖可能压过 size 对应的库规则；希望保留尺寸联动时应改对应 Token，而非固定高度。

状态覆盖优先使用公开的 data-variant/data-color/data-size 和原生 disabled/aria-busy/伪类合同，不公开内部 class 名或所有私有状态。需要运行时计算时沿用普通 TS + css；不能为了“动态主题”新增另一套响应式系统。按实例私有状态任意生成全局默认样式的回调，不自动纳入接口，须由真实场景证明必要性；不能绕开已确认的组件封装边界。

### 按需扩展普通主题键，不设独立组件 Token 层

以下只是普通主题扩展的例子，当前预设尚未包含；不代表 `$` 组件 Token 或专门的组件变量系统，也不作为本阶段新增任务：

```ts
// 演示向 UI 主题增加少量组件别名；当前组件尚未消费这些候选键。
const componentTheme = extendTheme(lightTheme, {
  color: {
    inputBorder: tokenRef('color', 'border'),
    dialogSurface: tokenRef('color', 'surfaceRaised'),
  },
  // 只有 Button 确需独立高度时，再增加相应档位别名。
  size: { buttonMd: tokenRef('size', 'controlMd') },
});
```

改 color.border 时 inputBorder 跟随；显式覆盖 inputBorder 后只影响使用这个键的组件，不会把 Select 或 Dialog 的所有颜色一起改掉。亮暗主题分别保留引用并保持 schema 一致，ThemeScope 切换和局部 fork 沿用现有行为。

如果某属性已经由 size/radius/variant 选择，专用主题键应表示该选择对应的值，例如 size=md 读取 buttonMd；不要再加一个优先级含糊的 buttonHeight 覆盖所有档位。公共尺度足够时直接使用公共尺度；radius 已能用组件默认 prop 区分，就不自动生成七个 Button 圆角别名。只有真实独立定制需求才扩展。

不增加嵌套 components.Button.theme 格式到 core。core TokenSchema 目前是类别/键两层，tokenRef 同类别；把组件名作为 Token 前缀即可得到类型检查与别名联动，不需要更改通用引擎。

### 保留简单边界

- ThemeScope 是唯一主题状态；ConfigProvider 不再维护一份平行颜色对象或新的主题 controller。
- 组件主题只覆盖本组件使用的专属键，避免在每个 Button 根上自动覆写 color.primary，导致变量向子内容泄漏。
- 不为每个实例创建一份全量主题/ThemeScope；按现有主题容器输出和继承，不制造大量重复变量规则。
- ThemeScope 只保存 Token 主题；默认 Props 与 class/slotProps 属于 UI 配置。业务可在同一普通 TS 文件导出 theme 和 defaults，无需新 createComponentTheme 工厂。
- 全局任意 CSS 覆盖是必需能力，使用上面的 class/slotProps 与已声明层序完成；不另抄一套 styleOverrides/variants 数组语法，也不把预先生成的 class 偷偷改到另一个层。
- 预设显式扩展后才能覆盖新增键；未知主题键报错，不静默补值。自定义 baseTheme 用系统组件仍要满足其实际 Token 合同。

验收重点：全局 Token 联动、组件专属覆盖不影响其他组件、实例 Props 覆盖默认值、嵌套配置继承、亮暗/fork、Portal 同主题、三浏览器与严格 CSP、千组件下不出现每实例全量主题拷贝。

## 15. 基础架构先行：完整能力不打折，避免重复机制

执行顺序已由用户明确调整：先完善架构和共享基础设施，并完成其生产级验证；然后设计/实现基础组件；最后组合上层组件。此前确认的 Button/Input/Select/Dialog 方向保留，公共 API 细节待基础合同验证后冻结。本规划不是缩小版 MVP，也不意味着本轮开始实现业务组件。

```mermaid
flowchart TD
  Core[core 标准 CSS 与通用主题引擎] --> Host[Svelte 宿主接入与配置主题]
  Host --> Infra[共享基础设施与领域合同]
  Infra --> Basic[基础组件与公开 API]
  Basic --> Composite[Dialog Select Form 等组合组件]
  Infra --> Composite
  Composite --> Advanced[Table DatePicker 等上层组件]
  Infra --> Advanced
```

### 基础设施清单、责任与生命周期

| 领域             | 必须完整规划/验证的能力                                                                     | 复用与边界                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 宿主与样式       | UI 默认层序、主题桥、SSR 收集/hydration、nonce、模块样式、Portal/ShadowRoot、多根           | 复用 core；不把 UI 预设搬回 core，不修改已运行的层序掩盖配置错误                                       |
| 作者编译与类型   | 原生解构默认值接入、可配置字段校验、slot 定向合并、声明输出、源码映射、HMR、发布预处理      | 保留普通 Svelte/TS 作者形态；运行时只读作用域，不能扩成通用组件 DSL 或改写任意业务 spread              |
| 配置与组件主题   | 动态继承、组件默认值、主题 Token、组件内部映射、整类与实例 CSS 覆盖、类型和合并规则         | createContext + ThemeScope + class/slotProps；不重复造主题 controller                                  |
| 字段语义         | ID/label/help/error/required/disabled/readonly、消息空间、原生表单关联、值/显示值区别       | 公开 Field + 内部字段协议；控件独立可用，需要标题/错误时组合 Field                                     |
| 交互与元素接入   | 指针/键盘/IME、事件委托顺序、可取消动作、attachment/ref、禁用及读写边界                     | 原生 Svelte/DOM；副作用清理属于元素或组件，不用全局轮询                                                |
| 浮层归属         | 父子层、outside 判定、Escape、挂载目标、焦点恢复、滚动锁/inert、退出状态、多 Document       | 每个相关宿主统一管理；组件不再分别注册互相冲突的全局策略                                               |
| 定位与测量       | 滚动/resize、碰撞、翻转、尺寸约束、RTL、变换/裁剪容器、异步结果过期处理                     | 优先 @floating-ui/dom；输出通过 core 样式通道，不照抄内联 style 写法                                   |
| 焦点可达性       | 可聚焦元素、Tab 顺序、动态内容、子 Portal、嵌套模态、触发器消失/新层打开                    | 优先成熟 focus-trap/tabbable 专项能力；层管理统一决定关闭和恢复，不用简化选择器假装完整焦点算法        |
| 集合与选择       | 稳定 key、重复键、disabled 项、活动项与已选值分离、单多选、重载/缺项、类型搜索              | 普通 TS + Svelte 状态；Select/列表/表格复用，不能依赖对象引用或仅数组替换                              |
| 异步数据         | 搜索防抖、取消与请求序号、旧结果抑制、加载/空/错误/重试、分页/已选项缓存合同                | 不内置业务 HTTP 客户端；明确业务数据源与组件意图的接口，任何来源都遵循同一过期结果规则                 |
| 表单与校验       | 字段注册/卸载、同步/异步校验、touched/dirty、submit/reset、首错聚焦、动态数组字段、FormData | 业务值仍是共享 $state；不复制第二模型。直接绑定 Zod，不自造验证 DSL；name 不假装能自动继承父级 TS 泛型 |
| 大集合与虚拟化   | 可见窗口、测量/滚动锚点、活动项 DOM 可用性、焦点、SSR 首屏与动态高度边界                    | 架构阶段用大数据探针选择专项工具；不默认一次渲染全部数据，也不让所有简单组件加载虚拟化依赖             |
| locale/方向/格式 | 词条缺省、局部覆盖、动态切换、RTL/逻辑属性、数字/日期格式                                   | Intl 与明确 locale 数据；业务文本不纳入库翻译引擎，日期领域使用专项工具时再锁定契约                    |
| 诊断与资源       | 错误分层、回调异常、订阅/observer/锁/规则回收、开发诊断与 HMR                               | 沿用核心事务/所有权原则；不吞异常或用重试掩盖逻辑错误                                                  |

基础设施本身要用真实原生元素组合、故障注入和浏览器场景验收；探针是验证手段，不是交付一个削减功能的组件。当前目标组件共享的基础先做完整；后续日期、表格等新增领域基础，也必须先验证再实现其组件，但不预造与任何已规划消费者无关的框架。

### 生命周期与所有权边界

| 资源                      | 所有者                            | 何时结束                                                           |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| 配置继承视图              | Provider/应用树                   | Provider 卸载；不重置业务模型                                      |
| 传入 ThemeScope           | 应用或创建它的调用方              | 组件只解除自身绑定，不能代替调用方 dispose                         |
| 共享层服务及全局监听      | 对应 Document 的活跃应用/层持有者 | 最后持有者释放后移除监听；SSR 不创建 DOM 服务                      |
| 一层的 focus/锁/遮罩/子层 | 层实例                            | 退出流程完成或异常销毁；父层关闭需清理子层                         |
| 定位 observer/待完成计算  | 挂载的元素组合                    | 元素移除/目标变更即清理，旧异步结果失效                            |
| 搜索/校验请求             | 数据源或字段实例                  | 新请求、取消、卸载、reset 时按版本处理；Abort 之外仍有结果版本检查 |
| 字段注册与校验状态        | Form/字段实例                     | 字段卸载按约定保留或移除错误，不能自动删除外部业务值               |
| 虚拟化测量与滚动状态      | 视口实例                          | 视口卸载；实体数据/选中值不是其所有物                              |

基础接口先围绕“取得资源 → 更新需要的参数 → 释放”设计，返回清理函数或有明确 dispose 的对象即可。不要为了统一命名建立每个能力都必须实现的插件生命周期。

### 专项依赖的使用原则

定位优先 @floating-ui/dom 的 computePosition/autoUpdate/offset/flip/shift/size；只在元素存在时订阅并明确 cleanup，忽略卸载后或过期的异步结果。焦点方案优先核对 focus-trap 的共享 trapStack 和多容器更新，或必要时直接用 tabbable；同一责任只选一个实现，不能两套焦点陷阱同时控制。

若使用 focus-trap，Escape、outside 和最终恢复焦点仍由层管理协调，需关闭或接管重复的默认动作；Select 非模态子层不另造一个与 Dialog 抢焦点的陷阱。日期/虚拟化/校验依赖在相应基础阶段做版本、SSR、体积和行为验证后加入 catalog，不凭库名预装一批。

依据：[Floating UI 定位](https://floating-ui.com/docs/computePosition)、[自动更新与清理](https://floating-ui.com/docs/autoUpdate)、[Focus Trap](https://github.com/focus-trap/focus-trap)。只使用专项工具，不引入无样式组件库作为 ZUI 的实现基础。

### 实施阶段与退出门槛

| 阶段                        | 交付                                                                                                                 | 必须通过后才能推进                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| A0 架构合同与风险验证       | 作者语法/默认值转换/slot 转发/类型声明/独立包原型；明确宿主所有权、值/空值、配置/主题层序、对象身份、事件和 SSR 合同 | 原生对照、类型正负例、明确转换顺序与 node_modules 消费；重大取舍得到确认，不以空接口算完成      |
| A1 基础接入、配置与字段语义 | 默认值与 slot 编译接入、Config/context、ThemeScope 桥、组件覆盖解析、统一层序、字段 ID/ARIA/事件/生命周期工具        | 嵌套动态继承、多层 slot/attachment/事件、声明生成、三层 CSS 覆盖、无 JS SSR/CSP、多根和回收通过 |
| A2 浮层/定位/焦点基础       | 挂载、父子归属、键盘/outside、测量、锁和退出协调；专项依赖薄适配                                                     | 原生元素构成的嵌套模态/下拉探针通过三浏览器；包含移除触发器、滚动、RTL、Portal 主题与反复开关   |
| A3 集合、异步与表单基础     | key/selection、搜索与请求生命周期、字段注册/校验/reset/submit、locale；大集合与虚拟化契约                            | 重载/重复键/乱序/取消、数组原地变更、动态字段、错误聚焦、大数据焦点与资源预算通过               |
| B 基础组件与 API 定稿       | Button、Input/Textarea、Checkbox/Radio/Switch 等；复用上述能力，不复制实现                                           | 五档、Lucide、原生属性/表单、IME、值与事件、a11y、SSR/CSP、主题覆盖和生命周期逐组件闭合         |
| C 组合组件                  | Dialog/Popover/Tooltip/Select/Form 等按依赖顺序组合基础组件和设施                                                    | Dialog 内 Select、多层/多根、对象单多选、搜索/表单/主题等组合行为通过，不只测单体               |
| D 上层组件与专项域          | Table/DatePicker 等先确定复用图及领域依赖，再实现；缺少的领域基础先补                                                | 不重复选择/浮层/字段系统；日期/虚拟化/编辑等域合同有独立证据                                    |
| E 生产交付闭合              | 文档、API/类型快照、包体积/性能、独立 tarball、真实 Kit、三浏览器、迁移与支持矩阵                                    | 同一候选 SHA 完整门槛通过；没有已知阻塞，不靠跳过必需场景宣布生产可用                           |

A1–A3 完成前不铺正式业务组件，不把“组件写完后再补基础设施”作为计划。可以用无公共 API 承诺的验证夹具推动基础设计；若探针证明方案不成立，应回到架构讨论，而不是将缺口转给使用者。

### 上层复用图与不可重复建设的责任

| 上层                | 必须复用                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Dialog/Drawer       | Layer/Portal、焦点、滚动锁、主题/配置桥、退出生命周期、Button/Lucide；不各写一个 overlay 栈                     |
| Select/Autocomplete | Field 协议、集合/选择、定位/层管理、搜索异步、Button/图标等适合的基础能力；自绘菜单不假装有原生 select 全部行为 |
| Form                | 字段注册、校验/提交/reset、基础输入组件；模型不搬进另一套 store                                                 |
| Table               | 集合/key/selection、分页/异步/虚拟化，Checkbox、Button、字段编辑器、Tooltip/Popover；不重新实现整套行选择和浮层 |
| DatePicker          | 字段、输入、浮层、键盘、locale/日期领域工具；不靠手写日期字符串解析承担时区/历法正确性                          |

复用可以是函数、模型、内部结构组件或专项依赖，不强求都变成公开组件。基础文件按实际职责产生，目录保持扁平；禁止用通用组件工厂、插件生命周期、BaseComponent 继承树来隐藏行为。

组合组件还要定义复用边界：例如 Dialog 内的关闭 Button 如何接收通用 Button 默认值、Dialog 的局部默认和用户 slotProps，必须在 A0 用实例验证；关闭等受控行为不能被普通 spread 意外替换。配置参数的继承顺序不等于同层 CSS 规则优先级，不能声称“更深的配置对象”自动获得更高 specificity。基础组件不反向依赖 Select/Dialog，不把高级组件的私有状态塞回公共基类。

### 生产验收矩阵

| 编号 | 范围                                                                  | 权威证据                                                                           |
| ---- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| S01  | 对象/数组双向修改、函数绑定、undefined/空值、单多选类型、原始引用边界 | TS 正负例 + 原生 Svelte 对照 + 真实组件交互                                        |
| S02  | 默认配置、组件参数覆盖、主题/别名/局部 scope、CSS 层级与 slotProps    | 三浏览器计算样式 + SSR/CSP + 嵌套与 Portal                                         |
| S03  | label/描述/错误、键盘、IME、禁用/只读、自动填充、reset/name/FormData  | 原生表单对照 + a11y 自动检查 + 人工键盘/读屏抽查；对象不得序列化成 [object Object] |
| S04  | 图标/五档/RTL/高对比/减少动画、响应式布局                             | 真实 Demo 与三浏览器；未支持的媒体模拟不冒充通过                                   |
| S05  | 层、outside、Escape、焦点、锁、退出中断、多根/ShadowRoot/目标移除     | 故障和交错交互探针 + 嵌套组合；关闭后监听/锁/节点/规则可核对                       |
| S06  | 定位、滚动/resize、异步测量过期、裁剪/变换容器                        | 浏览器真实几何断言，不用 JSDOM 代替布局                                            |
| S07  | 搜索/请求乱序/取消/错误、分页缺项、重载稳定键                         | 可控请求时序与数据变化测试；不得后台重写业务值                                     |
| S08  | 大集合、动态高度、活动项挂载、滚动锚点、输入延迟和回收                | 固定场景基准/计数/浏览器 trace，先锁预算再实现；不靠调高门槛过关                   |
| S09  | SSR 无 JS、hydration、请求隔离、严格 CSP、prerender、HMR              | 真实 Kit/生产页面/三浏览器，不以语法可编译代替运行                                 |
| S10  | 打包与维护                                                            | 独立安装包类型/构建/行为、公开 API 快照、依赖与体积、源码映射、示例同源            |

性能场景先固定：1000 个基础控件、10000 条选项的搜索/窗口化、至少 3 层嵌套浮层、100 轮打开/关闭/卸载，以及交错 SSR/异步请求。数量和回收不变量是硬门槛；时间和保留堆上限在基础探针阶段测量后锁定，不编造尚未测得的毫秒保证，也不为失败临时放宽。

上线范围可以按组件阶段推进，但任何声明为生产可用的能力都必须达到对应门槛。结构探针、仅本机通过、仅截图好看，都不能替代完整验收。

## 16. 具体组件目录与讨论范围

下表是生产架构的候选目录，不是全部立即开工，也不是把较复杂组件做成削减版。按依赖逐批交付；每个纳入交付范围的组件完整通过第 15 节对应门槛。现阶段保留已确认的 Button/Input/Select/Dialog 方向，其他组件名称、数量和公共接口仍可调整。

### 公共入口与内部基础设施

| 对外可使用                                                                  | 内部实现优先，不预先公开                                                       |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 已有 StyleProvider、主题 css/lightTheme/darkTheme；继续复用 core.ThemeScope | core 适配、样式资源所有权、Portal 主题桥、请求隔离与 HMR 处理                  |
| 拟新增 ConfigProvider、locale 数据、Size/Radius/Color 等共享类型            | 配置 getter、有限编译转换、类型生成、字段白名单、Props/slot 合并               |
| 公开 Field、表单字段接入、少量 DOM 方法与原生 attachment                    | ID/描述关系、焦点注册、错误/校验调度、表单注册；不预设万能 FormModel           |
| 完整交互组件，必要的受控状态和可取消通知                                    | Layer/挂载、focus/locks/outside、定位、退出协调、集合/选择、异步版本、虚拟窗口 |

内部基础设施先通过原生元素组合探针验收，再承载公共组件。类型与资源清理必须真实可用；不把“先建很多空接口/空目录”视为基础完成。外部高级接入只有真实消费者出现时才单独公开，不将内部每个 manager 变成长期 API。

### B：基础控件与呈现组件

| 组件                           | 首批完整职责                                                                  | 主要复用/边界                                                                |
| ------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Icon、Spinner                  | Lucide 组件直传、尺寸与装饰语义；加载动画、减少动态效果、CSP                  | 图标类型复用 Lucide；不引入图标名字字符串注册表                              |
| Button、ButtonGroup            | color/variant/size、五档、加载/禁用/焦点、原生提交；分组布局和局部默认        | 普通 button/DOM；ButtonGroup 不自动变成有选中模型的 ToggleGroup              |
| Input、Textarea                | IME/光标/自动填充、清空与密码等适用能力、原生 form/reset；标题/错误交给 Field | 共享 Field 接入协议；不复制另一份业务值，Textarea 不强行继承所有 Input Props |
| Checkbox、CheckboxGroup        | checked/indeterminate、单项与集合绑定、表单序列化、禁用、组语义               | 原生 input 和共享字段/集合；组与单项模型分别明确                             |
| Radio、RadioGroup、Switch      | 单选组键盘/表单、布尔切换和选项文字；组级说明/错误交给 Field                  | 原生语义优先；Switch 与 Checkbox 可复用实现，不混淆角色                      |
| Badge、Tag                     | 计数/状态与可关闭标签；关闭可取消，处理布局/溢出/读屏                         | 使用共享语义色；Badge 与 Tag 用途不同，不用万能状态组件                      |
| Avatar、AvatarGroup            | 图片失败回退、文本/图标回退、分组与溢出说明                                   | 复用 Icon；不默认引入图片裁剪/上传职责                                       |
| Divider、Card、Empty、Skeleton | 结构、内容片段、空态、加载占位、动画与 a11y                                   | 原生元素、snippet、主题；不为了每一种排列增加组件层级                        |
| Alert、Progress                | 状态消息及关闭、确定/不确定进度、可访问说明                                   | 共享色板/图标/动作按钮；与 Toast 的队列和计时分开                            |

Icon/Spinner 是其他组件的底层复用点。Field 已确定为公开基础组件，负责 label/help/error 和字段关联；不再把相同展示集成进 Input/Select，也不同时暴露同义 FieldFrame。

### B/C：导航与内容组织

| 组件                          | 关键能力                                                     | 依赖与取舍                                                     |
| ----------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| Link                          | 原生 a/download/target、安全的禁用表现和焦点、图标           | 不依赖特定路由器；Button.variant=link 仍是按钮                 |
| Tabs、Accordion               | 活动项/展开项、键盘、disabled、面板 ID、懒加载与保留状态合同 | 共享集合/焦点/退出状态；公开完整组件，snippet 承担自定义内容   |
| Breadcrumb、Pagination、Steps | 路径导航、分页参数与边界、步骤状态及语义                     | Button/Link/Icon；不内置路由和数据请求，Steps 不变成工作流引擎 |

第二阶段按用户新方向优先布局/定位/浮层，具体范围见 [阶段计划](svelte-phase2.md)：建议少量 Stack/Grid/Container/ScrollArea，不铺 Box/Flex/Stack/Space 等重复体系；普通 HTML + css 足够时直接使用。此段替代旧的“布局组件暂不优先”排期。复杂 NavigationMenu、CommandPalette 等有独立行为需求的能力，需补充真实场景后再纳入。

### C：浮层、选择与表单组合

| 组件             | 完整职责                                                                          | 必须复用                                                                        |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Dialog、Drawer   | 模态/非模态合同、关闭原因和取消、焦点/锁、退出中断、header/body/footer、slotProps | 同一 Layer/焦点/挂载与主题桥、Button/Icon；Drawer 只改变布局/方向，不复制管理栈 |
| Popover、Tooltip | 锚点、碰撞、触发/延迟、触摸/键盘、描述关系；交互内容用 Popover                    | 共享定位/Layer；Tooltip 不承担可操作表单，不把两者的焦点策略混用                |
| DropdownMenu     | 动作项、分组、禁用、子菜单、键盘/typeahead、可取消动作                            | 集合、定位、层归属、Icon；导航链接的语义与操作菜单明确区分                      |
| Toast            | 应用作用域队列、暂停/恢复计时、去重策略、操作按钮、live region、清理              | Alert/Button/退出基础；不创建跨 SSR 请求单例，不抢用户焦点                      |
| Select           | 默认对象、稳定 key、单多选、搜索、清空、异步/缺项、虚拟选项、表单关联             | Field 协议、集合/选择、异步、虚拟化、定位/Layer、Icon；不另造绑定模型           |
| Form             | 字段注册、错误/dirty/touched、同步/异步校验、submit/reset/首错聚焦、动态字段      | 原生 form + 外部 $state 模型；不复制 store、不自造规则 DSL，不替业务请求接口    |

Dialog 不默认强加“确认/取消”业务流程。ConfirmDialog、SearchInput、EmailInput 等先作为用法/组合示例；若重复需求足够，再讨论独立导出，避免机械增加同义组件。能否取消关闭与底层事件合并是具体合同，不能用普通 spread 意外覆盖。

### D：专项领域和复杂数据组件

| 组件                             | 先补齐/验证的领域基础                                                 | 组件责任                                                                                                |
| -------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| NumberInput、Slider              | 数字/空值/非法中间输入、精度和步长、locale 解析；指针捕获与键盘、方向 | 格式化不打断编辑；Slider 的单值/范围须类型区分，不复用普通 Input 的文本状态机                           |
| DecimalInput                     | 精确十进制编辑、舍入/位数、Decimal 值比较/快照、Zod 和传输边界        | 与 NumberInput 共享编辑基础，领域值不退回 number；decimal.js 已安装，控件与适配按第 3 节实施            |
| Autocomplete                     | 文本模型、建议项对象、IME/搜索、提交与选择事件                        | 已确认独立的自由文本模型，选择建议项另行通知；不混合 Select 的对象模型                                  |
| Upload                           | 文件筛选、任务状态、进度、取消/重试、并发与队列、资源释放             | 提供业务上传适配接口，不内置后端/存储协议；客户端限制不冒充服务端安全验证                               |
| Calendar、DatePicker、TimePicker | 日期/时间/区间模型、locale/RTL、不可选日期、时区和序列化边界          | Calendar 提供可复用日历面板，DatePicker 组合字段/浮层，TimePicker 明确时间模型；不猜测地区日期字符串    |
| Table                            | 行 key、选择、列定义/排序/过滤、异步分页、虚拟化/测量、键盘/表头关联  | 复用 Checkbox、Button、Input、Popover、Pagination；列宽/固定列/编辑按明确合同交付，不宣称是电子表格引擎 |
| Tree、Cascader                   | 树 key、展开/懒加载、父子选择/半选、禁用传播、窗口化                  | Tree 与 Cascader 共享树模型，Cascader 再复用字段/浮层；不把树节点状态复制进业务对象                     |

专项基础也遵循先基础、后组件。列出的完整领域不能跳过，但无需在 Button 开始前先实现上传或日期引擎。大数据、日期或表单能力不应使只使用 Button 的应用加载所有专项依赖。

### 包结构与依赖选择

根目录仍是 core/svelte/docs。svelte/src 当前的入口、theme.ts、StyleProvider、runtime/compiler 保留。组件增多时按 controls、overlays、display、navigation、data 分组，内部共享实现放 internal，locale 按实际数据量产生目录；一组放多个 .svelte/TS 文件，不为每个组件创建单文件目录。测试放所属模块 test 中。类型先少量平坦文件，目录按实际文件形成，不一次性生成空骨架。

- 已有：Svelte 原生响应式/context/snippet/attachment、core runtime/Stylis、Lucide。不要叠加第二套样式或 headless 组件运行时。
- 定位：已采用 @floating-ui/dom；只在目标挂载时订阅，卸载/重定位时释放；输出几何交给 css，不直接写内联 style。
- 焦点：已采用 focus-trap/tabbable，每个 Document 由 Layer 持有一个有效模态陷阱，关闭和恢复焦点只由 Layer 处理。
- 虚拟化：已采用 @tanstack/virtual-core 的薄接入，保持 key、活动节点、动态测量和观察器生命周期；10000 项窗口化有真实浏览器探针。
- 校验：已安装并直接绑定 Zod 4，原生 z 从 @zui/svelte 主入口导出；不再增加多库适配/规则 DSL。Form/Field 调度与深度集成规划见第 3 节，不自动回写转换后的数据。
- 精确数字与日期领域已安装 decimal.js 和 @internationalized/date；Intl 负责格式化，不假设它提供可靠的任意文本解析或日期算术。

上述已采用依赖均进入产品 catalog 并安装；不再并列保留未采用的算法实现。依据：[Floating UI autoUpdate](https://floating-ui.com/docs/autoUpdate)、[focus-trap](https://github.com/focus-trap/focus-trap)、[TanStack Virtual](https://tanstack.com/virtual/latest)、[Zod API](https://zod.dev/api)。

### 已确认的实施方向与待确认项

1. Field 已确认公开，且标题/帮助/错误移出 Input 等控件；现在讨论字段上下文、原生约束和第三方控件接入，不再讨论是否保留一体 Input。
2. Zod、触发/清空策略已确认；按用户授权采用推荐的 reset 基线、提交版本、错误生命周期、字段接入与 CSP 初始化规划，见第 3 节。接下来是实现与验收，不另建一套表单 store。
3. Select/Autocomplete 已确认分开；Select 标准对象默认 id/label，同 key 刷新保留原绑定对象及其展示。下一步讨论远程搜索/分页的数据输入协议，值模型不再重复选择。
4. 默认值编译已选集中清单，源码只保留普通类型/默认值；原型已通过正负类型、动态配置、SSR 和独立 node_modules 预编译消费。组件实际配置类型随清单生成。
5. decimal.js 已安装并从主入口导出 Decimal，独立 DecimalInput 的使用形态已采用；剩余精度/编辑草稿/快照/传输等为实现验收，不再讨论多 Decimal 库或万能值适配器。

上面分别标明已确认合同、实施验证和待确认选择；不能把尚待讨论的数据源/组件目录等写成已接受，也不因出现名称就擅自安装依赖或铺开实现。

### 已采纳的业务基础合同

用户已接受下列四项推荐方向，具体类型细节在实施原型中收敛，不再反复询问相同选择。当前讨论转向依赖和底层能力是否有遗漏，复核结果见 [依赖完整性复核](dependencies.md#完整性复核新增缺项与依赖候选)。

| 议题                | 建议起点                                                                                                                               | 要比较的实际场景                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 远程搜索/分页       | 始终可传 options；如增加 loadOptions(query, {signal, cursor})，与直接 options 模式互斥，统一异步版本/取消/重试基础，不绑定 HTTP 客户端 | 外部查询库管理数据，和简单页面让组件调度请求，哪种常见；如何保留跨页已选项、错误/加载/重试与旧结果 |
| 动态字段生命周期    | 字段卸载默认不删除业务值；字段可见性不等于业务可选性，条件必填由 Zod 模型表达；停止卸载字段持有的资源，明确隐藏错误的提交展示          | 切换“个人/企业”表单、分步表单、数组增删重排；保留数据/dirty/reset 基线与条件 schema 如何配合       |
| 原生表单序列化      | 对象 Select 建议按 key 输出字符串，多选使用重复 name；空值省略；Decimal 输出十进制字符串。JS onvalid 仍提供领域对象，JSON DTO 显式转换 | 传统 FormData 提交和纯 JS API 提交、空值 vs 空字符串、嵌套 name、多个按钮与 form 属性关联          |
| 第三方控件/复合字段 | 内置控件自动接入，第三方显式传 ID/描述/焦点；复合字段不能多个控件复用同一 ID                                                           | 富文本编辑器、起止时间/金额币种组合，哪些能力可自动完成、哪些必须显式映射                          |

默认配置登记暂按集中清单做原型；class/slotProps、SSR/CSP、资源清理、发布声明、跨浏览器和性能预算属于既定工程责任，先做必要探针验证，不再要求用户对每个内部工具函数逐项选择。

## 17. 研究依据与下一步讨论

第一阶段执行计划已经单独收敛为 [架构与基础设施实施计划](svelte-phase1.md)，只记录顺序/交付/门槛并引用本文件的合同。用户已批准并执行第一阶段，当前实现与 CI 证据集中维护在该文件；[第二阶段计划](svelte-phase2.md) 供继续审阅。

Svelte 官方：[state](https://svelte.dev/docs/svelte/$state)、[bindable](https://svelte.dev/docs/svelte/$bindable)、[derived](https://svelte.dev/docs/svelte/$derived)、[context](https://svelte.dev/docs/svelte/context)、[attachments](https://svelte.dev/docs/svelte/@attach)、[泛型与原生属性](https://svelte.dev/docs/svelte/typescript)、[transition](https://svelte.dev/docs/svelte/transition)。对照：[Vue defineModel](https://vuejs.org/guide/components/v-model.html)、[Vue reactive](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)、[React useState](https://react.dev/reference/react/useState)、[React 19 ref](https://react.dev/reference/react/forwardRef)、[React Compiler/memo](https://react.dev/reference/react/memo)。

后续审查基础组件时，继续沿用已经验证的约束：

1. 确定配置、组件默认样式和实例样式的解析/层序合同，完成 CSR/SSR/显式 runtime 一致性原型。
2. 确定字段值、对象身份、空值、原生表单序列化和校验责任；Select 默认整项保持已确认，ID 适配只作为边界能力。
3. 确定层服务与定位/焦点工具的职责交界；用多层、Portal、ShadowRoot、CSP 和退出中断场景比较方案，不仅凭 API 名字选依赖。
4. 确定集合/异步/虚拟化的数据源合同和量级门槛，避免未来每个上层重新写一套请求与选择逻辑。
5. 固定浏览器、Node SSR、无障碍、依赖/体积与发布验证范围；未支持的宿主如 Edge SSR 不伪称通过，但不得跳过已承诺的能力。

经过基础验证后，再冻结 label/snippet、少量 imperative 方法、具体空值与交互默认等组件 API 细节。已确认的易用方向不撤回，新增高级机制只有在真实能力缺口需要时才引入。

## 18. Core/Svelte 属性对象、类型体验与模块整理

本阶段已按用户授权实施。CSS 属性对象不可调用，第三层关键字/方法完成声明；没有恢复组件 Token、变量继承、挂载点或新的覆盖框架。组件内部保留普通 TS 映射、默认 $props、局部样式与既有 ThemeScope/ConfigProvider/class/slotProps 分工。

### 已实现的作者合同

```ts
s.inlineSize.auto;
s.inlineSize.maxContent;
s.inlineSize._panelXs;
s.inlineSize.px(240);
s.inlineSize.token('max-content');
s.inlineSize.token('_panelXs');
s.inlineSize.raw('_panelXs');
s.inlineSize.raw('calc(100% - 2rem)');
s.opacity.raw(0.5);
```

- 第二层只有属性对象，不再支持 s.inlineSize(value)。第三层操作返回 void，不继续返回 builder；系统/主题成员、单位、token/raw 共用声明收集与生命周期。
- token 严格接受生成表中该属性的系统字面量和该类别主题键，类型与运行时同时检查。raw 提供相同候选并开放字符串，只解析已存在的完整 `_key`；未知字符串交给原生 CSS，拼写检查使用 token。
- raw 不放宽属性原有的数值类型；null/undefined 省略声明。复合 CSS 不做内部替换，现有边界/注入检查保持；s.raw/s.set 是完全原始输出的显式出口。
- CSS 参数使用真实拼写如 max-content，成员使用 maxContent；preserve-3d 的成员已修正为 preserve3d。_selector/_media/custom/set 等辅助 API 不机械套用三层属性规则。
- 只有系统与 `_` 主题关键字。$ 不承担组件语义；组件仍在内部维护 widths 等普通对象，已知映射用 token，计算后的 CSS 用 raw。

### 类型、生成与悬停

| 交付          | 实现与边界                                                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 属性对象      | property.ts / CssProperty 取代可调用 Carrier，保持 StyleBuilder/StyleFactory 公开名字；方法/单位具名参数                                                                    |
| 同源 CSS 生成 | generate-css.mjs 生成 runtime 元数据、属性、系统成员和单位声明；严格值与成员别名分开，元数据去重、不放宽预算                                                                |
| 属性文档      | 用途、CSS 语法/初始值、主题类别和 MDN 链接；不再只截取 Baseline 首行。常用属性补简短中文，其余使用上游语法，不编造用途                                                      |
| 系统成员/单位 | keywords.generated.ts 和 units.generated.ts 提供静态成员说明及 px/rem/pct 等单位提示；重复成员拼写注明由属性决定                                                            |
| 内置主题文档  | generate-theme-types.mjs 从本库静态 theme.ts 生成 DefaultTokens 与直接成员说明；128 个 Token，不执行任意业务模块，不复制运行时主题                                          |
| 主题悬停      | 默认值和同类别引用可见，例如 size.panelMd 默认 36rem；不是当前 ThemeScope 的 computed value。自定义主题保留精确类型，未要求用户 typegen，也不承诺任意用户类型的逐键默认文档 |
| 组件文档      | 公开 Props/slotProps/事件/snippet 增加中文职责说明，保留原生 ComponentProps/Pick/Omit；默认配置声明使用可读的组件类型名                                                     |

TypeScript 的重映射键不会自动保留原字段 JSDoc，因此内置主题采用同源生成的直接成员声明与普通 builder 类型交叉，避免仅做漂亮的源注释但实际悬停仍只有 void。所有新增声明是类型层，浏览器没有另一份主题注册表。

### 运行时与工程简化

属性通过普通对象 Proxy 承载，不再伪装成函数。主题成员/严格参数/开放参数共用引用写入逻辑；已知系统值集合按元数据组惰性缓存，不每实例重复建立。未删除异常原子性、TokenUse/namespace 检查、动态提升、规则顺序或资源释放边界。

core 的默认 tsconfig 用于编辑器和测试，生产构建使用 tsconfig.build.json，避免源码测试缺 Node 类型，又不把 Node 全局引入浏览器构建。build-core.mjs 仅清理已核对的本包 dist，防止文件重命名后残留旧声明。

没有为重构而重写 layers.ts 的耦合生命周期：层栈、退出、滚动锁和焦点的共用状态有现成行为测试，此次只迁移属性调用与明确依赖路径。text.ts 的字素与数字草稿工具仍作为小型无状态跨域工具保留，未为了目录数量再拆一层。

### 命名与目录

- core 保持 css/theme/runtime；carrier.ts → property.ts，类型测试相应改名。生成文件仍在所属模块，测试不进入 dist。
- svelte 的表单/字段/路径/特殊值归 forms，集合/异步请求/虚拟化归 collections，DOM/交互/播报/文本归 shared，所属测试随模块移动。
- internal.ts 继续作为协议入口，公开包路径不变；不再有混合职责的 internal/ 文件夹。
- Panel.svelte → OverlayHost.svelte，准确表达上下文宿主职责；Modal/Popup 保留普通组件复用和局部样式。
- component-types.generated.ts、theme-types.generated.ts 明确为生成产物；C0/P0 改为组件名称，构建/导入/清理同步更新。

### 迁移与兼容

| 旧写法                               | 新写法               |
| ------------------------------------ | -------------------- |
| 第二层直接写系统关键字               | 第三层成员或 token   |
| 第二层直接写主题键                   | 第三层 _成员或 token |
| 第二层写 CSS 计算表达式/宽 string    | raw                  |
| 组件的有限主题键映射                 | token(widths[size])  |
| 单位方法、选择器、自定义属性辅助 API | 保持原样             |

scripts/migrate-css-calls.mjs 用 TS/Svelte AST、已知属性表和本项目 s 回调约定检查/迁移源码及内嵌夹具，默认只报告，--write 才写入；文档示例需要 --docs 显式选择。它不是任意业务仓库的无审查重构器。模糊表达式先迁 raw，明确组件联合和映射人工收紧到 token。源码检查已无第二层 CSS 调用，测试/Docs/SSR/HMR/包外示例同步迁移。

声明调用方式有破坏性变化，core/svelte/产物必须协调重建；样式序列化协议没有变化，不凭调用名称变化随意增加协议号。不保留隐形第二层调用兼容，以免补全继续存在两条入口。

### MCP/LSP 与验证

项目桥保留补全文档、编辑信息、排序/过滤与 isIncomplete，resolveLimit 最多解析 20 个返回项。增加源码/声明/配置的有限文件监听，不递归 node_modules；只读查询结束后关闭文档缓冲，避免旧快照长期覆盖磁盘依赖。所有监听器跟随自身服务进程回收，不新增独立语言服务器。

verify.mjs 已覆盖三段式严格/开放补全、系统/主题/单位/属性悬停、源组件诊断和既有错误反复检出/清零、跨 Svelte 类型、定义/引用及 500 Token。CI 新增该步骤，并上传 verification.json。新桥代码须在新的 MCP 进程加载；本轮使用独立新进程验证，不把旧会话热加载当作既成事实。

本地关键证据：core 500 Token 类型检查约 14.27 秒、531549 KiB，在既有预算内；CSS/绑定相关测试和 Svelte 编译/表单/集合/主题相关测试通过；库构建与分发预算通过。实测主题成员悬停包含 36rem，token 有严格入口说明，px 显示 value 参数。浏览器验证了布局页、Dialog 576px 面板、嵌套 Popover 和关闭后的焦点恢复；不替代 CI 三浏览器/SSR/CSP 全矩阵。

当前完整候选的 CI 结果以 GitHub 为准，推送后不等待或轮询。后续发现具体失败时修复；不能把本地关键验证表述为新候选已经通过全部生产验收。未加入新业务组件或未经需要的依赖。

推送前处理了上一轮 CI 的 Drawer 对比度失败：axe 在进入透明度动画中采到了混合色。现等待 opacity=1 且动画不再运行后检测，不关闭任何规则；对应 RTL/Portal 用例在本机 Chrome 连续三次通过。新的完整候选仍由 CI 复核 Firefox/WebKit。
