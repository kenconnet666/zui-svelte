import { describe, expect, it } from 'vitest';
import { buildStyle } from '../builder.js';
import { propertyMetadata } from '../metadata.generated.js';
import { serializeProgram } from '../serialize.js';
import { defineTheme } from '../../theme/theme.js';
import { tokenUses } from '../../theme/requirements.js';

describe('CSS statements', () => {
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
      s.inlineSize('_panel');
      s._hover((s) => {
        s.opacity('_50');
      });
      s.maxInlineSize('_with space');
    }, theme);
    expect(argument).toEqual(member);
    expect(tokenUses(argument)).toEqual(tokenUses(member));
    expect(tokenUses(argument)).toHaveLength(3);
    expect(() =>
      buildStyle((s) => {
        s.inlineSize('_missing');
      }, theme),
    ).toThrow('Unknown theme token');
  });

  it('keeps raw CSS, compound strings and explicit raw/set escape paths unchanged', () => {
    const program = buildStyle((s) => {
      s.inlineSize('max-content');
      s.inlineSize('calc(100% - 2rem)');
      s.animation('_loader 1s ease');
      s.content('"_text"');
      s.backgroundImage('url(#_asset)');
      s.color('#fff');
      s.raw('animation-name', '_loader');
      s.set('animationName', '_loader');
      s.inlineSize(null);
      s.inlineSize(undefined);
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
        s.animationName('_loader');
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
          s.opacity(0.5);
        });
        s._media('(width >= 40rem)', (s) => {
          s.width.pct(50);
        });
        s._important((s) => {
          s.color('red');
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
        s.width(null);
      }),
    ).toEqual([]);
    expect(() =>
      buildStyle((s) => {
        s.width.px(NaN);
      }),
    ).toThrow();
    expect(() =>
      buildStyle((s) => {
        s.width('1px;color:red');
      }),
    ).toThrow();
    expect(() =>
      buildStyle((s) => {
        s._selector('body', () => {});
      }),
    ).toThrow();
    expect(() =>
      buildStyle((s) => {
        s.opacity(Infinity);
      }),
    ).toThrow();
  });
  it('keeps semicolons inside quoted or functional values intact', () => {
    const css = serializeProgram(
      buildStyle((s) => {
        s.content('";"');
      }),
      '.x',
      false,
    );
    expect(css).toBe('.x{content:";";}');
  });
});
