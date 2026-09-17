export const units = {
  length: [
    'px',
    'rem',
    'em',
    'ch',
    'ex',
    'cap',
    'ic',
    'lh',
    'rlh',
    'cm',
    'mm',
    'Q',
    'in',
    'pt',
    'pc',
    'vw',
    'vh',
    'vi',
    'vb',
    'vmin',
    'vmax',
    'svw',
    'svh',
    'svi',
    'svb',
    'lvw',
    'lvh',
    'lvi',
    'lvb',
    'dvw',
    'dvh',
    'dvi',
    'dvb',
    'cqw',
    'cqh',
    'cqi',
    'cqb',
    'cqmin',
    'cqmax',
    'pct',
  ],
  time: ['ms', 's'],
  angle: ['deg', 'rad', 'grad', 'turn'],
} as const;

export interface PropertyOptions {
  units?: keyof typeof units;
  arity?: 1 | 2 | 4;
  tokens?: string;
}

// 单位和 Token 语义不能仅从 csstype 的 string/number 联合类型推断。
const groups: readonly [string, PropertyOptions][] = [
  [
    'width minWidth maxWidth height minHeight maxHeight inlineSize minInlineSize maxInlineSize blockSize minBlockSize maxBlockSize flexBasis',
    { units: 'length', tokens: 'size' },
  ],
  [
    'top right bottom left insetBlockStart insetBlockEnd insetInlineStart insetInlineEnd',
    { units: 'length', tokens: 'spacing' },
  ],
  [
    'marginTop marginRight marginBottom marginLeft marginBlockStart marginBlockEnd marginInlineStart marginInlineEnd paddingTop paddingRight paddingBottom paddingLeft paddingBlockStart paddingBlockEnd paddingInlineStart paddingInlineEnd scrollMarginTop scrollMarginRight scrollMarginBottom scrollMarginLeft scrollPaddingTop scrollPaddingRight scrollPaddingBottom scrollPaddingLeft',
    { units: 'length', tokens: 'spacing' },
  ],
  [
    'margin padding inset scrollMargin scrollPadding',
    { units: 'length', arity: 4, tokens: 'spacing' },
  ],
  [
    'marginInline marginBlock paddingInline paddingBlock insetInline insetBlock gap',
    { units: 'length', arity: 2, tokens: 'spacing' },
  ],
  ['rowGap columnGap textIndent', { units: 'length', tokens: 'spacing' }],
  [
    'borderTopLeftRadius borderTopRightRadius borderBottomLeftRadius borderBottomRightRadius borderStartStartRadius borderStartEndRadius borderEndStartRadius borderEndEndRadius',
    { units: 'length', arity: 2, tokens: 'radius' },
  ],
  ['borderRadius', { units: 'length', arity: 4, tokens: 'radius' }],
  ['borderWidth', { units: 'length', arity: 4, tokens: 'borderWidth' }],
  [
    'borderTopWidth borderRightWidth borderBottomWidth borderLeftWidth outlineWidth outlineOffset',
    { units: 'length', tokens: 'borderWidth' },
  ],
  ['fontSize', { units: 'length', tokens: 'fontSize' }],
  ['letterSpacing wordSpacing', { units: 'length', tokens: 'letterSpacing' }],
  ['lineHeight', { units: 'length', tokens: 'lineHeight' }],
  ['fontWeight', { tokens: 'fontWeight' }],
  ['fontFamily', { tokens: 'fontFamily' }],
  [
    'transitionDuration transitionDelay animationDuration animationDelay',
    { units: 'time', tokens: 'duration' },
  ],
  ['transitionTimingFunction animationTimingFunction', { tokens: 'easing' }],
  ['rotate', { units: 'angle' }],
  ['boxShadow textShadow', { tokens: 'shadow' }],
  ['zIndex', { tokens: 'zIndex' }],
  ['opacity', { tokens: 'opacity' }],
  [
    'color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor borderBlockColor borderInlineColor borderBlockStartColor borderBlockEndColor borderInlineStartColor borderInlineEndColor outlineColor textDecorationColor textEmphasisColor caretColor accentColor fill stroke floodColor lightingColor stopColor',
    { tokens: 'color' },
  ],
];

export const propertyOptions: Readonly<Record<string, PropertyOptions>> = Object.fromEntries(
  groups.flatMap(([names, options]) => names.split(' ').map((name) => [name, options])),
);
