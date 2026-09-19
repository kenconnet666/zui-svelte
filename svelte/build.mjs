import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, writeFile, mkdir, rm, realpath } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { format, resolveConfig } from 'prettier';
import components from './components.mjs';

const root = process.cwd();
const source = resolve(root, 'src');
const output = resolve(root, 'dist');
const temporary = await mkdtemp(join(root, '.zui-build-'));
try {
  // bootstrap 只转译编译器，不依赖上一次 dist；类型检查仍由常规检查/CI 负责。
  for (const file of await readdir(join(source, 'compiler'))) {
    if (!file.endsWith('.ts')) continue;
    const code = await readFile(join(source, 'compiler', file), 'utf8');
    const result = ts.transpileModule(code, {
      fileName: join(source, 'compiler', file),
      compilerOptions: {
        target: ts.ScriptTarget.ES2023,
        module: ts.ModuleKind.ESNext,
        verbatimModuleSyntax: true,
      },
    });
    await mkdir(join(temporary, 'compiler'), { recursive: true });
    await writeFile(join(temporary, 'compiler', file.replace(/\.ts$/u, '.js')), result.outputText);
  }
  const compiler = await import(pathToFileURL(join(temporary, 'compiler/preprocess.js')).href);
  const typesFile = join(source, 'component-types.ts');
  const generated = await format(compiler.generateComponentTypes(components, source), {
    ...(await resolveConfig(typesFile)),
    filepath: typesFile,
  });
  if ((await readFile(typesFile, 'utf8').catch(() => '')) !== generated)
    await writeFile(typesFile, generated);
  const pnpm = process.env.npm_execpath;
  assert(pnpm, 'Run this build through pnpm.');
  const result = spawnSync(process.execPath, [pnpm, 'exec', 'svelte-package', '--input', 'src'], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      ZUI_COMPONENT_COMPILER: pathToFileURL(join(temporary, 'compiler/preprocess.js')).href,
    },
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, 'svelte-package failed');
  // package 会扫描全部 src；最终分发必须排除所属模块旁的测试和测试声明。
  const directories = (await readdir(output, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && ['test', 'tests'].includes(entry.name))
    .map((entry) => join(entry.parentPath, entry.name))
    .sort((a, b) => b.length - a.length);
  for (const directory of directories) {
    const delta = relative(output, resolve(directory));
    assert(
      delta && !delta.startsWith('..' + sep) && !isAbsolute(delta),
      'Unexpected test cleanup path',
    );
    await rm(directory, { recursive: true, force: true });
  }
} finally {
  const target = await realpath(temporary);
  assert(
    dirname(target) === (await realpath(root)) && basename(target).startsWith('.zui-build-'),
    'Unexpected compiler cleanup path',
  );
  await rm(target, { recursive: true, force: true });
}
