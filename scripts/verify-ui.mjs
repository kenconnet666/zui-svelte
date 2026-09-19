import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(join(root, 'docs/package.json'));
const { build } = await import(pathToFileURL(require.resolve('vite')).href);
const { svelte } = await import(
  pathToFileURL(require.resolve('@sveltejs/vite-plugin-svelte')).href
);
const path = join(root, '.design/svelte-distribution-budget.json');
const update = process.argv.includes('--update');
const budget = update ? {} : JSON.parse(await readFile(path, 'utf8'));
const results = [];
for (const [name, exports] of [
  ['layout', ['Stack', 'Grid', 'Container', 'ScrollArea']],
  ['overlays', ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Portal']],
]) {
  const entry = 'virtual:zui-' + name;
  const result = await build({
    root: join(root, 'docs'),
    configFile: false,
    logLevel: 'silent',
    plugins: [
      svelte({ configFile: false }),
      {
        name: 'zui-distribution-profile',
        resolveId(id) {
          if (id.endsWith(entry)) return '\0' + entry;
        },
        load(id) {
          if (id === '\0' + entry) return `export { ${exports.join(', ')} } from '@zui/svelte';`;
        },
      },
    ],
    resolve: { dedupe: ['svelte'] },
    build: { lib: { entry, formats: ['es'] }, write: false, minify: true, target: 'es2023' },
  });
  const chunks = (Array.isArray(result) ? result : [result])
    .flatMap((item) => item.output)
    .filter((item) => item.type === 'chunk');
  assert(
    chunks.every((chunk) => !chunk.imports.length && !chunk.dynamicImports.length),
    'UI profile must be self-contained',
  );
  const modules = chunks.flatMap((chunk) =>
    Object.entries(chunk.modules)
      .filter(([, value]) => value.renderedLength > 0)
      .map(([id]) => id.replaceAll('\\', '/')),
  );
  const forbidden = [
    'decimal.js',
    '@internationalized/date',
    '@tanstack/virtual-core',
    'zod/v4/classic',
    'zod/v4/mini',
    'node:',
    '__vite-browser-external',
  ];
  if (name === 'layout') forbidden.push('@floating-ui/', '/focus-trap/', '/tabbable/');
  assert(
    !modules.some((id) => forbidden.some((dependency) => id.includes(dependency))),
    'Unused specialty dependency entered ' + name,
  );
  const code = chunks.map((chunk) => chunk.code).join('\n');
  const rawBytes = Buffer.byteLength(code),
    gzipBytes = gzipSync(code).length;
  const profile = { name, rawBytes, gzipBytes, moduleCount: modules.length };
  if (update) {
    // 初始测量留 15% 审查余量并取整；后续增长必须复核，不能在 CI 自动抬高门槛。
    budget[name] = {
      rawBytes: Math.ceil((rawBytes * 1.15) / 1024) * 1024,
      gzipBytes: Math.ceil((gzipBytes * 1.15) / 1024) * 1024,
    };
  }
  assert(
    rawBytes <= budget[name].rawBytes && gzipBytes <= budget[name].gzipBytes,
    'UI distribution budget exceeded: ' + name,
  );
  results.push(profile);
}
if (update) await writeFile(path, JSON.stringify(budget, null, 2) + '\n');
await mkdir(join(root, 'svelte/test-results'), { recursive: true });
await writeFile(
  join(root, 'svelte/test-results/distribution.json'),
  JSON.stringify({ commit: process.env.GITHUB_SHA ?? null, results }, null, 2) + '\n',
);
console.log(JSON.stringify(results, null, 2));
