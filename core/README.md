# @zui/core

框架无关的 CSS 与主题系统工作区。已配置 TypeScript 构建、类型声明、Stylis 与 CSS 类型依赖。

已实现生成式属性/关键字载体、buildStyle、序列化、主题、作用域、规则注册、自动变量提升与全局资源回收。生成器覆盖 857 个属性。class 字符串编译接入仍在验证；下一阶段以 [首版生产可用规划](../design/core-production-plan.md) 为讨论和实施基线，历史状态见 [换机交接](../design/handoff.md)。

- 构建：`pnpm --filter @zui/core build`
- 类型检查：`pnpm --filter @zui/core check`
- 规划模块：`css/`、`theme/`、`recipe/`、`runtime/`、`preset/`，有实现后再创建。

## 统一入口与主题

样式、主题、预设和 runtime 均从 `@zui/core` 导入。下面是当前已实现的主题写法；`css()` 的组件/模块调用仍需接入 ZUI 编译插件。

```ts
import {
  createCss,
  createRuntime,
  extendTheme,
  lightTheme,
  overrideTheme,
  tokenRef,
} from '@zui/core';

const theme = extendTheme(lightTheme, {
  color: { brandText: tokenRef('color', 'primary') },
  spacing: { panelGap: '18px' },
});
const css = createCss(theme);
const alternate = overrideTheme(theme, { color: { primary: '#0f766e' } });

theme.ref('color', 'brandText'); // var(--z-color-brandText)，可用于复杂 CSS 值
alternate.resolved.color.brandText; // #0f766e
```

Token 别名只能引用同类别的已有键，覆盖后从完整定义重新解析；循环、缺失目标和类别错误会报错。`definition` 保留只读原始定义，`tokens`/`resolved` 是只读解析值。主题作用域先验证整棵子树再提交，子级别名失败不会让父级停留在半次更新状态。

`s.color._brand` 等快捷引用会记录实际 Token 需求，并在目标 runtime 使用前检查 namespace、键和值种类。仅要求实际使用的键，允许组件消费兼容主题的子集。普通 CSS 字符串及手写 var() 保留原生语义，其外部变量由宿主提供。

长度、时间、颜色等类别使用字符串，opacity/zIndex 使用数值；新增值遵守类别约束，覆盖和扩展不能改变已有 Token 的值种类。CSS 标准值的完整语法仍由浏览器解释。

宿主使用 `bindTheme(element, scope, runtime)` 可以沿用 runtime 的变量输出通道；`variables: 'stylesheet'` 时主题切换同样不写 style 属性。返回的清理函数或 scope 销毁会释放对应主题规则。

同一元素、scope 和 runtime 的重复绑定共享订阅与规则，最后一个消费者离开时释放；同一元素上同 namespace 的不同 scope/runtime 会立即报错，避免两个主题相互覆盖。嵌套主题绑定到各自的容器元素；不同 namespace 可以共存。

## 显式层级

宿主一次声明层顺序，类型化 css 入口选择所属层；未配置时保持原生无层样式。

```ts
const runtime = createRuntime({
  theme,
  layers: ['zui.components', 'zui.app'],
  layer: 'zui.app',
});
const componentCss = createCss(theme, { layer: 'zui.components' });
const plainCss = createCss(theme, { layer: null });
```

默认层作用于局部 css、普通 binding 和 global 样式，模块静态样式遵守相同规则。`null` 明确选择无层；未声明、重复或无效层名会报错。层顺序并不改变浏览器对 important 的反向优先规则，也不赋予 class 字符串从右向左覆盖语义。

同一 Document/ShadowRoot 中的独立 runtime 使用不同 namespace；也可以由多个组件共享一个 runtime。声明相同层根的 runtime 必须使用一致的完整层序。模块 class 在最终消费时会补充目标别名，以隔离不同 runtime 的样式位置；返回值和转发值仍为普通字符串。

## 自定义 Token 类别

自定义类别在应用入口显式映射到属性，类型提示与运行时使用同一份配置，嵌套规则也继承该映射。

```ts
const layoutTheme = extendTheme(theme, { layoutSpace: { card: '18px' } });
const layoutCss = createCss(layoutTheme, { tokenMap: { gap: 'layoutSpace' } });

layoutCss((s) => {
  s.gap._card;
  s._hover((s) => {
    s.gap._card;
  });
  s.padding.px(12, 16);
});
```

映射替换指定属性的默认类别，不影响它的关键字、单位和普通值调用。配置在入口创建时复制并冻结；未知属性、未知类别和已知的值种类冲突会报错。普通 CSS 值的完整语法仍由浏览器解释。
