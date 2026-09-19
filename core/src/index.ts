/** @internal 同版本编译桥与测试工具使用，不属于稳定业务合同。 */
export { buildStyle } from './css/builder.js';
/** @internal 模块编译产物协议。 */
export { createStyleModule } from './runtime/definitions.js';
/** @internal 服务端、客户端与编译产物必须使用同一协议版本。 */
export { styleProtocol } from './runtime/protocol.js';
export type { CssOptions } from './runtime/evaluation.js';
export { css, createCss } from './runtime/evaluation.js';
export { StyleError, type StyleErrorCode } from './css/errors.js';
/** @internal 仅供同版本框架编译桥使用。 */
export {
  ClassController,
  normalizeClass,
  hasCssEvaluation,
  withCssEvaluation,
} from './runtime/classes.js';
export type { StyleBuilder, StyleFactory, PropertyTokenMap } from './css/builder.js';
/** @internal 内部有序样式表示。 */
export type { StyleProgram, Instruction, Declaration, Rule } from './css/program.js';
/** @internal 输出与标识的实现工具。 */
export { serializeProgram, serializeTheme, canonicalize, hashText } from './css/serialize.js';
export { defineTheme, extendTheme, overrideTheme, tokenRef } from './theme/theme.js';
/** @internal 仅供同版本框架宿主使用。 */
export { assertThemeCompatible } from './theme/theme.js';
export { baseTheme } from './theme/base.js';
export type {
  Theme,
  ThemeOptions,
  TokenSchema,
  ThemePatch,
  TokenValue,
  ThemeDefinition,
  TokenReference,
} from './theme/types.js';
export { createRuntime } from './runtime/runtime.js';
export type { StyleRuntime, RuntimeOptions, RuntimeStats } from './runtime/runtime.js';
/** @internal 宿主通过 runtime.binding() 获取实例，不直接构造。 */
export { StyleBinding } from './runtime/binding.js';
export type { StyleSnapshot, BindingOptions } from './runtime/binding.js';
export { bindElement } from './runtime/element.js';
export { MemoryStyleSheet, BrowserStyleSheet } from './runtime/sheet.js';
export type { StyleSheet, StyleEntry } from './runtime/sheet.js';
export { ThemeScope, themeVariables, bindTheme } from './theme/scope.js';
export type {
  StyleResource,
  AnimationResource,
  PropertyRegistration,
} from './runtime/resources.js';
