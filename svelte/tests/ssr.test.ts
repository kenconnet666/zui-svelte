import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createServer, type ViteDevServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { Component } from 'svelte';
import { fileURLToPath } from 'node:url';
import { zui } from '../src/compiler/preprocess.js';
import type { RequestEvent } from '@sveltejs/kit';

let server: ViteDevServer;
beforeAll(async () => {
  const root = fileURLToPath(new URL('../', import.meta.url));
  server = await createServer({
    root,
    configFile: false,
    plugins: [
      zui({ root, cssModules: ['@zui/core', '@zui/svelte', './styling.js'] }),
      svelte({ configFile: false }),
    ],
    resolve: { conditions: ['zui-source', 'node'] },
    ssr: {
      noExternal: ['@zui/core', '@zui/svelte'],
      resolve: { conditions: ['zui-source', 'node'] },
    },
    server: { middlewareMode: true, hmr: false, watch: null },
  });
}, 30000);
afterAll(async () => {
  await server?.close();
});

describe('compiled SSR', () => {
  it('isolates themes, nonces and rules across 100 interleaved handle requests', async () => {
    const { default: Probe } = await server.ssrLoadModule('/tests/fixtures/CoreProbe.svelte');
    const { createStyleHandle } = await server.ssrLoadModule('/src/server.ts');
    const { render } = await server.ssrLoadModule('svelte/server');
    const { MemoryStyleSheet, lightTheme, overrideTheme } = await server.ssrLoadModule('@zui/core');
    const sheets = Array.from({ length: 100 }, () => new MemoryStyleSheet());
    const handle = createStyleHandle(async (event: RequestEvent) => {
      const index = Number(new URL(event.request.url).searchParams.get('index'));
      await Promise.resolve();
      return {
        sheet: sheets[index],
        namespace: 'request-' + index,
        nonce: 'nonce-' + index,
        theme: overrideTheme(lightTheme, {
          color: { primary: '#' + index.toString(16).padStart(6, '0') },
        }),
      };
    }) as ReturnType<typeof import('../src/server.js').createStyleHandle>;
    const responses = await Promise.all(
      sheets.map((_sheet, index) =>
        handle({
          event: { request: new Request('https://example.test/?index=' + index) } as RequestEvent,
          resolve: async (_event, options) => {
            // 先让所有请求进入，再经过实际 Svelte 渲染读取 ALS runtime。
            await Promise.resolve();
            const rendered = await render(Probe, { props: { initialWidth: index + 100 } });
            const html = await options!.transformPageChunk!({
              html:
                '<head><!--zui:styles-->' +
                rendered.head +
                '</head><body>' +
                rendered.body +
                '</body>',
              done: true,
            });
            return new Response(html, { headers: { 'content-type': 'text/html' } });
          },
        }),
      ),
    );
    const pages = await Promise.all(responses.map((response) => response.text()));
    for (const [index, html] of pages.entries()) {
      expect(html).toContain('width:' + (index + 100) + 'px;');
      expect(html).toContain('--z-color-primary:#' + index.toString(16).padStart(6, '0'));
      expect(new Set([...html.matchAll(/data-zui="([^"]+)"/gu)].map((match) => match[1]))).toEqual(
        new Set(['request-' + index]),
      );
      expect(new Set([...html.matchAll(/nonce="([^"]+)"/gu)].map((match) => match[1]))).toEqual(
        new Set(['nonce-' + index]),
      );
      expect(sheets[index].entries()).toHaveLength(0);
    }
  });
  it('collects setup and derived snapshots with server subscriptions disabled', async () => {
    const { default: Probe } = await server.ssrLoadModule('/tests/fixtures/LifecycleProbe.svelte');
    const { renderStyled } = await server.ssrLoadModule('/src/server.ts');
    const result = await renderStyled(Probe, { props: {} });
    expect(result.body).toContain('derived snapshot');
    expect(result.head).toContain('width:100px');
  });
  it('collects cached module snapshots for every request without request-global rules', async () => {
    const { default: Probe } = await server.ssrLoadModule('/tests/fixtures/ModuleProbe.svelte');
    const { renderStyled } = await server.ssrLoadModule('/src/server.ts');
    const [a, b] = await Promise.all([
      renderStyled(Probe, { props: {} }),
      renderStyled(Probe, { props: {} }),
    ]);
    expect(a.body).toContain('z-m-');
    expect(a.head).toContain('width:173px');
    expect(b.head).toContain('width:173px');
    expect(a.head).toContain('width:193px');
    expect(b.head).toContain('width:193px');
    expect(a.body).toBe(b.body);
  });
  it('preserves a typed CSS entry in setup snapshots and template evaluation', async () => {
    const { default: Probe } = await server.ssrLoadModule('/tests/fixtures/TypedProbe.svelte');
    const { renderStyled } = await server.ssrLoadModule('/src/server.ts');
    const { theme } = await server.ssrLoadModule('/tests/fixtures/styling.ts');
    const result = await renderStyled(Probe, { props: {}, runtime: { theme } });
    expect(result.head).toContain('color:var(--probe-color-brand)');
    expect(result.head).toContain('background-color:var(--probe-color-brand)');
    expect(result.head).toContain('--probe-color-brand:#0f766e');
    expect(result.head).toContain('gap:var(--probe-layout-space)');
  });
  it('renders independent requests with collected styles and ordinary class strings', async () => {
    const { default: Probe } = (await server.ssrLoadModule('/tests/fixtures/CoreProbe.svelte')) as {
      default: Component<{ initialWidth?: number }>;
    };
    const { renderStyled } = (await server.ssrLoadModule(
      '/src/server.ts',
    )) as typeof import('../src/server.js');
    const [a, b] = await Promise.all([
      renderStyled(Probe, { props: { initialWidth: 120 } }),
      renderStyled(Probe, { props: { initialWidth: 220 } }),
    ]);
    expect(a.body).toContain('data-testid="direct"');
    expect(a.head).toContain('width:120px;');
    expect(a.head).not.toContain('width:220px;');
    expect(b.head).toContain('width:220px;');
    expect(b.head).not.toContain('width:120px;');
    expect(a.head).toContain('data-z-ssr');
    expect(a.body).not.toContain('--z-b-');
  }, 30000);
});
