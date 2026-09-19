import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { darkTheme, lightTheme } from '../src/theme.js';
import {
  baseTheme,
  extendTheme,
  overrideTheme,
  ThemeScope,
  themeVariables,
  createRuntime,
} from '@zui/core';

describe('theme presets', () => {
  it('keeps panel completion aliases linked to existing size overrides', () => {
    for (const theme of [lightTheme, darkTheme]) {
      const changed = overrideTheme(theme, { size: { panelMd: '42rem' } });
      expect(changed.resolved.size['panel.md']).toBe('42rem');
      expect(changed.resolved.size['panel.full']).toBe('100%');
    }
  });
  it('uses five ordered grades and only meaningful none/full endpoints', () => {
    const grades = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    for (const theme of [lightTheme, darkTheme]) {
      const tokens = theme.resolved;
      expect(Object.keys(tokens.spacing)).toEqual(['none', ...grades]);
      expect(Object.keys(tokens.radius)).toEqual(['none', ...grades, 'full']);
      for (const category of ['fontSize', 'breakpoint'] as const)
        expect(Object.keys(tokens[category])).toEqual(grades);
      for (const category of ['duration', 'shadow'] as const)
        expect(Object.keys(tokens[category])).toEqual(['none', ...grades]);
      for (const category of [
        'spacing',
        'radius',
        'borderWidth',
        'fontSize',
        'duration',
        'breakpoint',
        'lineHeight',
        'opacity',
        'letterSpacing',
      ] as const) {
        const values = grades.map((grade) => Number.parseFloat(String(tokens[category][grade])));
        expect(values.every((value, index) => index === 0 || value > values[index - 1]!)).toBe(
          true,
        );
      }
      expect(tokens.size.full).toBe('100%');
      expect(tokens.opacity.none).toBe(0);
      expect(tokens.opacity.full).toBe(1);
      expect(tokens.duration.none).toBe('0ms');
      expect(tokens.shadow.none).toBe('none');
    }
  });
  it('keeps semantic roles linked to grades while allowing direct role overrides', () => {
    for (const theme of [lightTheme, darkTheme]) {
      const changed = overrideTheme(theme, {
        size: { controlMd: '40px', iconMd: '18px' },
        borderWidth: { md: '3px' },
        opacity: { md: 0.4 },
      });
      expect(changed.resolved.size.control).toBe('40px');
      expect(changed.resolved.size.icon).toBe('18px');
      expect(changed.resolved.borderWidth.focus).toBe('3px');
      expect(changed.resolved.opacity.disabled).toBe(0.4);
      const compact = overrideTheme(changed, { size: { control: '28px' } });
      expect(compact.resolved.size.control).toBe('28px');
      expect(compact.resolved.size.controlMd).toBe('40px');
      expect(theme.resolved.size.control).toBe('36px');
    }
  });
  it('keeps the documented semantic inventory complete and consistent with both presets', () => {
    const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
    const rows = readme.split('\n').filter((line) => /^\|\s*`\w+(?:\.\w+)+`\s*\|/u.test(line));
    const entries = rows.map((line) =>
      line
        .split('|')
        .slice(1, 5)
        .map((part) => part.trim()),
    );
    const expected = Object.entries(lightTheme.resolved).flatMap(([category, values]) =>
      Object.entries(values).map(([key, value]) => ({ category, key, value })),
    );
    expect(entries).toHaveLength(expected.length);
    for (const { category, key, value } of expected) {
      const row = entries.find(([name]) => name === '`' + category + '.' + key + '`');
      expect(row, category + '.' + key).toBeDefined();
      expect(row![1]).toBe('`' + value + '`');
      const dark = darkTheme.resolved as Readonly<
        Record<string, Readonly<Record<string, unknown>>>
      >;
      expect(row![2]).toBe('`' + dark[category]![key] + '`');
      expect(row![3]!.length).toBeGreaterThan(0);
    }
  });
  it('keeps the CSS-only base free of preset tokens and default values', () => {
    expect(baseTheme.resolved).toEqual({});
    expect(themeVariables(baseTheme)).toEqual({});
    expect(baseTheme.colorScheme).toBeUndefined();
    const empty = createRuntime({ theme: baseTheme });
    empty.themeStyle(':root');
    expect(empty.styleTags()).toBe('');
    empty.dispose();
    const custom = extendTheme(baseTheme, { color: { ink: '#123456' } });
    const runtime = createRuntime({ theme: custom });
    try {
      runtime.css((s) => {
        s.display.flex;
        s.width.px(120);
        s.color._ink;
      });
      runtime.themeStyle(':root');
      expect(runtime.cssText()).toContain('--z-color-ink:#123456');
      expect(runtime.cssText()).not.toContain('--z-color-primary');
      expect(runtime.defaultTheme).toBe(custom);
    } finally {
      runtime.dispose();
    }
    expect(baseTheme.resolved).toEqual({});
  });
  it('shares the preset schema and supports explicit runtime consumption', () => {
    expect(lightTheme.colorScheme).toBe('light');
    expect(darkTheme.colorScheme).toBe('dark');
    expect(extendTheme(darkTheme, {}).colorScheme).toBe('dark');
    const schema = (theme: typeof lightTheme) =>
      Object.entries(theme.resolved).map(([category, values]) => [
        category,
        Object.entries(values).map(([key, value]) => [key, typeof value]),
      ]);
    expect(schema(darkTheme)).toEqual(schema(lightTheme));
    const runtime = createRuntime({ theme: lightTheme });
    expect(runtime.defaultTheme).toBe(lightTheme);
    runtime.dispose();
  });
  it('allows standard string and numeric typography values across scope updates', () => {
    const scope = new ThemeScope(lightTheme);
    scope.setTheme(
      overrideTheme(lightTheme, {
        fontWeight: { normal: 'normal' },
        lineHeight: { normal: 'normal' },
      }),
    );
    expect(scope.theme.resolved.fontWeight.normal).toBe('normal');
    scope.setTheme(darkTheme);
    expect(scope.theme.resolved.fontWeight.normal).toBe(400);
    scope.dispose();
  });
  it('provides readable foreground and background pairs in both presets', () => {
    const luminance = (hex: string) => {
      const rgb = hex
        .slice(1)
        .match(/../g)!
        .map((part) => {
          const channel = Number.parseInt(part, 16) / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
      return rgb[0]! * 0.2126 + rgb[1]! * 0.7152 + rgb[2]! * 0.0722;
    };
    const pairs = [
      ['text', 'surface'],
      ['muted', 'background'],
      ['onPrimary', 'primary'],
      ['onPrimary', 'primaryHover'],
      ['onPrimary', 'primaryActive'],
      ['onPrimarySubtle', 'primarySubtle'],
      ['onDanger', 'danger'],
      ['onSuccess', 'success'],
      ['onWarning', 'warning'],
      ['onInfo', 'info'],
    ] as const;
    for (const theme of [lightTheme, darkTheme])
      for (const [foreground, background] of pairs) {
        const a = luminance(theme.resolved.color[foreground]);
        const b = luminance(theme.resolved.color[background]);
        expect(
          (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
          foreground + '/' + background,
        ).toBeGreaterThanOrEqual(4.5);
      }
  });
});
