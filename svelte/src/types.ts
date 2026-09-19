export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Radius = Size | 'none' | 'full';
export type Spacing = Size | 'none';
export type Color = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type Direction = 'ltr' | 'rtl';

type VoidTag =
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'param'
  | 'source'
  | 'track'
  | 'wbr';
export type StyleContainerTag = Exclude<keyof HTMLElementTagNameMap, VoidTag>;
