import { describe, expect, it } from 'vitest';
import { StyleError } from '../errors.js';
import { validateQuery, validateValue } from '../validate.js';
import { defineTheme, tokenRef } from '../../theme/theme.js';
import { css } from '../../runtime/evaluation.js';
import { createRuntime } from '../../runtime/runtime.js';

describe('public diagnostics', () => {
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
