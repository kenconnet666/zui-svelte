import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(join(root, 'package.json'));
const probe = join(root, 'core/tests/type-scale.probe.ts');
const fields = Array.from({ length: 500 }, (_, index) => `color${index}: '#123456'`).join(',');
const source = `// 由 measure-types.mjs 临时生成，正常退出后删除。
import {baseTheme,extendTheme,createCss} from '../src/index.js';
const css=createCss(extendTheme(baseTheme,{color:{${fields}}}));
css(s=>{s.color._color499;s.backgroundColor._color0;
// @ts-expect-error 大主题不得丢失未知键检查。
s.color._missing;
});\n`;
await writeFile(probe, source, { flag: 'wx' });
try {
  const result = spawnSync(
    process.execPath,
    [
      require.resolve('typescript/bin/tsc'),
      '-p',
      join(root, 'core/tsconfig.check.json'),
      '--extendedDiagnostics',
      '--locale',
      'en',
    ],
    { encoding: 'utf8', timeout: 90000, maxBuffer: 8 * 1024 * 1024 },
  );
  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');
  const number = (pattern) => Number(result.stdout?.match(pattern)?.[1]);
  const report = {
    commit: process.env.GITHUB_SHA ?? null,
    scaleTokens: 500,
    checkTimeMs: number(/Check time:\s+([\d.]+)s/) * 1000,
    memoryKiB: number(/Memory used:\s+(\d+)K/),
    instantiations: number(/Instantiations:\s+(\d+)/),
  };
  await mkdir(join(root, 'core/test-results'), { recursive: true });
  await writeFile(
    join(root, 'core/test-results/type-budget.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
  assert.ifError(result.error);
  assert.equal(result.status, 0, 'Core type check failed.');
  const budget = JSON.parse(
    await readFile(join(root, '.design/core-distribution-budget.json'), 'utf8'),
  );
  assert(
    Number.isFinite(report.checkTimeMs) && report.checkTimeMs <= budget.typeCheckMaxMs,
    'Type checking time budget exceeded.',
  );
  assert(
    Number.isFinite(report.memoryKiB) && report.memoryKiB <= budget.typeMemoryMaxKiB,
    'Type checking memory budget exceeded.',
  );
} finally {
  await unlink(probe);
}
