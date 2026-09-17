<script lang="ts">
  import Router, { router } from 'svelte-spa-router';
  import { ArrowUpRight, Layers } from '@lucide/svelte';
  import { pages, routes } from './pages';

  const title = $derived(
    pages.find((page) => page.path === router.location)?.title ?? '页面不存在',
  );
</script>

<svelte:head>
  <title>{title} · ZUI</title>
</svelte:head>

<a
  class="skip-link"
  href="#main"
  onclick={(event) => {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }}>跳到正文</a
>
<div class="site">
  <aside class="sidebar">
    <a class="brand" href="#/" aria-label="ZUI 首页"><Layers size={25} /> ZUI<span>SVELTE</span></a>
    <p class="nav-label">文档</p>
    <nav aria-label="主导航">
      {#each pages as page (page.path)}
        <a href={'#' + page.path} aria-current={router.location === page.path ? 'page' : undefined}>
          {page.title}<ArrowUpRight size={15} />
        </a>
      {/each}
    </nav>
    <div class="sidebar-note">Runtime styles.<br />Native Svelte.</div>
  </aside>

  <main id="main" tabindex="-1">
    <header class="topbar">
      <span>设计系统 / {title}</span><span class="badge">基础工程</span>
    </header>
    <div class="page"><Router {routes} /></div>
    <footer>ZUI · Core &amp; Svelte<span>Built with Svelte 5</span></footer>
  </main>
</div>
