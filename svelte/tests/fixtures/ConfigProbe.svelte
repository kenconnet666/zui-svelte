<script lang="ts">
  import { onDestroy, tick, type ComponentProps } from 'svelte';
  import { ConfigProvider, createStyleRuntime, provideStyleRuntime, type Size } from '@zui/svelte';
  import Control from './ConfigControl.svelte';

  type Defaults = {
    Control: Pick<ComponentProps<typeof Control>, 'size' | 'block' | 'class' | 'slotProps'>;
  };
  const Provider = ConfigProvider<Defaults>;
  let { size = $bindable<Size>('md') }: { size?: Size } = $props();
  let clicks = $state(0);
  let count = $state(1);
  let metrics = $state('');
  const runtime =
    typeof document === 'undefined'
      ? undefined
      : createStyleRuntime({ target: document, namespace: 'config-probe' });
  if (runtime) provideStyleRuntime(runtime);
  const baseline = runtime?.stats;
  onDestroy(() => runtime?.dispose());
  async function scale(next: number) {
    const started = performance.now();
    count = next;
    await tick();
    metrics = JSON.stringify({
      count,
      elapsedMs: performance.now() - started,
      baseline,
      ...runtime?.stats,
    });
  }
</script>

<button type="button" onclick={() => (size = size === 'md' ? 'lg' : 'md')}>切换默认尺寸</button>
<output data-testid="config-clicks">{clicks}</output>
<button type="button" onclick={() => scale(1000)}>挂载一千个控件</button>
<button type="button" onclick={() => scale(0)}>卸载全部控件</button>
<output data-testid="config-metrics">{metrics}</output>
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
    {#each Array(count).keys() as index (index)}
      <Control
        class="instance"
        slotProps={{
          content: {
            class: 'instance-content',
            onclick: () => clicks++,
          },
        }}
      />
    {/each}
  </Provider>
</Provider>
