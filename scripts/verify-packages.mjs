import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pnpm = process.env.npm_execpath;
assert(pnpm, 'Run with pnpm run test:packages.');
const directory = await mkdtemp(join(tmpdir(), 'zui-packages-'));
const reportDirectory = join(root, 'svelte/test-results/packages');
const report = { directory, steps: [], success: false };

function run(args, cwd, env = {}) {
  const result = spawnSync(process.execPath, [pnpm, ...args], {
    cwd,
    env: { ...process.env, ...env },
    stdio: 'inherit',
    timeout: 300_000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, args.join(' '));
  report.steps.push(args.join(' '));
}

try {
  // 安装目录位于系统临时目录，不能从仓库祖先路径偷用 node_modules 或源码条件。
  for (const workspace of ['core', 'svelte'])
    run(['pack', '--pack-destination', directory], join(root, workspace));
  const archives = (await readdir(directory)).filter((name) => name.endsWith('.tgz'));
  assert.equal(archives.length, 2);
  const archive = (name) => {
    const match = archives.find((file) => file.startsWith('zui-' + name + '-'));
    assert(match, 'Missing package archive: ' + name);
    return 'file:./' + match;
  };
  const dependencies = {
    '@zui/core': archive('core'),
    '@zui/svelte': archive('svelte'),
    'zui-fixture-plain': 'file:./plain',
  };
  for (const name of [
    '@sveltejs/kit',
    '@sveltejs/adapter-node',
    '@sveltejs/adapter-static',
    '@sveltejs/vite-plugin-svelte',
    'svelte',
    'vite',
    'typescript',
    'svelte-check',
    '@types/node',
  ]) {
    // 复用工作区实际安装的集中版本，不额外维护一份测试依赖版本表。
    const workspace = name === '@types/node' ? root : join(root, 'svelte');
    const manifest = JSON.parse(
      await readFile(join(workspace, 'node_modules', name, 'package.json'), 'utf8'),
    );
    dependencies[name] = manifest.version;
  }
  await writeFile(
    join(directory, 'package.json'),
    JSON.stringify(
      {
        private: true,
        type: 'module',
        dependencies,
      },
      null,
      2,
    ),
  );
  // pnpm 11 从 workspace 配置读取 overrides；临时项目只有根包，不链接源码工作区。
  await writeFile(
    join(directory, 'pnpm-workspace.yaml'),
    JSON.stringify({ packages: ['.'], overrides: { '@zui/core': archive('core') } }, null, 2),
  );
  await cp(join(root, 'svelte/tests/kit/src'), join(directory, 'src'), { recursive: true });
  await cp(join(root, 'svelte/tests/package'), directory, { recursive: true });
  await rename(join(directory, 'consumer-tsconfig.json'), join(directory, 'tsconfig.json'));
  const types = (await readFile(join(root, 'core/tests/types.ts'), 'utf8')).replace(
    "'../src/index.js'",
    "'@zui/core'",
  );
  await writeFile(join(directory, 'src/core-types.ts'), types);
  run(['install', '--no-frozen-lockfile', '--ignore-scripts'], directory);
  assert(
    (await realpath(join(directory, 'node_modules/zui-fixture-plain'))).includes(
      sep + 'node_modules' + sep,
    ),
    'The unmanaged fixture must be consumed from node_modules, outside ZUI transformation.',
  );
  for (const name of ['@zui/core', '@zui/svelte']) {
    const installed = await realpath(join(directory, 'node_modules', name));
    assert(
      installed.startsWith(directory + sep),
      'Package must be installed outside the workspace',
    );
    const dist = await readdir(join(installed, 'dist'), { recursive: true });
    assert(
      !dist.some((file) => /(?:^|[/\\])test(?:s)?[/\\]|\.test\./u.test(file)),
      'Tests leaked into package',
    );
  }
  run(['exec', 'svelte-kit', 'sync'], directory);
  run(['exec', 'svelte-check', '--tsconfig', './tsconfig.json'], directory);
  run(['exec', 'vite', 'build'], directory);
  run(['exec', 'vite', 'build'], directory, { ZUI_PRERENDER: '1' });
  run(['--filter', '@zui/svelte', 'run', 'test:kit'], root, { ZUI_KIT_DIRECTORY: directory });
  report.success = true;
} finally {
  await mkdir(reportDirectory, { recursive: true });
  await writeFile(join(reportDirectory, 'verification.json'), JSON.stringify(report, null, 2));
  // 仅删除本脚本创建的临时项目；失败时保留以便诊断。
  if (report.success) {
    const target = await realpath(directory);
    assert(
      dirname(target) === (await realpath(tmpdir())) &&
        basename(target).startsWith('zui-packages-'),
      'Unexpected package cleanup directory.',
    );
    await rm(target, { recursive: true });
  } else console.log('Package verification workspace:', directory);
}
