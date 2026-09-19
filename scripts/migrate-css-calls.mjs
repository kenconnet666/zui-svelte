import ts from 'typescript';
import { parse } from 'svelte/compiler';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { propertyMetadata, keywordGroups } from '../core/src/css/metadata.generated.ts';
// 默认只处理可执行源码；历史迁移文档中的旧写法由 --docs 显式选择。
const write = process.argv.includes('--write');
const files = execFileSync(
  'rg',
  [
    '--files',
    '--hidden',
    '-g',
    '!node_modules',
    '-g',
    '!.git',
    '-g',
    '!*.generated.*',
    '-g',
    '!pnpm-lock.yaml',
  ],
  { encoding: 'utf8' },
)
  .trim()
  .split(/\r?\n/)
  .filter((f) => /\.(?:ts|js|mjs|svelte|md)$/.test(f) && !f.includes('migrate-css-calls'));
function changes(source, svelte = false, depth = 0) {
  const edits = new Map();
  const builders = new Set(['s']);
  const helpers = new Set([
    '_selector',
    '_media',
    '_supports',
    '_container',
    '_hover',
    '_focusVisible',
    '_before',
    '_after',
    '_important',
  ]);
  const add = (position, value) => edits.set(position, value);
  const method = (name, arg) => {
    const options = propertyMetadata[name];
    const group = keywordGroups[options.group];
    const known = [...Object.values(group.members), ...group.values];
    if (typeof arg === 'string' && (known.includes(arg) || /^_[\w.-]+$/.test(arg))) return 'token';
    return 'raw';
  };
  if (svelte) {
    let ast;
    try {
      ast = parse(source, { modern: true });
    } catch {
      return changes(source, false, depth);
    }
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;
      if (
        node.type === 'CallExpression' &&
        builders.has(node.callee?.object?.name) &&
        helpers.has(node.callee?.property?.name)
      ) {
        for (const argument of node.arguments ?? [])
          if (
            ['ArrowFunctionExpression', 'FunctionExpression'].includes(argument.type) &&
            argument.params[0]?.type === 'Identifier'
          )
            builders.add(argument.params[0].name);
      }
      if (
        node.type === 'CallExpression' &&
        node.callee?.type === 'MemberExpression' &&
        !node.callee.computed &&
        builders.has(node.callee.object?.name) &&
        Object.hasOwn(propertyMetadata, node.callee.property?.name)
      )
        add(
          node.callee.end,
          '.' +
            method(
              node.callee.property.name,
              node.arguments?.[0]?.type === 'Literal' ? node.arguments[0].value : undefined,
            ),
        );
      for (const value of Object.values(node))
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === 'object') visit(value);
    };
    visit(ast);
  } else {
    const ast = ts.createSourceFile(
      'probe.ts',
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const visit = (node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        builders.has(node.expression.expression.text) &&
        helpers.has(node.expression.name.text)
      ) {
        for (const argument of node.arguments)
          if (
            (ts.isArrowFunction(argument) || ts.isFunctionExpression(argument)) &&
            argument.parameters[0] &&
            ts.isIdentifier(argument.parameters[0].name)
          )
            builders.add(argument.parameters[0].name.text);
      }
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        builders.has(node.expression.expression.text) &&
        Object.hasOwn(propertyMetadata, node.expression.name.text)
      )
        add(
          node.expression.end,
          '.' +
            method(
              node.expression.name.text,
              node.arguments[0] && ts.isStringLiteralLike(node.arguments[0])
                ? node.arguments[0].text
                : undefined,
            ),
        );
      // 内嵌测试/SSR/HMR 示例也用 AST 识别调用；只插入方法名，不重写字符串转义。
      if (
        depth < 3 &&
        (ts.isStringLiteralLike(node) ||
          ts.isTemplateHead(node) ||
          ts.isTemplateMiddle(node) ||
          ts.isTemplateTail(node))
      ) {
        const start = node.getStart(ast) + 1;
        const end = node.end - (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) ? 2 : 1);
        const snippet = source.slice(start, end);
        if (snippet.includes('s.'))
          for (const [at, text] of changes(snippet, snippet.includes('<script'), depth + 1))
            add(start + at, text);
      }
      ts.forEachChild(node, visit);
    };
    visit(ast);
  }
  return [...edits];
}
let total = 0;
for (const file of files) {
  if (file.endsWith('.md') && !process.argv.includes('--docs')) continue;
  const source = await readFile(file, 'utf8');
  let edits;
  if (file.endsWith('.md')) {
    edits = [];
    // 文档只处理代码围栏及行内代码，普通叙述不作为脚本迁移。
    for (const match of source.matchAll(
      /```(?:ts|typescript|js|javascript|svelte)?\n([\s\S]*?)```|`([^`\n]+)`/g,
    )) {
      const snippet = match[1] ?? match[2];
      const offset = match.index + match[0].indexOf(snippet);
      edits.push(
        ...changes(snippet, snippet.includes('<script')).map(([at, value]) => [offset + at, value]),
      );
    }
  } else edits = changes(source, file.endsWith('.svelte'));
  edits = [...new Map(edits)].sort((a, b) => b[0] - a[0]);
  if (!edits.length) continue;
  let output = source;
  for (const [at, value] of edits) output = output.slice(0, at) + value + output.slice(at);
  if (write) await writeFile(file, output);
  console.log(file + ': ' + edits.length);
  total += edits.length;
}
console.log((write ? 'migrated' : 'remaining') + ': ' + total);
if (total && !write) process.exitCode = 1;
