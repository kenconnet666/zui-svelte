import type { Direction } from './types.js';

export interface Locale {
  readonly code: string;
  readonly dir: Direction;
  readonly messages: {
    readonly clear: string;
    readonly close: string;
    readonly loading: string;
    readonly empty: string;
    readonly retry: string;
    readonly invalid: string;
    readonly required: string;
    readonly results: (count: number) => string;
  };
}

export const zhCN: Locale = Object.freeze({
  code: 'zh-CN',
  dir: 'ltr',
  messages: Object.freeze({
    clear: '清空',
    close: '关闭',
    loading: '加载中',
    empty: '暂无数据',
    retry: '重试',
    invalid: '请输入有效值',
    required: '此项必填',
    results: (count: number) => `找到 ${count} 个结果`,
  }),
});

export const enUS: Locale = Object.freeze({
  code: 'en-US',
  dir: 'ltr',
  messages: Object.freeze({
    clear: 'Clear',
    close: 'Close',
    loading: 'Loading',
    empty: 'No results',
    retry: 'Retry',
    invalid: 'Enter a valid value',
    required: 'This field is required',
    results: (count: number) => `${count} ${count === 1 ? 'result' : 'results'}`,
  }),
});
