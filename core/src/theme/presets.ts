import { defineTheme, extendTheme } from './theme.js';

/** 只提供 CSS 载体的空 Token 起点，不继承亮暗预设的视觉值。 */
export const baseTheme = defineTheme({});

const scales = {
  spacing: { none: '0px', xs: '4px', small: '8px', medium: '12px', large: '16px', xl: '24px' },
  size: { controlSmall: '28px', control: '36px', controlLarge: '44px', icon: '16px' },
  radius: { small: '4px', medium: '8px', large: '12px', full: '9999px' },
  borderWidth: { thin: '1px', focus: '2px' },
  fontFamily: { body: 'system-ui, sans-serif', mono: 'ui-monospace, monospace' },
  fontSize: { small: '12px', medium: '14px', large: '18px' },
  fontWeight: { normal: 400, medium: 500, bold: 700 },
  lineHeight: { normal: 1.5, tight: 1.25 },
  letterSpacing: { normal: '0px' },
  duration: { fast: '120ms', normal: '200ms', slow: '300ms' },
  easing: { standard: 'ease', linear: 'linear' },
  shadow: { small: '0 1px 3px rgb(0 0 0 / 0.12)' },
  zIndex: { popup: 1000, overlay: 1100, notification: 1200 },
  opacity: { disabled: 0.5 },
  breakpoint: { small: '640px', medium: '768px', large: '1024px' },
};

export const lightTheme = extendTheme(
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

export const darkTheme = extendTheme(
  baseTheme,
  {
    ...scales,
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
