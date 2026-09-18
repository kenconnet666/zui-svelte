import { describe, expect, it } from 'vitest';
import { ClassController, css, createCss, withCssEvaluation } from './classes.js';
import { createRuntime } from './runtime.js';
import { defineTheme } from '../theme/theme.js';
import { buildStyle } from '../css/builder.js';

describe('class-only evaluation', () => {
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
        programs.push(buildStyle(factory, selected));
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
            s.opacity(0.5);
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
