import { runAll } from './callbacks.js';

interface VariableEntry {
  original: string;
  priority: string;
  applied: string;
  appliedPriority: string;
  owners: Set<symbol>;
}
const variablesByNode = new WeakMap<Element, Map<string, VariableEntry>>();

export function createVariableBinding(node: HTMLElement | SVGElement, preserveInitial = true) {
  const owner = Symbol();
  const names = new Set<string>();
  function release(name: string) {
    names.delete(name);
    const variables = variablesByNode.get(node);
    const entry = variables?.get(name);
    if (!entry || !entry.owners.delete(owner) || entry.owners.size) return;
    variables!.delete(name);
    if (!variables!.size) variablesByNode.delete(node);
    // 首个接管者保存原值；最后一个释放时才恢复，并保留外部后来写入的值。
    if (
      node.style.getPropertyValue(name) === entry.applied &&
      node.style.getPropertyPriority(name) === entry.appliedPriority
    ) {
      if (entry.original) node.style.setProperty(name, entry.original, entry.priority);
      else node.style.removeProperty(name);
    }
  }
  return {
    update(values: Readonly<Record<string, string>>) {
      for (const name of names) if (!Object.hasOwn(values, name)) release(name);
      for (const [name, value] of Object.entries(values)) {
        let variables = variablesByNode.get(node);
        if (!variables) variablesByNode.set(node, (variables = new Map()));
        let entry = variables.get(name);
        if (!entry) {
          entry = {
            original: preserveInitial ? node.style.getPropertyValue(name) : '',
            priority: preserveInitial ? node.style.getPropertyPriority(name) : '',
            applied: node.style.getPropertyValue(name),
            appliedPriority: node.style.getPropertyPriority(name),
            owners: new Set(),
          };
          variables.set(name, entry);
        }
        // 同一绑定可被多个消费者挂到同一元素，不能由先离开的消费者删除共享变量。
        entry.owners.add(owner);
        names.add(name);
        if (node.style.getPropertyValue(name) !== value) node.style.setProperty(name, value);
        entry.applied = node.style.getPropertyValue(name);
        entry.appliedPriority = node.style.getPropertyPriority(name);
      }
    },
    dispose() {
      runAll(
        [...names].map((name) => () => release(name)),
        'CSS variable cleanup failed.',
      );
    },
  };
}
