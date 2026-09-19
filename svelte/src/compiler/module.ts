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
  const creators = new Set<string>();
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== '@zui/core'
    )
      continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings))
      for (const binding of bindings.elements)
        if ((binding.propertyName?.text ?? binding.name.text) === 'createStyleModule')
          creators.add(binding.name.text);
  }
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const init = declaration.initializer;
      if (
        !init ||
        !ts.isCallExpression(init) ||
        !ts.isIdentifier(init.expression) ||
        !creators.has(init.expression.text) ||
        init.arguments.length !== 2
      )
        continue;
      const version = init.arguments[1]!;
      styleProtocol.check(ts.isNumericLiteral(version) ? Number(version.text) : undefined);
      return undefined;
    }
  }
  const names = new Set<string>();
  const factories = new Set<string>();
  const helpers = new Map<string, ts.Node>();
  function symbolName(node: ts.Expression): string | undefined {
    if (ts.isIdentifier(node)) return node.text;
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression))
      return node.expression.text + '.' + node.name.text;
    return undefined;
  }
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    if (!cssModules.includes(statement.moduleSpecifier.text)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamespaceImport(bindings)) {
      for (const key of ['css', 'componentCss', 'defaultsCss'])
        names.add(bindings.name.text + '.' + key);
      factories.add(bindings.name.text + '.createCss');
    }
    const customModule = !['@zui/core', '@zui/svelte'].includes(statement.moduleSpecifier.text);
    if (customModule && statement.importClause?.name) names.add(statement.importClause.name.text);
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const binding of bindings.elements) {
      const imported = binding.propertyName?.text ?? binding.name.text;
      if (
        ['css', 'componentCss', 'defaultsCss'].includes(imported) ||
        (customModule && imported !== 'createCss')
      )
        names.add(binding.name.text);
      if (imported === 'createCss') factories.add(binding.name.text);
    }
  }
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name && statement.body)
      helpers.set(statement.name.text, statement.body);
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const init = declaration.initializer;
      if (
        ts.isIdentifier(declaration.name) &&
        init &&
        ts.isCallExpression(init) &&
        factories.has(symbolName(init.expression) ?? '')
      )
        names.add(declaration.name.text);
      if (ts.isIdentifier(declaration.name) && init) helpers.set(declaration.name.text, init);
    }
  }
  if (!names.size) return undefined;
  function usesStyle(node: ts.Node): boolean {
    if (ts.isIdentifier(node) && names.has(node.text)) return true;
    if (ts.isPropertyAccessExpression(node) && names.has(symbolName(node) ?? '')) return true;
    return ts.forEachChild(node, usesStyle) ?? false;
  }
  // 仅传播本文件的显式引用；跨模块 helper 由已有 cssModules 配置声明入口。
  let expanded = true;
  while (expanded) {
    expanded = false;
    for (const [name, body] of helpers)
      if (!names.has(name) && usesStyle(body)) {
        names.add(name);
        expanded = true;
      }
  }
  function hasAwait(node: ts.Node): boolean {
    if (ts.isFunctionLike(node) || ts.isClassLike(node)) return false;
    return ts.isAwaitExpression(node) || (ts.forEachChild(node, hasAwait) ?? false);
  }
  const calls: ts.CallExpression[] = [];
  const snapshots: ts.Expression[] = [];
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
        if (declaration.initializer) {
          const init = declaration.initializer;
          if (ts.isFunctionLike(init) || ts.isClassLike(init)) continue;
          const rune = ts.isCallExpression(init) && symbolName(init.expression)?.startsWith('$');
          if (!rune && !hasAwait(init) && usesStyle(init)) snapshots.push(init);
          else visit(init);
        }
    }
  }
  if (!calls.length && !snapshots.length) return undefined;
  const moduleId = createHash('sha256')
    .update(relative(root, filename).replaceAll('\\', '/'))
    .digest('hex')
    .slice(0, 16);
  let owner = '__zuiModule';
  while (content.includes(owner)) owner += '_';
  const create = owner + 'Create';
  const magic = editing?.magic ?? new MagicString(content);
  const offset = editing?.offset ?? 0;
  for (const expression of snapshots) {
    const start = expression.getStart(source);
    // 整个同步初始化共用上下文，map 回调、嵌套 helper 和方法的 this 均保留原语义。
    magic.appendLeft(
      offset + start,
      owner + '.call(' + JSON.stringify(String(start)) + ', () => (',
    );
    magic.appendLeft(offset + expression.end, '))');
  }
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
