<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { ConfigProvider, type Size } from '@zui/svelte';
  import Control from './ConfigControl.svelte';

  type Defaults = {
    Control: Pick<ComponentProps<typeof Control>, 'size' | 'block' | 'class' | 'slotProps'>;
  };
  const Provider = ConfigProvider<Defaults>;
  let size = $state<Size>('md');
  let clicks = $state(0);
</script>

<button type="button" onclick={() => (size = size === 'md' ? 'lg' : 'md')}>切换默认尺寸</button>
<output data-testid="config-clicks">{clicks}</output>
<Provider
  components={{
    Control: {
      size: 'xs',
      block: true,
      class: 'outer',
      slotProps: { content: { class: 'outer-content', title: 'inherited' } },
    },
  }}
>
  <Provider {size} components={{ Control: { block: false, class: 'inner' } }}>
    <Control
      class="instance"
      slotProps={{
        content: {
          class: 'instance-content',
          onclick: () => clicks++,
        },
      }}
    />
  </Provider>
</Provider>
