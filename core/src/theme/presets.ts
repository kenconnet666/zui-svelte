import { defineTheme, overrideTheme } from './theme.js';

export const lightTheme = defineTheme({
  color: {
    primary: '#4f46e5',
    onPrimary: '#ffffff',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',
    background: '#f8fafc',
    text: '#0f172a',
    muted: '#475569',
    border: '#cbd5e1',
    focus: '#4f46e5',
    danger: '#b91c1c',
    success: '#15803d',
    warning: '#92400e',
  },
  spacing: { none: '0px', xs: '4px', small: '8px', medium: '12px', large: '16px', xl: '24px' },
  size: { control: '36px', icon: '16px' },
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
});

export type DefaultTokens = typeof lightTheme.tokens;

export const darkTheme = overrideTheme(lightTheme, {
  color: {
    primary: '#a5b4fc',
    onPrimary: '#1e1b4b',
    surface: '#1e293b',
    surfaceHover: '#334155',
    background: '#0f172a',
    text: '#f8fafc',
    muted: '#cbd5e1',
    border: '#64748b',
    focus: '#a5b4fc',
    danger: '#fca5a5',
    success: '#86efac',
    warning: '#fde68a',
  },
});
