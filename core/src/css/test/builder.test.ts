import { describe, expect, it } from 'vitest';
import { buildStyle } from '../builder.js';
import { propertyMetadata } from '../metadata.generated.js';
import { serializeProgram } from '../serialize.js';
import { defineTheme } from '../../theme/theme.js';
import { assertTokenUses, tokenUses } from '../../theme/requirements.js';

describe('CSS statements', () => {
  it('tracks dynamic token keys like static tokens, including mapped categories', () => {
    const theme = defineTheme({ size: { 'panel.md': '36rem' }, layout: { compact: '8px' } });
    const program = buildStyle(
      (s) => {
        s.inlineSize.token('panel.md');
        s._hover((s) => {
          s.inlineSize['_panel.md'];
        });
        s.gap.token('compact');
      },
      theme,
      undefined,
      { gap: 'layout' },
    );
    expect(serializeProgram(program, '.x', false)).toContain('var(--z-size-panel_2e_md)');
    expect(tokenUses(program)).toHaveLength(2);
    expect(() => assertTokenUses(tokenUses(program), defineTheme({ size: {} }))).toThrow(
      'Missing theme token',
    );
    expect(() =>
      buildStyle((s) => {
        s.inlineSize.token('missing' as never);
      }, theme),
    ).toThrow('Unknown theme token');
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
