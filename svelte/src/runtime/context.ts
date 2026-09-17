import { getAllContexts, onDestroy, setContext } from 'svelte';
import { createRuntime, type StyleRuntime, type TokenSchema } from '@zui/core';

export const STYLE_RUNTIME = Symbol.for('@zui/style-runtime');
export type Runtime = StyleRuntime<TokenSchema>;
const defaults = new WeakMap<Document, { runtime: Runtime; references: number }>();
let serverRuntime: (() => Runtime | undefined) | undefined;

export function setServerRuntimeResolver(resolve: () => Runtime | undefined): void {
  serverRuntime = resolve;
}

export function provideStyleRuntime<T extends TokenSchema>(runtime: StyleRuntime<T>): void {
  setContext(STYLE_RUNTIME, runtime);
}

export function captureRuntime(): (() => Runtime) & { assertCollected(): void } {
  const contexts = getAllContexts();
  let selected: Runtime | undefined;
  let fallback = false;
  let defaultEntry: { runtime: Runtime; references: number } | undefined;
  onDestroy(() => {
    if (fallback) selected?.dispose();
    if (defaultEntry && --defaultEntry.references === 0) {
      defaultEntry.runtime.dispose();
      defaults.delete(document);
    }
  });
  const get = () => {
    if (selected) return selected;
    selected = contexts.get(STYLE_RUNTIME) as Runtime | undefined;
    if (!selected && typeof document === 'undefined') selected = serverRuntime?.();
    if (!selected) {
      if (typeof document === 'undefined') {
        fallback = true;
        selected = createRuntime<TokenSchema>();
        return selected;
      }
      defaultEntry = defaults.get(document);
      if (!defaultEntry) {
        defaultEntry = { runtime: createRuntime<TokenSchema>({ target: document }), references: 0 };
        defaultEntry.runtime.themeStyle(':where(:root)');
        defaults.set(document, defaultEntry);
      }
      defaultEntry.references++;
      selected = defaultEntry.runtime;
    }
    return selected;
  };
  return Object.assign(get, {
    assertCollected() {
      if (fallback && selected?.registry.size)
        throw new Error('SSR styles require renderStyled() or the SvelteKit style handle.');
    },
  });
}
