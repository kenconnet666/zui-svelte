import { afterEach, describe, expect, it } from 'vitest';
import {
  bindElement,
  bindTheme,
  createRuntime,
  defineTheme,
  overrideTheme,
  ThemeScope,
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
