import { AsyncLocalStorage } from 'node:async_hooks';
import { render } from 'svelte/server';
import type { Component } from 'svelte';
import { createRuntime, type RuntimeOptions, type TokenSchema } from '@zui/core';
import { STYLE_RUNTIME, setServerRuntimeResolver, type Runtime } from './runtime/context.js';

const requests = new AsyncLocalStorage<Runtime>();
setServerRuntimeResolver(() => requests.getStore());

export async function renderStyled<P extends Record<string, unknown>>(
  component: Component<P>,
  options: { props: P; context?: Map<unknown, unknown>; runtime?: RuntimeOptions<TokenSchema> },
) {
  const runtime = createRuntime<TokenSchema>(options.runtime);
  runtime.themeStyle(':where(:root)');
  const context = new Map(options.context);
  context.set(STYLE_RUNTIME, runtime);
  try {
    const result = await render(component, { props: options.props, context });
    return { ...result, head: result.head + runtime.styleTags() };
  } finally {
    runtime.dispose();
  }
}

export function createStyleHandle(options: RuntimeOptions<TokenSchema> = {}) {
  return async <E>({
    event,
    resolve,
  }: {
    event: E;
    resolve: (event: E) => Promise<Response>;
  }): Promise<Response> => {
    const runtime = createRuntime<TokenSchema>(options);
    try {
      return await requests.run(runtime, async () => {
        const response = await resolve(event);
        if (!response.headers.get('content-type')?.includes('text/html')) return response;
        const html = await response.text();
        if (runtime.registry.size) runtime.themeStyle(':where(:root)');
        const placeholder = '<!--zui:styles-->';
        if (runtime.registry.size && response.status < 400 && !html.includes(placeholder))
          throw new Error('Add <!--zui:styles--> inside app.html head.');
        const headers = new Headers(response.headers);
        headers.delete('content-length');
        headers.delete('etag');
        return new Response(html.replace(placeholder, runtime.styleTags()), {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      });
    } finally {
      runtime.dispose();
    }
  };
}
