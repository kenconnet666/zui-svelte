<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createStyleRuntime, type DefaultTokens } from '@zui/svelte';
  import type { StyleRuntime, StyleFactory } from '@zui/core';
  import { createLayer, layerStats, PortalMount, type LayerHandle } from '@zui/svelte/internal';

  let source: HTMLDivElement;
  let trigger: HTMLButtonElement;
  let veto = $state(false);
  let hold = $state(false);
  let revision = $state(0);
  let reasons = $state<string[]>([]);
  let runtime: StyleRuntime<DefaultTokens>;
  let panelClass = '',
    backdropClass = '';
  let nextId = 0;
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- 只做测试资源清理，界面统计来自 Layer 的订阅。
  const records = new Set<{ layer: LayerHandle; close: () => void }>();
  const disposers: (() => void)[] = [];
  const stats = $derived.by(() => {
    void revision;
    return typeof document === 'undefined' ? undefined : layerStats(document);
  });
  const panelStyle: StyleFactory<DefaultTokens> = (s) => {
    s.position.fixed;
    s.top.px(80);
    s.left.px(80);
    s.width.px(340);
    s.padding.px(16);
    s.backgroundColor.white;
    s.color.black;
    s.borderStyle.solid;
    s.borderWidth.px(1);
  };
  onMount(() => {
    runtime = createStyleRuntime({
      target: document,
      namespace: 'layer-fixture',
      nonce: 'layer-probe',
      variables: 'stylesheet',
    });
    panelClass = runtime.css(panelStyle);
    backdropClass = runtime.css((s) => {
      s.position.fixed;
      s.inset.px(0);
      s.backgroundColor.raw('rgb(0 0 0 / 0.25)');
    });
  });

  function panel(
    label: string,
    modal: boolean,
    parent?: LayerHandle,
    opener = trigger,
    root?: ShadowRoot,
  ) {
    const id = 'layer-content-' + ++nextId;
    const backdrop = document.createElement('div');
    backdrop.dataset.testid = label + '-backdrop';
    const element = document.createElement('section');
    element.dataset.testid = label;
    element.setAttribute('role', modal ? 'dialog' : 'region');
    element.setAttribute('aria-label', label);
    if (modal) element.setAttribute('aria-modal', 'true');
    let local = runtime;
    if (root) {
      local = createStyleRuntime({
        target: root,
        namespace: 'layer-shadow-fixture',
        nonce: 'layer-probe',
        variables: 'stylesheet',
      });
      disposers.push(() => local.dispose());
    }
    element.className = root ? local.css(panelStyle) : panelClass;
    if (modal)
      backdrop.className = root
        ? local.css((s) => {
            s.position.fixed;
            s.inset.px(0);
            s.backgroundColor.raw('rgb(0 0 0 / 0.25)');
          })
        : backdropClass;
    const labelNode = document.createElement('label');
    labelNode.textContent = label + '输入';
    labelNode.htmlFor = id;
    const input = document.createElement('input');
    input.id = id;
    element.append(labelNode, input);
    backdrop.append(element);
    (root ?? source).append(backdrop);
    const portal = new PortalMount(backdrop, root);
    let layer: LayerHandle | undefined;
    let record: { layer: LayerHandle; close: () => void } | undefined;
    const close = () => {
      layer?.dispose();
      portal.dispose();
      backdrop.remove();
      if (record) records.delete(record);
      revision++;
    };
    const addButton = (text: string, callback: (button: HTMLButtonElement) => void) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = text;
      button.addEventListener('click', () => callback(button));
      element.append(button);
    };
    addButton('打开子列表', (button) => panel('子列表', false, layer, button));
    addButton('打开子弹窗', (button) => panel('子弹窗', true, layer, button));
    addButton('关闭此层', () => layer?.requestClose());
    addButton('完成退出', close);
    addButton('移除触发器', () => opener.remove());
    addButton('移除本层 DOM', () => backdrop.remove());
    try {
      layer = createLayer({
        element,
        backdrop: modal ? backdrop : undefined,
        trigger: opener,
        parent,
        modal,
        nonce: 'layer-probe',
        onClose: (event) => {
          reasons = [...reasons, label + ':' + event.reason];
          if (veto && event.cancelable) {
            event.preventDefault();
            return;
          }
          if (!hold || !event.cancelable) close();
        },
      });
      record = { layer, close };
      records.add(record);
      revision++;
      return record;
    } catch (error) {
      portal.dispose();
      backdrop.remove();
      throw error;
    }
  }

  function shadowPanel() {
    const host = document.createElement('div');
    // eslint-disable-next-line svelte/no-dom-manipulating -- 专用空宿主中的原生测试节点，由本夹具独占创建和销毁。
    source.append(host);
    const root = host.attachShadow({ mode: 'open' });
    disposers.push(() => host.remove());
    panel('影子弹窗', true, undefined, trigger, root);
  }
  function stress() {
    for (let i = 0; i < 100; i++) panel('循环层', true).close();
  }
  onDestroy(() => {
    for (const record of [...records]) record.close();
    for (const dispose of disposers.reverse()) dispose();
    runtime?.dispose();
  });
</script>

<button type="button" bind:this={trigger} onclick={() => panel('主弹窗', true)}>打开主层</button>
<button type="button" onclick={shadowPanel}>打开影子层</button>
<button type="button" onclick={stress}>循环一百次</button>
<label><input type="checkbox" bind:checked={veto} />阻止关闭</label>
<label><input type="checkbox" bind:checked={hold} />保留退出</label>
<div bind:this={source}></div>
<output data-testid="layer-stats">{JSON.stringify(stats)}</output>
<output data-testid="layer-reasons">{reasons.join('|')}</output>
