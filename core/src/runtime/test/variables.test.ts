import { describe, expect, it } from 'vitest';
import { createVariableBinding } from '../variables.js';
import { createRuntime } from '../runtime.js';
import { defineTheme } from '../../theme/theme.js';
import { elementTarget as target } from './target.js';

describe('shared CSS variable ownership', () => {
  it('keeps theme namespaces distinct from dynamic binding variables', () => {
    const theme = defineTheme({ panel: { '0': 'red' } }, { namespace: 'z-b' });
    const runtime = createRuntime({ namespace: 'z' });
    const binding = runtime.binding({ id: 'panel' });
    for (const width of [100, 120])
      binding.evaluate((s) => {
        s.width.px(width);
      });
    expect(theme.variable('panel', '0')).not.toBe(Object.keys(binding.snapshot.variables)[0]);
    const escaped = defineTheme({ panel: { '0': 'red' } }, { namespace: 'z_2d_b' });
    expect(theme.variable('panel', '0')).not.toBe(escaped.variable('panel', '0'));
    runtime.dispose();
  });
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
