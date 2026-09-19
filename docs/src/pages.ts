import Home from './pages/Home.svelte';
import NotFound from './pages/NotFound.svelte';
import { wrap } from 'svelte-spa-router/wrap';

export const pages = [
  {
    path: '/overlays',
    title: '定位与浮层',
    component: wrap({ asyncComponent: () => import('./pages/Overlays.svelte') }),
  },
  {
    path: '/layout',
    title: '布局与滚动',
    component: wrap({ asyncComponent: () => import('./pages/Layout.svelte') }),
  },
  { path: '/', title: '概览', component: Home },
  {
    path: '/core',
    title: '样式系统',
    component: wrap({ asyncComponent: () => import('./pages/Core.svelte') }),
  },
  {
    path: '/components',
    title: '组件',
    component: wrap({ asyncComponent: () => import('./pages/Components.svelte') }),
  },
  {
    path: '/values',
    title: '领域值',
    component: wrap({ asyncComponent: () => import('./pages/Values.svelte') }),
  },
];

export const routes = {
  '/__interaction-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/InteractionProbe.svelte'),
  }),
  '/__infrastructure-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/InfrastructureProbe.svelte'),
  }),
  '/__layer-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/LayerProbe.svelte'),
  }),
  '/__layers-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/LayersProbe.svelte'),
  }),
  '/__form-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/FormProbe.svelte'),
  }),
  '/__config-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/ConfigProbe.svelte'),
  }),
  // 回归夹具只在对应路径加载；同样通过包公开入口消费，不复制库实现。
  '/__core-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/CoreProbe.svelte'),
  }),
  '/__csp-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/CspProbe.svelte'),
  }),
  '/__module-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/ModuleProbe.svelte'),
  }),
  '/__lifecycle-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/LifecycleProbe.svelte'),
  }),
  '/__plain-class-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/PlainClassProbe.svelte'),
  }),
  '/__provider-test': wrap({
    asyncComponent: () => import('../../svelte/tests/fixtures/ProviderProbe.svelte'),
  }),
  '/__preferences-test': wrap({ asyncComponent: () => import('./ui/ThemePreview.svelte') }),
  ...Object.fromEntries(pages.map((page) => [page.path, page.component])),
  '*': NotFound,
};
