import { baseTheme, createCss, extendTheme, tokenRef, type StyleFactory } from '@zui/core';

const scales = {
  // 数量尺度统一五档；仅在零值、填满确有含义时增加 none/full。
  spacing: { none: '0px', xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
  size: {
    none: '0px',
    controlXs: '24px',
    controlSm: '28px',
    controlMd: '36px',
    controlLg: '44px',
    controlXl: '52px',
    iconXs: '12px',
    iconSm: '14px',
    iconMd: '16px',
    iconLg: '20px',
    iconXl: '24px',
    containerXs: '32rem',
    containerSm: '48rem',
    containerMd: '64rem',
    containerLg: '80rem',
    containerXl: '96rem',
    full: '100%',
    // 角色引用尺度，改 controlMd 时默认控件一起更新；密度覆盖仍可直接改 control。
    control: /* @__PURE__ */ tokenRef('size', 'controlMd'),
    icon: /* @__PURE__ */ tokenRef('size', 'iconMd'),
  },
  radius: { none: '0px', xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
  borderWidth: {
    none: '0px',
    xs: '1px',
    sm: '1.5px',
    md: '2px',
    lg: '3px',
    xl: '4px',
    thin: /* @__PURE__ */ tokenRef('borderWidth', 'xs'),
    focus: /* @__PURE__ */ tokenRef('borderWidth', 'md'),
  },
  fontFamily: { body: 'system-ui, sans-serif', mono: 'ui-monospace, monospace' },
  fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px' },
  // 字重、层级和缓动的角色比大小标签更明确，不机械套用 xs/full。
  fontWeight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: {
    xs: 1,
    sm: 1.25,
    md: 1.5,
    lg: 1.75,
    xl: 2,
    tight: /* @__PURE__ */ tokenRef('lineHeight', 'sm'),
    normal: /* @__PURE__ */ tokenRef('lineHeight', 'md'),
  },
  letterSpacing: {
    xs: '-0.025em',
    sm: '-0.0125em',
    md: '0em',
    lg: '0.025em',
    xl: '0.05em',
    normal: /* @__PURE__ */ tokenRef('letterSpacing', 'md'),
  },
  duration: { none: '0ms', xs: '75ms', sm: '120ms', md: '200ms', lg: '300ms', xl: '500ms' },
  easing: { standard: 'ease', linear: 'linear' },
  shadow: {
    none: 'none',
    xs: '0 1px 2px rgb(0 0 0 / 0.08)',
    sm: '0 1px 3px rgb(0 0 0 / 0.12)',
    md: '0 4px 8px rgb(0 0 0 / 0.14)',
    lg: '0 8px 16px rgb(0 0 0 / 0.16)',
    xl: '0 16px 32px rgb(0 0 0 / 0.20)',
  },
  zIndex: { base: 0, sticky: 100, popup: 1000, overlay: 1100, notification: 1200 },
  opacity: {
    none: 0,
    xs: 0.1,
    sm: 0.25,
    md: 0.5,
    lg: 0.75,
    xl: 0.9,
    full: 1,
    disabled: /* @__PURE__ */ tokenRef('opacity', 'md'),
  },
  breakpoint: { xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
};

export const lightTheme = /* @__PURE__ */ extendTheme(
  baseTheme,
  {
    ...scales,
    color: {
      primary: '#4f46e5',
      primaryHover: '#4338ca',
      primaryActive: '#3730a3',
      primarySubtle: '#eef2ff',
      onPrimary: '#ffffff',
      onPrimarySubtle: '#3730a3',
      surface: '#ffffff',
      surfaceRaised: '#ffffff',
      surfaceSunken: '#f1f5f9',
      surfaceHover: '#f1f5f9',
      background: '#f8fafc',
      text: '#0f172a',
      muted: '#475569',
      textDisabled: '#64748b',
      border: '#cbd5e1',
      borderStrong: '#64748b',
      focus: '#4f46e5',
      danger: '#b91c1c',
      onDanger: '#ffffff',
      success: '#15803d',
      onSuccess: '#ffffff',
      warning: '#92400e',
      onWarning: '#ffffff',
      info: '#0369a1',
      onInfo: '#ffffff',
    },
  },
  { colorScheme: 'light' },
);

export type DefaultTokens = typeof lightTheme.resolved;

export const darkTheme = /* @__PURE__ */ extendTheme(
  baseTheme,
  {
    ...scales,
    // 几何档位与亮色一致，暗色背景使用更强的阴影，不靠改变组件尺寸制造层次。
    shadow: {
      none: 'none',
      xs: '0 1px 2px rgb(0 0 0 / 0.24)',
      sm: '0 1px 3px rgb(0 0 0 / 0.32)',
      md: '0 4px 8px rgb(0 0 0 / 0.40)',
      lg: '0 8px 16px rgb(0 0 0 / 0.48)',
      xl: '0 16px 32px rgb(0 0 0 / 0.56)',
    },
    color: {
      primary: '#a5b4fc',
      primaryHover: '#c7d2fe',
      primaryActive: '#e0e7ff',
      primarySubtle: '#312e81',
      onPrimary: '#1e1b4b',
      onPrimarySubtle: '#e0e7ff',
      surface: '#1e293b',
      surfaceRaised: '#334155',
      surfaceSunken: '#0f172a',
      surfaceHover: '#334155',
      background: '#0f172a',
      text: '#f8fafc',
      muted: '#cbd5e1',
      textDisabled: '#94a3b8',
      border: '#64748b',
      borderStrong: '#94a3b8',
      focus: '#a5b4fc',
      danger: '#fca5a5',
      onDanger: '#450a0a',
      success: '#86efac',
      onSuccess: '#052e16',
      warning: '#fde68a',
      onWarning: '#451a03',
      info: '#7dd3fc',
      onInfo: '#082f49',
    } satisfies Record<keyof DefaultTokens['color'], string>,
  },
  { colorScheme: 'dark' },
);

/** 内置 UI 主题的类型化入口；core 的 css 仅含标准 CSS 能力。 */
export const css: (factory: StyleFactory<DefaultTokens>) => string = /* @__PURE__ */ createCss(
  lightTheme,
  { layer: 'zui.app' },
);

/** 组件基础样式与整类默认覆盖使用固定层，避免依靠 class 字符串顺序。 */
export const componentCss: (factory: StyleFactory<DefaultTokens>) => string =
  /* @__PURE__ */ createCss(lightTheme, { layer: 'zui.components' });
export const defaultsCss: (factory: StyleFactory<DefaultTokens>) => string =
  /* @__PURE__ */ createCss(lightTheme, { layer: 'zui.defaults' });
