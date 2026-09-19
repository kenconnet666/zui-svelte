import { describe, expect, it } from 'vitest';
import { Collection, optionId } from '../collection.js';
import { AsyncList } from '../request.js';
import { VirtualCollection } from '../virtual.js';

describe('collection identity and navigation', () => {
  it('preserves selected objects while options reload and keeps active identity on reorder', () => {
    let rows = [
      { id: 1, label: '旧名称' },
      { id: 2, label: '第二项' },
    ];
    const selected = rows[0]!;
    const collection = new Collection({ items: () => rows });
    collection.activate(1);
    rows = [
      { id: 2, label: '第二项' },
      { id: 1, label: '新名称' },
    ];
    collection.sync();
    expect(collection.activeIndex).toBe(1);
    expect(collection.isSelected(selected, rows[1]!)).toBe(true);
    expect(collection.label(selected)).toBe('旧名称');
    expect(collection.select(selected, rows[1]!)).toBe(rows[1]);
    rows.splice(1, 1);
    collection.sync();
    expect(collection.activeKey).toBe(2);
    expect(selected.label).toBe('旧名称');
    collection.dispose();
  });
  it('uses locale-aware typeahead, skips disabled items and rejects ambiguous keys', () => {
    const rows = [
      { id: 0, label: 'Álpha' },
      { id: 1, label: 'Apple', disabled: true },
      { id: 2, label: 'Alpine' },
    ];
    const collection = new Collection({
      items: () => rows,
      isDisabled: (item) => Boolean(item.disabled),
      locale: () => 'en-US',
    });
    expect(collection.move('first')).toBe(0);
    expect(collection.typeahead('a', 1000)).toBe(2);
    expect(collection.typeahead('a', 1100)).toBe(0);
    expect(collection.move(-1, true)).toBe(2);
    expect(collection.toggle([rows[0]!], rows[1]!)).toEqual([rows[0]]);
    expect(optionId('root', 0)).not.toBe(optionId('root', '0'));
    rows.push({ id: 0, label: '重复' });
    expect(() => collection.sync()).toThrow('Duplicate');
    expect(collection.rows).toHaveLength(3);
    collection.dispose();
  });
});

describe('asynchronous data ownership', () => {
  it('settles superseded work and ignores stale rejection even if the loader ignores AbortSignal', async () => {
    const requests = new Map<
      string,
      {
        resolve: (items: { id: number; label: string }[]) => void;
        reject: (error: Error) => void;
        signal: AbortSignal;
      }
    >();
    const list = new AsyncList<{ id: number; label: string }>({
      load: (query, { signal }) =>
        new Promise((resolve, reject) => requests.set(query, { resolve, reject, signal })),
    });
    const old = list.search('old');
    const current = list.search('new');
    expect(await old).toBe(false);
    expect(requests.get('old')!.signal.aborted).toBe(true);
    requests.get('new')!.resolve([{ id: 1, label: 'new' }]);
    expect(await current).toBe(true);
    requests.get('old')!.reject(new Error('late failure'));
    await Promise.resolve();
    expect(list.state.status).toBe('ready');
    expect(list.state.items[0]!.label).toBe('new');
    const pending = list.search('pending');
    list.dispose();
    expect(await pending).toBe(false);
    expect(list.state.items).toHaveLength(0);
  });
  it('supports zero cursors, overlapping pages and retry without changing selected values', async () => {
    let fail = true;
    const list = new AsyncList<{ id: number; label: string }, number>({
      load: async (_query, { cursor }) => {
        if (cursor === undefined) return { items: [{ id: 1, label: 'one' }], nextCursor: 0 };
        if (fail) {
          fail = false;
          throw new Error('retry me');
        }
        return {
          items: [
            { id: 1, label: 'updated' },
            { id: 2, label: 'two' },
          ],
        };
      },
    });
    await list.search('');
    const selected = list.state.items[0]!;
    expect(await list.more()).toBe(false);
    expect(list.state.items).toHaveLength(1);
    expect(await list.retry()).toBe(true);
    expect(list.state.items).toHaveLength(2);
    expect(selected.label).toBe('one');
    expect(await list.more()).toBe(false);
    list.dispose();
  });
});

describe('virtual collection adapter', () => {
  it('bounds SSR output for 10000 items and keeps an offscreen active node represented', () => {
    const list = new VirtualCollection({
      count: 10000,
      getKey: (index) => index,
      estimateSize: () => 36,
      activeIndex: 9999,
      initialRect: { width: 200, height: 180 },
    });
    expect(list.items.length).toBeLessThan(20);
    expect(list.items.some((item) => item.index === 9999)).toBe(true);
    expect(list.totalSize).toBe(360000);
    list.configure({
      count: 10000,
      getKey: (index) => 9999 - index,
      estimateSize: () => 36,
      activeIndex: 0,
      initialRect: { width: 200, height: 180 },
    });
    expect(list.items[0]!.key).toBe(9999);
    list.dispose();
    expect(list.items).toEqual([]);
    expect(list.measuredCount).toBe(0);
    expect(list.connected).toBe(false);
  });
});
