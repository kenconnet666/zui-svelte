// 编译产物协议入口；与公共业务导出隔离，避免用户依赖内部生命周期细节。
export { createStyleScope } from './runtime/scope.js';
export { readComponentConfig } from './runtime/config.js';
export { mergeProps } from './runtime/props.js';
export { FormController } from './forms/form.js';
export { FieldScope, captureField, provideField, captureForm, provideForm } from './forms/field.js';
export { snapshotValue, equalValue } from './forms/values.js';
export { createLayer, layerStats, type LayerHandle, type LayerOptions } from './overlays/layers.js';
export { FloatingController } from './overlays/floating.js';
export { PortalMount } from './overlays/portal.js';
export { Presence, animateElement } from './overlays/presence.js';
export { captureThemeHost } from './runtime/theme-context.js';
export { Collection, optionId } from './collections/collection.js';
export { AsyncList } from './collections/request.js';
export { VirtualCollection } from './collections/virtual.js';
export { LiveAnnouncer } from './shared/announce.js';
export { keyboardScope, capturePointer } from './shared/interaction.js';
export { graphemes, numberDraftParser } from './shared/text.js';
