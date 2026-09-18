import { describe, expect, it } from 'vitest';
import { bindTheme, ThemeScope, themeVariables } from '../scope.js';
import { defineTheme, extendTheme, overrideTheme, tokenRef } from '../theme.js';

describe('theme scopes', () => {
  it('does not deliver obsolete snapshots after a subscriber changes the theme again', () => {
    const theme = defineTheme({ color: { text: 'red' } });
    const root = new ThemeScope(theme);
    const child = root.fork({});
    const observed: string[] = [];
    root.subscribe((value) => {
      if (value.resolved.color.text === 'blue')
        root.setTheme(overrideTheme(theme, { color: { text: 'green' } }));
    });
    root.subscribe((value) => observed.push('root:' + value.resolved.color.text));
    child.subscribe((value) => observed.push('child:' + value.resolved.color.text));
    root.setTheme(overrideTheme(theme, { color: { text: 'blue' } }));
    expect(observed).toEqual(['root:red', 'child:red', 'root:green', 'child:green']);
    expect(root.theme.resolved.color.text).toBe('green');
    expect(child.theme.resolved.color.text).toBe('green');
    root.dispose();
  });
  it('keeps its original schema when a compatible superset is temporarily selected', () => {
    const base = defineTheme({ color: { text: 'red' } });
    const scope = new ThemeScope(base);
    const child = scope.fork({ color: { text: 'green' } });
    expect(() => Reflect.construct(ThemeScope, [base, {}, scope])).toThrow('scope.fork()');
    scope.setTheme(extendTheme(base, { color: { unused: 'blue' } }));
    expect(() => scope.setTheme(base)).not.toThrow();
    expect(child.parent).toBe(scope);
    expect(child.theme.resolved.color.text).toBe('green');
    expect(() => scope.setOverrides(null as never)).toThrow('must be an object');
    scope.dispose();
  });
  it('keeps a child override made inside a parent notification', () => {
    const theme = defineTheme({ color: { text: 'red' } });
    const root = new ThemeScope(theme);
    const child = root.fork({});
    const observed: string[] = [];
    root.subscribe((value) => {
      if (value.resolved.color.text === 'blue') child.setOverrides({ color: { text: 'green' } });
    });
    child.subscribe((value) => observed.push(value.resolved.color.text));
    root.setTheme(overrideTheme(theme, { color: { text: 'blue' } }));
    expect(observed).toEqual(['red', 'green']);
    expect(child.theme.resolved.color.text).toBe('green');
    root.dispose();
  });
  it('shares repeated bindings and rejects competing scopes on the same element', () => {
    const values = new Map<string, string>();
    const node = {
      style: {
        getPropertyValue: (name: string) => values.get(name) ?? '',
        getPropertyPriority: () => '',
        setProperty: (name: string, value: string) => values.set(name, value),
        removeProperty: (name: string) => values.delete(name),
      },
    } as unknown as HTMLElement;
    const theme = defineTheme({ color: { primary: 'red' } });
    const first = new ThemeScope(theme);
    const second = first.fork({ color: { primary: 'blue' } });
    const a = bindTheme(node, first);
    const b = bindTheme(node, first);
    expect(() => bindTheme(node, second)).toThrow('already owns');
    a();
    first.setOverrides({ color: { primary: 'green' } });
    expect(values.get('--z-color-primary')).toBe('green');
    b();
    expect(values.size).toBe(0);
    const c = bindTheme(node, second);
    expect(values.get('--z-color-primary')).toBe('blue');
    first.dispose();
    expect(values.size).toBe(0);
    c();
    // 销毁作用域导致首次订阅失败，也必须撤销元素的 namespace 占用。
    expect(() => bindTheme(node, first)).toThrow('initialization failed');
    const replacement = new ThemeScope(theme);
    bindTheme(node, replacement);
    replacement.dispose();
    expect(values.size).toBe(0);
  });
  it('rejects a parent update atomically when a child override would create a cycle', () => {
    const theme = defineTheme({ color: { a: 'red', b: 'blue' } });
    const root = new ThemeScope(theme);
    const child = root.fork({ color: { a: tokenRef('color', 'b') } });
    const before = [root.theme, child.theme];
    expect(() =>
      root.setTheme(overrideTheme(theme, { color: { b: tokenRef('color', 'a') } })),
    ).toThrow('Circular');
    expect(root.theme).toBe(before[0]);
    expect(child.theme).toBe(before[1]);
    root.setOverrides({});
    expect(root.theme.resolved.color.b).toBe('blue');
    expect(child.theme.resolved.color.a).toBe('blue');
    root.dispose();
  });

  it('rejects missing schema keys and still notifies other subscribers after one fails', () => {
    const theme = defineTheme({ color: { a: 'red', b: 'blue' } });
    const root = new ThemeScope(theme);
    expect(() => root.setTheme(defineTheme({ color: { a: 'red' } }) as never)).toThrow(
      'Missing theme token: color.b',
    );
    const observed: string[] = [];
    root.subscribe((value) => {
      if (value.resolved.color.a === 'black') throw new Error('consumer failure');
    });
    root.subscribe((value) => observed.push(value.resolved.color.a));
    expect(() => root.setTheme(overrideTheme(theme, { color: { a: 'black' } }))).toThrow(
      'subscribers failed',
    );
    expect(observed).toEqual(['red', 'black']);
    expect(root.theme.resolved.color.a).toBe('black');
    root.dispose();
  });
  it('updates inherited values while preserving local overrides', () => {
    const theme = defineTheme({ color: { primary: 'red', text: 'black' } });
    const root = new ThemeScope(theme);
    const child = root.fork({ color: { primary: 'blue' } });
    const nested = child.fork({});
    root.setTheme(overrideTheme(theme, { color: { text: 'white' } }));
    expect(nested.theme.resolved.color).toEqual({ primary: 'blue', text: 'white' });
    child.setOverrides({});
    expect(nested.theme.resolved.color.primary).toBe('red');
    expect(themeVariables(child.theme)['--z-color-text']).toBe('white');
    root.dispose();
    expect(() => child.fork({})).toThrow();
  });
  it('keeps the previous state on an invalid override', () => {
    const scope = new ThemeScope(defineTheme({ color: { primary: 'red' } }));
    const before = scope.theme;
    expect(() => scope.setOverrides({ color: { unknown: 'blue' } } as never)).toThrow();
    expect(scope.theme).toBe(before);
    scope.dispose();
  });
  it('releases subscribers when an ancestor scope is disposed', () => {
    const parent = new ThemeScope(defineTheme({ color: { primary: 'red' } }));
    const child = parent.fork({});
    let cleanups = 0;
    const stop = child.subscribe(
      () => {},
      () => {
        cleanups++;
      },
    );
    parent.dispose();
    stop();
    expect(cleanups).toBe(1);
  });
});
