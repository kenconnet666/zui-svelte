<script lang="ts">
  import { css, componentCss, defaultsCss } from '@zui/svelte';
</script>

<div
  data-testid="ui-layer-default"
  class={[
    defaultsCss((s) => {
      s.color.token('blue');
    }),
    componentCss((s) => {
      s.color.token('red');
    }),
  ]}
>
  默认覆盖组件
</div>
<div
  data-testid="ui-layer-app"
  class={[
    css((s) => {
      s.color.token('green');
    }),
    defaultsCss((s) => {
      s.color.token('blue');
    }),
    componentCss((s) => {
      s.color.token('red');
    }),
  ]}
>
  实例覆盖默认
</div>
<div
  data-testid="ui-layer-native"
  class={[
    css((s) => {
      s.color.token('green');
    }),
    'external',
  ]}
>
  原生未分层 CSS
</div>

<style>
  .external {
    color: purple;
  }
</style>
