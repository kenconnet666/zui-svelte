import { createCss, defineTheme } from '@zui/core';

export const theme = defineTheme(
  { color: { brand: '#0f766e' }, layout: { space: '18px' } },
  { namespace: 'probe' },
);
export const css = createCss(theme, { tokenMap: { gap: 'layout' } });
