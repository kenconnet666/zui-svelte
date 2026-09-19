import { baseTheme, extendTheme, type RuntimeOptions, type TokenSchema } from '@zui/core';
import { lightTheme } from '@zui/svelte';

export const customTheme = extendTheme(baseTheme, {
  color: { ink: '#172554', paper: '#fffdf5' },
  spacing: { gutter: '18px' },
});

// 同一夹具验证两种独立应用合同；切换 schema 时重建根所有者，不在现有 scope 上偷补键。
export function runtimeOptions(custom: boolean): RuntimeOptions<TokenSchema> {
  return {
    theme: custom ? customTheme : lightTheme,
    namespace: custom ? 'custom' : 'z',
    variables: 'stylesheet',
    nonce: 'kit-probe',
  };
}
