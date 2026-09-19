// 自动生成；字段类型以组件源码为唯一来源。
import type { ComponentProps } from 'svelte';
import C0 from './layout/Stack.svelte';
import C1 from './layout/Grid.svelte';
import C2 from './layout/Container.svelte';
import C3 from './layout/ScrollArea.svelte';
type P0 = ComponentProps<typeof C0>;
type P1 = ComponentProps<typeof C1>;
type P2 = ComponentProps<typeof C2>;
type P3 = ComponentProps<typeof C3>;
export type ComponentDefaults = {
  Stack: Partial<
    Pick<
      P0,
      | 'direction'
      | 'gap'
      | 'align'
      | 'justify'
      | 'wrap'
      | Extract<'class' | 'style' | 'slotProps', keyof P0>
    >
  >;
  Grid: Partial<
    Pick<P1, 'columns' | 'gap' | 'align' | Extract<'class' | 'style' | 'slotProps', keyof P1>>
  >;
  Container: Partial<
    Pick<P2, 'maxWidth' | 'padding' | Extract<'class' | 'style' | 'slotProps', keyof P2>>
  >;
  ScrollArea: Partial<
    Pick<
      P3,
      'axis' | 'overscroll' | 'scrollbar' | Extract<'class' | 'style' | 'slotProps', keyof P3>
    >
  >;
};
