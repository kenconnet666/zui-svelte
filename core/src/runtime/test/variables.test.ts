import { describe, expect, it } from 'vitest';
import { createVariableBinding } from '../variables.js';
import { createRuntime } from '../runtime.js';

function target() {
  const values = new Map<string, string>();
  const priorities = new Map<string, string>();
  const style = {
    getPropertyValue: (name: string) => values.get(name) ?? '',
    getPropertyPriority: (name: string) => priorities.get(name) ?? '',
    setProperty: (name: string, value: string, priority = '') => {
      values.set(name, value);
      priorities.set(name, priority);
    },
    removeProperty: (name: string) => {
      const previous = values.get(name) ?? '';
      values.delete(name);
      priorities.delete(name);
      return previous;
    },
  };
  return { node: { style } as unknown as HTMLElement, values };
}

describe('shared CSS variable ownership', () => {
  it('restores the first original value only after both owners leave', () => {
    const { node, values } = target();
    values.set('--value', 'original');
    const a = createVariableBinding(node);
    const b = createVariableBinding(node);
    a.update({ '--value': 'one' });
    b.update({ '--value': 'one' });
    a.dispose();
    expect(values.get('--value')).toBe('one');
    b.update({ '--value': 'two' });
    b.dispose();
    expect(values.get('--value')).toBe('original');
    b.dispose();
    expect(values.get('--value')).toBe('original');
  });

  it('preserves external changes made after the last library write', () => {
    const { node, values } = target();
    const a = createVariableBinding(node);
    const b = createVariableBinding(node);
    a.update({ '--value': 'owned' });
    b.update({ '--value': 'owned' });
    values.set('--value', 'external');
    a.dispose();
    b.dispose();
    expect(values.get('--value')).toBe('external');
  });

  it('restores the original priority but preserves a later external priority change', () => {
    const { node } = target();
    node.style.setProperty('--value', 'original', 'important');
    const binding = createVariableBinding(node);
    binding.update({ '--value': 'owned' });
    binding.dispose();
    expect(node.style.getPropertyValue('--value')).toBe('original');
    expect(node.style.getPropertyPriority('--value')).toBe('important');

    const next = createVariableBinding(node);
    next.update({ '--value': 'owned' });
    // 外部只改变优先级也属于有效修改，清理时不能把它覆盖回旧值。
    node.style.setProperty('--value', 'owned', 'important');
    next.dispose();
    expect(node.style.getPropertyValue('--value')).toBe('owned');
    expect(node.style.getPropertyPriority('--value')).toBe('important');
  });

  it('encodes binding IDs without collisions across namespaces', () => {
    const a = createRuntime({ namespace: 'z' });
    const b = createRuntime({ namespace: 'z-b-x' });
    const first = a.binding({ id: 'x-b-y' });
    const second = b.binding({ id: 'y' });
    for (const width of [100, 120]) {
      first.evaluate((s) => {
        s.width.px(width);
      });
      second.evaluate((s) => {
        s.width.px(width);
      });
    }
    expect(Object.keys(first.snapshot.variables)).not.toEqual(
      Object.keys(second.snapshot.variables),
    );
    a.dispose();
    b.dispose();
  });
});
