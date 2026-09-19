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
  baseTheme,
  createStyleModule,
  css,
  styleProtocol,
  BrowserStyleSheet,
} from '../src/index.js';
import { sourceOrder } from '../src/runtime/sheet.js';

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
  it('preserves CSS string continuations across Windows CRLF input', () => {
    const control = element();
    const node = element();
    const value = '"a\\\r\nb"';
    control.style.content = value;
    node.className = runtime('escaped-lines').css((s) => {
      s.content.raw(value);
    });
    expect(getComputedStyle(control).content).toBe('"ab"');
    expect(getComputedStyle(node).content).toBe(getComputedStyle(control).content);
  });
  it.each(['inline', 'stylesheet'] as const)(
    'keeps DOM theme values current after a reentrant %s update',
    (variables) => {
      const theme = defineTheme({ color: { text: 'red' } });
      const value = createRuntime({ target: document, namespace: 'reentrant', theme, variables });
      cleanup.push(() => value.dispose());
      const scope = new ThemeScope(theme);
      cleanup.push(() => scope.dispose());
      scope.subscribe((current) => {
        if (current.resolved.color.text === 'blue')
          scope.setTheme(overrideTheme(theme, { color: { text: 'green' } }));
      });
      const node = element();
      cleanup.push(bindTheme(node, scope, value));
      const binding = value.binding();
      binding.evaluate((s) => {
        s.color._text;
      });
      cleanup.push(bindElement(node, binding));
      scope.setTheme(overrideTheme(theme, { color: { text: 'blue' } }));
      expect(getComputedStyle(node).color).toBe('rgb(0, 128, 0)');
      expect(scope.theme.resolved.color.text).toBe('green');
    },
  );
  it('coalesces sparse chunks during long-lived structural replacement', () => {
    const sheet = new BrowserStyleSheet(document, 'fragmentation');
    cleanup.push(() => sheet.dispose());
    const expected = new Map<string, string>();
    const keys: string[] = [];
    for (let i = 0; i < 256; i++) {
      const key = 'initial-' + i;
      const css = '.fragment{width:' + i + 'px}';
      keys.push(key);
      expected.set(key, css);
      sheet.set(key, css, sourceOrder('dynamic'));
    }
    for (let round = 0; round < 1024; round++) {
      const slot = round % 256;
      const key = 'next-' + ((round * 7919) % 10007) + '-' + round;
      const css = '.fragment{width:' + (round + 1) + 'px}';
      sheet.set(key, css, sourceOrder('dynamic'));
      sheet.remove(keys[slot]!);
      expected.delete(keys[slot]!);
      keys[slot] = key;
      expected.set(key, css);
    }
    const nodes = [...document.head.querySelectorAll('style[data-zui="fragmentation"]')];
    expect(nodes.length).toBeLessThanOrEqual(8);
    const ordered = [...expected]
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([, css]) => css)
      .join('');
    expect(nodes.map((node) => node.textContent).join('')).toBe(ordered);
    expect(sheet.entries()).toHaveLength(256);
    for (let slot = 0; slot < keys.length; slot++) if (slot % 64) sheet.remove(keys[slot]!);
    expect(sheet.entries()).toHaveLength(4);
    expect(document.head.querySelectorAll('style[data-zui="fragmentation"]')).toHaveLength(1);
  });
  it('hydrates multiline theme values after HTML newline normalization', () => {
    const theme = defineTheme({ spacing: { line: 'calc(1px\r\n + 2px)' } });
    const server = createRuntime({ theme, namespace: 'newlines' });
    cleanup.push(() => server.dispose());
    server.themeStyle(':root');
    const name = server.css((s) => {
      s.padding._line;
    });
    document.head.insertAdjacentHTML('beforeend', server.styleTags());
    const node = element();
    node.className = name;
    const client = createRuntime({ target: document, theme, namespace: 'newlines' });
    cleanup.push(() => client.dispose());
    client.themeStyle(':root');
    client.css((s) => {
      s.padding._line;
    });
    client.finishHydration();
    expect(getComputedStyle(node).paddingTop).toBe('3px');
  });
  it('keeps independent Documents isolated even with identical runtime names', () => {
    const frame = document.createElement('iframe');
    document.body.append(frame);
    cleanup.push(() => frame.remove());
    const other = frame.contentDocument!;
    const main = createRuntime({ target: document, namespace: 'documents' });
    const remote = createRuntime({ target: other, namespace: 'documents' });
    cleanup.push(
      () => main.dispose(),
      () => remote.dispose(),
    );
    const a = element();
    const b = other.createElement('div');
    other.body.append(b);
    const first = main.binding({ id: 'same', source: 'same' });
    const second = remote.binding({ id: 'same', source: 'same' });
    cleanup.push(bindElement(a, first), bindElement(b, second));
    for (const width of [100, 120])
      first.evaluate((s) => {
        s.width.px(width);
      });
    for (const width of [200, 240])
      second.evaluate((s) => {
        s.width.px(width);
      });
    expect(getComputedStyle(a).width).toBe('120px');
    expect(other.defaultView!.getComputedStyle(b).width).toBe('240px');
    remote.dispose();
    expect(other.head.querySelectorAll('style[data-zui="documents"]')).toHaveLength(0);
    expect(getComputedStyle(a).width).toBe('120px');
  });
  it.each(['inline', 'stylesheet'] as const)(
    'switches the native color scheme through the %s theme channel',
    (variables) => {
      const value = createRuntime({ target: document, namespace: 'scheme', variables });
      cleanup.push(() => value.dispose());
      const scope = new ThemeScope(defineTheme({}, { colorScheme: 'light' }));
      cleanup.push(() => scope.dispose());
      const node = element();
      if (variables === 'inline') node.style.colorScheme = 'light dark';
      const stop = bindTheme(node, scope, value);
      cleanup.push(stop);
      expect(getComputedStyle(node).colorScheme).toBe('light');
      scope.setTheme(defineTheme({}, { colorScheme: 'dark' }));
      expect(getComputedStyle(node).colorScheme).toBe('dark');
      if (variables === 'stylesheet') expect(node.hasAttribute('style')).toBe(false);
      stop();
      if (variables === 'inline') expect(node.style.colorScheme).toBe('light dark');
      expect(value.stats.rules).toBe(0);
    },
  );
  it('bounds style nodes and rewrites only the affected chunk for large rule sets', () => {
    const sheet = new BrowserStyleSheet(document, 'chunk-scale');
    cleanup.push(() => sheet.dispose());
    const start = performance.now();
    for (let i = 0; i < 1000; i++)
      sheet.set('key' + i, '.chunk-probe{width:' + i + 'px}', sourceOrder('site:' + i));
    const nodes = [
      ...document.head.querySelectorAll<HTMLStyleElement>('style[data-zui="chunk-scale"]'),
    ];
    expect(nodes.length).toBeLessThanOrEqual(32);
    const before = nodes.map((node) => node.textContent);
    const node = element();
    node.className = 'chunk-probe';
    expect(getComputedStyle(node).width).toBe('999px');
    sheet.set('key999', '.chunk-probe{width:1111px}', sourceOrder('site:999'));
    expect(getComputedStyle(node).width).toBe('1111px');
    expect(nodes.filter((node, index) => node.textContent !== before[index])).toHaveLength(1);
    console.info(
      JSON.stringify({
        benchmark: '1000-rule-dom',
        durationMs: performance.now() - start,
        styleNodes: nodes.length,
      }),
    );
    for (let i = 999; i >= 0; i--) sheet.remove('key' + i);
    expect(sheet.entries()).toHaveLength(0);
    expect(document.head.querySelectorAll('style[data-zui="chunk-scale"]')).toHaveLength(0);
  });
  it('keeps existing CSS and entries when inserting a split chunk fails', () => {
    const sheet = new BrowserStyleSheet(document, 'chunk-failure');
    cleanup.push(() => sheet.dispose());
    for (let i = 0; i < 64; i++)
      sheet.set('key' + i, '.x{width:' + i + 'px}', sourceOrder('site:' + i));
    const before = sheet.entries();
    const text = document.head.querySelector('style[data-zui="chunk-failure"]')!.textContent;
    const insert = document.head.insertBefore;
    document.head.insertBefore = () => {
      throw new Error('split insert failed');
    };
    try {
      expect(() => sheet.set('last', '.x{width:999px}', sourceOrder('site:999'))).toThrow(
        'split insert failed',
      );
    } finally {
      document.head.insertBefore = insert;
    }
    expect(sheet.entries()).toEqual(before);
    expect(document.head.querySelector('style[data-zui="chunk-failure"]')!.textContent).toBe(text);
    sheet.set('last', '.x{width:999px}', sourceOrder('site:999'));
    expect(sheet.entries()).toHaveLength(65);
  });
  it.each(['inline', 'stylesheet'] as const)(
    'preserves source precedence after promotion and remount through %s variables',
    (variables) => {
      const value = createRuntime({ target: document, namespace: 'stable-order', variables });
      cleanup.push(() => value.dispose());
      const node = element();
      const later = value.binding({ id: 'later', source: 'panel.svelte:20' });
      const earlier = value.binding({ id: 'earlier', source: 'panel.svelte:3' });
      later.evaluate((s) => {
        s.width.px(200);
      });
      earlier.evaluate((s) => {
        s.width.px(100);
      });
      const stopLater = bindElement(node, later);
      const stopEarlier = bindElement(node, earlier);
      cleanup.push(stopLater, stopEarlier);
      expect(getComputedStyle(node).width).toBe('200px');
      earlier.evaluate((s) => {
        s.width.px(150);
      });
      expect(getComputedStyle(node).width).toBe('200px');
      stopEarlier();
      earlier.dispose();
      const remounted = value.binding({ id: 'remounted', source: 'panel.svelte:3' });
      remounted.evaluate((s) => {
        s.width.px(250);
      });
      cleanup.push(bindElement(node, remounted));
      expect(getComputedStyle(node).width).toBe('200px');
    },
  );

  it('adopts stable SSR ordering when client consumers arrive in reverse order', () => {
    const server = createRuntime({ namespace: 'stable-ssr' });
    cleanup.push(() => server.dispose());
    const earlierSource = 'panel.svelte:3';
    // 引号和 HTML 字符必须在 metadata 中往返保留，不能改变排序键。
    const laterSource = 'panel.svelte:20:"<&';
    const first = server.css((s) => {
      s.width.px(100);
    }, earlierSource);
    const second = server.css((s) => {
      s.width.px(200);
    }, laterSource);
    document.head.insertAdjacentHTML('beforeend', server.styleTags());
    const nodes = [...document.head.querySelectorAll('style[data-zui="stable-ssr"]')];
    cleanup.push(() => nodes.forEach((node) => node.remove()));
    const node = element();
    node.className = first + ' ' + second;
    expect(getComputedStyle(node).width).toBe('200px');
    const client = runtime('stable-ssr');
    client.css((s) => {
      s.width.px(200);
    }, laterSource);
    client.css((s) => {
      s.width.px(100);
    }, earlierSource);
    client.finishHydration();
    expect(getComputedStyle(node).width).toBe('200px');
    expect([...document.head.querySelectorAll('style[data-zui="stable-ssr"]')]).toEqual(nodes);
  });

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
    scope.setOverrides({ panel: { '0': 'blue' } });
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
        s.width.raw(value);
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
        s.color.token('red');
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
    for (let i = 0; i < 65; i++)
      server.css((s) => {
        s.width.px(100 + i);
      }, 'source:' + i);
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
    const original = nodes[1]!.dataset.zEntries!;
    const metadata = JSON.parse(original) as [string, string, number][];
    const key = metadata[0]![0];
    metadata[0]![0] = JSON.parse(nodes[0]!.dataset.zEntries!)[0][0];
    nodes[1]!.dataset.zEntries = JSON.stringify(metadata);
    expect(create).toThrow('Duplicate server style');
    expect(nodes.every((node) => node.hasAttribute('data-z-ssr'))).toBe(true);
    metadata[0]![0] = key;
    const order = metadata[0]![1];
    metadata[0]![1] = 'invalid';
    nodes[1]!.dataset.zEntries = JSON.stringify(metadata);
    expect(create).toThrow('Invalid server style metadata');
    expect(nodes.every((node) => node.hasAttribute('data-z-ssr'))).toBe(true);
    metadata[0]![1] = order;
    metadata[0]![2]++;
    nodes[1]!.dataset.zEntries = JSON.stringify(metadata);
    expect(create).toThrow('Invalid server style metadata');
    expect(nodes.every((node) => node.hasAttribute('data-z-ssr'))).toBe(true);
    nodes[1]!.dataset.zEntries = original;
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
    const override = createCss(baseTheme, { layer: 'override' });
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
    const base = createCss(baseTheme, { layer: 'base' });
    const app = createCss(baseTheme, { layer: 'app' });
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
              s.color.token('blue');
            });
          }),
          base((s) => {
            s.width.px(width);
            s._important((s) => {
              s.color.token('red');
            });
          }),
        ]),
      );
      expect(getComputedStyle(node).width).toBe('300px');
      expect(getComputedStyle(node).color).toBe('rgb(255, 0, 0)');
    }
  });
  it('binds and switches theme scopes through the stylesheet channel', () => {
    const theme = defineTheme({ color: { primary: 'red' } });
    const owner = createRuntime({
      theme,
      target: document,
      namespace: 'sheet-theme',
      variables: 'stylesheet',
    });
    cleanup.push(() => owner.dispose());
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
    expect(owner.stats.bindings).toBe(2);
    expect(getComputedStyle(node).color).toBe('rgb(255, 0, 0)');
    scope.setTheme(overrideTheme(theme, { color: { primary: 'blue' } }));
    expect(getComputedStyle(node).color).toBe('rgb(0, 0, 255)');
    expect(node.getAttribute('style')).toBeNull();
    stop();
    expect(owner.stats.bindings).toBe(2);
    expect(getComputedStyle(node).color).toBe('rgb(0, 0, 255)');
    duplicate();
    expect(owner.stats.bindings).toBe(1);
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
    scope.setTheme(overrideTheme(theme, { color: { text: 'rgb(0, 128, 0)' } }));
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
