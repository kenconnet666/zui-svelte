<script lang="ts">
  import CodeBlock from '../ui/CodeBlock.svelte';

  const example =
    '.panel {\n  width: var(--z-panel-width);\n}\n\n/* Each element owns its current value. */\n/* style="--z-panel-width: 240px" */';
</script>

<p class="eyebrow">FOUNDATION</p>
<h1>样式系统</h1>
<p class="lead">静态规则可以共享，变化的值属于元素自身。</p>
<section class="article">
  <h2>运行时自动提升</h2>
  <p>
    目标是在同一声明位置发生值变化时，自动将该值提升为 CSS
    变量。使用者继续编写普通样式，无需动态值标记。
  </p>
  <CodeBlock code={example} />
  <p class="caption">预期输出示意。自动提升机制尚未实现。</p>
  <h2>职责边界</h2>
  <ul>
    <li>Core 管理 CSS 描述、主题、规则共享、变量提升与样式回收。</li>
    <li>Svelte 负责响应式订阅、DOM 绑定和组件生命周期。</li>
    <li>结构变化重新匹配规则；值变化尽量只更新元素的 CSS 变量。</li>
  </ul>
  <h2>待讨论</h2>
  <p>公开 API、绑定方式、主题扩展与自动提升的边界正在规划。完整草案位于仓库 design/core.md。</p>
</section>
