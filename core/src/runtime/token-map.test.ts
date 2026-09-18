import { describe, expect, it } from 'vitest';
import { ClassController, createCss } from './classes.js';
import { createStyleModule } from './definitions.js';
import { createRuntime } from './runtime.js';
import { extendTheme } from '../theme/theme.js';
import { lightTheme } from '../theme/presets.js';

describe('custom token category mapping', () => {
  const theme = extendTheme(lightTheme, { layoutSpace: { card: '18px' }, counters: { one: 1 } });

  it('uses the same immutable mapping in nested rules and module snapshots', () => {
    const mapping = { gap: 'layoutSpace' } as const;
    const styles = createCss(theme, { tokenMap: mapping });
    Object.assign(mapping, { gap: 'spacing' });
    const runtime = createRuntime({ theme });
    const frame = new ClassController(runtime, 'mapped', 'mapped');
    frame.run(() =>
      styles((s) => {
        s.gap._card;
        s._hover((s) => {
          s.gap._card;
        });
      }),
    );
    expect(runtime.cssText().match(/var\(--z-layoutSpace-card\)/gu)).toHaveLength(2);
    const module = createStyleModule('mapped.ts');
    const name = module.call('card', styles, (s) => {
      s.gap._card;
    });
    frame.resolve(name);
    expect(runtime.cssText()).toContain('gap:var(--z-layoutSpace-card)');
    frame.dispose();
    module.dispose();
    expect(runtime.stats.rules).toBe(0);
    runtime.dispose();
  });

  it('rejects unknown properties/categories and incompatible primitive kinds', () => {
    expect(() => createCss(theme, { tokenMap: { typo: 'layoutSpace' } } as never)).toThrow(
      'Unknown mapped CSS property',
    );
    expect(() => createCss(theme, { tokenMap: { gap: 'missing' } } as never)).toThrow(
      'Unknown mapped token category',
    );
    expect(() => createCss(theme, { tokenMap: { gap: 'counters' } })).toThrow(
      'Incompatible token category',
    );
  });
});
