export function createVariableBinding(node: HTMLElement | SVGElement, preserveInitial = true) {
  const originals = new Map<string, { value: string; priority: string }>();
  const applied = new Map<string, string>();
  function restore(name: string) {
    const original = originals.get(name)!;
    // 外部代码在绑定之后改过这个变量时，不用旧快照覆盖它。
    if (node.style.getPropertyValue(name) === applied.get(name)) {
      if (original.value) node.style.setProperty(name, original.value, original.priority);
      else node.style.removeProperty(name);
    }
    originals.delete(name);
    applied.delete(name);
  }
  return {
    update(variables: Readonly<Record<string, string>>) {
      for (const name of applied.keys()) if (!Object.hasOwn(variables, name)) restore(name);
      for (const [name, value] of Object.entries(variables)) {
        if (!originals.has(name))
          originals.set(name, {
            value: preserveInitial ? node.style.getPropertyValue(name) : '',
            priority: preserveInitial ? node.style.getPropertyPriority(name) : '',
          });
        if (node.style.getPropertyValue(name) !== value) node.style.setProperty(name, value);
        applied.set(name, node.style.getPropertyValue(name));
      }
    },
    dispose() {
      for (const name of [...applied.keys()]) restore(name);
    },
  };
}
