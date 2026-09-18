import { describe, expect, it } from 'vitest';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { MemoryStyleSheet } from '@zui/core';
import { createStyleHandle, renderStyled } from '../src/server.js';
import type { Component } from 'svelte';

const event = () => ({ request: new Request('https://example.test/') }) as RequestEvent;

describe('SvelteKit response ownership', () => {
  it('preserves error responses and headers while inserting styles', async () => {
    const sheet = new MemoryStyleSheet();
    const handle = createStyleHandle({ sheet });
    const response = await handle({
      event: event(),
      resolve: async (_event, options) => {
        const html = await options!.transformPageChunk!({
          html: '<head><!--zui:styles--></head><body>application-error</body>',
          done: true,
        });
        return new Response(html, {
          status: 500,
          headers: { 'content-type': 'text/html', 'x-original': 'kept' },
        });
      },
    });
    expect(response.status).toBe(500);
    expect(response.headers.get('x-original')).toBe('kept');
    const body = await response.text();
    expect(body).toContain('application-error');
    expect(body).toContain('<style');
    expect(sheet.entries()).toHaveLength(0);
  });
  it('collects new CSS discovered after the head before emitting the completed page', async () => {
    const sheet = new MemoryStyleSheet();
    const handle = createStyleHandle({ sheet });
    const response = await handle({
      event: event(),
      resolve: async (_event, options) => {
        const transform = options!.transformPageChunk!;
        expect(await transform({ html: '<head><!--zui:styles--></head><body>', done: false })).toBe(
          '',
        );
        sheet.set('late', '.late{color:red}', '0');
        const html = await transform({ html: '<div class="late">late</div></body>', done: true });
        if (typeof html !== 'string') throw new Error('Expected completed page HTML.');
        expect(html).toContain('.late{color:red}');
        expect(html.indexOf('.late{color:red}')).toBeLessThan(html.indexOf('<div class="late">'));
        return new Response(html, { headers: { 'content-type': 'text/html' } });
      },
    });
    expect(await response.text()).toContain('.late{color:red}');
    expect(sheet.entries()).toHaveLength(0);
  });
  it('preserves redirects and releases resources when a render throws', async () => {
    const sheet = new MemoryStyleSheet();
    const handle = createStyleHandle({ sheet });
    const redirect = new Response(null, { status: 303, headers: { location: '/login' } });
    expect(await handle({ event: event(), resolve: async () => redirect })).toBe(redirect);
    expect(sheet.entries()).toHaveLength(0);
    await expect(
      handle({
        event: event(),
        resolve: async () => {
          throw new Error('page failed');
        },
      }),
    ).rejects.toThrow('page failed');
    expect(sheet.entries()).toHaveLength(0);
  });
  it('disposes a render runtime even when initial theme insertion fails', async () => {
    let disposed = false;
    class FailingSheet extends MemoryStyleSheet {
      override set(): void {
        throw new Error('theme insertion failed');
      }
      override dispose(): void {
        disposed = true;
        super.dispose();
      }
    }
    await expect(
      renderStyled((() => ({})) as Component, {
        props: {},
        runtime: { sheet: new FailingSheet() },
      }),
    ).rejects.toThrow('theme insertion failed');
    expect(disposed).toBe(true);
  });
  it('releases an aborted request and evaluates runtime options per request', async () => {
    const sheet = new MemoryStyleSheet();
    const abort = new AbortController();
    const requestEvent = {
      request: new Request('https://example.test/', { signal: abort.signal }),
    } as RequestEvent;
    let calls = 0;
    const handle = createStyleHandle((received) => {
      expect(received).toBe(requestEvent);
      calls++;
      return { sheet };
    });
    const response = await handle({
      event: requestEvent,
      resolve: async (_event, options) => {
        await options!.transformPageChunk!({ html: '<!--zui:styles-->', done: true });
        return new Response(new ReadableStream(), { headers: { 'content-type': 'text/html' } });
      },
    });
    abort.abort();
    expect((await response.body!.getReader().read()).done).toBe(true);
    expect(sheet.entries()).toHaveLength(0);
    expect(calls).toBe(1);
  });
  it('returns the shell before deferred chunks and releases styles when the stream ends', async () => {
    const sheet = new MemoryStyleSheet();
    const handle = createStyleHandle({ sheet, nonce: 'stream-test' });
    let stream: ReadableStreamDefaultController<Uint8Array>;
    const encoder = new TextEncoder();
    const response = await handle({
      event: event(),
      resolve: async (_event, options) => {
        const shell = await options!.transformPageChunk!({
          html: '<head><!--zui:styles--></head><body>shell',
          done: true,
        });
        return new Response(
          new ReadableStream({
            start(controller) {
              stream = controller;
              controller.enqueue(encoder.encode(shell));
            },
          }),
          { headers: { 'content-type': 'text/html' } },
        );
      },
    });
    expect(sheet.entries().length).toBeGreaterThan(0);
    const reader = response.body!.getReader();
    const first = await reader.read();
    expect(new TextDecoder().decode(first.value)).toContain('nonce="stream-test"');
    stream!.enqueue(encoder.encode('deferred</body>'));
    stream!.close();
    expect(new TextDecoder().decode((await reader.read()).value)).toBe('deferred</body>');
    expect((await reader.read()).done).toBe(true);
    expect(sheet.entries()).toHaveLength(0);
  });

  it('releases cancelled responses and preserves non-HTML responses', async () => {
    const sheet = new MemoryStyleSheet();
    let cancelled = false;
    const resolve: Parameters<Handle>[0]['resolve'] = async (_event, options) => {
      await options!.transformPageChunk!({ html: '<!--zui:styles-->', done: true });
      return new Response(
        new ReadableStream({
          cancel() {
            cancelled = true;
          },
        }),
        { headers: { 'content-type': 'text/html' } },
      );
    };
    const handle = createStyleHandle({ sheet });
    const response = await handle({ event: event(), resolve });
    await response.body!.cancel();
    expect(cancelled).toBe(true);
    expect(sheet.entries()).toHaveLength(0);
    const json = new Response('{}', { headers: { 'content-type': 'application/json' } });
    expect(await handle({ event: event(), resolve: async () => json })).toBe(json);
    const raw = new Response('<p>endpoint</p>', { headers: { 'content-type': 'text/html' } });
    expect(await handle({ event: event(), resolve: async () => raw })).toBe(raw);
    expect(sheet.entries()).toHaveLength(0);
  });

  it('handles split placeholders and releases failed page transforms', async () => {
    const sheet = new MemoryStyleSheet();
    const handle = createStyleHandle({ sheet });
    await expect(
      handle({
        event: event(),
        resolve: async (_event, options) => {
          expect(await options!.transformPageChunk!({ html: '<head><!--zui:', done: false })).toBe(
            '',
          );
          expect(
            await options!.transformPageChunk!({ html: 'styles--></head>', done: true }),
          ).toContain('<style');
          throw new Error('render failed');
        },
      }),
    ).rejects.toThrow('render failed');
    expect(sheet.entries()).toHaveLength(0);
  });
});
