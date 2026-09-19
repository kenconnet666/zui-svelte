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

// 常用属性的简短说明；完整语法/初始值/来源由上游生成，不手写全量 CSS 定义。
export const propertyDescriptions: Readonly<Record<string, string>> = {
  inlineSize: '元素在行内轴方向上的尺寸。',
  blockSize: '元素在块轴方向上的尺寸。',
  maxInlineSize: '行内轴方向的最大尺寸。',
  minInlineSize: '行内轴方向的最小尺寸。',
  maxBlockSize: '块轴方向的最大尺寸。',
  minBlockSize: '块轴方向的最小尺寸。',
  width: '元素的物理宽度。',
  height: '元素的物理高度。',
  display: '元素的外部布局角色与内部布局方式。',
  position: '元素的定位方式。',
  color: '文本及 currentColor 的前景颜色。',
  backgroundColor: '元素的背景颜色。',
  gap: '网格或弹性布局的行、列间距。',
  padding: '四个物理方向的内边距。',
  margin: '四个物理方向的外边距。',
  paddingInline: '行内轴起点与终点的内边距。',
  paddingBlock: '块轴起点与终点的内边距。',
  borderRadius: '四个角的圆角半径。',
  opacity: '元素整体的不透明度，通常为 0–1。',
  zIndex: '定位元素在当前层叠上下文中的层级。',
  overflow: '内容溢出元素盒时的处理方式。',
};

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
