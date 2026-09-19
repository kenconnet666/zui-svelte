// 自动生成；字段类型以组件源码为唯一来源。
import type { ComponentProps } from 'svelte';
import C0 from './overlays/Portal.svelte';
import C1 from './overlays/Popover.svelte';
import C2 from './overlays/Tooltip.svelte';
import C3 from './overlays/Dialog.svelte';
import C4 from './overlays/Drawer.svelte';
import C5 from './layout/Stack.svelte';
import C6 from './layout/Grid.svelte';
import C7 from './layout/Container.svelte';
import C8 from './layout/ScrollArea.svelte';
type P0 = ComponentProps<typeof C0>;
type P1 = ComponentProps<typeof C1>;
type P2 = ComponentProps<typeof C2>;
type P3 = ComponentProps<typeof C3>;
type P4 = ComponentProps<typeof C4>;
type P5 = ComponentProps<typeof C5>;
type P6 = ComponentProps<typeof C6>;
type P7 = ComponentProps<typeof C7>;
type P8 = ComponentProps<typeof C8>;
export type ComponentDefaults = {
  Portal: Partial<Pick<P0, never | Extract<'class' | 'style' | 'slotProps', keyof P0>>>;
  Popover: Partial<
    Pick<
      P1,
      | 'placement'
      | 'offset'
      | 'arrow'
      | 'matchAnchorWidth'
      | 'animated'
      | Extract<'class' | 'style' | 'slotProps', keyof P1>
    >
  >;
  Tooltip: Partial<
    Pick<
      P2,
      | 'placement'
      | 'offset'
      | 'delay'
      | 'closeDelay'
      | 'arrow'
      | 'animated'
      | Extract<'class' | 'style' | 'slotProps', keyof P2>
    >
  >;
  Dialog: Partial<
    Pick<P3, 'size' | 'animated' | 'closable' | Extract<'class' | 'style' | 'slotProps', keyof P3>>
  >;
  Drawer: Partial<
    Pick<
      P4,
      'size' | 'side' | 'animated' | 'closable' | Extract<'class' | 'style' | 'slotProps', keyof P4>
    >
  >;
  Stack: Partial<
    Pick<
      P5,
      | 'direction'
      | 'gap'
      | 'align'
      | 'justify'
      | 'wrap'
      | Extract<'class' | 'style' | 'slotProps', keyof P5>
    >
  >;
  Grid: Partial<
    Pick<P6, 'columns' | 'gap' | 'align' | Extract<'class' | 'style' | 'slotProps', keyof P6>>
  >;
  Container: Partial<
    Pick<P7, 'maxWidth' | 'padding' | Extract<'class' | 'style' | 'slotProps', keyof P7>>
  >;
  ScrollArea: Partial<
    Pick<
      P8,
      'axis' | 'overscroll' | 'scrollbar' | Extract<'class' | 'style' | 'slotProps', keyof P8>
    >
  >;
};
