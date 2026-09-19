// 自动生成；字段类型以组件源码为唯一来源。
import type { ComponentProps } from 'svelte';
import Portal from './overlays/Portal.svelte';
import Popover from './overlays/Popover.svelte';
import Tooltip from './overlays/Tooltip.svelte';
import Dialog from './overlays/Dialog.svelte';
import Drawer from './overlays/Drawer.svelte';
import Stack from './layout/Stack.svelte';
import Grid from './layout/Grid.svelte';
import Container from './layout/Container.svelte';
import ScrollArea from './layout/ScrollArea.svelte';
type PortalProps = ComponentProps<typeof Portal>;
type PopoverProps = ComponentProps<typeof Popover>;
type TooltipProps = ComponentProps<typeof Tooltip>;
type DialogProps = ComponentProps<typeof Dialog>;
type DrawerProps = ComponentProps<typeof Drawer>;
type StackProps = ComponentProps<typeof Stack>;
type GridProps = ComponentProps<typeof Grid>;
type ContainerProps = ComponentProps<typeof Container>;
type ScrollAreaProps = ComponentProps<typeof ScrollArea>;
export type ComponentDefaults = {
  /** Portal 的白名单默认参数与样式；实例值优先。 */
  Portal: Partial<
    Pick<PortalProps, never | Extract<'class' | 'style' | 'slotProps', keyof PortalProps>>
  >;
  /** Popover 的白名单默认参数与样式；实例值优先。 */
  Popover: Partial<
    Pick<
      PopoverProps,
      | 'placement'
      | 'offset'
      | 'arrow'
      | 'matchAnchorWidth'
      | 'animated'
      | Extract<'class' | 'style' | 'slotProps', keyof PopoverProps>
    >
  >;
  /** Tooltip 的白名单默认参数与样式；实例值优先。 */
  Tooltip: Partial<
    Pick<
      TooltipProps,
      | 'placement'
      | 'offset'
      | 'delay'
      | 'closeDelay'
      | 'arrow'
      | 'animated'
      | Extract<'class' | 'style' | 'slotProps', keyof TooltipProps>
    >
  >;
  /** Dialog 的白名单默认参数与样式；实例值优先。 */
  Dialog: Partial<
    Pick<
      DialogProps,
      'size' | 'animated' | 'closable' | Extract<'class' | 'style' | 'slotProps', keyof DialogProps>
    >
  >;
  /** Drawer 的白名单默认参数与样式；实例值优先。 */
  Drawer: Partial<
    Pick<
      DrawerProps,
      | 'size'
      | 'side'
      | 'animated'
      | 'closable'
      | Extract<'class' | 'style' | 'slotProps', keyof DrawerProps>
    >
  >;
  /** Stack 的白名单默认参数与样式；实例值优先。 */
  Stack: Partial<
    Pick<
      StackProps,
      | 'direction'
      | 'gap'
      | 'align'
      | 'justify'
      | 'wrap'
      | Extract<'class' | 'style' | 'slotProps', keyof StackProps>
    >
  >;
  /** Grid 的白名单默认参数与样式；实例值优先。 */
  Grid: Partial<
    Pick<
      GridProps,
      'columns' | 'gap' | 'align' | Extract<'class' | 'style' | 'slotProps', keyof GridProps>
    >
  >;
  /** Container 的白名单默认参数与样式；实例值优先。 */
  Container: Partial<
    Pick<
      ContainerProps,
      'maxWidth' | 'padding' | Extract<'class' | 'style' | 'slotProps', keyof ContainerProps>
    >
  >;
  /** ScrollArea 的白名单默认参数与样式；实例值优先。 */
  ScrollArea: Partial<
    Pick<
      ScrollAreaProps,
      | 'axis'
      | 'overscroll'
      | 'scrollbar'
      | Extract<'class' | 'style' | 'slotProps', keyof ScrollAreaProps>
    >
  >;
};
