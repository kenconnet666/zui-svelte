<script lang="ts">
  import { onDestroy } from 'svelte';
  import { css, lightTheme, darkTheme, overrideTheme, ThemeScope } from '@zui/core';
  import { StyleProvider } from '@zui/svelte';
  let dark = $state(false);
  let compact = $state(false);
  let contrast = $state(false);
  let rtl = $state(false);
  const scope = new ThemeScope(lightTheme);
  onDestroy(() => scope.dispose());

  function apply() {
    // 多轴偏好用普通函数合成确定主题，不把系统监听或持久化塞进 core。
    scope.setTheme(
      overrideTheme(dark ? darkTheme : lightTheme, {
        size: { control: compact ? '28px' : '36px' },
        borderWidth: { thin: contrast ? '2px' : '1px' },
        color: contrast
          ? { text: dark ? '#ffffff' : '#000000', background: dark ? '#000000' : '#ffffff' }
          : {},
      }),
    );
  }
</script>

<button
  onclick={() => {
    dark = !dark;
    apply();
  }}>Toggle dark</button
>
<button
  onclick={() => {
    compact = !compact;
    apply();
  }}>Toggle compact</button
>
<button
  onclick={() => {
    contrast = !contrast;
    apply();
  }}>Toggle contrast</button
>
<button onclick={() => (rtl = !rtl)}>Toggle direction</button>
<StyleProvider {scope} dir={rtl ? 'rtl' : 'ltr'}>
  <button
    data-testid="preference-control"
    class={css((s) => {
      s.height._control;
      s.color._text;
      s.backgroundColor._background;
      s.borderStyle.solid;
      s.borderWidth._thin;
      s.borderColor._border;
      s.paddingInlineStart._large;
      s.paddingInlineEnd._small;
      s.transitionProperty('background-color');
      s.transitionDuration._normal;
      s._focusVisible((s) => {
        s.outlineStyle.solid;
        s.outlineWidth._focus;
        s.outlineColor._focus;
        s.outlineOffset.px(2);
      });
      s._media('(prefers-reduced-motion: reduce)', (s) => {
        s.transitionDuration.ms(0);
      });
      s._media('(forced-colors: active)', (s) => {
        s.color('CanvasText');
        s.backgroundColor('Canvas');
        s.borderColor('ButtonText');
        s.outlineColor('Highlight');
      });
    })}>主题预览</button
  >
  <button disabled data-testid="preference-disabled">不可操作</button>
</StyleProvider>
