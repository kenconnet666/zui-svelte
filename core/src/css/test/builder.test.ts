import { describe, expect, it } from 'vitest';
import { buildStyle } from '../builder.js';
import { propertyMetadata } from '../metadata.generated.js';
import { serializeProgram } from '../serialize.js';
import { defineTheme } from '../../theme/theme.js';
import { tokenUses } from '../../theme/requirements.js';

describe('CSS statements', () => {
  it('uses non-callable properties with strict tokens and an open raw channel', () => {
    expect(
      buildStyle((s) => {
        void s.width;
      }),
    ).toEqual([]);
    expect(() =>
      buildStyle((s) => {
        (s.width as unknown as (value: string) => void)('auto');
      }),
    ).toThrow(TypeError);
    expect(() =>
      buildStyle((s) => {
        s.width.token('future-value' as never);
      }),
    ).toThrow('Unknown CSS keyword');
    const output = serializeProgram(
      buildStyle((s) => {
        s.width.raw('_unknown');
        s.transformStyle.preserve3d;
      }),
      '.x',
      false,
    );
    expect(output).toBe('.x{width:_unknown;transform-style:preserve-3d;}');
  });
  it('shares declarations and theme requirements between member and string references', () => {
    const theme = defineTheme({
      size: { panel: '36rem', 'with space': '20rem' },
      opacity: { 50: 0.5 },
    });
    const member = buildStyle((s) => {
      s.inlineSize._panel;
      s._hover((s) => {
        s.opacity._50;
      });
      s.maxInlineSize['_with space'];
    }, theme);
    const argument = buildStyle((s) => {
      s.inlineSize.token('_panel');
      s._hover((s) => {
        s.opacity.token('_50');
      });
      s.maxInlineSize.raw('_with space');
    }, theme);
    expect(argument).toEqual(member);
    expect(tokenUses(argument)).toEqual(tokenUses(member));
    expect(tokenUses(argument)).toHaveLength(3);
    expect(() =>
      buildStyle((s) => {
        s.inlineSize.token('_missing' as never);
      }, theme),
    ).toThrow('Unknown theme token');
  });

  it('keeps raw CSS, compound strings and explicit raw/set escape paths unchanged', () => {
    const program = buildStyle((s) => {
      s.inlineSize.token('max-content');
      s.inlineSize.raw('calc(100% - 2rem)');
      s.animation.raw('_loader 1s ease');
      s.content.raw('"_text"');
      s.backgroundImage.raw('url(#_asset)');
      s.color.raw('#fff');
      s.raw('animation-name', '_loader');
      s.set('animationName', '_loader');
      s.inlineSize.raw(null);
      s.inlineSize.raw(undefined);
    });
    expect(program.map((node) => (node.kind === 'declaration' ? node.value : ''))).toEqual([
      'max-content',
      'calc(100% - 2rem)',
      '_loader 1s ease',
      '"_text"',
      'url(#_asset)',
      '#fff',
      '_loader',
      '_loader',
    ]);
    expect(tokenUses(program)).toEqual([]);
    expect(() =>
      buildStyle((s) => {
        s.animationName.token('_loader' as never);
      }),
    ).toThrow('no token category');
  });
  it('covers standard, vendor and SVG properties from csstype', () => {
    expect(Object.keys(propertyMetadata).length).toBeGreaterThan(800);
    expect(propertyMetadata.gridTemplateColumns.name).toBe('grid-template-columns');
    expect(propertyMetadata.WebkitAppearance.name).toBe('-webkit-appearance');
    expect(propertyMetadata.strokeWidth.name).toBe('stroke-width');
  });
  it('preserves duplicate declarations, nested states and priorities', () => {
    const result = serializeProgram(
      buildStyle((s) => {
        s.display.block;
        s.display.flex;
        s.padding.px(4, 8);
        s._hover((s) => {
          s.opacity.raw(0.5);
        });
        s._media('(width >= 40rem)', (s) => {
          s.width.pct(50);
        });
        s._important((s) => {
          s.color.token('red');
        });
      }),
      '.x',
      false,
    );
    expect(result).toContain('display:block;display:flex;padding:4px 8px;');
    expect(result).toContain('.x:hover{opacity:0.5;}');
    expect(result).toContain('@media (width >= 40rem){.x{width:50%;}}');
    expect(result).toContain('color:red!important;');
  });
  it('omits null values and rejects invalid values and declaration injection', () => {
    expect(
      buildStyle((s) => {
        s.width.raw(null);
      }),
    ).toEqual([]);
    expect(() =>
      buildStyle((s) => {
        s.width.px(NaN);
      }),
    ).toThrow();
    expect(() =>
      buildStyle((s) => {
        s.width.raw('1px;color:red');
      }),
    ).toThrow();
    expect(() =>
      buildStyle((s) => {
        s._selector('body', () => {});
      }),
    ).toThrow();
    expect(() =>
      buildStyle((s) => {
        s.opacity.raw(Infinity);
      }),
    ).toThrow();
  });
  it('keeps semicolons inside quoted or functional values intact', () => {
    const css = serializeProgram(
      buildStyle((s) => {
        s.content.raw('";"');
      }),
      '.x',
      false,
    );
    expect(css).toBe('.x{content:";";}');
  });
});
