import assert from 'node:assert/strict';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { format } from 'prettier';

const root = fileURLToPath(new URL('../', import.meta.url));
const requireCore = createRequire(join(root, 'core/package.json'));
const { build } = await import(pathToFileURL(requireCore.resolve('vite')).href);
const entry = join(root, 'core/dist/index.d.ts');
const program = ts.createProgram([entry], {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
});
const checker = program.getTypeChecker();
const source = program.getSourceFile(entry);
assert(source, 'Build core before checking its published contract.');
const internal = (node) => ts.getJSDocTags(node).some((tag) => tag.tagName.text === 'internal');
const hidden = new Set(
  source.statements
    .filter(internal)
    .flatMap((node) =>
      ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)
        ? node.exportClause.elements.map((item) => item.name.text)
        : [],
    ),
);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: true });
function printable(declaration) {
  // 快照只锁公开成员，避免把后端私有缓存布局也变成兼容承诺。
  const visible = (member) =>
    !internal(member) &&
    !(member.name && ts.isPrivateIdentifier(member.name)) &&
    !member.modifiers?.some(
      (modifier) =>
        modifier.kind === ts.SyntaxKind.PrivateKeyword ||
        modifier.kind === ts.SyntaxKind.ProtectedKeyword,
    );
  if (ts.isInterfaceDeclaration(declaration))
    return ts.factory.updateInterfaceDeclaration(
      declaration,
      declaration.modifiers,
      declaration.name,
      declaration.typeParameters,
      declaration.heritageClauses,
      declaration.members.filter(visible),
    );
  if (ts.isClassDeclaration(declaration))
    return ts.factory.updateClassDeclaration(
      declaration,
      declaration.modifiers,
      declaration.name,
      declaration.typeParameters,
      declaration.heritageClauses,
      declaration.members.filter(visible),
    );
  return declaration;
}
const snapshot = {};
for (const symbol of checker
  .getExportsOfModule(checker.getSymbolAtLocation(source))
  .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
  if (hidden.has(symbol.name)) continue;
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  snapshot[symbol.name] = (target.declarations ?? []).map((declaration) =>
    printer
      .printNode(ts.EmitHint.Unspecified, printable(declaration), declaration.getSourceFile())
      .trim(),
  );
}
const publicExports = Object.keys(snapshot).length;
// 公开签名引用的载体与绑定也要锁定成员，不能只快照返回类型的名字。
for (const [file, names] of [
  ['css/builder.d.ts', ['StyleHelpers']],
  ['css/carrier.d.ts', ['Carrier']],
  ['theme/types.d.ts', ['ThemeDefinition', 'ResolvedTokens', 'WidenTokens']],
  ['runtime/binding.d.ts', ['StyleBinding']],
]) {
  const path = join(root, 'core/dist', file);
  const parsed = ts.createSourceFile(
    path,
    await readFile(path, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  for (const node of parsed.statements)
    if (node.name && names.includes(node.name.text))
      snapshot[node.name.text] = [
        printer.printNode(ts.EmitHint.Unspecified, printable(node), parsed).trim(),
      ];
}
const text = await format(JSON.stringify(snapshot), { parser: 'json', printWidth: 100 });
const snapshotPath = join(root, '.design/core-api.json');
if (process.argv.includes('--update')) await writeFile(snapshotPath, text);
else
  assert.deepEqual(
    JSON.parse(await readFile(snapshotPath, 'utf8')),
    snapshot,
    'Public API changed; review and run pnpm contracts:update.',
  );

const budget = JSON.parse(
  await readFile(join(root, '.design/core-distribution-budget.json'), 'utf8'),
);
const bundle = await build({
  root,
  configFile: false,
  logLevel: 'silent',
  build: {
    lib: { entry: join(root, 'core/dist/index.js'), formats: ['es'] },
    write: false,
    minify: true,
    target: 'es2023',
  },
});
const outputs = (Array.isArray(bundle) ? bundle : [bundle]).flatMap((result) => result.output);
const chunks = outputs.filter((output) => output.type === 'chunk');
assert(
  chunks.every((chunk) => !chunk.imports.length && !chunk.dynamicImports.length),
  'Core browser bundle must not need external or Node imports.',
);
const code = chunks.map((chunk) => chunk.code).join('\n');
const minimal = await build({
  root,
  configFile: false,
  logLevel: 'silent',
  resolve: { alias: { '@zui/core': join(root, 'core/dist/index.js') } },
  plugins: [
    {
      name: 'zui-contract-consumer',
      resolveId(id) {
        if (id.replaceAll('\\', '/').endsWith('virtual:zui-base')) return '\0zui-base';
      },
      load(id) {
        if (id === '\0zui-base') return "export { baseTheme } from '@zui/core';";
      },
    },
  ],
  build: {
    lib: { entry: 'virtual:zui-base', formats: ['es'] },
    write: false,
    minify: true,
    target: 'es2023',
  },
});
const minimalCode = (Array.isArray(minimal) ? minimal : [minimal])
  .flatMap((result) => result.output)
  .filter((output) => output.type === 'chunk')
  .map((chunk) => chunk.code)
  .join('\n');
assert(
  !minimalCode.includes('#4f46e5') && !minimalCode.includes('#a5b4fc'),
  'Unused light/dark presets must be tree shaken.',
);
const declarationFiles = (await readdir(join(root, 'core/dist'), { recursive: true })).filter(
  (file) => file.endsWith('.d.ts'),
);
const declarationBytes = (
  await Promise.all(declarationFiles.map((file) => readFile(join(root, 'core/dist', file))))
).reduce((sum, buffer) => sum + buffer.length, 0);
const report = {
  commit: process.env.GITHUB_SHA ?? null,
  publicExports,
  contractEntries: Object.keys(snapshot).length,
  jsBytes: Buffer.byteLength(code),
  gzipBytes: gzipSync(code).length,
  declarationBytes,
  baseGzipBytes: gzipSync(minimalCode).length,
};
console.log(JSON.stringify(report));
for (const key of ['jsBytes', 'gzipBytes', 'declarationBytes', 'baseGzipBytes'])
  assert(report[key] <= budget[key], `${key}: ${report[key]} exceeds ${budget[key]}`);
await mkdir(join(root, 'core/test-results'), { recursive: true });
await writeFile(join(root, 'core/test-results/core-browser.mjs'), code);
await writeFile(
  join(root, 'core/test-results/contracts.json'),
  JSON.stringify(report, null, 2) + '\n',
);
