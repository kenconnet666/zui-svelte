// 自动生成：node scripts/generate-theme-types.mjs；默认值说明来自 theme.ts，不是当前 ThemeScope 的计算值。
export type DefaultTokens = {
  readonly spacing: {
    /** spacing.none；默认 "0px"。 */
    readonly none: string;
    /** spacing.xs；默认 "4px"。 */
    readonly xs: string;
    /** spacing.sm；默认 "8px"。 */
    readonly sm: string;
    /** spacing.md；默认 "12px"。 */
    readonly md: string;
    /** spacing.lg；默认 "16px"。 */
    readonly lg: string;
    /** spacing.xl；默认 "24px"。 */
    readonly xl: string;
  };
  readonly size: {
    /** size.none；默认 "0px"。 */
    readonly none: string;
    /** size.controlXs；默认 "24px"。 */
    readonly controlXs: string;
    /** size.controlSm；默认 "28px"。 */
    readonly controlSm: string;
    /** size.controlMd；默认 "36px"。 */
    readonly controlMd: string;
    /** size.controlLg；默认 "44px"。 */
    readonly controlLg: string;
    /** size.controlXl；默认 "52px"。 */
    readonly controlXl: string;
    /** size.iconXs；默认 "12px"。 */
    readonly iconXs: string;
    /** size.iconSm；默认 "14px"。 */
    readonly iconSm: string;
    /** size.iconMd；默认 "16px"。 */
    readonly iconMd: string;
    /** size.iconLg；默认 "20px"。 */
    readonly iconLg: string;
    /** size.iconXl；默认 "24px"。 */
    readonly iconXl: string;
    /** size.containerXs；默认 "32rem"。 */
    readonly containerXs: string;
    /** size.containerSm；默认 "48rem"。 */
    readonly containerSm: string;
    /** size.containerMd；默认 "64rem"。 */
    readonly containerMd: string;
    /** size.containerLg；默认 "80rem"。 */
    readonly containerLg: string;
    /** size.containerXl；默认 "96rem"。 */
    readonly containerXl: string;
    /** size.panelXs；默认 "20rem"。 */
    readonly panelXs: string;
    /** size.panelSm；默认 "28rem"。 */
    readonly panelSm: string;
    /** size.panelMd；默认 "36rem"。 */
    readonly panelMd: string;
    /** size.panelLg；默认 "48rem"。 */
    readonly panelLg: string;
    /** size.panelXl；默认 "64rem"。 */
    readonly panelXl: string;
    /** size.full；默认 "100%"。 */
    readonly full: string;
    /** size.control；默认 "36px"；引用 size.controlMd。 */
    readonly control: string;
    /** size.icon；默认 "16px"；引用 size.iconMd。 */
    readonly icon: string;
  };
  readonly radius: {
    /** radius.none；默认 "0px"。 */
    readonly none: string;
    /** radius.xs；默认 "2px"。 */
    readonly xs: string;
    /** radius.sm；默认 "4px"。 */
    readonly sm: string;
    /** radius.md；默认 "8px"。 */
    readonly md: string;
    /** radius.lg；默认 "12px"。 */
    readonly lg: string;
    /** radius.xl；默认 "16px"。 */
    readonly xl: string;
    /** radius.full；默认 "9999px"。 */
    readonly full: string;
  };
  readonly borderWidth: {
    /** borderWidth.none；默认 "0px"。 */
    readonly none: string;
    /** borderWidth.xs；默认 "1px"。 */
    readonly xs: string;
    /** borderWidth.sm；默认 "1.5px"。 */
    readonly sm: string;
    /** borderWidth.md；默认 "2px"。 */
    readonly md: string;
    /** borderWidth.lg；默认 "3px"。 */
    readonly lg: string;
    /** borderWidth.xl；默认 "4px"。 */
    readonly xl: string;
    /** borderWidth.thin；默认 "1px"；引用 borderWidth.xs。 */
    readonly thin: string;
    /** borderWidth.focus；默认 "2px"；引用 borderWidth.md。 */
    readonly focus: string;
  };
  readonly fontFamily: {
    /** fontFamily.body；默认 "system-ui, sans-serif"。 */
    readonly body: string;
    /** fontFamily.mono；默认 "ui-monospace, monospace"。 */
    readonly mono: string;
  };
  readonly fontSize: {
    /** fontSize.xs；默认 "12px"。 */
    readonly xs: string;
    /** fontSize.sm；默认 "14px"。 */
    readonly sm: string;
    /** fontSize.md；默认 "16px"。 */
    readonly md: string;
    /** fontSize.lg；默认 "18px"。 */
    readonly lg: string;
    /** fontSize.xl；默认 "20px"。 */
    readonly xl: string;
  };
  readonly fontWeight: {
    /** fontWeight.light；默认 300。 */
    readonly light: string | number;
    /** fontWeight.normal；默认 400。 */
    readonly normal: string | number;
    /** fontWeight.medium；默认 500。 */
    readonly medium: string | number;
    /** fontWeight.semibold；默认 600。 */
    readonly semibold: string | number;
    /** fontWeight.bold；默认 700。 */
    readonly bold: string | number;
  };
  readonly lineHeight: {
    /** lineHeight.xs；默认 1。 */
    readonly xs: string | number;
    /** lineHeight.sm；默认 1.25。 */
    readonly sm: string | number;
    /** lineHeight.md；默认 1.5。 */
    readonly md: string | number;
    /** lineHeight.lg；默认 1.75。 */
    readonly lg: string | number;
    /** lineHeight.xl；默认 2。 */
    readonly xl: string | number;
    /** lineHeight.tight；默认 1.25；引用 lineHeight.sm。 */
    readonly tight: string | number;
    /** lineHeight.normal；默认 1.5；引用 lineHeight.md。 */
    readonly normal: string | number;
  };
  readonly letterSpacing: {
    /** letterSpacing.xs；默认 "-0.025em"。 */
    readonly xs: string;
    /** letterSpacing.sm；默认 "-0.0125em"。 */
    readonly sm: string;
    /** letterSpacing.md；默认 "0em"。 */
    readonly md: string;
    /** letterSpacing.lg；默认 "0.025em"。 */
    readonly lg: string;
    /** letterSpacing.xl；默认 "0.05em"。 */
    readonly xl: string;
    /** letterSpacing.normal；默认 "0em"；引用 letterSpacing.md。 */
    readonly normal: string;
  };
  readonly duration: {
    /** duration.none；默认 "0ms"。 */
    readonly none: string;
    /** duration.xs；默认 "75ms"。 */
    readonly xs: string;
    /** duration.sm；默认 "120ms"。 */
    readonly sm: string;
    /** duration.md；默认 "200ms"。 */
    readonly md: string;
    /** duration.lg；默认 "300ms"。 */
    readonly lg: string;
    /** duration.xl；默认 "500ms"。 */
    readonly xl: string;
  };
  readonly easing: {
    /** easing.standard；默认 "ease"。 */
    readonly standard: string;
    /** easing.linear；默认 "linear"。 */
    readonly linear: string;
  };
  readonly shadow: {
    /** shadow.none；默认 "none"。 */
    readonly none: string;
    /** shadow.xs；默认 "0 1px 2px rgb(0 0 0 / 0.08)"。 */
    readonly xs: string;
    /** shadow.sm；默认 "0 1px 3px rgb(0 0 0 / 0.12)"。 */
    readonly sm: string;
    /** shadow.md；默认 "0 4px 8px rgb(0 0 0 / 0.14)"。 */
    readonly md: string;
    /** shadow.lg；默认 "0 8px 16px rgb(0 0 0 / 0.16)"。 */
    readonly lg: string;
    /** shadow.xl；默认 "0 16px 32px rgb(0 0 0 / 0.20)"。 */
    readonly xl: string;
  };
  readonly zIndex: {
    /** zIndex.base；默认 0。 */
    readonly base: number;
    /** zIndex.sticky；默认 100。 */
    readonly sticky: number;
    /** zIndex.popup；默认 1000。 */
    readonly popup: number;
    /** zIndex.overlay；默认 1100。 */
    readonly overlay: number;
    /** zIndex.notification；默认 1200。 */
    readonly notification: number;
  };
  readonly opacity: {
    /** opacity.none；默认 0。 */
    readonly none: number;
    /** opacity.xs；默认 0.1。 */
    readonly xs: number;
    /** opacity.sm；默认 0.25。 */
    readonly sm: number;
    /** opacity.md；默认 0.5。 */
    readonly md: number;
    /** opacity.lg；默认 0.75。 */
    readonly lg: number;
    /** opacity.xl；默认 0.9。 */
    readonly xl: number;
    /** opacity.full；默认 1。 */
    readonly full: number;
    /** opacity.disabled；默认 0.5；引用 opacity.md。 */
    readonly disabled: number;
  };
  readonly breakpoint: {
    /** breakpoint.xs；默认 "480px"。 */
    readonly xs: string;
    /** breakpoint.sm；默认 "640px"。 */
    readonly sm: string;
    /** breakpoint.md；默认 "768px"。 */
    readonly md: string;
    /** breakpoint.lg；默认 "1024px"。 */
    readonly lg: string;
    /** breakpoint.xl；默认 "1280px"。 */
    readonly xl: string;
  };
  readonly color: {
    /** color.primary；默认 "#4f46e5"。 */
    readonly primary: string;
    /** color.primaryHover；默认 "#4338ca"。 */
    readonly primaryHover: string;
    /** color.primaryActive；默认 "#3730a3"。 */
    readonly primaryActive: string;
    /** color.primarySubtle；默认 "#eef2ff"。 */
    readonly primarySubtle: string;
    /** color.onPrimary；默认 "#ffffff"。 */
    readonly onPrimary: string;
    /** color.onPrimarySubtle；默认 "#3730a3"。 */
    readonly onPrimarySubtle: string;
    /** color.surface；默认 "#ffffff"。 */
    readonly surface: string;
    /** color.surfaceRaised；默认 "#ffffff"。 */
    readonly surfaceRaised: string;
    /** color.surfaceSunken；默认 "#f1f5f9"。 */
    readonly surfaceSunken: string;
    /** color.surfaceHover；默认 "#f1f5f9"。 */
    readonly surfaceHover: string;
    /** color.background；默认 "#f8fafc"。 */
    readonly background: string;
    /** color.backdrop；默认 "rgb(0 0 0 / 0.4)"。 */
    readonly backdrop: string;
    /** color.text；默认 "#0f172a"。 */
    readonly text: string;
    /** color.muted；默认 "#475569"。 */
    readonly muted: string;
    /** color.textDisabled；默认 "#64748b"。 */
    readonly textDisabled: string;
    /** color.border；默认 "#cbd5e1"。 */
    readonly border: string;
    /** color.borderStrong；默认 "#64748b"。 */
    readonly borderStrong: string;
    /** color.focus；默认 "#4f46e5"。 */
    readonly focus: string;
    /** color.danger；默认 "#b91c1c"。 */
    readonly danger: string;
    /** color.onDanger；默认 "#ffffff"。 */
    readonly onDanger: string;
    /** color.success；默认 "#15803d"。 */
    readonly success: string;
    /** color.onSuccess；默认 "#ffffff"。 */
    readonly onSuccess: string;
    /** color.warning；默认 "#92400e"。 */
    readonly warning: string;
    /** color.onWarning；默认 "#ffffff"。 */
    readonly onWarning: string;
    /** color.info；默认 "#0369a1"。 */
    readonly info: string;
    /** color.onInfo；默认 "#ffffff"。 */
    readonly onInfo: string;
  };
};
interface SpacingThemeMembers {
  /** spacing.none；默认 "0px"。随 ThemeScope 变化。 */
  readonly _none: void;
  /** spacing.xs；默认 "4px"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** spacing.sm；默认 "8px"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** spacing.md；默认 "12px"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** spacing.lg；默认 "16px"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** spacing.xl；默认 "24px"。随 ThemeScope 变化。 */
  readonly _xl: void;
}
interface SizeThemeMembers {
  /** size.none；默认 "0px"。随 ThemeScope 变化。 */
  readonly _none: void;
  /** size.controlXs；默认 "24px"。随 ThemeScope 变化。 */
  readonly _controlXs: void;
  /** size.controlSm；默认 "28px"。随 ThemeScope 变化。 */
  readonly _controlSm: void;
  /** size.controlMd；默认 "36px"。随 ThemeScope 变化。 */
  readonly _controlMd: void;
  /** size.controlLg；默认 "44px"。随 ThemeScope 变化。 */
  readonly _controlLg: void;
  /** size.controlXl；默认 "52px"。随 ThemeScope 变化。 */
  readonly _controlXl: void;
  /** size.iconXs；默认 "12px"。随 ThemeScope 变化。 */
  readonly _iconXs: void;
  /** size.iconSm；默认 "14px"。随 ThemeScope 变化。 */
  readonly _iconSm: void;
  /** size.iconMd；默认 "16px"。随 ThemeScope 变化。 */
  readonly _iconMd: void;
  /** size.iconLg；默认 "20px"。随 ThemeScope 变化。 */
  readonly _iconLg: void;
  /** size.iconXl；默认 "24px"。随 ThemeScope 变化。 */
  readonly _iconXl: void;
  /** size.containerXs；默认 "32rem"。随 ThemeScope 变化。 */
  readonly _containerXs: void;
  /** size.containerSm；默认 "48rem"。随 ThemeScope 变化。 */
  readonly _containerSm: void;
  /** size.containerMd；默认 "64rem"。随 ThemeScope 变化。 */
  readonly _containerMd: void;
  /** size.containerLg；默认 "80rem"。随 ThemeScope 变化。 */
  readonly _containerLg: void;
  /** size.containerXl；默认 "96rem"。随 ThemeScope 变化。 */
  readonly _containerXl: void;
  /** size.panelXs；默认 "20rem"。随 ThemeScope 变化。 */
  readonly _panelXs: void;
  /** size.panelSm；默认 "28rem"。随 ThemeScope 变化。 */
  readonly _panelSm: void;
  /** size.panelMd；默认 "36rem"。随 ThemeScope 变化。 */
  readonly _panelMd: void;
  /** size.panelLg；默认 "48rem"。随 ThemeScope 变化。 */
  readonly _panelLg: void;
  /** size.panelXl；默认 "64rem"。随 ThemeScope 变化。 */
  readonly _panelXl: void;
  /** size.full；默认 "100%"。随 ThemeScope 变化。 */
  readonly _full: void;
  /** size.control；默认 "36px"；引用 size.controlMd。随 ThemeScope 变化。 */
  readonly _control: void;
  /** size.icon；默认 "16px"；引用 size.iconMd。随 ThemeScope 变化。 */
  readonly _icon: void;
}
interface RadiusThemeMembers {
  /** radius.none；默认 "0px"。随 ThemeScope 变化。 */
  readonly _none: void;
  /** radius.xs；默认 "2px"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** radius.sm；默认 "4px"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** radius.md；默认 "8px"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** radius.lg；默认 "12px"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** radius.xl；默认 "16px"。随 ThemeScope 变化。 */
  readonly _xl: void;
  /** radius.full；默认 "9999px"。随 ThemeScope 变化。 */
  readonly _full: void;
}
interface BorderWidthThemeMembers {
  /** borderWidth.none；默认 "0px"。随 ThemeScope 变化。 */
  readonly _none: void;
  /** borderWidth.xs；默认 "1px"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** borderWidth.sm；默认 "1.5px"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** borderWidth.md；默认 "2px"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** borderWidth.lg；默认 "3px"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** borderWidth.xl；默认 "4px"。随 ThemeScope 变化。 */
  readonly _xl: void;
  /** borderWidth.thin；默认 "1px"；引用 borderWidth.xs。随 ThemeScope 变化。 */
  readonly _thin: void;
  /** borderWidth.focus；默认 "2px"；引用 borderWidth.md。随 ThemeScope 变化。 */
  readonly _focus: void;
}
interface FontFamilyThemeMembers {
  /** fontFamily.body；默认 "system-ui, sans-serif"。随 ThemeScope 变化。 */
  readonly _body: void;
  /** fontFamily.mono；默认 "ui-monospace, monospace"。随 ThemeScope 变化。 */
  readonly _mono: void;
}
interface FontSizeThemeMembers {
  /** fontSize.xs；默认 "12px"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** fontSize.sm；默认 "14px"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** fontSize.md；默认 "16px"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** fontSize.lg；默认 "18px"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** fontSize.xl；默认 "20px"。随 ThemeScope 变化。 */
  readonly _xl: void;
}
interface FontWeightThemeMembers {
  /** fontWeight.light；默认 300。随 ThemeScope 变化。 */
  readonly _light: void;
  /** fontWeight.normal；默认 400。随 ThemeScope 变化。 */
  readonly _normal: void;
  /** fontWeight.medium；默认 500。随 ThemeScope 变化。 */
  readonly _medium: void;
  /** fontWeight.semibold；默认 600。随 ThemeScope 变化。 */
  readonly _semibold: void;
  /** fontWeight.bold；默认 700。随 ThemeScope 变化。 */
  readonly _bold: void;
}
interface LineHeightThemeMembers {
  /** lineHeight.xs；默认 1。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** lineHeight.sm；默认 1.25。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** lineHeight.md；默认 1.5。随 ThemeScope 变化。 */
  readonly _md: void;
  /** lineHeight.lg；默认 1.75。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** lineHeight.xl；默认 2。随 ThemeScope 变化。 */
  readonly _xl: void;
  /** lineHeight.tight；默认 1.25；引用 lineHeight.sm。随 ThemeScope 变化。 */
  readonly _tight: void;
  /** lineHeight.normal；默认 1.5；引用 lineHeight.md。随 ThemeScope 变化。 */
  readonly _normal: void;
}
interface LetterSpacingThemeMembers {
  /** letterSpacing.xs；默认 "-0.025em"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** letterSpacing.sm；默认 "-0.0125em"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** letterSpacing.md；默认 "0em"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** letterSpacing.lg；默认 "0.025em"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** letterSpacing.xl；默认 "0.05em"。随 ThemeScope 变化。 */
  readonly _xl: void;
  /** letterSpacing.normal；默认 "0em"；引用 letterSpacing.md。随 ThemeScope 变化。 */
  readonly _normal: void;
}
interface DurationThemeMembers {
  /** duration.none；默认 "0ms"。随 ThemeScope 变化。 */
  readonly _none: void;
  /** duration.xs；默认 "75ms"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** duration.sm；默认 "120ms"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** duration.md；默认 "200ms"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** duration.lg；默认 "300ms"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** duration.xl；默认 "500ms"。随 ThemeScope 变化。 */
  readonly _xl: void;
}
interface EasingThemeMembers {
  /** easing.standard；默认 "ease"。随 ThemeScope 变化。 */
  readonly _standard: void;
  /** easing.linear；默认 "linear"。随 ThemeScope 变化。 */
  readonly _linear: void;
}
interface ShadowThemeMembers {
  /** shadow.none；默认 "none"。随 ThemeScope 变化。 */
  readonly _none: void;
  /** shadow.xs；默认 "0 1px 2px rgb(0 0 0 / 0.08)"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** shadow.sm；默认 "0 1px 3px rgb(0 0 0 / 0.12)"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** shadow.md；默认 "0 4px 8px rgb(0 0 0 / 0.14)"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** shadow.lg；默认 "0 8px 16px rgb(0 0 0 / 0.16)"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** shadow.xl；默认 "0 16px 32px rgb(0 0 0 / 0.20)"。随 ThemeScope 变化。 */
  readonly _xl: void;
}
interface ZIndexThemeMembers {
  /** zIndex.base；默认 0。随 ThemeScope 变化。 */
  readonly _base: void;
  /** zIndex.sticky；默认 100。随 ThemeScope 变化。 */
  readonly _sticky: void;
  /** zIndex.popup；默认 1000。随 ThemeScope 变化。 */
  readonly _popup: void;
  /** zIndex.overlay；默认 1100。随 ThemeScope 变化。 */
  readonly _overlay: void;
  /** zIndex.notification；默认 1200。随 ThemeScope 变化。 */
  readonly _notification: void;
}
interface OpacityThemeMembers {
  /** opacity.none；默认 0。随 ThemeScope 变化。 */
  readonly _none: void;
  /** opacity.xs；默认 0.1。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** opacity.sm；默认 0.25。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** opacity.md；默认 0.5。随 ThemeScope 变化。 */
  readonly _md: void;
  /** opacity.lg；默认 0.75。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** opacity.xl；默认 0.9。随 ThemeScope 变化。 */
  readonly _xl: void;
  /** opacity.full；默认 1。随 ThemeScope 变化。 */
  readonly _full: void;
  /** opacity.disabled；默认 0.5；引用 opacity.md。随 ThemeScope 变化。 */
  readonly _disabled: void;
}
interface BreakpointThemeMembers {
  /** breakpoint.xs；默认 "480px"。随 ThemeScope 变化。 */
  readonly _xs: void;
  /** breakpoint.sm；默认 "640px"。随 ThemeScope 变化。 */
  readonly _sm: void;
  /** breakpoint.md；默认 "768px"。随 ThemeScope 变化。 */
  readonly _md: void;
  /** breakpoint.lg；默认 "1024px"。随 ThemeScope 变化。 */
  readonly _lg: void;
  /** breakpoint.xl；默认 "1280px"。随 ThemeScope 变化。 */
  readonly _xl: void;
}
interface ColorThemeMembers {
  /** color.primary；默认 "#4f46e5"。随 ThemeScope 变化。 */
  readonly _primary: void;
  /** color.primaryHover；默认 "#4338ca"。随 ThemeScope 变化。 */
  readonly _primaryHover: void;
  /** color.primaryActive；默认 "#3730a3"。随 ThemeScope 变化。 */
  readonly _primaryActive: void;
  /** color.primarySubtle；默认 "#eef2ff"。随 ThemeScope 变化。 */
  readonly _primarySubtle: void;
  /** color.onPrimary；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _onPrimary: void;
  /** color.onPrimarySubtle；默认 "#3730a3"。随 ThemeScope 变化。 */
  readonly _onPrimarySubtle: void;
  /** color.surface；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _surface: void;
  /** color.surfaceRaised；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _surfaceRaised: void;
  /** color.surfaceSunken；默认 "#f1f5f9"。随 ThemeScope 变化。 */
  readonly _surfaceSunken: void;
  /** color.surfaceHover；默认 "#f1f5f9"。随 ThemeScope 变化。 */
  readonly _surfaceHover: void;
  /** color.background；默认 "#f8fafc"。随 ThemeScope 变化。 */
  readonly _background: void;
  /** color.backdrop；默认 "rgb(0 0 0 / 0.4)"。随 ThemeScope 变化。 */
  readonly _backdrop: void;
  /** color.text；默认 "#0f172a"。随 ThemeScope 变化。 */
  readonly _text: void;
  /** color.muted；默认 "#475569"。随 ThemeScope 变化。 */
  readonly _muted: void;
  /** color.textDisabled；默认 "#64748b"。随 ThemeScope 变化。 */
  readonly _textDisabled: void;
  /** color.border；默认 "#cbd5e1"。随 ThemeScope 变化。 */
  readonly _border: void;
  /** color.borderStrong；默认 "#64748b"。随 ThemeScope 变化。 */
  readonly _borderStrong: void;
  /** color.focus；默认 "#4f46e5"。随 ThemeScope 变化。 */
  readonly _focus: void;
  /** color.danger；默认 "#b91c1c"。随 ThemeScope 变化。 */
  readonly _danger: void;
  /** color.onDanger；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _onDanger: void;
  /** color.success；默认 "#15803d"。随 ThemeScope 变化。 */
  readonly _success: void;
  /** color.onSuccess；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _onSuccess: void;
  /** color.warning；默认 "#92400e"。随 ThemeScope 变化。 */
  readonly _warning: void;
  /** color.onWarning；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _onWarning: void;
  /** color.info；默认 "#0369a1"。随 ThemeScope 变化。 */
  readonly _info: void;
  /** color.onInfo；默认 "#ffffff"。随 ThemeScope 变化。 */
  readonly _onInfo: void;
}
interface ThemePropertyDocs {
  readonly width: SizeThemeMembers;
  readonly minWidth: SizeThemeMembers;
  readonly maxWidth: SizeThemeMembers;
  readonly height: SizeThemeMembers;
  readonly minHeight: SizeThemeMembers;
  readonly maxHeight: SizeThemeMembers;
  readonly inlineSize: SizeThemeMembers;
  readonly minInlineSize: SizeThemeMembers;
  readonly maxInlineSize: SizeThemeMembers;
  readonly blockSize: SizeThemeMembers;
  readonly minBlockSize: SizeThemeMembers;
  readonly maxBlockSize: SizeThemeMembers;
  readonly flexBasis: SizeThemeMembers;
  readonly top: SpacingThemeMembers;
  readonly right: SpacingThemeMembers;
  readonly bottom: SpacingThemeMembers;
  readonly left: SpacingThemeMembers;
  readonly insetBlockStart: SpacingThemeMembers;
  readonly insetBlockEnd: SpacingThemeMembers;
  readonly insetInlineStart: SpacingThemeMembers;
  readonly insetInlineEnd: SpacingThemeMembers;
  readonly marginTop: SpacingThemeMembers;
  readonly marginRight: SpacingThemeMembers;
  readonly marginBottom: SpacingThemeMembers;
  readonly marginLeft: SpacingThemeMembers;
  readonly marginBlockStart: SpacingThemeMembers;
  readonly marginBlockEnd: SpacingThemeMembers;
  readonly marginInlineStart: SpacingThemeMembers;
  readonly marginInlineEnd: SpacingThemeMembers;
  readonly paddingTop: SpacingThemeMembers;
  readonly paddingRight: SpacingThemeMembers;
  readonly paddingBottom: SpacingThemeMembers;
  readonly paddingLeft: SpacingThemeMembers;
  readonly paddingBlockStart: SpacingThemeMembers;
  readonly paddingBlockEnd: SpacingThemeMembers;
  readonly paddingInlineStart: SpacingThemeMembers;
  readonly paddingInlineEnd: SpacingThemeMembers;
  readonly scrollMarginTop: SpacingThemeMembers;
  readonly scrollMarginRight: SpacingThemeMembers;
  readonly scrollMarginBottom: SpacingThemeMembers;
  readonly scrollMarginLeft: SpacingThemeMembers;
  readonly scrollPaddingTop: SpacingThemeMembers;
  readonly scrollPaddingRight: SpacingThemeMembers;
  readonly scrollPaddingBottom: SpacingThemeMembers;
  readonly scrollPaddingLeft: SpacingThemeMembers;
  readonly margin: SpacingThemeMembers;
  readonly padding: SpacingThemeMembers;
  readonly inset: SpacingThemeMembers;
  readonly scrollMargin: SpacingThemeMembers;
  readonly scrollPadding: SpacingThemeMembers;
  readonly marginInline: SpacingThemeMembers;
  readonly marginBlock: SpacingThemeMembers;
  readonly paddingInline: SpacingThemeMembers;
  readonly paddingBlock: SpacingThemeMembers;
  readonly insetInline: SpacingThemeMembers;
  readonly insetBlock: SpacingThemeMembers;
  readonly gap: SpacingThemeMembers;
  readonly rowGap: SpacingThemeMembers;
  readonly columnGap: SpacingThemeMembers;
  readonly textIndent: SpacingThemeMembers;
  readonly borderTopLeftRadius: RadiusThemeMembers;
  readonly borderTopRightRadius: RadiusThemeMembers;
  readonly borderBottomLeftRadius: RadiusThemeMembers;
  readonly borderBottomRightRadius: RadiusThemeMembers;
  readonly borderStartStartRadius: RadiusThemeMembers;
  readonly borderStartEndRadius: RadiusThemeMembers;
  readonly borderEndStartRadius: RadiusThemeMembers;
  readonly borderEndEndRadius: RadiusThemeMembers;
  readonly borderRadius: RadiusThemeMembers;
  readonly borderWidth: BorderWidthThemeMembers;
  readonly borderTopWidth: BorderWidthThemeMembers;
  readonly borderRightWidth: BorderWidthThemeMembers;
  readonly borderBottomWidth: BorderWidthThemeMembers;
  readonly borderLeftWidth: BorderWidthThemeMembers;
  readonly outlineWidth: BorderWidthThemeMembers;
  readonly outlineOffset: BorderWidthThemeMembers;
  readonly fontSize: FontSizeThemeMembers;
  readonly letterSpacing: LetterSpacingThemeMembers;
  readonly wordSpacing: LetterSpacingThemeMembers;
  readonly lineHeight: LineHeightThemeMembers;
  readonly fontWeight: FontWeightThemeMembers;
  readonly fontFamily: FontFamilyThemeMembers;
  readonly transitionDuration: DurationThemeMembers;
  readonly transitionDelay: DurationThemeMembers;
  readonly animationDuration: DurationThemeMembers;
  readonly animationDelay: DurationThemeMembers;
  readonly transitionTimingFunction: EasingThemeMembers;
  readonly animationTimingFunction: EasingThemeMembers;
  readonly boxShadow: ShadowThemeMembers;
  readonly textShadow: ShadowThemeMembers;
  readonly zIndex: ZIndexThemeMembers;
  readonly opacity: OpacityThemeMembers;
  readonly color: ColorThemeMembers;
  readonly backgroundColor: ColorThemeMembers;
  readonly borderColor: ColorThemeMembers;
  readonly borderTopColor: ColorThemeMembers;
  readonly borderRightColor: ColorThemeMembers;
  readonly borderBottomColor: ColorThemeMembers;
  readonly borderLeftColor: ColorThemeMembers;
  readonly borderBlockColor: ColorThemeMembers;
  readonly borderInlineColor: ColorThemeMembers;
  readonly borderBlockStartColor: ColorThemeMembers;
  readonly borderBlockEndColor: ColorThemeMembers;
  readonly borderInlineStartColor: ColorThemeMembers;
  readonly borderInlineEndColor: ColorThemeMembers;
  readonly outlineColor: ColorThemeMembers;
  readonly textDecorationColor: ColorThemeMembers;
  readonly textEmphasisColor: ColorThemeMembers;
  readonly caretColor: ColorThemeMembers;
  readonly accentColor: ColorThemeMembers;
  readonly fill: ColorThemeMembers;
  readonly stroke: ColorThemeMembers;
  readonly floodColor: ColorThemeMembers;
  readonly lightingColor: ColorThemeMembers;
  readonly stopColor: ColorThemeMembers;
}
import type { StyleBuilder } from '@zui/core';
export type DefaultStyleFactory = (s: StyleBuilder<DefaultTokens> & ThemePropertyDocs) => void;
