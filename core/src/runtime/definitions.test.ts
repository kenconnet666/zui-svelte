import { describe, expect, it } from 'vitest';
import { createStyleModule, findDefinition } from './definitions.js';
import { ClassController, css, createCss } from './classes.js';
import { createRuntime } from './runtime.js';
import { defineTheme } from '../theme/theme.js';

describe('module style definitions', () => {
  it('collects one module definition independently in each request', () => {
    const module = createStyleModule('panel.ts');
    const className = module.call('panel', css, (s) => {
      s.width.px(120);
    });
    const a = createRuntime();
    const b = createRuntime({ namespace: 'another-app' });
    const first = new ClassController(a, 'a', 'a');
    const second = new ClassController(b, 'b', 'b');
    expect(a.cssText()).toBe('');
    expect(b.cssText()).toBe('');
    const firstClass = first.resolve(className);
    expect(firstClass.split(' ')).toContain(className);
    expect(a.cssText()).toContain('width:120px');
    expect(b.cssText()).toBe('');
    const secondClass = second.resolve(firstClass);
    expect(secondClass).not.toBe(firstClass);
    expect(secondClass).not.toContain(className + '--z ');
    a.dispose();
    expect(b.cssText()).toContain('width:120px');
    b.dispose();
    module.dispose();
    expect(findDefinition(className)).toBeUndefined();
  });

  it('retains live consumers during module replacement and releases unused definitions', () => {
    const theme = defineTheme({ color: { brand: 'red' } }, { namespace: 'app' });
    const module = createStyleModule('theme.ts');
    const name = module.call('brand', createCss(theme), (s) => {
      s.color._brand;
    });
    const unused = module.call('unused', css, (s) => {
      s.opacity(0.5);
    });
    const runtime = createRuntime();
    const consumer = new ClassController(runtime, 'consumer', 'consumer');
    consumer.resolve(name);
    module.dispose();
    expect(findDefinition(unused)).toBeUndefined();
    expect(findDefinition(name)).toBeDefined();
    expect(runtime.cssText()).toContain('var(--app-color-brand)');
    consumer.dispose();
    expect(runtime.cssText()).toBe('');
    expect(findDefinition(name)).toBeUndefined();
    runtime.dispose();
  });
});
