import { describe, expect, it } from 'vitest';
import { ClassController, createCss, css } from '../classes.js';
import { createRuntime } from '../runtime.js';
import { createStyleModule } from '../definitions.js';
import { baseTheme } from '../../theme/base.js';

describe('explicit CSS layers', () => {
  it('declares layer order once and keeps safe promotion inside the selected layer', () => {
    const runtime = createRuntime({ layers: ['base', 'app'], layer: 'app' });
    const styles = createCss(baseTheme, { layer: 'base' });
    const owner = new ClassController(runtime, 'layered', 'site');
    const render = (width: number) =>
      owner.run(() =>
        styles((s) => {
          s.width.px(width);
        }),
      );
    render(100);
    const promoted = render(120);
    const compilations = runtime.stats.ruleCompilations;
    expect(render(140)).toBe(promoted);
    expect(runtime.stats.ruleCompilations).toBe(compilations);
    expect(runtime.cssText()).toMatch(/^@layer base,app;@layer base\{/u);
    expect(runtime.cssText()).toContain('var(');
    runtime.dispose();
  });

  it('uses the same default layer for module definitions and permits explicit unlayered CSS', () => {
    const runtime = createRuntime({ layers: ['app'], layer: 'app' });
    const module = createStyleModule('layers.ts');
    const normal = module.call('normal', css, (s) => {
      s.width.px(10);
    });
    const plain = module.call('plain', createCss(baseTheme, { layer: null }), (s) => {
      s.height.px(20);
    });
    const owner = new ClassController(runtime, 'target', 'target');
    owner.resolve([normal, plain]);
    expect(runtime.cssText()).toContain('@layer app{.' + normal + '--z{width:10px;}}');
    expect(runtime.cssText()).toContain('.' + plain + '--z{height:20px;}');
    expect(runtime.cssText().match(/@layer app\{/gu)).toHaveLength(1);
    runtime.dispose();
    module.dispose();
  });

  it('rejects ambiguous or undeclared layer configuration before creating bindings', () => {
    expect(() => createRuntime({ layers: ['app', 'app'] })).toThrow('Duplicate');
    expect(() => createRuntime({ layer: 'missing' })).toThrow('declared');
    expect(() => createCss(baseTheme, { layer: 'INITIAL' })).toThrow('Invalid');
    const runtime = createRuntime();
    const owner = new ClassController(runtime, 'unknown', 'unknown');
    const styles = createCss(baseTheme, { layer: 'app' });
    expect(() => owner.run(() => styles(() => {}))).toThrow('declared');
    expect(runtime.stats.bindings).toBe(0);
    runtime.dispose();
  });
});
