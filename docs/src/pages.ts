import Home from './pages/Home.svelte';
import Core from './pages/Core.svelte';
import Components from './pages/Components.svelte';
import NotFound from './pages/NotFound.svelte';
import CoreProbe from '../../svelte/tests/fixtures/CoreProbe.svelte';
import CspProbe from '../../svelte/tests/fixtures/CspProbe.svelte';
import ModuleProbe from '../../svelte/tests/fixtures/ModuleProbe.svelte';
import LifecycleProbe from '../../svelte/tests/fixtures/LifecycleProbe.svelte';
import PlainClassProbe from '../../svelte/tests/fixtures/PlainClassProbe.svelte';
import ProviderProbe from '../../svelte/tests/fixtures/ProviderProbe.svelte';

export const pages = [
  { path: '/', title: '概览', component: Home },
  { path: '/core', title: '样式系统', component: Core },
  { path: '/components', title: '组件', component: Components },
];

export const routes = {
  '/__core-test': CoreProbe,
  '/__csp-test': CspProbe,
  '/__module-test': ModuleProbe,
  '/__lifecycle-test': LifecycleProbe,
  '/__plain-class-test': PlainClassProbe,
  '/__provider-test': ProviderProbe,
  ...Object.fromEntries(pages.map((page) => [page.path, page.component])),
  '*': NotFound,
};
