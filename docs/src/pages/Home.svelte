<script lang="ts">
  import { ArrowRight, Braces, Component, BookOpen } from '@lucide/svelte';
</script>

<p class="eyebrow">ZUI DESIGN SYSTEM</p>
<h1>从样式开始，<br /><span>构建自己的组件。</span></h1>
<p class="lead">独立的运行时样式核心、原生 Svelte 组件，以及可直接体验的文档网站。</p>
<a class="primary-link" href="#/core">了解样式系统 <ArrowRight size={17} /></a>

<section class="cards" aria-label="项目组成">
  <a class="card" href="#/core">
    <Braces size={23} />
    <h2>Core</h2>
    <p>CSS、主题与样式生命周期。动态值自动识别，减少手动声明。</p>
    <span>设计阶段 <ArrowRight size={16} /></span>
  </a>
  <a class="card" href="#/components">
    <Component size={23} />
    <h2>Svelte</h2>
    <p>围绕原生 Svelte 构建组件，统一外观、状态与交互。</p>
    <span>组件规划 <ArrowRight size={16} /></span>
  </a>
  <div class="card">
    <BookOpen size={23} />
    <h2>Docs</h2>
    <p>普通 Svelte 页面，真实可运行的示例，以及与示例一致的源码。</p>
    <span>基础站点已就绪</span>
  </div>
</section>

<section class="callout">
  <h2>当前进度</h2>
  <p>已搭建三个工作区与构建基础。样式运行时和组件仍在设计中，当前页面不代表相关能力已经实现。</p>
</section>
