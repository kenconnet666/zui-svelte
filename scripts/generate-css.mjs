import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { format } from 'prettier';
import { propertyOptions } from '../core/src/css/schema.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'core/package.json'));
const manifest = require.resolve('csstype/package.json');
const entry = join(dirname(manifest), 'index.d.ts');
const version = JSON.parse(await readFile(manifest, 'utf8')).version;
// 用上游泛型的标记值辨认长度/时间位置，补齐人工语义表未列出的标准属性。
// 虚拟文件只存在于 CompilerHost 中，不向仓库写临时源文件。
const probePath = join(root, 'core/__css-unit-probe__.ts');
const probeText =
  "import type { Properties } from 'csstype'; type Probe = Properties<'__zui_length__', '__zui_time__'>;";
const compilerOptions = {
  strict: true,
  skipLibCheck: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
};
const host = ts.createCompilerHost(compilerOptions);
const originalSource = host.getSourceFile.bind(host);
host.getSourceFile = (path, languageVersion, onError, shouldCreateNewSourceFile) =>
  resolve(path) === probePath
    ? ts.createSourceFile(path, probeText, languageVersion, true)
    : originalSource(path, languageVersion, onError, shouldCreateNewSourceFile);
const program = ts.createProgram([entry, probePath], compilerOptions, host);
const checker = program.getTypeChecker();
const source = program.getSourceFile(entry);
const declaration = source.statements.find(
  (node) => ts.isInterfaceDeclaration(node) && node.name.text === 'Properties',
);
if (!declaration) throw new Error('csstype Properties interface not found.');
const properties = checker.getPropertiesOfType(checker.getTypeAtLocation(declaration));
const probe = program.getSourceFile(probePath).statements.find(ts.isTypeAliasDeclaration);
const probeProperties = new Map(
  checker
    .getPropertiesOfType(checker.getTypeAtLocation(probe))
    .map((property) => [property.name, property]),
);
if (probeProperties.size !== properties.length)
  throw new Error('CSS unit probe did not resolve the complete upstream property set.');
const globals = ['inherit', 'initial', 'revert', 'revert-layer', 'unset'];
const keywordGroups = [];
const groupIds = new Map();
const metadata = {};
const typeLines = [];
let inferredUnits = 0;

function keywordName(value) {
  return value.replace(/^-+/u, '').replace(/-([a-z])/gu, (_, letter) => letter.toUpperCase());
}
function literals(type) {
  if (type.isUnion()) return type.types.flatMap(literals);
  return type.isStringLiteral() ? [type.value] : [];
}
for (const property of properties.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
  const name = property.name;
  const values = [
    ...new Set([...globals, ...literals(checker.getTypeOfSymbolAtLocation(property, declaration))]),
  ]
    .filter((value) => /^-?[a-z][a-z0-9-]*$/iu.test(value))
    .sort();
  const keywords = Object.fromEntries(values.map((value) => [keywordName(value), value]));
  if (Object.keys(keywords).length !== values.length)
    throw new Error('Keyword alias collision: ' + name);
  const signature = JSON.stringify(keywords);
  let group = groupIds.get(signature);
  if (group === undefined) {
    group = keywordGroups.length;
    groupIds.set(signature, group);
    keywordGroups.push(keywords);
  }
  const probeProperty = probeProperties.get(name);
  const probeValues = probeProperty
    ? literals(checker.getTypeOfSymbolAtLocation(probeProperty, probe))
    : [];
  const inferred = probeValues.includes('__zui_length__')
    ? 'length'
    : probeValues.includes('__zui_time__')
      ? 'time'
      : undefined;
  const options = { ...(inferred ? { units: inferred } : {}), ...propertyOptions[name] };
  if (inferred && !propertyOptions[name]?.units) inferredUnits++;
  const cssName = name
    .replace(/[A-Z]/gu, (letter) => '-' + letter.toLowerCase())
    .replace(/^ms-/u, '-ms-');
  metadata[name] = { name: cssName, group, ...options };
  const keywordType = 'keyof (typeof keywordGroups)[' + group + ']';
  const unitType = options.units ? JSON.stringify(options.units) : 'never';
  const doc = ts
    .displayPartsToString(property.getDocumentationComment(checker))
    .split('\n')[0]
    ?.replaceAll('*/', '* /');
  typeLines.push(
    '  /** ' +
      (doc || cssName) +
      ' */\n  readonly ' +
      name +
      ': Carrier<' +
      JSON.stringify(name) +
      ', ' +
      keywordType +
      ', ' +
      unitType +
      ', ' +
      (options.arity ?? 1) +
      ', ' +
      JSON.stringify(options.tokens ?? '') +
      ', T, M>;',
  );
}
for (const name of Object.keys(propertyOptions)) {
  if (!Object.hasOwn(metadata, name)) throw new Error('Unknown property override: ' + name);
}
const header =
  '// 自动生成，请运行 pnpm generate；勿手工修改。来源：csstype ' +
  version +
  '（MIT）及 schema.ts。\n';
const outputs = {
  'core/src/css/metadata.generated.ts':
    header +
    'export const keywordGroups = ' +
    JSON.stringify(keywordGroups) +
    ' as const;\nexport const propertyMetadata = ' +
    JSON.stringify(metadata) +
    ' as const;\n',
  'core/src/css/properties.generated.ts':
    header +
    "import type { Carrier, PropertyTokenMap } from './carrier.js';\nimport type { keywordGroups } from './metadata.generated.js';\nimport type { TokenSchema } from '../theme/types.js';\nimport type { DefaultTokens } from '../theme/presets.js';\nexport interface StyleProperties<T extends TokenSchema = DefaultTokens, M extends PropertyTokenMap<T> = object> {\n" +
    typeLines.join('\n') +
    '\n}\n',
};
for (const [path, text] of Object.entries(outputs)) {
  const output = await format(text, { parser: 'typescript', singleQuote: true, printWidth: 100 });
  const target = join(root, path);
  if (process.argv.includes('--check')) {
    if ((await readFile(target, 'utf8')) !== output)
      throw new Error('Generated file is stale: ' + path);
  } else await writeFile(target, output);
}
console.log(
  'CSS metadata: ' +
    properties.length +
    ' properties, ' +
    keywordGroups.length +
    ' keyword groups.',
);
await mkdir(join(root, 'core/test-results'), { recursive: true });
await writeFile(
  join(root, 'core/test-results/css-coverage.json'),
  JSON.stringify(
    {
      commit: process.env.GITHUB_SHA ?? null,
      source: { package: 'csstype', version },
      properties: properties.length,
      keywordGroups: keywordGroups.length,
      inferredUnits,
      unitProperties: Object.keys(metadata).filter((name) => metadata[name].units),
      tokenProperties: Object.keys(metadata).filter((name) => metadata[name].tokens),
      propertiesWithoutUnitOrTokenHelpers: Object.keys(metadata).filter(
        (name) => !metadata[name].units && !metadata[name].tokens,
      ),
    },
    null,
    2,
  ) + '\n',
);
