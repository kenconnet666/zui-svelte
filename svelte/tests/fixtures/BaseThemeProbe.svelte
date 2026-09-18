<script module lang="ts">
  import { baseTheme, createCss, extendTheme } from '@zui/core';

  export const theme = extendTheme(baseTheme, {
    color: { ink: '#172554', paper: '#fffdf5' },
    spacing: { gutter: '18px' },
  });
  const css = createCss(theme);
</script>

<div
  class={css((s) => {
    s.display.flex;
    s.color._ink;
    s.backgroundColor._paper;
    s.gap._gutter;
  })}
>
  custom base theme
</div>
