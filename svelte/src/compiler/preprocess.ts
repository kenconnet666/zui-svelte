import { createHash } from 'node:crypto';
import { relative } from 'node:path';
import MagicString from 'magic-string';
import { parse, type PreprocessorGroup } from 'svelte/compiler';
import type { Plugin } from 'vite';
import { transformStyleModule } from './module.js';

interface Node {
  type: string;
  start: number;
  end: number;
  [key: string]: unknown;
}
export interface ClassCompilerOptions {
  root?: string;
  runtimeModule?: string;
  cssModules?: readonly string[];
}
const marker = 'zui-class-compiled';
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
function unique(content: string, prefix: string): string {
  let result = prefix;
  let index = 0;
  while (new RegExp('\\b' + result + '\\b', 'u').test(content)) result = prefix + ++index;
  return result;
}

export function transformClasses(
  content: string,
  filename: string,
  options: ClassCompilerOptions = {},
) {
  if (content.includes(marker)) return undefined;
  const ast = parse(content, { filename, modern: true }) as unknown as Node;
  const magic = new MagicString(content);
  const scope = unique(content, '__zuiScope');
  const create = unique(content, '__zuiCreate');
  let owner = unique(content, '__zuiOwner');
  let existingOwner = false;
  const moduleId = createHash('sha256')
    .update(relative(options.root ?? process.cwd(), filename).replaceAll('\\', '/'))
    .digest('hex')
    .slice(0, 16);
  const modules = new Set(options.cssModules ?? ['@zui/core', '@zui/svelte']);
  const imports: { node: Node; local: string; alias: string }[] = [];
  const managed = new Set<string>();
  const loops = new Map<Node, string>();
  const targets: { node: Node; parents: readonly Node[] }[] = [];
  const instance = ast.instance as Node | null;
  const program = instance?.content as Node | undefined;
  const moduleScript = (ast.module as Node | null)?.content as Node | undefined;
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
        if (source.startsWith('.') && source.endsWith('.svelte')) managed.add(local);
        if (
          specifier.type === 'ImportSpecifier' &&
          modules.has(source) &&
          ((specifier.imported as Node).name ?? (specifier.imported as Node).value) === 'css'
        ) {
          imports.push({
            node: specifier,
            local,
            alias: unique(content, '__zuiOriginal' + imports.length),
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
        const index = unique(content, '__zuiIndex' + loops.size);
        loops.set(node, index);
        const context = node.context as Node | undefined;
        magic.appendLeft(
          context?.end ?? (node.expression as Node).end,
          context ? ', ' + index : ' as ' + index + 'Item, ' + index,
        );
      }
    }
    if (!['RegularElement', 'Component', 'SvelteElement'].includes(node.type)) return;
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

  function value(attribute: Node): string {
    if (attribute.value === true) return 'true';
    const items = Array.isArray(attribute.value)
      ? (attribute.value as Node[])
      : [attribute.value as Node];
    if (items.length === 1 && items[0]!.type === 'ExpressionTag') {
      const expression = items[0]!.expression as Node;
      return content.slice(expression.start, expression.end);
    }
    return (
      items
        .map((item) =>
          item.type === 'Text'
            ? JSON.stringify(item.data)
            : 'String((' +
              content.slice((item.expression as Node).start, (item.expression as Node).end) +
              ') ?? "")',
        )
        .join(' + ') || '""'
    );
  }

  for (const { node, parents } of targets) {
    const attrs = (node.attributes as Node[]).filter(
      (attr) => attr.type === 'Attribute' || attr.type === 'SpreadAttribute',
    );
    if (!attrs.length) continue;
    const entries = attrs.map((attr) =>
      attr.type === 'SpreadAttribute'
        ? '...(' +
          content.slice((attr.expression as Node).start, (attr.expression as Node).end) +
          ')'
        : JSON.stringify(attr.name) + ':(' + value(attr) + ')',
    );
    const keys = parents.flatMap((parent, index) => {
      if (parent.type === 'EachBlock' && parents[index + 1] === parent.body)
        return [loops.get(parent)!];
      if (parent.type === 'KeyBlock') {
        const expression = parent.expression as Node;
        return [content.slice(expression.start, expression.end)];
      }
      return [];
    });
    const component = node.type === 'Component';
    // Snippet/await 的一次源码位置可能对应多个并发渲染实例；先走完整规则，避免猜测实例身份。
    const transient = parents.some(
      (parent) => parent.type === 'SnippetBlock' || parent.type === 'AwaitBlock',
    );
    const call =
      scope +
      '.' +
      (component ? 'component' : 'attrs') +
      '(' +
      JSON.stringify(String(node.start)) +
      ', () => ({' +
      entries.join(',') +
      '}), [' +
      keys.join(',') +
      ']' +
      (component ? ', ' + managed.has(node.name as string) : '') +
      ', ' +
      transient +
      ')';
    for (let i = 0; i < attrs.length; i++) {
      magic.overwrite(attrs[i]!.start, attrs[i]!.end, i === 0 ? '{...' + call + '}' : '');
    }
  }
  for (const item of imports)
    magic.overwrite(item.node.start, item.node.end, 'css as ' + item.alias);
  const header =
    '\nimport { createStyleScope as ' +
    create +
    ' } from ' +
    JSON.stringify(options.runtimeModule ?? '@zui/svelte/internal') +
    '; /* ' +
    marker +
    ' */\n' +
    (existingOwner ? '' : 'const ' + owner + ' = $props.id();\n') +
    'const ' +
    scope +
    ' = ' +
    create +
    '(() => ' +
    owner +
    ', ' +
    JSON.stringify(moduleId) +
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
    transform(code, id) {
      if (id.replaceAll('\\', '/').includes('/node_modules/')) return;
      if (id.endsWith('.svelte')) return transformClasses(code, id, { ...options, root });
      if (/\.[cm]?[jt]s$/u.test(id))
        return transformStyleModule(code, id, root ?? process.cwd(), options.cssModules);
    },
  };
}
