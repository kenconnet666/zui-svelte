import { createCss, defineTheme } from '@zui/core';

export const theme = defineTheme({ color: { brand: '#0f766e' } }, { namespace: 'probe' });
export const css = createCss(theme);
