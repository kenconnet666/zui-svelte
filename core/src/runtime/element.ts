import type { StyleBinding } from './binding.js';
import type { TokenSchema } from '../theme/types.js';
import { createVariableBinding } from './variables.js';

const classOwners = new WeakMap<Element, Map<string, number>>();

function retainClass(node: Element, name: string): void {
  if (!name) return;
  let owners = classOwners.get(node);
  if (!owners) {
    owners = new Map();
    classOwners.set(node, owners);
  }
  // SSR 的受管 class 也由绑定接管，提升时必须移除旧版本。
  owners.set(name, (owners.get(name) ?? 0) + 1);
  node.classList.add(name);
}
function releaseClass(node: Element, name: string): void {
  const owners = classOwners.get(node);
  const count = owners?.get(name);
  if (!count) return;
  if (count === 1) {
    node.classList.remove(name);
    owners!.delete(name);
  } else owners!.set(name, count - 1);
}

export function bindElement<T extends TokenSchema>(
  node: HTMLElement | SVGElement,
  binding: StyleBinding<T>,
): () => void {
  let current = '';
  const variables = createVariableBinding(node);
  const unsubscribe = binding.subscribe((snapshot) => {
    if (binding.registry.variables === 'inline') variables.update(snapshot.variables);
    if (snapshot.className !== current) {
      retainClass(node, snapshot.className);
      releaseClass(node, current);
      current = snapshot.className;
    }
  });
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    unsubscribe();
    variables.dispose();
    releaseClass(node, current);
  };
}
