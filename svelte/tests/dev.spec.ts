import { expect, test } from '@playwright/test';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { createServer, defaultClientConditions, type ViteDevServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { zui } from '../src/compiler/preprocess.js';

let server: ViteDevServer;
let directory: string;
let url: string;
const component = (padding: number, styled = true) => `<script lang="ts">
import { onDestroy } from 'svelte';
import { css, createRuntime } from '@zui/core';
import { provideStyleRuntime } from '@zui/svelte';
import { panel, accent } from './styles';
let stats = $state('');
const runtime = createRuntime({target: document, namespace: 'hmr'});
provideStyleRuntime(runtime);
onDestroy(() => runtime.dispose());
</script>
<button onclick={() => stats=JSON.stringify(runtime.stats)}>Inspect</button><output id="stats">{stats}</output>
<div id="panel" ${styled ? `class={[panel(), accent, css(s => {s.padding.px(${padding});})]}` : ''}>panel</div>`;
const styles = (width: number, height: number) => `import {css} from '@zui/core';
export function panel(){return css(s=>{s.width.px(${width});});}
export const accent=css(s=>{s.height.px(${height});});`;

const nativeProbe = `<script lang="ts">
let {name}=$props();let value=$state('first');let active=$state(true);let snapshot=$state('');let node:HTMLInputElement;
const reads:string[]=[];let events=0;let attachments=0;
const attach=()=>{attachments++;return ()=>attachments--;};
const attributes={get title(){reads.push('title');return value;},get 'data-spread'(){reads.push('spread');return 'yes';}};
</script>
<section data-testid={name}>
<input {...attributes} {@attach attach} class={['subject',{active}]} class:flag={active} style="color:blue" style:color={active?'red':'green'} bind:this={node} bind:value oninput={()=>events++}/>
<button onclick={()=>{active=!active;value='second';}}>Update</button>
<button onclick={()=>{snapshot=JSON.stringify({reads,events,attachments,value,active,title:node.title,classes:node.className,color:node.style.color});}}>Inspect native</button>
<output>{snapshot}</output>
</section>`;

const branchProbe = `<script lang="ts">
import {onDestroy} from 'svelte';import {css,createRuntime} from '@zui/core';import {provideStyleRuntime} from '@zui/svelte';
const runtime=createRuntime({target:document,namespace:'branches'});provideStyleRuntime(runtime);onDestroy(()=>runtime.dispose());
let rows=$state([{id:1,width:120},{id:2,width:220}]);let waiting=$state(Promise.resolve(320));let dynamic=$state('');let stats=$state('');
</script>
{#snippet item(width:number)}<div data-testid="item" class={css(s=>{s.width.px(width);})}>{width}</div>{/snippet}
{#each rows as row (row.id)}{@render item(row.width)}{/each}
{#await waiting}<p>pending</p>{:then width}<div data-testid="awaited" class={css(s=>{s.width.px(width);})}>awaited</div>{:catch}<p>rejected</p>{/await}
<div data-testid="dynamic" class={dynamic}>dynamic</div>
<button onclick={()=>{rows=rows.toReversed().map(row=>({...row,width:row.width+10}));waiting=Promise.resolve(330);}}>Update branches</button>
<button onclick={async()=>{dynamic=(await import('./dynamic')).dynamic;}}>Load chunk</button>
<button onclick={()=>{rows=[];waiting=Promise.reject(new Error('expected'));dynamic='';}}>Remove branches</button>
<button onclick={()=>{stats=JSON.stringify(runtime.stats);}}>Inspect branches</button><output id="branch-stats">{stats}</output>`;

test.beforeAll(async () => {
  // Vite 明确忽略 test-results；待编辑的源码必须位于可监听的独立目录。
  const parent = fileURLToPath(new URL('../', import.meta.url));
  await mkdir(parent, { recursive: true });
  directory = await mkdtemp(join(parent, '.zui-hmr-'));
  await writeFile(
    join(directory, 'index.html'),
    '<div id="app"></div><script type="module" src="/main.ts"></script>',
  );
  await writeFile(
    join(directory, 'main.ts'),
    "import {mount} from 'svelte';import Root from './Root.svelte';import Compare from './Compare.svelte';import Branches from './Branches.svelte';import Boundary from './Boundary.svelte';mount(location.search.includes('boundary') ? Boundary : location.search.includes('branches') ? Branches : location.search ? Compare : Root,{target:document.getElementById('app')!});",
  );
  await writeFile(
    join(directory, 'Fragile.svelte'),
    `<script lang="ts">import {css} from '@zui/core';let {broken}=$props();</script>
<div data-testid="fragile" class={css(s=>{s.height.px(31);if(broken)throw new Error('expected-style-error');s.width.px(41);})}>fragile</div>`,
  );
  await writeFile(
    join(directory, 'Boundary.svelte'),
    `<script lang="ts">
import {onDestroy} from 'svelte';import {createRuntime} from '@zui/core';import {provideStyleRuntime} from '@zui/svelte';import Fragile from './Fragile.svelte';
const runtime=createRuntime({target:document,namespace:'boundary'});provideStyleRuntime(runtime);onDestroy(()=>runtime.dispose());let broken=$state(false);let stats=$state('');
</script>
<button onclick={()=>broken=true}>Fail styles</button>
<button onclick={()=>stats=JSON.stringify(runtime.stats)}>Inspect boundary</button><output id="boundary-stats">{stats}</output>
<svelte:boundary><Fragile {broken}/>{#snippet failed(error,reset)}<button onclick={()=>{broken=false;reset();}}>Recover styles</button>{/snippet}</svelte:boundary>`,
  );
  await writeFile(join(directory, 'Branches.svelte'), branchProbe);
  await writeFile(
    join(directory, 'dynamic.ts'),
    "import {css} from '@zui/core';export const dynamic=css(s=>{s.height.px(77);});",
  );
  await mkdir(join(directory, 'node_modules/plain'), { recursive: true });
  await writeFile(
    join(directory, 'node_modules/plain/package.json'),
    JSON.stringify({
      name: 'plain',
      type: 'module',
      exports: { '.': { svelte: './Native.svelte', default: './Native.svelte' } },
    }),
  );
  await writeFile(join(directory, 'node_modules/plain/Native.svelte'), nativeProbe);
  await writeFile(join(directory, 'Subject.svelte'), nativeProbe);
  await writeFile(
    join(directory, 'Compare.svelte'),
    `<script>import Native from 'plain';import Subject from './Subject.svelte';</script><Native name="native"/><Subject name="compiled"/>`,
  );
  // Svelte 的 HMR 会重建被修改组件；未修改父组件的状态应保留，不能退化成整页刷新。
  await writeFile(
    join(directory, 'Root.svelte'),
    `<script>import App from './App.svelte';let count=$state(0);</script>
<button onclick={()=>count++}>Increment</button><output id="count">{count}</output><App/>`,
  );
  await writeFile(join(directory, 'App.svelte'), component(8));
  await writeFile(join(directory, 'styles.ts'), styles(120, 44));
  server = await createServer({
    root: directory,
    configFile: false,
    plugins: [zui({ root: directory }), svelte({ configFile: false })],
    resolve: { conditions: ['zui-source', ...defaultClientConditions] },
    server: { host: '127.0.0.1', port: 0 },
  });
  await server.listen();
  url = server.resolvedUrls!.local[0]!;
});
test.afterAll(async () => {
  try {
    await server?.close();
  } finally {
    if (directory) await rm(directory, { recursive: true, force: true });
  }
});

test('real HMR preserves parent state and releases replaced and removed styles', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(url);
  const panel = page.locator('#panel');
  await expect(panel).toHaveCSS('width', '120px');
  await expect(panel).toHaveCSS('height', '44px');
  await page.getByRole('button', { name: 'Increment', exact: true }).click();
  await expect(page.locator('#count')).toHaveText('1');
  for (const width of [140, 160, 180]) {
    await writeFile(join(directory, 'styles.ts'), styles(width, 50));
    await expect(panel).toHaveCSS('width', width + 'px');
    await expect(panel).toHaveCSS('height', '50px');
    await expect(page.locator('#count')).toHaveText('1');
    await page.getByRole('button', { name: 'Inspect', exact: true }).click();
    const stats = JSON.parse(await page.locator('#stats').innerText());
    expect(stats.rules).toBe(3);
    expect(stats.sources).toBe(3);
  }
  await writeFile(join(directory, 'App.svelte'), component(12));
  await expect(panel).toHaveCSS('padding-top', '12px');
  await expect(page.locator('#count')).toHaveText('1');
  await writeFile(join(directory, 'App.svelte'), component(12, false));
  await expect(panel).not.toHaveAttribute('class', /.+/);
  await expect(page.locator('style[data-zui="hmr"]')).toHaveCount(0);
  await writeFile(join(directory, 'App.svelte'), component(16));
  await expect(panel).toHaveCSS('padding-top', '16px');
  await expect(panel).toHaveCSS('width', '180px');
  await expect(page.locator('style[data-zui="hmr"]')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('matches native spread getters, events, bindings and class/style directives', async ({
  page,
}) => {
  await page.goto(url + '?compare');
  const native = page.getByTestId('native');
  const compiled = page.getByTestId('compiled');
  for (const phase of ['initial', 'input', 'update']) {
    for (const target of [native, compiled]) {
      if (phase === 'input') await target.locator('input').fill('edited');
      if (phase === 'update')
        await target.getByRole('button', { name: 'Update', exact: true }).click();
      await target.getByRole('button', { name: 'Inspect native', exact: true }).click();
    }
    expect(JSON.parse(await compiled.locator('output').innerText())).toEqual(
      JSON.parse(await native.locator('output').innerText()),
    );
  }
  await expect(page.locator('style[data-zui]')).toHaveCount(0);
});

test('isolates snippet and await instances and collects a real dynamic chunk', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(url + '?branches');
  await expect(page.getByTestId('item').nth(0)).toHaveCSS('width', '120px');
  await expect(page.getByTestId('item').nth(1)).toHaveCSS('width', '220px');
  await expect(page.getByTestId('awaited')).toHaveCSS('width', '320px');
  for (let i = 1; i <= 5; i++) {
    await page.getByRole('button', { name: 'Update branches', exact: true }).click();
    await expect(page.getByTestId('item').nth(0)).toHaveCSS(
      'width',
      (i % 2 ? 220 : 120) + i * 10 + 'px',
    );
    await expect(page.getByTestId('item').nth(1)).toHaveCSS(
      'width',
      (i % 2 ? 120 : 220) + i * 10 + 'px',
    );
    await expect(page.getByTestId('awaited')).toHaveCSS('width', '330px');
    await page.getByRole('button', { name: 'Inspect branches', exact: true }).click();
    expect(JSON.parse(await page.locator('#branch-stats').innerText()).rules).toBe(3);
  }
  await page.getByRole('button', { name: 'Load chunk', exact: true }).click();
  await expect(page.getByTestId('dynamic')).toHaveCSS('height', '77px');
  await page.getByRole('button', { name: 'Remove branches', exact: true }).click();
  await expect(page.getByText('rejected', { exact: true })).toBeVisible();
  await expect(page.getByTestId('item')).toHaveCount(0);
  await expect(page.locator('style[data-zui="branches"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Inspect branches', exact: true }).click();
  expect(JSON.parse(await page.locator('#branch-stats').innerText())).toMatchObject({
    rules: 0,
    bindings: 0,
    sources: 0,
    styleEntries: 0,
  });
  expect(errors).toEqual([]);
});

test('releases failed style factories and recovers through a Svelte error boundary', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(url + '?boundary');
  for (let round = 0; round < 3; round++) {
    await expect(page.getByTestId('fragile')).toHaveCSS('width', '41px');
    await page.getByRole('button', { name: 'Fail styles', exact: true }).click();
    await expect(page.getByTestId('fragile')).toHaveCount(0);
    await expect(page.locator('style[data-zui="boundary"]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Inspect boundary', exact: true }).click();
    expect(JSON.parse(await page.locator('#boundary-stats').innerText())).toMatchObject({
      rules: 0,
      bindings: 0,
      sources: 0,
    });
    await page.getByRole('button', { name: 'Recover styles', exact: true }).click();
  }
  await expect(page.getByTestId('fragile')).toHaveCSS('height', '31px');
  expect(errors).toEqual([]);
});
