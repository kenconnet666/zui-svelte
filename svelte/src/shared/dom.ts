/** 包含 ShadowRoot 的逻辑祖先判断；不要用一次 contains 猜 Portal/Shadow 边界。 */
export function composedContains(root: Node, target: Node | null): boolean {
  for (let node = target; node;) {
    if (node === root) return true;
    node =
      node.parentNode ??
      (node.nodeType === 11 && 'host' in node ? (node as ShadowRoot).host : null);
  }
  return false;
}

export function styleRoot(element: Node): Document | ShadowRoot {
  const root = element.getRootNode();
  if (root.nodeType === 9 || (root.nodeType === 11 && 'host' in root))
    return root as Document | ShadowRoot;
  throw new Error('The element must belong to a Document or ShadowRoot.');
}

export function activeElement(
  document: Document,
  shadow: (node: Element) => ShadowRoot | null = (node) => node.shadowRoot,
): Element | null {
  let current = document.activeElement;
  const seen = new Set<Element>();
  while (current && !seen.has(current)) {
    seen.add(current);
    const next = shadow(current)?.activeElement;
    if (!next) break;
    current = next;
  }
  return current;
}

export function cleanAll(tasks: Iterable<() => void>): void {
  const errors: unknown[] = [];
  for (const task of tasks)
    try {
      task();
    } catch (error) {
      errors.push(error);
    }
  if (errors.length) throw new AggregateError(errors, 'Resource cleanup failed');
}
