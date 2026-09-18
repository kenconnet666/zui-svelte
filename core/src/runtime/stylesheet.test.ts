import { describe, expect, it } from 'vitest';
import { createRuntime } from './runtime.js';
import { ClassController, css } from './classes.js';
import { MemoryStyleSheet } from './sheet.js';

describe('stylesheet variables', () => {
  it('preserves the last valid snapshot when the variable sheet rejects an update', () => {
    class FailingSheet extends MemoryStyleSheet {
      override set(key: string, css: string, order: number) {
        if (key.endsWith(':vars')) throw new Error('sheet rejected variables');
        super.set(key, css, order);
      }
    }
    const sheet = new FailingSheet();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(100);
    });
    const snapshot = binding.snapshot;
    expect(() =>
      binding.evaluate((s) => {
        s.width.px(120);
      }),
    ).toThrow('sheet rejected');
    expect(binding.snapshot).toBe(snapshot);
    expect(runtime.cssText()).toContain('width:100px');
    expect(sheet.entries()).toHaveLength(1);
    expect(runtime.registry.size).toBe(1);
    runtime.dispose();
  });
  it('keeps promoted classes stable without inline variables and retains consumer snapshots', () => {
    const sheet = new MemoryStyleSheet();
    const runtime = createRuntime({ sheet, variables: 'stylesheet', nonce: 'request-nonce' });
    const source = new ClassController(runtime, 'a', 'site');
    const consumer = new ClassController(runtime, 'b', 'consumer');
    const render = (width: number) =>
      source.run(() =>
        css((s) => {
          s.width.px(width);
        }),
      );
    render(100);
    const promoted = render(120);
    consumer.resolve(promoted);
    expect(consumer.style(undefined)).toBeUndefined();
    expect(consumer.style('color:red')).toBe('color:red');
    for (let value = 121; value < 1000; value++) expect(render(value)).toBe(promoted);
    expect(sheet.entries()).toHaveLength(2);
    expect(runtime.cssText()).toContain('999px;');
    expect(runtime.styleTags().match(/nonce="request-nonce"/gu)).toHaveLength(2);
    source.dispose();
    expect(runtime.cssText()).toContain('999px;');
    consumer.dispose();
    expect(sheet.entries()).toHaveLength(0);
    runtime.dispose();
  });

  it('isolates instances and releases variables on structural changes', () => {
    const sheet = new MemoryStyleSheet();
    const runtime = createRuntime({ sheet, variables: 'stylesheet' });
    const a = runtime.binding({ id: 'a', source: 'shared' });
    const b = runtime.binding({ id: 'b', source: 'shared' });
    for (const value of [10, 20]) {
      a.evaluate((s) => {
        s.width.px(value);
      });
      b.evaluate((s) => {
        s.width.px(value * 2);
      });
    }
    expect(runtime.cssText()).toContain('--z-b-a-0:20px;');
    expect(runtime.cssText()).toContain('--z-b-b-0:40px;');
    a.evaluate((s) => {
      s.height.px(10);
    });
    expect(runtime.cssText()).not.toContain('--z-b-a-0');
    expect(runtime.cssText()).toContain('--z-b-b-0:40px;');
    runtime.dispose();
    expect(sheet.entries()).toHaveLength(0);
  });
});
