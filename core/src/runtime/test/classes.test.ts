import { describe, expect, it, vi } from 'vitest';
import { ClassController, css, createCss, withCssEvaluation } from '../classes.js';
import { createRuntime } from '../runtime.js';
import { defineTheme } from '../../theme/theme.js';
import { buildStyle } from '../../css/builder.js';
import { elementTarget } from './target.js';
import { createStyleModule } from '../definitions.js';

describe('class-only evaluation', () => {
  it('acquires a runtime only when a managed definition is consumed', () => {
    const runtime = createRuntime({ variables: 'stylesheet' });
    let available = false;
    const get = vi.fn(() => {
      available = true;
      return runtime;
    });
    const consumer = new ClassController(
      { get, peek: () => (available ? runtime : undefined) },
      'lazy',
      'lazy',
    );
    const { node, values } = elementTarget();
    expect(consumer.resolve(consumer.run(() => ['ordinary', { active: true }]))).toBe(
      'ordinary active',
    );
    expect(consumer.style('color:red')).toBe('color:red');
    consumer.mount(node);
    expect(get).not.toHaveBeenCalled();
    const module = createStyleModule('lazy-module');
    const name = module.call('width', css, (s) => {
      s.width.px(20);
    });
    expect(consumer.resolve(name)).toContain(name);
    for (const width of [100, 120])
      consumer.resolve(
        consumer.run(() =>
          css((s) => {
            s.width.px(width);
          }),
        ),
      );
    expect(get).toHaveBeenCalledTimes(1);
    expect(values.size).toBe(0);
    expect(runtime.cssText()).toContain('120px');
    consumer.dispose();
    module.dispose();
    runtime.dispose();
  });

  it('releases every unused binding when one disposal listener throws', () => {
    const runtime = createRuntime();
    const created: ReturnType<typeof runtime.binding>[] = [];
    const original = runtime.binding.bind(runtime);
    vi.spyOn(runtime, 'binding').mockImplementation((options) => {
      const binding = original(options);
      created.push(binding);
      return binding;
    });
    const controller = new ClassController(runtime, 'owner', 'owner');
    controller.run(() => [
      css((s) => {
        s.width.px(10);
      }),
      css((s) => {
        s.height.px(20);
      }),
    ]);
    created[0]!.subscribe((snapshot) => {
      if (!snapshot.className) throw new Error('consumer failure');
    });
    expect(() => controller.run(() => [])).toThrow('Unused class bindings');
    expect(runtime.stats.bindings).toBe(0);
    expect(runtime.stats.rules).toBe(0);
    controller.dispose();
    runtime.dispose();
  });
  it('keeps typed theme evaluation and restores nested contexts after errors', () => {
    const theme = defineTheme({ color: { brand: 'red' } }, { namespace: 'app' });
    const typed = createCss(theme);
    const programs: unknown[] = [];
    withCssEvaluation(
      () => {
        expect(
          typed((s) => {
            s.color._brand;
          }),
        ).toBe('outer');
        expect(() =>
          withCssEvaluation(
            () => {
              expect(css(() => {})).toBe('inner');
              throw new Error('failed calculation');
            },
            () => 'inner',
          ),
        ).toThrow('failed calculation');
        expect(
          typed((s) => {
            s.color._brand;
          }),
        ).toBe('outer');
      },
      (factory, selected) => {
        programs.push(buildStyle(factory, selected?.theme));
        return 'outer';
      },
    );
    expect(programs).toEqual([
      [
        {
          kind: 'declaration',
          property: 'color',
          value: 'var(--app-color-brand)',
          important: false,
        },
      ],
      [
        {
          kind: 'declaration',
          property: 'color',
          value: 'var(--app-color-brand)',
          important: false,
        },
      ],
    ]);
    expect(() => css(() => {})).toThrow(/compiler/u);
  });
  it('returns primitive class strings and preserves independent class composition', () => {
    const runtime = createRuntime();
    const frame = new ClassController(runtime, 'instance', 'site');
    let width = 100;
    const render = () =>
      frame.resolve(
        frame.run(() => [
          'external',
          css((s) => {
            s.width.px(width);
          }),
          css((s) => {
            s.opacity.raw(0.5);
          }),
        ]),
      );
    const first = render();
    expect(typeof first).toBe('string');
    expect(first).toContain('external ');
    expect(frame.style('color:red')).toBe('color:red');
    width = 120;
    const second = render();
    expect(frame.style('color:red')).toContain('120px');
    width = 140;
    expect(render()).toBe(second);
    expect(frame.style('color:red')).toContain('140px');
    frame.dispose();
    expect(runtime.registry.size).toBe(0);
  });
  it('keeps static snapshots valid while a second controller consumes them', () => {
    const runtime = createRuntime();
    const source = new ClassController(runtime, 'source', 'source');
    const consumer = new ClassController(runtime, 'consumer', 'consumer');
    const className = source.run(() =>
      css((s) => {
        s.width.px(100);
      }),
    );
    consumer.resolve(className);
    source.run(() =>
      css((s) => {
        s.width.px(120);
      }),
    );
    expect(runtime.registry.lookup(className)?.css).toContain('width:100px');
    source.dispose();
    expect(runtime.registry.size).toBe(1);
    consumer.dispose();
    expect(runtime.registry.size).toBe(0);
  });
  it('propagates promoted values without changing the class string', () => {
    const runtime = createRuntime();
    const source = new ClassController(runtime, 'source', 'source');
    const consumer = new ClassController(runtime, 'consumer', 'consumer');
    source.run(() =>
      css((s) => {
        s.width.px(100);
      }),
    );
    const name = source.run(() =>
      css((s) => {
        s.width.px(120);
      }),
    );
    consumer.resolve(name);
    source.run(() =>
      css((s) => {
        s.width.px(140);
      }),
    );
    expect(consumer.style(undefined)).toContain('140px');
    source.dispose();
    consumer.dispose();
  });
  it('uses full rules when promotion is disabled for a component boundary', () => {
    const runtime = createRuntime();
    const frame = new ClassController(runtime, 'props', 'props', false);
    const a = frame.run(() =>
      css((s) => {
        s.width.px(100);
      }),
    );
    const b = frame.run(() =>
      css((s) => {
        s.width.px(120);
      }),
    );
    expect(a).not.toBe(b);
    expect(runtime.cssText()).not.toContain('var(');
    frame.dispose();
    expect(() => css(() => {})).toThrow(/compiler/u);
  });
});
