import { createHash } from 'node:crypto';
import { relative } from 'node:path';
import ts from 'typescript';
import MagicString from 'magic-string';
import { styleProtocol } from '@zui/core';

/** 模块只包装初始化时的 css 调用；函数体保留给实际消费者的求值上下文。 */
export function transformStyleModule(
  content: string,
  filename: string,
  root: string,
  cssModules: readonly string[] = ['@zui/core', '@zui/svelte'],
  editing?: { magic: MagicString; offset: number },
) {
  const source = ts.createSourceFile(filename, content, ts.ScriptTarget.Latest, true);
  const names = new Set<string>();
  const factories = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    if (!cssModules.includes(statement.moduleSpecifier.text)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const binding of bindings.elements) {
      const imported = binding.propertyName?.text ?? binding.name.text;
      if (imported === 'css') names.add(binding.name.text);
      if (imported === 'createCss') factories.add(binding.name.text);
    }
  }
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const init = declaration.initializer;
      if (
        ts.isIdentifier(declaration.name) &&
        init &&
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        factories.has(init.expression.text)
      )
        names.add(declaration.name.text);
    }
  }
  if (!names.size) return undefined;
  const calls: ts.CallExpression[] = [];
  function visit(node: ts.Node) {
    if (ts.isFunctionLike(node) || ts.isClassLike(node)) return;
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      names.has(node.expression.text)
    ) {
      calls.push(node);
      return;
    }
    ts.forEachChild(node, visit);
  }
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations)
        if (declaration.initializer) visit(declaration.initializer);
    }
  }
  if (!calls.length) return undefined;
  const moduleId = createHash('sha256')
    .update(relative(root, filename).replaceAll('\\', '/'))
    .digest('hex')
    .slice(0, 16);
  let owner = '__zuiModule';
  while (content.includes(owner)) owner += '_';
  const create = owner + 'Create';
  const magic = editing?.magic ?? new MagicString(content);
  const offset = editing?.offset ?? 0;
  for (const call of calls) {
    const start = call.expression.getStart(source);
    // 参数仍在原位置求值，保留顶层 await、异常和参数求值顺序。
    magic.overwrite(
      offset + start,
      offset + call.arguments.pos,
      owner +
        '.call(' +
        JSON.stringify(String(start)) +
        ', ' +
        call.expression.getText(source) +
        (call.arguments.length ? ',' : ''),
    );
  }
  magic.appendLeft(
    offset,
    'import { createStyleModule as ' +
      create +
      ' } from "@zui/core";\nconst ' +
      owner +
      ' = ' +
      create +
      '(' +
      JSON.stringify(moduleId) +
      ', ' +
      styleProtocol.version +
      ');\n',
  );
  magic.appendLeft(
    offset + content.length,
    '\nif (import.meta.hot) import.meta.hot.dispose(() => ' + owner + '.dispose());\n',
  );
  return {
    code: magic.toString(),
    map: magic.generateMap({ hires: true, source: filename, includeContent: true }),
  };
}
