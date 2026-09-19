<script lang="ts">
  import { ConfigProvider, type Size } from '@zui/svelte';
  import type { ComponentProps } from 'svelte';
  import Control from 'zui-fixture-config';

  type Defaults = {
    Control: Pick<ComponentProps<typeof Control>, 'size' | 'block' | 'class' | 'slotProps'>;
  };
  const Provider = ConfigProvider<Defaults>;
  let size = $state<Size>('md');
</script>

<button type="button" onclick={() => (size = 'lg')}>Change configured size</button>
<Provider
  {size}
  components={{
    Control: { class: 'package-default', slotProps: { content: { title: 'from package' } } },
  }}
>
  <Control class="package-instance" slotProps={{ content: { class: 'package-content' } }} />
</Provider>
