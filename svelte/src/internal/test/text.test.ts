import { describe, expect, it } from 'vitest';
import { graphemes, numberDraftParser } from '../text.js';

describe('locale editing boundaries', () => {
  it('counts graphemes instead of UTF-16 code units', () => {
    expect(graphemes('👨‍👩‍👧‍👦é中文', 'zh-CN')).toHaveLength(4);
  });
  it('keeps incomplete drafts and exact decimal strings distinct from committed values', () => {
    const parse = numberDraftParser('de-DE');
    expect(parse('')).toEqual({ state: 'empty' });
    expect(parse('-')).toEqual({ state: 'incomplete' });
    expect(parse('1,')).toEqual({ state: 'incomplete' });
    expect(parse('12345678901234567890,001')).toEqual({
      state: 'valid',
      canonical: '12345678901234567890.001',
    });
    expect(parse('1.234,00')).toEqual({ state: 'invalid' });
    expect(parse('Infinity')).toEqual({ state: 'invalid' });
    expect(parse('-0')).toEqual({ state: 'valid', canonical: '-0' });
    expect(numberDraftParser('ar-EG')('؜-١٢٣٫٤')).toEqual({ state: 'valid', canonical: '-123.4' });
  });
});
