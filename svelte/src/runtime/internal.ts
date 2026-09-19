// 编译产物协议入口；与公共业务导出隔离，避免用户依赖内部生命周期细节。
export { createStyleScope } from './scope.js';
export { readComponentConfig } from './config.js';
export { mergeProps } from './props.js';
