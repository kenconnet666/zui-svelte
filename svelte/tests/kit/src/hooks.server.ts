import { createStyleHandle } from '@zui/svelte/server';
import type { Handle } from '@sveltejs/kit';
import { createHash } from 'node:crypto';
import { sequence } from '@sveltejs/kit/hooks';
import { runtimeOptions } from './themes';

const styles = createStyleHandle(({ url }) => runtimeOptions(url.pathname === '/custom'));
// Kit 2.70.3 自带播报节点的固定样式；只许可该上游片段，ZUI 仍不生成 style 属性。
const announcerStyle =
  'position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px';
const announcerHash = createHash('sha256').update(announcerStyle).digest('base64');
const application: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('</head>', '<meta name="zui-sequence" content="kept"></head>'),
  });
  response.headers.set('x-zui-sequence', 'kept');
  return response;
};
const composed = sequence(styles, application);
export const handle: Handle = async (input) => {
  const response = await composed(input);
  response.headers.set(
    'content-security-policy',
    "style-src-elem 'self' 'nonce-kit-probe'; style-src-attr 'unsafe-hashes' 'sha256-" +
      announcerHash +
      "'",
  );
  return response;
};
