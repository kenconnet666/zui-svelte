<script lang="ts">
  import CodeBlock from '../ui/CodeBlock.svelte';
  import ThemePreview from '../ui/ThemePreview.svelte';

  const example = 'css((s) => {\n  s.width.px(width);\n  s.color._text;\n});';
</script>

<p class="eyebrow">FOUNDATION</p>
<h1>样式系统</h1>
<p class="lead">静态规则可以共享，变化的值属于元素自身。</p>
<section class="article">
  <h2>运行时自动提升</h2>
  <p>
    同一绑定的普通值初次保持静态，变化后在安全条件下提升为 CSS
    变量。使用者继续编写普通样式，无需动态值标记；不满足安全条件时保留完整规则。
  </p>
  <CodeBlock code={example} />
  <p class="caption">返回值为普通 class 字符串；组件需要接入 ZUI 编译插件。</p>
  <h2>真实主题容器</h2>
  <p>各偏好通过普通函数组合，局部主题由 StyleProvider 输出；系统减少动画偏好使用 CSS 媒体条件。</p>
  <ThemePreview />
  <h2>职责边界</h2>
  <ul>
    <li>Core 管理 CSS 描述、主题、规则共享、变量提升与样式回收。</li>
    <li>Svelte 负责响应式订阅、DOM 绑定和组件生命周期。</li>
    <li>结构变化重新匹配规则；值变化尽量只更新元素的 CSS 变量。</li>
  </ul>
  <h2>验收边界</h2>
  <p>
    Core 已完成既定首版验收，支持范围与候选证据见仓库 .design/core-acceptance.md。组件库 API
    正在单独讨论，尚未作为完整组件库交付。
  </p>
</section>
