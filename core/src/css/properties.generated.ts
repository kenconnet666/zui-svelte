// 自动生成，请运行 pnpm generate；勿手工修改。来源：csstype 3.2.3（MIT）及 schema.ts。
import type { Carrier, PropertyTokenMap } from './carrier.js';
import type { keywordGroups } from './metadata.generated.js';
import type { TokenSchema } from '../theme/types.js';
import type { DefaultTokens } from '../theme/presets.js';
export interface StyleProperties<
  T extends TokenSchema = DefaultTokens,
  M extends PropertyTokenMap<T> = object,
> {
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly accentColor: Carrier<
    'accentColor',
    keyof (typeof keywordGroups)[0],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly alignContent: Carrier<
    'alignContent',
    keyof (typeof keywordGroups)[1],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly alignItems: Carrier<'alignItems', keyof (typeof keywordGroups)[2], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly alignmentBaseline: Carrier<
    'alignmentBaseline',
    keyof (typeof keywordGroups)[3],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly alignSelf: Carrier<'alignSelf', keyof (typeof keywordGroups)[4], never, 1, '', T, M>;
  /** **Syntax**: `[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#` */
  readonly alignTracks: Carrier<'alignTracks', keyof (typeof keywordGroups)[1], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly all: Carrier<'all', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly anchorName: Carrier<'anchorName', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** **Syntax**: `none | all | <dashed-ident>#` */
  readonly anchorScope: Carrier<'anchorScope', keyof (typeof keywordGroups)[7], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animation: Carrier<'animation', keyof (typeof keywordGroups)[8], 'time', 1, '', T, M>;
  /** Since July 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly animationComposition: Carrier<
    'animationComposition',
    keyof (typeof keywordGroups)[9],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationDelay: Carrier<
    'animationDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationDirection: Carrier<
    'animationDirection',
    keyof (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationDuration: Carrier<
    'animationDuration',
    keyof (typeof keywordGroups)[11],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationFillMode: Carrier<
    'animationFillMode',
    keyof (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationIterationCount: Carrier<
    'animationIterationCount',
    keyof (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationName: Carrier<
    'animationName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationPlayState: Carrier<
    'animationPlayState',
    keyof (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationRange: Carrier<
    'animationRange',
    keyof (typeof keywordGroups)[15],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationRangeEnd: Carrier<
    'animationRangeEnd',
    keyof (typeof keywordGroups)[15],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationRangeStart: Carrier<
    'animationRangeStart',
    keyof (typeof keywordGroups)[15],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationTimeline: Carrier<
    'animationTimeline',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationTimingFunction: Carrier<
    'animationTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    'easing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly appearance: Carrier<'appearance', keyof (typeof keywordGroups)[18], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly aspectRatio: Carrier<
    'aspectRatio',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly backdropFilter: Carrier<
    'backdropFilter',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly backfaceVisibility: Carrier<
    'backfaceVisibility',
    keyof (typeof keywordGroups)[19],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly background: Carrier<
    'background',
    keyof (typeof keywordGroups)[20],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundAttachment: Carrier<
    'backgroundAttachment',
    keyof (typeof keywordGroups)[21],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly backgroundBlendMode: Carrier<
    'backgroundBlendMode',
    keyof (typeof keywordGroups)[22],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundClip: Carrier<
    'backgroundClip',
    keyof (typeof keywordGroups)[23],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundColor: Carrier<
    'backgroundColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundImage: Carrier<
    'backgroundImage',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundOrigin: Carrier<
    'backgroundOrigin',
    keyof (typeof keywordGroups)[25],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundPosition: Carrier<
    'backgroundPosition',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly backgroundPositionX: Carrier<
    'backgroundPositionX',
    keyof (typeof keywordGroups)[27],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly backgroundPositionY: Carrier<
    'backgroundPositionY',
    keyof (typeof keywordGroups)[28],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundRepeat: Carrier<
    'backgroundRepeat',
    keyof (typeof keywordGroups)[29],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundSize: Carrier<
    'backgroundSize',
    keyof (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<length-percentage> | sub | super | baseline` */
  readonly baselineShift: Carrier<
    'baselineShift',
    keyof (typeof keywordGroups)[31],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly blockSize: Carrier<
    'blockSize',
    keyof (typeof keywordGroups)[32],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly border: Carrier<'border', keyof (typeof keywordGroups)[33], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlock: Carrier<
    'borderBlock',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlockColor: Carrier<
    'borderBlockColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEnd: Carrier<
    'borderBlockEnd',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEndColor: Carrier<
    'borderBlockEndColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEndStyle: Carrier<
    'borderBlockEndStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEndWidth: Carrier<
    'borderBlockEndWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStart: Carrier<
    'borderBlockStart',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStartColor: Carrier<
    'borderBlockStartColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStartStyle: Carrier<
    'borderBlockStartStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStartWidth: Carrier<
    'borderBlockStartWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlockStyle: Carrier<
    'borderBlockStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlockWidth: Carrier<
    'borderBlockWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottom: Carrier<
    'borderBottom',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomColor: Carrier<
    'borderBottomColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomLeftRadius: Carrier<
    'borderBottomLeftRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomRightRadius: Carrier<
    'borderBottomRightRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomStyle: Carrier<
    'borderBottomStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomWidth: Carrier<
    'borderBottomWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderCollapse: Carrier<
    'borderCollapse',
    keyof (typeof keywordGroups)[36],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderColor: Carrier<
    'borderColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderEndEndRadius: Carrier<
    'borderEndEndRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderEndStartRadius: Carrier<
    'borderEndStartRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImage: Carrier<
    'borderImage',
    keyof (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageOutset: Carrier<
    'borderImageOutset',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2016. */
  readonly borderImageRepeat: Carrier<
    'borderImageRepeat',
    keyof (typeof keywordGroups)[38],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageSlice: Carrier<
    'borderImageSlice',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageSource: Carrier<
    'borderImageSource',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageWidth: Carrier<
    'borderImageWidth',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInline: Carrier<
    'borderInline',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInlineColor: Carrier<
    'borderInlineColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEnd: Carrier<
    'borderInlineEnd',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEndColor: Carrier<
    'borderInlineEndColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEndStyle: Carrier<
    'borderInlineEndStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEndWidth: Carrier<
    'borderInlineEndWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStart: Carrier<
    'borderInlineStart',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStartColor: Carrier<
    'borderInlineStartColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStartStyle: Carrier<
    'borderInlineStartStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStartWidth: Carrier<
    'borderInlineStartWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInlineStyle: Carrier<
    'borderInlineStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInlineWidth: Carrier<
    'borderInlineWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeft: Carrier<
    'borderLeft',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeftColor: Carrier<
    'borderLeftColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeftStyle: Carrier<
    'borderLeftStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeftWidth: Carrier<
    'borderLeftWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRadius: Carrier<
    'borderRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    4,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRight: Carrier<
    'borderRight',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRightColor: Carrier<
    'borderRightColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRightStyle: Carrier<
    'borderRightStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRightWidth: Carrier<
    'borderRightWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderSpacing: Carrier<
    'borderSpacing',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderStartEndRadius: Carrier<
    'borderStartEndRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderStartStartRadius: Carrier<
    'borderStartStartRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderStyle: Carrier<
    'borderStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTop: Carrier<'borderTop', keyof (typeof keywordGroups)[33], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopColor: Carrier<
    'borderTopColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopLeftRadius: Carrier<
    'borderTopLeftRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopRightRadius: Carrier<
    'borderTopRightRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopStyle: Carrier<
    'borderTopStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopWidth: Carrier<
    'borderTopWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderWidth: Carrier<
    'borderWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    4,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly bottom: Carrier<
    'bottom',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly boxAlign: Carrier<'boxAlign', keyof (typeof keywordGroups)[39], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly boxDecorationBreak: Carrier<
    'boxDecorationBreak',
    keyof (typeof keywordGroups)[40],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly boxDirection: Carrier<
    'boxDirection',
    keyof (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly boxFlex: Carrier<'boxFlex', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group. */
  readonly boxFlexGroup: Carrier<
    'boxFlexGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes). */
  readonly boxLines: Carrier<'boxLines', keyof (typeof keywordGroups)[42], never, 1, '', T, M>;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly boxOrdinalGroup: Carrier<
    'boxOrdinalGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly boxOrient: Carrier<'boxOrient', keyof (typeof keywordGroups)[43], never, 1, '', T, M>;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly boxPack: Carrier<'boxPack', keyof (typeof keywordGroups)[44], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly boxShadow: Carrier<
    'boxShadow',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    'shadow',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly boxSizing: Carrier<'boxSizing', keyof (typeof keywordGroups)[45], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019. */
  readonly breakAfter: Carrier<'breakAfter', keyof (typeof keywordGroups)[46], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019. */
  readonly breakBefore: Carrier<
    'breakBefore',
    keyof (typeof keywordGroups)[46],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019. */
  readonly breakInside: Carrier<
    'breakInside',
    keyof (typeof keywordGroups)[47],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly captionSide: Carrier<
    'captionSide',
    keyof (typeof keywordGroups)[48],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'caret-color'> || <'caret-shape'>` */
  readonly caret: Carrier<'caret', keyof (typeof keywordGroups)[49], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly caretColor: Carrier<
    'caretColor',
    keyof (typeof keywordGroups)[0],
    never,
    1,
    'color',
    T,
    M
  >;
  /** **Syntax**: `auto | bar | block | underscore` */
  readonly caretShape: Carrier<'caretShape', keyof (typeof keywordGroups)[50], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly clear: Carrier<'clear', keyof (typeof keywordGroups)[51], never, 1, '', T, M>;
  /** The **`clip`** CSS property defines a visible portion of an element. The `clip` property applies only to absolutely positioned elements — that is, elements with `position:absolute` or `position:fixed`. */
  readonly clip: Carrier<'clip', keyof (typeof keywordGroups)[11], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly clipPath: Carrier<'clipPath', keyof (typeof keywordGroups)[52], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly clipRule: Carrier<'clipRule', keyof (typeof keywordGroups)[53], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly color: Carrier<'color', keyof (typeof keywordGroups)[24], never, 1, 'color', T, M>;
  /** Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly colorAdjust: Carrier<
    'colorAdjust',
    keyof (typeof keywordGroups)[54],
    never,
    1,
    '',
    T,
    M
  >;
  /** color-interpolation */
  readonly colorInterpolation: Carrier<
    'colorInterpolation',
    keyof (typeof keywordGroups)[55],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly colorInterpolationFilters: Carrier<
    'colorInterpolationFilters',
    keyof (typeof keywordGroups)[55],
    never,
    1,
    '',
    T,
    M
  >;
  /** color-rendering */
  readonly colorRendering: Carrier<
    'colorRendering',
    keyof (typeof keywordGroups)[56],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022. */
  readonly colorScheme: Carrier<
    'colorScheme',
    keyof (typeof keywordGroups)[57],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnCount: Carrier<
    'columnCount',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnFill: Carrier<'columnFill', keyof (typeof keywordGroups)[58], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly columnGap: Carrier<
    'columnGap',
    keyof (typeof keywordGroups)[59],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRule: Carrier<
    'columnRule',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRuleColor: Carrier<
    'columnRuleColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRuleStyle: Carrier<
    'columnRuleStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRuleWidth: Carrier<
    'columnRuleWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columns: Carrier<'columns', keyof (typeof keywordGroups)[11], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly columnSpan: Carrier<'columnSpan', keyof (typeof keywordGroups)[7], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016. */
  readonly columnWidth: Carrier<
    'columnWidth',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly contain: Carrier<'contain', keyof (typeof keywordGroups)[60], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly container: Carrier<'container', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly containerName: Carrier<
    'containerName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly containerType: Carrier<
    'containerType',
    keyof (typeof keywordGroups)[61],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicBlockSize: Carrier<
    'containIntrinsicBlockSize',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicHeight: Carrier<
    'containIntrinsicHeight',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicInlineSize: Carrier<
    'containIntrinsicInlineSize',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicSize: Carrier<
    'containIntrinsicSize',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicWidth: Carrier<
    'containIntrinsicWidth',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly content: Carrier<'content', keyof (typeof keywordGroups)[62], never, 1, '', T, M>;
  /** Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly contentVisibility: Carrier<
    'contentVisibility',
    keyof (typeof keywordGroups)[63],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly counterIncrement: Carrier<
    'counterIncrement',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly counterReset: Carrier<
    'counterReset',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly counterSet: Carrier<'counterSet', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since December 2021. */
  readonly cursor: Carrier<'cursor', keyof (typeof keywordGroups)[64], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly cx: Carrier<'cx', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly cy: Carrier<'cy', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly d: Carrier<'d', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly direction: Carrier<'direction', keyof (typeof keywordGroups)[65], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly display: Carrier<'display', keyof (typeof keywordGroups)[66], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly dominantBaseline: Carrier<
    'dominantBaseline',
    keyof (typeof keywordGroups)[67],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly emptyCells: Carrier<'emptyCells', keyof (typeof keywordGroups)[68], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fieldSizing: Carrier<
    'fieldSizing',
    keyof (typeof keywordGroups)[69],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fill: Carrier<'fill', keyof (typeof keywordGroups)[70], never, 1, 'color', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fillOpacity: Carrier<'fillOpacity', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fillRule: Carrier<'fillRule', keyof (typeof keywordGroups)[53], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly filter: Carrier<'filter', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flex: Carrier<'flex', keyof (typeof keywordGroups)[71], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexBasis: Carrier<
    'flexBasis',
    keyof (typeof keywordGroups)[72],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexDirection: Carrier<
    'flexDirection',
    keyof (typeof keywordGroups)[73],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexFlow: Carrier<'flexFlow', keyof (typeof keywordGroups)[74], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexGrow: Carrier<'flexGrow', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexShrink: Carrier<'flexShrink', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexWrap: Carrier<'flexWrap', keyof (typeof keywordGroups)[75], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly float: Carrier<'float', keyof (typeof keywordGroups)[76], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly floodColor: Carrier<
    'floodColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly floodOpacity: Carrier<
    'floodOpacity',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly font: Carrier<'font', keyof (typeof keywordGroups)[77], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontFamily: Carrier<
    'fontFamily',
    keyof (typeof keywordGroups)[78],
    never,
    1,
    'fontFamily',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fontFeatureSettings: Carrier<
    'fontFeatureSettings',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontKerning: Carrier<
    'fontKerning',
    keyof (typeof keywordGroups)[79],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontLanguageOverride: Carrier<
    'fontLanguageOverride',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2020. */
  readonly fontOpticalSizing: Carrier<
    'fontOpticalSizing',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2022. */
  readonly fontPalette: Carrier<
    'fontPalette',
    keyof (typeof keywordGroups)[57],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontSize: Carrier<
    'fontSize',
    keyof (typeof keywordGroups)[80],
    'length',
    1,
    'fontSize',
    T,
    M
  >;
  /** Since July 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly fontSizeAdjust: Carrier<
    'fontSizeAdjust',
    keyof (typeof keywordGroups)[81],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered. */
  readonly fontSmooth: Carrier<
    'fontSmooth',
    keyof (typeof keywordGroups)[82],
    'length',
    1,
    '',
    T,
    M
  >;
  /** The **`font-stretch`** CSS property selects a normal, condensed, or expanded face from a font. */
  readonly fontStretch: Carrier<
    'fontStretch',
    keyof (typeof keywordGroups)[83],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontStyle: Carrier<'fontStyle', keyof (typeof keywordGroups)[84], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022. */
  readonly fontSynthesis: Carrier<
    'fontSynthesis',
    keyof (typeof keywordGroups)[85],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontSynthesisPosition: Carrier<
    'fontSynthesisPosition',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontSynthesisSmallCaps: Carrier<
    'fontSynthesisSmallCaps',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontSynthesisStyle: Carrier<
    'fontSynthesisStyle',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontSynthesisWeight: Carrier<
    'fontSynthesisWeight',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontVariant: Carrier<
    'fontVariant',
    keyof (typeof keywordGroups)[86],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontVariantAlternates: Carrier<
    'fontVariantAlternates',
    keyof (typeof keywordGroups)[87],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantCaps: Carrier<
    'fontVariantCaps',
    keyof (typeof keywordGroups)[88],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantEastAsian: Carrier<
    'fontVariantEastAsian',
    keyof (typeof keywordGroups)[89],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontVariantEmoji: Carrier<
    'fontVariantEmoji',
    keyof (typeof keywordGroups)[90],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantLigatures: Carrier<
    'fontVariantLigatures',
    keyof (typeof keywordGroups)[91],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantNumeric: Carrier<
    'fontVariantNumeric',
    keyof (typeof keywordGroups)[92],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontVariantPosition: Carrier<
    'fontVariantPosition',
    keyof (typeof keywordGroups)[93],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2018. */
  readonly fontVariationSettings: Carrier<
    'fontVariationSettings',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontWeight: Carrier<
    'fontWeight',
    keyof (typeof keywordGroups)[94],
    never,
    1,
    'fontWeight',
    T,
    M
  >;
  /** **Syntax**: `normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded` */
  readonly fontWidth: Carrier<'fontWidth', keyof (typeof keywordGroups)[83], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly forcedColorAdjust: Carrier<
    'forcedColorAdjust',
    keyof (typeof keywordGroups)[95],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gap: Carrier<'gap', keyof (typeof keywordGroups)[59], 'length', 2, 'spacing', T, M>;
  /** glyph-orientation-vertical */
  readonly glyphOrientationVertical: Carrier<
    'glyphOrientationVertical',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly grid: Carrier<'grid', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridArea: Carrier<'gridArea', keyof (typeof keywordGroups)[11], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly gridAutoColumns: Carrier<
    'gridAutoColumns',
    keyof (typeof keywordGroups)[96],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridAutoFlow: Carrier<
    'gridAutoFlow',
    keyof (typeof keywordGroups)[97],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly gridAutoRows: Carrier<
    'gridAutoRows',
    keyof (typeof keywordGroups)[96],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridColumn: Carrier<'gridColumn', keyof (typeof keywordGroups)[11], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridColumnEnd: Carrier<
    'gridColumnEnd',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly gridColumnGap: Carrier<
    'gridColumnGap',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridColumnStart: Carrier<
    'gridColumnStart',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridGap: Carrier<'gridGap', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRow: Carrier<'gridRow', keyof (typeof keywordGroups)[11], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRowEnd: Carrier<'gridRowEnd', keyof (typeof keywordGroups)[11], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRowGap: Carrier<
    'gridRowGap',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRowStart: Carrier<
    'gridRowStart',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplate: Carrier<
    'gridTemplate',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplateAreas: Carrier<
    'gridTemplateAreas',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplateColumns: Carrier<
    'gridTemplateColumns',
    keyof (typeof keywordGroups)[98],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplateRows: Carrier<
    'gridTemplateRows',
    keyof (typeof keywordGroups)[98],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly hangingPunctuation: Carrier<
    'hangingPunctuation',
    keyof (typeof keywordGroups)[99],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly height: Carrier<'height', keyof (typeof keywordGroups)[100], 'length', 1, 'size', T, M>;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly hyphenateCharacter: Carrier<
    'hyphenateCharacter',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly hyphenateLimitChars: Carrier<
    'hyphenateLimitChars',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly hyphens: Carrier<'hyphens', keyof (typeof keywordGroups)[101], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2020. */
  readonly imageOrientation: Carrier<
    'imageOrientation',
    keyof (typeof keywordGroups)[102],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly imageRendering: Carrier<
    'imageRendering',
    keyof (typeof keywordGroups)[103],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`image-resolution`** CSS property specifies the intrinsic resolution of all raster images used in or on the element. It affects content images such as replaced elements and generated content, and decorative images such as `background-image` images. */
  readonly imageResolution: Carrier<
    'imageResolution',
    keyof (typeof keywordGroups)[104],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `auto | normal | active | inactive | disabled` */
  readonly imeMode: Carrier<'imeMode', keyof (typeof keywordGroups)[105], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly initialLetter: Carrier<
    'initialLetter',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `[ auto | alphabetic | hanging | ideographic ]` */
  readonly initialLetterAlign: Carrier<
    'initialLetterAlign',
    keyof (typeof keywordGroups)[106],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly inlineSize: Carrier<
    'inlineSize',
    keyof (typeof keywordGroups)[107],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly inset: Carrier<'inset', keyof (typeof keywordGroups)[11], 'length', 4, 'spacing', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly insetArea: Carrier<'insetArea', keyof (typeof keywordGroups)[108], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetBlock: Carrier<
    'insetBlock',
    keyof (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetBlockEnd: Carrier<
    'insetBlockEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetBlockStart: Carrier<
    'insetBlockStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetInline: Carrier<
    'insetInline',
    keyof (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetInlineEnd: Carrier<
    'insetInlineEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetInlineStart: Carrier<
    'insetInlineStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly interpolateSize: Carrier<
    'interpolateSize',
    keyof (typeof keywordGroups)[109],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly isolation: Carrier<'isolation', keyof (typeof keywordGroups)[110], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly justifyContent: Carrier<
    'justifyContent',
    keyof (typeof keywordGroups)[111],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2016. */
  readonly justifyItems: Carrier<
    'justifyItems',
    keyof (typeof keywordGroups)[112],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly justifySelf: Carrier<
    'justifySelf',
    keyof (typeof keywordGroups)[113],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#` */
  readonly justifyTracks: Carrier<
    'justifyTracks',
    keyof (typeof keywordGroups)[111],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly KhtmlBoxAlign: Carrier<
    'KhtmlBoxAlign',
    keyof (typeof keywordGroups)[39],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly KhtmlBoxDirection: Carrier<
    'KhtmlBoxDirection',
    keyof (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly KhtmlBoxFlex: Carrier<
    'KhtmlBoxFlex',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group. */
  readonly KhtmlBoxFlexGroup: Carrier<
    'KhtmlBoxFlexGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes). */
  readonly KhtmlBoxLines: Carrier<
    'KhtmlBoxLines',
    keyof (typeof keywordGroups)[42],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly KhtmlBoxOrdinalGroup: Carrier<
    'KhtmlBoxOrdinalGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly KhtmlBoxOrient: Carrier<
    'KhtmlBoxOrient',
    keyof (typeof keywordGroups)[43],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly KhtmlBoxPack: Carrier<
    'KhtmlBoxPack',
    keyof (typeof keywordGroups)[44],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly KhtmlLineBreak: Carrier<
    'KhtmlLineBreak',
    keyof (typeof keywordGroups)[114],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly KhtmlOpacity: Carrier<
    'KhtmlOpacity',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly KhtmlUserSelect: Carrier<
    'KhtmlUserSelect',
    keyof (typeof keywordGroups)[115],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly left: Carrier<'left', keyof (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly letterSpacing: Carrier<
    'letterSpacing',
    keyof (typeof keywordGroups)[59],
    'length',
    1,
    'letterSpacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly lightingColor: Carrier<
    'lightingColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly lineBreak: Carrier<'lineBreak', keyof (typeof keywordGroups)[114], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly lineClamp: Carrier<'lineClamp', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly lineHeight: Carrier<
    'lineHeight',
    keyof (typeof keywordGroups)[59],
    'length',
    1,
    'lineHeight',
    T,
    M
  >;
  /** The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit. */
  readonly lineHeightStep: Carrier<
    'lineHeightStep',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStyle: Carrier<'listStyle', keyof (typeof keywordGroups)[116], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStyleImage: Carrier<
    'listStyleImage',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStylePosition: Carrier<
    'listStylePosition',
    keyof (typeof keywordGroups)[117],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStyleType: Carrier<
    'listStyleType',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly margin: Carrier<
    'margin',
    keyof (typeof keywordGroups)[11],
    'length',
    4,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly marginBlock: Carrier<
    'marginBlock',
    keyof (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginBlockEnd: Carrier<
    'marginBlockEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginBlockStart: Carrier<
    'marginBlockStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginBottom: Carrier<
    'marginBottom',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly marginInline: Carrier<
    'marginInline',
    keyof (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginInlineEnd: Carrier<
    'marginInlineEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginInlineStart: Carrier<
    'marginInlineStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginLeft: Carrier<
    'marginLeft',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginRight: Carrier<
    'marginRight',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginTop: Carrier<
    'marginTop',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly marginTrim: Carrier<'marginTrim', keyof (typeof keywordGroups)[118], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly marker: Carrier<'marker', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly markerEnd: Carrier<'markerEnd', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly markerMid: Carrier<'markerMid', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly markerStart: Carrier<'markerStart', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly mask: Carrier<'mask', keyof (typeof keywordGroups)[119], 'length', 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorder: Carrier<'maskBorder', keyof (typeof keywordGroups)[120], never, 1, '', T, M>;
  /** The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border. */
  readonly maskBorderMode: Carrier<
    'maskBorderMode',
    keyof (typeof keywordGroups)[121],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderOutset: Carrier<
    'maskBorderOutset',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderRepeat: Carrier<
    'maskBorderRepeat',
    keyof (typeof keywordGroups)[38],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderSlice: Carrier<
    'maskBorderSlice',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderSource: Carrier<
    'maskBorderSource',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderWidth: Carrier<
    'maskBorderWidth',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskClip: Carrier<'maskClip', keyof (typeof keywordGroups)[122], never, 1, '', T, M>;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskComposite: Carrier<
    'maskComposite',
    keyof (typeof keywordGroups)[123],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskImage: Carrier<'maskImage', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskMode: Carrier<'maskMode', keyof (typeof keywordGroups)[124], never, 1, '', T, M>;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskOrigin: Carrier<'maskOrigin', keyof (typeof keywordGroups)[125], never, 1, '', T, M>;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskPosition: Carrier<
    'maskPosition',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskRepeat: Carrier<'maskRepeat', keyof (typeof keywordGroups)[29], never, 1, '', T, M>;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskSize: Carrier<'maskSize', keyof (typeof keywordGroups)[30], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly maskType: Carrier<'maskType', keyof (typeof keywordGroups)[121], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly masonryAutoFlow: Carrier<
    'masonryAutoFlow',
    keyof (typeof keywordGroups)[126],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly mathDepth: Carrier<'mathDepth', keyof (typeof keywordGroups)[127], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly mathShift: Carrier<'mathShift', keyof (typeof keywordGroups)[128], never, 1, '', T, M>;
  /** Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly mathStyle: Carrier<'mathStyle', keyof (typeof keywordGroups)[128], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly maxBlockSize: Carrier<
    'maxBlockSize',
    keyof (typeof keywordGroups)[129],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly maxHeight: Carrier<
    'maxHeight',
    keyof (typeof keywordGroups)[130],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly maxInlineSize: Carrier<
    'maxInlineSize',
    keyof (typeof keywordGroups)[131],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** **Syntax**: `none | <integer>` */
  readonly maxLines: Carrier<'maxLines', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly maxWidth: Carrier<
    'maxWidth',
    keyof (typeof keywordGroups)[130],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly minBlockSize: Carrier<
    'minBlockSize',
    keyof (typeof keywordGroups)[132],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly minHeight: Carrier<
    'minHeight',
    keyof (typeof keywordGroups)[133],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly minInlineSize: Carrier<
    'minInlineSize',
    keyof (typeof keywordGroups)[107],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly minWidth: Carrier<
    'minWidth',
    keyof (typeof keywordGroups)[134],
    'length',
    1,
    'size',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly mixBlendMode: Carrier<
    'mixBlendMode',
    keyof (typeof keywordGroups)[135],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly motion: Carrier<'motion', keyof (typeof keywordGroups)[136], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly motionDistance: Carrier<
    'motionDistance',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly motionPath: Carrier<'motionPath', keyof (typeof keywordGroups)[137], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly motionRotation: Carrier<
    'motionRotation',
    keyof (typeof keywordGroups)[138],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimation: Carrier<
    'MozAnimation',
    keyof (typeof keywordGroups)[8],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationDelay: Carrier<
    'MozAnimationDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationDirection: Carrier<
    'MozAnimationDirection',
    keyof (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationDuration: Carrier<
    'MozAnimationDuration',
    keyof (typeof keywordGroups)[11],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationFillMode: Carrier<
    'MozAnimationFillMode',
    keyof (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationIterationCount: Carrier<
    'MozAnimationIterationCount',
    keyof (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationName: Carrier<
    'MozAnimationName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationPlayState: Carrier<
    'MozAnimationPlayState',
    keyof (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationTimingFunction: Carrier<
    'MozAnimationTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly MozAppearance: Carrier<
    'MozAppearance',
    keyof (typeof keywordGroups)[139],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly MozBackfaceVisibility: Carrier<
    'MozBackfaceVisibility',
    keyof (typeof keywordGroups)[19],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBackgroundClip: Carrier<
    'MozBackgroundClip',
    keyof (typeof keywordGroups)[23],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBackgroundOrigin: Carrier<
    'MozBackgroundOrigin',
    keyof (typeof keywordGroups)[25],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBackgroundSize: Carrier<
    'MozBackgroundSize',
    keyof (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<url> | none` */
  readonly MozBinding: Carrier<'MozBinding', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderBottomColors: Carrier<
    'MozBorderBottomColors',
    keyof (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderEndColor: Carrier<
    'MozBorderEndColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderEndStyle: Carrier<
    'MozBorderEndStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderEndWidth: Carrier<
    'MozBorderEndWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderImage: Carrier<
    'MozBorderImage',
    keyof (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderLeftColors: Carrier<
    'MozBorderLeftColors',
    keyof (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadius: Carrier<
    'MozBorderRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusBottomleft: Carrier<
    'MozBorderRadiusBottomleft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusBottomright: Carrier<
    'MozBorderRadiusBottomright',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusTopleft: Carrier<
    'MozBorderRadiusTopleft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusTopright: Carrier<
    'MozBorderRadiusTopright',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderRightColors: Carrier<
    'MozBorderRightColors',
    keyof (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderStartColor: Carrier<
    'MozBorderStartColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderStartStyle: Carrier<
    'MozBorderStartStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderTopColors: Carrier<
    'MozBorderTopColors',
    keyof (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly MozBoxAlign: Carrier<
    'MozBoxAlign',
    keyof (typeof keywordGroups)[39],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly MozBoxDirection: Carrier<
    'MozBoxDirection',
    keyof (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly MozBoxFlex: Carrier<'MozBoxFlex', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly MozBoxOrdinalGroup: Carrier<
    'MozBoxOrdinalGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly MozBoxOrient: Carrier<
    'MozBoxOrient',
    keyof (typeof keywordGroups)[43],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly MozBoxPack: Carrier<'MozBoxPack', keyof (typeof keywordGroups)[44], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBoxShadow: Carrier<
    'MozBoxShadow',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBoxSizing: Carrier<
    'MozBoxSizing',
    keyof (typeof keywordGroups)[45],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnCount: Carrier<
    'MozColumnCount',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnFill: Carrier<
    'MozColumnFill',
    keyof (typeof keywordGroups)[58],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRule: Carrier<
    'MozColumnRule',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRuleColor: Carrier<
    'MozColumnRuleColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRuleStyle: Carrier<
    'MozColumnRuleStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRuleWidth: Carrier<
    'MozColumnRuleWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumns: Carrier<
    'MozColumns',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016. */
  readonly MozColumnWidth: Carrier<
    'MozColumnWidth',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | [ fill | fill-opacity | stroke | stroke-opacity ]#` */
  readonly MozContextProperties: Carrier<
    'MozContextProperties',
    keyof (typeof keywordGroups)[141],
    never,
    1,
    '',
    T,
    M
  >;
  /** The non-standard **`-moz-float-edge`** CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness. */
  readonly MozFloatEdge: Carrier<
    'MozFloatEdge',
    keyof (typeof keywordGroups)[142],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly MozFontFeatureSettings: Carrier<
    'MozFontFeatureSettings',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly MozFontLanguageOverride: Carrier<
    'MozFontLanguageOverride',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-force-broken-image-icon`** extended CSS property can be used to force the broken image icon to be shown even when a broken image has an `alt` attribute. */
  readonly MozForceBrokenImageIcon: Carrier<
    'MozForceBrokenImageIcon',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly MozHyphens: Carrier<'MozHyphens', keyof (typeof keywordGroups)[101], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozMarginEnd: Carrier<
    'MozMarginEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozMarginStart: Carrier<
    'MozMarginStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOpacity: Carrier<'MozOpacity', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** The **`-moz-orient`** CSS property specifies the orientation of the element to which it's applied. */
  readonly MozOrient: Carrier<'MozOrient', keyof (typeof keywordGroups)[143], never, 1, '', T, M>;
  /** The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered. */
  readonly MozOsxFontSmoothing: Carrier<
    'MozOsxFontSmoothing',
    keyof (typeof keywordGroups)[82],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly MozOutline: Carrier<
    'MozOutline',
    keyof (typeof keywordGroups)[144],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOutlineColor: Carrier<
    'MozOutlineColor',
    keyof (typeof keywordGroups)[0],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?` */
  readonly MozOutlineRadius: Carrier<
    'MozOutlineRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusBottomleft: Carrier<
    'MozOutlineRadiusBottomleft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusBottomright: Carrier<
    'MozOutlineRadiusBottomright',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusTopleft: Carrier<
    'MozOutlineRadiusTopleft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusTopright: Carrier<
    'MozOutlineRadiusTopright',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOutlineStyle: Carrier<
    'MozOutlineStyle',
    keyof (typeof keywordGroups)[145],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOutlineWidth: Carrier<
    'MozOutlineWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozPaddingEnd: Carrier<
    'MozPaddingEnd',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozPaddingStart: Carrier<
    'MozPaddingStart',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozPerspective: Carrier<
    'MozPerspective',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozPerspectiveOrigin: Carrier<
    'MozPerspectiveOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `ignore | stretch-to-fit` */
  readonly MozStackSizing: Carrier<
    'MozStackSizing',
    keyof (typeof keywordGroups)[146],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021. */
  readonly MozTabSize: Carrier<
    'MozTabSize',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly MozTextAlignLast: Carrier<
    'MozTextAlignLast',
    keyof (typeof keywordGroups)[147],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | blink` */
  readonly MozTextBlink: Carrier<
    'MozTextBlink',
    keyof (typeof keywordGroups)[148],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozTextDecorationColor: Carrier<
    'MozTextDecorationColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozTextDecorationLine: Carrier<
    'MozTextDecorationLine',
    keyof (typeof keywordGroups)[149],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozTextDecorationStyle: Carrier<
    'MozTextDecorationStyle',
    keyof (typeof keywordGroups)[150],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly MozTextSizeAdjust: Carrier<
    'MozTextSizeAdjust',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransform: Carrier<
    'MozTransform',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransformOrigin: Carrier<
    'MozTransformOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransformStyle: Carrier<
    'MozTransformStyle',
    keyof (typeof keywordGroups)[151],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransition: Carrier<
    'MozTransition',
    keyof (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionDelay: Carrier<
    'MozTransitionDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionDuration: Carrier<
    'MozTransitionDuration',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionProperty: Carrier<
    'MozTransitionProperty',
    keyof (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionTimingFunction: Carrier<
    'MozTransitionTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-user-focus`** CSS property is used to indicate whether an element can have the focus. */
  readonly MozUserFocus: Carrier<
    'MozUserFocus',
    keyof (typeof keywordGroups)[153],
    never,
    1,
    '',
    T,
    M
  >;
  /** In Mozilla applications, **`-moz-user-input`** determines if an element will accept user input. */
  readonly MozUserInput: Carrier<
    'MozUserInput',
    keyof (typeof keywordGroups)[154],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`user-modify`** property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user. */
  readonly MozUserModify: Carrier<
    'MozUserModify',
    keyof (typeof keywordGroups)[155],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly MozUserSelect: Carrier<
    'MozUserSelect',
    keyof (typeof keywordGroups)[115],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `drag | no-drag` */
  readonly MozWindowDragging: Carrier<
    'MozWindowDragging',
    keyof (typeof keywordGroups)[156],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `default | menu | tooltip | sheet | none` */
  readonly MozWindowShadow: Carrier<
    'MozWindowShadow',
    keyof (typeof keywordGroups)[157],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `false | true` */
  readonly msAccelerator: Carrier<
    'msAccelerator',
    keyof (typeof keywordGroups)[158],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `tb | rl | bt | lr` */
  readonly msBlockProgression: Carrier<
    'msBlockProgression',
    keyof (typeof keywordGroups)[159],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | chained` */
  readonly msContentZoomChaining: Carrier<
    'msContentZoomChaining',
    keyof (typeof keywordGroups)[160],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | zoom` */
  readonly msContentZooming: Carrier<
    'msContentZooming',
    keyof (typeof keywordGroups)[161],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>` */
  readonly msContentZoomLimit: Carrier<
    'msContentZoomLimit',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<percentage>` */
  readonly msContentZoomLimitMax: Carrier<
    'msContentZoomLimitMax',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<percentage>` */
  readonly msContentZoomLimitMin: Carrier<
    'msContentZoomLimitMin',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>` */
  readonly msContentZoomSnap: Carrier<
    'msContentZoomSnap',
    keyof (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )` */
  readonly msContentZoomSnapPoints: Carrier<
    'msContentZoomSnapPoints',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | proximity | mandatory` */
  readonly msContentZoomSnapType: Carrier<
    'msContentZoomSnapType',
    keyof (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<string>` */
  readonly msFilter: Carrier<'msFilter', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msFlex: Carrier<'msFlex', keyof (typeof keywordGroups)[71], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msFlexDirection: Carrier<
    'msFlexDirection',
    keyof (typeof keywordGroups)[73],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msFlexPositive: Carrier<
    'msFlexPositive',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `[ none | <custom-ident> ]#` */
  readonly msFlowFrom: Carrier<'msFlowFrom', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** **Syntax**: `[ none | <custom-ident> ]#` */
  readonly msFlowInto: Carrier<'msFlowInto', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** **Syntax**: `none | <track-list> | <auto-track-list>` */
  readonly msGridColumns: Carrier<
    'msGridColumns',
    keyof (typeof keywordGroups)[163],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | <track-list> | <auto-track-list>` */
  readonly msGridRows: Carrier<
    'msGridRows',
    keyof (typeof keywordGroups)[163],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `auto | none` */
  readonly msHighContrastAdjust: Carrier<
    'msHighContrastAdjust',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `auto | <integer>{1,3}` */
  readonly msHyphenateLimitChars: Carrier<
    'msHyphenateLimitChars',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `no-limit | <integer>` */
  readonly msHyphenateLimitLines: Carrier<
    'msHyphenateLimitLines',
    keyof (typeof keywordGroups)[164],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<percentage> | <length>` */
  readonly msHyphenateLimitZone: Carrier<
    'msHyphenateLimitZone',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly msHyphens: Carrier<'msHyphens', keyof (typeof keywordGroups)[101], never, 1, '', T, M>;
  /** **Syntax**: `auto | after` */
  readonly msImeAlign: Carrier<'msImeAlign', keyof (typeof keywordGroups)[165], never, 1, '', T, M>;
  /** **Syntax**: `auto | normal | active | inactive | disabled` */
  readonly msImeMode: Carrier<'msImeMode', keyof (typeof keywordGroups)[105], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly msLineBreak: Carrier<
    'msLineBreak',
    keyof (typeof keywordGroups)[114],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msOrder: Carrier<'msOrder', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** **Syntax**: `auto | none | scrollbar | -ms-autohiding-scrollbar` */
  readonly msOverflowStyle: Carrier<
    'msOverflowStyle',
    keyof (typeof keywordGroups)[166],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msOverflowX: Carrier<
    'msOverflowX',
    keyof (typeof keywordGroups)[167],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msOverflowY: Carrier<
    'msOverflowY',
    keyof (typeof keywordGroups)[167],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbar3dlightColor: Carrier<
    'msScrollbar3dlightColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarArrowColor: Carrier<
    'msScrollbarArrowColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarBaseColor: Carrier<
    'msScrollbarBaseColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarDarkshadowColor: Carrier<
    'msScrollbarDarkshadowColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarFaceColor: Carrier<
    'msScrollbarFaceColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarHighlightColor: Carrier<
    'msScrollbarHighlightColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarShadowColor: Carrier<
    'msScrollbarShadowColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarTrackColor: Carrier<
    'msScrollbarTrackColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `chained | none` */
  readonly msScrollChaining: Carrier<
    'msScrollChaining',
    keyof (typeof keywordGroups)[160],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>` */
  readonly msScrollLimit: Carrier<
    'msScrollLimit',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `auto | <length>` */
  readonly msScrollLimitXMax: Carrier<
    'msScrollLimitXMax',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<length>` */
  readonly msScrollLimitXMin: Carrier<
    'msScrollLimitXMin',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `auto | <length>` */
  readonly msScrollLimitYMax: Carrier<
    'msScrollLimitYMax',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<length>` */
  readonly msScrollLimitYMin: Carrier<
    'msScrollLimitYMin',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | railed` */
  readonly msScrollRails: Carrier<
    'msScrollRails',
    keyof (typeof keywordGroups)[168],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )` */
  readonly msScrollSnapPointsX: Carrier<
    'msScrollSnapPointsX',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )` */
  readonly msScrollSnapPointsY: Carrier<
    'msScrollSnapPointsY',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | proximity | mandatory` */
  readonly msScrollSnapType: Carrier<
    'msScrollSnapType',
    keyof (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>` */
  readonly msScrollSnapX: Carrier<
    'msScrollSnapX',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>` */
  readonly msScrollSnapY: Carrier<
    'msScrollSnapY',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | vertical-to-horizontal` */
  readonly msScrollTranslation: Carrier<
    'msScrollTranslation',
    keyof (typeof keywordGroups)[169],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space` */
  readonly msTextAutospace: Carrier<
    'msTextAutospace',
    keyof (typeof keywordGroups)[170],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly msTextCombineHorizontal: Carrier<
    'msTextCombineHorizontal',
    keyof (typeof keywordGroups)[171],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msTextOverflow: Carrier<
    'msTextOverflow',
    keyof (typeof keywordGroups)[172],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019. */
  readonly msTouchAction: Carrier<
    'msTouchAction',
    keyof (typeof keywordGroups)[173],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `grippers | none` */
  readonly msTouchSelect: Carrier<
    'msTouchSelect',
    keyof (typeof keywordGroups)[174],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransform: Carrier<'msTransform', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransformOrigin: Carrier<
    'msTransformOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransition: Carrier<
    'msTransition',
    keyof (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionDelay: Carrier<
    'msTransitionDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionDuration: Carrier<
    'msTransitionDuration',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionProperty: Carrier<
    'msTransitionProperty',
    keyof (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionTimingFunction: Carrier<
    'msTransitionTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | element | text` */
  readonly msUserSelect: Carrier<
    'msUserSelect',
    keyof (typeof keywordGroups)[175],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msWordBreak: Carrier<
    'msWordBreak',
    keyof (typeof keywordGroups)[176],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `auto | both | start | end | maximum | clear` */
  readonly msWrapFlow: Carrier<'msWrapFlow', keyof (typeof keywordGroups)[177], never, 1, '', T, M>;
  /** **Syntax**: `<length>` */
  readonly msWrapMargin: Carrier<
    'msWrapMargin',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `wrap | none` */
  readonly msWrapThrough: Carrier<
    'msWrapThrough',
    keyof (typeof keywordGroups)[178],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly msWritingMode: Carrier<
    'msWritingMode',
    keyof (typeof keywordGroups)[179],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimation: Carrier<'OAnimation', keyof (typeof keywordGroups)[8], 'time', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationDelay: Carrier<
    'OAnimationDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationDirection: Carrier<
    'OAnimationDirection',
    keyof (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationDuration: Carrier<
    'OAnimationDuration',
    keyof (typeof keywordGroups)[11],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationFillMode: Carrier<
    'OAnimationFillMode',
    keyof (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationIterationCount: Carrier<
    'OAnimationIterationCount',
    keyof (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationName: Carrier<
    'OAnimationName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationPlayState: Carrier<
    'OAnimationPlayState',
    keyof (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationTimingFunction: Carrier<
    'OAnimationTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly OBackgroundSize: Carrier<
    'OBackgroundSize',
    keyof (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly objectFit: Carrier<'objectFit', keyof (typeof keywordGroups)[180], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly objectPosition: Carrier<
    'objectPosition',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | <basic-shape-rect>` */
  readonly objectViewBox: Carrier<
    'objectViewBox',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly OBorderImage: Carrier<
    'OBorderImage',
    keyof (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offset: Carrier<'offset', keyof (typeof keywordGroups)[136], 'length', 1, '', T, M>;
  /** Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly offsetAnchor: Carrier<
    'offsetAnchor',
    keyof (typeof keywordGroups)[181],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetBlock: Carrier<
    'offsetBlock',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetBlockEnd: Carrier<
    'offsetBlockEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetBlockStart: Carrier<
    'offsetBlockStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offsetDistance: Carrier<
    'offsetDistance',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetInline: Carrier<
    'offsetInline',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetInlineEnd: Carrier<
    'offsetInlineEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetInlineStart: Carrier<
    'offsetInlineStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly offsetPath: Carrier<'offsetPath', keyof (typeof keywordGroups)[137], never, 1, '', T, M>;
  /** Since January 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly offsetPosition: Carrier<
    'offsetPosition',
    keyof (typeof keywordGroups)[182],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offsetRotate: Carrier<
    'offsetRotate',
    keyof (typeof keywordGroups)[138],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offsetRotation: Carrier<
    'offsetRotation',
    keyof (typeof keywordGroups)[138],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly OObjectFit: Carrier<'OObjectFit', keyof (typeof keywordGroups)[180], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly OObjectPosition: Carrier<
    'OObjectPosition',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly opacity: Carrier<'opacity', keyof (typeof keywordGroups)[5], never, 1, 'opacity', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly order: Carrier<'order', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly orphans: Carrier<'orphans', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021. */
  readonly OTabSize: Carrier<'OTabSize', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly OTextOverflow: Carrier<
    'OTextOverflow',
    keyof (typeof keywordGroups)[172],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransform: Carrier<'OTransform', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransformOrigin: Carrier<
    'OTransformOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransition: Carrier<
    'OTransition',
    keyof (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionDelay: Carrier<
    'OTransitionDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionDuration: Carrier<
    'OTransitionDuration',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionProperty: Carrier<
    'OTransitionProperty',
    keyof (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionTimingFunction: Carrier<
    'OTransitionTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly outline: Carrier<'outline', keyof (typeof keywordGroups)[144], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly outlineColor: Carrier<
    'outlineColor',
    keyof (typeof keywordGroups)[0],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly outlineOffset: Carrier<
    'outlineOffset',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly outlineStyle: Carrier<
    'outlineStyle',
    keyof (typeof keywordGroups)[145],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly outlineWidth: Carrier<
    'outlineWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly overflow: Carrier<'overflow', keyof (typeof keywordGroups)[167], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly overflowAnchor: Carrier<
    'overflowAnchor',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly overflowBlock: Carrier<
    'overflowBlock',
    keyof (typeof keywordGroups)[183],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `padding-box | content-box` */
  readonly overflowClipBox: Carrier<
    'overflowClipBox',
    keyof (typeof keywordGroups)[184],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly overflowClipMargin: Carrier<
    'overflowClipMargin',
    keyof (typeof keywordGroups)[25],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly overflowInline: Carrier<
    'overflowInline',
    keyof (typeof keywordGroups)[183],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018. */
  readonly overflowWrap: Carrier<
    'overflowWrap',
    keyof (typeof keywordGroups)[185],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly overflowX: Carrier<'overflowX', keyof (typeof keywordGroups)[167], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly overflowY: Carrier<'overflowY', keyof (typeof keywordGroups)[167], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly overlay: Carrier<'overlay', keyof (typeof keywordGroups)[16], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehavior: Carrier<
    'overscrollBehavior',
    keyof (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorBlock: Carrier<
    'overscrollBehaviorBlock',
    keyof (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorInline: Carrier<
    'overscrollBehaviorInline',
    keyof (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorX: Carrier<
    'overscrollBehaviorX',
    keyof (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorY: Carrier<
    'overscrollBehaviorY',
    keyof (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly padding: Carrier<
    'padding',
    keyof (typeof keywordGroups)[5],
    'length',
    4,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly paddingBlock: Carrier<
    'paddingBlock',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingBlockEnd: Carrier<
    'paddingBlockEnd',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingBlockStart: Carrier<
    'paddingBlockStart',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingBottom: Carrier<
    'paddingBottom',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly paddingInline: Carrier<
    'paddingInline',
    keyof (typeof keywordGroups)[5],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingInlineEnd: Carrier<
    'paddingInlineEnd',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingInlineStart: Carrier<
    'paddingInlineStart',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingLeft: Carrier<
    'paddingLeft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingRight: Carrier<
    'paddingRight',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingTop: Carrier<
    'paddingTop',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly page: Carrier<'page', keyof (typeof keywordGroups)[11], never, 1, '', T, M>;
  /** The **`page-break-after`** CSS property adjusts page breaks _after_ the current element. */
  readonly pageBreakAfter: Carrier<
    'pageBreakAfter',
    keyof (typeof keywordGroups)[187],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`page-break-before`** CSS property adjusts page breaks _before_ the current element. */
  readonly pageBreakBefore: Carrier<
    'pageBreakBefore',
    keyof (typeof keywordGroups)[187],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`page-break-inside`** CSS property adjusts page breaks _inside_ the current element. */
  readonly pageBreakInside: Carrier<
    'pageBreakInside',
    keyof (typeof keywordGroups)[188],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly paintOrder: Carrier<'paintOrder', keyof (typeof keywordGroups)[189], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly perspective: Carrier<
    'perspective',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly perspectiveOrigin: Carrier<
    'perspectiveOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly placeContent: Carrier<
    'placeContent',
    keyof (typeof keywordGroups)[1],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly placeItems: Carrier<'placeItems', keyof (typeof keywordGroups)[2], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly placeSelf: Carrier<'placeSelf', keyof (typeof keywordGroups)[4], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly pointerEvents: Carrier<
    'pointerEvents',
    keyof (typeof keywordGroups)[190],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly position: Carrier<'position', keyof (typeof keywordGroups)[191], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionAnchor: Carrier<
    'positionAnchor',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionArea: Carrier<
    'positionArea',
    keyof (typeof keywordGroups)[108],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTry: Carrier<
    'positionTry',
    keyof (typeof keywordGroups)[192],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTryFallbacks: Carrier<
    'positionTryFallbacks',
    keyof (typeof keywordGroups)[192],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTryOptions: Carrier<
    'positionTryOptions',
    keyof (typeof keywordGroups)[192],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTryOrder: Carrier<
    'positionTryOrder',
    keyof (typeof keywordGroups)[193],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionVisibility: Carrier<
    'positionVisibility',
    keyof (typeof keywordGroups)[194],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly printColorAdjust: Carrier<
    'printColorAdjust',
    keyof (typeof keywordGroups)[54],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly quotes: Carrier<'quotes', keyof (typeof keywordGroups)[16], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly r: Carrier<'r', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly resize: Carrier<'resize', keyof (typeof keywordGroups)[195], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly right: Carrier<'right', keyof (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022. */
  readonly rotate: Carrier<'rotate', keyof (typeof keywordGroups)[6], 'angle', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly rowGap: Carrier<
    'rowGap',
    keyof (typeof keywordGroups)[59],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly rubyAlign: Carrier<'rubyAlign', keyof (typeof keywordGroups)[196], never, 1, '', T, M>;
  /** **Syntax**: `separate | collapse | auto` */
  readonly rubyMerge: Carrier<'rubyMerge', keyof (typeof keywordGroups)[197], never, 1, '', T, M>;
  /** **Syntax**: `auto | none` */
  readonly rubyOverhang: Carrier<
    'rubyOverhang',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly rubyPosition: Carrier<
    'rubyPosition',
    keyof (typeof keywordGroups)[198],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly rx: Carrier<'rx', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly ry: Carrier<'ry', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022. */
  readonly scale: Carrier<'scale', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollbarColor: Carrier<
    'scrollbarColor',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly scrollbarGutter: Carrier<
    'scrollbarGutter',
    keyof (typeof keywordGroups)[199],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly scrollbarWidth: Carrier<
    'scrollbarWidth',
    keyof (typeof keywordGroups)[200],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly scrollBehavior: Carrier<
    'scrollBehavior',
    keyof (typeof keywordGroups)[201],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | nearest` */
  readonly scrollInitialTarget: Carrier<
    'scrollInitialTarget',
    keyof (typeof keywordGroups)[202],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021. */
  readonly scrollMargin: Carrier<
    'scrollMargin',
    keyof (typeof keywordGroups)[5],
    'length',
    4,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginBlock: Carrier<
    'scrollMarginBlock',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginBlockEnd: Carrier<
    'scrollMarginBlockEnd',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginBlockStart: Carrier<
    'scrollMarginBlockStart',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginBottom: Carrier<
    'scrollMarginBottom',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginInline: Carrier<
    'scrollMarginInline',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginInlineEnd: Carrier<
    'scrollMarginInlineEnd',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginInlineStart: Carrier<
    'scrollMarginInlineStart',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginLeft: Carrier<
    'scrollMarginLeft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginRight: Carrier<
    'scrollMarginRight',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginTop: Carrier<
    'scrollMarginTop',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPadding: Carrier<
    'scrollPadding',
    keyof (typeof keywordGroups)[11],
    'length',
    4,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingBlock: Carrier<
    'scrollPaddingBlock',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingBlockEnd: Carrier<
    'scrollPaddingBlockEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingBlockStart: Carrier<
    'scrollPaddingBlockStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingBottom: Carrier<
    'scrollPaddingBottom',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingInline: Carrier<
    'scrollPaddingInline',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingInlineEnd: Carrier<
    'scrollPaddingInlineEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingInlineStart: Carrier<
    'scrollPaddingInlineStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingLeft: Carrier<
    'scrollPaddingLeft',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingRight: Carrier<
    'scrollPaddingRight',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingTop: Carrier<
    'scrollPaddingTop',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly scrollSnapAlign: Carrier<
    'scrollSnapAlign',
    keyof (typeof keywordGroups)[203],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | <position>#` */
  readonly scrollSnapCoordinate: Carrier<
    'scrollSnapCoordinate',
    keyof (typeof keywordGroups)[204],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<position>` */
  readonly scrollSnapDestination: Carrier<
    'scrollSnapDestination',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021. */
  readonly scrollSnapMargin: Carrier<
    'scrollSnapMargin',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginBottom: Carrier<
    'scrollSnapMarginBottom',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginLeft: Carrier<
    'scrollSnapMarginLeft',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginRight: Carrier<
    'scrollSnapMarginRight',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginTop: Carrier<
    'scrollSnapMarginTop',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | repeat( <length-percentage> )` */
  readonly scrollSnapPointsX: Carrier<
    'scrollSnapPointsX',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | repeat( <length-percentage> )` */
  readonly scrollSnapPointsY: Carrier<
    'scrollSnapPointsY',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2022. */
  readonly scrollSnapStop: Carrier<
    'scrollSnapStop',
    keyof (typeof keywordGroups)[205],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022. */
  readonly scrollSnapType: Carrier<
    'scrollSnapType',
    keyof (typeof keywordGroups)[206],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | mandatory | proximity` */
  readonly scrollSnapTypeX: Carrier<
    'scrollSnapTypeX',
    keyof (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | mandatory | proximity` */
  readonly scrollSnapTypeY: Carrier<
    'scrollSnapTypeY',
    keyof (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollTimeline: Carrier<
    'scrollTimeline',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollTimelineAxis: Carrier<
    'scrollTimelineAxis',
    keyof (typeof keywordGroups)[207],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollTimelineName: Carrier<
    'scrollTimelineName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeImageThreshold: Carrier<
    'shapeImageThreshold',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeMargin: Carrier<
    'shapeMargin',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeOutside: Carrier<
    'shapeOutside',
    keyof (typeof keywordGroups)[208],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeRendering: Carrier<
    'shapeRendering',
    keyof (typeof keywordGroups)[209],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `normal | spell-out || digits || [ literal-punctuation | no-punctuation ]` */
  readonly speakAs: Carrier<'speakAs', keyof (typeof keywordGroups)[210], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly stopColor: Carrier<
    'stopColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly stopOpacity: Carrier<'stopOpacity', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly stroke: Carrier<'stroke', keyof (typeof keywordGroups)[70], never, 1, 'color', T, M>;
  /** **Syntax**: `<color>` */
  readonly strokeColor: Carrier<
    'strokeColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeDasharray: Carrier<
    'strokeDasharray',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeDashoffset: Carrier<
    'strokeDashoffset',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeLinecap: Carrier<
    'strokeLinecap',
    keyof (typeof keywordGroups)[211],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeLinejoin: Carrier<
    'strokeLinejoin',
    keyof (typeof keywordGroups)[212],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeMiterlimit: Carrier<
    'strokeMiterlimit',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeOpacity: Carrier<
    'strokeOpacity',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeWidth: Carrier<
    'strokeWidth',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly tableLayout: Carrier<
    'tableLayout',
    keyof (typeof keywordGroups)[213],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021. */
  readonly tabSize: Carrier<'tabSize', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textAlign: Carrier<'textAlign', keyof (typeof keywordGroups)[214], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly textAlignLast: Carrier<
    'textAlignLast',
    keyof (typeof keywordGroups)[147],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2016. */
  readonly textAnchor: Carrier<'textAnchor', keyof (typeof keywordGroups)[215], never, 1, '', T, M>;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textAutospace: Carrier<
    'textAutospace',
    keyof (typeof keywordGroups)[216],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `normal | <'text-box-trim'> || <'text-box-edge'>` */
  readonly textBox: Carrier<'textBox', keyof (typeof keywordGroups)[217], never, 1, '', T, M>;
  /** **Syntax**: `auto | <text-edge>` */
  readonly textBoxEdge: Carrier<
    'textBoxEdge',
    keyof (typeof keywordGroups)[218],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | trim-start | trim-end | trim-both` */
  readonly textBoxTrim: Carrier<
    'textBoxTrim',
    keyof (typeof keywordGroups)[219],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textCombineUpright: Carrier<
    'textCombineUpright',
    keyof (typeof keywordGroups)[171],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textDecoration: Carrier<
    'textDecoration',
    keyof (typeof keywordGroups)[220],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textDecorationColor: Carrier<
    'textDecorationColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textDecorationLine: Carrier<
    'textDecorationLine',
    keyof (typeof keywordGroups)[149],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textDecorationSkip: Carrier<
    'textDecorationSkip',
    keyof (typeof keywordGroups)[221],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textDecorationSkipInk: Carrier<
    'textDecorationSkipInk',
    keyof (typeof keywordGroups)[222],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textDecorationStyle: Carrier<
    'textDecorationStyle',
    keyof (typeof keywordGroups)[150],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2021. */
  readonly textDecorationThickness: Carrier<
    'textDecorationThickness',
    keyof (typeof keywordGroups)[223],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasis: Carrier<
    'textEmphasis',
    keyof (typeof keywordGroups)[224],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasisColor: Carrier<
    'textEmphasisColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasisPosition: Carrier<
    'textEmphasisPosition',
    keyof (typeof keywordGroups)[225],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasisStyle: Carrier<
    'textEmphasisStyle',
    keyof (typeof keywordGroups)[226],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textIndent: Carrier<
    'textIndent',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textJustify: Carrier<
    'textJustify',
    keyof (typeof keywordGroups)[227],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020. */
  readonly textOrientation: Carrier<
    'textOrientation',
    keyof (typeof keywordGroups)[228],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textOverflow: Carrier<
    'textOverflow',
    keyof (typeof keywordGroups)[172],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textRendering: Carrier<
    'textRendering',
    keyof (typeof keywordGroups)[229],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textShadow: Carrier<
    'textShadow',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    'shadow',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textSizeAdjust: Carrier<
    'textSizeAdjust',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textSpacingTrim: Carrier<
    'textSpacingTrim',
    keyof (typeof keywordGroups)[230],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textTransform: Carrier<
    'textTransform',
    keyof (typeof keywordGroups)[231],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2020. */
  readonly textUnderlineOffset: Carrier<
    'textUnderlineOffset',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly textUnderlinePosition: Carrier<
    'textUnderlinePosition',
    keyof (typeof keywordGroups)[232],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly textWrap: Carrier<'textWrap', keyof (typeof keywordGroups)[233], never, 1, '', T, M>;
  /** Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly textWrapMode: Carrier<
    'textWrapMode',
    keyof (typeof keywordGroups)[234],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly textWrapStyle: Carrier<
    'textWrapStyle',
    keyof (typeof keywordGroups)[235],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly timelineScope: Carrier<
    'timelineScope',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly top: Carrier<'top', keyof (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019. */
  readonly touchAction: Carrier<
    'touchAction',
    keyof (typeof keywordGroups)[173],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transform: Carrier<'transform', keyof (typeof keywordGroups)[6], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly transformBox: Carrier<
    'transformBox',
    keyof (typeof keywordGroups)[236],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transformOrigin: Carrier<
    'transformOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transformStyle: Carrier<
    'transformStyle',
    keyof (typeof keywordGroups)[151],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transition: Carrier<
    'transition',
    keyof (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /** Since August 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly transitionBehavior: Carrier<
    'transitionBehavior',
    keyof (typeof keywordGroups)[237],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionDelay: Carrier<
    'transitionDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionDuration: Carrier<
    'transitionDuration',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionProperty: Carrier<
    'transitionProperty',
    keyof (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionTimingFunction: Carrier<
    'transitionTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    'easing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022. */
  readonly translate: Carrier<'translate', keyof (typeof keywordGroups)[6], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly unicodeBidi: Carrier<
    'unicodeBidi',
    keyof (typeof keywordGroups)[238],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly userSelect: Carrier<'userSelect', keyof (typeof keywordGroups)[115], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly vectorEffect: Carrier<
    'vectorEffect',
    keyof (typeof keywordGroups)[239],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly verticalAlign: Carrier<
    'verticalAlign',
    keyof (typeof keywordGroups)[240],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimeline: Carrier<
    'viewTimeline',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimelineAxis: Carrier<
    'viewTimelineAxis',
    keyof (typeof keywordGroups)[207],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimelineInset: Carrier<
    'viewTimelineInset',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimelineName: Carrier<
    'viewTimelineName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `none | <custom-ident>+` */
  readonly viewTransitionClass: Carrier<
    'viewTransitionClass',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since October 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly viewTransitionName: Carrier<
    'viewTransitionName',
    keyof (typeof keywordGroups)[241],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly visibility: Carrier<'visibility', keyof (typeof keywordGroups)[242], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAlignContent: Carrier<
    'WebkitAlignContent',
    keyof (typeof keywordGroups)[1],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAlignItems: Carrier<
    'WebkitAlignItems',
    keyof (typeof keywordGroups)[2],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAlignSelf: Carrier<
    'WebkitAlignSelf',
    keyof (typeof keywordGroups)[4],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimation: Carrier<
    'WebkitAnimation',
    keyof (typeof keywordGroups)[8],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationDelay: Carrier<
    'WebkitAnimationDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationDirection: Carrier<
    'WebkitAnimationDirection',
    keyof (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationDuration: Carrier<
    'WebkitAnimationDuration',
    keyof (typeof keywordGroups)[11],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationFillMode: Carrier<
    'WebkitAnimationFillMode',
    keyof (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationIterationCount: Carrier<
    'WebkitAnimationIterationCount',
    keyof (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationName: Carrier<
    'WebkitAnimationName',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationPlayState: Carrier<
    'WebkitAnimationPlayState',
    keyof (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationTimingFunction: Carrier<
    'WebkitAnimationTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitAppearance: Carrier<
    'WebkitAppearance',
    keyof (typeof keywordGroups)[243],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitBackdropFilter: Carrier<
    'WebkitBackdropFilter',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitBackfaceVisibility: Carrier<
    'WebkitBackfaceVisibility',
    keyof (typeof keywordGroups)[19],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBackgroundClip: Carrier<
    'WebkitBackgroundClip',
    keyof (typeof keywordGroups)[23],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBackgroundOrigin: Carrier<
    'WebkitBackgroundOrigin',
    keyof (typeof keywordGroups)[25],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBackgroundSize: Carrier<
    'WebkitBackgroundSize',
    keyof (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /** The **`-webkit-border-before`** CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet. */
  readonly WebkitBorderBefore: Carrier<
    'WebkitBorderBefore',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<color>` */
  readonly WebkitBorderBeforeColor: Carrier<
    'WebkitBorderBeforeColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'border-style'>` */
  readonly WebkitBorderBeforeStyle: Carrier<
    'WebkitBorderBeforeStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<'border-width'>` */
  readonly WebkitBorderBeforeWidth: Carrier<
    'WebkitBorderBeforeWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderBottomLeftRadius: Carrier<
    'WebkitBorderBottomLeftRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderBottomRightRadius: Carrier<
    'WebkitBorderBottomRightRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderImage: Carrier<
    'WebkitBorderImage',
    keyof (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderImageSlice: Carrier<
    'WebkitBorderImageSlice',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderRadius: Carrier<
    'WebkitBorderRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderTopLeftRadius: Carrier<
    'WebkitBorderTopLeftRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderTopRightRadius: Carrier<
    'WebkitBorderTopRightRadius',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly WebkitBoxAlign: Carrier<
    'WebkitBoxAlign',
    keyof (typeof keywordGroups)[39],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitBoxDecorationBreak: Carrier<
    'WebkitBoxDecorationBreak',
    keyof (typeof keywordGroups)[40],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly WebkitBoxDirection: Carrier<
    'WebkitBoxDirection',
    keyof (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly WebkitBoxFlex: Carrier<
    'WebkitBoxFlex',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group. */
  readonly WebkitBoxFlexGroup: Carrier<
    'WebkitBoxFlexGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes). */
  readonly WebkitBoxLines: Carrier<
    'WebkitBoxLines',
    keyof (typeof keywordGroups)[42],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly WebkitBoxOrdinalGroup: Carrier<
    'WebkitBoxOrdinalGroup',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly WebkitBoxOrient: Carrier<
    'WebkitBoxOrient',
    keyof (typeof keywordGroups)[43],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly WebkitBoxPack: Carrier<
    'WebkitBoxPack',
    keyof (typeof keywordGroups)[44],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction. */
  readonly WebkitBoxReflect: Carrier<
    'WebkitBoxReflect',
    keyof (typeof keywordGroups)[244],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBoxShadow: Carrier<
    'WebkitBoxShadow',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBoxSizing: Carrier<
    'WebkitBoxSizing',
    keyof (typeof keywordGroups)[45],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitClipPath: Carrier<
    'WebkitClipPath',
    keyof (typeof keywordGroups)[52],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnCount: Carrier<
    'WebkitColumnCount',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnFill: Carrier<
    'WebkitColumnFill',
    keyof (typeof keywordGroups)[58],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRule: Carrier<
    'WebkitColumnRule',
    keyof (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRuleColor: Carrier<
    'WebkitColumnRuleColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRuleStyle: Carrier<
    'WebkitColumnRuleStyle',
    keyof (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRuleWidth: Carrier<
    'WebkitColumnRuleWidth',
    keyof (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumns: Carrier<
    'WebkitColumns',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly WebkitColumnSpan: Carrier<
    'WebkitColumnSpan',
    keyof (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016. */
  readonly WebkitColumnWidth: Carrier<
    'WebkitColumnWidth',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly WebkitFilter: Carrier<
    'WebkitFilter',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlex: Carrier<
    'WebkitFlex',
    keyof (typeof keywordGroups)[71],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexBasis: Carrier<
    'WebkitFlexBasis',
    keyof (typeof keywordGroups)[72],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexDirection: Carrier<
    'WebkitFlexDirection',
    keyof (typeof keywordGroups)[73],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexFlow: Carrier<
    'WebkitFlexFlow',
    keyof (typeof keywordGroups)[74],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexGrow: Carrier<
    'WebkitFlexGrow',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexShrink: Carrier<
    'WebkitFlexShrink',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexWrap: Carrier<
    'WebkitFlexWrap',
    keyof (typeof keywordGroups)[75],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitFontFeatureSettings: Carrier<
    'WebkitFontFeatureSettings',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitFontKerning: Carrier<
    'WebkitFontKerning',
    keyof (typeof keywordGroups)[79],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered. */
  readonly WebkitFontSmoothing: Carrier<
    'WebkitFontSmoothing',
    keyof (typeof keywordGroups)[82],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitFontVariantLigatures: Carrier<
    'WebkitFontVariantLigatures',
    keyof (typeof keywordGroups)[91],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitHyphenateCharacter: Carrier<
    'WebkitHyphenateCharacter',
    keyof (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitHyphens: Carrier<
    'WebkitHyphens',
    keyof (typeof keywordGroups)[101],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitInitialLetter: Carrier<
    'WebkitInitialLetter',
    keyof (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitJustifyContent: Carrier<
    'WebkitJustifyContent',
    keyof (typeof keywordGroups)[111],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly WebkitLineBreak: Carrier<
    'WebkitLineBreak',
    keyof (typeof keywordGroups)[114],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitLineClamp: Carrier<
    'WebkitLineClamp',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitLogicalHeight: Carrier<
    'WebkitLogicalHeight',
    keyof (typeof keywordGroups)[32],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitLogicalWidth: Carrier<
    'WebkitLogicalWidth',
    keyof (typeof keywordGroups)[107],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitMarginEnd: Carrier<
    'WebkitMarginEnd',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitMarginStart: Carrier<
    'WebkitMarginStart',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMask: Carrier<
    'WebkitMask',
    keyof (typeof keywordGroups)[245],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `<attachment>#` */
  readonly WebkitMaskAttachment: Carrier<
    'WebkitMaskAttachment',
    keyof (typeof keywordGroups)[21],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImage: Carrier<
    'WebkitMaskBoxImage',
    keyof (typeof keywordGroups)[120],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageOutset: Carrier<
    'WebkitMaskBoxImageOutset',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageRepeat: Carrier<
    'WebkitMaskBoxImageRepeat',
    keyof (typeof keywordGroups)[38],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageSlice: Carrier<
    'WebkitMaskBoxImageSlice',
    keyof (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageSource: Carrier<
    'WebkitMaskBoxImageSource',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageWidth: Carrier<
    'WebkitMaskBoxImageWidth',
    keyof (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskClip: Carrier<
    'WebkitMaskClip',
    keyof (typeof keywordGroups)[246],
    never,
    1,
    '',
    T,
    M
  >;
  /** The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property. */
  readonly WebkitMaskComposite: Carrier<
    'WebkitMaskComposite',
    keyof (typeof keywordGroups)[247],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskImage: Carrier<
    'WebkitMaskImage',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskOrigin: Carrier<
    'WebkitMaskOrigin',
    keyof (typeof keywordGroups)[248],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskPosition: Carrier<
    'WebkitMaskPosition',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** The `-webkit-mask-position-x` CSS property sets the initial horizontal position of a mask image. */
  readonly WebkitMaskPositionX: Carrier<
    'WebkitMaskPositionX',
    keyof (typeof keywordGroups)[249],
    'length',
    1,
    '',
    T,
    M
  >;
  /** The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image. */
  readonly WebkitMaskPositionY: Carrier<
    'WebkitMaskPositionY',
    keyof (typeof keywordGroups)[250],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskRepeat: Carrier<
    'WebkitMaskRepeat',
    keyof (typeof keywordGroups)[29],
    never,
    1,
    '',
    T,
    M
  >;
  /** The `-webkit-mask-repeat-x` property specifies whether and how a mask image is repeated (tiled) horizontally. */
  readonly WebkitMaskRepeatX: Carrier<
    'WebkitMaskRepeatX',
    keyof (typeof keywordGroups)[251],
    never,
    1,
    '',
    T,
    M
  >;
  /** The `-webkit-mask-repeat-y` property sets whether and how a mask image is repeated (tiled) vertically. */
  readonly WebkitMaskRepeatY: Carrier<
    'WebkitMaskRepeatY',
    keyof (typeof keywordGroups)[251],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskSize: Carrier<
    'WebkitMaskSize',
    keyof (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitMaxInlineSize: Carrier<
    'WebkitMaxInlineSize',
    keyof (typeof keywordGroups)[131],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitOrder: Carrier<'WebkitOrder', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** **Syntax**: `auto | touch` */
  readonly WebkitOverflowScrolling: Carrier<
    'WebkitOverflowScrolling',
    keyof (typeof keywordGroups)[252],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitPaddingEnd: Carrier<
    'WebkitPaddingEnd',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitPaddingStart: Carrier<
    'WebkitPaddingStart',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitPerspective: Carrier<
    'WebkitPerspective',
    keyof (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitPerspectiveOrigin: Carrier<
    'WebkitPerspectiveOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitPrintColorAdjust: Carrier<
    'WebkitPrintColorAdjust',
    keyof (typeof keywordGroups)[54],
    never,
    1,
    '',
    T,
    M
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitRubyPosition: Carrier<
    'WebkitRubyPosition',
    keyof (typeof keywordGroups)[198],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022. */
  readonly WebkitScrollSnapType: Carrier<
    'WebkitScrollSnapType',
    keyof (typeof keywordGroups)[206],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitShapeMargin: Carrier<
    'WebkitShapeMargin',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** **`-webkit-tap-highlight-color`** is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on. */
  readonly WebkitTapHighlightColor: Carrier<
    'WebkitTapHighlightColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextCombine: Carrier<
    'WebkitTextCombine',
    keyof (typeof keywordGroups)[171],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitTextDecorationColor: Carrier<
    'WebkitTextDecorationColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitTextDecorationLine: Carrier<
    'WebkitTextDecorationLine',
    keyof (typeof keywordGroups)[149],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitTextDecorationSkip: Carrier<
    'WebkitTextDecorationSkip',
    keyof (typeof keywordGroups)[221],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitTextDecorationStyle: Carrier<
    'WebkitTextDecorationStyle',
    keyof (typeof keywordGroups)[150],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasis: Carrier<
    'WebkitTextEmphasis',
    keyof (typeof keywordGroups)[224],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasisColor: Carrier<
    'WebkitTextEmphasisColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasisPosition: Carrier<
    'WebkitTextEmphasisPosition',
    keyof (typeof keywordGroups)[225],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasisStyle: Carrier<
    'WebkitTextEmphasisStyle',
    keyof (typeof keywordGroups)[226],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly WebkitTextFillColor: Carrier<
    'WebkitTextFillColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020. */
  readonly WebkitTextOrientation: Carrier<
    'WebkitTextOrientation',
    keyof (typeof keywordGroups)[228],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitTextSizeAdjust: Carrier<
    'WebkitTextSizeAdjust',
    keyof (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitTextStroke: Carrier<
    'WebkitTextStroke',
    keyof (typeof keywordGroups)[24],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitTextStrokeColor: Carrier<
    'WebkitTextStrokeColor',
    keyof (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitTextStrokeWidth: Carrier<
    'WebkitTextStrokeWidth',
    keyof (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly WebkitTextUnderlinePosition: Carrier<
    'WebkitTextUnderlinePosition',
    keyof (typeof keywordGroups)[232],
    never,
    1,
    '',
    T,
    M
  >;
  /** The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target. */
  readonly WebkitTouchCallout: Carrier<
    'WebkitTouchCallout',
    keyof (typeof keywordGroups)[253],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransform: Carrier<
    'WebkitTransform',
    keyof (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransformOrigin: Carrier<
    'WebkitTransformOrigin',
    keyof (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransformStyle: Carrier<
    'WebkitTransformStyle',
    keyof (typeof keywordGroups)[151],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransition: Carrier<
    'WebkitTransition',
    keyof (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionDelay: Carrier<
    'WebkitTransitionDelay',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionDuration: Carrier<
    'WebkitTransitionDuration',
    keyof (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionProperty: Carrier<
    'WebkitTransitionProperty',
    keyof (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionTimingFunction: Carrier<
    'WebkitTransitionTimingFunction',
    keyof (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /** **Syntax**: `read-only | read-write | read-write-plaintext-only` */
  readonly WebkitUserModify: Carrier<
    'WebkitUserModify',
    keyof (typeof keywordGroups)[254],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitUserSelect: Carrier<
    'WebkitUserSelect',
    keyof (typeof keywordGroups)[255],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitWritingMode: Carrier<
    'WebkitWritingMode',
    keyof (typeof keywordGroups)[179],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly whiteSpace: Carrier<'whiteSpace', keyof (typeof keywordGroups)[256], never, 1, '', T, M>;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly whiteSpaceCollapse: Carrier<
    'whiteSpaceCollapse',
    keyof (typeof keywordGroups)[257],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly widows: Carrier<'widows', keyof (typeof keywordGroups)[5], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly width: Carrier<'width', keyof (typeof keywordGroups)[258], 'length', 1, 'size', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly willChange: Carrier<'willChange', keyof (typeof keywordGroups)[259], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly wordBreak: Carrier<'wordBreak', keyof (typeof keywordGroups)[176], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly wordSpacing: Carrier<
    'wordSpacing',
    keyof (typeof keywordGroups)[59],
    'length',
    1,
    'letterSpacing',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018. */
  readonly wordWrap: Carrier<'wordWrap', keyof (typeof keywordGroups)[260], never, 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly writingMode: Carrier<
    'writingMode',
    keyof (typeof keywordGroups)[179],
    never,
    1,
    '',
    T,
    M
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly x: Carrier<'x', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly y: Carrier<'y', keyof (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly zIndex: Carrier<'zIndex', keyof (typeof keywordGroups)[11], never, 1, 'zIndex', T, M>;
  /** Since May 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly zoom: Carrier<'zoom', keyof (typeof keywordGroups)[261], never, 1, '', T, M>;
}
