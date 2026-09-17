# Core 类型生成与主题设计

状态：生产目标下的讨论稿，2026-09-17。本文 API 尚未实现，最终命名和泛型需要类型原型验证。

已确认：默认静态，检测变化后自动提升，不分析响应式来源；首版支持 SSR。类型生成是本库构建时生成元数据；class 绑定编译是另一条工具链，后者补齐内联变量与 SSR，并不分析使用者响应式表达式的来源。

## 1. 类型与运行时必须描述同一套能力

不能出现：

- IDE 提示 s.display.inlineFlex，但运行时不知道如何序列化。
- 类型允许 s.width.fr(1)，浏览器却不接受 width:1fr。
- 类型看到自定义 Token，实际主题却没有值。
- 同名关键字与 Token 因 Proxy 分支优先级不同发生歧义。
- 文档声称支持某个属性，生成器升级后已经移除或改名。

目标是一份版本明确、可审阅的 metadata，同时驱动公开类型、运行时处理与文档数据。

## 2. 生成器输入与输出

输入：

1. 锁定版本的 csstype，提供标准、SVG、厂商属性与值类型、关键字和 JSDoc 的主要依据。
2. ZUI 自有受控补充元数据，描述单位能力、参数个数、Token 分类、关键字别名、简写关系及优化限制。
3. 单位定义表、Token 类别定义表和全局关键字表。

csstype 是类型数据，不是完整的 CSS 值语法解析器。不能从出现 number 或 string 就猜出所有单位、合法范围和简写语义。

生成流程候选：

```text
csstype + ZUI property overrides + unit/token definitions
                         ↓
               TypeScript AST / TypeChecker
                         ↓
                  normalized metadata
                         ↓
       generated carriers / runtime table / docs facts
```

使用已安装的 TypeScript 编译器 API，避免正则解析 .d.ts。生成器版本与 TypeScript 版本绑定升级，API 改动要单独验证。

输出建议：

- core/src/css/properties.generated.ts：公开 carrier 类型与必要导出。
- core/src/css/metadata.generated.ts：精简运行时属性表。
- docs 使用的能力清单：由同一结果输出或构建期导入，不手写第二份支持矩阵。

元数据输入可以按 layout、typography、paint、motion 等职责分组，只有数据规模需要时才拆。生成物集中，不创建每属性一个目录。

生成工具初期放根 scripts，组件/主题不会再拆成额外 workspace。

## 3. 生成过程的稳定性

- 离线生成：读取锁文件已经安装的依赖，不在生成时抓网站。
- 输出排序稳定，禁止当前时间戳、绝对路径、机器环境等进入生成内容。
- 输入摘要记录 csstype 版本、ZUI schema 版本和 generator 版本。
- 提供 generate 与 generate:check：check 模式比较预期结果，不直接覆写。
- 生成物提交仓库，正常使用者安装包不运行生成器。
- CI 检查源码 metadata、生成类型与运行时表一致。
- 升级 csstype 时输出新增、删除、关键字及类型变化差异，不能默默扩大所有 API。
- 保留上游来源与许可证信息，文档兼容性描述不能伪装成当前浏览器实测。
- 生成器碰到未知类别、冲突别名或无法解析的结构应显式失败或列入待处理清单，不能偷偷转成 any。

## 4. 属性载体的四类写法

```ts
s.display.flex;
s.width.px(240);
s.color._primary;
s.gridTemplateColumns('repeat(3, minmax(0, 1fr))');
```

| 写法         | 类型来源                | 运行时含义           |
| ------------ | ----------------------- | -------------------- |
| keyword 属性 | 属性关键字元数据        | 记录标准 CSS 值      |
| 单位方法     | 单位类别 + 属性参数约束 | 规范化单位后记录     |
| _token 属性  | 当前主题对应类别的键    | 记录稳定主题变量引用 |
| 属性函数调用 | csstype 对应属性值类型  | 记录普通 CSS 值      |

声明结束返回 void，不引导使用者链式写 s.color.red.padding...。嵌套 builder 回调统一命名为 s。

全局关键字 inherit、initial、unset、revert、revertLayer 有独立元数据；revertLayer 序列化为 revert-layer。

关键字与 Token 的命名空间分开：标准关键字无下划线，Token 使用 _ 前缀。保留辅助方法名与特殊对象键不能被生成表覆盖。未知属性读取在开发模式报出可定位错误；不得因为 Proxy 存在就把所有键当成合法声明。

标准与 SVG 属性提供完整的基础调用形式；明确支持的标准关键字生成对应访问器。厂商属性保留上游类型与标记；废弃属性需标注，不伪装成推荐 API。增强的单位/Token 快捷能力只在元数据确定时提供，其他属性仍可使用标准值调用。

## 5. 单位不能统一套用

| 属性                | 允许示意                                    | 不允许示意                       |
| ------------------- | ------------------------------------------- | -------------------------------- |
| width               | px/rem/pct/vw 等长度或百分比；auto 等关键字 | fr、ms、px(1,2)                  |
| gap                 | 一个或两个合法间距值                        | px(1,2,3)                        |
| padding             | 一到四个长度/百分比值                       | 五个值                           |
| opacity             | number、合法百分比等对应值                  | px                               |
| transitionDuration  | ms、s                                       | px                               |
| rotate              | 角度值及标准表达形式                        | rem                              |
| gridTemplateColumns | 完整轨道定义                                | 不把 fr 变成所有长度属性通用能力 |

普通调用默认采用 csstype 的标准长度语义：0 可以无单位；width(12) 不应悄悄解释成 12px。明确单位用 width.px(12)。

重复值、列表与 fallback 是不同概念：

- padding.px(4,8) 是一条简写声明的两个值。
- 连续调用同属性是有序的多条声明。
- 逗号分隔的动画/背景列表不与前两者混淆。

数值必须拒绝 NaN/Infinity。负值是否合法属于属性语义，不能把所有长度都一律钳制为正数。

不能承诺 TypeScript 验证任意 CSS 字符串的完整语法。严格 carrier 捕获常见错误，复杂 CSS 字符串仍需 runtime/browser 检查。

## 6. escape hatch 与类型严格性

- 已知属性继续使用其对应值类型。
- 自定义属性使用显式入口，如 s.custom('--app-progress', value)，不能在整个 builder 上开放 string 索引签名。
- 未来标准但上游尚未提供的属性可经显式 raw/set 入口，运行时保守处理。
- raw 只放宽值表达，不绕过选择器作用域、字符串转义、错误报告和生命周期。
- 动态原始字符串不能按分号拆分为多条声明；值 API 应保持单个声明值的边界。
- 类型逃生入口必须在文档中可辨认，避免把所有输入都变成 string | any。

## 7. Token 的属性类别约束

属性 metadata 声明接受哪些 Token 类别：

| 属性                              | 候选 Token 类别 |
| --------------------------------- | --------------- |
| color/backgroundColor/borderColor | color           |
| gap/padding/margin                | spacing         |
| width/height                      | size            |
| borderRadius                      | radius          |
| fontSize                          | fontSize        |
| fontWeight                        | fontWeight      |
| lineHeight                        | lineHeight      |
| transitionDuration                | duration        |
| boxShadow                         | shadow          |
| zIndex                            | zIndex          |

不是所有数值 Token 都能用在所有数值属性上。s.gap._primary 应报错，即使 primary 的运行时值碰巧是可解析字符串。

同属性允许多个类别时要检测同名 Token 冲突，不能依赖声明顺序决定选哪个类别。可以用更明确的 token 路径入口处理歧义，不把所有类别扁平化成任意 string。

新增自定义 Token 类别，需要同时声明该类别与属性的映射。只增类型却没有 runtime mapping 不算完成。

## 8. 类型验收与 IDE 成本

除了合法示例，还必须有 @ts-expect-error 或等价的负向类型用例：

- 未知 CSS 属性、错误关键字。
- 错误单位、错误参数个数。
- 不存在的 Token、类别错误的 Token。
- 扩展 Token 后保留基础 Token。
- recipe 选项、compound 条件、slotProps 子项名称错误。
- 属性转发时的事件、ARIA 与 ref 类型。
- 包外消费生成后的 .d.ts，不靠仓库内路径映射通过。
- Svelte 模板中的推导，不仅普通 .ts 文件里的推导。

避免把所有 CSS 属性 × 所有 Token × 所有选择器组合成巨大模板字面量联合。常规属性显式生成、Token 在属性类别内局部映射；深层泛型限制递归范围。

用真实主题扩展和 Select 参数规模测量 TypeScript 检查耗时与 IDE 补全体验。类型复杂度属于生产成本，不以更长泛型换取表面的“自动一切”。

## 9. 主题的职责分层

推荐三层：

1. 种子与基础尺度：品牌色、间距尺度、字体、圆角等输入。
2. 语义 Token：primary、surface、text、border、focus、controlHeight 等。
3. 组件 Token：button、input、select 等具体组件参数，定义在组件库。

core 提供主题定义/扩展/解析/变量输出机制。基础主题预设可以放 core/preset；具体组件表与配方放 svelte，不让 core 反向依赖组件。

首版主题类别至少覆盖 color、spacing、size、radius、fontFamily、fontSize、fontWeight、lineHeight、letterSpacing、borderWidth、shadow、duration、easing、zIndex、breakpoint。类别的命名仍需一次统一，不能混用 space/spacing、size/sizes。

## 10. 主题表示的选择

| 方案                               | 优点                                        | 代价                                          |
| ---------------------------------- | ------------------------------------------- | --------------------------------------------- |
| 普通对象 + defineTheme/extendTheme | 序列化、SSR、类型检查和 diff 直接           | 方法以函数形式表达                            |
| Theme 类                           | 可以 theme.extend()/resolve()，封装缓存方便 | 容易把原始 schema、解析值和方法混在一个对象上 |
| Token 引用对象图                   | 别名与依赖关系明确                          | API 和类型复杂度更高                          |

推荐以不可变的主题定义对象为主。runtime 的解析缓存放管理器，不把原始值与解析值用类型断言伪装成同一个对象。若最终偏好 Theme 类，也应保持 definition/resolved 两种类型分离。

候选示例：

```ts
const appTheme = extendTheme(baseTheme, {
  color: {
    primary: '#4f46e5',
    brandAccent: '#0f766e',
  },
  spacing: {
    panelGap: '18px',
  },
});
```

长度类 Token 带明确单位，duration 使用 ms/s 字符串；opacity、fontWeight、zIndex 等保留适合的数值类型。不要让 spacing:8 在不同调用点悄悄变成 px/rem。

具体颜色与尺寸是示例，最终默认主题要经过视觉与无障碍检查。

## 11. 改已有值与扩展新键

建议区分两个明确操作：

- overrideTheme(theme, patch)：只允许修改已有 Token，键集合不变。
- extendTheme(theme, extension)：允许增加 Token 或类别，返回类型包含新键。

二者均不修改原主题。合并按类别和 Token 做右侧覆盖，不能用简单 A & B 表示值覆盖：同一 key 的两个字符串字面量交叉可能成为 never。

保留 Token 名字面量用于补全；可覆盖的值类型应适度归一化，不把 primary 永久限制为最初的 '#4f46e5'。

undefined 表示未覆盖。必需 Token 不用 null 表示删除；组件对必需 Token 的依赖必须得到保证。真正删除或改名属于主题 schema 变更，不混入普通切换。

首版需要验证：修改基础 Token、增加自定义 Token、嵌套 override、同名类型冲突、light/dark 键集合一致，以及运行时发现缺失必需值时的错误定位。

## 12. 主题扩展如何传播到 CSS 类型

运行时 Provider 不能自动改变 TypeScript 在调用点看到的泛型。这个问题必须显式设计。

| 路径                              | 使用体验                     | 边界                                               |
| --------------------------------- | ---------------------------- | -------------------------------------------------- |
| 在样式定义中显式携带 theme/schema | 局部推导最直接               | 多写一次绑定                                       |
| 应用级创建 typed css 入口         | 初始化一次，后续全部正常补全 | 要通过应用统一入口导入                             |
| module augmentation               | 整个应用隐式得到自定义 Token | 全局影响，类型不能证明某个局部 Provider 真有这些值 |

推荐应用级 typed css 入口作为主路径，默认库自带基础主题类型；module augmentation 可以作为可选便利机制，不强制每个应用修改 .d.ts。

候选示意：

```ts
const { css, Provider } = createStyling(appTheme);
```

此处的 createStyling 只定义类型化入口与默认主题，不创建全局共享的 DOM registry 或 SSR 请求状态。每个 Provider/请求仍持有独立 runtime。

随后 s.color._brandAccent、s.gap._panelGap 能有补全。组件仍可消费默认主题的最小约束，不能要求调用者的扩展 schema 精确等于内置 schema。

名称与类型形状待原型验证；不能在文档中假定 context 的运行时值天然能提供编译期类型推导。

## 13. 别名、派生值与更新顺序

建议把派生过程做成显式的确定性步骤：

```text
种子 + scheme/density 等轴
  → 派生语义默认值
  → 应用语义覆盖
  → 从最终语义值派生组件默认值
  → 应用组件覆盖
  → 校验并输出解析主题
```

修改种子会重新运行派生逻辑。直接覆盖某个最终语义 Token 默认只改该 Token，不自动猜测所有相关 hover/active/onColor 应如何变化；联动应定义在派生规则或明确的别名中。

别名可以使用可校验的引用描述，避免手写 CSS 变量字符串作为唯一真相。引用图需检测不存在的目标、类别不兼容与循环依赖。

普通复杂派生推荐纯主题工厂函数，在输入变化时重新求值。不要先推出任意 per-token 函数及隐式求值顺序，再依靠 getter 副作用“碰巧”解决依赖。

JS 色彩计算使用解析后的颜色值；CSS Token 引用使用 var(...)。二者需要不同表示，不能把 var(--primary) 直接传入普通颜色库当作已解析颜色。

颜色计算工具根据所需色彩空间与算法选择。没有确认算法前不把某个依赖的简单 lighten/darken 当作完整主题算法。

## 14. 多主题与偏好轴

建议分离：

- brand：品牌种子或品牌主题定义。
- scheme：light/dark/system 的选择；resolvedScheme 必须明确为 light/dark。
- density：comfortable/compact 等，影响控件尺寸与间距。
- contrast：normal/more 等，影响对比与边界。
- motion：full/reduced/system，组件动画需要实际响应。
- direction：ltr/rtl，与逻辑属性及浮层定位配合。

不为所有轴的笛卡尔积复制一套主题文件。预设主题也不等于只改一个背景颜色。

首版至少提供完整 light/dark 与必要的紧凑密度、减少动画策略，并验收高对比/forced-colors 的可用性。其他视觉品牌可以增加，不能用主题数量代替状态覆盖质量。

Token 值切换尽量更新主题作用域，不让所有组件重新生成 class。只有组件 JS 确实读取解析值参与结构计算时，才需要重算对应样式。

## 15. CSS 变量命名与主题作用域

变量名来自库命名空间、schema 路径与必要的版本，不包含当前主题值。否则切暗色就会使所有引用变化。

- 路径编码必须无歧义；a-b.c 与 a.b-c 不能在简单拼接后碰撞。
- SSR 与客户端使用相同编码。
- 多版本或不同 schema 的库共存需要命名空间隔离。
- 自定义 CSS 变量与内部自动提升变量用不同命名区域。
- theme 变量可继承；元素动态变量属于具体绑定，不能混为一类。

每个 Provider 持有自己的主题作用域。嵌套主题从父级有效主题叠加覆盖；父主题更新时，未被覆盖的部分继续更新。

首版优先输出清楚的完整有效主题变量集，以保证嵌套覆盖与 SSR 一致。后续是否只输出差异可作为优化，但不能改变覆盖合同。

这里的“完整”是 Provider 范围内完整变量，不是把全部主题变量重复写到每个组件元素上。

## 16. Portal、ShadowRoot 与主题

Portal 到 body 时丢失原 DOM 祖先的变量继承。需要将有效主题作用域传递到 popup/overlay 的主题容器，不能只依靠 Svelte context 就认为 CSS 已继承。

ShadowRoot 内规则使用独立 registry；主题可从 host 继承或在 shadow 内建立明确作用域，按集成方式验证。

多个 Provider 同时存在时不能共用可变全局主题。服务端两个并发请求的品牌或 scheme 也不能互相污染。

Provider 卸载、Portal 延迟退出、HMR 时，需要释放对应主题样式引用，不能留下孤立 scope 规则。

## 17. SSR 首屏主题

服务端需要得到确定的 resolvedScheme，来源可为 cookie、请求参数或应用明确默认值。服务器无法凭空知道浏览器系统偏好。

system 模式的首屏策略必须说明：

- 无脚本方案：预输出 light/dark 的媒体规则，但读取 scheme 的 JS 逻辑要考虑两端一致。
- 客户端提前选择方案：应用集成提供符合 CSP 的初始化逻辑。
- 显式服务端方案：服务器按已有偏好渲染，客户端接管同一个值，再处理后续系统变化。

不直接承诺所有部署场景零闪烁；首版要提供可实现无闪烁的明确集成方式，并在 SvelteKit fixture 里验证。

hydrate 前不能因为客户端初始偏好与服务器不同而重建全部结构。主题变量收集、选择器标记和 JS context 的初始值需一致。

## 18. 组件 Token 与样式参数的界限

Token 表达稳定的设计决策：控件高度、语义色、焦点环、圆角、层级等。
组件 props 表达实例状态与业务选择：disabled、loading、selected、size、variant 等。
class 表达根元素样式；slotProps 转发子元素/组件参数、class 与 style。每个 css() 都独立返回字符串。
临时拖动位置、测量宽度、滚动进度等不强行加入主题。

组件 Token 的默认值从全局语义 Token 派生；应用可以覆盖。避免每个组件复制一套完全独立的全局颜色，也避免所有组件只共用一个没有语义的 spacing.small。

主题覆盖顺序与实例 css 的层叠合同必须配套，见 core-composition.md。

## 19. 发布与验收

类型生成：

- 同一输入生成字节稳定输出。
- 属性类型、关键字、单位与运行时序列化逐项对照。
- 上游升级差异可审阅。
- 真正包外 TypeScript/Svelte 消费与编辑器补全可用。
- 标准属性支持不因为快捷方法未覆盖而完全缺失。

主题：

- 基础/扩展/覆盖类型均正确。
- 必需 Token 缺失与循环引用有明确错误。
- light/dark/density/motion 切换不泄漏规则。
- 嵌套、Portal、ShadowRoot、SSR 并发请求隔离。
- 颜色对比、焦点、disabled、错误、选中、forced-colors、减少动画都有真实组件验收。
- Token 更新不造成与主题无关的组件重复生成规则。

首版发布必须通过类型、runtime、真实浏览器与外部包消费四类验证。文档展示与开发环境编译成功不能替代这些验证。

## 20. 需要继续选择的内容

1. 普通对象主题还是 Theme 类；推荐对象与独立解析结果。
2. 应用级 typed css 工厂还是 module augmentation 作为主入口；推荐前者。
3. 单位数值是否始终显式；推荐长度使用单位方法、主题长度使用带单位值。
4. 自定义 Token 类别是否首版开放；若开放必须带属性映射及类型/runtime 一致校验。
5. 主题派生与别名是否以确定性工厂 + 可校验引用为主，避免任意隐式 per-token getter 图。

## 21. 来源

- [CSSType](https://github.com/frenic/csstype)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [TypeScript declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
- [Ant Design 主题与 Token](https://ant.design/docs/react/customize-theme/)
- [MUI CSS 主题变量](https://mui.com/material-ui/customization/css-theme-variables/overview/)
- [CSS Properties and Values API](https://www.w3.org/TR/css-properties-values-api-1/)
- 本地参考：zui-old/scripts/generate-properties.mjs、packages/core/src/types/carrier.ts、packages/core/src/theme/types.ts。参考已有经验，不复制通用 fr 单位或简单类型交叉等不适合新合同的细节。

## 22. class 字符串与 slotProps 的类型补充

- css() 返回原始 string，可带 erased brand，但用户不需要 StyleHandle 或 parts 对象。
- Svelte 组件 class 接受 ClassValue，不限制为 ZUI 自己的字符串类型。
- slotProps 的 DOM 子项使用相应 HTML/SVG 属性，子组件子项使用 ComponentProps，排除明确的受控项。
- 重复项子项可为普通 TS 工厂函数，参数从组件 item 泛型与公开状态推导。
- slotProps 不使用 Record<string, any>；类型需要验证 class 数组/对象、原生 style 和事件参数。
- 应用级 createStyling 若保留，其 css 返回的仍是 string；编译集成需要识别该入口或通过最终 class 消费协议接入，不能让类型化封装绕过变量桥接。
- 类型生成器、class 绑定编译器和 runtime 版本合同分别验证；不能仅靠 d.ts brand 恢复实例变量。
