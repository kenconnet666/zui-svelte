import { describe, expect, it } from 'vitest';
import { ConfigScope } from '../config.js';
import { enUS } from '../../locale.js';
import { mergeProps, mergeSlotProps } from '../props.js';

describe('configuration inheritance and slot props', () => {
  it('resolves each field from the nearest scope, including common overrides', () => {
    const outer = new ConfigScope(() => ({
      size: 'xl',
      components: { Button: { size: 'sm', block: true } },
    }));
    let size: 'md' | 'lg' = 'md';
    const inner = new ConfigScope(
      () => ({ size, components: { Button: { block: false } } }),
      outer,
    );
    expect(inner.value('Button', 'size')).toBe('md');
    expect(inner.value('Button', 'block')).toBe(false);
    size = 'lg';
    expect(inner.value('Button', 'size')).toBe('lg');
    expect(new ConfigScope(() => ({})).value('Button', 'size')).toBeUndefined();
    expect(new ConfigScope(() => ({ locale: enUS })).value('', 'dir')).toBe('ltr');
  });

  it('merges declared style channels and preserves symbols, data identity and event semantics', () => {
    const attachment = Symbol('attachment');
    const attach = () => {};
    const first = () => 1;
    const last = () => 2;
    const data = { nested: { value: 1 } };
    const result = mergeProps<Record<PropertyKey, unknown>>(
      {
        class: ['base'],
        style: 'color:red',
        onclick: first,
        slotProps: { icon: { class: 'a', title: 'base' } },
      },
      {
        class: { active: true },
        style: 'padding:2px',
        onclick: last,
        data,
        [attachment]: attach,
        slotProps: { icon: { class: 'b' }, content: { title: 'content' } },
      },
    );
    expect(result.class).toBe('base active');
    expect(result.style).toBe('color:red;padding:2px');
    expect(result.onclick).toBe(last);
    expect(result.data).toBe(data);
    expect(result[attachment]).toBe(attach);
    expect(result.slotProps).toEqual({
      icon: { class: 'a b', title: 'base' },
      content: { title: 'content' },
    });
  });

  it('preserves shared slot objects but rejects recursive slot structures and non-native styles', () => {
    const shared = { class: 'shared' };
    expect(mergeSlotProps({ a: shared, b: shared })).toEqual({ a: shared, b: shared });
    const cycle: Record<string, unknown> = {};
    cycle.slotProps = { child: cycle };
    expect(() => mergeProps(cycle)).toThrow('Cyclic');
    expect(() => mergeProps({ style: { color: 'red' } })).toThrow('native CSS');
    const proto = JSON.parse('{"__proto__":{"polluted":true}}');
    expect(Object.getPrototypeOf(mergeProps(proto))).toBeNull();
    expect(Object.hasOwn({}, 'polluted')).toBe(false);
  });

  it('keeps parent class and nested slot overrides while ignoring unspecified fields', () => {
    const parent = new ConfigScope(() => ({
      components: {
        Button: { class: 'parent', slotProps: { icon: { class: 'icon', size: 'sm' } } },
      },
    }));
    const child = new ConfigScope(
      () => ({
        components: {
          Button: {
            class: 'child',
            slotProps: { icon: { size: undefined }, content: { title: 'text' } },
          },
        },
      }),
      parent,
    );
    expect(child.styles('Button')).toEqual({
      class: 'parent child',
      slotProps: { icon: { class: 'icon', size: 'sm' }, content: { title: 'text' } },
    });
  });
});
