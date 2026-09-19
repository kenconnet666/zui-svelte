<script lang="ts">
  import { css, componentCss, defaultsCss } from '@zui/svelte';
</script>

<div
  data-testid="ui-layer-default"
  class={[
    defaultsCss((s) => {
      s.color('blue');
    }),
    componentCss((s) => {
      s.color('red');
    }),
  ]}
>
  默认覆盖组件
</div>
<div
  data-testid="ui-layer-app"
  class={[
    css((s) => {
      s.color('green');
    }),
    defaultsCss((s) => {
      s.color('blue');
    }),
    componentCss((s) => {
      s.color('red');
    }),
  ]}
>
  实例覆盖默认
</div>
<div
  data-testid="ui-layer-native"
  class={[
    css((s) => {
      s.color('green');
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
