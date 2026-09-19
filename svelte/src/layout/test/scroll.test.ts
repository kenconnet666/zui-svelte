import { expect, it } from 'vitest';
import { scrollAxis } from '../scroll.js';
it('keeps overlay geometry finite for empty, oversized, overscrolled and tiny tracks', () => {
  expect(scrollAxis(0, 0, 0, 0)).toMatchObject({ overflow: false, length: 0, offset: 0 });
  expect(scrollAxis(100, 400, 150, 96)).toMatchObject({ overflow: true, length: 24, offset: 36 });
  expect(scrollAxis(100, 400, 900, 10)).toMatchObject({ length: 10, offset: 0, position: 300 });
  expect(scrollAxis(100, 400, -50, 96)).toMatchObject({ position: 0, offset: 0 });
});
