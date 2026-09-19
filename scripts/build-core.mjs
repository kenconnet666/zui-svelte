import { rm } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const root = fileURLToPath(new URL('../core/', import.meta.url));
const target = join(root, 'dist');
// 清理已确认的本包构建目录，避免重命名后继续发布旧声明/模块。
if (dirname(target) !== root.replace(/[\\/]$/, '') || basename(target) !== 'dist')
  throw new Error('Unexpected build output');
await rm(target, { recursive: true, force: true });
const require = createRequire(new URL('../package.json', import.meta.url));
const result = spawnSync(
  process.execPath,
  [require.resolve('typescript/bin/tsc'), '-p', join(root, 'tsconfig.build.json')],
  { stdio: 'inherit' },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
