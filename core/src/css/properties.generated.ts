// 自动生成，请运行 pnpm generate；勿手工修改。来源：csstype 3.2.3（MIT）及 schema.ts。
import type { CssProperty, PropertyTokenMap } from './property.js';
import type { keywordGroups } from './metadata.generated.js';
import type { TokenSchema } from '../theme/types.js';
export interface StyleProperties<
  T extends TokenSchema = Record<never, never>,
  M extends PropertyTokenMap<T> = object,
> {
  /**
   * accent-color
   * 主题类别：color（_ 前缀）。
   * 语法：`auto | <color>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/accent-color
   */
  readonly accentColor: CssProperty<
    'accentColor',
    (typeof keywordGroups)[0],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * align-content
   * 语法：`normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/align-content
   */
  readonly alignContent: CssProperty<'alignContent', (typeof keywordGroups)[1], never, 1, '', T, M>;
  /**
   * align-items
   * 语法：`normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/align-items
   */
  readonly alignItems: CssProperty<'alignItems', (typeof keywordGroups)[2], never, 1, '', T, M>;
  /**
   * alignment-baseline
   * 语法：`baseline | alphabetic | ideographic | middle | central | mathematical | text-before-edge | text-after-edge`
   * 初始值：`baseline`
   * @see https://developer.mozilla.org/docs/Web/CSS/alignment-baseline
   */
  readonly alignmentBaseline: CssProperty<
    'alignmentBaseline',
    (typeof keywordGroups)[3],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * align-self
   * 语法：`auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/align-self
   */
  readonly alignSelf: CssProperty<'alignSelf', (typeof keywordGroups)[4], never, 1, '', T, M>;
  /**
   * align-tracks
   * 语法：`[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/align-tracks
   */
  readonly alignTracks: CssProperty<'alignTracks', (typeof keywordGroups)[1], never, 1, '', T, M>;
  /**
   * all
   * 语法：`initial | inherit | unset | revert | revert-layer`
   * 初始值：There is no practical initial value for it.
   * @see https://developer.mozilla.org/docs/Web/CSS/all
   */
  readonly all: CssProperty<'all', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * anchor-name
   * 语法：`none | <dashed-ident>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/anchor-name
   */
  readonly anchorName: CssProperty<'anchorName', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * anchor-scope
   * 语法：`none | all | <dashed-ident>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/anchor-scope
   */
  readonly anchorScope: CssProperty<'anchorScope', (typeof keywordGroups)[7], never, 1, '', T, M>;
  /**
   * animation
   * 语法：`<single-animation>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation
   */
  readonly animation: CssProperty<'animation', (typeof keywordGroups)[8], 'time', 1, '', T, M>;
  /**
   * animation-composition
   * 语法：`<single-animation-composition>#`
   * 初始值：`replace`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-composition
   */
  readonly animationComposition: CssProperty<
    'animationComposition',
    (typeof keywordGroups)[9],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-delay
   * 主题类别：duration（_ 前缀）。
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-delay
   */
  readonly animationDelay: CssProperty<
    'animationDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /**
   * animation-direction
   * 语法：`<single-animation-direction>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-direction
   */
  readonly animationDirection: CssProperty<
    'animationDirection',
    (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-duration
   * 主题类别：duration（_ 前缀）。
   * 语法：`[ auto | <time [0s,∞]> ]#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-duration
   */
  readonly animationDuration: CssProperty<
    'animationDuration',
    (typeof keywordGroups)[11],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /**
   * animation-fill-mode
   * 语法：`<single-animation-fill-mode>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode
   */
  readonly animationFillMode: CssProperty<
    'animationFillMode',
    (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-iteration-count
   * 语法：`<single-animation-iteration-count>#`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count
   */
  readonly animationIterationCount: CssProperty<
    'animationIterationCount',
    (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-name
   * 语法：`[ none | <keyframes-name> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-name
   */
  readonly animationName: CssProperty<
    'animationName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-play-state
   * 语法：`<single-animation-play-state>#`
   * 初始值：`running`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-play-state
   */
  readonly animationPlayState: CssProperty<
    'animationPlayState',
    (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-range
   * 语法：`[ <'animation-range-start'> <'animation-range-end'>? ]#`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-range
   */
  readonly animationRange: CssProperty<
    'animationRange',
    (typeof keywordGroups)[15],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * animation-range-end
   * 语法：`[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-range-end
   */
  readonly animationRangeEnd: CssProperty<
    'animationRangeEnd',
    (typeof keywordGroups)[15],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * animation-range-start
   * 语法：`[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-range-start
   */
  readonly animationRangeStart: CssProperty<
    'animationRangeStart',
    (typeof keywordGroups)[15],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * animation-timeline
   * 语法：`<single-animation-timeline>#`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-timeline
   */
  readonly animationTimeline: CssProperty<
    'animationTimeline',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * animation-timing-function
   * 主题类别：easing（_ 前缀）。
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/animation-timing-function
   */
  readonly animationTimingFunction: CssProperty<
    'animationTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    'easing',
    T,
    M
  >;
  /**
   * appearance
   * 语法：`none | auto | <compat-auto> | <compat-special>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/appearance
   */
  readonly appearance: CssProperty<'appearance', (typeof keywordGroups)[18], never, 1, '', T, M>;
  /**
   * aspect-ratio
   * 语法：`auto || <ratio>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/aspect-ratio
   */
  readonly aspectRatio: CssProperty<'aspectRatio', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * backdrop-filter
   * 语法：`none | <filter-value-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/backdrop-filter
   */
  readonly backdropFilter: CssProperty<
    'backdropFilter',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * backface-visibility
   * 语法：`visible | hidden`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/backface-visibility
   */
  readonly backfaceVisibility: CssProperty<
    'backfaceVisibility',
    (typeof keywordGroups)[19],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * background
   * 语法：`<bg-layer>#? , <final-bg-layer>`
   * @see https://developer.mozilla.org/docs/Web/CSS/background
   */
  readonly background: CssProperty<'background', (typeof keywordGroups)[20], 'length', 1, '', T, M>;
  /**
   * background-attachment
   * 语法：`<attachment>#`
   * 初始值：`scroll`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-attachment
   */
  readonly backgroundAttachment: CssProperty<
    'backgroundAttachment',
    (typeof keywordGroups)[21],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * background-blend-mode
   * 语法：`<blend-mode>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-blend-mode
   */
  readonly backgroundBlendMode: CssProperty<
    'backgroundBlendMode',
    (typeof keywordGroups)[22],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * background-clip
   * 语法：`<bg-clip>#`
   * 初始值：`border-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-clip
   */
  readonly backgroundClip: CssProperty<
    'backgroundClip',
    (typeof keywordGroups)[23],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 元素的背景颜色。
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`transparent`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-color
   */
  readonly backgroundColor: CssProperty<
    'backgroundColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * background-image
   * 语法：`<bg-image>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-image
   */
  readonly backgroundImage: CssProperty<
    'backgroundImage',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * background-origin
   * 语法：`<visual-box>#`
   * 初始值：`padding-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-origin
   */
  readonly backgroundOrigin: CssProperty<
    'backgroundOrigin',
    (typeof keywordGroups)[25],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * background-position
   * 语法：`<bg-position>#`
   * 初始值：`0% 0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-position
   */
  readonly backgroundPosition: CssProperty<
    'backgroundPosition',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * background-position-x
   * 语法：`[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#`
   * 初始值：`0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-position-x
   */
  readonly backgroundPositionX: CssProperty<
    'backgroundPositionX',
    (typeof keywordGroups)[27],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * background-position-y
   * 语法：`[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#`
   * 初始值：`0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-position-y
   */
  readonly backgroundPositionY: CssProperty<
    'backgroundPositionY',
    (typeof keywordGroups)[28],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * background-repeat
   * 语法：`<repeat-style>#`
   * 初始值：`repeat`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-repeat
   */
  readonly backgroundRepeat: CssProperty<
    'backgroundRepeat',
    (typeof keywordGroups)[29],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * background-size
   * 语法：`<bg-size>#`
   * 初始值：`auto auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/background-size
   */
  readonly backgroundSize: CssProperty<
    'backgroundSize',
    (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * baseline-shift
   * 语法：`<length-percentage> | sub | super | baseline`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/baseline-shift
   */
  readonly baselineShift: CssProperty<
    'baselineShift',
    (typeof keywordGroups)[31],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * 元素在块轴方向上的尺寸。
   * 主题类别：size（_ 前缀）。
   * 语法：`<'width'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/block-size
   */
  readonly blockSize: CssProperty<
    'blockSize',
    (typeof keywordGroups)[32],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * border
   * 语法：`<line-width> || <line-style> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border
   */
  readonly border: CssProperty<'border', (typeof keywordGroups)[33], 'length', 1, '', T, M>;
  /**
   * border-block
   * 语法：`<'border-block-start'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block
   */
  readonly borderBlock: CssProperty<
    'borderBlock',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>{1,2}`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-color
   */
  readonly borderBlockColor: CssProperty<
    'borderBlockColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-block-end
   * 语法：`<'border-top-width'> || <'border-top-style'> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end
   */
  readonly borderBlockEnd: CssProperty<
    'borderBlockEnd',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-end-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end-color
   */
  readonly borderBlockEndColor: CssProperty<
    'borderBlockEndColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-block-end-style
   * 语法：`<'border-top-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end-style
   */
  readonly borderBlockEndStyle: CssProperty<
    'borderBlockEndStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-end-width
   * 语法：`<'border-top-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end-width
   */
  readonly borderBlockEndWidth: CssProperty<
    'borderBlockEndWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-start
   * 语法：`<'border-top-width'> || <'border-top-style'> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start
   */
  readonly borderBlockStart: CssProperty<
    'borderBlockStart',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-start-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start-color
   */
  readonly borderBlockStartColor: CssProperty<
    'borderBlockStartColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-block-start-style
   * 语法：`<'border-top-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start-style
   */
  readonly borderBlockStartStyle: CssProperty<
    'borderBlockStartStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-start-width
   * 语法：`<'border-top-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start-width
   */
  readonly borderBlockStartWidth: CssProperty<
    'borderBlockStartWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-style
   * 语法：`<'border-top-style'>{1,2}`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-style
   */
  readonly borderBlockStyle: CssProperty<
    'borderBlockStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-block-width
   * 语法：`<'border-top-width'>{1,2}`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-width
   */
  readonly borderBlockWidth: CssProperty<
    'borderBlockWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-bottom
   * 语法：`<line-width> || <line-style> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom
   */
  readonly borderBottom: CssProperty<
    'borderBottom',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-bottom-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-color
   */
  readonly borderBottomColor: CssProperty<
    'borderBottomColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-bottom-left-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius
   */
  readonly borderBottomLeftRadius: CssProperty<
    'borderBottomLeftRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-bottom-right-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius
   */
  readonly borderBottomRightRadius: CssProperty<
    'borderBottomRightRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-bottom-style
   * 语法：`<line-style>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-style
   */
  readonly borderBottomStyle: CssProperty<
    'borderBottomStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-bottom-width
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<line-width>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-width
   */
  readonly borderBottomWidth: CssProperty<
    'borderBottomWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /**
   * border-collapse
   * 语法：`separate | collapse`
   * 初始值：`separate`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-collapse
   */
  readonly borderCollapse: CssProperty<
    'borderCollapse',
    (typeof keywordGroups)[36],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-color
   */
  readonly borderColor: CssProperty<
    'borderColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-end-end-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<'border-top-left-radius'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius
   */
  readonly borderEndEndRadius: CssProperty<
    'borderEndEndRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-end-start-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<'border-top-left-radius'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius
   */
  readonly borderEndStartRadius: CssProperty<
    'borderEndStartRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-image
   * 语法：`<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image
   */
  readonly borderImage: CssProperty<'borderImage', (typeof keywordGroups)[37], never, 1, '', T, M>;
  /**
   * border-image-outset
   * 语法：`[ <length [0,∞]> | <number [0,∞]> ]{1,4}  `
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-outset
   */
  readonly borderImageOutset: CssProperty<
    'borderImageOutset',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-image-repeat
   * 语法：`[ stretch | repeat | round | space ]{1,2}`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-repeat
   */
  readonly borderImageRepeat: CssProperty<
    'borderImageRepeat',
    (typeof keywordGroups)[38],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-image-slice
   * 语法：`[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   * 初始值：`100%`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-slice
   */
  readonly borderImageSlice: CssProperty<
    'borderImageSlice',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-image-source
   * 语法：`none | <image>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-source
   */
  readonly borderImageSource: CssProperty<
    'borderImageSource',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-image-width
   * 语法：`[ <length-percentage [0,∞]> | <number [0,∞]> | auto ]{1,4}`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-image-width
   */
  readonly borderImageWidth: CssProperty<
    'borderImageWidth',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline
   * 语法：`<'border-block-start'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline
   */
  readonly borderInline: CssProperty<
    'borderInline',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>{1,2}`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-color
   */
  readonly borderInlineColor: CssProperty<
    'borderInlineColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-inline-end
   * 语法：`<'border-top-width'> || <'border-top-style'> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end
   */
  readonly borderInlineEnd: CssProperty<
    'borderInlineEnd',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-end-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color
   */
  readonly borderInlineEndColor: CssProperty<
    'borderInlineEndColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-inline-end-style
   * 语法：`<'border-top-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style
   */
  readonly borderInlineEndStyle: CssProperty<
    'borderInlineEndStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-end-width
   * 语法：`<'border-top-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width
   */
  readonly borderInlineEndWidth: CssProperty<
    'borderInlineEndWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-start
   * 语法：`<'border-top-width'> || <'border-top-style'> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start
   */
  readonly borderInlineStart: CssProperty<
    'borderInlineStart',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-start-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color
   */
  readonly borderInlineStartColor: CssProperty<
    'borderInlineStartColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-inline-start-style
   * 语法：`<'border-top-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style
   */
  readonly borderInlineStartStyle: CssProperty<
    'borderInlineStartStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-start-width
   * 语法：`<'border-top-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width
   */
  readonly borderInlineStartWidth: CssProperty<
    'borderInlineStartWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-style
   * 语法：`<'border-top-style'>{1,2}`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-style
   */
  readonly borderInlineStyle: CssProperty<
    'borderInlineStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-inline-width
   * 语法：`<'border-top-width'>{1,2}`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-width
   */
  readonly borderInlineWidth: CssProperty<
    'borderInlineWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-left
   * 语法：`<line-width> || <line-style> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left
   */
  readonly borderLeft: CssProperty<'borderLeft', (typeof keywordGroups)[33], 'length', 1, '', T, M>;
  /**
   * border-left-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-color
   */
  readonly borderLeftColor: CssProperty<
    'borderLeftColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-left-style
   * 语法：`<line-style>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-style
   */
  readonly borderLeftStyle: CssProperty<
    'borderLeftStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-left-width
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<line-width>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-width
   */
  readonly borderLeftWidth: CssProperty<
    'borderLeftWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /**
   * 四个角的圆角半径。
   * 主题类别：radius（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-radius
   */
  readonly borderRadius: CssProperty<
    'borderRadius',
    (typeof keywordGroups)[5],
    'length',
    4,
    'radius',
    T,
    M
  >;
  /**
   * border-right
   * 语法：`<line-width> || <line-style> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right
   */
  readonly borderRight: CssProperty<
    'borderRight',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-right-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-color
   */
  readonly borderRightColor: CssProperty<
    'borderRightColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-right-style
   * 语法：`<line-style>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-style
   */
  readonly borderRightStyle: CssProperty<
    'borderRightStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-right-width
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<line-width>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-width
   */
  readonly borderRightWidth: CssProperty<
    'borderRightWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /**
   * border-spacing
   * 语法：`<length>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-spacing
   */
  readonly borderSpacing: CssProperty<
    'borderSpacing',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * border-start-end-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<'border-top-left-radius'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius
   */
  readonly borderStartEndRadius: CssProperty<
    'borderStartEndRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-start-start-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<'border-top-left-radius'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius
   */
  readonly borderStartStartRadius: CssProperty<
    'borderStartStartRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-style
   * 语法：`<line-style>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-style
   */
  readonly borderStyle: CssProperty<'borderStyle', (typeof keywordGroups)[34], never, 1, '', T, M>;
  /**
   * border-top
   * 语法：`<line-width> || <line-style> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top
   */
  readonly borderTop: CssProperty<'borderTop', (typeof keywordGroups)[33], 'length', 1, '', T, M>;
  /**
   * border-top-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-color
   */
  readonly borderTopColor: CssProperty<
    'borderTopColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * border-top-left-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius
   */
  readonly borderTopLeftRadius: CssProperty<
    'borderTopLeftRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-top-right-radius
   * 主题类别：radius（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius
   */
  readonly borderTopRightRadius: CssProperty<
    'borderTopRightRadius',
    (typeof keywordGroups)[5],
    'length',
    2,
    'radius',
    T,
    M
  >;
  /**
   * border-top-style
   * 语法：`<line-style>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-style
   */
  readonly borderTopStyle: CssProperty<
    'borderTopStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * border-top-width
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<line-width>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-width
   */
  readonly borderTopWidth: CssProperty<
    'borderTopWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /**
   * border-width
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<line-width>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/border-width
   */
  readonly borderWidth: CssProperty<
    'borderWidth',
    (typeof keywordGroups)[35],
    'length',
    4,
    'borderWidth',
    T,
    M
  >;
  /**
   * bottom
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage> | <anchor()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/bottom
   */
  readonly bottom: CssProperty<'bottom', (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /**
   * box-align
   * 语法：`start | center | end | baseline | stretch`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-align
   */
  readonly boxAlign: CssProperty<'boxAlign', (typeof keywordGroups)[39], never, 1, '', T, M>;
  /**
   * box-decoration-break
   * 语法：`slice | clone`
   * 初始值：`slice`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-decoration-break
   */
  readonly boxDecorationBreak: CssProperty<
    'boxDecorationBreak',
    (typeof keywordGroups)[40],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * box-direction
   * 语法：`normal | reverse | inherit`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-direction
   */
  readonly boxDirection: CssProperty<
    'boxDirection',
    (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * box-flex
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-flex
   */
  readonly boxFlex: CssProperty<'boxFlex', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * box-flex-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-flex-group
   */
  readonly boxFlexGroup: CssProperty<'boxFlexGroup', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * box-lines
   * 语法：`single | multiple`
   * 初始值：`single`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-lines
   */
  readonly boxLines: CssProperty<'boxLines', (typeof keywordGroups)[42], never, 1, '', T, M>;
  /**
   * box-ordinal-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group
   */
  readonly boxOrdinalGroup: CssProperty<
    'boxOrdinalGroup',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * box-orient
   * 语法：`horizontal | vertical | inline-axis | block-axis | inherit`
   * 初始值：`inline-axis`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-orient
   */
  readonly boxOrient: CssProperty<'boxOrient', (typeof keywordGroups)[43], never, 1, '', T, M>;
  /**
   * box-pack
   * 语法：`start | center | end | justify`
   * 初始值：`start`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-pack
   */
  readonly boxPack: CssProperty<'boxPack', (typeof keywordGroups)[44], never, 1, '', T, M>;
  /**
   * box-shadow
   * 主题类别：shadow（_ 前缀）。
   * 语法：`none | <shadow>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-shadow
   */
  readonly boxShadow: CssProperty<'boxShadow', (typeof keywordGroups)[6], never, 1, 'shadow', T, M>;
  /**
   * box-sizing
   * 语法：`content-box | border-box`
   * 初始值：`content-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/box-sizing
   */
  readonly boxSizing: CssProperty<'boxSizing', (typeof keywordGroups)[45], never, 1, '', T, M>;
  /**
   * break-after
   * 语法：`auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/break-after
   */
  readonly breakAfter: CssProperty<'breakAfter', (typeof keywordGroups)[46], never, 1, '', T, M>;
  /**
   * break-before
   * 语法：`auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/break-before
   */
  readonly breakBefore: CssProperty<'breakBefore', (typeof keywordGroups)[46], never, 1, '', T, M>;
  /**
   * break-inside
   * 语法：`auto | avoid | avoid-page | avoid-column | avoid-region`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/break-inside
   */
  readonly breakInside: CssProperty<'breakInside', (typeof keywordGroups)[47], never, 1, '', T, M>;
  /**
   * caption-side
   * 语法：`top | bottom`
   * 初始值：`top`
   * @see https://developer.mozilla.org/docs/Web/CSS/caption-side
   */
  readonly captionSide: CssProperty<'captionSide', (typeof keywordGroups)[48], never, 1, '', T, M>;
  /**
   * caret
   * 语法：`<'caret-color'> || <'caret-shape'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/caret
   */
  readonly caret: CssProperty<'caret', (typeof keywordGroups)[49], never, 1, '', T, M>;
  /**
   * caret-color
   * 主题类别：color（_ 前缀）。
   * 语法：`auto | <color>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/caret-color
   */
  readonly caretColor: CssProperty<
    'caretColor',
    (typeof keywordGroups)[0],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * caret-shape
   * 语法：`auto | bar | block | underscore`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/caret-shape
   */
  readonly caretShape: CssProperty<'caretShape', (typeof keywordGroups)[50], never, 1, '', T, M>;
  /**
   * clear
   * 语法：`none | left | right | both | inline-start | inline-end`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/clear
   */
  readonly clear: CssProperty<'clear', (typeof keywordGroups)[51], never, 1, '', T, M>;
  /**
   * clip
   * 语法：`<shape> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/clip
   */
  readonly clip: CssProperty<'clip', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * clip-path
   * 语法：`<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/clip-path
   */
  readonly clipPath: CssProperty<'clipPath', (typeof keywordGroups)[52], never, 1, '', T, M>;
  /**
   * clip-rule
   * 语法：`nonzero | evenodd`
   * 初始值：`nonzero`
   * @see https://developer.mozilla.org/docs/Web/CSS/clip-rule
   */
  readonly clipRule: CssProperty<'clipRule', (typeof keywordGroups)[53], never, 1, '', T, M>;
  /**
   * 文本及 currentColor 的前景颜色。
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`canvastext`
   * @see https://developer.mozilla.org/docs/Web/CSS/color
   */
  readonly color: CssProperty<'color', (typeof keywordGroups)[24], never, 1, 'color', T, M>;
  /**
   * color-adjust
   * 语法：`economy | exact`
   * 初始值：`economy`
   * @see https://developer.mozilla.org/docs/Web/CSS/color-adjust
   */
  readonly colorAdjust: CssProperty<'colorAdjust', (typeof keywordGroups)[54], never, 1, '', T, M>;
  /**
   * color-interpolation
   * @see https://developer.mozilla.org/docs/Web/CSS/color-interpolation
   */
  readonly colorInterpolation: CssProperty<
    'colorInterpolation',
    (typeof keywordGroups)[55],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * color-interpolation-filters
   * 语法：`auto | sRGB | linearRGB`
   * 初始值：`linearRGB`
   * @see https://developer.mozilla.org/docs/Web/CSS/color-interpolation-filters
   */
  readonly colorInterpolationFilters: CssProperty<
    'colorInterpolationFilters',
    (typeof keywordGroups)[55],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * color-rendering
   * @see https://developer.mozilla.org/docs/Web/CSS/color-rendering
   */
  readonly colorRendering: CssProperty<
    'colorRendering',
    (typeof keywordGroups)[56],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * color-scheme
   * 语法：`normal | [ light | dark | <custom-ident> ]+ && only?`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/color-scheme
   */
  readonly colorScheme: CssProperty<'colorScheme', (typeof keywordGroups)[57], never, 1, '', T, M>;
  /**
   * column-count
   * 语法：`<integer> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-count
   */
  readonly columnCount: CssProperty<'columnCount', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * column-fill
   * 语法：`auto | balance`
   * 初始值：`balance`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-fill
   */
  readonly columnFill: CssProperty<'columnFill', (typeof keywordGroups)[58], never, 1, '', T, M>;
  /**
   * column-gap
   * 主题类别：spacing（_ 前缀）。
   * 语法：`normal | <length-percentage>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-gap
   */
  readonly columnGap: CssProperty<
    'columnGap',
    (typeof keywordGroups)[59],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * column-rule
   * 语法：`<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule
   */
  readonly columnRule: CssProperty<'columnRule', (typeof keywordGroups)[33], 'length', 1, '', T, M>;
  /**
   * column-rule-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule-color
   */
  readonly columnRuleColor: CssProperty<
    'columnRuleColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * column-rule-style
   * 语法：`<'border-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule-style
   */
  readonly columnRuleStyle: CssProperty<
    'columnRuleStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * column-rule-width
   * 语法：`<'border-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-rule-width
   */
  readonly columnRuleWidth: CssProperty<
    'columnRuleWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * columns
   * 语法：`<'column-width'> || <'column-count'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/columns
   */
  readonly columns: CssProperty<'columns', (typeof keywordGroups)[11], 'length', 1, '', T, M>;
  /**
   * column-span
   * 语法：`none | all`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-span
   */
  readonly columnSpan: CssProperty<'columnSpan', (typeof keywordGroups)[7], never, 1, '', T, M>;
  /**
   * column-width
   * 语法：`<length> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/column-width
   */
  readonly columnWidth: CssProperty<
    'columnWidth',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * contain
   * 语法：`none | strict | content | [ [ size || inline-size ] || layout || style || paint ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/contain
   */
  readonly contain: CssProperty<'contain', (typeof keywordGroups)[60], never, 1, '', T, M>;
  /**
   * container
   * 语法：`<'container-name'> [ / <'container-type'> ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/container
   */
  readonly container: CssProperty<'container', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * container-name
   * 语法：`none | <custom-ident>+`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/container-name
   */
  readonly containerName: CssProperty<
    'containerName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * container-type
   * 语法：`normal | [ [ size | inline-size ] || scroll-state ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/container-type
   */
  readonly containerType: CssProperty<
    'containerType',
    (typeof keywordGroups)[61],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * contain-intrinsic-block-size
   * 语法：`auto? [ none | <length> ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/contain-intrinsic-block-size
   */
  readonly containIntrinsicBlockSize: CssProperty<
    'containIntrinsicBlockSize',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * contain-intrinsic-height
   * 语法：`auto? [ none | <length> ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/contain-intrinsic-height
   */
  readonly containIntrinsicHeight: CssProperty<
    'containIntrinsicHeight',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * contain-intrinsic-inline-size
   * 语法：`auto? [ none | <length> ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/contain-intrinsic-inline-size
   */
  readonly containIntrinsicInlineSize: CssProperty<
    'containIntrinsicInlineSize',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * contain-intrinsic-size
   * 语法：`[ auto? [ none | <length> ] ]{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/contain-intrinsic-size
   */
  readonly containIntrinsicSize: CssProperty<
    'containIntrinsicSize',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * contain-intrinsic-width
   * 语法：`auto? [ none | <length> ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/contain-intrinsic-width
   */
  readonly containIntrinsicWidth: CssProperty<
    'containIntrinsicWidth',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * content
   * 语法：`normal | none | [ <content-replacement> | <content-list> ] [ / [ <string> | <counter> | <attr()> ]+ ]?`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/content
   */
  readonly content: CssProperty<'content', (typeof keywordGroups)[62], never, 1, '', T, M>;
  /**
   * content-visibility
   * 语法：`visible | auto | hidden`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/content-visibility
   */
  readonly contentVisibility: CssProperty<
    'contentVisibility',
    (typeof keywordGroups)[63],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * counter-increment
   * 语法：`[ <counter-name> <integer>? ]+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/counter-increment
   */
  readonly counterIncrement: CssProperty<
    'counterIncrement',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * counter-reset
   * 语法：`[ <counter-name> <integer>? | <reversed-counter-name> <integer>? ]+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/counter-reset
   */
  readonly counterReset: CssProperty<'counterReset', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * counter-set
   * 语法：`[ <counter-name> <integer>? ]+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/counter-set
   */
  readonly counterSet: CssProperty<'counterSet', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * cursor
   * 语法：`[ [ <url> [ <x> <y> ]? , ]* <cursor-predefined> ]`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/cursor
   */
  readonly cursor: CssProperty<'cursor', (typeof keywordGroups)[64], never, 1, '', T, M>;
  /**
   * cx
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/cx
   */
  readonly cx: CssProperty<'cx', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * cy
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/cy
   */
  readonly cy: CssProperty<'cy', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * d
   * 语法：`none | path(<string>)`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/d
   */
  readonly d: CssProperty<'d', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * direction
   * 语法：`ltr | rtl`
   * 初始值：`ltr`
   * @see https://developer.mozilla.org/docs/Web/CSS/direction
   */
  readonly direction: CssProperty<'direction', (typeof keywordGroups)[65], never, 1, '', T, M>;
  /**
   * 元素的外部布局角色与内部布局方式。
   * 语法：`[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
   * 初始值：`inline`
   * @see https://developer.mozilla.org/docs/Web/CSS/display
   */
  readonly display: CssProperty<'display', (typeof keywordGroups)[66], never, 1, '', T, M>;
  /**
   * dominant-baseline
   * 语法：`auto | text-bottom | alphabetic | ideographic | middle | central | mathematical | hanging | text-top`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/dominant-baseline
   */
  readonly dominantBaseline: CssProperty<
    'dominantBaseline',
    (typeof keywordGroups)[67],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * empty-cells
   * 语法：`show | hide`
   * 初始值：`show`
   * @see https://developer.mozilla.org/docs/Web/CSS/empty-cells
   */
  readonly emptyCells: CssProperty<'emptyCells', (typeof keywordGroups)[68], never, 1, '', T, M>;
  /**
   * field-sizing
   * 语法：`content | fixed`
   * 初始值：`fixed`
   * @see https://developer.mozilla.org/docs/Web/CSS/field-sizing
   */
  readonly fieldSizing: CssProperty<'fieldSizing', (typeof keywordGroups)[69], never, 1, '', T, M>;
  /**
   * fill
   * 主题类别：color（_ 前缀）。
   * 语法：`<paint>`
   * 初始值：`black`
   * @see https://developer.mozilla.org/docs/Web/CSS/fill
   */
  readonly fill: CssProperty<'fill', (typeof keywordGroups)[70], never, 1, 'color', T, M>;
  /**
   * fill-opacity
   * 语法：`<'opacity'>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/fill-opacity
   */
  readonly fillOpacity: CssProperty<'fillOpacity', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * fill-rule
   * 语法：`nonzero | evenodd`
   * 初始值：`nonzero`
   * @see https://developer.mozilla.org/docs/Web/CSS/fill-rule
   */
  readonly fillRule: CssProperty<'fillRule', (typeof keywordGroups)[53], never, 1, '', T, M>;
  /**
   * filter
   * 语法：`none | <filter-value-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/filter
   */
  readonly filter: CssProperty<'filter', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * flex
   * 语法：`none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex
   */
  readonly flex: CssProperty<'flex', (typeof keywordGroups)[71], 'length', 1, '', T, M>;
  /**
   * flex-basis
   * 主题类别：size（_ 前缀）。
   * 语法：`content | <'width'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-basis
   */
  readonly flexBasis: CssProperty<
    'flexBasis',
    (typeof keywordGroups)[72],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * flex-direction
   * 语法：`row | row-reverse | column | column-reverse`
   * 初始值：`row`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-direction
   */
  readonly flexDirection: CssProperty<
    'flexDirection',
    (typeof keywordGroups)[73],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * flex-flow
   * 语法：`<'flex-direction'> || <'flex-wrap'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-flow
   */
  readonly flexFlow: CssProperty<'flexFlow', (typeof keywordGroups)[74], never, 1, '', T, M>;
  /**
   * flex-grow
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-grow
   */
  readonly flexGrow: CssProperty<'flexGrow', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * flex-shrink
   * 语法：`<number>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-shrink
   */
  readonly flexShrink: CssProperty<'flexShrink', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * flex-wrap
   * 语法：`nowrap | wrap | wrap-reverse`
   * 初始值：`nowrap`
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-wrap
   */
  readonly flexWrap: CssProperty<'flexWrap', (typeof keywordGroups)[75], never, 1, '', T, M>;
  /**
   * float
   * 语法：`left | right | none | inline-start | inline-end`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/float
   */
  readonly float: CssProperty<'float', (typeof keywordGroups)[76], never, 1, '', T, M>;
  /**
   * flood-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`black`
   * @see https://developer.mozilla.org/docs/Web/CSS/flood-color
   */
  readonly floodColor: CssProperty<
    'floodColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * flood-opacity
   * 语法：`<'opacity'>`
   * 初始值：`black`
   * @see https://developer.mozilla.org/docs/Web/CSS/flood-opacity
   */
  readonly floodOpacity: CssProperty<'floodOpacity', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * font
   * 语法：`[ [ <'font-style'> || <font-variant-css2> || <'font-weight'> || <font-width-css3> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'># ] | <system-family-name>`
   * @see https://developer.mozilla.org/docs/Web/CSS/font
   */
  readonly font: CssProperty<'font', (typeof keywordGroups)[77], never, 1, '', T, M>;
  /**
   * font-family
   * 主题类别：fontFamily（_ 前缀）。
   * 语法：`[ <family-name> | <generic-family> ]#`
   * 初始值：depends on user agent
   * @see https://developer.mozilla.org/docs/Web/CSS/font-family
   */
  readonly fontFamily: CssProperty<
    'fontFamily',
    (typeof keywordGroups)[78],
    never,
    1,
    'fontFamily',
    T,
    M
  >;
  /**
   * font-feature-settings
   * 语法：`normal | <feature-tag-value>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-feature-settings
   */
  readonly fontFeatureSettings: CssProperty<
    'fontFeatureSettings',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-kerning
   * 语法：`auto | normal | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-kerning
   */
  readonly fontKerning: CssProperty<'fontKerning', (typeof keywordGroups)[79], never, 1, '', T, M>;
  /**
   * font-language-override
   * 语法：`normal | <string>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-language-override
   */
  readonly fontLanguageOverride: CssProperty<
    'fontLanguageOverride',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-optical-sizing
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing
   */
  readonly fontOpticalSizing: CssProperty<
    'fontOpticalSizing',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-palette
   * 语法：`normal | light | dark | <palette-identifier> | <palette-mix()>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-palette
   */
  readonly fontPalette: CssProperty<'fontPalette', (typeof keywordGroups)[57], never, 1, '', T, M>;
  /**
   * font-size
   * 主题类别：fontSize（_ 前缀）。
   * 语法：`<absolute-size> | <relative-size> | <length-percentage [0,∞]> | math`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-size
   */
  readonly fontSize: CssProperty<
    'fontSize',
    (typeof keywordGroups)[80],
    'length',
    1,
    'fontSize',
    T,
    M
  >;
  /**
   * font-size-adjust
   * 语法：`none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number> ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-size-adjust
   */
  readonly fontSizeAdjust: CssProperty<
    'fontSizeAdjust',
    (typeof keywordGroups)[81],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-smooth
   * 语法：`auto | never | always | <absolute-size> | <length>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-smooth
   */
  readonly fontSmooth: CssProperty<'fontSmooth', (typeof keywordGroups)[82], 'length', 1, '', T, M>;
  /**
   * font-stretch
   * 语法：`<font-stretch-absolute>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-stretch
   */
  readonly fontStretch: CssProperty<'fontStretch', (typeof keywordGroups)[83], never, 1, '', T, M>;
  /**
   * font-style
   * 语法：`normal | italic | oblique <angle>?`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-style
   */
  readonly fontStyle: CssProperty<'fontStyle', (typeof keywordGroups)[84], never, 1, '', T, M>;
  /**
   * font-synthesis
   * 语法：`none | [ weight || style || small-caps || position]`
   * 初始值：`weight style small-caps position `
   * @see https://developer.mozilla.org/docs/Web/CSS/font-synthesis
   */
  readonly fontSynthesis: CssProperty<
    'fontSynthesis',
    (typeof keywordGroups)[85],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-synthesis-position
   * 语法：`auto | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-synthesis-position
   */
  readonly fontSynthesisPosition: CssProperty<
    'fontSynthesisPosition',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-synthesis-small-caps
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-synthesis-small-caps
   */
  readonly fontSynthesisSmallCaps: CssProperty<
    'fontSynthesisSmallCaps',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-synthesis-style
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-synthesis-style
   */
  readonly fontSynthesisStyle: CssProperty<
    'fontSynthesisStyle',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-synthesis-weight
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-synthesis-weight
   */
  readonly fontSynthesisWeight: CssProperty<
    'fontSynthesisWeight',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant
   * 语法：`normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant
   */
  readonly fontVariant: CssProperty<'fontVariant', (typeof keywordGroups)[86], never, 1, '', T, M>;
  /**
   * font-variant-alternates
   * 语法：`normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <featu
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates
   */
  readonly fontVariantAlternates: CssProperty<
    'fontVariantAlternates',
    (typeof keywordGroups)[87],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant-caps
   * 语法：`normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-caps
   */
  readonly fontVariantCaps: CssProperty<
    'fontVariantCaps',
    (typeof keywordGroups)[88],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant-east-asian
   * 语法：`normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian
   */
  readonly fontVariantEastAsian: CssProperty<
    'fontVariantEastAsian',
    (typeof keywordGroups)[89],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant-emoji
   * 语法：`normal | text | emoji | unicode`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-emoji
   */
  readonly fontVariantEmoji: CssProperty<
    'fontVariantEmoji',
    (typeof keywordGroups)[90],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant-ligatures
   * 语法：`normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures
   */
  readonly fontVariantLigatures: CssProperty<
    'fontVariantLigatures',
    (typeof keywordGroups)[91],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant-numeric
   * 语法：`normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric
   */
  readonly fontVariantNumeric: CssProperty<
    'fontVariantNumeric',
    (typeof keywordGroups)[92],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variant-position
   * 语法：`normal | sub | super`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variant-position
   */
  readonly fontVariantPosition: CssProperty<
    'fontVariantPosition',
    (typeof keywordGroups)[93],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-variation-settings
   * 语法：`normal | [ <string> <number> ]#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-variation-settings
   */
  readonly fontVariationSettings: CssProperty<
    'fontVariationSettings',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * font-weight
   * 主题类别：fontWeight（_ 前缀）。
   * 语法：`<font-weight-absolute> | bolder | lighter`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-weight
   */
  readonly fontWeight: CssProperty<
    'fontWeight',
    (typeof keywordGroups)[94],
    never,
    1,
    'fontWeight',
    T,
    M
  >;
  /**
   * font-width
   * 语法：`normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/font-width
   */
  readonly fontWidth: CssProperty<'fontWidth', (typeof keywordGroups)[83], never, 1, '', T, M>;
  /**
   * forced-color-adjust
   * 语法：`auto | none | preserve-parent-color`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/forced-color-adjust
   */
  readonly forcedColorAdjust: CssProperty<
    'forcedColorAdjust',
    (typeof keywordGroups)[95],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 网格或弹性布局的行、列间距。
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'row-gap'> <'column-gap'>?`
   * @see https://developer.mozilla.org/docs/Web/CSS/gap
   */
  readonly gap: CssProperty<'gap', (typeof keywordGroups)[59], 'length', 2, 'spacing', T, M>;
  /**
   * glyph-orientation-vertical
   * @see https://developer.mozilla.org/docs/Web/CSS/glyph-orientation-vertical
   */
  readonly glyphOrientationVertical: CssProperty<
    'glyphOrientationVertical',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * grid
   * 语法：`<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid
   */
  readonly grid: CssProperty<'grid', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * grid-area
   * 语法：`<grid-line> [ / <grid-line> ]{0,3}`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-area
   */
  readonly gridArea: CssProperty<'gridArea', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * grid-auto-columns
   * 语法：`<track-size>+`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns
   */
  readonly gridAutoColumns: CssProperty<
    'gridAutoColumns',
    (typeof keywordGroups)[96],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * grid-auto-flow
   * 语法：`[ row | column ] || dense`
   * 初始值：`row`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow
   */
  readonly gridAutoFlow: CssProperty<
    'gridAutoFlow',
    (typeof keywordGroups)[97],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * grid-auto-rows
   * 语法：`<track-size>+`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows
   */
  readonly gridAutoRows: CssProperty<
    'gridAutoRows',
    (typeof keywordGroups)[96],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * grid-column
   * 语法：`<grid-line> [ / <grid-line> ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column
   */
  readonly gridColumn: CssProperty<'gridColumn', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * grid-column-end
   * 语法：`<grid-line>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column-end
   */
  readonly gridColumnEnd: CssProperty<
    'gridColumnEnd',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * grid-column-gap
   * 语法：`<length-percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column-gap
   */
  readonly gridColumnGap: CssProperty<
    'gridColumnGap',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * grid-column-start
   * 语法：`<grid-line>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-column-start
   */
  readonly gridColumnStart: CssProperty<
    'gridColumnStart',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * grid-gap
   * 语法：`<'grid-row-gap'> <'grid-column-gap'>?`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-gap
   */
  readonly gridGap: CssProperty<'gridGap', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * grid-row
   * 语法：`<grid-line> [ / <grid-line> ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row
   */
  readonly gridRow: CssProperty<'gridRow', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * grid-row-end
   * 语法：`<grid-line>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row-end
   */
  readonly gridRowEnd: CssProperty<'gridRowEnd', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * grid-row-gap
   * 语法：`<length-percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row-gap
   */
  readonly gridRowGap: CssProperty<'gridRowGap', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * grid-row-start
   * 语法：`<grid-line>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-row-start
   */
  readonly gridRowStart: CssProperty<
    'gridRowStart',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * grid-template
   * 语法：`none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template
   */
  readonly gridTemplate: CssProperty<'gridTemplate', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * grid-template-areas
   * 语法：`none | <string>+`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template-areas
   */
  readonly gridTemplateAreas: CssProperty<
    'gridTemplateAreas',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * grid-template-columns
   * 语法：`none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template-columns
   */
  readonly gridTemplateColumns: CssProperty<
    'gridTemplateColumns',
    (typeof keywordGroups)[98],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * grid-template-rows
   * 语法：`none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/grid-template-rows
   */
  readonly gridTemplateRows: CssProperty<
    'gridTemplateRows',
    (typeof keywordGroups)[98],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * hanging-punctuation
   * 语法：`none | [ first || [ force-end | allow-end ] || last ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation
   */
  readonly hangingPunctuation: CssProperty<
    'hangingPunctuation',
    (typeof keywordGroups)[99],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 元素的物理高度。
   * 主题类别：size（_ 前缀）。
   * 语法：`auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/height
   */
  readonly height: CssProperty<'height', (typeof keywordGroups)[100], 'length', 1, 'size', T, M>;
  /**
   * hyphenate-character
   * 语法：`auto | <string>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/hyphenate-character
   */
  readonly hyphenateCharacter: CssProperty<
    'hyphenateCharacter',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * hyphenate-limit-chars
   * 语法：`[ auto | <integer> ]{1,3}`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/hyphenate-limit-chars
   */
  readonly hyphenateLimitChars: CssProperty<
    'hyphenateLimitChars',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * hyphens
   * 语法：`none | manual | auto`
   * 初始值：`manual`
   * @see https://developer.mozilla.org/docs/Web/CSS/hyphens
   */
  readonly hyphens: CssProperty<'hyphens', (typeof keywordGroups)[101], never, 1, '', T, M>;
  /**
   * image-orientation
   * 语法：`from-image | <angle> | [ <angle>? flip ]`
   * 初始值：`from-image`
   * @see https://developer.mozilla.org/docs/Web/CSS/image-orientation
   */
  readonly imageOrientation: CssProperty<
    'imageOrientation',
    (typeof keywordGroups)[102],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * image-rendering
   * 语法：`auto | crisp-edges | pixelated | smooth`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/image-rendering
   */
  readonly imageRendering: CssProperty<
    'imageRendering',
    (typeof keywordGroups)[103],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * image-resolution
   * 语法：`[ from-image || <resolution> ] && snap?`
   * 初始值：`1dppx`
   * @see https://developer.mozilla.org/docs/Web/CSS/image-resolution
   */
  readonly imageResolution: CssProperty<
    'imageResolution',
    (typeof keywordGroups)[104],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * ime-mode
   * 语法：`auto | normal | active | inactive | disabled`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/ime-mode
   */
  readonly imeMode: CssProperty<'imeMode', (typeof keywordGroups)[105], never, 1, '', T, M>;
  /**
   * initial-letter
   * 语法：`normal | [ <number> <integer>? ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/initial-letter
   */
  readonly initialLetter: CssProperty<
    'initialLetter',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * initial-letter-align
   * 语法：`[ auto | alphabetic | hanging | ideographic ]`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/initial-letter-align
   */
  readonly initialLetterAlign: CssProperty<
    'initialLetterAlign',
    (typeof keywordGroups)[106],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 元素在行内轴方向上的尺寸。
   * 主题类别：size（_ 前缀）。
   * 语法：`<'width'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/inline-size
   */
  readonly inlineSize: CssProperty<
    'inlineSize',
    (typeof keywordGroups)[107],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * inset
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset
   */
  readonly inset: CssProperty<'inset', (typeof keywordGroups)[11], 'length', 4, 'spacing', T, M>;
  /**
   * inset-area
   * 语法：`none | <position-area>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-area
   */
  readonly insetArea: CssProperty<'insetArea', (typeof keywordGroups)[108], never, 1, '', T, M>;
  /**
   * inset-block
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block
   */
  readonly insetBlock: CssProperty<
    'insetBlock',
    (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /**
   * inset-block-end
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block-end
   */
  readonly insetBlockEnd: CssProperty<
    'insetBlockEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * inset-block-start
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block-start
   */
  readonly insetBlockStart: CssProperty<
    'insetBlockStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * inset-inline
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline
   */
  readonly insetInline: CssProperty<
    'insetInline',
    (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /**
   * inset-inline-end
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline-end
   */
  readonly insetInlineEnd: CssProperty<
    'insetInlineEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * inset-inline-start
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline-start
   */
  readonly insetInlineStart: CssProperty<
    'insetInlineStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * interpolate-size
   * 语法：`numeric-only | allow-keywords`
   * 初始值：`numeric-only`
   * @see https://developer.mozilla.org/docs/Web/CSS/interpolate-size
   */
  readonly interpolateSize: CssProperty<
    'interpolateSize',
    (typeof keywordGroups)[109],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * isolation
   * 语法：`auto | isolate`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/isolation
   */
  readonly isolation: CssProperty<'isolation', (typeof keywordGroups)[110], never, 1, '', T, M>;
  /**
   * justify-content
   * 语法：`normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-content
   */
  readonly justifyContent: CssProperty<
    'justifyContent',
    (typeof keywordGroups)[111],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * justify-items
   * 语法：`normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ] | anchor-center`
   * 初始值：`legacy`
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-items
   */
  readonly justifyItems: CssProperty<
    'justifyItems',
    (typeof keywordGroups)[112],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * justify-self
   * 语法：`auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | anchor-center`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-self
   */
  readonly justifySelf: CssProperty<'justifySelf', (typeof keywordGroups)[113], never, 1, '', T, M>;
  /**
   * justify-tracks
   * 语法：`[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/justify-tracks
   */
  readonly justifyTracks: CssProperty<
    'justifyTracks',
    (typeof keywordGroups)[111],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-align
   * 语法：`start | center | end | baseline | stretch`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-align
   */
  readonly KhtmlBoxAlign: CssProperty<
    'KhtmlBoxAlign',
    (typeof keywordGroups)[39],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-direction
   * 语法：`normal | reverse | inherit`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-direction
   */
  readonly KhtmlBoxDirection: CssProperty<
    'KhtmlBoxDirection',
    (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-flex
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-flex
   */
  readonly KhtmlBoxFlex: CssProperty<'KhtmlBoxFlex', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -khtml-box-flex-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-flex-group
   */
  readonly KhtmlBoxFlexGroup: CssProperty<
    'KhtmlBoxFlexGroup',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-lines
   * 语法：`single | multiple`
   * 初始值：`single`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-lines
   */
  readonly KhtmlBoxLines: CssProperty<
    'KhtmlBoxLines',
    (typeof keywordGroups)[42],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-ordinal-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-ordinal-group
   */
  readonly KhtmlBoxOrdinalGroup: CssProperty<
    'KhtmlBoxOrdinalGroup',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-orient
   * 语法：`horizontal | vertical | inline-axis | block-axis | inherit`
   * 初始值：`inline-axis`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-orient
   */
  readonly KhtmlBoxOrient: CssProperty<
    'KhtmlBoxOrient',
    (typeof keywordGroups)[43],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-box-pack
   * 语法：`start | center | end | justify`
   * 初始值：`start`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-box-pack
   */
  readonly KhtmlBoxPack: CssProperty<
    'KhtmlBoxPack',
    (typeof keywordGroups)[44],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-line-break
   * 语法：`auto | loose | normal | strict | anywhere`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-line-break
   */
  readonly KhtmlLineBreak: CssProperty<
    'KhtmlLineBreak',
    (typeof keywordGroups)[114],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -khtml-opacity
   * 语法：`<opacity-value>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-opacity
   */
  readonly KhtmlOpacity: CssProperty<'KhtmlOpacity', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -khtml-user-select
   * 语法：`auto | text | none | all`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-khtml-user-select
   */
  readonly KhtmlUserSelect: CssProperty<
    'KhtmlUserSelect',
    (typeof keywordGroups)[115],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * left
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage> | <anchor()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/left
   */
  readonly left: CssProperty<'left', (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /**
   * letter-spacing
   * 主题类别：letterSpacing（_ 前缀）。
   * 语法：`normal | <length>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/letter-spacing
   */
  readonly letterSpacing: CssProperty<
    'letterSpacing',
    (typeof keywordGroups)[59],
    'length',
    1,
    'letterSpacing',
    T,
    M
  >;
  /**
   * lighting-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`white`
   * @see https://developer.mozilla.org/docs/Web/CSS/lighting-color
   */
  readonly lightingColor: CssProperty<
    'lightingColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * line-break
   * 语法：`auto | loose | normal | strict | anywhere`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/line-break
   */
  readonly lineBreak: CssProperty<'lineBreak', (typeof keywordGroups)[114], never, 1, '', T, M>;
  /**
   * line-clamp
   * 语法：`none | <integer>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/line-clamp
   */
  readonly lineClamp: CssProperty<'lineClamp', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * line-height
   * 主题类别：lineHeight（_ 前缀）。
   * 语法：`normal | <number> | <length> | <percentage>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/line-height
   */
  readonly lineHeight: CssProperty<
    'lineHeight',
    (typeof keywordGroups)[59],
    'length',
    1,
    'lineHeight',
    T,
    M
  >;
  /**
   * line-height-step
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/line-height-step
   */
  readonly lineHeightStep: CssProperty<
    'lineHeightStep',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * list-style
   * 语法：`<'list-style-type'> || <'list-style-position'> || <'list-style-image'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style
   */
  readonly listStyle: CssProperty<'listStyle', (typeof keywordGroups)[116], never, 1, '', T, M>;
  /**
   * list-style-image
   * 语法：`<image> | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style-image
   */
  readonly listStyleImage: CssProperty<
    'listStyleImage',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * list-style-position
   * 语法：`inside | outside`
   * 初始值：`outside`
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style-position
   */
  readonly listStylePosition: CssProperty<
    'listStylePosition',
    (typeof keywordGroups)[117],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * list-style-type
   * 语法：`<counter-style> | <string> | none`
   * 初始值：`disc`
   * @see https://developer.mozilla.org/docs/Web/CSS/list-style-type
   */
  readonly listStyleType: CssProperty<
    'listStyleType',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 四个物理方向的外边距。
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin
   */
  readonly margin: CssProperty<'margin', (typeof keywordGroups)[11], 'length', 4, 'spacing', T, M>;
  /**
   * margin-block
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block
   */
  readonly marginBlock: CssProperty<
    'marginBlock',
    (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /**
   * margin-block-end
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block-end
   */
  readonly marginBlockEnd: CssProperty<
    'marginBlockEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-block-start
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block-start
   */
  readonly marginBlockStart: CssProperty<
    'marginBlockStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-bottom
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage> | auto | <anchor-size()>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  readonly marginBottom: CssProperty<
    'marginBottom',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-inline
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline
   */
  readonly marginInline: CssProperty<
    'marginInline',
    (typeof keywordGroups)[11],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /**
   * margin-inline-end
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline-end
   */
  readonly marginInlineEnd: CssProperty<
    'marginInlineEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-inline-start
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline-start
   */
  readonly marginInlineStart: CssProperty<
    'marginInlineStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-left
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage> | auto | <anchor-size()>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  readonly marginLeft: CssProperty<
    'marginLeft',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-right
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage> | auto | <anchor-size()>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  readonly marginRight: CssProperty<
    'marginRight',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-top
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage> | auto | <anchor-size()>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  readonly marginTop: CssProperty<
    'marginTop',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * margin-trim
   * 语法：`none | in-flow | all`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-trim
   */
  readonly marginTrim: CssProperty<'marginTrim', (typeof keywordGroups)[118], never, 1, '', T, M>;
  /**
   * marker
   * 语法：`none | <url>`
   * @see https://developer.mozilla.org/docs/Web/CSS/marker
   */
  readonly marker: CssProperty<'marker', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * marker-end
   * 语法：`none | <url>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/marker-end
   */
  readonly markerEnd: CssProperty<'markerEnd', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * marker-mid
   * 语法：`none | <url>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/marker-mid
   */
  readonly markerMid: CssProperty<'markerMid', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * marker-start
   * 语法：`none | <url>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/marker-start
   */
  readonly markerStart: CssProperty<'markerStart', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * mask
   * 语法：`<mask-layer>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask
   */
  readonly mask: CssProperty<'mask', (typeof keywordGroups)[119], 'length', 1, '', T, M>;
  /**
   * mask-border
   * 语法：`<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border
   */
  readonly maskBorder: CssProperty<'maskBorder', (typeof keywordGroups)[120], never, 1, '', T, M>;
  /**
   * mask-border-mode
   * 语法：`luminance | alpha`
   * 初始值：`alpha`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border-mode
   */
  readonly maskBorderMode: CssProperty<
    'maskBorderMode',
    (typeof keywordGroups)[121],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * mask-border-outset
   * 语法：`[ <length> | <number> ]{1,4}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border-outset
   */
  readonly maskBorderOutset: CssProperty<
    'maskBorderOutset',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * mask-border-repeat
   * 语法：`[ stretch | repeat | round | space ]{1,2}`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border-repeat
   */
  readonly maskBorderRepeat: CssProperty<
    'maskBorderRepeat',
    (typeof keywordGroups)[38],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * mask-border-slice
   * 语法：`<number-percentage>{1,4} fill?`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border-slice
   */
  readonly maskBorderSlice: CssProperty<
    'maskBorderSlice',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * mask-border-source
   * 语法：`none | <image>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border-source
   */
  readonly maskBorderSource: CssProperty<
    'maskBorderSource',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * mask-border-width
   * 语法：`[ <length-percentage> | <number> | auto ]{1,4}`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-border-width
   */
  readonly maskBorderWidth: CssProperty<
    'maskBorderWidth',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * mask-clip
   * 语法：`[ <coord-box> | no-clip ]#`
   * 初始值：`border-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-clip
   */
  readonly maskClip: CssProperty<'maskClip', (typeof keywordGroups)[122], never, 1, '', T, M>;
  /**
   * mask-composite
   * 语法：`<compositing-operator>#`
   * 初始值：`add`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-composite
   */
  readonly maskComposite: CssProperty<
    'maskComposite',
    (typeof keywordGroups)[123],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * mask-image
   * 语法：`<mask-reference>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-image
   */
  readonly maskImage: CssProperty<'maskImage', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * mask-mode
   * 语法：`<masking-mode>#`
   * 初始值：`match-source`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-mode
   */
  readonly maskMode: CssProperty<'maskMode', (typeof keywordGroups)[124], never, 1, '', T, M>;
  /**
   * mask-origin
   * 语法：`<coord-box>#`
   * 初始值：`border-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-origin
   */
  readonly maskOrigin: CssProperty<'maskOrigin', (typeof keywordGroups)[125], never, 1, '', T, M>;
  /**
   * mask-position
   * 语法：`<position>#`
   * 初始值：`0% 0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-position
   */
  readonly maskPosition: CssProperty<
    'maskPosition',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * mask-repeat
   * 语法：`<repeat-style>#`
   * 初始值：`repeat`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-repeat
   */
  readonly maskRepeat: CssProperty<'maskRepeat', (typeof keywordGroups)[29], never, 1, '', T, M>;
  /**
   * mask-size
   * 语法：`<bg-size>#`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-size
   */
  readonly maskSize: CssProperty<'maskSize', (typeof keywordGroups)[30], 'length', 1, '', T, M>;
  /**
   * mask-type
   * 语法：`luminance | alpha`
   * 初始值：`luminance`
   * @see https://developer.mozilla.org/docs/Web/CSS/mask-type
   */
  readonly maskType: CssProperty<'maskType', (typeof keywordGroups)[121], never, 1, '', T, M>;
  /**
   * masonry-auto-flow
   * 语法：`[ pack | next ] || [ definite-first | ordered ]`
   * 初始值：`pack`
   * @see https://developer.mozilla.org/docs/Web/CSS/masonry-auto-flow
   */
  readonly masonryAutoFlow: CssProperty<
    'masonryAutoFlow',
    (typeof keywordGroups)[126],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * math-depth
   * 语法：`auto-add | add(<integer>) | <integer>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/math-depth
   */
  readonly mathDepth: CssProperty<'mathDepth', (typeof keywordGroups)[127], never, 1, '', T, M>;
  /**
   * math-shift
   * 语法：`normal | compact`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/math-shift
   */
  readonly mathShift: CssProperty<'mathShift', (typeof keywordGroups)[128], never, 1, '', T, M>;
  /**
   * math-style
   * 语法：`normal | compact`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/math-style
   */
  readonly mathStyle: CssProperty<'mathStyle', (typeof keywordGroups)[128], never, 1, '', T, M>;
  /**
   * 块轴方向的最大尺寸。
   * 主题类别：size（_ 前缀）。
   * 语法：`<'max-width'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/max-block-size
   */
  readonly maxBlockSize: CssProperty<
    'maxBlockSize',
    (typeof keywordGroups)[129],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * max-height
   * 主题类别：size（_ 前缀）。
   * 语法：`none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/max-height
   */
  readonly maxHeight: CssProperty<
    'maxHeight',
    (typeof keywordGroups)[130],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * 行内轴方向的最大尺寸。
   * 主题类别：size（_ 前缀）。
   * 语法：`<'max-width'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/max-inline-size
   */
  readonly maxInlineSize: CssProperty<
    'maxInlineSize',
    (typeof keywordGroups)[131],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * max-lines
   * 语法：`none | <integer>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/max-lines
   */
  readonly maxLines: CssProperty<'maxLines', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * max-width
   * 主题类别：size（_ 前缀）。
   * 语法：`none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/max-width
   */
  readonly maxWidth: CssProperty<
    'maxWidth',
    (typeof keywordGroups)[130],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * 块轴方向的最小尺寸。
   * 主题类别：size（_ 前缀）。
   * 语法：`<'min-width'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/min-block-size
   */
  readonly minBlockSize: CssProperty<
    'minBlockSize',
    (typeof keywordGroups)[132],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * min-height
   * 主题类别：size（_ 前缀）。
   * 语法：`auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/min-height
   */
  readonly minHeight: CssProperty<
    'minHeight',
    (typeof keywordGroups)[133],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * 行内轴方向的最小尺寸。
   * 主题类别：size（_ 前缀）。
   * 语法：`<'min-width'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/min-inline-size
   */
  readonly minInlineSize: CssProperty<
    'minInlineSize',
    (typeof keywordGroups)[107],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * min-width
   * 主题类别：size（_ 前缀）。
   * 语法：`auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/min-width
   */
  readonly minWidth: CssProperty<
    'minWidth',
    (typeof keywordGroups)[134],
    'length',
    1,
    'size',
    T,
    M
  >;
  /**
   * mix-blend-mode
   * 语法：`<blend-mode> | plus-darker | plus-lighter`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode
   */
  readonly mixBlendMode: CssProperty<
    'mixBlendMode',
    (typeof keywordGroups)[135],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * motion
   * 语法：`[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/motion
   */
  readonly motion: CssProperty<'motion', (typeof keywordGroups)[136], 'length', 1, '', T, M>;
  /**
   * motion-distance
   * 语法：`<length-percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/motion-distance
   */
  readonly motionDistance: CssProperty<
    'motionDistance',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * motion-path
   * 语法：`none | <offset-path> || <coord-box>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/motion-path
   */
  readonly motionPath: CssProperty<'motionPath', (typeof keywordGroups)[137], never, 1, '', T, M>;
  /**
   * motion-rotation
   * 语法：`[ auto | reverse ] || <angle>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/motion-rotation
   */
  readonly motionRotation: CssProperty<
    'motionRotation',
    (typeof keywordGroups)[138],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation
   * 语法：`<single-animation>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation
   */
  readonly MozAnimation: CssProperty<
    'MozAnimation',
    (typeof keywordGroups)[8],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-delay
   */
  readonly MozAnimationDelay: CssProperty<
    'MozAnimationDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-direction
   * 语法：`<single-animation-direction>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-direction
   */
  readonly MozAnimationDirection: CssProperty<
    'MozAnimationDirection',
    (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-duration
   * 语法：`[ auto | <time [0s,∞]> ]#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-duration
   */
  readonly MozAnimationDuration: CssProperty<
    'MozAnimationDuration',
    (typeof keywordGroups)[11],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-fill-mode
   * 语法：`<single-animation-fill-mode>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-fill-mode
   */
  readonly MozAnimationFillMode: CssProperty<
    'MozAnimationFillMode',
    (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-iteration-count
   * 语法：`<single-animation-iteration-count>#`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-iteration-count
   */
  readonly MozAnimationIterationCount: CssProperty<
    'MozAnimationIterationCount',
    (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-name
   * 语法：`[ none | <keyframes-name> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-name
   */
  readonly MozAnimationName: CssProperty<
    'MozAnimationName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-play-state
   * 语法：`<single-animation-play-state>#`
   * 初始值：`running`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-play-state
   */
  readonly MozAnimationPlayState: CssProperty<
    'MozAnimationPlayState',
    (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-animation-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-animation-timing-function
   */
  readonly MozAnimationTimingFunction: CssProperty<
    'MozAnimationTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-appearance
   * 语法：`none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | list
   * 初始值：`none` (but this value is overridden in the user agent CSS)
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-appearance
   */
  readonly MozAppearance: CssProperty<
    'MozAppearance',
    (typeof keywordGroups)[139],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-backface-visibility
   * 语法：`visible | hidden`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-backface-visibility
   */
  readonly MozBackfaceVisibility: CssProperty<
    'MozBackfaceVisibility',
    (typeof keywordGroups)[19],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-background-clip
   * 语法：`<bg-clip>#`
   * 初始值：`border-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-background-clip
   */
  readonly MozBackgroundClip: CssProperty<
    'MozBackgroundClip',
    (typeof keywordGroups)[23],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-background-origin
   * 语法：`<visual-box>#`
   * 初始值：`padding-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-background-origin
   */
  readonly MozBackgroundOrigin: CssProperty<
    'MozBackgroundOrigin',
    (typeof keywordGroups)[25],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-background-size
   * 语法：`<bg-size>#`
   * 初始值：`auto auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-background-size
   */
  readonly MozBackgroundSize: CssProperty<
    'MozBackgroundSize',
    (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-binding
   * 语法：`<url> | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-binding
   */
  readonly MozBinding: CssProperty<'MozBinding', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -moz-border-bottom-colors
   * 语法：`<color>+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors
   */
  readonly MozBorderBottomColors: CssProperty<
    'MozBorderBottomColors',
    (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-end-color
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-end-color
   */
  readonly MozBorderEndColor: CssProperty<
    'MozBorderEndColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-end-style
   * 语法：`<'border-top-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-end-style
   */
  readonly MozBorderEndStyle: CssProperty<
    'MozBorderEndStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-end-width
   * 语法：`<'border-top-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-end-width
   */
  readonly MozBorderEndWidth: CssProperty<
    'MozBorderEndWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-image
   * 语法：`<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-image
   */
  readonly MozBorderImage: CssProperty<
    'MozBorderImage',
    (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-left-colors
   * 语法：`<color>+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors
   */
  readonly MozBorderLeftColors: CssProperty<
    'MozBorderLeftColors',
    (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-radius
   * 语法：`<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-radius
   */
  readonly MozBorderRadius: CssProperty<
    'MozBorderRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-radius-bottomleft
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-radius-bottomleft
   */
  readonly MozBorderRadiusBottomleft: CssProperty<
    'MozBorderRadiusBottomleft',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-radius-bottomright
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-radius-bottomright
   */
  readonly MozBorderRadiusBottomright: CssProperty<
    'MozBorderRadiusBottomright',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-radius-topleft
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-radius-topleft
   */
  readonly MozBorderRadiusTopleft: CssProperty<
    'MozBorderRadiusTopleft',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-radius-topright
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-radius-topright
   */
  readonly MozBorderRadiusTopright: CssProperty<
    'MozBorderRadiusTopright',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-right-colors
   * 语法：`<color>+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors
   */
  readonly MozBorderRightColors: CssProperty<
    'MozBorderRightColors',
    (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-start-color
   * 语法：`<'border-top-color'>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-start-color
   */
  readonly MozBorderStartColor: CssProperty<
    'MozBorderStartColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-start-style
   * 语法：`<'border-top-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-start-style
   */
  readonly MozBorderStartStyle: CssProperty<
    'MozBorderStartStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-border-top-colors
   * 语法：`<color>+ | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors
   */
  readonly MozBorderTopColors: CssProperty<
    'MozBorderTopColors',
    (typeof keywordGroups)[140],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-box-align
   * 语法：`start | center | end | baseline | stretch`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-align
   */
  readonly MozBoxAlign: CssProperty<'MozBoxAlign', (typeof keywordGroups)[39], never, 1, '', T, M>;
  /**
   * -moz-box-direction
   * 语法：`normal | reverse | inherit`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-direction
   */
  readonly MozBoxDirection: CssProperty<
    'MozBoxDirection',
    (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-box-flex
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-flex
   */
  readonly MozBoxFlex: CssProperty<'MozBoxFlex', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -moz-box-ordinal-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-ordinal-group
   */
  readonly MozBoxOrdinalGroup: CssProperty<
    'MozBoxOrdinalGroup',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-box-orient
   * 语法：`horizontal | vertical | inline-axis | block-axis | inherit`
   * 初始值：`inline-axis`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-orient
   */
  readonly MozBoxOrient: CssProperty<
    'MozBoxOrient',
    (typeof keywordGroups)[43],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-box-pack
   * 语法：`start | center | end | justify`
   * 初始值：`start`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-pack
   */
  readonly MozBoxPack: CssProperty<'MozBoxPack', (typeof keywordGroups)[44], never, 1, '', T, M>;
  /**
   * -moz-box-shadow
   * 语法：`none | <shadow>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-shadow
   */
  readonly MozBoxShadow: CssProperty<'MozBoxShadow', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -moz-box-sizing
   * 语法：`content-box | border-box`
   * 初始值：`content-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-box-sizing
   */
  readonly MozBoxSizing: CssProperty<
    'MozBoxSizing',
    (typeof keywordGroups)[45],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-column-count
   * 语法：`<integer> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-count
   */
  readonly MozColumnCount: CssProperty<
    'MozColumnCount',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-column-fill
   * 语法：`auto | balance`
   * 初始值：`balance`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-fill
   */
  readonly MozColumnFill: CssProperty<
    'MozColumnFill',
    (typeof keywordGroups)[58],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-column-rule
   * 语法：`<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-rule
   */
  readonly MozColumnRule: CssProperty<
    'MozColumnRule',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-column-rule-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-rule-color
   */
  readonly MozColumnRuleColor: CssProperty<
    'MozColumnRuleColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-column-rule-style
   * 语法：`<'border-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-rule-style
   */
  readonly MozColumnRuleStyle: CssProperty<
    'MozColumnRuleStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-column-rule-width
   * 语法：`<'border-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-rule-width
   */
  readonly MozColumnRuleWidth: CssProperty<
    'MozColumnRuleWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-columns
   * 语法：`<'column-width'> || <'column-count'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-columns
   */
  readonly MozColumns: CssProperty<'MozColumns', (typeof keywordGroups)[11], 'length', 1, '', T, M>;
  /**
   * -moz-column-width
   * 语法：`<length> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-column-width
   */
  readonly MozColumnWidth: CssProperty<
    'MozColumnWidth',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-context-properties
   * 语法：`none | [ fill | fill-opacity | stroke | stroke-opacity ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-context-properties
   */
  readonly MozContextProperties: CssProperty<
    'MozContextProperties',
    (typeof keywordGroups)[141],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-float-edge
   * 语法：`border-box | content-box | margin-box | padding-box`
   * 初始值：`content-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge
   */
  readonly MozFloatEdge: CssProperty<
    'MozFloatEdge',
    (typeof keywordGroups)[142],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-font-feature-settings
   * 语法：`normal | <feature-tag-value>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-font-feature-settings
   */
  readonly MozFontFeatureSettings: CssProperty<
    'MozFontFeatureSettings',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-font-language-override
   * 语法：`normal | <string>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-font-language-override
   */
  readonly MozFontLanguageOverride: CssProperty<
    'MozFontLanguageOverride',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-force-broken-image-icon
   * 语法：`0 | 1`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon
   */
  readonly MozForceBrokenImageIcon: CssProperty<
    'MozForceBrokenImageIcon',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-hyphens
   * 语法：`none | manual | auto`
   * 初始值：`manual`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-hyphens
   */
  readonly MozHyphens: CssProperty<'MozHyphens', (typeof keywordGroups)[101], never, 1, '', T, M>;
  /**
   * -moz-margin-end
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-margin-end
   */
  readonly MozMarginEnd: CssProperty<
    'MozMarginEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-margin-start
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-margin-start
   */
  readonly MozMarginStart: CssProperty<
    'MozMarginStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-opacity
   * 语法：`<opacity-value>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-opacity
   */
  readonly MozOpacity: CssProperty<'MozOpacity', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -moz-orient
   * 语法：`inline | block | horizontal | vertical`
   * 初始值：`inline`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-orient
   */
  readonly MozOrient: CssProperty<'MozOrient', (typeof keywordGroups)[143], never, 1, '', T, M>;
  /**
   * -moz-osx-font-smoothing
   * 语法：`auto | never | always | <absolute-size> | <length>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-osx-font-smoothing
   */
  readonly MozOsxFontSmoothing: CssProperty<
    'MozOsxFontSmoothing',
    (typeof keywordGroups)[82],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline
   * 语法：`<'outline-width'> || <'outline-style'> || <'outline-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline
   */
  readonly MozOutline: CssProperty<
    'MozOutline',
    (typeof keywordGroups)[144],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-color
   * 语法：`auto | <color>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-color
   */
  readonly MozOutlineColor: CssProperty<
    'MozOutlineColor',
    (typeof keywordGroups)[0],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-radius
   * 语法：`<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius
   */
  readonly MozOutlineRadius: CssProperty<
    'MozOutlineRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-radius-bottomleft
   * 语法：`<outline-radius>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomleft
   */
  readonly MozOutlineRadiusBottomleft: CssProperty<
    'MozOutlineRadiusBottomleft',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-radius-bottomright
   * 语法：`<outline-radius>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright
   */
  readonly MozOutlineRadiusBottomright: CssProperty<
    'MozOutlineRadiusBottomright',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-radius-topleft
   * 语法：`<outline-radius>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topleft
   */
  readonly MozOutlineRadiusTopleft: CssProperty<
    'MozOutlineRadiusTopleft',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-radius-topright
   * 语法：`<outline-radius>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topright
   */
  readonly MozOutlineRadiusTopright: CssProperty<
    'MozOutlineRadiusTopright',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-style
   * 语法：`auto | <outline-line-style>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-style
   */
  readonly MozOutlineStyle: CssProperty<
    'MozOutlineStyle',
    (typeof keywordGroups)[145],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-outline-width
   * 语法：`<line-width>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-outline-width
   */
  readonly MozOutlineWidth: CssProperty<
    'MozOutlineWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-padding-end
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-padding-end
   */
  readonly MozPaddingEnd: CssProperty<
    'MozPaddingEnd',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-padding-start
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-padding-start
   */
  readonly MozPaddingStart: CssProperty<
    'MozPaddingStart',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-perspective
   * 语法：`none | <length>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-perspective
   */
  readonly MozPerspective: CssProperty<
    'MozPerspective',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-perspective-origin
   * 语法：`<position>`
   * 初始值：`50% 50%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-perspective-origin
   */
  readonly MozPerspectiveOrigin: CssProperty<
    'MozPerspectiveOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-stack-sizing
   * 语法：`ignore | stretch-to-fit`
   * 初始值：`stretch-to-fit`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-stack-sizing
   */
  readonly MozStackSizing: CssProperty<
    'MozStackSizing',
    (typeof keywordGroups)[146],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-tab-size
   * 语法：`<integer> | <length>`
   * 初始值：`8`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-tab-size
   */
  readonly MozTabSize: CssProperty<'MozTabSize', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * -moz-text-align-last
   * 语法：`auto | start | end | left | right | center | justify`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-text-align-last
   */
  readonly MozTextAlignLast: CssProperty<
    'MozTextAlignLast',
    (typeof keywordGroups)[147],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-text-blink
   * 语法：`none | blink`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-text-blink
   */
  readonly MozTextBlink: CssProperty<
    'MozTextBlink',
    (typeof keywordGroups)[148],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-text-decoration-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-text-decoration-color
   */
  readonly MozTextDecorationColor: CssProperty<
    'MozTextDecorationColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-text-decoration-line
   * 语法：`none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-text-decoration-line
   */
  readonly MozTextDecorationLine: CssProperty<
    'MozTextDecorationLine',
    (typeof keywordGroups)[149],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-text-decoration-style
   * 语法：`solid | double | dotted | dashed | wavy`
   * 初始值：`solid`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-text-decoration-style
   */
  readonly MozTextDecorationStyle: CssProperty<
    'MozTextDecorationStyle',
    (typeof keywordGroups)[150],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-text-size-adjust
   * 语法：`none | auto | <percentage>`
   * 初始值：`auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-text-size-adjust
   */
  readonly MozTextSizeAdjust: CssProperty<
    'MozTextSizeAdjust',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transform
   * 语法：`none | <transform-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transform
   */
  readonly MozTransform: CssProperty<'MozTransform', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -moz-transform-origin
   * 语法：`[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   * 初始值：`50% 50% 0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transform-origin
   */
  readonly MozTransformOrigin: CssProperty<
    'MozTransformOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transform-style
   * 语法：`flat | preserve-3d`
   * 初始值：`flat`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transform-style
   */
  readonly MozTransformStyle: CssProperty<
    'MozTransformStyle',
    (typeof keywordGroups)[151],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transition
   * 语法：`<single-transition>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transition
   */
  readonly MozTransition: CssProperty<
    'MozTransition',
    (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transition-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transition-delay
   */
  readonly MozTransitionDelay: CssProperty<
    'MozTransitionDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transition-duration
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transition-duration
   */
  readonly MozTransitionDuration: CssProperty<
    'MozTransitionDuration',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transition-property
   * 语法：`none | <single-transition-property>#`
   * 初始值：all
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transition-property
   */
  readonly MozTransitionProperty: CssProperty<
    'MozTransitionProperty',
    (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-transition-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-transition-timing-function
   */
  readonly MozTransitionTimingFunction: CssProperty<
    'MozTransitionTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-user-focus
   * 语法：`ignore | normal | select-after | select-before | select-menu | select-same | select-all | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-user-focus
   */
  readonly MozUserFocus: CssProperty<
    'MozUserFocus',
    (typeof keywordGroups)[153],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-user-input
   * 语法：`auto | none | enabled | disabled`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-user-input
   */
  readonly MozUserInput: CssProperty<
    'MozUserInput',
    (typeof keywordGroups)[154],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-user-modify
   * 语法：`read-only | read-write | write-only`
   * 初始值：`read-only`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-user-modify
   */
  readonly MozUserModify: CssProperty<
    'MozUserModify',
    (typeof keywordGroups)[155],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-user-select
   * 语法：`auto | text | none | all`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-user-select
   */
  readonly MozUserSelect: CssProperty<
    'MozUserSelect',
    (typeof keywordGroups)[115],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-window-dragging
   * 语法：`drag | no-drag`
   * 初始值：`drag`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-window-dragging
   */
  readonly MozWindowDragging: CssProperty<
    'MozWindowDragging',
    (typeof keywordGroups)[156],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -moz-window-shadow
   * 语法：`default | menu | tooltip | sheet | none`
   * 初始值：`default`
   * @see https://developer.mozilla.org/docs/Web/CSS/-moz-window-shadow
   */
  readonly MozWindowShadow: CssProperty<
    'MozWindowShadow',
    (typeof keywordGroups)[157],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-accelerator
   * 语法：`false | true`
   * 初始值：`false`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-accelerator
   */
  readonly msAccelerator: CssProperty<
    'msAccelerator',
    (typeof keywordGroups)[158],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-block-progression
   * 语法：`tb | rl | bt | lr`
   * 初始值：`tb`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-block-progression
   */
  readonly msBlockProgression: CssProperty<
    'msBlockProgression',
    (typeof keywordGroups)[159],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-chaining
   * 语法：`none | chained`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-chaining
   */
  readonly msContentZoomChaining: CssProperty<
    'msContentZoomChaining',
    (typeof keywordGroups)[160],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zooming
   * 语法：`none | zoom`
   * 初始值：zoom for the top level element, none for all other elements
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zooming
   */
  readonly msContentZooming: CssProperty<
    'msContentZooming',
    (typeof keywordGroups)[161],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-limit
   * 语法：`<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit
   */
  readonly msContentZoomLimit: CssProperty<
    'msContentZoomLimit',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-limit-max
   * 语法：`<percentage>`
   * 初始值：`400%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-max
   */
  readonly msContentZoomLimitMax: CssProperty<
    'msContentZoomLimitMax',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-limit-min
   * 语法：`<percentage>`
   * 初始值：`100%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-min
   */
  readonly msContentZoomLimitMin: CssProperty<
    'msContentZoomLimitMin',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-snap
   * 语法：`<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap
   */
  readonly msContentZoomSnap: CssProperty<
    'msContentZoomSnap',
    (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-snap-points
   * 语法：`snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )`
   * 初始值：`snapInterval(0%, 100%)`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-points
   */
  readonly msContentZoomSnapPoints: CssProperty<
    'msContentZoomSnapPoints',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-content-zoom-snap-type
   * 语法：`none | proximity | mandatory`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-type
   */
  readonly msContentZoomSnapType: CssProperty<
    'msContentZoomSnapType',
    (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-filter
   * 语法：`<string>`
   * 初始值："" (the empty string)
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-filter
   */
  readonly msFilter: CssProperty<'msFilter', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -ms-flex
   * 语法：`none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-flex
   */
  readonly msFlex: CssProperty<'msFlex', (typeof keywordGroups)[71], 'length', 1, '', T, M>;
  /**
   * -ms-flex-direction
   * 语法：`row | row-reverse | column | column-reverse`
   * 初始值：`row`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-flex-direction
   */
  readonly msFlexDirection: CssProperty<
    'msFlexDirection',
    (typeof keywordGroups)[73],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-flex-positive
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-flex-positive
   */
  readonly msFlexPositive: CssProperty<
    'msFlexPositive',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-flow-from
   * 语法：`[ none | <custom-ident> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-flow-from
   */
  readonly msFlowFrom: CssProperty<'msFlowFrom', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -ms-flow-into
   * 语法：`[ none | <custom-ident> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-flow-into
   */
  readonly msFlowInto: CssProperty<'msFlowInto', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -ms-grid-columns
   * 语法：`none | <track-list> | <auto-track-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-grid-columns
   */
  readonly msGridColumns: CssProperty<
    'msGridColumns',
    (typeof keywordGroups)[163],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-grid-rows
   * 语法：`none | <track-list> | <auto-track-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-grid-rows
   */
  readonly msGridRows: CssProperty<
    'msGridRows',
    (typeof keywordGroups)[163],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-high-contrast-adjust
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-high-contrast-adjust
   */
  readonly msHighContrastAdjust: CssProperty<
    'msHighContrastAdjust',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-hyphenate-limit-chars
   * 语法：`auto | <integer>{1,3}`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-chars
   */
  readonly msHyphenateLimitChars: CssProperty<
    'msHyphenateLimitChars',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-hyphenate-limit-lines
   * 语法：`no-limit | <integer>`
   * 初始值：`no-limit`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-lines
   */
  readonly msHyphenateLimitLines: CssProperty<
    'msHyphenateLimitLines',
    (typeof keywordGroups)[164],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-hyphenate-limit-zone
   * 语法：`<percentage> | <length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-zone
   */
  readonly msHyphenateLimitZone: CssProperty<
    'msHyphenateLimitZone',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-hyphens
   * 语法：`none | manual | auto`
   * 初始值：`manual`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-hyphens
   */
  readonly msHyphens: CssProperty<'msHyphens', (typeof keywordGroups)[101], never, 1, '', T, M>;
  /**
   * -ms-ime-align
   * 语法：`auto | after`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-ime-align
   */
  readonly msImeAlign: CssProperty<'msImeAlign', (typeof keywordGroups)[165], never, 1, '', T, M>;
  /**
   * -ms-ime-mode
   * 语法：`auto | normal | active | inactive | disabled`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-ime-mode
   */
  readonly msImeMode: CssProperty<'msImeMode', (typeof keywordGroups)[105], never, 1, '', T, M>;
  /**
   * -ms-line-break
   * 语法：`auto | loose | normal | strict | anywhere`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-line-break
   */
  readonly msLineBreak: CssProperty<'msLineBreak', (typeof keywordGroups)[114], never, 1, '', T, M>;
  /**
   * -ms-order
   * 语法：`<integer>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-order
   */
  readonly msOrder: CssProperty<'msOrder', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -ms-overflow-style
   * 语法：`auto | none | scrollbar | -ms-autohiding-scrollbar`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-overflow-style
   */
  readonly msOverflowStyle: CssProperty<
    'msOverflowStyle',
    (typeof keywordGroups)[166],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-overflow-x
   * 语法：`visible | hidden | clip | scroll | auto`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-overflow-x
   */
  readonly msOverflowX: CssProperty<'msOverflowX', (typeof keywordGroups)[167], never, 1, '', T, M>;
  /**
   * -ms-overflow-y
   * 语法：`visible | hidden | clip | scroll | auto`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-overflow-y
   */
  readonly msOverflowY: CssProperty<'msOverflowY', (typeof keywordGroups)[167], never, 1, '', T, M>;
  /**
   * -ms-scrollbar3dlight-color
   * 语法：`<color>`
   * 初始值：depends on user agent
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar3dlight-color
   */
  readonly msScrollbar3dlightColor: CssProperty<
    'msScrollbar3dlightColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-arrow-color
   * 语法：`<color>`
   * 初始值：`ButtonText`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-arrow-color
   */
  readonly msScrollbarArrowColor: CssProperty<
    'msScrollbarArrowColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-base-color
   * 语法：`<color>`
   * 初始值：depends on user agent
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-base-color
   */
  readonly msScrollbarBaseColor: CssProperty<
    'msScrollbarBaseColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-darkshadow-color
   * 语法：`<color>`
   * 初始值：`ThreeDDarkShadow`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-darkshadow-color
   */
  readonly msScrollbarDarkshadowColor: CssProperty<
    'msScrollbarDarkshadowColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-face-color
   * 语法：`<color>`
   * 初始值：`ThreeDFace`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-face-color
   */
  readonly msScrollbarFaceColor: CssProperty<
    'msScrollbarFaceColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-highlight-color
   * 语法：`<color>`
   * 初始值：`ThreeDHighlight`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-highlight-color
   */
  readonly msScrollbarHighlightColor: CssProperty<
    'msScrollbarHighlightColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-shadow-color
   * 语法：`<color>`
   * 初始值：`ThreeDDarkShadow`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-shadow-color
   */
  readonly msScrollbarShadowColor: CssProperty<
    'msScrollbarShadowColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scrollbar-track-color
   * 语法：`<color>`
   * 初始值：`Scrollbar`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-track-color
   */
  readonly msScrollbarTrackColor: CssProperty<
    'msScrollbarTrackColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-chaining
   * 语法：`chained | none`
   * 初始值：`chained`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-chaining
   */
  readonly msScrollChaining: CssProperty<
    'msScrollChaining',
    (typeof keywordGroups)[160],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-limit
   * 语法：`<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit
   */
  readonly msScrollLimit: CssProperty<
    'msScrollLimit',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-limit-x-max
   * 语法：`auto | <length>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-max
   */
  readonly msScrollLimitXMax: CssProperty<
    'msScrollLimitXMax',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-limit-x-min
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-min
   */
  readonly msScrollLimitXMin: CssProperty<
    'msScrollLimitXMin',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-limit-y-max
   * 语法：`auto | <length>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-max
   */
  readonly msScrollLimitYMax: CssProperty<
    'msScrollLimitYMax',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-limit-y-min
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-min
   */
  readonly msScrollLimitYMin: CssProperty<
    'msScrollLimitYMin',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-rails
   * 语法：`none | railed`
   * 初始值：`railed`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-rails
   */
  readonly msScrollRails: CssProperty<
    'msScrollRails',
    (typeof keywordGroups)[168],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-snap-points-x
   * 语法：`snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   * 初始值：`snapInterval(0px, 100%)`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-x
   */
  readonly msScrollSnapPointsX: CssProperty<
    'msScrollSnapPointsX',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-snap-points-y
   * 语法：`snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   * 初始值：`snapInterval(0px, 100%)`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-y
   */
  readonly msScrollSnapPointsY: CssProperty<
    'msScrollSnapPointsY',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-snap-type
   * 语法：`none | proximity | mandatory`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-type
   */
  readonly msScrollSnapType: CssProperty<
    'msScrollSnapType',
    (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-snap-x
   * 语法：`<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-x
   */
  readonly msScrollSnapX: CssProperty<
    'msScrollSnapX',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-snap-y
   * 语法：`<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-y
   */
  readonly msScrollSnapY: CssProperty<
    'msScrollSnapY',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-scroll-translation
   * 语法：`none | vertical-to-horizontal`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-translation
   */
  readonly msScrollTranslation: CssProperty<
    'msScrollTranslation',
    (typeof keywordGroups)[169],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-text-autospace
   * 语法：`none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-text-autospace
   */
  readonly msTextAutospace: CssProperty<
    'msTextAutospace',
    (typeof keywordGroups)[170],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-text-combine-horizontal
   * 语法：`none | all | [ digits <integer>? ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-text-combine-horizontal
   */
  readonly msTextCombineHorizontal: CssProperty<
    'msTextCombineHorizontal',
    (typeof keywordGroups)[171],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-text-overflow
   * 语法：`[ clip | ellipsis | <string> ]{1,2}`
   * 初始值：`clip`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-text-overflow
   */
  readonly msTextOverflow: CssProperty<
    'msTextOverflow',
    (typeof keywordGroups)[172],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-touch-action
   * 语法：`auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-touch-action
   */
  readonly msTouchAction: CssProperty<
    'msTouchAction',
    (typeof keywordGroups)[173],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-touch-select
   * 语法：`grippers | none`
   * 初始值：`grippers`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-touch-select
   */
  readonly msTouchSelect: CssProperty<
    'msTouchSelect',
    (typeof keywordGroups)[174],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-transform
   * 语法：`none | <transform-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transform
   */
  readonly msTransform: CssProperty<'msTransform', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -ms-transform-origin
   * 语法：`[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   * 初始值：`50% 50% 0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transform-origin
   */
  readonly msTransformOrigin: CssProperty<
    'msTransformOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-transition
   * 语法：`<single-transition>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transition
   */
  readonly msTransition: CssProperty<
    'msTransition',
    (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-transition-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transition-delay
   */
  readonly msTransitionDelay: CssProperty<
    'msTransitionDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-transition-duration
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transition-duration
   */
  readonly msTransitionDuration: CssProperty<
    'msTransitionDuration',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-transition-property
   * 语法：`none | <single-transition-property>#`
   * 初始值：all
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transition-property
   */
  readonly msTransitionProperty: CssProperty<
    'msTransitionProperty',
    (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-transition-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-transition-timing-function
   */
  readonly msTransitionTimingFunction: CssProperty<
    'msTransitionTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-user-select
   * 语法：`none | element | text`
   * 初始值：`text`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-user-select
   */
  readonly msUserSelect: CssProperty<
    'msUserSelect',
    (typeof keywordGroups)[175],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-word-break
   * 语法：`normal | break-all | keep-all | break-word | auto-phrase`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-word-break
   */
  readonly msWordBreak: CssProperty<'msWordBreak', (typeof keywordGroups)[176], never, 1, '', T, M>;
  /**
   * -ms-wrap-flow
   * 语法：`auto | both | start | end | maximum | clear`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-flow
   */
  readonly msWrapFlow: CssProperty<'msWrapFlow', (typeof keywordGroups)[177], never, 1, '', T, M>;
  /**
   * -ms-wrap-margin
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-margin
   */
  readonly msWrapMargin: CssProperty<
    'msWrapMargin',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-wrap-through
   * 语法：`wrap | none`
   * 初始值：`wrap`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-through
   */
  readonly msWrapThrough: CssProperty<
    'msWrapThrough',
    (typeof keywordGroups)[178],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -ms-writing-mode
   * 语法：`horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   * 初始值：`horizontal-tb`
   * @see https://developer.mozilla.org/docs/Web/CSS/-ms-writing-mode
   */
  readonly msWritingMode: CssProperty<
    'msWritingMode',
    (typeof keywordGroups)[179],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation
   * 语法：`<single-animation>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation
   */
  readonly OAnimation: CssProperty<'OAnimation', (typeof keywordGroups)[8], 'time', 1, '', T, M>;
  /**
   * -o-animation-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-delay
   */
  readonly OAnimationDelay: CssProperty<
    'OAnimationDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-direction
   * 语法：`<single-animation-direction>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-direction
   */
  readonly OAnimationDirection: CssProperty<
    'OAnimationDirection',
    (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-duration
   * 语法：`[ auto | <time [0s,∞]> ]#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-duration
   */
  readonly OAnimationDuration: CssProperty<
    'OAnimationDuration',
    (typeof keywordGroups)[11],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-fill-mode
   * 语法：`<single-animation-fill-mode>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-fill-mode
   */
  readonly OAnimationFillMode: CssProperty<
    'OAnimationFillMode',
    (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-iteration-count
   * 语法：`<single-animation-iteration-count>#`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-iteration-count
   */
  readonly OAnimationIterationCount: CssProperty<
    'OAnimationIterationCount',
    (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-name
   * 语法：`[ none | <keyframes-name> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-name
   */
  readonly OAnimationName: CssProperty<
    'OAnimationName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-play-state
   * 语法：`<single-animation-play-state>#`
   * 初始值：`running`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-play-state
   */
  readonly OAnimationPlayState: CssProperty<
    'OAnimationPlayState',
    (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-animation-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-animation-timing-function
   */
  readonly OAnimationTimingFunction: CssProperty<
    'OAnimationTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-background-size
   * 语法：`<bg-size>#`
   * 初始值：`auto auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-background-size
   */
  readonly OBackgroundSize: CssProperty<
    'OBackgroundSize',
    (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * object-fit
   * 语法：`fill | contain | cover | none | scale-down`
   * 初始值：`fill`
   * @see https://developer.mozilla.org/docs/Web/CSS/object-fit
   */
  readonly objectFit: CssProperty<'objectFit', (typeof keywordGroups)[180], never, 1, '', T, M>;
  /**
   * object-position
   * 语法：`<position>`
   * 初始值：`50% 50%`
   * @see https://developer.mozilla.org/docs/Web/CSS/object-position
   */
  readonly objectPosition: CssProperty<
    'objectPosition',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * object-view-box
   * 语法：`none | <basic-shape-rect>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/object-view-box
   */
  readonly objectViewBox: CssProperty<
    'objectViewBox',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-border-image
   * 语法：`<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-border-image
   */
  readonly OBorderImage: CssProperty<
    'OBorderImage',
    (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * offset
   * 语法：`[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset
   */
  readonly offset: CssProperty<'offset', (typeof keywordGroups)[136], 'length', 1, '', T, M>;
  /**
   * offset-anchor
   * 语法：`auto | <position>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-anchor
   */
  readonly offsetAnchor: CssProperty<
    'offsetAnchor',
    (typeof keywordGroups)[181],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-block
   * 语法：`<'top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-block
   */
  readonly offsetBlock: CssProperty<
    'offsetBlock',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-block-end
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-block-end
   */
  readonly offsetBlockEnd: CssProperty<
    'offsetBlockEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-block-start
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-block-start
   */
  readonly offsetBlockStart: CssProperty<
    'offsetBlockStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-distance
   * 语法：`<length-percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-distance
   */
  readonly offsetDistance: CssProperty<
    'offsetDistance',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-inline
   * 语法：`<'top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-inline
   */
  readonly offsetInline: CssProperty<
    'offsetInline',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-inline-end
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-inline-end
   */
  readonly offsetInlineEnd: CssProperty<
    'offsetInlineEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-inline-start
   * 语法：`<'top'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-inline-start
   */
  readonly offsetInlineStart: CssProperty<
    'offsetInlineStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-path
   * 语法：`none | <offset-path> || <coord-box>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-path
   */
  readonly offsetPath: CssProperty<'offsetPath', (typeof keywordGroups)[137], never, 1, '', T, M>;
  /**
   * offset-position
   * 语法：`normal | auto | <position>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-position
   */
  readonly offsetPosition: CssProperty<
    'offsetPosition',
    (typeof keywordGroups)[182],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * offset-rotate
   * 语法：`[ auto | reverse ] || <angle>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-rotate
   */
  readonly offsetRotate: CssProperty<
    'offsetRotate',
    (typeof keywordGroups)[138],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * offset-rotation
   * 语法：`[ auto | reverse ] || <angle>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/offset-rotation
   */
  readonly offsetRotation: CssProperty<
    'offsetRotation',
    (typeof keywordGroups)[138],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-object-fit
   * 语法：`fill | contain | cover | none | scale-down`
   * 初始值：`fill`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-object-fit
   */
  readonly OObjectFit: CssProperty<'OObjectFit', (typeof keywordGroups)[180], never, 1, '', T, M>;
  /**
   * -o-object-position
   * 语法：`<position>`
   * 初始值：`50% 50%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-object-position
   */
  readonly OObjectPosition: CssProperty<
    'OObjectPosition',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * 元素整体的不透明度，通常为 0–1。
   * 主题类别：opacity（_ 前缀）。
   * 语法：`<opacity-value>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/opacity
   */
  readonly opacity: CssProperty<'opacity', (typeof keywordGroups)[5], never, 1, 'opacity', T, M>;
  /**
   * order
   * 语法：`<integer>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/order
   */
  readonly order: CssProperty<'order', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * orphans
   * 语法：`<integer>`
   * 初始值：`2`
   * @see https://developer.mozilla.org/docs/Web/CSS/orphans
   */
  readonly orphans: CssProperty<'orphans', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -o-tab-size
   * 语法：`<integer> | <length>`
   * 初始值：`8`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-tab-size
   */
  readonly OTabSize: CssProperty<'OTabSize', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * -o-text-overflow
   * 语法：`[ clip | ellipsis | <string> ]{1,2}`
   * 初始值：`clip`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-text-overflow
   */
  readonly OTextOverflow: CssProperty<
    'OTextOverflow',
    (typeof keywordGroups)[172],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-transform
   * 语法：`none | <transform-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transform
   */
  readonly OTransform: CssProperty<'OTransform', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -o-transform-origin
   * 语法：`[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   * 初始值：`50% 50% 0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transform-origin
   */
  readonly OTransformOrigin: CssProperty<
    'OTransformOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -o-transition
   * 语法：`<single-transition>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transition
   */
  readonly OTransition: CssProperty<
    'OTransition',
    (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -o-transition-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transition-delay
   */
  readonly OTransitionDelay: CssProperty<
    'OTransitionDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -o-transition-duration
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transition-duration
   */
  readonly OTransitionDuration: CssProperty<
    'OTransitionDuration',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -o-transition-property
   * 语法：`none | <single-transition-property>#`
   * 初始值：all
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transition-property
   */
  readonly OTransitionProperty: CssProperty<
    'OTransitionProperty',
    (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -o-transition-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-o-transition-timing-function
   */
  readonly OTransitionTimingFunction: CssProperty<
    'OTransitionTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * outline
   * 语法：`<'outline-width'> || <'outline-style'> || <'outline-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/outline
   */
  readonly outline: CssProperty<'outline', (typeof keywordGroups)[144], 'length', 1, '', T, M>;
  /**
   * outline-color
   * 主题类别：color（_ 前缀）。
   * 语法：`auto | <color>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-color
   */
  readonly outlineColor: CssProperty<
    'outlineColor',
    (typeof keywordGroups)[0],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * outline-offset
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-offset
   */
  readonly outlineOffset: CssProperty<
    'outlineOffset',
    (typeof keywordGroups)[5],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /**
   * outline-style
   * 语法：`auto | <outline-line-style>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-style
   */
  readonly outlineStyle: CssProperty<
    'outlineStyle',
    (typeof keywordGroups)[145],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * outline-width
   * 主题类别：borderWidth（_ 前缀）。
   * 语法：`<line-width>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-width
   */
  readonly outlineWidth: CssProperty<
    'outlineWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    'borderWidth',
    T,
    M
  >;
  /**
   * 内容溢出元素盒时的处理方式。
   * 语法：`[ visible | hidden | clip | scroll | auto ]{1,2}`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow
   */
  readonly overflow: CssProperty<'overflow', (typeof keywordGroups)[167], never, 1, '', T, M>;
  /**
   * overflow-anchor
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-anchor
   */
  readonly overflowAnchor: CssProperty<
    'overflowAnchor',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overflow-block
   * 语法：`visible | hidden | clip | scroll | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-block
   */
  readonly overflowBlock: CssProperty<
    'overflowBlock',
    (typeof keywordGroups)[183],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overflow-clip-box
   * 语法：`padding-box | content-box`
   * 初始值：`padding-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-clip-box
   */
  readonly overflowClipBox: CssProperty<
    'overflowClipBox',
    (typeof keywordGroups)[184],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overflow-clip-margin
   * 语法：`<visual-box> || <length [0,∞]>`
   * 初始值：`0px`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-clip-margin
   */
  readonly overflowClipMargin: CssProperty<
    'overflowClipMargin',
    (typeof keywordGroups)[25],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * overflow-inline
   * 语法：`visible | hidden | clip | scroll | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-inline
   */
  readonly overflowInline: CssProperty<
    'overflowInline',
    (typeof keywordGroups)[183],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overflow-wrap
   * 语法：`normal | break-word | anywhere`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-wrap
   */
  readonly overflowWrap: CssProperty<
    'overflowWrap',
    (typeof keywordGroups)[185],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overflow-x
   * 语法：`visible | hidden | clip | scroll | auto`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-x
   */
  readonly overflowX: CssProperty<'overflowX', (typeof keywordGroups)[167], never, 1, '', T, M>;
  /**
   * overflow-y
   * 语法：`visible | hidden | clip | scroll | auto`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/overflow-y
   */
  readonly overflowY: CssProperty<'overflowY', (typeof keywordGroups)[167], never, 1, '', T, M>;
  /**
   * overlay
   * 语法：`none | auto`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/overlay
   */
  readonly overlay: CssProperty<'overlay', (typeof keywordGroups)[16], never, 1, '', T, M>;
  /**
   * overscroll-behavior
   * 语法：`[ contain | none | auto ]{1,2}`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior
   */
  readonly overscrollBehavior: CssProperty<
    'overscrollBehavior',
    (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overscroll-behavior-block
   * 语法：`contain | none | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-block
   */
  readonly overscrollBehaviorBlock: CssProperty<
    'overscrollBehaviorBlock',
    (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overscroll-behavior-inline
   * 语法：`contain | none | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-inline
   */
  readonly overscrollBehaviorInline: CssProperty<
    'overscrollBehaviorInline',
    (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overscroll-behavior-x
   * 语法：`contain | none | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x
   */
  readonly overscrollBehaviorX: CssProperty<
    'overscrollBehaviorX',
    (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * overscroll-behavior-y
   * 语法：`contain | none | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y
   */
  readonly overscrollBehaviorY: CssProperty<
    'overscrollBehaviorY',
    (typeof keywordGroups)[186],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 四个物理方向的内边距。
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding
   */
  readonly padding: CssProperty<'padding', (typeof keywordGroups)[5], 'length', 4, 'spacing', T, M>;
  /**
   * 块轴起点与终点的内边距。
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block
   */
  readonly paddingBlock: CssProperty<
    'paddingBlock',
    (typeof keywordGroups)[5],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /**
   * padding-block-end
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block-end
   */
  readonly paddingBlockEnd: CssProperty<
    'paddingBlockEnd',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * padding-block-start
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block-start
   */
  readonly paddingBlockStart: CssProperty<
    'paddingBlockStart',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * padding-bottom
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  readonly paddingBottom: CssProperty<
    'paddingBottom',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * 行内轴起点与终点的内边距。
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline
   */
  readonly paddingInline: CssProperty<
    'paddingInline',
    (typeof keywordGroups)[5],
    'length',
    2,
    'spacing',
    T,
    M
  >;
  /**
   * padding-inline-end
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline-end
   */
  readonly paddingInlineEnd: CssProperty<
    'paddingInlineEnd',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * padding-inline-start
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline-start
   */
  readonly paddingInlineStart: CssProperty<
    'paddingInlineStart',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * padding-left
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  readonly paddingLeft: CssProperty<
    'paddingLeft',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * padding-right
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  readonly paddingRight: CssProperty<
    'paddingRight',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * padding-top
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage [0,∞]>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  readonly paddingTop: CssProperty<
    'paddingTop',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * page
   * 语法：`auto | <custom-ident>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/page
   */
  readonly page: CssProperty<'page', (typeof keywordGroups)[11], never, 1, '', T, M>;
  /**
   * page-break-after
   * 语法：`auto | always | avoid | left | right | recto | verso`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/page-break-after
   */
  readonly pageBreakAfter: CssProperty<
    'pageBreakAfter',
    (typeof keywordGroups)[187],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * page-break-before
   * 语法：`auto | always | avoid | left | right | recto | verso`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/page-break-before
   */
  readonly pageBreakBefore: CssProperty<
    'pageBreakBefore',
    (typeof keywordGroups)[187],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * page-break-inside
   * 语法：`auto | avoid`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/page-break-inside
   */
  readonly pageBreakInside: CssProperty<
    'pageBreakInside',
    (typeof keywordGroups)[188],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * paint-order
   * 语法：`normal | [ fill || stroke || markers ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/paint-order
   */
  readonly paintOrder: CssProperty<'paintOrder', (typeof keywordGroups)[189], never, 1, '', T, M>;
  /**
   * perspective
   * 语法：`none | <length>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/perspective
   */
  readonly perspective: CssProperty<
    'perspective',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * perspective-origin
   * 语法：`<position>`
   * 初始值：`50% 50%`
   * @see https://developer.mozilla.org/docs/Web/CSS/perspective-origin
   */
  readonly perspectiveOrigin: CssProperty<
    'perspectiveOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * place-content
   * 语法：`<'align-content'> <'justify-content'>?`
   * @see https://developer.mozilla.org/docs/Web/CSS/place-content
   */
  readonly placeContent: CssProperty<'placeContent', (typeof keywordGroups)[1], never, 1, '', T, M>;
  /**
   * place-items
   * 语法：`<'align-items'> <'justify-items'>?`
   * @see https://developer.mozilla.org/docs/Web/CSS/place-items
   */
  readonly placeItems: CssProperty<'placeItems', (typeof keywordGroups)[2], never, 1, '', T, M>;
  /**
   * place-self
   * 语法：`<'align-self'> <'justify-self'>?`
   * @see https://developer.mozilla.org/docs/Web/CSS/place-self
   */
  readonly placeSelf: CssProperty<'placeSelf', (typeof keywordGroups)[4], never, 1, '', T, M>;
  /**
   * pointer-events
   * 语法：`auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/pointer-events
   */
  readonly pointerEvents: CssProperty<
    'pointerEvents',
    (typeof keywordGroups)[190],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * 元素的定位方式。
   * 语法：`static | relative | absolute | sticky | fixed`
   * 初始值：`static`
   * @see https://developer.mozilla.org/docs/Web/CSS/position
   */
  readonly position: CssProperty<'position', (typeof keywordGroups)[191], never, 1, '', T, M>;
  /**
   * position-anchor
   * 语法：`auto | <anchor-name>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-anchor
   */
  readonly positionAnchor: CssProperty<
    'positionAnchor',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * position-area
   * 语法：`none | <position-area>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-area
   */
  readonly positionArea: CssProperty<
    'positionArea',
    (typeof keywordGroups)[108],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * position-try
   * 语法：`<'position-try-order'>? <'position-try-fallbacks'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-try
   */
  readonly positionTry: CssProperty<'positionTry', (typeof keywordGroups)[192], never, 1, '', T, M>;
  /**
   * position-try-fallbacks
   * 语法：`none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-try-fallbacks
   */
  readonly positionTryFallbacks: CssProperty<
    'positionTryFallbacks',
    (typeof keywordGroups)[192],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * position-try-options
   * 语法：`none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-try-options
   */
  readonly positionTryOptions: CssProperty<
    'positionTryOptions',
    (typeof keywordGroups)[192],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * position-try-order
   * 语法：`normal | <try-size>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-try-order
   */
  readonly positionTryOrder: CssProperty<
    'positionTryOrder',
    (typeof keywordGroups)[193],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * position-visibility
   * 语法：`always | [ anchors-valid || anchors-visible || no-overflow ]`
   * 初始值：`anchors-visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/position-visibility
   */
  readonly positionVisibility: CssProperty<
    'positionVisibility',
    (typeof keywordGroups)[194],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * print-color-adjust
   * 语法：`economy | exact`
   * 初始值：`economy`
   * @see https://developer.mozilla.org/docs/Web/CSS/print-color-adjust
   */
  readonly printColorAdjust: CssProperty<
    'printColorAdjust',
    (typeof keywordGroups)[54],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * quotes
   * 语法：`none | auto | [ <string> <string> ]+`
   * 初始值：depends on user agent
   * @see https://developer.mozilla.org/docs/Web/CSS/quotes
   */
  readonly quotes: CssProperty<'quotes', (typeof keywordGroups)[16], never, 1, '', T, M>;
  /**
   * r
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/r
   */
  readonly r: CssProperty<'r', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * resize
   * 语法：`none | both | horizontal | vertical | block | inline`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/resize
   */
  readonly resize: CssProperty<'resize', (typeof keywordGroups)[195], never, 1, '', T, M>;
  /**
   * right
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage> | <anchor()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/right
   */
  readonly right: CssProperty<'right', (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /**
   * rotate
   * 语法：`none | <angle> | [ x | y | z | <number>{3} ] && <angle>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/rotate
   */
  readonly rotate: CssProperty<'rotate', (typeof keywordGroups)[6], 'angle', 1, '', T, M>;
  /**
   * row-gap
   * 主题类别：spacing（_ 前缀）。
   * 语法：`normal | <length-percentage>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  readonly rowGap: CssProperty<'rowGap', (typeof keywordGroups)[59], 'length', 1, 'spacing', T, M>;
  /**
   * ruby-align
   * 语法：`start | center | space-between | space-around`
   * 初始值：`space-around`
   * @see https://developer.mozilla.org/docs/Web/CSS/ruby-align
   */
  readonly rubyAlign: CssProperty<'rubyAlign', (typeof keywordGroups)[196], never, 1, '', T, M>;
  /**
   * ruby-merge
   * 语法：`separate | collapse | auto`
   * 初始值：`separate`
   * @see https://developer.mozilla.org/docs/Web/CSS/ruby-merge
   */
  readonly rubyMerge: CssProperty<'rubyMerge', (typeof keywordGroups)[197], never, 1, '', T, M>;
  /**
   * ruby-overhang
   * 语法：`auto | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/ruby-overhang
   */
  readonly rubyOverhang: CssProperty<
    'rubyOverhang',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * ruby-position
   * 语法：`[ alternate || [ over | under ] ] | inter-character`
   * 初始值：`alternate`
   * @see https://developer.mozilla.org/docs/Web/CSS/ruby-position
   */
  readonly rubyPosition: CssProperty<
    'rubyPosition',
    (typeof keywordGroups)[198],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * rx
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/rx
   */
  readonly rx: CssProperty<'rx', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * ry
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/ry
   */
  readonly ry: CssProperty<'ry', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * scale
   * 语法：`none | [ <number> | <percentage> ]{1,3}`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scale
   */
  readonly scale: CssProperty<'scale', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * scrollbar-color
   * 语法：`auto | <color>{2}`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scrollbar-color
   */
  readonly scrollbarColor: CssProperty<
    'scrollbarColor',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scrollbar-gutter
   * 语法：`auto | stable && both-edges?`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scrollbar-gutter
   */
  readonly scrollbarGutter: CssProperty<
    'scrollbarGutter',
    (typeof keywordGroups)[199],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scrollbar-width
   * 语法：`auto | thin | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scrollbar-width
   */
  readonly scrollbarWidth: CssProperty<
    'scrollbarWidth',
    (typeof keywordGroups)[200],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-behavior
   * 语法：`auto | smooth`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-behavior
   */
  readonly scrollBehavior: CssProperty<
    'scrollBehavior',
    (typeof keywordGroups)[201],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-initial-target
   * 语法：`none | nearest`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-initial-target
   */
  readonly scrollInitialTarget: CssProperty<
    'scrollInitialTarget',
    (typeof keywordGroups)[202],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin
   */
  readonly scrollMargin: CssProperty<
    'scrollMargin',
    (typeof keywordGroups)[5],
    'length',
    4,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-margin-block
   * 语法：`<length>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block
   */
  readonly scrollMarginBlock: CssProperty<
    'scrollMarginBlock',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin-block-end
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end
   */
  readonly scrollMarginBlockEnd: CssProperty<
    'scrollMarginBlockEnd',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin-block-start
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start
   */
  readonly scrollMarginBlockStart: CssProperty<
    'scrollMarginBlockStart',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin-bottom
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom
   */
  readonly scrollMarginBottom: CssProperty<
    'scrollMarginBottom',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-margin-inline
   * 语法：`<length>{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline
   */
  readonly scrollMarginInline: CssProperty<
    'scrollMarginInline',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin-inline-end
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end
   */
  readonly scrollMarginInlineEnd: CssProperty<
    'scrollMarginInlineEnd',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin-inline-start
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start
   */
  readonly scrollMarginInlineStart: CssProperty<
    'scrollMarginInlineStart',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-margin-left
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left
   */
  readonly scrollMarginLeft: CssProperty<
    'scrollMarginLeft',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-margin-right
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right
   */
  readonly scrollMarginRight: CssProperty<
    'scrollMarginRight',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-margin-top
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top
   */
  readonly scrollMarginTop: CssProperty<
    'scrollMarginTop',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-padding
   * 主题类别：spacing（_ 前缀）。
   * 语法：`[ auto | <length-percentage> ]{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding
   */
  readonly scrollPadding: CssProperty<
    'scrollPadding',
    (typeof keywordGroups)[11],
    'length',
    4,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-padding-block
   * 语法：`[ auto | <length-percentage> ]{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block
   */
  readonly scrollPaddingBlock: CssProperty<
    'scrollPaddingBlock',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-padding-block-end
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end
   */
  readonly scrollPaddingBlockEnd: CssProperty<
    'scrollPaddingBlockEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-padding-block-start
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start
   */
  readonly scrollPaddingBlockStart: CssProperty<
    'scrollPaddingBlockStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-padding-bottom
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom
   */
  readonly scrollPaddingBottom: CssProperty<
    'scrollPaddingBottom',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-padding-inline
   * 语法：`[ auto | <length-percentage> ]{1,2}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline
   */
  readonly scrollPaddingInline: CssProperty<
    'scrollPaddingInline',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-padding-inline-end
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end
   */
  readonly scrollPaddingInlineEnd: CssProperty<
    'scrollPaddingInlineEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-padding-inline-start
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start
   */
  readonly scrollPaddingInlineStart: CssProperty<
    'scrollPaddingInlineStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-padding-left
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left
   */
  readonly scrollPaddingLeft: CssProperty<
    'scrollPaddingLeft',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-padding-right
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right
   */
  readonly scrollPaddingRight: CssProperty<
    'scrollPaddingRight',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-padding-top
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top
   */
  readonly scrollPaddingTop: CssProperty<
    'scrollPaddingTop',
    (typeof keywordGroups)[11],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * scroll-snap-align
   * 语法：`[ none | start | end | center ]{1,2}`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align
   */
  readonly scrollSnapAlign: CssProperty<
    'scrollSnapAlign',
    (typeof keywordGroups)[203],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-coordinate
   * 语法：`none | <position>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate
   */
  readonly scrollSnapCoordinate: CssProperty<
    'scrollSnapCoordinate',
    (typeof keywordGroups)[204],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-destination
   * 语法：`<position>`
   * 初始值：`0px 0px`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination
   */
  readonly scrollSnapDestination: CssProperty<
    'scrollSnapDestination',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-margin
   * 语法：`<length>{1,4}`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-margin
   */
  readonly scrollSnapMargin: CssProperty<
    'scrollSnapMargin',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-margin-bottom
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-margin-bottom
   */
  readonly scrollSnapMarginBottom: CssProperty<
    'scrollSnapMarginBottom',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-margin-left
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-margin-left
   */
  readonly scrollSnapMarginLeft: CssProperty<
    'scrollSnapMarginLeft',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-margin-right
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-margin-right
   */
  readonly scrollSnapMarginRight: CssProperty<
    'scrollSnapMarginRight',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-margin-top
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-margin-top
   */
  readonly scrollSnapMarginTop: CssProperty<
    'scrollSnapMarginTop',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-points-x
   * 语法：`none | repeat( <length-percentage> )`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x
   */
  readonly scrollSnapPointsX: CssProperty<
    'scrollSnapPointsX',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-points-y
   * 语法：`none | repeat( <length-percentage> )`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y
   */
  readonly scrollSnapPointsY: CssProperty<
    'scrollSnapPointsY',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-stop
   * 语法：`normal | always`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop
   */
  readonly scrollSnapStop: CssProperty<
    'scrollSnapStop',
    (typeof keywordGroups)[205],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-type
   * 语法：`none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type
   */
  readonly scrollSnapType: CssProperty<
    'scrollSnapType',
    (typeof keywordGroups)[206],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-type-x
   * 语法：`none | mandatory | proximity`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x
   */
  readonly scrollSnapTypeX: CssProperty<
    'scrollSnapTypeX',
    (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-snap-type-y
   * 语法：`none | mandatory | proximity`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y
   */
  readonly scrollSnapTypeY: CssProperty<
    'scrollSnapTypeY',
    (typeof keywordGroups)[162],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-timeline
   * 语法：`[ <'scroll-timeline-name'> <'scroll-timeline-axis'>? ]#`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-timeline
   */
  readonly scrollTimeline: CssProperty<
    'scrollTimeline',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-timeline-axis
   * 语法：`[ block | inline | x | y ]#`
   * 初始值：`block`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-timeline-axis
   */
  readonly scrollTimelineAxis: CssProperty<
    'scrollTimelineAxis',
    (typeof keywordGroups)[207],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * scroll-timeline-name
   * 语法：`[ none | <dashed-ident> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/scroll-timeline-name
   */
  readonly scrollTimelineName: CssProperty<
    'scrollTimelineName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * shape-image-threshold
   * 语法：`<opacity-value>`
   * 初始值：`0.0`
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold
   */
  readonly shapeImageThreshold: CssProperty<
    'shapeImageThreshold',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * shape-margin
   * 语法：`<length-percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-margin
   */
  readonly shapeMargin: CssProperty<
    'shapeMargin',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * shape-outside
   * 语法：`none | [ <shape-box> || <basic-shape> ] | <image>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-outside
   */
  readonly shapeOutside: CssProperty<
    'shapeOutside',
    (typeof keywordGroups)[208],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * shape-rendering
   * 语法：`auto | optimizeSpeed | crispEdges | geometricPrecision`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/shape-rendering
   */
  readonly shapeRendering: CssProperty<
    'shapeRendering',
    (typeof keywordGroups)[209],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * speak-as
   * 语法：`normal | spell-out || digits || [ literal-punctuation | no-punctuation ]`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/speak-as
   */
  readonly speakAs: CssProperty<'speakAs', (typeof keywordGroups)[210], never, 1, '', T, M>;
  /**
   * stop-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<'color'>`
   * 初始值：`black`
   * @see https://developer.mozilla.org/docs/Web/CSS/stop-color
   */
  readonly stopColor: CssProperty<'stopColor', (typeof keywordGroups)[24], never, 1, 'color', T, M>;
  /**
   * stop-opacity
   * 语法：`<'opacity'>`
   * 初始值：`black`
   * @see https://developer.mozilla.org/docs/Web/CSS/stop-opacity
   */
  readonly stopOpacity: CssProperty<'stopOpacity', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * stroke
   * 主题类别：color（_ 前缀）。
   * 语法：`<paint>`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke
   */
  readonly stroke: CssProperty<'stroke', (typeof keywordGroups)[70], never, 1, 'color', T, M>;
  /**
   * stroke-color
   * 语法：`<color>`
   * 初始值：`transparent`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-color
   */
  readonly strokeColor: CssProperty<'strokeColor', (typeof keywordGroups)[24], never, 1, '', T, M>;
  /**
   * stroke-dasharray
   * 语法：`none | <dasharray>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-dasharray
   */
  readonly strokeDasharray: CssProperty<
    'strokeDasharray',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * stroke-dashoffset
   * 语法：`<length-percentage> | <number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-dashoffset
   */
  readonly strokeDashoffset: CssProperty<
    'strokeDashoffset',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * stroke-linecap
   * 语法：`butt | round | square`
   * 初始值：`butt`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-linecap
   */
  readonly strokeLinecap: CssProperty<
    'strokeLinecap',
    (typeof keywordGroups)[211],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * stroke-linejoin
   * 语法：`miter | miter-clip | round | bevel | arcs`
   * 初始值：`miter`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-linejoin
   */
  readonly strokeLinejoin: CssProperty<
    'strokeLinejoin',
    (typeof keywordGroups)[212],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * stroke-miterlimit
   * 语法：`<number>`
   * 初始值：`4`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-miterlimit
   */
  readonly strokeMiterlimit: CssProperty<
    'strokeMiterlimit',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * stroke-opacity
   * 语法：`<'opacity'>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-opacity
   */
  readonly strokeOpacity: CssProperty<
    'strokeOpacity',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * stroke-width
   * 语法：`<length-percentage> | <number>`
   * 初始值：`1px`
   * @see https://developer.mozilla.org/docs/Web/CSS/stroke-width
   */
  readonly strokeWidth: CssProperty<
    'strokeWidth',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * table-layout
   * 语法：`auto | fixed`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/table-layout
   */
  readonly tableLayout: CssProperty<'tableLayout', (typeof keywordGroups)[213], never, 1, '', T, M>;
  /**
   * tab-size
   * 语法：`<integer> | <length>`
   * 初始值：`8`
   * @see https://developer.mozilla.org/docs/Web/CSS/tab-size
   */
  readonly tabSize: CssProperty<'tabSize', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * text-align
   * 语法：`start | end | left | right | center | justify | match-parent`
   * 初始值：`start`, or a nameless value that acts as `left` if _direction_ is `ltr`, `right` if _direction_ is `rtl` if `start` is not supported by the browser.
   * @see https://developer.mozilla.org/docs/Web/CSS/text-align
   */
  readonly textAlign: CssProperty<'textAlign', (typeof keywordGroups)[214], never, 1, '', T, M>;
  /**
   * text-align-last
   * 语法：`auto | start | end | left | right | center | justify`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-align-last
   */
  readonly textAlignLast: CssProperty<
    'textAlignLast',
    (typeof keywordGroups)[147],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-anchor
   * 语法：`start | middle | end`
   * 初始值：`start`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-anchor
   */
  readonly textAnchor: CssProperty<'textAnchor', (typeof keywordGroups)[215], never, 1, '', T, M>;
  /**
   * text-autospace
   * 语法：`normal | <autospace> | auto`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-autospace
   */
  readonly textAutospace: CssProperty<
    'textAutospace',
    (typeof keywordGroups)[216],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-box
   * 语法：`normal | <'text-box-trim'> || <'text-box-edge'>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-box
   */
  readonly textBox: CssProperty<'textBox', (typeof keywordGroups)[217], never, 1, '', T, M>;
  /**
   * text-box-edge
   * 语法：`auto | <text-edge>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-box-edge
   */
  readonly textBoxEdge: CssProperty<'textBoxEdge', (typeof keywordGroups)[218], never, 1, '', T, M>;
  /**
   * text-box-trim
   * 语法：`none | trim-start | trim-end | trim-both`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-box-trim
   */
  readonly textBoxTrim: CssProperty<'textBoxTrim', (typeof keywordGroups)[219], never, 1, '', T, M>;
  /**
   * text-combine-upright
   * 语法：`none | all | [ digits <integer>? ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-combine-upright
   */
  readonly textCombineUpright: CssProperty<
    'textCombineUpright',
    (typeof keywordGroups)[171],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-decoration
   * 语法：`<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration
   */
  readonly textDecoration: CssProperty<
    'textDecoration',
    (typeof keywordGroups)[220],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * text-decoration-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-color
   */
  readonly textDecorationColor: CssProperty<
    'textDecorationColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * text-decoration-line
   * 语法：`none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-line
   */
  readonly textDecorationLine: CssProperty<
    'textDecorationLine',
    (typeof keywordGroups)[149],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-decoration-skip
   * 语法：`none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   * 初始值：`objects`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip
   */
  readonly textDecorationSkip: CssProperty<
    'textDecorationSkip',
    (typeof keywordGroups)[221],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-decoration-skip-ink
   * 语法：`auto | all | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink
   */
  readonly textDecorationSkipInk: CssProperty<
    'textDecorationSkipInk',
    (typeof keywordGroups)[222],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-decoration-style
   * 语法：`solid | double | dotted | dashed | wavy`
   * 初始值：`solid`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-style
   */
  readonly textDecorationStyle: CssProperty<
    'textDecorationStyle',
    (typeof keywordGroups)[150],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-decoration-thickness
   * 语法：`auto | from-font | <length> | <percentage> `
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness
   */
  readonly textDecorationThickness: CssProperty<
    'textDecorationThickness',
    (typeof keywordGroups)[223],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * text-emphasis
   * 语法：`<'text-emphasis-style'> || <'text-emphasis-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis
   */
  readonly textEmphasis: CssProperty<
    'textEmphasis',
    (typeof keywordGroups)[224],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-emphasis-color
   * 主题类别：color（_ 前缀）。
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color
   */
  readonly textEmphasisColor: CssProperty<
    'textEmphasisColor',
    (typeof keywordGroups)[24],
    never,
    1,
    'color',
    T,
    M
  >;
  /**
   * text-emphasis-position
   * 语法：`auto | [ over | under ] && [ right | left ]?`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position
   */
  readonly textEmphasisPosition: CssProperty<
    'textEmphasisPosition',
    (typeof keywordGroups)[225],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-emphasis-style
   * 语法：`none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style
   */
  readonly textEmphasisStyle: CssProperty<
    'textEmphasisStyle',
    (typeof keywordGroups)[226],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-indent
   * 主题类别：spacing（_ 前缀）。
   * 语法：`<length-percentage> && hanging? && each-line?`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-indent
   */
  readonly textIndent: CssProperty<
    'textIndent',
    (typeof keywordGroups)[5],
    'length',
    1,
    'spacing',
    T,
    M
  >;
  /**
   * text-justify
   * 语法：`auto | inter-character | inter-word | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-justify
   */
  readonly textJustify: CssProperty<'textJustify', (typeof keywordGroups)[227], never, 1, '', T, M>;
  /**
   * text-orientation
   * 语法：`mixed | upright | sideways`
   * 初始值：`mixed`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-orientation
   */
  readonly textOrientation: CssProperty<
    'textOrientation',
    (typeof keywordGroups)[228],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-overflow
   * 语法：`[ clip | ellipsis | <string> ]{1,2}`
   * 初始值：`clip`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-overflow
   */
  readonly textOverflow: CssProperty<
    'textOverflow',
    (typeof keywordGroups)[172],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-rendering
   * 语法：`auto | optimizeSpeed | optimizeLegibility | geometricPrecision`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-rendering
   */
  readonly textRendering: CssProperty<
    'textRendering',
    (typeof keywordGroups)[229],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-shadow
   * 主题类别：shadow（_ 前缀）。
   * 语法：`none | <shadow-t>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-shadow
   */
  readonly textShadow: CssProperty<
    'textShadow',
    (typeof keywordGroups)[6],
    never,
    1,
    'shadow',
    T,
    M
  >;
  /**
   * text-size-adjust
   * 语法：`none | auto | <percentage>`
   * 初始值：`auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   * @see https://developer.mozilla.org/docs/Web/CSS/text-size-adjust
   */
  readonly textSizeAdjust: CssProperty<
    'textSizeAdjust',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-spacing-trim
   * 语法：`space-all | normal | space-first | trim-start`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-spacing-trim
   */
  readonly textSpacingTrim: CssProperty<
    'textSpacingTrim',
    (typeof keywordGroups)[230],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-transform
   * 语法：`none | [ capitalize | uppercase | lowercase ] || full-width || full-size-kana | math-auto`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-transform
   */
  readonly textTransform: CssProperty<
    'textTransform',
    (typeof keywordGroups)[231],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-underline-offset
   * 语法：`auto | <length> | <percentage> `
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-underline-offset
   */
  readonly textUnderlineOffset: CssProperty<
    'textUnderlineOffset',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * text-underline-position
   * 语法：`auto | from-font | [ under || [ left | right ] ]`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-underline-position
   */
  readonly textUnderlinePosition: CssProperty<
    'textUnderlinePosition',
    (typeof keywordGroups)[232],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-wrap
   * 语法：`<'text-wrap-mode'> || <'text-wrap-style'>`
   * 初始值：`wrap`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-wrap
   */
  readonly textWrap: CssProperty<'textWrap', (typeof keywordGroups)[233], never, 1, '', T, M>;
  /**
   * text-wrap-mode
   * 语法：`wrap | nowrap`
   * 初始值：`wrap`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-wrap-mode
   */
  readonly textWrapMode: CssProperty<
    'textWrapMode',
    (typeof keywordGroups)[234],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * text-wrap-style
   * 语法：`auto | balance | stable | pretty`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/text-wrap-style
   */
  readonly textWrapStyle: CssProperty<
    'textWrapStyle',
    (typeof keywordGroups)[235],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * timeline-scope
   * 语法：`none | <dashed-ident>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/timeline-scope
   */
  readonly timelineScope: CssProperty<
    'timelineScope',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * top
   * 主题类别：spacing（_ 前缀）。
   * 语法：`auto | <length-percentage> | <anchor()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/top
   */
  readonly top: CssProperty<'top', (typeof keywordGroups)[11], 'length', 1, 'spacing', T, M>;
  /**
   * touch-action
   * 语法：`auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/touch-action
   */
  readonly touchAction: CssProperty<'touchAction', (typeof keywordGroups)[173], never, 1, '', T, M>;
  /**
   * transform
   * 语法：`none | <transform-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/transform
   */
  readonly transform: CssProperty<'transform', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * transform-box
   * 语法：`content-box | border-box | fill-box | stroke-box | view-box`
   * 初始值：`view-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/transform-box
   */
  readonly transformBox: CssProperty<
    'transformBox',
    (typeof keywordGroups)[236],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * transform-origin
   * 语法：`[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   * 初始值：`50% 50% 0`
   * @see https://developer.mozilla.org/docs/Web/CSS/transform-origin
   */
  readonly transformOrigin: CssProperty<
    'transformOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * transform-style
   * 语法：`flat | preserve-3d`
   * 初始值：`flat`
   * @see https://developer.mozilla.org/docs/Web/CSS/transform-style
   */
  readonly transformStyle: CssProperty<
    'transformStyle',
    (typeof keywordGroups)[151],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * transition
   * 语法：`<single-transition>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/transition
   */
  readonly transition: CssProperty<'transition', (typeof keywordGroups)[152], 'time', 1, '', T, M>;
  /**
   * transition-behavior
   * 语法：`<transition-behavior-value>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-behavior
   */
  readonly transitionBehavior: CssProperty<
    'transitionBehavior',
    (typeof keywordGroups)[237],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * transition-delay
   * 主题类别：duration（_ 前缀）。
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-delay
   */
  readonly transitionDelay: CssProperty<
    'transitionDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /**
   * transition-duration
   * 主题类别：duration（_ 前缀）。
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-duration
   */
  readonly transitionDuration: CssProperty<
    'transitionDuration',
    (typeof keywordGroups)[5],
    'time',
    1,
    'duration',
    T,
    M
  >;
  /**
   * transition-property
   * 语法：`none | <single-transition-property>#`
   * 初始值：all
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-property
   */
  readonly transitionProperty: CssProperty<
    'transitionProperty',
    (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * transition-timing-function
   * 主题类别：easing（_ 前缀）。
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-timing-function
   */
  readonly transitionTimingFunction: CssProperty<
    'transitionTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    'easing',
    T,
    M
  >;
  /**
   * translate
   * 语法：`none | <length-percentage> [ <length-percentage> <length>? ]?`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/translate
   */
  readonly translate: CssProperty<'translate', (typeof keywordGroups)[6], 'length', 1, '', T, M>;
  /**
   * unicode-bidi
   * 语法：`normal | embed | isolate | bidi-override | isolate-override | plaintext`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/unicode-bidi
   */
  readonly unicodeBidi: CssProperty<'unicodeBidi', (typeof keywordGroups)[238], never, 1, '', T, M>;
  /**
   * user-select
   * 语法：`auto | text | none | all`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/user-select
   */
  readonly userSelect: CssProperty<'userSelect', (typeof keywordGroups)[115], never, 1, '', T, M>;
  /**
   * vector-effect
   * 语法：`none | non-scaling-stroke | non-scaling-size | non-rotation | fixed-position`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/vector-effect
   */
  readonly vectorEffect: CssProperty<
    'vectorEffect',
    (typeof keywordGroups)[239],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * vertical-align
   * 语法：`baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>`
   * 初始值：`baseline`
   * @see https://developer.mozilla.org/docs/Web/CSS/vertical-align
   */
  readonly verticalAlign: CssProperty<
    'verticalAlign',
    (typeof keywordGroups)[240],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * view-timeline
   * 语法：`[ <'view-timeline-name'> [ <'view-timeline-axis'> || <'view-timeline-inset'> ]? ]#`
   * @see https://developer.mozilla.org/docs/Web/CSS/view-timeline
   */
  readonly viewTimeline: CssProperty<'viewTimeline', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * view-timeline-axis
   * 语法：`[ block | inline | x | y ]#`
   * 初始值：`block`
   * @see https://developer.mozilla.org/docs/Web/CSS/view-timeline-axis
   */
  readonly viewTimelineAxis: CssProperty<
    'viewTimelineAxis',
    (typeof keywordGroups)[207],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * view-timeline-inset
   * 语法：`[ [ auto | <length-percentage> ]{1,2} ]#`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/view-timeline-inset
   */
  readonly viewTimelineInset: CssProperty<
    'viewTimelineInset',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * view-timeline-name
   * 语法：`[ none | <dashed-ident> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/view-timeline-name
   */
  readonly viewTimelineName: CssProperty<
    'viewTimelineName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * view-transition-class
   * 语法：`none | <custom-ident>+`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/view-transition-class
   */
  readonly viewTransitionClass: CssProperty<
    'viewTransitionClass',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * view-transition-name
   * 语法：`none | <custom-ident> | match-element`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/view-transition-name
   */
  readonly viewTransitionName: CssProperty<
    'viewTransitionName',
    (typeof keywordGroups)[241],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * visibility
   * 语法：`visible | hidden | collapse`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/visibility
   */
  readonly visibility: CssProperty<'visibility', (typeof keywordGroups)[242], never, 1, '', T, M>;
  /**
   * -webkit-align-content
   * 语法：`normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-align-content
   */
  readonly WebkitAlignContent: CssProperty<
    'WebkitAlignContent',
    (typeof keywordGroups)[1],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-align-items
   * 语法：`normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-align-items
   */
  readonly WebkitAlignItems: CssProperty<
    'WebkitAlignItems',
    (typeof keywordGroups)[2],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-align-self
   * 语法：`auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-align-self
   */
  readonly WebkitAlignSelf: CssProperty<
    'WebkitAlignSelf',
    (typeof keywordGroups)[4],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation
   * 语法：`<single-animation>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation
   */
  readonly WebkitAnimation: CssProperty<
    'WebkitAnimation',
    (typeof keywordGroups)[8],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-delay
   */
  readonly WebkitAnimationDelay: CssProperty<
    'WebkitAnimationDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-direction
   * 语法：`<single-animation-direction>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-direction
   */
  readonly WebkitAnimationDirection: CssProperty<
    'WebkitAnimationDirection',
    (typeof keywordGroups)[10],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-duration
   * 语法：`[ auto | <time [0s,∞]> ]#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-duration
   */
  readonly WebkitAnimationDuration: CssProperty<
    'WebkitAnimationDuration',
    (typeof keywordGroups)[11],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-fill-mode
   * 语法：`<single-animation-fill-mode>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-fill-mode
   */
  readonly WebkitAnimationFillMode: CssProperty<
    'WebkitAnimationFillMode',
    (typeof keywordGroups)[12],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-iteration-count
   * 语法：`<single-animation-iteration-count>#`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-iteration-count
   */
  readonly WebkitAnimationIterationCount: CssProperty<
    'WebkitAnimationIterationCount',
    (typeof keywordGroups)[13],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-name
   * 语法：`[ none | <keyframes-name> ]#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-name
   */
  readonly WebkitAnimationName: CssProperty<
    'WebkitAnimationName',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-play-state
   * 语法：`<single-animation-play-state>#`
   * 初始值：`running`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-play-state
   */
  readonly WebkitAnimationPlayState: CssProperty<
    'WebkitAnimationPlayState',
    (typeof keywordGroups)[14],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-animation-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-animation-timing-function
   */
  readonly WebkitAnimationTimingFunction: CssProperty<
    'WebkitAnimationTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-appearance
   * 语法：`none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | med
   * 初始值：`none` (but this value is overridden in the user agent CSS)
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-appearance
   */
  readonly WebkitAppearance: CssProperty<
    'WebkitAppearance',
    (typeof keywordGroups)[243],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-backdrop-filter
   * 语法：`none | <filter-value-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-backdrop-filter
   */
  readonly WebkitBackdropFilter: CssProperty<
    'WebkitBackdropFilter',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-backface-visibility
   * 语法：`visible | hidden`
   * 初始值：`visible`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-backface-visibility
   */
  readonly WebkitBackfaceVisibility: CssProperty<
    'WebkitBackfaceVisibility',
    (typeof keywordGroups)[19],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-background-clip
   * 语法：`<bg-clip>#`
   * 初始值：`border-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-background-clip
   */
  readonly WebkitBackgroundClip: CssProperty<
    'WebkitBackgroundClip',
    (typeof keywordGroups)[23],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-background-origin
   * 语法：`<visual-box>#`
   * 初始值：`padding-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-background-origin
   */
  readonly WebkitBackgroundOrigin: CssProperty<
    'WebkitBackgroundOrigin',
    (typeof keywordGroups)[25],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-background-size
   * 语法：`<bg-size>#`
   * 初始值：`auto auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-background-size
   */
  readonly WebkitBackgroundSize: CssProperty<
    'WebkitBackgroundSize',
    (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-before
   * 语法：`<'border-width'> || <'border-style'> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before
   */
  readonly WebkitBorderBefore: CssProperty<
    'WebkitBorderBefore',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-before-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before-color
   */
  readonly WebkitBorderBeforeColor: CssProperty<
    'WebkitBorderBeforeColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-before-style
   * 语法：`<'border-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before-style
   */
  readonly WebkitBorderBeforeStyle: CssProperty<
    'WebkitBorderBeforeStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-before-width
   * 语法：`<'border-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before-width
   */
  readonly WebkitBorderBeforeWidth: CssProperty<
    'WebkitBorderBeforeWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-bottom-left-radius
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-bottom-left-radius
   */
  readonly WebkitBorderBottomLeftRadius: CssProperty<
    'WebkitBorderBottomLeftRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-bottom-right-radius
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-bottom-right-radius
   */
  readonly WebkitBorderBottomRightRadius: CssProperty<
    'WebkitBorderBottomRightRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-image
   * 语法：`<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-image
   */
  readonly WebkitBorderImage: CssProperty<
    'WebkitBorderImage',
    (typeof keywordGroups)[37],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-image-slice
   * 语法：`[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   * 初始值：`100%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-image-slice
   */
  readonly WebkitBorderImageSlice: CssProperty<
    'WebkitBorderImageSlice',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-radius
   * 语法：`<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-radius
   */
  readonly WebkitBorderRadius: CssProperty<
    'WebkitBorderRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-top-left-radius
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-top-left-radius
   */
  readonly WebkitBorderTopLeftRadius: CssProperty<
    'WebkitBorderTopLeftRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-border-top-right-radius
   * 语法：`<length-percentage [0,∞]>{1,2}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-border-top-right-radius
   */
  readonly WebkitBorderTopRightRadius: CssProperty<
    'WebkitBorderTopRightRadius',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-align
   * 语法：`start | center | end | baseline | stretch`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-align
   */
  readonly WebkitBoxAlign: CssProperty<
    'WebkitBoxAlign',
    (typeof keywordGroups)[39],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-decoration-break
   * 语法：`slice | clone`
   * 初始值：`slice`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-decoration-break
   */
  readonly WebkitBoxDecorationBreak: CssProperty<
    'WebkitBoxDecorationBreak',
    (typeof keywordGroups)[40],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-direction
   * 语法：`normal | reverse | inherit`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-direction
   */
  readonly WebkitBoxDirection: CssProperty<
    'WebkitBoxDirection',
    (typeof keywordGroups)[41],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-flex
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-flex
   */
  readonly WebkitBoxFlex: CssProperty<
    'WebkitBoxFlex',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-flex-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-flex-group
   */
  readonly WebkitBoxFlexGroup: CssProperty<
    'WebkitBoxFlexGroup',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-lines
   * 语法：`single | multiple`
   * 初始值：`single`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-lines
   */
  readonly WebkitBoxLines: CssProperty<
    'WebkitBoxLines',
    (typeof keywordGroups)[42],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-ordinal-group
   * 语法：`<integer>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-ordinal-group
   */
  readonly WebkitBoxOrdinalGroup: CssProperty<
    'WebkitBoxOrdinalGroup',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-orient
   * 语法：`horizontal | vertical | inline-axis | block-axis | inherit`
   * 初始值：`inline-axis`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-orient
   */
  readonly WebkitBoxOrient: CssProperty<
    'WebkitBoxOrient',
    (typeof keywordGroups)[43],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-pack
   * 语法：`start | center | end | justify`
   * 初始值：`start`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-pack
   */
  readonly WebkitBoxPack: CssProperty<
    'WebkitBoxPack',
    (typeof keywordGroups)[44],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-reflect
   * 语法：`[ above | below | right | left ]? <length>? <image>?`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-reflect
   */
  readonly WebkitBoxReflect: CssProperty<
    'WebkitBoxReflect',
    (typeof keywordGroups)[244],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-shadow
   * 语法：`none | <shadow>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-shadow
   */
  readonly WebkitBoxShadow: CssProperty<
    'WebkitBoxShadow',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-box-sizing
   * 语法：`content-box | border-box`
   * 初始值：`content-box`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-box-sizing
   */
  readonly WebkitBoxSizing: CssProperty<
    'WebkitBoxSizing',
    (typeof keywordGroups)[45],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-clip-path
   * 语法：`<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-clip-path
   */
  readonly WebkitClipPath: CssProperty<
    'WebkitClipPath',
    (typeof keywordGroups)[52],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-count
   * 语法：`<integer> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-count
   */
  readonly WebkitColumnCount: CssProperty<
    'WebkitColumnCount',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-fill
   * 语法：`auto | balance`
   * 初始值：`balance`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-fill
   */
  readonly WebkitColumnFill: CssProperty<
    'WebkitColumnFill',
    (typeof keywordGroups)[58],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-rule
   * 语法：`<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-rule
   */
  readonly WebkitColumnRule: CssProperty<
    'WebkitColumnRule',
    (typeof keywordGroups)[33],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-rule-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-rule-color
   */
  readonly WebkitColumnRuleColor: CssProperty<
    'WebkitColumnRuleColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-rule-style
   * 语法：`<'border-style'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-rule-style
   */
  readonly WebkitColumnRuleStyle: CssProperty<
    'WebkitColumnRuleStyle',
    (typeof keywordGroups)[34],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-rule-width
   * 语法：`<'border-width'>`
   * 初始值：`medium`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-rule-width
   */
  readonly WebkitColumnRuleWidth: CssProperty<
    'WebkitColumnRuleWidth',
    (typeof keywordGroups)[35],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-columns
   * 语法：`<'column-width'> || <'column-count'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-columns
   */
  readonly WebkitColumns: CssProperty<
    'WebkitColumns',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-span
   * 语法：`none | all`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-span
   */
  readonly WebkitColumnSpan: CssProperty<
    'WebkitColumnSpan',
    (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-column-width
   * 语法：`<length> | auto`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-column-width
   */
  readonly WebkitColumnWidth: CssProperty<
    'WebkitColumnWidth',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-filter
   * 语法：`none | <filter-value-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-filter
   */
  readonly WebkitFilter: CssProperty<'WebkitFilter', (typeof keywordGroups)[6], never, 1, '', T, M>;
  /**
   * -webkit-flex
   * 语法：`none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex
   */
  readonly WebkitFlex: CssProperty<'WebkitFlex', (typeof keywordGroups)[71], 'length', 1, '', T, M>;
  /**
   * -webkit-flex-basis
   * 语法：`content | <'width'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex-basis
   */
  readonly WebkitFlexBasis: CssProperty<
    'WebkitFlexBasis',
    (typeof keywordGroups)[72],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-flex-direction
   * 语法：`row | row-reverse | column | column-reverse`
   * 初始值：`row`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex-direction
   */
  readonly WebkitFlexDirection: CssProperty<
    'WebkitFlexDirection',
    (typeof keywordGroups)[73],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-flex-flow
   * 语法：`<'flex-direction'> || <'flex-wrap'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex-flow
   */
  readonly WebkitFlexFlow: CssProperty<
    'WebkitFlexFlow',
    (typeof keywordGroups)[74],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-flex-grow
   * 语法：`<number>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex-grow
   */
  readonly WebkitFlexGrow: CssProperty<
    'WebkitFlexGrow',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-flex-shrink
   * 语法：`<number>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex-shrink
   */
  readonly WebkitFlexShrink: CssProperty<
    'WebkitFlexShrink',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-flex-wrap
   * 语法：`nowrap | wrap | wrap-reverse`
   * 初始值：`nowrap`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-flex-wrap
   */
  readonly WebkitFlexWrap: CssProperty<
    'WebkitFlexWrap',
    (typeof keywordGroups)[75],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-font-feature-settings
   * 语法：`normal | <feature-tag-value>#`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-font-feature-settings
   */
  readonly WebkitFontFeatureSettings: CssProperty<
    'WebkitFontFeatureSettings',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-font-kerning
   * 语法：`auto | normal | none`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-font-kerning
   */
  readonly WebkitFontKerning: CssProperty<
    'WebkitFontKerning',
    (typeof keywordGroups)[79],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-font-smoothing
   * 语法：`auto | never | always | <absolute-size> | <length>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-font-smoothing
   */
  readonly WebkitFontSmoothing: CssProperty<
    'WebkitFontSmoothing',
    (typeof keywordGroups)[82],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-font-variant-ligatures
   * 语法：`normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-font-variant-ligatures
   */
  readonly WebkitFontVariantLigatures: CssProperty<
    'WebkitFontVariantLigatures',
    (typeof keywordGroups)[91],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-hyphenate-character
   * 语法：`auto | <string>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-hyphenate-character
   */
  readonly WebkitHyphenateCharacter: CssProperty<
    'WebkitHyphenateCharacter',
    (typeof keywordGroups)[11],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-hyphens
   * 语法：`none | manual | auto`
   * 初始值：`manual`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-hyphens
   */
  readonly WebkitHyphens: CssProperty<
    'WebkitHyphens',
    (typeof keywordGroups)[101],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-initial-letter
   * 语法：`normal | [ <number> <integer>? ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-initial-letter
   */
  readonly WebkitInitialLetter: CssProperty<
    'WebkitInitialLetter',
    (typeof keywordGroups)[59],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-justify-content
   * 语法：`normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-justify-content
   */
  readonly WebkitJustifyContent: CssProperty<
    'WebkitJustifyContent',
    (typeof keywordGroups)[111],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-line-break
   * 语法：`auto | loose | normal | strict | anywhere`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-line-break
   */
  readonly WebkitLineBreak: CssProperty<
    'WebkitLineBreak',
    (typeof keywordGroups)[114],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-line-clamp
   * 语法：`none | <integer>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp
   */
  readonly WebkitLineClamp: CssProperty<
    'WebkitLineClamp',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-logical-height
   * 语法：`<'width'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-logical-height
   */
  readonly WebkitLogicalHeight: CssProperty<
    'WebkitLogicalHeight',
    (typeof keywordGroups)[32],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-logical-width
   * 语法：`<'width'>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-logical-width
   */
  readonly WebkitLogicalWidth: CssProperty<
    'WebkitLogicalWidth',
    (typeof keywordGroups)[107],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-margin-end
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-margin-end
   */
  readonly WebkitMarginEnd: CssProperty<
    'WebkitMarginEnd',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-margin-start
   * 语法：`<'margin-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-margin-start
   */
  readonly WebkitMarginStart: CssProperty<
    'WebkitMarginStart',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask
   * 语法：`[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <visual-box> | border | padding | content | text ] || [ <visual-box> | border | padding | content ] ]#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask
   */
  readonly WebkitMask: CssProperty<
    'WebkitMask',
    (typeof keywordGroups)[245],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-attachment
   * 语法：`<attachment>#`
   * 初始值：`scroll`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment
   */
  readonly WebkitMaskAttachment: CssProperty<
    'WebkitMaskAttachment',
    (typeof keywordGroups)[21],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-box-image
   * 语法：`<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-box-image
   */
  readonly WebkitMaskBoxImage: CssProperty<
    'WebkitMaskBoxImage',
    (typeof keywordGroups)[120],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-box-image-outset
   * 语法：`[ <length> | <number> ]{1,4}`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-box-image-outset
   */
  readonly WebkitMaskBoxImageOutset: CssProperty<
    'WebkitMaskBoxImageOutset',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-box-image-repeat
   * 语法：`[ stretch | repeat | round | space ]{1,2}`
   * 初始值：`stretch`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-box-image-repeat
   */
  readonly WebkitMaskBoxImageRepeat: CssProperty<
    'WebkitMaskBoxImageRepeat',
    (typeof keywordGroups)[38],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-box-image-slice
   * 语法：`<number-percentage>{1,4} fill?`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-box-image-slice
   */
  readonly WebkitMaskBoxImageSlice: CssProperty<
    'WebkitMaskBoxImageSlice',
    (typeof keywordGroups)[5],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-box-image-source
   * 语法：`none | <image>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-box-image-source
   */
  readonly WebkitMaskBoxImageSource: CssProperty<
    'WebkitMaskBoxImageSource',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-box-image-width
   * 语法：`[ <length-percentage> | <number> | auto ]{1,4}`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-box-image-width
   */
  readonly WebkitMaskBoxImageWidth: CssProperty<
    'WebkitMaskBoxImageWidth',
    (typeof keywordGroups)[11],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-clip
   * 语法：`[ <coord-box> | no-clip | border | padding | content | text ]#`
   * 初始值：`border`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-clip
   */
  readonly WebkitMaskClip: CssProperty<
    'WebkitMaskClip',
    (typeof keywordGroups)[246],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-composite
   * 语法：`<composite-style>#`
   * 初始值：`source-over`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite
   */
  readonly WebkitMaskComposite: CssProperty<
    'WebkitMaskComposite',
    (typeof keywordGroups)[247],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-image
   * 语法：`<mask-reference>#`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-image
   */
  readonly WebkitMaskImage: CssProperty<
    'WebkitMaskImage',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-origin
   * 语法：`[ <coord-box> | border | padding | content ]#`
   * 初始值：`padding`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-origin
   */
  readonly WebkitMaskOrigin: CssProperty<
    'WebkitMaskOrigin',
    (typeof keywordGroups)[248],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-position
   * 语法：`<position>#`
   * 初始值：`0% 0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position
   */
  readonly WebkitMaskPosition: CssProperty<
    'WebkitMaskPosition',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-position-x
   * 语法：`[ <length-percentage> | left | center | right ]#`
   * 初始值：`0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x
   */
  readonly WebkitMaskPositionX: CssProperty<
    'WebkitMaskPositionX',
    (typeof keywordGroups)[249],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-position-y
   * 语法：`[ <length-percentage> | top | center | bottom ]#`
   * 初始值：`0%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y
   */
  readonly WebkitMaskPositionY: CssProperty<
    'WebkitMaskPositionY',
    (typeof keywordGroups)[250],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-repeat
   * 语法：`<repeat-style>#`
   * 初始值：`repeat`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat
   */
  readonly WebkitMaskRepeat: CssProperty<
    'WebkitMaskRepeat',
    (typeof keywordGroups)[29],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-repeat-x
   * 语法：`repeat | no-repeat | space | round`
   * 初始值：`repeat`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-x
   */
  readonly WebkitMaskRepeatX: CssProperty<
    'WebkitMaskRepeatX',
    (typeof keywordGroups)[251],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-repeat-y
   * 语法：`repeat | no-repeat | space | round`
   * 初始值：`repeat`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-y
   */
  readonly WebkitMaskRepeatY: CssProperty<
    'WebkitMaskRepeatY',
    (typeof keywordGroups)[251],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-mask-size
   * 语法：`<bg-size>#`
   * 初始值：`auto auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-size
   */
  readonly WebkitMaskSize: CssProperty<
    'WebkitMaskSize',
    (typeof keywordGroups)[30],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-max-inline-size
   * 语法：`<'max-width'>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-max-inline-size
   */
  readonly WebkitMaxInlineSize: CssProperty<
    'WebkitMaxInlineSize',
    (typeof keywordGroups)[131],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-order
   * 语法：`<integer>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-order
   */
  readonly WebkitOrder: CssProperty<'WebkitOrder', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * -webkit-overflow-scrolling
   * 语法：`auto | touch`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling
   */
  readonly WebkitOverflowScrolling: CssProperty<
    'WebkitOverflowScrolling',
    (typeof keywordGroups)[252],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-padding-end
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-padding-end
   */
  readonly WebkitPaddingEnd: CssProperty<
    'WebkitPaddingEnd',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-padding-start
   * 语法：`<'padding-top'>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-padding-start
   */
  readonly WebkitPaddingStart: CssProperty<
    'WebkitPaddingStart',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-perspective
   * 语法：`none | <length>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-perspective
   */
  readonly WebkitPerspective: CssProperty<
    'WebkitPerspective',
    (typeof keywordGroups)[6],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-perspective-origin
   * 语法：`<position>`
   * 初始值：`50% 50%`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-perspective-origin
   */
  readonly WebkitPerspectiveOrigin: CssProperty<
    'WebkitPerspectiveOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-print-color-adjust
   * 语法：`economy | exact`
   * 初始值：`economy`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-print-color-adjust
   */
  readonly WebkitPrintColorAdjust: CssProperty<
    'WebkitPrintColorAdjust',
    (typeof keywordGroups)[54],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-ruby-position
   * 语法：`[ alternate || [ over | under ] ] | inter-character`
   * 初始值：`alternate`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-ruby-position
   */
  readonly WebkitRubyPosition: CssProperty<
    'WebkitRubyPosition',
    (typeof keywordGroups)[198],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-scroll-snap-type
   * 语法：`none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-scroll-snap-type
   */
  readonly WebkitScrollSnapType: CssProperty<
    'WebkitScrollSnapType',
    (typeof keywordGroups)[206],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-shape-margin
   * 语法：`<length-percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-shape-margin
   */
  readonly WebkitShapeMargin: CssProperty<
    'WebkitShapeMargin',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-tap-highlight-color
   * 语法：`<color>`
   * 初始值：`black`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color
   */
  readonly WebkitTapHighlightColor: CssProperty<
    'WebkitTapHighlightColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-combine
   * 语法：`none | all | [ digits <integer>? ]`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-combine
   */
  readonly WebkitTextCombine: CssProperty<
    'WebkitTextCombine',
    (typeof keywordGroups)[171],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-decoration-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-decoration-color
   */
  readonly WebkitTextDecorationColor: CssProperty<
    'WebkitTextDecorationColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-decoration-line
   * 语法：`none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-decoration-line
   */
  readonly WebkitTextDecorationLine: CssProperty<
    'WebkitTextDecorationLine',
    (typeof keywordGroups)[149],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-decoration-skip
   * 语法：`none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   * 初始值：`objects`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-decoration-skip
   */
  readonly WebkitTextDecorationSkip: CssProperty<
    'WebkitTextDecorationSkip',
    (typeof keywordGroups)[221],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-decoration-style
   * 语法：`solid | double | dotted | dashed | wavy`
   * 初始值：`solid`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-decoration-style
   */
  readonly WebkitTextDecorationStyle: CssProperty<
    'WebkitTextDecorationStyle',
    (typeof keywordGroups)[150],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-emphasis
   * 语法：`<'text-emphasis-style'> || <'text-emphasis-color'>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-emphasis
   */
  readonly WebkitTextEmphasis: CssProperty<
    'WebkitTextEmphasis',
    (typeof keywordGroups)[224],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-emphasis-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-emphasis-color
   */
  readonly WebkitTextEmphasisColor: CssProperty<
    'WebkitTextEmphasisColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-emphasis-position
   * 语法：`auto | [ over | under ] && [ right | left ]?`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-emphasis-position
   */
  readonly WebkitTextEmphasisPosition: CssProperty<
    'WebkitTextEmphasisPosition',
    (typeof keywordGroups)[225],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-emphasis-style
   * 语法：`none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-emphasis-style
   */
  readonly WebkitTextEmphasisStyle: CssProperty<
    'WebkitTextEmphasisStyle',
    (typeof keywordGroups)[226],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-fill-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color
   */
  readonly WebkitTextFillColor: CssProperty<
    'WebkitTextFillColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-orientation
   * 语法：`mixed | upright | sideways`
   * 初始值：`mixed`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-orientation
   */
  readonly WebkitTextOrientation: CssProperty<
    'WebkitTextOrientation',
    (typeof keywordGroups)[228],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-size-adjust
   * 语法：`none | auto | <percentage>`
   * 初始值：`auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-size-adjust
   */
  readonly WebkitTextSizeAdjust: CssProperty<
    'WebkitTextSizeAdjust',
    (typeof keywordGroups)[16],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-stroke
   * 语法：`<length> || <color>`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke
   */
  readonly WebkitTextStroke: CssProperty<
    'WebkitTextStroke',
    (typeof keywordGroups)[24],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-stroke-color
   * 语法：`<color>`
   * 初始值：`currentcolor`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-color
   */
  readonly WebkitTextStrokeColor: CssProperty<
    'WebkitTextStrokeColor',
    (typeof keywordGroups)[24],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-stroke-width
   * 语法：`<length>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-width
   */
  readonly WebkitTextStrokeWidth: CssProperty<
    'WebkitTextStrokeWidth',
    (typeof keywordGroups)[5],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-text-underline-position
   * 语法：`auto | from-font | [ under || [ left | right ] ]`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-text-underline-position
   */
  readonly WebkitTextUnderlinePosition: CssProperty<
    'WebkitTextUnderlinePosition',
    (typeof keywordGroups)[232],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-touch-callout
   * 语法：`default | none`
   * 初始值：`default`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout
   */
  readonly WebkitTouchCallout: CssProperty<
    'WebkitTouchCallout',
    (typeof keywordGroups)[253],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transform
   * 语法：`none | <transform-list>`
   * 初始值：`none`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transform
   */
  readonly WebkitTransform: CssProperty<
    'WebkitTransform',
    (typeof keywordGroups)[6],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transform-origin
   * 语法：`[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   * 初始值：`50% 50% 0`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transform-origin
   */
  readonly WebkitTransformOrigin: CssProperty<
    'WebkitTransformOrigin',
    (typeof keywordGroups)[26],
    'length',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transform-style
   * 语法：`flat | preserve-3d`
   * 初始值：`flat`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transform-style
   */
  readonly WebkitTransformStyle: CssProperty<
    'WebkitTransformStyle',
    (typeof keywordGroups)[151],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transition
   * 语法：`<single-transition>#`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transition
   */
  readonly WebkitTransition: CssProperty<
    'WebkitTransition',
    (typeof keywordGroups)[152],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transition-delay
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transition-delay
   */
  readonly WebkitTransitionDelay: CssProperty<
    'WebkitTransitionDelay',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transition-duration
   * 语法：`<time>#`
   * 初始值：`0s`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transition-duration
   */
  readonly WebkitTransitionDuration: CssProperty<
    'WebkitTransitionDuration',
    (typeof keywordGroups)[5],
    'time',
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transition-property
   * 语法：`none | <single-transition-property>#`
   * 初始值：all
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transition-property
   */
  readonly WebkitTransitionProperty: CssProperty<
    'WebkitTransitionProperty',
    (typeof keywordGroups)[7],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-transition-timing-function
   * 语法：`<easing-function>#`
   * 初始值：`ease`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-transition-timing-function
   */
  readonly WebkitTransitionTimingFunction: CssProperty<
    'WebkitTransitionTimingFunction',
    (typeof keywordGroups)[17],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-user-modify
   * 语法：`read-only | read-write | read-write-plaintext-only`
   * 初始值：`read-only`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-user-modify
   */
  readonly WebkitUserModify: CssProperty<
    'WebkitUserModify',
    (typeof keywordGroups)[254],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-user-select
   * 语法：`auto | text | none | all`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-user-select
   */
  readonly WebkitUserSelect: CssProperty<
    'WebkitUserSelect',
    (typeof keywordGroups)[255],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * -webkit-writing-mode
   * 语法：`horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   * 初始值：`horizontal-tb`
   * @see https://developer.mozilla.org/docs/Web/CSS/-webkit-writing-mode
   */
  readonly WebkitWritingMode: CssProperty<
    'WebkitWritingMode',
    (typeof keywordGroups)[179],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * white-space
   * 语法：`normal | pre | pre-wrap | pre-line | <'white-space-collapse'> || <'text-wrap-mode'>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/white-space
   */
  readonly whiteSpace: CssProperty<'whiteSpace', (typeof keywordGroups)[256], never, 1, '', T, M>;
  /**
   * white-space-collapse
   * 语法：`collapse | preserve | preserve-breaks | preserve-spaces | break-spaces`
   * 初始值：`collapse`
   * @see https://developer.mozilla.org/docs/Web/CSS/white-space-collapse
   */
  readonly whiteSpaceCollapse: CssProperty<
    'whiteSpaceCollapse',
    (typeof keywordGroups)[257],
    never,
    1,
    '',
    T,
    M
  >;
  /**
   * widows
   * 语法：`<integer>`
   * 初始值：`2`
   * @see https://developer.mozilla.org/docs/Web/CSS/widows
   */
  readonly widows: CssProperty<'widows', (typeof keywordGroups)[5], never, 1, '', T, M>;
  /**
   * 元素的物理宽度。
   * 主题类别：size（_ 前缀）。
   * 语法：`auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   */
  readonly width: CssProperty<'width', (typeof keywordGroups)[258], 'length', 1, 'size', T, M>;
  /**
   * will-change
   * 语法：`auto | <animateable-feature>#`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/will-change
   */
  readonly willChange: CssProperty<'willChange', (typeof keywordGroups)[259], never, 1, '', T, M>;
  /**
   * word-break
   * 语法：`normal | break-all | keep-all | break-word | auto-phrase`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/word-break
   */
  readonly wordBreak: CssProperty<'wordBreak', (typeof keywordGroups)[176], never, 1, '', T, M>;
  /**
   * word-spacing
   * 主题类别：letterSpacing（_ 前缀）。
   * 语法：`normal | <length>`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/word-spacing
   */
  readonly wordSpacing: CssProperty<
    'wordSpacing',
    (typeof keywordGroups)[59],
    'length',
    1,
    'letterSpacing',
    T,
    M
  >;
  /**
   * word-wrap
   * 语法：`normal | break-word`
   * 初始值：`normal`
   * @see https://developer.mozilla.org/docs/Web/CSS/word-wrap
   */
  readonly wordWrap: CssProperty<'wordWrap', (typeof keywordGroups)[260], never, 1, '', T, M>;
  /**
   * writing-mode
   * 语法：`horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   * 初始值：`horizontal-tb`
   * @see https://developer.mozilla.org/docs/Web/CSS/writing-mode
   */
  readonly writingMode: CssProperty<'writingMode', (typeof keywordGroups)[179], never, 1, '', T, M>;
  /**
   * x
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/x
   */
  readonly x: CssProperty<'x', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * y
   * 语法：`<length> | <percentage>`
   * 初始值：`0`
   * @see https://developer.mozilla.org/docs/Web/CSS/y
   */
  readonly y: CssProperty<'y', (typeof keywordGroups)[5], 'length', 1, '', T, M>;
  /**
   * 定位元素在当前层叠上下文中的层级。
   * 主题类别：zIndex（_ 前缀）。
   * 语法：`auto | <integer>`
   * 初始值：`auto`
   * @see https://developer.mozilla.org/docs/Web/CSS/z-index
   */
  readonly zIndex: CssProperty<'zIndex', (typeof keywordGroups)[11], never, 1, 'zIndex', T, M>;
  /**
   * zoom
   * 语法：`normal | reset | <number [0,∞]> || <percentage [0,∞]>`
   * 初始值：`1`
   * @see https://developer.mozilla.org/docs/Web/CSS/zoom
   */
  readonly zoom: CssProperty<'zoom', (typeof keywordGroups)[261], never, 1, '', T, M>;
}
