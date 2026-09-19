import { AsyncLocalStorage } from 'node:async_hooks';
import { render, type Csp } from 'svelte/server';
import type { Component } from 'svelte';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { type RuntimeOptions, type TokenSchema } from '@zui/core';
import { createStyleRuntime } from './runtime/styles.js';
import { STYLE_RUNTIME, setServerRuntimeResolver, type Runtime } from './runtime/context.js';
import { lightTheme } from './theme.js';

const requests = new AsyncLocalStorage<Runtime>();
setServerRuntimeResolver(() => requests.getStore());

export async function renderStyled<P extends Record<string, unknown>>(
  component: Component<P>,
  options: {
    props: P;
    context?: Map<unknown, unknown>;
    runtime?: RuntimeOptions<TokenSchema>;
    idPrefix?: string;
    csp?: Csp;
    transformError?: (error: unknown) => unknown | Promise<unknown>;
  },
) {
  if (options.runtime?.nonce && options.csp?.nonce && options.runtime.nonce !== options.csp.nonce)
    throw new Error('Style and render CSP nonces must match.');
  const runtime = createStyleRuntime<TokenSchema>({
    ...options.runtime,
    theme: options.runtime?.theme ?? lightTheme,
    nonce: options.runtime?.nonce ?? options.csp?.nonce,
  });
  try {
    runtime.themeStyle(':where(:root)');
    const context = new Map(options.context);
    context.set(STYLE_RUNTIME, runtime);
    const result = await render(component, {
      props: options.props,
      context,
      idPrefix: options.idPrefix,
      csp: options.csp,
      transformError: options.transformError,
    });
    return { ...result, head: result.head + runtime.styleTags() };
  } finally {
    runtime.dispose();
  }
}

export function createStyleHandle(
  options:
    | RuntimeOptions<TokenSchema>
    | ((
        event: RequestEvent,
      ) => RuntimeOptions<TokenSchema> | Promise<RuntimeOptions<TokenSchema>>) = {},
): Handle {
  return async ({ event, resolve }) => {
    const settings = typeof options === 'function' ? await options(event) : options;
    const runtime = createStyleRuntime<TokenSchema>({
      ...settings,
      theme: settings.theme ?? lightTheme,
    });
    try {
      runtime.themeStyle(':where(:root)');
      const initialRules = runtime.registry.size;
      return await requests.run(runtime, async () => {
        const placeholder = '<!--zui:styles-->';
        let inserted = false;
        let pending = '';
        const response = await resolve(event, {
          transformPageChunk: ({ html, done }) => {
            if (inserted) return html;
            pending += html;
            // head 标记可能先于正文样式到达；等页面 HTML 收集完成再一次性输出。
            // SvelteKit 在页面之后发送的延迟数据仍由下面的流透传，不在这里等待。
            if (!done) return '';
            if (!pending.includes(placeholder)) {
              throw new Error('Add <!--zui:styles--> inside app.html head.');
            }
            inserted = true;
            const result = pending.replace(placeholder, placeholder + runtime.styleTags());
            pending = '';
            return result;
          },
        });
        if (!response.body || !response.headers.get('content-type')?.includes('text/html')) {
          runtime.dispose();
          return response;
        }
        if (!inserted) {
          if (runtime.registry.size > initialRules)
            throw new Error('HTML styles require the SvelteKit page transform.');
          runtime.dispose();
          return response;
        }
        const reader = response.body.getReader();
        let closed = false;
        const finish = () => {
          if (closed) return;
          closed = true;
          event.request.signal.removeEventListener('abort', abort);
          reader.releaseLock();
          runtime.dispose();
        };
        const cancel = async (reason: unknown) => {
          try {
            await reader.cancel(reason);
          } finally {
            finish();
          }
        };
        const abort = () => {
          void cancel(event.request.signal.reason).catch(() => {});
        };
        event.request.signal.addEventListener('abort', abort, { once: true });
        if (event.request.signal.aborted) abort();
        // Response 返回不代表渲染结束；保留请求上下文直到流关闭、报错或取消。
        const body = new ReadableStream<Uint8Array>({
          async pull(controller) {
            if (closed) {
              controller.close();
              return;
            }
            try {
              const result = await requests.run(runtime, () => reader.read());
              if (result.done) {
                finish();
                controller.close();
              } else controller.enqueue(result.value);
            } catch (error) {
              finish();
              controller.error(error);
            }
          },
          cancel,
        });
        return new Response(body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      });
    } catch (error) {
      runtime.dispose();
      throw error;
    }
  };
}
