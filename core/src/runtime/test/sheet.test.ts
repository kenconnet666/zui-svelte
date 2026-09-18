import { describe, expect, it } from 'vitest';
import { MemoryStyleSheet, serializeStyleTags, sourceOrder } from '../sheet.js';

describe('ordered style entries', () => {
  it('orders reverse inserts, replaces positions and returns isolated snapshots', () => {
    const sheet = new MemoryStyleSheet();
    for (let i = 130; i >= 0; i--)
      sheet.set('key' + i, '.x{width:' + i + 'px}', sourceOrder('site:' + i));
    const before = sheet.entries();
    expect(before[0]!.key).toBe('key0');
    expect(before.at(-1)!.key).toBe('key130');
    sheet.set('key0', '.x{width:999px}', sourceOrder('site:999'));
    sheet.remove('key12');
    expect(sheet.entries()).toHaveLength(130);
    expect(sheet.entries().at(-1)!.key).toBe('key0');
    expect(before[0]!.css).toContain('width:0px');
    expect(serializeStyleTags(sheet.entries(), 'ordered').match(/<style /g)).toHaveLength(3);
    sheet.dispose();
    expect(sheet.entries()).toEqual([]);
  });
  it('records escaped text lengths for SSR and quotes metadata', () => {
    const css = '.x{content:"</style>"}';
    const tags = serializeStyleTags([{ key: 'a"', order: sourceOrder('a:<'), css }], 'x', 'nonce');
    expect(tags.match(/<\/style>/g)).toHaveLength(1);
    expect(tags).toContain('&quot;');
    expect(tags).toContain(String(css.length + 1));
  });
});
