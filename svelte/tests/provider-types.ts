import type { ComponentProps } from 'svelte';
import { lightTheme, ThemeScope, type DefaultTokens } from '@zui/core';
import { StyleProvider } from '../src/index.js';

type Props = ComponentProps<typeof StyleProvider<DefaultTokens>>;
const scope = new ThemeScope(lightTheme);
const valid: Props = {
  scope,
  as: 'section',
  class: ['panel'],
  style: 'padding:7px',
  'aria-label': 'Theme',
};
const invalidTag: Props = {
  scope,
  // @ts-expect-error 容器需要 children，不能使用 void 标签。
  as: 'input',
};
// @ts-expect-error scope 是必填的调用方资源。
const missingScope: Props = {};
void [valid, invalidTag, missingScope];
scope.dispose();
