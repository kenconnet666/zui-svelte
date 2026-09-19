import assert from 'node:assert/strict';
import { directory, requireProject, root, serviceConfig } from './environment.mjs';
import { access, mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const { Client } = requireProject('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = requireProject('@modelcontextprotocol/sdk/client/stdio.js');
// 临时文件必须进入真实 tsconfig，才是在验证消费方的类型解析。
const paths = [
  'core/src/runtime/test/lsp-type-probe.ts',
  'docs/src/ui/LspTypeProbe.svelte',
  'docs/tests/lsp-import-probe.ts',
  'core/src/runtime/test/lsp-dependency-probe.ts',
];
for (const file of paths) {
  try {
    await access(resolve(root, file));
    throw new Error('Probe already exists: ' + file);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
const client = new Client({ name: 'zui-language-verification', version: '1' });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [resolve(directory, 'server.mjs'), root],
  cwd: root,
  stderr: 'pipe',
});
transport.stderr?.on('data', (data) => process.stderr.write(data));
const report = [];
const services = [
  'typescript',
  'svelte-language-server',
  'typescript-language-server',
  'typescript-svelte-plugin',
].map((name) => ({
  name,
  version: requireProject(name + '/package.json').version,
  path: resolve(root, 'node_modules', name),
}));
console.log(
  JSON.stringify({
    services,
    configurations: { svelte: serviceConfig('svelte'), typescript: serviceConfig('typescript') },
  }),
);
async function position(filePath, needle) {
  const text = await readFile(resolve(root, filePath), 'utf8');
  const offset = text.indexOf(needle);
  assert(offset >= 0, 'Missing semantic probe: ' + needle);
  const before = text.slice(0, offset);
  return { filePath, line: before.split('\n').length, column: offset - before.lastIndexOf('\n') };
}
async function call(name, args) {
  const result = await client.callTool({ name, arguments: args }, undefined, { timeout: 90000 });
  assert(!result.isError, result.content?.[0]?.text);
  return JSON.parse(result.content[0].text);
}
function source(svelte, valid) {
  const body = `import { createCss, defineTheme } from '${svelte ? '@zui/core' : '../../index.js'}';
const theme = defineTheme({ color: { 100: 'red' } });
const css = createCss(theme);
export const width: number = ${valid ? '100' : "'错误'"};
export const result = css((s) => {
  s.color.${valid ? '_100' : '_缺失'};
  s.width.${valid ? 'px' : 'fr'}(2);
});`;
  return svelte
    ? '<script lang="ts">\n' + body + '\n</script>\n<div class={result}>{width}</div>\n'
    : body;
}
try {
  await client.connect(transport, { timeout: 60000 });
  const tools = await client.listTools();
  assert.equal(tools.tools.length, 5);
  for (const filePath of [
    'svelte/src/theme.ts',
    'svelte/src/ConfigProvider.svelte',
    'svelte/src/overlays/Modal.svelte',
    'svelte/src/layout/Stack.svelte',
  ]) {
    const result = await call('diagnostics', { filePath });
    report.push({ sourceDiagnostics: result });
    assert.equal(result.errors, 0, filePath + ': ' + JSON.stringify(result.diagnostics));
  }
  for (const filePath of paths.slice(0, 2)) {
    const svelte = filePath.endsWith('.svelte');
    for (const valid of [false, true, false, true]) {
      await writeFile(resolve(root, filePath), source(svelte, valid), 'utf8');
      const result = await call('diagnostics', { filePath });
      report.push({ filePath, valid, ...result });
      console.log(
        JSON.stringify({ filePath, valid, errors: result.errors, diagnostics: result.diagnostics }),
      );
      assert(result.complete);
      assert.equal(result.errors, valid ? 0 : 3);
      assert(
        result.diagnostics.every((item) => typeof item.message === 'string' && item.message.length),
      );
      if (!valid)
        assert.deepEqual(
          result.diagnostics
            .filter((item) => item.severity === 1)
            .map((item) => Number(item.code))
            .sort(),
          [2322, 2339, 2339],
        );
    }
  }
  for (const valid of [false, true]) {
    const filePath = paths[2];
    await writeFile(
      resolve(root, filePath),
      `import type { ComponentProps } from 'svelte';
import Probe from '../../svelte/tests/fixtures/CoreProbe.svelte';
export const props: ComponentProps<typeof Probe> = { initialWidth: ${valid ? '100' : "'bad'"} };\n`,
      'utf8',
    );
    const result = await call('diagnostics', { filePath });
    report.push({ filePath, valid, ...result });
    console.log(
      JSON.stringify({ filePath, valid, errors: result.errors, diagnostics: result.diagnostics }),
    );
    assert.equal(result.errors, valid ? 0 : 1);
    if (!valid) assert.equal(Number(result.diagnostics[0].code), 2322);
  }
  // 改的是未打开的依赖文件，而非查询目标，验证文件通知与关闭缓冲能刷新项目。
  await writeFile(resolve(root, paths[3]), 'export const width = 1;\n');
  await writeFile(
    resolve(root, paths[0]),
    "import { width } from './lsp-dependency-probe.js';\nexport const value: number = width;\n",
  );
  assert.equal((await call('diagnostics', { filePath: paths[0] })).errors, 0);
  await writeFile(resolve(root, paths[3]), "export const width = 'changed';\n");
  let dependencyResult;
  for (let attempt = 0; attempt < 6; attempt++) {
    dependencyResult = await call('diagnostics', { filePath: paths[0] });
    if (dependencyResult.errors === 1) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.equal(dependencyResult.errors, 1, 'Changed dependency stayed stale');
  report.push({ dependencyRefresh: dependencyResult });
  // 大主题同时验证完成诊断与补全成本，不能只以 tsc 吞吐量推断编辑器体验。
  const scalePath = paths[0];
  const fields = Array.from({ length: 500 }, (_, index) => `color${index}: '#123456'`).join(',');
  await writeFile(
    resolve(root, scalePath),
    `import {baseTheme,extendTheme,createCss} from '../../index.js';
const css=createCss(extendTheme(baseTheme,{color:{${fields}}}));
css(s=>{s.color._color499;});\n`,
  );
  const scaleStart = performance.now();
  const scaleDiagnostics = await call('diagnostics', { filePath: scalePath });
  assert.equal(scaleDiagnostics.errors, 0);
  const scaleCompletions = await call('completions', {
    ...(await position(scalePath, '_color499;')),
    prefix: '_color49',
    limit: 20,
  });
  assert(scaleCompletions.items.some((item) => item.label === '_color499'));
  const scale = { tokens: 500, diagnosticsAndCompletionMs: performance.now() - scaleStart };
  report.push({ scale });
  console.log(JSON.stringify({ scale }));
  // 通过真实包声明验证三段式方法、开放补全和生成的主题悬停说明。
  const apiPath = paths[1];
  await writeFile(
    resolve(root, apiPath),
    `<script lang="ts">
import { css } from '@zui/svelte';
const style = css(s => {
  s.inlineSize.token('_panelMd');
  s.inlineSize.raw('auto');
  s.inlineSize._panelMd;
  s.inlineSize.px(100);
  s.inlineSize.auto;
});
</script><div class={style}></div>\n`,
  );
  assert.equal((await call('diagnostics', { filePath: apiPath })).errors, 0);
  for (const needle of ["'_panelMd'", "'auto'"]) {
    const point = await position(apiPath, needle);
    const completion = await call('completions', {
      ...point,
      column: point.column + 1,
      limit: 100,
      resolveLimit: 2,
    });
    assert(completion.items.some((item) => item.label === '_panelMd'));
    assert(completion.items.some((item) => item.label === 'auto'));
    assert.equal(typeof completion.isIncomplete, 'boolean');
    report.push({ propertyCompletions: completion });
  }
  const themeHover = await call('hover', await position(apiPath, '_panelMd;'));
  assert(JSON.stringify(themeHover.contents).includes('36rem'));
  report.push({ themeHover });
  const methodHover = await call('hover', await position(apiPath, 'token('));
  assert(JSON.stringify(methodHover.contents).includes('严格'));
  report.push({ methodHover });
  const unitHover = await call('hover', await position(apiPath, 'px('));
  assert(JSON.stringify(unitHover.contents).includes('value'));
  report.push({ unitHover });
  const keywordHover = await call('hover', await position(apiPath, 'auto;'));
  assert(JSON.stringify(keywordHover.contents).includes('系统关键字'));
  report.push({ keywordHover });
  const propertyHover = await call('hover', await position(apiPath, 'inlineSize.token'));
  assert(JSON.stringify(propertyHover.contents).includes('行内轴'));
  report.push({ propertyHover });
  const tokenPosition = await position('core/tests/types.ts', '_100;');
  const hover = await call('hover', tokenPosition);
  assert(JSON.stringify(hover.contents).includes('_100: void'));
  report.push({ hover });
  const svelteHover = await call('hover', {
    filePath: 'svelte/tests/fixtures/LifecycleProbe.svelte',
    line: 11,
    column: 10,
  });
  assert(JSON.stringify(svelteHover.contents).includes('byCallback: string'));
  report.push({ svelteHover });
  const definition = await call('definitions', {
    filePath: 'svelte/tests/fixtures/LifecycleProbe.svelte',
    line: 3,
    column: 12,
    limit: 5,
  });
  assert(definition.total > 0);
  report.push({ definition });
  assert(definition.items.some((item) => item.filePath.endsWith('style-helper.ts')));
  const references = await call('references', {
    ...(await position('core/tests/types.ts', 'numberedTheme =')),
    limit: 100,
  });
  assert(references.total > 1);
  report.push({ references });
  const completions = await call('completions', {
    ...tokenPosition,
    prefix: '_1',
    limit: 20,
  });
  assert(completions.items.some((item) => item.label === '_100'));
  report.push({ completions });
  const reportDirectory = resolve(root, 'test-results/language-services');
  await mkdir(reportDirectory, { recursive: true });
  await writeFile(
    resolve(reportDirectory, 'verification.json'),
    JSON.stringify(
      { success: true, commit: process.env.GITHUB_SHA ?? null, services, report },
      null,
      2,
    ),
    'utf8',
  );
  console.log('VERIFIED');
} finally {
  for (const file of paths)
    await unlink(resolve(root, file)).catch((error) => {
      if (error.code !== 'ENOENT') throw error;
    });
  if (transport.pid) {
    try {
      execFileSync('taskkill.exe', ['/PID', String(transport.pid), '/T', '/F'], {
        windowsHide: true,
        stdio: 'ignore',
      });
    } catch {
      /* 客户端断开时服务可能已退出。 */
    }
  }
  await client.close();
}
