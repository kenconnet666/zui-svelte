import type { StyleBinding } from './binding.js';
import type { TokenSchema } from '../theme/types.js';
import { createVariableBinding } from './variables.js';
import { runAll } from './callbacks.js';

const classOwners = new WeakMap<Element, Map<string, number>>();

function retainClass(node: Element, name: string): void {
  if (!name) return;
  let owners = classOwners.get(node);
  if (!owners) {
    owners = new Map();
    classOwners.set(node, owners);
  }
  // SSR 的受管 class 也由绑定接管，提升时必须移除旧版本。
  node.classList.add(name);
  owners.set(name, (owners.get(name) ?? 0) + 1);
}
function releaseClass(node: Element, name: string): void {
  const owners = classOwners.get(node);
  const count = owners?.get(name);
  if (!count) return;
  if (count === 1) {
    owners!.delete(name);
    if (!owners!.size) classOwners.delete(node);
    node.classList.remove(name);
  } else owners!.set(name, count - 1);
}

export function bindElement<T extends TokenSchema>(
  node: HTMLElement | SVGElement,
  binding: StyleBinding<T>,
): () => void {
  let current = '';
  const variables = createVariableBinding(node);
  let disposed = false;
  let unsubscribe = () => {};
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    runAll(
      [unsubscribe, () => variables.dispose(), () => releaseClass(node, current)],
      'Element binding cleanup failed.',
    );
  };
  try {
    unsubscribe = binding.subscribe((snapshot) => {
      if (binding.registry.variables === 'inline') variables.update(snapshot.variables);
      if (snapshot.className !== current) {
        retainClass(node, snapshot.className);
        const previous = current;
        current = snapshot.className;
        releaseClass(node, previous);
      }
    });
  } catch (error) {
    runAll(
      [
        () => {
          throw error;
        },
        dispose,
      ],
      'Element binding initialization failed.',
    );
  }
  return dispose;
}
