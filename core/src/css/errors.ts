export type StyleErrorCode =
  | 'css.value'
  | 'css.selector'
  | 'css.layer'
  | 'theme.invalid'
  | 'theme.namespace'
  | 'theme.token'
  | 'theme.reference'
  | 'runtime.context'
  | 'runtime.protocol';

/** 可按 code 处理的输入/接入错误；用户 factory 与后端异常保留其原对象。 */
export class StyleError extends Error {
  constructor(
    readonly code: StyleErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'StyleError';
  }
}
