import ts from 'typescript';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';
import { propertyOptions } from '../core/src/css/schema.ts';
const path = fileURLToPath(new URL('../svelte/src/theme.ts', import.meta.url));
const source = ts.createSourceFile(
  path,
  await readFile(path, 'utf8'),
  ts.ScriptTarget.Latest,
  true,
);
const definitions = new Map();
for (const node of source.statements)
  if (ts.isVariableStatement(node))
    for (const declaration of node.declarationList.declarations)
      if (ts.isIdentifier(declaration.name))
        definitions.set(declaration.name.text, declaration.initializer);
// 只解释本库主题的静态数据，不执行业务模块或创建第二份运行时主题。
function value(node) {
  if (!node) throw new Error('Missing theme definition');
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  )
    return value(node.expression);
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isIdentifier(node) && definitions.has(node.text)) return value(definitions.get(node.text));
  if (ts.isCallExpression(node) && node.expression.getText(source) === 'tokenRef')
    return { ref: node.arguments.map(value) };
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        Object.assign(result, value(property.expression));
        continue;
      }
      if (!ts.isPropertyAssignment(property)) throw new Error('Unsupported theme property');
      const name =
        ts.isIdentifier(property.name) ||
        ts.isStringLiteralLike(property.name) ||
        ts.isNumericLiteral(property.name)
          ? property.name.text
          : undefined;
      if (name === undefined) throw new Error('Theme key must be static');
      result[name] = value(property.initializer);
    }
    return result;
  }
  throw new Error('Theme type generation needs a static value: ' + node.getText(source));
}
const initializer = definitions.get('lightTheme');
if (!initializer || !ts.isCallExpression(initializer))
  throw new Error('lightTheme must be an explicit theme definition');
const data = value(initializer.arguments[1]);
function resolve(category, key, seen = new Set()) {
  const id = category + '.' + key;
  if (seen.has(id)) throw new Error('Theme alias cycle: ' + id);
  seen.add(id);
  const result = data[category]?.[key];
  if (result === undefined) throw new Error('Unknown theme alias: ' + id);
  return typeof result === 'object' ? resolve(...result.ref, seen) : result;
}
const lines = [
  '// 自动生成：node scripts/generate-theme-types.mjs；默认值说明来自 theme.ts，不是当前 ThemeScope 的计算值。',
  'export type DefaultTokens = {',
];
for (const [category, values] of Object.entries(data)) {
  lines.push(`readonly ${JSON.stringify(category)}: {`);
  for (const [key, raw] of Object.entries(values)) {
    const resolved = resolve(category, key);
    const description = `${category}.${key}；默认 ${JSON.stringify(resolved)}${typeof raw === 'object' ? '；引用 ' + raw.ref.join('.') : ''}。`;
    lines.push('/** ' + description.replaceAll('*/', '* /') + ' */');
    lines.push(
      `readonly ${JSON.stringify(key)}: ${['fontWeight', 'lineHeight'].includes(category) ? 'string | number' : typeof resolved};`,
    );
  }
  lines.push('};');
}
lines.push('};');
// TS 对重映射键不保留原始 JSDoc；内置主题另生成直接成员声明，仅作类型交叉。
const memberType = (category) => category[0].toUpperCase() + category.slice(1) + 'ThemeMembers';
for (const [category, values] of Object.entries(data)) {
  lines.push(`interface ${memberType(category)} {`);
  for (const [key, raw] of Object.entries(values)) {
    const description = `${category}.${key}；默认 ${JSON.stringify(resolve(category, key))}${typeof raw === 'object' ? '；引用 ' + raw.ref.join('.') : ''}。随 ThemeScope 变化。`;
    lines.push('/** ' + description.replaceAll('*/', '* /') + ' */');
    lines.push(`readonly ${JSON.stringify('_' + key)}: void;`);
  }
  lines.push('}');
}
lines.push('interface ThemePropertyDocs {');
for (const [property, options] of Object.entries(propertyOptions)) {
  if (options.tokens && Object.hasOwn(data, options.tokens))
    lines.push(`readonly ${JSON.stringify(property)}: ${memberType(options.tokens)};`);
}
lines.push(
  '}',
  "import type { StyleBuilder } from '@zui/core';",
  'export type DefaultStyleFactory = (s: StyleBuilder<DefaultTokens> & ThemePropertyDocs) => void;',
);
const output = await format(lines.join('\n'), {
  parser: 'typescript',
  singleQuote: true,
  printWidth: 100,
});
const target = fileURLToPath(new URL('../svelte/src/theme-types.generated.ts', import.meta.url));
if (process.argv.includes('--check')) {
  if ((await readFile(target, 'utf8')) !== output)
    throw new Error('Generated theme types are stale');
} else await writeFile(target, output);
console.log(
  'Theme types: ' +
    Object.values(data).reduce((n, values) => n + Object.keys(values).length, 0) +
    ' documented tokens.',
);
