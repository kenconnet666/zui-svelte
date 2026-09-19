<script lang="ts" generics="T extends TokenSchema">
  import { onDestroy, untrack, type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { StyleContainerTag } from './types.js';
  import {
    hashText,
    assertThemeCompatible,
    type Theme,
    type ThemeScope,
    type TokenSchema,
    type StyleResource,
  } from '@zui/core';
  import { captureRuntime, provideStyleRuntime } from './runtime/context.js';
  import { provideThemeHost } from './runtime/theme-context.js';

  type Props = HTMLAttributes<HTMLElement> & {
    scope: ThemeScope<T>;
    as?: StyleContainerTag;
    children?: Snippet;
  };
  let { scope, as = 'div', class: className, children, ...attributes }: Props = $props();
  const id = $props.id();
  const getRuntime = captureRuntime();
  const runtime = getRuntime();
  provideStyleRuntime(runtime);
  const marker = runtime.registry.namespace + '-theme-' + hashText(id);
  provideThemeHost(() => ({ marker, dir: attributes.dir ?? undefined }));
  const selector = ':where(.' + marker + ')';
  let resource: StyleResource | undefined;
  let active: ThemeScope<T> | undefined;
  let stop = () => {};

  function install(theme: Theme<TokenSchema>): void {
    assertThemeCompatible(runtime.defaultTheme, theme);
    // 新规则先就绪再释放旧规则；校验/插入失败时保留最后有效主题。
    const next = runtime.themeStyle(selector, theme);
    const previous = resource;
    resource = next;
    previous?.dispose();
  }

  untrack(() => install(scope.theme));
  $effect.pre(() => {
    const nextScope = scope;
    const nextStop = nextScope.subscribe(install, () => {
      if (active === nextScope) {
        resource?.dispose();
        resource = undefined;
      }
    });
    const previousStop = stop;
    active = nextScope;
    stop = nextStop;
    previousStop();
  });
  onDestroy(() => {
    // SSR 规则由请求收集器统一回收，不能在输出 head 前随组件清除。
    if (typeof document === 'undefined') return;
    active = undefined;
    try {
      stop();
    } finally {
      resource?.dispose();
    }
  });

  const tag = $derived.by(() => {
    if (
      !as ||
      /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/iu.test(as)
    )
      throw new Error('StyleProvider requires a non-void HTML container.');
    return as;
  });
</script>

<svelte:element this={tag} {...attributes} class={[marker, className]}>
  {@render children?.()}
</svelte:element>
