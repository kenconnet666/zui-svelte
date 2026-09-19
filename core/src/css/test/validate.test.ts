import { describe, expect, it } from 'vitest';
import { validateQuery, validateValue } from '../validate.js';
import { buildStyle } from '../builder.js';
import { serializeProgram } from '../serialize.js';

describe('local selector boundaries', () => {
  it('rejects CSS strings terminated by raw newlines while keeping escaped continuations', () => {
    for (const newline of ['\n', '\r', '\f'])
      expect(() => validateValue('"text' + newline + '}body{color:red}"')).toThrow(
        'Unescaped newline',
      );
    for (const newline of ['\n', '\r', '\r\n', '\f']) {
      const value = '"a\\' + newline + 'b"';
      expect(validateValue(value)).toBe(value);
    }
  });
  it.each([
    '&, body',
    ':is(&, body)',
    ':not(&)',
    '[data-label="&"]',
    String.raw`\&`,
    '&,',
    '&, :where(&)',
  ])('rejects a branch without an explicit root: %s', (selector) => {
    expect(() => validateQuery(selector)).toThrow('Each local selector branch');
  });

  it.each([
    '&:is(.a, .b)',
    '&[data-label="a,b&"]',
    '.theme &',
    '&:not(.disabled), & > :is(.label, .icon)',
  ])('preserves an explicitly rooted selector: %s', (selector) => {
    expect(validateQuery(selector)).toBe(selector);
  });

  it('preserves separate rooted branches and contextual ancestors through Stylis', () => {
    const program = buildStyle((s) => {
      s._selector('.theme &, & > .label', (s) => {
        s.color.token('red');
      });
    });
    expect(serializeProgram(program, '.root', false)).toBe('.theme .root,.root>.label{color:red;}');
  });
});
