import { describe, expect, it } from 'vitest';
import { StyleError } from '../errors.js';
import { validateQuery, validateValue } from '../validate.js';
import { defineTheme, tokenRef } from '../../theme/theme.js';
import { css } from '../../runtime/evaluation.js';
import { createRuntime } from '../../runtime/runtime.js';

describe('public diagnostics', () => {
  it('rejects asynchronous factories once without changing the previous snapshot', async () => {
    const runtime = createRuntime();
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(10);
    });
    const previous = binding.snapshot;
    try {
      expect(() =>
        binding.evaluate(async (s) => {
          s.width.px(20);
          await Promise.resolve();
          throw new Error('async factory');
        }),
      ).toThrow('must be synchronous');
      await Promise.resolve();
      expect(binding.snapshot).toBe(previous);
      expect(runtime.cssText()).toContain('width:10px');
      expect(runtime.cssText()).not.toContain('width:20px');
    } finally {
      runtime.dispose();
    }
  });
  it.each([
    [() => validateValue('red; width: 1px'), 'css.value'],
    [() => validateQuery('body'), 'css.selector'],
    [() => defineTheme({ color: { a: tokenRef('color', 'a') } }), 'theme.reference'],
    [() => css(() => {}), 'runtime.context'],
  ] as const)('reports stable codes on input and integration failures', (run, code) => {
    try {
      run();
      throw new Error('Expected failure');
    } catch (error) {
      expect(error).toBeInstanceOf(StyleError);
      expect(error).toMatchObject({ code });
    }
  });
  it('keeps user factory errors unchanged and preserves explicit causes', () => {
    const cause = new Error('user factory');
    const runtime = createRuntime();
    try {
      try {
        runtime.binding().evaluate(() => {
          throw cause;
        });
      } catch (error) {
        expect(error).toBe(cause);
      }
      expect(new StyleError('css.value', 'invalid', { cause }).cause).toBe(cause);
    } finally {
      runtime.dispose();
    }
  });
});
