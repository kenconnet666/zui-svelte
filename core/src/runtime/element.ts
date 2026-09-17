import type { StyleBinding, StyleSnapshot } from './binding.js';
import type { TokenSchema } from '../theme/types.js';

interface ClassOwner {
  references: number;
}
const classOwners = new WeakMap<Element, Map<string, ClassOwner>>();

function retainClass(node: Element, name: string): void {
  if (!name) return;
  let owners = classOwners.get(node);
  if (!owners) {
    owners = new Map();
    classOwners.set(node, owners);
  }
  const owner = owners.get(name);
  if (owner) owner.references++;
  else {
    // SSR 已输出的受管 class 也由绑定接管，提升时必须移除旧版本。
    owners.set(name, { references: 1 });
    node.classList.add(name);
  }
}
function releaseClass(node: Element, name: string): void {
  const owners = classOwners.get(node);
  const owner = owners?.get(name);
  if (!owner) return;
  if (--owner.references === 0) {
    node.classList.remove(name);
    owners!.delete(name);
  }
}

export function bindElement<T extends TokenSchema>(
  node: HTMLElement | SVGElement,
  binding: StyleBinding<T>,
): () => void {
  let current = '';
  let applied: Readonly<Record<string, string>> = {};
  const originals = new Map<string, { value: string; priority: string }>();
  function restore(name: string): void {
    const original = originals.get(name);
    if (node.style.getPropertyValue(name) === applied[name]) {
      if (original?.value) node.style.setProperty(name, original.value, original.priority);
      else node.style.removeProperty(name);
    }
    originals.delete(name);
  }
  function update(snapshot: StyleSnapshot) {
    for (const name of Object.keys(applied))
      if (!Object.hasOwn(snapshot.variables, name)) restore(name);
    for (const [name, value] of Object.entries(snapshot.variables)) {
      if (!originals.has(name))
        originals.set(name, {
          value: node.style.getPropertyValue(name),
          priority: node.style.getPropertyPriority(name),
        });
      if (node.style.getPropertyValue(name) !== value) node.style.setProperty(name, value);
    }
    if (snapshot.className !== current) {
      retainClass(node, snapshot.className);
      releaseClass(node, current);
      current = snapshot.className;
    }
    applied = snapshot.variables;
  }
  const unsubscribe = binding.subscribe(update);
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    unsubscribe();
    for (const name of Object.keys(applied)) restore(name);
    releaseClass(node, current);
  };
}
