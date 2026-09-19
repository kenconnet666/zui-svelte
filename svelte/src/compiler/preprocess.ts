import { createHash } from 'node:crypto';
import { relative } from 'node:path';
import MagicString from 'magic-string';
import { parse, preprocess, type PreprocessorGroup } from 'svelte/compiler';
import type { Plugin } from 'vite';
import { transformStyleModule } from './module.js';
import { styleProtocol } from '@zui/core';
import {
  componentDefinition,
  componentPreprocess,
  type ComponentCompilerOptions,
} from './components.js';
export {
  componentDefinition,
  componentPreprocess,
  transformComponent,
  generateComponentTypes,
} from './components.js';
export type { ComponentDefinition, ComponentCompilerOptions } from './components.js';

interface Node {
  type: string;
  start: number;
  end: number;
  [key: string]: unknown;
}
export interface ClassCompilerOptions extends ComponentCompilerOptions {
  cssModules?: readonly string[];
}
const marker = 'zui-class-compiled';

function isCompiled(
  program: Node | undefined,
  module: string,
  imported: string,
  arity: number,
): boolean {
  const statements = (program?.body as Node[] | undefined) ?? [];
  const names = new Set<string>();
  for (const statement of statements) {
    if (statement.type !== 'ImportDeclaration' || (statement.source as Node).value !== module)
      continue;
    for (const specifier of statement.specifiers as Node[])
      if (specifier.type === 'ImportSpecifier' && (specifier.imported as Node).name === imported)
        names.add((specifier.local as Node).name as string);
  }
  for (const statement of statements) {
    if (statement.type !== 'VariableDeclaration') continue;
    for (const declaration of statement.declarations as Node[]) {
      const init = declaration.init as Node | undefined;
      const callee = init?.callee as Node | undefined;
      if (
        init?.type !== 'CallExpression' ||
        callee?.type !== 'Identifier' ||
        !names.has(callee.name as string)
      )
        continue;
      const args = init.arguments as Node[];
      if (args.length !== arity && args.length !== arity + 1) continue;
      // 实际桥接 import + 初始化调用才是协议证据，普通文字/注释不参与判断。
      styleProtocol.check(args[arity - 1]?.value);
      return true;
    }
  }
  return false;
}
function walk(
  value: unknown,
  visit: (node: Node, parents: readonly Node[]) => void,
  parents: readonly Node[] = [],
): void {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit, parents);
    return;
  }
  const node = value as Node;
  const next = typeof node.type === 'string' ? [...parents, node] : parents;
  if (typeof node.type === 'string') visit(node, parents);
  for (const [key, child] of Object.entries(value)) if (key !== 'loc') walk(child, visit, next);
}
function unique(content: string, prefix: string, reserved: Set<string>): string {
  let result = prefix;
  let index = 0;
  while (reserved.has(result) || new RegExp('\\b' + result + '\\b', 'u').test(content))
    result = prefix + ++index;
  reserved.add(result);
  return result;
}

export function transformClasses(
  content: string,
  filename: string,
  options: ClassCompilerOptions = {},
) {
  const ast = parse(content, { filename, modern: true }) as unknown as Node;
  const instance = ast.instance as Node | null;
  const program = instance?.content as Node | undefined;
  const moduleScript = (ast.module as Node | null)?.content as Node | undefined;
  if (isCompiled(program, options.runtimeModule ?? '@zui/svelte/internal', 'createStyleScope', 3))
    return undefined;
  const magic = new MagicString(content);
  let runes = (ast.options as { runes?: boolean } | null)?.runes === true;
  for (const script of [program, moduleScript])
    walk(script, (node) => {
      if (node.type !== 'CallExpression') return;
      let callee = node.callee as Node;
      while (callee.type === 'MemberExpression') callee = callee.object as Node;
      if (
        callee.type === 'Identifier' &&
        ['$state', '$derived', '$effect', '$props', '$bindable', '$inspect', '$host'].includes(
          callee.name as string,
        )
      )
        runes = true;
    });
  const reserved = new Set<string>();
  const allocate = (prefix: string) => unique(content, prefix, reserved);
  const mergeAttributes = Boolean(componentDefinition(filename, options));
  const merge = allocate('__zuiMergeProps');
  const scope = allocate('__zuiScope');
  const create = allocate('__zuiCreate');
  let owner = allocate('__zuiOwner');
  let existingOwner = false;
  const moduleId = createHash('sha256')
    .update(relative(options.root ?? process.cwd(), filename).replaceAll('\\', '/'))
    .digest('hex')
    .slice(0, 16);
  const modules = new Set(options.cssModules ?? ['@zui/core', '@zui/svelte']);
  const imports: { node: Node; local: string; alias: string; imported: string }[] = [];
  const configurationReaders = new Set<string>();
  const loops = new Map<Node, string>();
  const targets: { node: Node; parents: readonly Node[] }[] = [];
  // module 脚本只注册只读定义，仍由每个消费请求收集；共用编辑器保留原文件映射。
  const moduleResult =
    moduleScript &&
    transformStyleModule(
      content.slice(moduleScript.start, moduleScript.end),
      filename + '.module.ts',
      options.root ?? process.cwd(),
      options.cssModules,
      { magic, offset: moduleScript.start },
    );

  if (program)
    walk(program, (node) => {
      if (node.type === 'VariableDeclarator' && (node.id as Node).type === 'Identifier') {
        const init = node.init as Node | undefined;
        const callee = init?.callee as Node | undefined;
        if (
          init?.type === 'CallExpression' &&
          callee?.type === 'MemberExpression' &&
          (callee.object as Node).name === '$props' &&
          (callee.property as Node).name === 'id'
        ) {
          owner = (node.id as Node).name as string;
          existingOwner = true;
        }
      }
      if (node.type !== 'ImportDeclaration') return;
      const source = (node.source as Node).value as string;
      for (const specifier of node.specifiers as Node[]) {
        const local = (specifier.local as Node).name as string;
        if (
          source === (options.runtimeModule ?? '@zui/svelte/internal') &&
          specifier.type === 'ImportSpecifier' &&
          (specifier.imported as Node).name === 'readComponentConfig'
        )
          configurationReaders.add(local);
        if (
          specifier.type === 'ImportSpecifier' &&
          modules.has(source) &&
          ['css', 'componentCss', 'defaultsCss'].includes(
            String((specifier.imported as Node).name ?? (specifier.imported as Node).value),
          )
        ) {
          imports.push({
            node: specifier,
            local,
            alias: allocate('__zuiOriginal' + imports.length),
            imported: String(
              (specifier.imported as Node).name ?? (specifier.imported as Node).value,
            ),
          });
        }
      }
    });
  walk(ast.fragment, (node, parents) => {
    if (node.type === 'EachBlock') {
      if (node.key)
        loops.set(node, content.slice((node.key as Node).start, (node.key as Node).end));
      else if (typeof node.index === 'string') loops.set(node, node.index);
      else {
        const index = allocate('__zuiIndex' + loops.size);
        loops.set(node, index);
        const context = node.context as Node | undefined;
        magic.appendLeft(
          context?.end ?? (node.expression as Node).end,
          context ? ', ' + index : ' as ' + index + 'Item, ' + index,
        );
      }
    }
    if (
      !['RegularElement', 'Component', 'SvelteElement', 'SvelteComponent', 'SvelteSelf'].includes(
        node.type,
      )
    )
      return;
    const attrs = node.attributes as Node[];
    if (
      attrs.some(
        (attr) =>
          attr.type === 'SpreadAttribute' ||
          (attr.type === 'Attribute' &&
            (attr.name === 'class' || attr.name === 'slotProps') &&
            (imports.length > 0 ||
              !Array.isArray(attr.value) ||
              (attr.value as Node[]).some((value) => value.type !== 'Text'))),
      )
    ) {
      targets.push({ node, parents });
    }
  });
  if (!targets.length && !imports.length) {
    if (!moduleResult) return undefined;
    magic.appendLeft(moduleScript!.start, '/* ' + marker + ' */\n');
    return {
      code: magic.toString(),
      map: magic.generateMap({ hires: true, source: filename, includeContent: true }),
    };
  }

  type Part = string | Node;
  function value(attribute: Node): Part[] {
    if (attribute.value === true) return ['true'];
    const items = Array.isArray(attribute.value)
      ? (attribute.value as Node[])
      : [attribute.value as Node];
    if (items.length === 1 && items[0]!.type === 'ExpressionTag') {
      const expression = items[0]!.expression as Node;
      return [expression];
    }
    return items.length
      ? items.flatMap((item, index): Part[] => [
          ...(index ? [' + '] : []),
          ...(item.type === 'Text'
            ? [JSON.stringify(item.data)]
            : ['String((', item.expression as Node, ') ?? "")']),
        ])
      : ['""'];
  }

  function rewrite(attribute: Node, parts: Part[]): void {
    let cursor = attribute.start;
    let prefix = '';
    for (const part of parts) {
      if (typeof part === 'string') {
        prefix += part;
        continue;
      }
      // 只改表达式之间的语法，原表达式及其逐字符源映射保持不变。
      if (cursor < part.start) magic.overwrite(cursor, part.start, prefix);
      else magic.appendLeft(cursor, prefix);
      cursor = part.end;
      prefix = '';
    }
    if (cursor < attribute.end) magic.overwrite(cursor, attribute.end, prefix);
    else magic.appendLeft(cursor, prefix);
  }

  const functionTypes = new Set([
    'FunctionDeclaration',
    'FunctionExpression',
    'ArrowFunctionExpression',
    'ClassDeclaration',
    'ClassExpression',
  ]);
  function hasImmediate(expression: Node, type: string): boolean {
    let found = false;
    walk(expression, (node, parents) => {
      if (!parents.some((parent) => functionTypes.has(parent.type)) && node.type === type)
        found = true;
    });
    return found;
  }
  function wrapSnapshot(expression: Node, callback = false) {
    if (hasImmediate(expression, 'AwaitExpression')) return;
    magic.appendLeft(
      expression.start,
      (callback ? scope + '.wrapSnapshot(' : '') + scope + '.snapshot(() => (',
    );
    magic.appendLeft(expression.end, callback ? ')))' : '))');
  }
  // 脚本初始化需要自己的生产者上下文；只有真正执行 css 时才选择 runtime。
  // Rune 保持在原声明位置，避免把 $state/$derived 变成无效的嵌套调用。
  if (program)
    walk(program, (node, parents) => {
      if (
        node.type !== 'VariableDeclarator' ||
        parents.some((parent) => functionTypes.has(parent.type))
      )
        return;
      const init = node.init as Node | undefined;
      if (!init || functionTypes.has(init.type)) return;
      const callee = init.callee as Node | undefined;
      const name =
        callee?.type === 'Identifier'
          ? (callee.name as string)
          : callee?.type === 'MemberExpression' &&
              !callee.computed &&
              (callee.object as Node).type === 'Identifier'
            ? (callee.object as Node).name + '.' + (callee.property as Node).name
            : '';
      if (name.startsWith('$')) {
        const argument = (init.arguments as Node[] | undefined)?.[0];
        if (argument && ['$state', '$state.raw', '$derived', '$derived.by'].includes(name))
          wrapSnapshot(argument, name === '$derived.by');
      } else if (hasImmediate(init, 'CallExpression')) {
        // 配置句柄只捕获上下文，不生产 CSS；保持其初始化调用可识别、可幂等。
        if (callee?.type === 'Identifier' && configurationReaders.has(String(callee.name))) return;
        if (!hasImmediate(init, 'AwaitExpression')) wrapSnapshot(init);
        else if (callee?.type === 'Identifier') wrapSnapshot(callee, true);
      }
    });

  for (const { node, parents } of targets) {
    const attrs = (node.attributes as Node[]).filter(
      (attr) => attr.type === 'Attribute' || attr.type === 'SpreadAttribute',
    );
    if (!attrs.length) continue;
    const keys = parents.flatMap((parent, index) => {
      if (parent.type === 'EachBlock' && parents[index + 1] === parent.body)
        return [loops.get(parent)!];
      if (parent.type === 'KeyBlock') {
        const expression = parent.expression as Node;
        return [content.slice(expression.start, expression.end)];
      }
      return [];
    });
    const component = ['Component', 'SvelteComponent', 'SvelteSelf'].includes(node.type);
    // Snippet/await 的一次源码位置可能对应多个并发渲染实例；先走完整规则，避免猜测实例身份。
    const transient = parents.some(
      (parent) => parent.type === 'SnippetBlock' || parent.type === 'AwaitBlock',
    );
    const start =
      '{...' +
      scope +
      '.' +
      (component ? 'component' : 'attrs') +
      '(' +
      JSON.stringify(String(node.start)) +
      (mergeAttributes ? ', () => ' + merge + '(' : ', () => ({');
    const end =
      (mergeAttributes ? '),' : '}),') + ' [' + keys.join(',') + ']' + ', ' + transient + ')}';
    const argumentsToMove: { expression: Node; parameter: string; produce: boolean }[] = [];
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]!;
      const parts: Part[] =
        attr.type === 'SpreadAttribute'
          ? [mergeAttributes ? '(' : '...(', attr.expression as Node, ')']
          : [
              (mergeAttributes ? '{' : '') + JSON.stringify(attr.name) + ':(',
              ...value(attr),
              ')' + (mergeAttributes ? '}' : ''),
            ];
      rewrite(attr, [i === 0 ? start : ',', ...parts, i === attrs.length - 1 ? end : '']);
      for (const part of parts)
        if (typeof part !== 'string') {
          const parameter = allocate('__zuiValue' + part.start);
          const produce =
            attr.type === 'SpreadAttribute' || attr.name === 'class' || attr.name === 'slotProps';
          argumentsToMove.push({
            expression: part,
            parameter,
            produce,
          });
          // 参数原表达式移到 render tag，让 Svelte 自己保留逐表达式 memo 边界。
          magic.appendLeft(part.start, produce ? scope + '.value(' + parameter + ')' : parameter);
          magic.move(part.start, part.end, node.end);
        }
      if (i > 0) magic.move(attr.start, attr.end, attrs[0]!.end);
    }
    if (argumentsToMove.length) {
      const snippet = allocate('__zuiElement' + node.start);
      magic.prependRight(
        node.start,
        '{#snippet ' + snippet + '(' + argumentsToMove.map((arg) => arg.parameter).join(',') + ')}',
      );
      magic.appendLeft(node.end, '{/snippet}{@render ' + snippet + '(');
      for (let index = 0; index < argumentsToMove.length; index++) {
        const { expression, produce } = argumentsToMove[index]!;
        const prefix = produce
          ? scope + '.produce(' + JSON.stringify(String(expression.start)) + ', () => ('
          : '(';
        const suffix = produce
          ? '), [' + keys.join(',') + '], ' + !component + ', ' + transient + ')'
          : ')';
        magic.prependRight(expression.start, (index ? ',' : '') + prefix);
        magic.appendLeft(
          expression.end,
          suffix + (index === argumentsToMove.length - 1 ? ')}' : ''),
        );
      }
    }
  }
  for (const item of imports)
    magic.overwrite(item.node.start, item.node.end, item.imported + ' as ' + item.alias);
  const header =
    '\nimport { createStyleScope as ' +
    create +
    (mergeAttributes ? ', mergeProps as ' + merge : '') +
    ' } from ' +
    JSON.stringify(options.runtimeModule ?? '@zui/svelte/internal') +
    '; /* ' +
    marker +
    ' */\n' +
    (existingOwner || !runes ? '' : 'const ' + owner + ' = $props.id();\n') +
    'const ' +
    scope +
    ' = ' +
    create +
    '(() => ' +
    (runes ? owner : '"legacy"') +
    ', ' +
    JSON.stringify(moduleId) +
    ', ' +
    styleProtocol.version +
    ', ' +
    runes +
    ');\n' +
    imports
      .map((item) => 'const ' + item.local + ' = ' + scope + '.wrapCss(' + item.alias + ');')
      .join('\n') +
    '\n';
  if (program) magic.appendLeft(program.start, header);
  else magic.prepend('<script>' + header + '</script>\n');
  return {
    code: magic.toString(),
    map: magic.generateMap({ hires: true, source: filename, includeContent: true }),
  };
}

export function classPreprocess(options: ClassCompilerOptions = {}): PreprocessorGroup {
  return {
    name: 'zui-class',
    markup: ({ content, filename }) =>
      transformClasses(content, filename ?? 'Component.svelte', options),
  };
}

export function zui(options: ClassCompilerOptions = {}): Plugin {
  let root = options.root;
  return {
    name: 'zui-class',
    enforce: 'pre',
    configResolved(config) {
      root ??= config.root;
    },
    async transform(code, id) {
      if (id.replaceAll('\\', '/').includes('/node_modules/')) return;
      if (id.endsWith('.svelte')) {
        const settings = { ...options, root };
        if (!componentDefinition(id, settings)) return transformClasses(code, id, settings);
        const result = await preprocess(
          code,
          [componentPreprocess(settings), classPreprocess(settings)],
          { filename: id },
        );
        return result.code === code
          ? undefined
          : {
              code: result.code,
              map: typeof result.map === 'object' ? JSON.stringify(result.map) : result.map,
            };
      }
      if (/\.[cm]?[jt]s$/u.test(id))
        return transformStyleModule(code, id, root ?? process.cwd(), options.cssModules);
    },
  };
}
