import { describe, expect, it } from 'vitest';
import { canPromote } from '../promotion.js';

const declaration = (property: string, value: string) => ({
  kind: 'declaration' as const,
  property,
  value,
  important: false,
});

describe('promotion safety', () => {
  it.each([
    'inherit',
    ' INHERIT ',
    'ReVeRt-LaYeR',
    String.raw`\69 nherit`,
    String.raw`v\61 r(--value)`,
  ])('keeps CSS-wide and escaped values as full rules: %s', (value) => {
    expect(canPromote(declaration('width', value), [], () => true)).toBe(false);
  });

  it.each([
    ['width', 'red'],
    ['width', '10'],
    ['width', '-1px'],
    ['padding-top', '-1px'],
    ['color', '10px'],
    ['color', '#12345'],
    ['color', '#1234567'],
    ['opacity', '10px'],
    ['z-index', '1.5'],
    ['z-index', '1.0'],
    ['font-weight', '0'],
    ['transform', '10px'],
    ['letter-spacing', '10%'],
  ])(
    'does not change invalid declaration fallback without CSS.supports: %s:%s',
    (property, value) => {
      expect(canPromote(declaration(property, value), [])).toBe(false);
    },
  );

  it.each([
    ['width', '10px'],
    ['width', '0'],
    ['margin-top', '-1px'],
    ['color', '#1234'],
    ['opacity', '50%'],
    ['line-height', '1.5'],
    ['font-weight', '450'],
    ['z-index', '-2'],
  ])('promotes the conservative portable subset: %s:%s', (property, value) => {
    expect(canPromote(declaration(property, value), [])).toBe(true);
  });
});
