import { afterEach, describe, expect, it } from 'vitest';
import {
  bindElement,
  bindTheme,
  createRuntime,
  defineTheme,
  overrideTheme,
  ThemeScope,
  ClassController,
  createCss,
  lightTheme,
  createStyleModule,
  css,
  styleProtocol,
} from '../src/index.js';

const cleanup: (() => void)[] = [];
afterEach(() => {
  for (const dispose of cleanup.splice(0).reverse()) dispose();
});

function element() {
  const node = document.createElement('div');
  document.body.append(node);
  cleanup.push(() => node.remove());
  return node;
}
function runtime(namespace: string) {
  const value = createRuntime({ target: document, namespace });
  cleanup.push(() => value.dispose());
  return value;
}

describe('real DOM style bindings', () => {
  it('coordinates property registrations across runtimes and releases document claims', () => {
    const first = runtime('property-first');
    const second = runtime('property-second');
    const number = { syntax: '<number>', inherits: false, initialValue: 0 };
    const color = { syntax: '<color>', inherits: false, initialValue: 'red' };
    const a = first.property('--zui-shared-registration', number);
    const b = first.property('--zui-shared-registration', number);
    const c = second.property('--zui-shared-registration', number);
    a.dispose();
    expect(() => second.property('--zui-shared-registration', color)).toThrow('Conflicting');
    c.dispose();
    expect(() => second.property('--zui-shared-registration', color)).toThrow('document property');
    first.dispose();
    b.dispose();
    const replacement = second.property('--zui-shared-registration', color);
    const node = element();
    node.style.color = 'var(--zui-shared-registration)';
    expect(getComputedStyle(node).color).toBe('rgb(255, 0, 0)');
    replacement.dispose();
    first.dispose();
  });
  it('keeps a hyphenated theme namespace from overwriting an instance variable', () => {
    const owner = runtime('variable-domains');
    const node = element();
    const binding = owner.binding({ id: 'panel' });
    for (const width of [100, 120])
      binding.evaluate((s) => {
        s.width.px(width);
      });
    cleanup.push(bindElement(node, binding));
    const theme = defineTheme({ panel: { '0': 'red' } }, { namespace: 'variable-domains-b' });
    const scope = new ThemeScope(theme);
    cleanup.push(() => scope.dispose());
    cleanup.push(bindTheme(node, scope));
    expect(getComputedStyle(node).width).toBe('120px');
    scope.override({ panel: { '0': 'blue' } });
    expect(getComputedStyle(node).width).toBe('120px');
  });
  it('keeps inherited values out of variable promotion regardless of spelling', () => {
    const owner = runtime('wide-keywords');
    const parent = element();
    parent.style.width = '240px';
    const child = document.createElement('div');
    parent.append(child);
    const binding = owner.binding();
    cleanup.push(bindElement(child, binding));
    for (const value of [' INHERIT ', 'InHeRiT', String.raw`\69 nherit`]) {
      binding.evaluate((s) => {
        s.width.px(100);
      });
      binding.evaluate((s) => {
        s.width(value);
      });
      expect(binding.snapshot.variables).toEqual({});
      expect(getComputedStyle(child).width).toBe('240px');
    }
  });
  it('keeps rooted selector branches from selecting unrelated elements', () => {
    const owner = runtime('selector-boundaries');
    const root = element();
    const child = document.createElement('div');
    child.className = 'selector-label';
    root.append(child);
    const outside = element();
    outside.className = 'selector-label';
    const original = getComputedStyle(outside).color;
    const binding = owner.binding();
    binding.evaluate((s) => {
      s._selector('& > :is(.selector-label, .selector-icon), &[data-active]', (s) => {
        s.color('red');
      });
    });
    cleanup.push(bindElement(root, binding));
    expect(getComputedStyle(child).color).toBe('rgb(255, 0, 0)');
    expect(getComputedStyle(outside).color).toBe(original);
    expect(() =>
      binding.evaluate((s) => {
        s._selector(':is(&, body)', () => {});
      }),
    ).toThrow('Each local selector branch');
  });
  it('validates all hydration metadata before taking ownership of server styles', () => {
    const server = createRuntime({ namespace: 'invalid-hydration', nonce: 'request' });
    cleanup.push(() => server.dispose());
    server.css((s) => {
      s.width.px(100);
    }, 'first');
    server.css((s) => {
      s.width.px(120);
    }, 'second');
    document.head.insertAdjacentHTML('beforeend', server.styleTags());
    const nodes = [
      ...document.head.querySelectorAll<HTMLStyleElement>('style[data-zui="invalid-hydration"]'),
    ];
    cleanup.push(() => nodes.forEach((node) => node.remove()));
    const create = () =>
      createRuntime({ target: document, namespace: 'invalid-hydration', nonce: 'request' });
    nodes[1]!.dataset.zProtocol = '0';
    expect(create).toThrow('protocol mismatch');
    expect(nodes.every((node) => node.hasAttribute('data-z-ssr'))).toBe(true);
    nodes[1]!.dataset.zProtocol = String(styleProtocol.version);
    nodes[1]!.nonce = 'wrong';
    expect(create).toThrow('nonces must match');
    expect(nodes.every((node) => node.hasAttribute('data-z-ssr'))).toBe(true);
    nodes[1]!.nonce = 'request';
    const key = nodes[1]!.dataset.zKey;
    nodes[1]!.dataset.zKey = nodes[0]!.dataset.zKey;
    expect(create).toThrow('Duplicate server style');
    expect(nodes.every((node) => node.hasAttribute('data-z-ssr'))).toBe(true);
    nodes[1]!.dataset.zKey = key;
    const client = create();
    cleanup.push(() => client.dispose());
    expect(nodes.every((node) => !node.hasAttribute('data-z-ssr'))).toBe(true);
    client.finishHydration();
    expect(nodes.every((node) => !node.isConnected)).toBe(true);
  });
  it('keeps shared variable ownership until the last attachment is released', () => {
    const owner = runtime('duplicate-binding');
    const binding = owner.binding();
    for (const width of [100, 120])
      binding.evaluate((s) => {
        s.width.px(width);
      });
    const name = Object.keys(binding.snapshot.variables)[0]!;
    const node = element();
    node.style.setProperty(name, '7px');
    const first = bindElement(node, binding);
    const second = bindElement(node, binding);
    first();
    expect(getComputedStyle(node).width).toBe('120px');
    binding.evaluate((s) => {
      s.width.px(140);
    });
    expect(getComputedStyle(node).width).toBe('140px');
    second();
    expect(node.style.getPropertyValue(name)).toBe('7px');
  });
  it('isolates a shared module definition in runtimes with different default layers', () => {
    const module = createStyleModule('shared-module');
    cleanup.push(() => module.dispose());
    const shared = module.call('width', css, (s) => {
      s.width.px(100);
    });
    const layers = ['base', 'override', 'app'];
    const a = createRuntime({ target: document, namespace: 'module-a', layers, layer: 'base' });
    const b = createRuntime({ target: document, namespace: 'module-b', layers, layer: 'app' });
    cleanup.push(
      () => a.dispose(),
      () => b.dispose(),
    );
    const first = new ClassController(a, 'a', 'a');
    const second = new ClassController(b, 'b', 'b');
    cleanup.push(
      () => first.dispose(),
      () => second.dispose(),
    );
    const override = createCss(lightTheme, { layer: 'override' });
    const left = element();
    const right = element();
    left.className = first.resolve(
      first.run(() => [
        shared,
        override((s) => {
          s.width.px(200);
        }),
      ]),
    );
    right.className = second.resolve(
      second.run(() => [
        shared,
        override((s) => {
          s.width.px(200);
        }),
      ]),
    );
    expect(getComputedStyle(left).width).toBe('200px');
    expect(getComputedStyle(right).width).toBe('100px');
    expect(() => createRuntime({ target: document, namespace: 'module-a' })).toThrow(
      'already owns',
    );
    expect(() =>
      createRuntime({ target: document, namespace: 'module-c', layers: ['app', 'base'] }),
    ).toThrow('same layer order');
    a.dispose();
    expect(getComputedStyle(right).width).toBe('100px');
    const replacement = createRuntime({ target: document, namespace: 'module-a' });
    replacement.dispose();
  });
  it('keeps layer precedence and reversed important order across dynamic promotion', () => {
    const owner = createRuntime({
      target: document,
      namespace: 'layers',
      layers: ['base', 'app'],
      variables: 'stylesheet',
    });
    cleanup.push(() => owner.dispose());
    const base = createCss(lightTheme, { layer: 'base' });
    const app = createCss(lightTheme, { layer: 'app' });
    const producer = new ClassController(owner, 'source', 'source');
    const consumer = new ClassController(owner, 'target', 'target');
    cleanup.push(
      () => producer.dispose(),
      () => consumer.dispose(),
    );
    const node = element();
    cleanup.push(consumer.mount(node));
    for (const width of [100, 120, 140]) {
      node.className = consumer.resolve(
        producer.run(() => [
          app((s) => {
            s.width.px(300);
            s._important((s) => {
              s.color('blue');
            });
          }),
          base((s) => {
            s.width.px(width);
            s._important((s) => {
              s.color('red');
            });
          }),
        ]),
      );
      expect(getComputedStyle(node).width).toBe('300px');
      expect(getComputedStyle(node).color).toBe('rgb(255, 0, 0)');
    }
  });
  it('binds and switches theme scopes through the stylesheet channel', () => {
    const owner = createRuntime({
      target: document,
      namespace: 'sheet-theme',
      variables: 'stylesheet',
    });
    cleanup.push(() => owner.dispose());
    const theme = defineTheme({ color: { primary: 'red' } });
    const scope = new ThemeScope(theme);
    cleanup.push(() => scope.dispose());
    const node = element();
    const color = owner.binding();
    color.evaluate((s) => {
      s.color._primary;
    });
    cleanup.push(bindElement(node, color));
    const stop = bindTheme(node, scope, owner);
    const duplicate = bindTheme(node, scope, owner);
    cleanup.push(stop);
    cleanup.push(duplicate);
    expect(owner.bindingCount).toBe(2);
    expect(getComputedStyle(node).color).toBe('rgb(255, 0, 0)');
    scope.update(overrideTheme(theme, { color: { primary: 'blue' } }));
    expect(getComputedStyle(node).color).toBe('rgb(0, 0, 255)');
    expect(node.getAttribute('style')).toBeNull();
    stop();
    expect(owner.bindingCount).toBe(2);
    expect(getComputedStyle(node).color).toBe('rgb(0, 0, 255)');
    duplicate();
    expect(owner.bindingCount).toBe(1);
    expect(node.className).toBe(color.snapshot.className);
  });
  it('updates promoted stylesheet variables without adding a style attribute', () => {
    const owner = createRuntime({
      target: document,
      namespace: 'sheet-vars',
      variables: 'stylesheet',
    });
    cleanup.push(() => owner.dispose());
    const binding = owner.binding();
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const node = element();
    cleanup.push(bindElement(node, binding));
    binding.evaluate((s) => {
      s.width.px(120);
    });
    const className = node.className;
    binding.evaluate((s) => {
      s.width.px(140);
    });
    expect(node.className).toBe(className);
    expect(node.getAttribute('style')).toBeNull();
    expect(getComputedStyle(node).width).toBe('140px');
  });
  it('updates variables and preserves user classes/styles on detach', () => {
    const owner = runtime('browser-one');
    const binding = owner.binding({ id: 'width' });
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const node = element();
    node.className = 'user-class';
    node.style.color = 'red';
    const detach = bindElement(node, binding);
    binding.evaluate((s) => {
      s.width.px(180);
    });
    expect(getComputedStyle(node).width).toBe('180px');
    expect(node.classList.contains('user-class')).toBe(true);
    detach();
    expect(node.className).toBe('user-class');
    expect(node.style.color).toBe('red');
    expect(node.style.length).toBe(1);
  });
  it('cleans one binding without removing a shared class or another binding variables', () => {
    const owner = runtime('browser-two');
    const a = owner.binding({ id: 'a', source: 'shared' });
    const b = owner.binding({ id: 'b', source: 'shared' });
    const shared = a.evaluate((s) => {
      s.width.px(100);
    });
    b.evaluate((s) => {
      s.width.px(100);
    });
    const node = element();
    const stopA = bindElement(node, a);
    const stopB = bindElement(node, b);
    stopA();
    expect(node.classList.contains(shared)).toBe(true);
    b.evaluate((s) => {
      s.width.px(200);
    });
    expect(getComputedStyle(node).width).toBe('200px');
    stopB();
    expect(node.className).toBe('');
  });
  it('adopts SSR rules once and removes the original class when promoted', () => {
    const server = createRuntime({ namespace: 'browser-ssr' });
    const first = server.binding({ id: 'same', source: 'source' });
    const name = first.evaluate((s) => {
      s.width.px(120);
    });
    document.head.insertAdjacentHTML('beforeend', server.styleTags());
    const client = runtime('browser-ssr');
    const next = client.binding({ id: 'same', source: 'source' });
    expect(
      next.evaluate((s) => {
        s.width.px(120);
      }),
    ).toBe(name);
    const node = element();
    node.className = name;
    const stop = bindElement(node, next);
    client.finishHydration();
    expect(document.head.querySelectorAll('style[data-zui="browser-ssr"]').length).toBe(1);
    next.evaluate((s) => {
      s.width.px(160);
    });
    expect(node.classList.contains(name)).toBe(false);
    expect(getComputedStyle(node).width).toBe('160px');
    stop();
    server.dispose();
  });
  it('supports nested theme scopes and an independently mounted portal target', () => {
    const theme = defineTheme({ color: { primary: 'rgb(255, 0, 0)', text: 'rgb(0, 0, 0)' } });
    const scope = new ThemeScope(theme);
    const child = scope.fork({ color: { primary: 'rgb(0, 0, 255)' } });
    cleanup.push(() => scope.dispose());
    const portal = element();
    cleanup.push(bindTheme(portal, child));
    portal.style.color = 'var(--z-color-text)';
    scope.update(overrideTheme(theme, { color: { text: 'rgb(0, 128, 0)' } }));
    expect(getComputedStyle(portal).color).toBe('rgb(0, 128, 0)');
    expect(portal.style.getPropertyValue('--z-color-primary')).toBe('rgb(0, 0, 255)');
  });
  it('isolates ShadowRoot styles and variables', () => {
    const host = element();
    const shadow = host.attachShadow({ mode: 'open' });
    const owner = createRuntime({ target: shadow, namespace: 'shadow-test' });
    cleanup.push(() => owner.dispose());
    const node = document.createElement('div');
    shadow.append(node);
    const binding = owner.binding();
    binding.evaluate((s) => {
      s.width.px(50);
    });
    cleanup.push(bindElement(node, binding));
    binding.evaluate((s) => {
      s.width.px(75);
    });
    expect(getComputedStyle(node).width).toBe('75px');
    expect(document.head.querySelector('style[data-zui="shadow-test"]')).toBeNull();
  });
});
