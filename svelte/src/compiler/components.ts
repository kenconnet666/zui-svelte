import { relative, resolve } from 'node:path';
import MagicString from 'magic-string';
import { parse, type PreprocessorGroup } from 'svelte/compiler';

interface Node {
  type: string;
  start: number;
  end: number;
  [key: string]: unknown;
}
export interface ComponentDefinition {
  /** 相对 root 的实际文件路径；不会按 basename 猜测组件身份。 */
  file: string;
  name: string;
  defaults: readonly string[];
}
export interface ComponentCompilerOptions {
  root?: string;
  runtimeModule?: string;
  components?: readonly ComponentDefinition[];
}
const protocol = 1;
const protectedProps = new Set([
  'value',
  'checked',
  'open',
  'children',
  'options',
  'loading',
  'disabled',
  'readonly',
  'readOnly',
]);
const normalize = (path: string) => {
  const value = resolve(path).replaceAll('\\', '/');
  return process.platform === 'win32' ? value.toLowerCase() : value;
};

export function componentDefinition(
  filename: string,
  options: ComponentCompilerOptions,
): ComponentDefinition | undefined {
  const names = new Set<string>();
  const files = new Set<string>();
  let result: ComponentDefinition | undefined;
  for (const item of options.components ?? []) {
    const path = normalize(resolve(options.root ?? process.cwd(), item.file));
    if (!/^[A-Za-z][\w]*$/u.test(item.name) || names.has(item.name) || files.has(path))
      throw new Error('Invalid or duplicate component registration: ' + item.name);
    if (
      new Set(item.defaults).size !== item.defaults.length ||
      item.defaults.some((key) => protectedProps.has(key) || /^on[A-Za-z]/u.test(key))
    )
      throw new Error('State and event props cannot be configured: ' + item.name);
    names.add(item.name);
    files.add(path);
    if (path === normalize(filename)) result = item;
  }
  return result;
}

export function transformComponent(
  content: string,
  filename: string,
  options: ComponentCompilerOptions = {},
) {
  const definition = componentDefinition(filename, options);
  if (!definition) return undefined;
  const ast = parse(content, { filename, modern: true }) as unknown as Node;
  const script = ast.instance as Node | null;
  const program = script?.content as Node | undefined;
  if (!program) throw new Error('Registered components need an instance script: ' + filename);
  const body = program.body as Node[];
  const runtimeModule = options.runtimeModule ?? '@zui/svelte/internal';
  const existing = new Set<string>();
  for (const statement of body) {
    if (
      statement.type !== 'ImportDeclaration' ||
      (statement.source as Node).value !== runtimeModule
    )
      continue;
    for (const specifier of statement.specifiers as Node[]) {
      if (
        specifier.type === 'ImportSpecifier' &&
        (specifier.imported as Node).name === 'readComponentConfig'
      )
        existing.add(String((specifier.local as Node).name));
    }
  }
  // 检查真正的生成调用及协议，普通注释/同名文字不能伪装成已经编译。
  for (const statement of body) {
    if (statement.type !== 'VariableDeclaration') continue;
    for (const declaration of statement.declarations as Node[]) {
      const init = declaration.init as Node | undefined;
      if (init?.type === 'CallExpression' && existing.has(String((init.callee as Node).name))) {
        const args = init.arguments as Node[];
        if (args[2]?.value !== protocol || args[0]?.value !== definition.name)
          throw new Error('Component configuration protocol mismatch: ' + filename);
        return undefined;
      }
    }
  }
  const declarations = body.flatMap((statement) =>
    statement.type === 'VariableDeclaration'
      ? (statement.declarations as Node[]).map((node) => ({ statement, node }))
      : [],
  );
  const props = declarations.filter(({ node }) => {
    const init = node.init as Node | undefined;
    return init?.type === 'CallExpression' && (init.callee as Node).name === '$props';
  });
  if (props.length !== 1 || (props[0]!.node.id as Node).type !== 'ObjectPattern')
    throw new Error(
      'Registered components need one destructured $props() declaration: ' + filename,
    );
  const { statement, node } = props[0]!;
  const bindings = new Map<string, { value: Node; property: Node }>();
  for (const property of (node.id as Node).properties as Node[]) {
    if (property.type === 'RestElement') continue;
    if (property.computed) throw new Error('Computed prop names cannot be configured.');
    const key = property.key as Node;
    bindings.set(String(key.name ?? key.value), { value: property.value as Node, property });
  }
  const magic = new MagicString(content);
  const reserved = new Set<string>();
  const allocate = (base: string) => {
    let name = base;
    for (
      let index = 0;
      reserved.has(name) || new RegExp('\\b' + name + '\\b', 'u').test(content);
      index++
    )
      name = base + index;
    reserved.add(name);
    return name;
  };
  const reader = allocate('__zuiReadConfig');
  const config = allocate('__zuiConfig');
  for (const key of definition.defaults) {
    const binding = bindings.get(key);
    if (binding?.value.type !== 'AssignmentPattern')
      throw new Error('Configurable props need an explicit source default: ' + key);
    const expression = binding.value.right as Node;
    if (expression.type === 'CallExpression' && (expression.callee as Node).name === '$bindable')
      throw new Error('Bindable props cannot use configuration defaults: ' + key);
    magic.prependLeft(expression.start, config + '.value(' + JSON.stringify(key) + ', () => (');
    magic.appendLeft(expression.end, '))');
  }
  const derived: string[] = [];
  for (const key of ['class', 'style', 'slotProps']) {
    const binding = bindings.get(key);
    if (!binding) continue;
    if (definition.defaults.includes(key))
      throw new Error('Style channels are merged, not defaulted: ' + key);
    const value = binding.value;
    const identifier = value.type === 'AssignmentPattern' ? (value.left as Node) : value;
    if (identifier.type !== 'Identifier')
      throw new Error('Style props must use a simple binding: ' + key);
    if (value.type === 'AssignmentPattern') {
      const right = value.right as Node;
      if (right.type === 'CallExpression' && (right.callee as Node).name === '$bindable')
        throw new Error('Style configuration props are readonly inputs: ' + key);
    }
    const raw = allocate('__zuiRaw' + key);
    // 简写属性需保留原 prop key；本地名称可继续由作者自由命名。
    magic.overwrite(
      identifier.start,
      identifier.end,
      binding.property.shorthand ? key + ': ' + raw : raw,
    );
    derived.push(
      'let ' +
        identifier.name +
        ' = $derived(' +
        config +
        '.' +
        (key === 'slotProps' ? 'slots' : key) +
        '(' +
        raw +
        '));',
    );
  }
  magic.appendLeft(statement.end, '\n' + derived.join('\n'));
  magic.prependLeft(
    program.start,
    '\nimport { readComponentConfig as ' +
      reader +
      ' } from ' +
      JSON.stringify(runtimeModule) +
      ';\n' +
      'const ' +
      config +
      ' = ' +
      reader +
      '(' +
      JSON.stringify(definition.name) +
      ', ' +
      JSON.stringify(definition.defaults) +
      ', ' +
      protocol +
      ');\n',
  );
  return {
    code: magic.toString(),
    map: magic.generateMap({ hires: true, source: filename, includeContent: true }),
  };
}

export function componentPreprocess(options: ComponentCompilerOptions = {}): PreprocessorGroup {
  return {
    name: 'zui-components',
    markup: ({ content, filename }) =>
      transformComponent(content, filename ?? 'Component.svelte', options),
  };
}

/** 只生成原生 ComponentProps/Pick 组合，不重新分析/抄写业务属性类型。 */
export function generateComponentTypes(
  definitions: readonly ComponentDefinition[],
  root = process.cwd(),
): string {
  componentDefinition(resolve(root, '__registry__'), { root, components: definitions });
  if (!definitions.length)
    return '// 公共视觉组件尚未发布；后续由组件清单生成具体 Pick<Props, Keys>，不抄写属性类型。\nexport type ComponentDefaults = Record<never, never>;\n';
  return (
    "// 自动生成；字段类型以组件源码为唯一来源。\nimport type { ComponentProps } from 'svelte';\n" +
    definitions
      .map(
        (item) =>
          `import ${item.name} from ${JSON.stringify('./' + relative(root, resolve(root, item.file)).replaceAll('\\', '/'))};`,
      )
      .join('\n') +
    '\n' +
    definitions
      .map((item) => `type ${item.name}Props = ComponentProps<typeof ${item.name}>;`)
      .join('\n') +
    '\nexport type ComponentDefaults = {\n' +
    definitions
      .map(
        (item) =>
          `  /** ${item.name} 的白名单默认参数与样式；实例值优先。 */\n  ${JSON.stringify(item.name)}: Partial<Pick<${item.name}Props, ${item.defaults.map((key) => JSON.stringify(key)).join(' | ') || 'never'} | Extract<'class' | 'style' | 'slotProps', keyof ${item.name}Props>>>;`,
      )
      .join('\n') +
    '\n};\n'
  );
}
