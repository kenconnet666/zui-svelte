import { afterEach, describe, expect, it, vi } from 'vitest';
import * as serialization from '../../css/serialize.js';
import { createRuntime } from '../runtime.js';
import { createStyleModule, findDefinition } from '../definitions.js';
import { css } from '../evaluation.js';

afterEach(() => vi.restoreAllMocks());

describe('hash collision isolation', () => {
  it('rejects a colliding binding without replacing its snapshot or retaining another rule', () => {
    vi.spyOn(serialization, 'hashText').mockReturnValue('forced');
    const runtime = createRuntime();
    try {
      const binding = runtime.binding({ promote: false });
      binding.evaluate((s) => {
        s.width.px(100);
      });
      const snapshot = binding.snapshot;
      expect(() =>
        binding.evaluate((s) => {
          s.width.px(200);
        }),
      ).toThrow('CSS hash collision');
      expect(binding.snapshot).toBe(snapshot);
      expect(runtime.cssText()).toContain('width:100px');
      expect(runtime.stats.rules).toBe(1);
      binding.dispose();
      expect(runtime.stats.rules).toBe(0);
      expect(runtime.stats.sources).toBe(0);
    } finally {
      runtime.dispose();
    }
  });

  it('checks canonical content even when the same module already owns the class', () => {
    vi.spyOn(serialization, 'hashText').mockReturnValue('forced');
    const module = createStyleModule('collision');
    const other = createStyleModule('other');
    try {
      const name = module.call('first', css, (s) => {
        s.width.px(100);
      });
      const definition = findDefinition(name);
      expect(
        module.call('first', css, (s) => {
          s.width.px(100);
        }),
      ).toBe(name);
      expect(() =>
        module.call('second', css, (s) => {
          s.width.px(200);
        }),
      ).toThrow('Module CSS hash collision');
      expect(() =>
        other.call('first', css, (s) => {
          s.width.px(300);
        }),
      ).toThrow('Module CSS hash collision');
      expect(findDefinition(name)).toBe(definition);
      module.dispose();
      expect(findDefinition(name)).toBeUndefined();
    } finally {
      module.dispose();
      other.dispose();
    }
  });
});
