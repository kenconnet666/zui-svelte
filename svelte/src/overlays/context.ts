import { createContext } from 'svelte';
import type { LayerHandle } from './layers.js';

/** 逻辑父子关系独立于 DOM 搬家；宿主 getter 随面板挂载就绪。 */
export interface OverlayContext {
  readonly layer: LayerHandle | undefined;
  readonly host: HTMLElement | undefined;
}
const [get, set, has] = createContext<OverlayContext>();
export const captureOverlay = () => (has() ? get() : undefined);
export const provideOverlay = (context: OverlayContext) => set(context);
export type PortalTarget = boolean | HTMLElement | ShadowRoot | null;
