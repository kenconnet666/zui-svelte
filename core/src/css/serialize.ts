import { compile, middleware, prefixer, serialize, stringify } from 'stylis';
import type { StyleProgram } from './program.js';
import type { Theme, TokenSchema } from '../theme/types.js';
import { validateQuery, validateValue } from './validate.js';

export function canonicalize(program: StyleProgram): string {
  // 不排序声明：重复属性、简写与回退依赖原始顺序。
  return JSON.stringify(program);
}

export function hashText(text: string): string {
  let first = 0x811c9dc5;
  let second = 0x9e3779b9;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    first = Math.imul(first ^ code, 0x01000193);
    second = Math.imul(second ^ code, 0x85ebca6b);
  }
  return (first >>> 0).toString(36) + (second >>> 0).toString(36);
}

export function serializeProgram(program: StyleProgram, selector: string, prefix = true): string {
  const body = (nodes: StyleProgram): string =>
    nodes
      .map((node) =>
        node.kind === 'declaration'
          ? node.property + ':' + node.value + (node.important ? '!important' : '') + ';'
          : node.query + '{' + body(node.children) + '}',
      )
      .join('');
  const ast = compile(selector + '{' + body(program) + '}');
  return serialize(ast, prefix ? middleware([prefixer, stringify]) : stringify);
}

export function serializeTheme<T extends TokenSchema>(theme: Theme<T>, selector = ':root'): string {
  validateQuery(selector, true);
  const declarations = Object.entries(theme.tokens)
    .flatMap(([category, entries]) =>
      Object.entries(entries).map(
        ([token, value]) =>
          theme.variable(category, token) + ':' + validateValue(String(value)) + ';',
      ),
    )
    .join('');
  return selector + '{' + declarations + '}';
}
