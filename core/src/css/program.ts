export interface Declaration {
  readonly kind: 'declaration';
  readonly property: string;
  readonly value: string;
  readonly important: boolean;
}
export interface Rule {
  readonly kind: 'rule';
  readonly query: string;
  readonly children: readonly Instruction[];
}
export type Instruction = Declaration | Rule;
export type StyleProgram = readonly Instruction[];

export function visitDeclarations(
  program: StyleProgram,
  visitor: (declaration: Declaration, index: number, path: readonly string[]) => void,
): void {
  let index = 0;
  function walk(nodes: StyleProgram, path: readonly string[]) {
    for (const node of nodes) {
      if (node.kind === 'declaration') visitor(node, index++, path);
      else walk(node.children, [...path, node.query]);
    }
  }
  walk(program, []);
}

export function replaceValues(
  program: StyleProgram,
  values: ReadonlyMap<number, string>,
): StyleProgram {
  let index = 0;
  function walk(nodes: StyleProgram): StyleProgram {
    return nodes.map((node) =>
      node.kind === 'rule'
        ? { ...node, children: walk(node.children) }
        : { ...node, value: values.get(index++) ?? node.value },
    );
  }
  return walk(program);
}
