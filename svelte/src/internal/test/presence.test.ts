import { describe, expect, it } from 'vitest';
import { Presence } from '../presence.js';

describe('presence ownership', () => {
  it('keeps exit content mounted and ignores an interrupted exit', async () => {
    const presence = new Presence(true);
    let finish!: () => void;
    let signal!: AbortSignal;
    const exit = presence.set(false, (value) => {
      signal = value;
      return new Promise<void>((resolve) => {
        finish = resolve;
      });
    });
    expect(presence.phase).toBe('exiting');
    expect(presence.mounted).toBe(true);
    expect(await presence.set(true)).toBe(true);
    expect(signal.aborted).toBe(true);
    finish();
    expect(await exit).toBe(false);
    expect(presence.phase).toBe('open');
    presence.dispose();
    expect(presence.mounted).toBe(false);
  });
  it('settles the desired state even when animation fails and releases late work', async () => {
    const presence = new Presence(true);
    await expect(
      presence.set(false, () => {
        throw new Error('animation failed');
      }),
    ).rejects.toThrow('animation failed');
    expect(presence.phase).toBe('closed');
    let finish!: () => void;
    const task = presence.set(
      true,
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    presence.dispose();
    finish();
    expect(await task).toBe(false);
    expect(presence.phase).toBe('closed');
  });
});
