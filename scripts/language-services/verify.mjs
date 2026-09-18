import assert from 'node:assert/strict';
import { directory, requireTool, root, toolDirectory } from './environment.mjs';
import { access, unlink, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const { Client } = requireTool('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = requireTool('@modelcontextprotocol/sdk/client/stdio.js');
// 临时文件必须进入真实 tsconfig，才是在验证消费方的类型解析。
const paths = [
  'core/src/runtime/test/lsp-type-probe.ts',
  'docs/src/ui/LspTypeProbe.svelte',
  'docs/tests/lsp-import-probe.ts',
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
  args: [resolve(directory, 'server.mjs'), root, toolDirectory],
  cwd: root,
  stderr: 'pipe',
});
transport.stderr?.on('data', (data) => process.stderr.write(data));
const report = [];
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
  const hover = await call('hover', { filePath: 'core/tests/types.ts', line: 19, column: 11 });
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
    filePath: 'core/tests/types.ts',
    line: 10,
    column: 8,
    limit: 100,
  });
  assert(references.total > 1);
  report.push({ references });
  const completions = await call('completions', {
    filePath: 'core/tests/types.ts',
    line: 19,
    column: 11,
    prefix: '_1',
    limit: 20,
  });
  assert(completions.items.some((item) => item.label === '_100'));
  report.push({ completions });
  await writeFile(
    resolve(toolDirectory, 'verification.json'),
    JSON.stringify({ success: true, report }, null, 2),
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
