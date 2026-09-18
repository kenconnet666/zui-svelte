import { createStyleHandle } from '@zui/svelte/server';
import type { Handle } from '@sveltejs/kit';

const styles = createStyleHandle({ variables: 'stylesheet', nonce: 'kit-probe' });
export const handle: Handle = async (input) => {
  const response = await styles(input);
  response.headers.set(
    'content-security-policy',
    "style-src-elem 'self' 'nonce-kit-probe'; style-src-attr 'none'",
  );
  return response;
};
