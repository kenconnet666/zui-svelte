import { describe, expect, it, vi } from 'vitest';
import { bindElement } from '../element.js';
import { ClassController, css } from '../classes.js';
import { createRuntime } from '../runtime.js';
import { elementTarget } from './target.js';

describe('element failure cleanup', () => {
  it('releases partially written variables when initial class attachment fails', () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    for (const width of [100, 120])
      binding.evaluate((s) => {
        s.width.px(width);
      });
    const { node, values, classes } = elementTarget();
    const add = vi.spyOn(node.classList, 'add').mockImplementationOnce(() => {
      throw new Error('DOM failure');
    });
    expect(() => bindElement(node, binding)).toThrow('initialization failed');
    expect(values.size).toBe(0);
    const detach = bindElement(node, binding);
    expect(classes.size).toBe(1);
    detach();
    expect(values.size).toBe(0);
    expect(classes.size).toBe(0);
    expect(add).toHaveBeenCalledTimes(2);
    runtime.dispose();
  });

  it('still removes the class and subscription when variable cleanup throws', () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    for (const width of [100, 120])
      binding.evaluate((s) => {
        s.width.px(width);
      });
    const { node, classes } = elementTarget();
    const detach = bindElement(node, binding);
    vi.spyOn(node.style, 'removeProperty').mockImplementationOnce(() => {
      throw new Error('DOM failure');
    });
    expect(detach).toThrow('cleanup failed');
    expect(classes.size).toBe(0);
    binding.evaluate((s) => {
      s.width.px(140);
    });
    expect(classes.size).toBe(0);
    expect(detach).not.toThrow();
    runtime.dispose();
  });

  it('updates remaining targets and releases a target that fails its first write', () => {
    const runtime = createRuntime();
    const producer = new ClassController(runtime, 'producer', 'producer');
    const consumer = new ClassController(runtime, 'consumer', 'consumer');
    const update = (width: number) =>
      consumer.resolve(
        producer.run(() =>
          css((s) => {
            s.width.px(width);
          }),
        ),
      );
    update(100);
    update(120);
    const first = elementTarget();
    const second = elementTarget();
    const set = vi.spyOn(first.node.style, 'setProperty').mockImplementationOnce(() => {
      throw new Error('DOM failure');
    });
    expect(() => consumer.mount(first.node)).toThrow('initialization failed');
    expect(first.values.size).toBe(0);
    update(130);
    expect(set).toHaveBeenCalledTimes(1);
    consumer.mount(first.node);
    consumer.mount(second.node);
    set.mockImplementationOnce(() => {
      throw new Error('DOM failure');
    });
    expect(() => update(140)).toThrow();
    expect([...second.values.values()]).toEqual(['140px']);
    consumer.dispose();
    producer.dispose();
    runtime.dispose();
    expect(runtime.stats.rules).toBe(0);
  });
});
