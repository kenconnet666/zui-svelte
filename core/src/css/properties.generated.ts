// 自动生成，请运行 pnpm generate；勿手工修改。来源：csstype 3.2.3（MIT）及 schema.ts。
import type { Carrier } from './carrier.js';
import type { TokenSchema } from '../theme/types.js';
import type { DefaultTokens } from '../theme/presets.js';
export interface StyleProperties<T extends TokenSchema = DefaultTokens> {
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly accentColor: Carrier<
    'accentColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly alignContent: Carrier<
    'alignContent',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly alignItems: Carrier<
    'alignItems',
    | 'mozInitial'
    | 'anchorCenter'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly alignmentBaseline: Carrier<
    'alignmentBaseline',
    | 'mozInitial'
    | 'alphabetic'
    | 'baseline'
    | 'central'
    | 'ideographic'
    | 'inherit'
    | 'initial'
    | 'mathematical'
    | 'middle'
    | 'revert'
    | 'revertLayer'
    | 'textAfterEdge'
    | 'textBeforeEdge'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly alignSelf: Carrier<
    'alignSelf',
    | 'mozInitial'
    | 'anchorCenter'
    | 'auto'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#` */
  readonly alignTracks: Carrier<
    'alignTracks',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly all: Carrier<
    'all',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly anchorName: Carrier<
    'anchorName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | all | <dashed-ident>#` */
  readonly anchorScope: Carrier<
    'anchorScope',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animation: Carrier<
    'animation',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'auto'
    | 'backwards'
    | 'both'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'forwards'
    | 'infinite'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'paused'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since July 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly animationComposition: Carrier<
    'animationComposition',
    | 'mozInitial'
    | 'accumulate'
    | 'add'
    | 'inherit'
    | 'initial'
    | 'replace'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationDelay: Carrier<
    'animationDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'time',
    1,
    'duration',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationDirection: Carrier<
    'animationDirection',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationDuration: Carrier<
    'animationDuration',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'time',
    1,
    'duration',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationFillMode: Carrier<
    'animationFillMode',
    | 'mozInitial'
    | 'backwards'
    | 'both'
    | 'forwards'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationIterationCount: Carrier<
    'animationIterationCount',
    'mozInitial' | 'infinite' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationName: Carrier<
    'animationName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationPlayState: Carrier<
    'animationPlayState',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'paused'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationRange: Carrier<
    'animationRange',
    | 'mozInitial'
    | 'contain'
    | 'cover'
    | 'entry'
    | 'entryCrossing'
    | 'exit'
    | 'exitCrossing'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationRangeEnd: Carrier<
    'animationRangeEnd',
    | 'mozInitial'
    | 'contain'
    | 'cover'
    | 'entry'
    | 'entryCrossing'
    | 'exit'
    | 'exitCrossing'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationRangeStart: Carrier<
    'animationRangeStart',
    | 'mozInitial'
    | 'contain'
    | 'cover'
    | 'entry'
    | 'entryCrossing'
    | 'exit'
    | 'exitCrossing'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly animationTimeline: Carrier<
    'animationTimeline',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly animationTimingFunction: Carrier<
    'animationTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    'easing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly appearance: Carrier<
    'appearance',
    | 'mozInitial'
    | 'auto'
    | 'button'
    | 'checkbox'
    | 'inherit'
    | 'initial'
    | 'listbox'
    | 'menulist'
    | 'menulistButton'
    | 'meter'
    | 'none'
    | 'progressBar'
    | 'radio'
    | 'revert'
    | 'revertLayer'
    | 'searchfield'
    | 'textarea'
    | 'textfield'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly aspectRatio: Carrier<
    'aspectRatio',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly backdropFilter: Carrier<
    'backdropFilter',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly backfaceVisibility: Carrier<
    'backfaceVisibility',
    | 'mozInitial'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly background: Carrier<
    'background',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'borderBox'
    | 'bottom'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'center'
    | 'chartreuse'
    | 'chocolate'
    | 'contentBox'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'fixed'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'left'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'local'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'noRepeat'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'paddingBox'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'repeat'
    | 'repeatX'
    | 'repeatY'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'rosybrown'
    | 'round'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'scroll'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'space'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'top'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundAttachment: Carrier<
    'backgroundAttachment',
    | 'mozInitial'
    | 'fixed'
    | 'inherit'
    | 'initial'
    | 'local'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly backgroundBlendMode: Carrier<
    'backgroundBlendMode',
    | 'mozInitial'
    | 'color'
    | 'colorBurn'
    | 'colorDodge'
    | 'darken'
    | 'difference'
    | 'exclusion'
    | 'hardLight'
    | 'hue'
    | 'inherit'
    | 'initial'
    | 'lighten'
    | 'luminosity'
    | 'multiply'
    | 'normal'
    | 'overlay'
    | 'revert'
    | 'revertLayer'
    | 'saturation'
    | 'screen'
    | 'softLight'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundClip: Carrier<
    'backgroundClip',
    | 'mozInitial'
    | 'borderArea'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundColor: Carrier<
    'backgroundColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundImage: Carrier<
    'backgroundImage',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundOrigin: Carrier<
    'backgroundOrigin',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundPosition: Carrier<
    'backgroundPosition',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly backgroundPositionX: Carrier<
    'backgroundPositionX',
    | 'mozInitial'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset'
    | 'xEnd'
    | 'xStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly backgroundPositionY: Carrier<
    'backgroundPositionY',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'top'
    | 'unset'
    | 'yEnd'
    | 'yStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundRepeat: Carrier<
    'backgroundRepeat',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'noRepeat'
    | 'repeat'
    | 'repeatX'
    | 'repeatY'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly backgroundSize: Carrier<
    'backgroundSize',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'cover'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<length-percentage> | sub | super | baseline` */
  readonly baselineShift: Carrier<
    'baselineShift',
    | 'mozInitial'
    | 'baseline'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'sub'
    | 'super'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly blockSize: Carrier<
    'blockSize',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly border: Carrier<
    'border',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlock: Carrier<
    'borderBlock',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlockColor: Carrier<
    'borderBlockColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEnd: Carrier<
    'borderBlockEnd',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEndColor: Carrier<
    'borderBlockEndColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEndStyle: Carrier<
    'borderBlockEndStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockEndWidth: Carrier<
    'borderBlockEndWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStart: Carrier<
    'borderBlockStart',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStartColor: Carrier<
    'borderBlockStartColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStartStyle: Carrier<
    'borderBlockStartStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderBlockStartWidth: Carrier<
    'borderBlockStartWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlockStyle: Carrier<
    'borderBlockStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderBlockWidth: Carrier<
    'borderBlockWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottom: Carrier<
    'borderBottom',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomColor: Carrier<
    'borderBottomColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomLeftRadius: Carrier<
    'borderBottomLeftRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomRightRadius: Carrier<
    'borderBottomRightRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomStyle: Carrier<
    'borderBottomStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderBottomWidth: Carrier<
    'borderBottomWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    'length',
    1,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderCollapse: Carrier<
    'borderCollapse',
    | 'mozInitial'
    | 'collapse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'separate'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderColor: Carrier<
    'borderColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderEndEndRadius: Carrier<
    'borderEndEndRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderEndStartRadius: Carrier<
    'borderEndStartRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImage: Carrier<
    'borderImage',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageOutset: Carrier<
    'borderImageOutset',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2016. */
  readonly borderImageRepeat: Carrier<
    'borderImageRepeat',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageSlice: Carrier<
    'borderImageSlice',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageSource: Carrier<
    'borderImageSource',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderImageWidth: Carrier<
    'borderImageWidth',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInline: Carrier<
    'borderInline',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInlineColor: Carrier<
    'borderInlineColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEnd: Carrier<
    'borderInlineEnd',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEndColor: Carrier<
    'borderInlineEndColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEndStyle: Carrier<
    'borderInlineEndStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineEndWidth: Carrier<
    'borderInlineEndWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStart: Carrier<
    'borderInlineStart',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStartColor: Carrier<
    'borderInlineStartColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStartStyle: Carrier<
    'borderInlineStartStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly borderInlineStartWidth: Carrier<
    'borderInlineStartWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInlineStyle: Carrier<
    'borderInlineStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly borderInlineWidth: Carrier<
    'borderInlineWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeft: Carrier<
    'borderLeft',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeftColor: Carrier<
    'borderLeftColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeftStyle: Carrier<
    'borderLeftStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderLeftWidth: Carrier<
    'borderLeftWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    'length',
    1,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRadius: Carrier<
    'borderRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    4,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRight: Carrier<
    'borderRight',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRightColor: Carrier<
    'borderRightColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRightStyle: Carrier<
    'borderRightStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderRightWidth: Carrier<
    'borderRightWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    'length',
    1,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderSpacing: Carrier<
    'borderSpacing',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderStartEndRadius: Carrier<
    'borderStartEndRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly borderStartStartRadius: Carrier<
    'borderStartStartRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderStyle: Carrier<
    'borderStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTop: Carrier<
    'borderTop',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopColor: Carrier<
    'borderTopColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopLeftRadius: Carrier<
    'borderTopLeftRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopRightRadius: Carrier<
    'borderTopRightRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'radius',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopStyle: Carrier<
    'borderTopStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderTopWidth: Carrier<
    'borderTopWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    'length',
    1,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly borderWidth: Carrier<
    'borderWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    'length',
    4,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly bottom: Carrier<
    'bottom',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly boxAlign: Carrier<
    'boxAlign',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly boxDecorationBreak: Carrier<
    'boxDecorationBreak',
    'mozInitial' | 'clone' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'slice' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly boxDirection: Carrier<
    'boxDirection',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly boxFlex: Carrier<
    'boxFlex',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group. */
  readonly boxFlexGroup: Carrier<
    'boxFlexGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes). */
  readonly boxLines: Carrier<
    'boxLines',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'multiple'
    | 'revert'
    | 'revertLayer'
    | 'single'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly boxOrdinalGroup: Carrier<
    'boxOrdinalGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly boxOrient: Carrier<
    'boxOrient',
    | 'mozInitial'
    | 'blockAxis'
    | 'horizontal'
    | 'inherit'
    | 'initial'
    | 'inlineAxis'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'vertical',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly boxPack: Carrier<
    'boxPack',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly boxShadow: Carrier<
    'boxShadow',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    'shadow',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly boxSizing: Carrier<
    'boxSizing',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019. */
  readonly breakAfter: Carrier<
    'breakAfter',
    | 'mozInitial'
    | 'all'
    | 'always'
    | 'auto'
    | 'avoid'
    | 'avoidColumn'
    | 'avoidPage'
    | 'avoidRegion'
    | 'column'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'page'
    | 'recto'
    | 'region'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset'
    | 'verso',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019. */
  readonly breakBefore: Carrier<
    'breakBefore',
    | 'mozInitial'
    | 'all'
    | 'always'
    | 'auto'
    | 'avoid'
    | 'avoidColumn'
    | 'avoidPage'
    | 'avoidRegion'
    | 'column'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'page'
    | 'recto'
    | 'region'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset'
    | 'verso',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019. */
  readonly breakInside: Carrier<
    'breakInside',
    | 'mozInitial'
    | 'auto'
    | 'avoid'
    | 'avoidColumn'
    | 'avoidPage'
    | 'avoidRegion'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly captionSide: Carrier<
    'captionSide',
    'mozInitial' | 'bottom' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'top' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'caret-color'> || <'caret-shape'>` */
  readonly caret: Carrier<
    'caret',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'bar'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'block'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'underscore'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly caretColor: Carrier<
    'caretColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** **Syntax**: `auto | bar | block | underscore` */
  readonly caretShape: Carrier<
    'caretShape',
    | 'mozInitial'
    | 'auto'
    | 'bar'
    | 'block'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'underscore'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly clear: Carrier<
    'clear',
    | 'mozInitial'
    | 'both'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`clip`** CSS property defines a visible portion of an element. The `clip` property applies only to absolutely positioned elements — that is, elements with `position:absolute` or `position:fixed`. */
  readonly clip: Carrier<
    'clip',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly clipPath: Carrier<
    'clipPath',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'marginBox'
    | 'none'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly clipRule: Carrier<
    'clipRule',
    | 'mozInitial'
    | 'evenodd'
    | 'inherit'
    | 'initial'
    | 'nonzero'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly color: Carrier<
    'color',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly colorAdjust: Carrier<
    'colorAdjust',
    'mozInitial' | 'economy' | 'exact' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** color-interpolation */
  readonly colorInterpolation: Carrier<
    'colorInterpolation',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'linearRGB'
    | 'revert'
    | 'revertLayer'
    | 'sRGB'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly colorInterpolationFilters: Carrier<
    'colorInterpolationFilters',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'linearRGB'
    | 'revert'
    | 'revertLayer'
    | 'sRGB'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** color-rendering */
  readonly colorRendering: Carrier<
    'colorRendering',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'optimizeQuality'
    | 'optimizeSpeed'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022. */
  readonly colorScheme: Carrier<
    'colorScheme',
    | 'mozInitial'
    | 'dark'
    | 'inherit'
    | 'initial'
    | 'light'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnCount: Carrier<
    'columnCount',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnFill: Carrier<
    'columnFill',
    'mozInitial' | 'auto' | 'balance' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly columnGap: Carrier<
    'columnGap',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRule: Carrier<
    'columnRule',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRuleColor: Carrier<
    'columnRuleColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRuleStyle: Carrier<
    'columnRuleStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columnRuleWidth: Carrier<
    'columnRuleWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly columns: Carrier<
    'columns',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly columnSpan: Carrier<
    'columnSpan',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016. */
  readonly columnWidth: Carrier<
    'columnWidth',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly contain: Carrier<
    'contain',
    | 'mozInitial'
    | 'content'
    | 'inherit'
    | 'initial'
    | 'inlineSize'
    | 'layout'
    | 'none'
    | 'paint'
    | 'revert'
    | 'revertLayer'
    | 'size'
    | 'strict'
    | 'style'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly container: Carrier<
    'container',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly containerName: Carrier<
    'containerName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly containerType: Carrier<
    'containerType',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'inlineSize'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'scrollState'
    | 'size'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicBlockSize: Carrier<
    'containIntrinsicBlockSize',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicHeight: Carrier<
    'containIntrinsicHeight',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicInlineSize: Carrier<
    'containIntrinsicInlineSize',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicSize: Carrier<
    'containIntrinsicSize',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly containIntrinsicWidth: Carrier<
    'containIntrinsicWidth',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly content: Carrier<
    'content',
    | 'mozInitial'
    | 'closeQuote'
    | 'inherit'
    | 'initial'
    | 'noCloseQuote'
    | 'noOpenQuote'
    | 'none'
    | 'normal'
    | 'openQuote'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly contentVisibility: Carrier<
    'contentVisibility',
    | 'mozInitial'
    | 'auto'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly counterIncrement: Carrier<
    'counterIncrement',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly counterReset: Carrier<
    'counterReset',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly counterSet: Carrier<
    'counterSet',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since December 2021. */
  readonly cursor: Carrier<
    'cursor',
    | 'mozGrab'
    | 'mozInitial'
    | 'mozZoomIn'
    | 'mozZoomOut'
    | 'webkitGrab'
    | 'webkitGrabbing'
    | 'webkitZoomIn'
    | 'webkitZoomOut'
    | 'alias'
    | 'allScroll'
    | 'auto'
    | 'cell'
    | 'colResize'
    | 'contextMenu'
    | 'copy'
    | 'crosshair'
    | 'default'
    | 'eResize'
    | 'ewResize'
    | 'grab'
    | 'grabbing'
    | 'help'
    | 'inherit'
    | 'initial'
    | 'move'
    | 'nResize'
    | 'neResize'
    | 'neswResize'
    | 'noDrop'
    | 'none'
    | 'notAllowed'
    | 'nsResize'
    | 'nwResize'
    | 'nwseResize'
    | 'pointer'
    | 'progress'
    | 'revert'
    | 'revertLayer'
    | 'rowResize'
    | 'sResize'
    | 'seResize'
    | 'swResize'
    | 'text'
    | 'unset'
    | 'verticalText'
    | 'wResize'
    | 'wait'
    | 'zoomIn'
    | 'zoomOut',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly cx: Carrier<
    'cx',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly cy: Carrier<
    'cy',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly d: Carrier<
    'd',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly direction: Carrier<
    'direction',
    'mozInitial' | 'inherit' | 'initial' | 'ltr' | 'revert' | 'revertLayer' | 'rtl' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly display: Carrier<
    'display',
    | 'mozInitial'
    | 'msFlexbox'
    | 'msGrid'
    | 'msInlineFlexbox'
    | 'msInlineGrid'
    | 'webkitFlex'
    | 'webkitInlineFlex'
    | 'block'
    | 'contents'
    | 'flex'
    | 'flow'
    | 'flowRoot'
    | 'grid'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'inlineBlock'
    | 'inlineFlex'
    | 'inlineGrid'
    | 'inlineListItem'
    | 'inlineTable'
    | 'listItem'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'ruby'
    | 'rubyBase'
    | 'rubyBaseContainer'
    | 'rubyText'
    | 'rubyTextContainer'
    | 'runIn'
    | 'table'
    | 'tableCaption'
    | 'tableCell'
    | 'tableColumn'
    | 'tableColumnGroup'
    | 'tableFooterGroup'
    | 'tableHeaderGroup'
    | 'tableRow'
    | 'tableRowGroup'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly dominantBaseline: Carrier<
    'dominantBaseline',
    | 'mozInitial'
    | 'alphabetic'
    | 'auto'
    | 'central'
    | 'hanging'
    | 'ideographic'
    | 'inherit'
    | 'initial'
    | 'mathematical'
    | 'middle'
    | 'revert'
    | 'revertLayer'
    | 'textBottom'
    | 'textTop'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly emptyCells: Carrier<
    'emptyCells',
    'mozInitial' | 'hide' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'show' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fieldSizing: Carrier<
    'fieldSizing',
    'mozInitial' | 'content' | 'fixed' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fill: Carrier<
    'fill',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'contextFill'
    | 'contextStroke'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fillOpacity: Carrier<
    'fillOpacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fillRule: Carrier<
    'fillRule',
    | 'mozInitial'
    | 'evenodd'
    | 'inherit'
    | 'initial'
    | 'nonzero'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly filter: Carrier<
    'filter',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flex: Carrier<
    'flex',
    | 'mozInitial'
    | 'auto'
    | 'content'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexBasis: Carrier<
    'flexBasis',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitAuto'
    | 'auto'
    | 'content'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexDirection: Carrier<
    'flexDirection',
    | 'mozInitial'
    | 'column'
    | 'columnReverse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'row'
    | 'rowReverse'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexFlow: Carrier<
    'flexFlow',
    | 'mozInitial'
    | 'column'
    | 'columnReverse'
    | 'inherit'
    | 'initial'
    | 'nowrap'
    | 'revert'
    | 'revertLayer'
    | 'row'
    | 'rowReverse'
    | 'unset'
    | 'wrap'
    | 'wrapReverse',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexGrow: Carrier<
    'flexGrow',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexShrink: Carrier<
    'flexShrink',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly flexWrap: Carrier<
    'flexWrap',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'nowrap'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'wrap'
    | 'wrapReverse',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly float: Carrier<
    'float',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly floodColor: Carrier<
    'floodColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly floodOpacity: Carrier<
    'floodOpacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly font: Carrier<
    'font',
    | 'mozInitial'
    | 'caption'
    | 'icon'
    | 'inherit'
    | 'initial'
    | 'menu'
    | 'messageBox'
    | 'revert'
    | 'revertLayer'
    | 'smallCaption'
    | 'statusBar'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontFamily: Carrier<
    'fontFamily',
    | 'appleSystem'
    | 'mozInitial'
    | 'cursive'
    | 'emoji'
    | 'fangsong'
    | 'fantasy'
    | 'inherit'
    | 'initial'
    | 'math'
    | 'monospace'
    | 'revert'
    | 'revertLayer'
    | 'sansSerif'
    | 'serif'
    | 'systemUi'
    | 'uiMonospace'
    | 'uiRounded'
    | 'uiSansSerif'
    | 'uiSerif'
    | 'unset',
    never,
    1,
    'fontFamily',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly fontFeatureSettings: Carrier<
    'fontFeatureSettings',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontKerning: Carrier<
    'fontKerning',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontLanguageOverride: Carrier<
    'fontLanguageOverride',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2020. */
  readonly fontOpticalSizing: Carrier<
    'fontOpticalSizing',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2022. */
  readonly fontPalette: Carrier<
    'fontPalette',
    | 'mozInitial'
    | 'dark'
    | 'inherit'
    | 'initial'
    | 'light'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontSize: Carrier<
    'fontSize',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'large'
    | 'larger'
    | 'math'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'small'
    | 'smaller'
    | 'unset'
    | 'xLarge'
    | 'xSmall'
    | 'xxLarge'
    | 'xxSmall'
    | 'xxxLarge',
    'length',
    1,
    'fontSize',
    T
  >;
  /** Since July 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly fontSizeAdjust: Carrier<
    'fontSizeAdjust',
    'mozInitial' | 'fromFont' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered. */
  readonly fontSmooth: Carrier<
    'fontSmooth',
    | 'mozInitial'
    | 'always'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'large'
    | 'medium'
    | 'never'
    | 'revert'
    | 'revertLayer'
    | 'small'
    | 'unset'
    | 'xLarge'
    | 'xSmall'
    | 'xxLarge'
    | 'xxSmall'
    | 'xxxLarge',
    never,
    1,
    '',
    T
  >;
  /** The **`font-stretch`** CSS property selects a normal, condensed, or expanded face from a font. */
  readonly fontStretch: Carrier<
    'fontStretch',
    | 'mozInitial'
    | 'condensed'
    | 'expanded'
    | 'extraCondensed'
    | 'extraExpanded'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'semiCondensed'
    | 'semiExpanded'
    | 'ultraCondensed'
    | 'ultraExpanded'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontStyle: Carrier<
    'fontStyle',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'italic'
    | 'normal'
    | 'oblique'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022. */
  readonly fontSynthesis: Carrier<
    'fontSynthesis',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'position'
    | 'revert'
    | 'revertLayer'
    | 'smallCaps'
    | 'style'
    | 'unset'
    | 'weight',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontSynthesisPosition: Carrier<
    'fontSynthesisPosition',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontSynthesisSmallCaps: Carrier<
    'fontSynthesisSmallCaps',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontSynthesisStyle: Carrier<
    'fontSynthesisStyle',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontSynthesisWeight: Carrier<
    'fontSynthesisWeight',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontVariant: Carrier<
    'fontVariant',
    | 'mozInitial'
    | 'allPetiteCaps'
    | 'allSmallCaps'
    | 'commonLigatures'
    | 'contextual'
    | 'diagonalFractions'
    | 'discretionaryLigatures'
    | 'fullWidth'
    | 'historicalForms'
    | 'historicalLigatures'
    | 'inherit'
    | 'initial'
    | 'jis04'
    | 'jis78'
    | 'jis83'
    | 'jis90'
    | 'liningNums'
    | 'noCommonLigatures'
    | 'noContextual'
    | 'noDiscretionaryLigatures'
    | 'noHistoricalLigatures'
    | 'none'
    | 'normal'
    | 'oldstyleNums'
    | 'ordinal'
    | 'petiteCaps'
    | 'proportionalNums'
    | 'proportionalWidth'
    | 'revert'
    | 'revertLayer'
    | 'ruby'
    | 'simplified'
    | 'slashedZero'
    | 'smallCaps'
    | 'stackedFractions'
    | 'tabularNums'
    | 'titlingCaps'
    | 'traditional'
    | 'unicase'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly fontVariantAlternates: Carrier<
    'fontVariantAlternates',
    | 'mozInitial'
    | 'historicalForms'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantCaps: Carrier<
    'fontVariantCaps',
    | 'mozInitial'
    | 'allPetiteCaps'
    | 'allSmallCaps'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'petiteCaps'
    | 'revert'
    | 'revertLayer'
    | 'smallCaps'
    | 'titlingCaps'
    | 'unicase'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantEastAsian: Carrier<
    'fontVariantEastAsian',
    | 'mozInitial'
    | 'fullWidth'
    | 'inherit'
    | 'initial'
    | 'jis04'
    | 'jis78'
    | 'jis83'
    | 'jis90'
    | 'normal'
    | 'proportionalWidth'
    | 'revert'
    | 'revertLayer'
    | 'ruby'
    | 'simplified'
    | 'traditional'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontVariantEmoji: Carrier<
    'fontVariantEmoji',
    | 'mozInitial'
    | 'emoji'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unicode'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantLigatures: Carrier<
    'fontVariantLigatures',
    | 'mozInitial'
    | 'commonLigatures'
    | 'contextual'
    | 'discretionaryLigatures'
    | 'historicalLigatures'
    | 'inherit'
    | 'initial'
    | 'noCommonLigatures'
    | 'noContextual'
    | 'noDiscretionaryLigatures'
    | 'noHistoricalLigatures'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly fontVariantNumeric: Carrier<
    'fontVariantNumeric',
    | 'mozInitial'
    | 'diagonalFractions'
    | 'inherit'
    | 'initial'
    | 'liningNums'
    | 'normal'
    | 'oldstyleNums'
    | 'ordinal'
    | 'proportionalNums'
    | 'revert'
    | 'revertLayer'
    | 'slashedZero'
    | 'stackedFractions'
    | 'tabularNums'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly fontVariantPosition: Carrier<
    'fontVariantPosition',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'sub'
    | 'super'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2018. */
  readonly fontVariationSettings: Carrier<
    'fontVariationSettings',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly fontWeight: Carrier<
    'fontWeight',
    | 'mozInitial'
    | 'bold'
    | 'bolder'
    | 'inherit'
    | 'initial'
    | 'lighter'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    'fontWeight',
    T
  >;
  /** **Syntax**: `normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded` */
  readonly fontWidth: Carrier<
    'fontWidth',
    | 'mozInitial'
    | 'condensed'
    | 'expanded'
    | 'extraCondensed'
    | 'extraExpanded'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'semiCondensed'
    | 'semiExpanded'
    | 'ultraCondensed'
    | 'ultraExpanded'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly forcedColorAdjust: Carrier<
    'forcedColorAdjust',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'preserveParentColor'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gap: Carrier<
    'gap',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** glyph-orientation-vertical */
  readonly glyphOrientationVertical: Carrier<
    'glyphOrientationVertical',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly grid: Carrier<
    'grid',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridArea: Carrier<
    'gridArea',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly gridAutoColumns: Carrier<
    'gridAutoColumns',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridAutoFlow: Carrier<
    'gridAutoFlow',
    | 'mozInitial'
    | 'column'
    | 'dense'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'row'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly gridAutoRows: Carrier<
    'gridAutoRows',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridColumn: Carrier<
    'gridColumn',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridColumnEnd: Carrier<
    'gridColumnEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly gridColumnGap: Carrier<
    'gridColumnGap',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridColumnStart: Carrier<
    'gridColumnStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridGap: Carrier<
    'gridGap',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRow: Carrier<
    'gridRow',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRowEnd: Carrier<
    'gridRowEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRowGap: Carrier<
    'gridRowGap',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridRowStart: Carrier<
    'gridRowStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplate: Carrier<
    'gridTemplate',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplateAreas: Carrier<
    'gridTemplateAreas',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplateColumns: Carrier<
    'gridTemplateColumns',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'subgrid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly gridTemplateRows: Carrier<
    'gridTemplateRows',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'subgrid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly hangingPunctuation: Carrier<
    'hangingPunctuation',
    | 'mozInitial'
    | 'allowEnd'
    | 'first'
    | 'forceEnd'
    | 'inherit'
    | 'initial'
    | 'last'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly height: Carrier<
    'height',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFitContent'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly hyphenateCharacter: Carrier<
    'hyphenateCharacter',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly hyphenateLimitChars: Carrier<
    'hyphenateLimitChars',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly hyphens: Carrier<
    'hyphens',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'manual'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2020. */
  readonly imageOrientation: Carrier<
    'imageOrientation',
    | 'mozInitial'
    | 'flip'
    | 'fromImage'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly imageRendering: Carrier<
    'imageRendering',
    | 'mozCrispEdges'
    | 'mozInitial'
    | 'webkitOptimizeContrast'
    | 'auto'
    | 'crispEdges'
    | 'inherit'
    | 'initial'
    | 'pixelated'
    | 'revert'
    | 'revertLayer'
    | 'smooth'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`image-resolution`** CSS property specifies the intrinsic resolution of all raster images used in or on the element. It affects content images such as replaced elements and generated content, and decorative images such as `background-image` images. */
  readonly imageResolution: Carrier<
    'imageResolution',
    'mozInitial' | 'fromImage' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | normal | active | inactive | disabled` */
  readonly imeMode: Carrier<
    'imeMode',
    | 'mozInitial'
    | 'active'
    | 'auto'
    | 'disabled'
    | 'inactive'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly initialLetter: Carrier<
    'initialLetter',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `[ auto | alphabetic | hanging | ideographic ]` */
  readonly initialLetterAlign: Carrier<
    'initialLetterAlign',
    | 'mozInitial'
    | 'alphabetic'
    | 'auto'
    | 'hanging'
    | 'ideographic'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly inlineSize: Carrier<
    'inlineSize',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly inset: Carrier<
    'inset',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    4,
    'spacing',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly insetArea: Carrier<
    'insetArea',
    | 'mozInitial'
    | 'blockEnd'
    | 'blockStart'
    | 'bottom'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfBlockEnd'
    | 'selfBlockStart'
    | 'selfEnd'
    | 'selfInlineEnd'
    | 'selfInlineStart'
    | 'selfStart'
    | 'spanAll'
    | 'spanBlockEnd'
    | 'spanBlockStart'
    | 'spanBottom'
    | 'spanEnd'
    | 'spanInlineEnd'
    | 'spanInlineStart'
    | 'spanLeft'
    | 'spanRight'
    | 'spanSelfBlockEnd'
    | 'spanSelfBlockStart'
    | 'spanSelfEnd'
    | 'spanSelfInlineEnd'
    | 'spanSelfInlineStart'
    | 'spanSelfStart'
    | 'spanStart'
    | 'spanTop'
    | 'spanXEnd'
    | 'spanXSelfEnd'
    | 'spanXSelfStart'
    | 'spanXStart'
    | 'spanYEnd'
    | 'spanYSelfEnd'
    | 'spanYSelfStart'
    | 'spanYStart'
    | 'start'
    | 'top'
    | 'unset'
    | 'xEnd'
    | 'xSelfEnd'
    | 'xSelfStart'
    | 'xStart'
    | 'yEnd'
    | 'ySelfEnd'
    | 'ySelfStart'
    | 'yStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetBlock: Carrier<
    'insetBlock',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetBlockEnd: Carrier<
    'insetBlockEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetBlockStart: Carrier<
    'insetBlockStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetInline: Carrier<
    'insetInline',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetInlineEnd: Carrier<
    'insetInlineEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly insetInlineStart: Carrier<
    'insetInlineStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly interpolateSize: Carrier<
    'interpolateSize',
    | 'mozInitial'
    | 'allowKeywords'
    | 'inherit'
    | 'initial'
    | 'numericOnly'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly isolation: Carrier<
    'isolation',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'isolate' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly justifyContent: Carrier<
    'justifyContent',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2016. */
  readonly justifyItems: Carrier<
    'justifyItems',
    | 'mozInitial'
    | 'anchorCenter'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'legacy'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly justifySelf: Carrier<
    'justifySelf',
    | 'mozInitial'
    | 'anchorCenter'
    | 'auto'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#` */
  readonly justifyTracks: Carrier<
    'justifyTracks',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly KhtmlBoxAlign: Carrier<
    'KhtmlBoxAlign',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly KhtmlBoxDirection: Carrier<
    'KhtmlBoxDirection',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly KhtmlBoxFlex: Carrier<
    'KhtmlBoxFlex',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group. */
  readonly KhtmlBoxFlexGroup: Carrier<
    'KhtmlBoxFlexGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes). */
  readonly KhtmlBoxLines: Carrier<
    'KhtmlBoxLines',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'multiple'
    | 'revert'
    | 'revertLayer'
    | 'single'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly KhtmlBoxOrdinalGroup: Carrier<
    'KhtmlBoxOrdinalGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly KhtmlBoxOrient: Carrier<
    'KhtmlBoxOrient',
    | 'mozInitial'
    | 'blockAxis'
    | 'horizontal'
    | 'inherit'
    | 'initial'
    | 'inlineAxis'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'vertical',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly KhtmlBoxPack: Carrier<
    'KhtmlBoxPack',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly KhtmlLineBreak: Carrier<
    'KhtmlLineBreak',
    | 'mozInitial'
    | 'anywhere'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'loose'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'strict'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly KhtmlOpacity: Carrier<
    'KhtmlOpacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly KhtmlUserSelect: Carrier<
    'KhtmlUserSelect',
    | 'mozInitial'
    | 'mozNone'
    | 'all'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly left: Carrier<
    'left',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly letterSpacing: Carrier<
    'letterSpacing',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'letterSpacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly lightingColor: Carrier<
    'lightingColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly lineBreak: Carrier<
    'lineBreak',
    | 'mozInitial'
    | 'anywhere'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'loose'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'strict'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly lineClamp: Carrier<
    'lineClamp',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly lineHeight: Carrier<
    'lineHeight',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'lineHeight',
    T
  >;
  /** The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit. */
  readonly lineHeightStep: Carrier<
    'lineHeightStep',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStyle: Carrier<
    'listStyle',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'inside'
    | 'none'
    | 'outside'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStyleImage: Carrier<
    'listStyleImage',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStylePosition: Carrier<
    'listStylePosition',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'inside'
    | 'outside'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly listStyleType: Carrier<
    'listStyleType',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly margin: Carrier<
    'margin',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    4,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly marginBlock: Carrier<
    'marginBlock',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginBlockEnd: Carrier<
    'marginBlockEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginBlockStart: Carrier<
    'marginBlockStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginBottom: Carrier<
    'marginBottom',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly marginInline: Carrier<
    'marginInline',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginInlineEnd: Carrier<
    'marginInlineEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly marginInlineStart: Carrier<
    'marginInlineStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginLeft: Carrier<
    'marginLeft',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginRight: Carrier<
    'marginRight',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly marginTop: Carrier<
    'marginTop',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly marginTrim: Carrier<
    'marginTrim',
    | 'mozInitial'
    | 'all'
    | 'inFlow'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly marker: Carrier<
    'marker',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly markerEnd: Carrier<
    'markerEnd',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly markerMid: Carrier<
    'markerMid',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly markerStart: Carrier<
    'markerStart',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly mask: Carrier<
    'mask',
    | 'mozInitial'
    | 'add'
    | 'alpha'
    | 'borderBox'
    | 'bottom'
    | 'center'
    | 'contentBox'
    | 'exclude'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'intersect'
    | 'left'
    | 'luminance'
    | 'marginBox'
    | 'matchSource'
    | 'noClip'
    | 'noRepeat'
    | 'none'
    | 'paddingBox'
    | 'repeat'
    | 'repeatX'
    | 'repeatY'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'round'
    | 'space'
    | 'strokeBox'
    | 'subtract'
    | 'top'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorder: Carrier<
    'maskBorder',
    | 'mozInitial'
    | 'alpha'
    | 'inherit'
    | 'initial'
    | 'luminance'
    | 'none'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border. */
  readonly maskBorderMode: Carrier<
    'maskBorderMode',
    | 'mozInitial'
    | 'alpha'
    | 'inherit'
    | 'initial'
    | 'luminance'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderOutset: Carrier<
    'maskBorderOutset',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderRepeat: Carrier<
    'maskBorderRepeat',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderSlice: Carrier<
    'maskBorderSlice',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderSource: Carrier<
    'maskBorderSource',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly maskBorderWidth: Carrier<
    'maskBorderWidth',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskClip: Carrier<
    'maskClip',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'noClip'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskComposite: Carrier<
    'maskComposite',
    | 'mozInitial'
    | 'add'
    | 'exclude'
    | 'inherit'
    | 'initial'
    | 'intersect'
    | 'revert'
    | 'revertLayer'
    | 'subtract'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskImage: Carrier<
    'maskImage',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskMode: Carrier<
    'maskMode',
    | 'mozInitial'
    | 'alpha'
    | 'inherit'
    | 'initial'
    | 'luminance'
    | 'matchSource'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskOrigin: Carrier<
    'maskOrigin',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskPosition: Carrier<
    'maskPosition',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskRepeat: Carrier<
    'maskRepeat',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'noRepeat'
    | 'repeat'
    | 'repeatX'
    | 'repeatY'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly maskSize: Carrier<
    'maskSize',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'cover'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly maskType: Carrier<
    'maskType',
    | 'mozInitial'
    | 'alpha'
    | 'inherit'
    | 'initial'
    | 'luminance'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly masonryAutoFlow: Carrier<
    'masonryAutoFlow',
    | 'mozInitial'
    | 'definiteFirst'
    | 'inherit'
    | 'initial'
    | 'next'
    | 'ordered'
    | 'pack'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly mathDepth: Carrier<
    'mathDepth',
    'mozInitial' | 'autoAdd' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly mathShift: Carrier<
    'mathShift',
    | 'mozInitial'
    | 'compact'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly mathStyle: Carrier<
    'mathStyle',
    | 'mozInitial'
    | 'compact'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly maxBlockSize: Carrier<
    'maxBlockSize',
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly maxHeight: Carrier<
    'maxHeight',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFitContent'
    | 'webkitMaxContent'
    | 'webkitMinContent'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'intrinsic'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly maxInlineSize: Carrier<
    'maxInlineSize',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** **Syntax**: `none | <integer>` */
  readonly maxLines: Carrier<
    'maxLines',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly maxWidth: Carrier<
    'maxWidth',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFitContent'
    | 'webkitMaxContent'
    | 'webkitMinContent'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'intrinsic'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly minBlockSize: Carrier<
    'minBlockSize',
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly minHeight: Carrier<
    'minHeight',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFitContent'
    | 'webkitMaxContent'
    | 'webkitMinContent'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'intrinsic'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly minInlineSize: Carrier<
    'minInlineSize',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly minWidth: Carrier<
    'minWidth',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFitContent'
    | 'webkitMaxContent'
    | 'webkitMinContent'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'intrinsic'
    | 'maxContent'
    | 'minContent'
    | 'minIntrinsic'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly mixBlendMode: Carrier<
    'mixBlendMode',
    | 'mozInitial'
    | 'color'
    | 'colorBurn'
    | 'colorDodge'
    | 'darken'
    | 'difference'
    | 'exclusion'
    | 'hardLight'
    | 'hue'
    | 'inherit'
    | 'initial'
    | 'lighten'
    | 'luminosity'
    | 'multiply'
    | 'normal'
    | 'overlay'
    | 'plusDarker'
    | 'plusLighter'
    | 'revert'
    | 'revertLayer'
    | 'saturation'
    | 'screen'
    | 'softLight'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly motion: Carrier<
    'motion',
    | 'mozInitial'
    | 'auto'
    | 'borderBox'
    | 'bottom'
    | 'center'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'none'
    | 'normal'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'strokeBox'
    | 'top'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly motionDistance: Carrier<
    'motionDistance',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly motionPath: Carrier<
    'motionPath',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly motionRotation: Carrier<
    'motionRotation',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'reverse' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimation: Carrier<
    'MozAnimation',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'auto'
    | 'backwards'
    | 'both'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'forwards'
    | 'infinite'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'paused'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationDelay: Carrier<
    'MozAnimationDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationDirection: Carrier<
    'MozAnimationDirection',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationDuration: Carrier<
    'MozAnimationDuration',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationFillMode: Carrier<
    'MozAnimationFillMode',
    | 'mozInitial'
    | 'backwards'
    | 'both'
    | 'forwards'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationIterationCount: Carrier<
    'MozAnimationIterationCount',
    'mozInitial' | 'infinite' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationName: Carrier<
    'MozAnimationName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationPlayState: Carrier<
    'MozAnimationPlayState',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'paused'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozAnimationTimingFunction: Carrier<
    'MozAnimationTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly MozAppearance: Carrier<
    'MozAppearance',
    | 'mozInitial'
    | 'mozMacUnifiedToolbar'
    | 'mozWinBorderlessGlass'
    | 'mozWinBrowsertabbarToolbox'
    | 'mozWinCommunicationsToolbox'
    | 'mozWinCommunicationstext'
    | 'mozWinExcludeGlass'
    | 'mozWinGlass'
    | 'mozWinMediaToolbox'
    | 'mozWinMediatext'
    | 'mozWindowButtonBox'
    | 'mozWindowButtonBoxMaximized'
    | 'mozWindowButtonClose'
    | 'mozWindowButtonMaximize'
    | 'mozWindowButtonMinimize'
    | 'mozWindowButtonRestore'
    | 'mozWindowFrameBottom'
    | 'mozWindowFrameLeft'
    | 'mozWindowFrameRight'
    | 'mozWindowTitlebar'
    | 'mozWindowTitlebarMaximized'
    | 'button'
    | 'buttonArrowDown'
    | 'buttonArrowNext'
    | 'buttonArrowPrevious'
    | 'buttonArrowUp'
    | 'buttonBevel'
    | 'buttonFocus'
    | 'caret'
    | 'checkbox'
    | 'checkboxContainer'
    | 'checkboxLabel'
    | 'checkmenuitem'
    | 'dualbutton'
    | 'groupbox'
    | 'inherit'
    | 'initial'
    | 'listbox'
    | 'listitem'
    | 'menuarrow'
    | 'menubar'
    | 'menucheckbox'
    | 'menuimage'
    | 'menuitem'
    | 'menuitemtext'
    | 'menulist'
    | 'menulistButton'
    | 'menulistText'
    | 'menulistTextfield'
    | 'menupopup'
    | 'menuradio'
    | 'menuseparator'
    | 'meterbar'
    | 'meterchunk'
    | 'none'
    | 'progressbar'
    | 'progressbarVertical'
    | 'progresschunk'
    | 'progresschunkVertical'
    | 'radio'
    | 'radioContainer'
    | 'radioLabel'
    | 'radiomenuitem'
    | 'range'
    | 'rangeThumb'
    | 'resizer'
    | 'resizerpanel'
    | 'revert'
    | 'revertLayer'
    | 'scaleHorizontal'
    | 'scaleVertical'
    | 'scalethumbHorizontal'
    | 'scalethumbVertical'
    | 'scalethumbend'
    | 'scalethumbstart'
    | 'scalethumbtick'
    | 'scrollbarbuttonDown'
    | 'scrollbarbuttonLeft'
    | 'scrollbarbuttonRight'
    | 'scrollbarbuttonUp'
    | 'scrollbarthumbHorizontal'
    | 'scrollbarthumbVertical'
    | 'scrollbartrackHorizontal'
    | 'scrollbartrackVertical'
    | 'searchfield'
    | 'separator'
    | 'sheet'
    | 'spinner'
    | 'spinnerDownbutton'
    | 'spinnerTextfield'
    | 'spinnerUpbutton'
    | 'splitter'
    | 'statusbar'
    | 'statusbarpanel'
    | 'tab'
    | 'tabScrollArrowBack'
    | 'tabScrollArrowForward'
    | 'tabpanel'
    | 'tabpanels'
    | 'textfield'
    | 'textfieldMultiline'
    | 'toolbar'
    | 'toolbarbutton'
    | 'toolbarbuttonDropdown'
    | 'toolbargripper'
    | 'toolbox'
    | 'tooltip'
    | 'treeheader'
    | 'treeheadercell'
    | 'treeheadersortarrow'
    | 'treeitem'
    | 'treeline'
    | 'treetwisty'
    | 'treetwistyopen'
    | 'treeview'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly MozBackfaceVisibility: Carrier<
    'MozBackfaceVisibility',
    | 'mozInitial'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBackgroundClip: Carrier<
    'MozBackgroundClip',
    | 'mozInitial'
    | 'borderArea'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBackgroundOrigin: Carrier<
    'MozBackgroundOrigin',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBackgroundSize: Carrier<
    'MozBackgroundSize',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'cover'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<url> | none` */
  readonly MozBinding: Carrier<
    'MozBinding',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderBottomColors: Carrier<
    'MozBorderBottomColors',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderEndColor: Carrier<
    'MozBorderEndColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderEndStyle: Carrier<
    'MozBorderEndStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderEndWidth: Carrier<
    'MozBorderEndWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderImage: Carrier<
    'MozBorderImage',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderLeftColors: Carrier<
    'MozBorderLeftColors',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadius: Carrier<
    'MozBorderRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusBottomleft: Carrier<
    'MozBorderRadiusBottomleft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusBottomright: Carrier<
    'MozBorderRadiusBottomright',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusTopleft: Carrier<
    'MozBorderRadiusTopleft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBorderRadiusTopright: Carrier<
    'MozBorderRadiusTopright',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderRightColors: Carrier<
    'MozBorderRightColors',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderStartColor: Carrier<
    'MozBorderStartColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozBorderStartStyle: Carrier<
    'MozBorderStartStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>+ | none` */
  readonly MozBorderTopColors: Carrier<
    'MozBorderTopColors',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly MozBoxAlign: Carrier<
    'MozBoxAlign',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly MozBoxDirection: Carrier<
    'MozBoxDirection',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly MozBoxFlex: Carrier<
    'MozBoxFlex',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly MozBoxOrdinalGroup: Carrier<
    'MozBoxOrdinalGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly MozBoxOrient: Carrier<
    'MozBoxOrient',
    | 'mozInitial'
    | 'blockAxis'
    | 'horizontal'
    | 'inherit'
    | 'initial'
    | 'inlineAxis'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'vertical',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly MozBoxPack: Carrier<
    'MozBoxPack',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBoxShadow: Carrier<
    'MozBoxShadow',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozBoxSizing: Carrier<
    'MozBoxSizing',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnCount: Carrier<
    'MozColumnCount',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnFill: Carrier<
    'MozColumnFill',
    'mozInitial' | 'auto' | 'balance' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRule: Carrier<
    'MozColumnRule',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRuleColor: Carrier<
    'MozColumnRuleColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRuleStyle: Carrier<
    'MozColumnRuleStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumnRuleWidth: Carrier<
    'MozColumnRuleWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly MozColumns: Carrier<
    'MozColumns',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016. */
  readonly MozColumnWidth: Carrier<
    'MozColumnWidth',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | [ fill | fill-opacity | stroke | stroke-opacity ]#` */
  readonly MozContextProperties: Carrier<
    'MozContextProperties',
    | 'mozInitial'
    | 'fill'
    | 'fillOpacity'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'stroke'
    | 'strokeOpacity'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The non-standard **`-moz-float-edge`** CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness. */
  readonly MozFloatEdge: Carrier<
    'MozFloatEdge',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'marginBox'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly MozFontFeatureSettings: Carrier<
    'MozFontFeatureSettings',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly MozFontLanguageOverride: Carrier<
    'MozFontLanguageOverride',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-force-broken-image-icon`** extended CSS property can be used to force the broken image icon to be shown even when a broken image has an `alt` attribute. */
  readonly MozForceBrokenImageIcon: Carrier<
    'MozForceBrokenImageIcon',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly MozHyphens: Carrier<
    'MozHyphens',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'manual'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozMarginEnd: Carrier<
    'MozMarginEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozMarginStart: Carrier<
    'MozMarginStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOpacity: Carrier<
    'MozOpacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-orient`** CSS property specifies the orientation of the element to which it's applied. */
  readonly MozOrient: Carrier<
    'MozOrient',
    | 'mozInitial'
    | 'block'
    | 'horizontal'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'vertical',
    never,
    1,
    '',
    T
  >;
  /** The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered. */
  readonly MozOsxFontSmoothing: Carrier<
    'MozOsxFontSmoothing',
    | 'mozInitial'
    | 'always'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'large'
    | 'medium'
    | 'never'
    | 'revert'
    | 'revertLayer'
    | 'small'
    | 'unset'
    | 'xLarge'
    | 'xSmall'
    | 'xxLarge'
    | 'xxSmall'
    | 'xxxLarge',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly MozOutline: Carrier<
    'MozOutline',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOutlineColor: Carrier<
    'MozOutlineColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?` */
  readonly MozOutlineRadius: Carrier<
    'MozOutlineRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusBottomleft: Carrier<
    'MozOutlineRadiusBottomleft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusBottomright: Carrier<
    'MozOutlineRadiusBottomright',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusTopleft: Carrier<
    'MozOutlineRadiusTopleft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<outline-radius>` */
  readonly MozOutlineRadiusTopright: Carrier<
    'MozOutlineRadiusTopright',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOutlineStyle: Carrier<
    'MozOutlineStyle',
    | 'mozInitial'
    | 'auto'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly MozOutlineWidth: Carrier<
    'MozOutlineWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozPaddingEnd: Carrier<
    'MozPaddingEnd',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozPaddingStart: Carrier<
    'MozPaddingStart',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozPerspective: Carrier<
    'MozPerspective',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozPerspectiveOrigin: Carrier<
    'MozPerspectiveOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `ignore | stretch-to-fit` */
  readonly MozStackSizing: Carrier<
    'MozStackSizing',
    | 'mozInitial'
    | 'ignore'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'stretchToFit'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021. */
  readonly MozTabSize: Carrier<
    'MozTabSize',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly MozTextAlignLast: Carrier<
    'MozTextAlignLast',
    | 'mozInitial'
    | 'auto'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | blink` */
  readonly MozTextBlink: Carrier<
    'MozTextBlink',
    'mozInitial' | 'blink' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozTextDecorationColor: Carrier<
    'MozTextDecorationColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozTextDecorationLine: Carrier<
    'MozTextDecorationLine',
    | 'mozInitial'
    | 'blink'
    | 'grammarError'
    | 'inherit'
    | 'initial'
    | 'lineThrough'
    | 'none'
    | 'overline'
    | 'revert'
    | 'revertLayer'
    | 'spellingError'
    | 'underline'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly MozTextDecorationStyle: Carrier<
    'MozTextDecorationStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'solid'
    | 'unset'
    | 'wavy',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly MozTextSizeAdjust: Carrier<
    'MozTextSizeAdjust',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransform: Carrier<
    'MozTransform',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransformOrigin: Carrier<
    'MozTransformOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransformStyle: Carrier<
    'MozTransformStyle',
    | 'mozInitial'
    | 'flat'
    | 'inherit'
    | 'initial'
    | 'preserve-3d'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransition: Carrier<
    'MozTransition',
    | 'mozInitial'
    | 'all'
    | 'allowDiscrete'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionDelay: Carrier<
    'MozTransitionDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionDuration: Carrier<
    'MozTransitionDuration',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionProperty: Carrier<
    'MozTransitionProperty',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly MozTransitionTimingFunction: Carrier<
    'MozTransitionTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-user-focus`** CSS property is used to indicate whether an element can have the focus. */
  readonly MozUserFocus: Carrier<
    'MozUserFocus',
    | 'mozInitial'
    | 'ignore'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selectAfter'
    | 'selectAll'
    | 'selectBefore'
    | 'selectMenu'
    | 'selectSame'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** In Mozilla applications, **`-moz-user-input`** determines if an element will accept user input. */
  readonly MozUserInput: Carrier<
    'MozUserInput',
    | 'mozInitial'
    | 'auto'
    | 'disabled'
    | 'enabled'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`user-modify`** property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user. */
  readonly MozUserModify: Carrier<
    'MozUserModify',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'readOnly'
    | 'readWrite'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'writeOnly',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly MozUserSelect: Carrier<
    'MozUserSelect',
    | 'mozInitial'
    | 'mozNone'
    | 'all'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `drag | no-drag` */
  readonly MozWindowDragging: Carrier<
    'MozWindowDragging',
    'mozInitial' | 'drag' | 'inherit' | 'initial' | 'noDrag' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `default | menu | tooltip | sheet | none` */
  readonly MozWindowShadow: Carrier<
    'MozWindowShadow',
    | 'mozInitial'
    | 'default'
    | 'inherit'
    | 'initial'
    | 'menu'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'sheet'
    | 'tooltip'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `false | true` */
  readonly msAccelerator: Carrier<
    'msAccelerator',
    'mozInitial' | 'false' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'true' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `tb | rl | bt | lr` */
  readonly msBlockProgression: Carrier<
    'msBlockProgression',
    | 'mozInitial'
    | 'bt'
    | 'inherit'
    | 'initial'
    | 'lr'
    | 'revert'
    | 'revertLayer'
    | 'rl'
    | 'tb'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | chained` */
  readonly msContentZoomChaining: Carrier<
    'msContentZoomChaining',
    'mozInitial' | 'chained' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | zoom` */
  readonly msContentZooming: Carrier<
    'msContentZooming',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset' | 'zoom',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>` */
  readonly msContentZoomLimit: Carrier<
    'msContentZoomLimit',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<percentage>` */
  readonly msContentZoomLimitMax: Carrier<
    'msContentZoomLimitMax',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<percentage>` */
  readonly msContentZoomLimitMin: Carrier<
    'msContentZoomLimitMin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>` */
  readonly msContentZoomSnap: Carrier<
    'msContentZoomSnap',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mandatory'
    | 'none'
    | 'proximity'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )` */
  readonly msContentZoomSnapPoints: Carrier<
    'msContentZoomSnapPoints',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | proximity | mandatory` */
  readonly msContentZoomSnapType: Carrier<
    'msContentZoomSnapType',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mandatory'
    | 'none'
    | 'proximity'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<string>` */
  readonly msFilter: Carrier<
    'msFilter',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msFlex: Carrier<
    'msFlex',
    | 'mozInitial'
    | 'auto'
    | 'content'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msFlexDirection: Carrier<
    'msFlexDirection',
    | 'mozInitial'
    | 'column'
    | 'columnReverse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'row'
    | 'rowReverse'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msFlexPositive: Carrier<
    'msFlexPositive',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `[ none | <custom-ident> ]#` */
  readonly msFlowFrom: Carrier<
    'msFlowFrom',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `[ none | <custom-ident> ]#` */
  readonly msFlowInto: Carrier<
    'msFlowInto',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | <track-list> | <auto-track-list>` */
  readonly msGridColumns: Carrier<
    'msGridColumns',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | <track-list> | <auto-track-list>` */
  readonly msGridRows: Carrier<
    'msGridRows',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | none` */
  readonly msHighContrastAdjust: Carrier<
    'msHighContrastAdjust',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | <integer>{1,3}` */
  readonly msHyphenateLimitChars: Carrier<
    'msHyphenateLimitChars',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `no-limit | <integer>` */
  readonly msHyphenateLimitLines: Carrier<
    'msHyphenateLimitLines',
    'mozInitial' | 'inherit' | 'initial' | 'noLimit' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<percentage> | <length>` */
  readonly msHyphenateLimitZone: Carrier<
    'msHyphenateLimitZone',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly msHyphens: Carrier<
    'msHyphens',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'manual'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | after` */
  readonly msImeAlign: Carrier<
    'msImeAlign',
    'mozInitial' | 'after' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | normal | active | inactive | disabled` */
  readonly msImeMode: Carrier<
    'msImeMode',
    | 'mozInitial'
    | 'active'
    | 'auto'
    | 'disabled'
    | 'inactive'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly msLineBreak: Carrier<
    'msLineBreak',
    | 'mozInitial'
    | 'anywhere'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'loose'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'strict'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msOrder: Carrier<
    'msOrder',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | none | scrollbar | -ms-autohiding-scrollbar` */
  readonly msOverflowStyle: Carrier<
    'msOverflowStyle',
    | 'mozInitial'
    | 'msAutohidingScrollbar'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'scrollbar'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msOverflowX: Carrier<
    'msOverflowX',
    | 'mozHiddenUnscrollable'
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'overlay'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msOverflowY: Carrier<
    'msOverflowY',
    | 'mozHiddenUnscrollable'
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'overlay'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbar3dlightColor: Carrier<
    'msScrollbar3dlightColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarArrowColor: Carrier<
    'msScrollbarArrowColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarBaseColor: Carrier<
    'msScrollbarBaseColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarDarkshadowColor: Carrier<
    'msScrollbarDarkshadowColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarFaceColor: Carrier<
    'msScrollbarFaceColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarHighlightColor: Carrier<
    'msScrollbarHighlightColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarShadowColor: Carrier<
    'msScrollbarShadowColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly msScrollbarTrackColor: Carrier<
    'msScrollbarTrackColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `chained | none` */
  readonly msScrollChaining: Carrier<
    'msScrollChaining',
    'mozInitial' | 'chained' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>` */
  readonly msScrollLimit: Carrier<
    'msScrollLimit',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | <length>` */
  readonly msScrollLimitXMax: Carrier<
    'msScrollLimitXMax',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<length>` */
  readonly msScrollLimitXMin: Carrier<
    'msScrollLimitXMin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | <length>` */
  readonly msScrollLimitYMax: Carrier<
    'msScrollLimitYMax',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<length>` */
  readonly msScrollLimitYMin: Carrier<
    'msScrollLimitYMin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | railed` */
  readonly msScrollRails: Carrier<
    'msScrollRails',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'railed' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )` */
  readonly msScrollSnapPointsX: Carrier<
    'msScrollSnapPointsX',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )` */
  readonly msScrollSnapPointsY: Carrier<
    'msScrollSnapPointsY',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | proximity | mandatory` */
  readonly msScrollSnapType: Carrier<
    'msScrollSnapType',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mandatory'
    | 'none'
    | 'proximity'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>` */
  readonly msScrollSnapX: Carrier<
    'msScrollSnapX',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>` */
  readonly msScrollSnapY: Carrier<
    'msScrollSnapY',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | vertical-to-horizontal` */
  readonly msScrollTranslation: Carrier<
    'msScrollTranslation',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'verticalToHorizontal',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space` */
  readonly msTextAutospace: Carrier<
    'msTextAutospace',
    | 'mozInitial'
    | 'ideographAlpha'
    | 'ideographNumeric'
    | 'ideographParenthesis'
    | 'ideographSpace'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly msTextCombineHorizontal: Carrier<
    'msTextCombineHorizontal',
    | 'mozInitial'
    | 'all'
    | 'digits'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msTextOverflow: Carrier<
    'msTextOverflow',
    'mozInitial' | 'clip' | 'ellipsis' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019. */
  readonly msTouchAction: Carrier<
    'msTouchAction',
    | 'mozInitial'
    | 'msManipulation'
    | 'msNone'
    | 'msPanX'
    | 'msPanY'
    | 'msPinchZoom'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'manipulation'
    | 'none'
    | 'panDown'
    | 'panLeft'
    | 'panRight'
    | 'panUp'
    | 'panX'
    | 'panY'
    | 'pinchZoom'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `grippers | none` */
  readonly msTouchSelect: Carrier<
    'msTouchSelect',
    'mozInitial' | 'grippers' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransform: Carrier<
    'msTransform',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransformOrigin: Carrier<
    'msTransformOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransition: Carrier<
    'msTransition',
    | 'mozInitial'
    | 'all'
    | 'allowDiscrete'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionDelay: Carrier<
    'msTransitionDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionDuration: Carrier<
    'msTransitionDuration',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionProperty: Carrier<
    'msTransitionProperty',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly msTransitionTimingFunction: Carrier<
    'msTransitionTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | element | text` */
  readonly msUserSelect: Carrier<
    'msUserSelect',
    | 'mozInitial'
    | 'element'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly msWordBreak: Carrier<
    'msWordBreak',
    | 'mozInitial'
    | 'autoPhrase'
    | 'breakAll'
    | 'breakWord'
    | 'inherit'
    | 'initial'
    | 'keepAll'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | both | start | end | maximum | clear` */
  readonly msWrapFlow: Carrier<
    'msWrapFlow',
    | 'mozInitial'
    | 'auto'
    | 'both'
    | 'clear'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'maximum'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<length>` */
  readonly msWrapMargin: Carrier<
    'msWrapMargin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `wrap | none` */
  readonly msWrapThrough: Carrier<
    'msWrapThrough',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset' | 'wrap',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly msWritingMode: Carrier<
    'msWritingMode',
    | 'mozInitial'
    | 'horizontalTb'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'sidewaysLr'
    | 'sidewaysRl'
    | 'unset'
    | 'verticalLr'
    | 'verticalRl',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimation: Carrier<
    'OAnimation',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'auto'
    | 'backwards'
    | 'both'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'forwards'
    | 'infinite'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'paused'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationDelay: Carrier<
    'OAnimationDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationDirection: Carrier<
    'OAnimationDirection',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationDuration: Carrier<
    'OAnimationDuration',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationFillMode: Carrier<
    'OAnimationFillMode',
    | 'mozInitial'
    | 'backwards'
    | 'both'
    | 'forwards'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationIterationCount: Carrier<
    'OAnimationIterationCount',
    'mozInitial' | 'infinite' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationName: Carrier<
    'OAnimationName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationPlayState: Carrier<
    'OAnimationPlayState',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'paused'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OAnimationTimingFunction: Carrier<
    'OAnimationTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly OBackgroundSize: Carrier<
    'OBackgroundSize',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'cover'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly objectFit: Carrier<
    'objectFit',
    | 'mozInitial'
    | 'contain'
    | 'cover'
    | 'fill'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'scaleDown'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly objectPosition: Carrier<
    'objectPosition',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | <basic-shape-rect>` */
  readonly objectViewBox: Carrier<
    'objectViewBox',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly OBorderImage: Carrier<
    'OBorderImage',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offset: Carrier<
    'offset',
    | 'mozInitial'
    | 'auto'
    | 'borderBox'
    | 'bottom'
    | 'center'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'none'
    | 'normal'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'strokeBox'
    | 'top'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly offsetAnchor: Carrier<
    'offsetAnchor',
    | 'mozInitial'
    | 'auto'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetBlock: Carrier<
    'offsetBlock',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetBlockEnd: Carrier<
    'offsetBlockEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetBlockStart: Carrier<
    'offsetBlockStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offsetDistance: Carrier<
    'offsetDistance',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetInline: Carrier<
    'offsetInline',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetInlineEnd: Carrier<
    'offsetInlineEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly offsetInlineStart: Carrier<
    'offsetInlineStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly offsetPath: Carrier<
    'offsetPath',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** Since January 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly offsetPosition: Carrier<
    'offsetPosition',
    | 'mozInitial'
    | 'auto'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offsetRotate: Carrier<
    'offsetRotate',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'reverse' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly offsetRotation: Carrier<
    'offsetRotation',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'reverse' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly OObjectFit: Carrier<
    'OObjectFit',
    | 'mozInitial'
    | 'contain'
    | 'cover'
    | 'fill'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'scaleDown'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly OObjectPosition: Carrier<
    'OObjectPosition',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly opacity: Carrier<
    'opacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    'opacity',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly order: Carrier<
    'order',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly orphans: Carrier<
    'orphans',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021. */
  readonly OTabSize: Carrier<
    'OTabSize',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly OTextOverflow: Carrier<
    'OTextOverflow',
    'mozInitial' | 'clip' | 'ellipsis' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransform: Carrier<
    'OTransform',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransformOrigin: Carrier<
    'OTransformOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransition: Carrier<
    'OTransition',
    | 'mozInitial'
    | 'all'
    | 'allowDiscrete'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionDelay: Carrier<
    'OTransitionDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionDuration: Carrier<
    'OTransitionDuration',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionProperty: Carrier<
    'OTransitionProperty',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly OTransitionTimingFunction: Carrier<
    'OTransitionTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023. */
  readonly outline: Carrier<
    'outline',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly outlineColor: Carrier<
    'outlineColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly outlineOffset: Carrier<
    'outlineOffset',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly outlineStyle: Carrier<
    'outlineStyle',
    | 'mozInitial'
    | 'auto'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly outlineWidth: Carrier<
    'outlineWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    'length',
    1,
    'borderWidth',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly overflow: Carrier<
    'overflow',
    | 'mozHiddenUnscrollable'
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'overlay'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly overflowAnchor: Carrier<
    'overflowAnchor',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly overflowBlock: Carrier<
    'overflowBlock',
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `padding-box | content-box` */
  readonly overflowClipBox: Carrier<
    'overflowClipBox',
    | 'mozInitial'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly overflowClipMargin: Carrier<
    'overflowClipMargin',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly overflowInline: Carrier<
    'overflowInline',
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018. */
  readonly overflowWrap: Carrier<
    'overflowWrap',
    | 'mozInitial'
    | 'anywhere'
    | 'breakWord'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly overflowX: Carrier<
    'overflowX',
    | 'mozHiddenUnscrollable'
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'overlay'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly overflowY: Carrier<
    'overflowY',
    | 'mozHiddenUnscrollable'
    | 'mozInitial'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'overlay'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly overlay: Carrier<
    'overlay',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehavior: Carrier<
    'overscrollBehavior',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorBlock: Carrier<
    'overscrollBehaviorBlock',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorInline: Carrier<
    'overscrollBehaviorInline',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorX: Carrier<
    'overscrollBehaviorX',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly overscrollBehaviorY: Carrier<
    'overscrollBehaviorY',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly padding: Carrier<
    'padding',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    4,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly paddingBlock: Carrier<
    'paddingBlock',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingBlockEnd: Carrier<
    'paddingBlockEnd',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingBlockStart: Carrier<
    'paddingBlockStart',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingBottom: Carrier<
    'paddingBottom',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly paddingInline: Carrier<
    'paddingInline',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    2,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingInlineEnd: Carrier<
    'paddingInlineEnd',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly paddingInlineStart: Carrier<
    'paddingInlineStart',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingLeft: Carrier<
    'paddingLeft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingRight: Carrier<
    'paddingRight',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly paddingTop: Carrier<
    'paddingTop',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023. */
  readonly page: Carrier<
    'page',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`page-break-after`** CSS property adjusts page breaks _after_ the current element. */
  readonly pageBreakAfter: Carrier<
    'pageBreakAfter',
    | 'mozInitial'
    | 'always'
    | 'auto'
    | 'avoid'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'recto'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset'
    | 'verso',
    never,
    1,
    '',
    T
  >;
  /** The **`page-break-before`** CSS property adjusts page breaks _before_ the current element. */
  readonly pageBreakBefore: Carrier<
    'pageBreakBefore',
    | 'mozInitial'
    | 'always'
    | 'auto'
    | 'avoid'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'recto'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset'
    | 'verso',
    never,
    1,
    '',
    T
  >;
  /** The **`page-break-inside`** CSS property adjusts page breaks _inside_ the current element. */
  readonly pageBreakInside: Carrier<
    'pageBreakInside',
    'mozInitial' | 'auto' | 'avoid' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly paintOrder: Carrier<
    'paintOrder',
    | 'mozInitial'
    | 'fill'
    | 'inherit'
    | 'initial'
    | 'markers'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'stroke'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly perspective: Carrier<
    'perspective',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly perspectiveOrigin: Carrier<
    'perspectiveOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly placeContent: Carrier<
    'placeContent',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly placeItems: Carrier<
    'placeItems',
    | 'mozInitial'
    | 'anchorCenter'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly placeSelf: Carrier<
    'placeSelf',
    | 'mozInitial'
    | 'anchorCenter'
    | 'auto'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly pointerEvents: Carrier<
    'pointerEvents',
    | 'mozInitial'
    | 'all'
    | 'auto'
    | 'fill'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'painted'
    | 'revert'
    | 'revertLayer'
    | 'stroke'
    | 'unset'
    | 'visible'
    | 'visibleFill'
    | 'visiblePainted'
    | 'visibleStroke',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly position: Carrier<
    'position',
    | 'mozInitial'
    | 'webkitSticky'
    | 'absolute'
    | 'fixed'
    | 'inherit'
    | 'initial'
    | 'relative'
    | 'revert'
    | 'revertLayer'
    | 'static'
    | 'sticky'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionAnchor: Carrier<
    'positionAnchor',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionArea: Carrier<
    'positionArea',
    | 'mozInitial'
    | 'blockEnd'
    | 'blockStart'
    | 'bottom'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfBlockEnd'
    | 'selfBlockStart'
    | 'selfEnd'
    | 'selfInlineEnd'
    | 'selfInlineStart'
    | 'selfStart'
    | 'spanAll'
    | 'spanBlockEnd'
    | 'spanBlockStart'
    | 'spanBottom'
    | 'spanEnd'
    | 'spanInlineEnd'
    | 'spanInlineStart'
    | 'spanLeft'
    | 'spanRight'
    | 'spanSelfBlockEnd'
    | 'spanSelfBlockStart'
    | 'spanSelfEnd'
    | 'spanSelfInlineEnd'
    | 'spanSelfInlineStart'
    | 'spanSelfStart'
    | 'spanStart'
    | 'spanTop'
    | 'spanXEnd'
    | 'spanXSelfEnd'
    | 'spanXSelfStart'
    | 'spanXStart'
    | 'spanYEnd'
    | 'spanYSelfEnd'
    | 'spanYSelfStart'
    | 'spanYStart'
    | 'start'
    | 'top'
    | 'unset'
    | 'xEnd'
    | 'xSelfEnd'
    | 'xSelfStart'
    | 'xStart'
    | 'yEnd'
    | 'ySelfEnd'
    | 'ySelfStart'
    | 'yStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTry: Carrier<
    'positionTry',
    | 'mozInitial'
    | 'blockEnd'
    | 'blockStart'
    | 'bottom'
    | 'center'
    | 'end'
    | 'flipBlock'
    | 'flipInline'
    | 'flipStart'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfBlockEnd'
    | 'selfBlockStart'
    | 'selfEnd'
    | 'selfInlineEnd'
    | 'selfInlineStart'
    | 'selfStart'
    | 'spanAll'
    | 'spanBlockEnd'
    | 'spanBlockStart'
    | 'spanBottom'
    | 'spanEnd'
    | 'spanInlineEnd'
    | 'spanInlineStart'
    | 'spanLeft'
    | 'spanRight'
    | 'spanSelfBlockEnd'
    | 'spanSelfBlockStart'
    | 'spanSelfEnd'
    | 'spanSelfInlineEnd'
    | 'spanSelfInlineStart'
    | 'spanSelfStart'
    | 'spanStart'
    | 'spanTop'
    | 'spanXEnd'
    | 'spanXSelfEnd'
    | 'spanXSelfStart'
    | 'spanXStart'
    | 'spanYEnd'
    | 'spanYSelfEnd'
    | 'spanYSelfStart'
    | 'spanYStart'
    | 'start'
    | 'top'
    | 'unset'
    | 'xEnd'
    | 'xSelfEnd'
    | 'xSelfStart'
    | 'xStart'
    | 'yEnd'
    | 'ySelfEnd'
    | 'ySelfStart'
    | 'yStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTryFallbacks: Carrier<
    'positionTryFallbacks',
    | 'mozInitial'
    | 'blockEnd'
    | 'blockStart'
    | 'bottom'
    | 'center'
    | 'end'
    | 'flipBlock'
    | 'flipInline'
    | 'flipStart'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfBlockEnd'
    | 'selfBlockStart'
    | 'selfEnd'
    | 'selfInlineEnd'
    | 'selfInlineStart'
    | 'selfStart'
    | 'spanAll'
    | 'spanBlockEnd'
    | 'spanBlockStart'
    | 'spanBottom'
    | 'spanEnd'
    | 'spanInlineEnd'
    | 'spanInlineStart'
    | 'spanLeft'
    | 'spanRight'
    | 'spanSelfBlockEnd'
    | 'spanSelfBlockStart'
    | 'spanSelfEnd'
    | 'spanSelfInlineEnd'
    | 'spanSelfInlineStart'
    | 'spanSelfStart'
    | 'spanStart'
    | 'spanTop'
    | 'spanXEnd'
    | 'spanXSelfEnd'
    | 'spanXSelfStart'
    | 'spanXStart'
    | 'spanYEnd'
    | 'spanYSelfEnd'
    | 'spanYSelfStart'
    | 'spanYStart'
    | 'start'
    | 'top'
    | 'unset'
    | 'xEnd'
    | 'xSelfEnd'
    | 'xSelfStart'
    | 'xStart'
    | 'yEnd'
    | 'ySelfEnd'
    | 'ySelfStart'
    | 'yStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTryOptions: Carrier<
    'positionTryOptions',
    | 'mozInitial'
    | 'blockEnd'
    | 'blockStart'
    | 'bottom'
    | 'center'
    | 'end'
    | 'flipBlock'
    | 'flipInline'
    | 'flipStart'
    | 'inherit'
    | 'initial'
    | 'inlineEnd'
    | 'inlineStart'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'selfBlockEnd'
    | 'selfBlockStart'
    | 'selfEnd'
    | 'selfInlineEnd'
    | 'selfInlineStart'
    | 'selfStart'
    | 'spanAll'
    | 'spanBlockEnd'
    | 'spanBlockStart'
    | 'spanBottom'
    | 'spanEnd'
    | 'spanInlineEnd'
    | 'spanInlineStart'
    | 'spanLeft'
    | 'spanRight'
    | 'spanSelfBlockEnd'
    | 'spanSelfBlockStart'
    | 'spanSelfEnd'
    | 'spanSelfInlineEnd'
    | 'spanSelfInlineStart'
    | 'spanSelfStart'
    | 'spanStart'
    | 'spanTop'
    | 'spanXEnd'
    | 'spanXSelfEnd'
    | 'spanXSelfStart'
    | 'spanXStart'
    | 'spanYEnd'
    | 'spanYSelfEnd'
    | 'spanYSelfStart'
    | 'spanYStart'
    | 'start'
    | 'top'
    | 'unset'
    | 'xEnd'
    | 'xSelfEnd'
    | 'xSelfStart'
    | 'xStart'
    | 'yEnd'
    | 'ySelfEnd'
    | 'ySelfStart'
    | 'yStart',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionTryOrder: Carrier<
    'positionTryOrder',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mostBlockSize'
    | 'mostHeight'
    | 'mostInlineSize'
    | 'mostWidth'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly positionVisibility: Carrier<
    'positionVisibility',
    | 'mozInitial'
    | 'always'
    | 'anchorsValid'
    | 'anchorsVisible'
    | 'inherit'
    | 'initial'
    | 'noOverflow'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly printColorAdjust: Carrier<
    'printColorAdjust',
    'mozInitial' | 'economy' | 'exact' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly quotes: Carrier<
    'quotes',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly r: Carrier<
    'r',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly resize: Carrier<
    'resize',
    | 'mozInitial'
    | 'block'
    | 'both'
    | 'horizontal'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'vertical',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly right: Carrier<
    'right',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022. */
  readonly rotate: Carrier<
    'rotate',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    'angle',
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017. */
  readonly rowGap: Carrier<
    'rowGap',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly rubyAlign: Carrier<
    'rubyAlign',
    | 'mozInitial'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'spaceAround'
    | 'spaceBetween'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `separate | collapse | auto` */
  readonly rubyMerge: Carrier<
    'rubyMerge',
    | 'mozInitial'
    | 'auto'
    | 'collapse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'separate'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | none` */
  readonly rubyOverhang: Carrier<
    'rubyOverhang',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly rubyPosition: Carrier<
    'rubyPosition',
    | 'mozInitial'
    | 'alternate'
    | 'inherit'
    | 'initial'
    | 'interCharacter'
    | 'over'
    | 'revert'
    | 'revertLayer'
    | 'under'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly rx: Carrier<
    'rx',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly ry: Carrier<
    'ry',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022. */
  readonly scale: Carrier<
    'scale',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollbarColor: Carrier<
    'scrollbarColor',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly scrollbarGutter: Carrier<
    'scrollbarGutter',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'stable' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly scrollbarWidth: Carrier<
    'scrollbarWidth',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly scrollBehavior: Carrier<
    'scrollBehavior',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'smooth' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | nearest` */
  readonly scrollInitialTarget: Carrier<
    'scrollInitialTarget',
    'mozInitial' | 'inherit' | 'initial' | 'nearest' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021. */
  readonly scrollMargin: Carrier<
    'scrollMargin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    4,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginBlock: Carrier<
    'scrollMarginBlock',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginBlockEnd: Carrier<
    'scrollMarginBlockEnd',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginBlockStart: Carrier<
    'scrollMarginBlockStart',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginBottom: Carrier<
    'scrollMarginBottom',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginInline: Carrier<
    'scrollMarginInline',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginInlineEnd: Carrier<
    'scrollMarginInlineEnd',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollMarginInlineStart: Carrier<
    'scrollMarginInlineStart',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginLeft: Carrier<
    'scrollMarginLeft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginRight: Carrier<
    'scrollMarginRight',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollMarginTop: Carrier<
    'scrollMarginTop',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPadding: Carrier<
    'scrollPadding',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    4,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingBlock: Carrier<
    'scrollPaddingBlock',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingBlockEnd: Carrier<
    'scrollPaddingBlockEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingBlockStart: Carrier<
    'scrollPaddingBlockStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingBottom: Carrier<
    'scrollPaddingBottom',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingInline: Carrier<
    'scrollPaddingInline',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingInlineEnd: Carrier<
    'scrollPaddingInlineEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021. */
  readonly scrollPaddingInlineStart: Carrier<
    'scrollPaddingInlineStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingLeft: Carrier<
    'scrollPaddingLeft',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingRight: Carrier<
    'scrollPaddingRight',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollPaddingTop: Carrier<
    'scrollPaddingTop',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly scrollSnapAlign: Carrier<
    'scrollSnapAlign',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | <position>#` */
  readonly scrollSnapCoordinate: Carrier<
    'scrollSnapCoordinate',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<position>` */
  readonly scrollSnapDestination: Carrier<
    'scrollSnapDestination',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021. */
  readonly scrollSnapMargin: Carrier<
    'scrollSnapMargin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginBottom: Carrier<
    'scrollSnapMarginBottom',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginLeft: Carrier<
    'scrollSnapMarginLeft',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginRight: Carrier<
    'scrollSnapMarginRight',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021. */
  readonly scrollSnapMarginTop: Carrier<
    'scrollSnapMarginTop',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | repeat( <length-percentage> )` */
  readonly scrollSnapPointsX: Carrier<
    'scrollSnapPointsX',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | repeat( <length-percentage> )` */
  readonly scrollSnapPointsY: Carrier<
    'scrollSnapPointsY',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2022. */
  readonly scrollSnapStop: Carrier<
    'scrollSnapStop',
    'mozInitial' | 'always' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022. */
  readonly scrollSnapType: Carrier<
    'scrollSnapType',
    | 'mozInitial'
    | 'block'
    | 'both'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'x'
    | 'y',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | mandatory | proximity` */
  readonly scrollSnapTypeX: Carrier<
    'scrollSnapTypeX',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mandatory'
    | 'none'
    | 'proximity'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | mandatory | proximity` */
  readonly scrollSnapTypeY: Carrier<
    'scrollSnapTypeY',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mandatory'
    | 'none'
    | 'proximity'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollTimeline: Carrier<
    'scrollTimeline',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollTimelineAxis: Carrier<
    'scrollTimelineAxis',
    | 'mozInitial'
    | 'block'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'x'
    | 'y',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly scrollTimelineName: Carrier<
    'scrollTimelineName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeImageThreshold: Carrier<
    'shapeImageThreshold',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeMargin: Carrier<
    'shapeMargin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeOutside: Carrier<
    'shapeOutside',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'marginBox'
    | 'none'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly shapeRendering: Carrier<
    'shapeRendering',
    | 'mozInitial'
    | 'auto'
    | 'crispEdges'
    | 'geometricPrecision'
    | 'inherit'
    | 'initial'
    | 'optimizeSpeed'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `normal | spell-out || digits || [ literal-punctuation | no-punctuation ]` */
  readonly speakAs: Carrier<
    'speakAs',
    | 'mozInitial'
    | 'digits'
    | 'inherit'
    | 'initial'
    | 'literalPunctuation'
    | 'noPunctuation'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'spellOut'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly stopColor: Carrier<
    'stopColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly stopOpacity: Carrier<
    'stopOpacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly stroke: Carrier<
    'stroke',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'contextFill'
    | 'contextStroke'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly strokeColor: Carrier<
    'strokeColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeDasharray: Carrier<
    'strokeDasharray',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeDashoffset: Carrier<
    'strokeDashoffset',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeLinecap: Carrier<
    'strokeLinecap',
    | 'mozInitial'
    | 'butt'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'square'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeLinejoin: Carrier<
    'strokeLinejoin',
    | 'mozInitial'
    | 'arcs'
    | 'bevel'
    | 'inherit'
    | 'initial'
    | 'miter'
    | 'miterClip'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeMiterlimit: Carrier<
    'strokeMiterlimit',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeOpacity: Carrier<
    'strokeOpacity',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly strokeWidth: Carrier<
    'strokeWidth',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly tableLayout: Carrier<
    'tableLayout',
    'mozInitial' | 'auto' | 'fixed' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021. */
  readonly tabSize: Carrier<
    'tabSize',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textAlign: Carrier<
    'textAlign',
    | 'khtmlCenter'
    | 'khtmlLeft'
    | 'khtmlRight'
    | 'mozCenter'
    | 'mozInitial'
    | 'mozLeft'
    | 'mozRight'
    | 'webkitCenter'
    | 'webkitLeft'
    | 'webkitMatchParent'
    | 'webkitRight'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'left'
    | 'matchParent'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022. */
  readonly textAlignLast: Carrier<
    'textAlignLast',
    | 'mozInitial'
    | 'auto'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2016. */
  readonly textAnchor: Carrier<
    'textAnchor',
    | 'mozInitial'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'middle'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textAutospace: Carrier<
    'textAutospace',
    | 'mozInitial'
    | 'auto'
    | 'ideographAlpha'
    | 'ideographNumeric'
    | 'inherit'
    | 'initial'
    | 'insert'
    | 'noAutospace'
    | 'normal'
    | 'punctuation'
    | 'replace'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `normal | <'text-box-trim'> || <'text-box-edge'>` */
  readonly textBox: Carrier<
    'textBox',
    | 'mozInitial'
    | 'auto'
    | 'cap'
    | 'ex'
    | 'ideographic'
    | 'ideographicInk'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'trimBoth'
    | 'trimEnd'
    | 'trimStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | <text-edge>` */
  readonly textBoxEdge: Carrier<
    'textBoxEdge',
    | 'mozInitial'
    | 'auto'
    | 'cap'
    | 'ex'
    | 'ideographic'
    | 'ideographicInk'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | trim-start | trim-end | trim-both` */
  readonly textBoxTrim: Carrier<
    'textBoxTrim',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'trimBoth'
    | 'trimEnd'
    | 'trimStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textCombineUpright: Carrier<
    'textCombineUpright',
    | 'mozInitial'
    | 'all'
    | 'digits'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textDecoration: Carrier<
    'textDecoration',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'auto'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blink'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fromFont'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'grammarError'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'lineThrough'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'overline'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'spellingError'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'underline'
    | 'unset'
    | 'violet'
    | 'wavy'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textDecorationColor: Carrier<
    'textDecorationColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textDecorationLine: Carrier<
    'textDecorationLine',
    | 'mozInitial'
    | 'blink'
    | 'grammarError'
    | 'inherit'
    | 'initial'
    | 'lineThrough'
    | 'none'
    | 'overline'
    | 'revert'
    | 'revertLayer'
    | 'spellingError'
    | 'underline'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textDecorationSkip: Carrier<
    'textDecorationSkip',
    | 'mozInitial'
    | 'boxDecoration'
    | 'edges'
    | 'inherit'
    | 'initial'
    | 'leadingSpaces'
    | 'none'
    | 'objects'
    | 'revert'
    | 'revertLayer'
    | 'spaces'
    | 'trailingSpaces'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textDecorationSkipInk: Carrier<
    'textDecorationSkipInk',
    | 'mozInitial'
    | 'all'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textDecorationStyle: Carrier<
    'textDecorationStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'solid'
    | 'unset'
    | 'wavy',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2021. */
  readonly textDecorationThickness: Carrier<
    'textDecorationThickness',
    'mozInitial' | 'auto' | 'fromFont' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasis: Carrier<
    'textEmphasis',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'circle'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dot'
    | 'doubleCircle'
    | 'filled'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'open'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sesame'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'triangle'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasisColor: Carrier<
    'textEmphasisColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    'color',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasisPosition: Carrier<
    'textEmphasisPosition',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'over'
    | 'revert'
    | 'revertLayer'
    | 'under'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly textEmphasisStyle: Carrier<
    'textEmphasisStyle',
    | 'mozInitial'
    | 'circle'
    | 'dot'
    | 'doubleCircle'
    | 'filled'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'open'
    | 'revert'
    | 'revertLayer'
    | 'sesame'
    | 'triangle'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textIndent: Carrier<
    'textIndent',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textJustify: Carrier<
    'textJustify',
    | 'mozInitial'
    | 'auto'
    | 'distribute'
    | 'inherit'
    | 'initial'
    | 'interCharacter'
    | 'interWord'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020. */
  readonly textOrientation: Carrier<
    'textOrientation',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mixed'
    | 'revert'
    | 'revertLayer'
    | 'sideways'
    | 'sidewaysRight'
    | 'unset'
    | 'upright',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textOverflow: Carrier<
    'textOverflow',
    'mozInitial' | 'clip' | 'ellipsis' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly textRendering: Carrier<
    'textRendering',
    | 'mozInitial'
    | 'auto'
    | 'geometricPrecision'
    | 'inherit'
    | 'initial'
    | 'optimizeLegibility'
    | 'optimizeSpeed'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textShadow: Carrier<
    'textShadow',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    'shadow',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textSizeAdjust: Carrier<
    'textSizeAdjust',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly textSpacingTrim: Carrier<
    'textSpacingTrim',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'spaceAll'
    | 'spaceFirst'
    | 'trimStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly textTransform: Carrier<
    'textTransform',
    | 'mozInitial'
    | 'capitalize'
    | 'fullSizeKana'
    | 'fullWidth'
    | 'inherit'
    | 'initial'
    | 'lowercase'
    | 'mathAuto'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'uppercase',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2020. */
  readonly textUnderlineOffset: Carrier<
    'textUnderlineOffset',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly textUnderlinePosition: Carrier<
    'textUnderlinePosition',
    | 'mozInitial'
    | 'auto'
    | 'fromFont'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'under'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly textWrap: Carrier<
    'textWrap',
    | 'mozInitial'
    | 'auto'
    | 'balance'
    | 'inherit'
    | 'initial'
    | 'nowrap'
    | 'pretty'
    | 'revert'
    | 'revertLayer'
    | 'stable'
    | 'unset'
    | 'wrap',
    never,
    1,
    '',
    T
  >;
  /** Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly textWrapMode: Carrier<
    'textWrapMode',
    'mozInitial' | 'inherit' | 'initial' | 'nowrap' | 'revert' | 'revertLayer' | 'unset' | 'wrap',
    never,
    1,
    '',
    T
  >;
  /** Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly textWrapStyle: Carrier<
    'textWrapStyle',
    | 'mozInitial'
    | 'auto'
    | 'balance'
    | 'inherit'
    | 'initial'
    | 'pretty'
    | 'revert'
    | 'revertLayer'
    | 'stable'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly timelineScope: Carrier<
    'timelineScope',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly top: Carrier<
    'top',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'spacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019. */
  readonly touchAction: Carrier<
    'touchAction',
    | 'mozInitial'
    | 'msManipulation'
    | 'msNone'
    | 'msPanX'
    | 'msPanY'
    | 'msPinchZoom'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'manipulation'
    | 'none'
    | 'panDown'
    | 'panLeft'
    | 'panRight'
    | 'panUp'
    | 'panX'
    | 'panY'
    | 'pinchZoom'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transform: Carrier<
    'transform',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly transformBox: Carrier<
    'transformBox',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transformOrigin: Carrier<
    'transformOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transformStyle: Carrier<
    'transformStyle',
    | 'mozInitial'
    | 'flat'
    | 'inherit'
    | 'initial'
    | 'preserve-3d'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transition: Carrier<
    'transition',
    | 'mozInitial'
    | 'all'
    | 'allowDiscrete'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since August 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly transitionBehavior: Carrier<
    'transitionBehavior',
    | 'mozInitial'
    | 'allowDiscrete'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionDelay: Carrier<
    'transitionDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'time',
    1,
    'duration',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionDuration: Carrier<
    'transitionDuration',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    'time',
    1,
    'duration',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionProperty: Carrier<
    'transitionProperty',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly transitionTimingFunction: Carrier<
    'transitionTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    'easing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022. */
  readonly translate: Carrier<
    'translate',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly unicodeBidi: Carrier<
    'unicodeBidi',
    | 'mozInitial'
    | 'mozIsolate'
    | 'mozIsolateOverride'
    | 'mozPlaintext'
    | 'webkitIsolate'
    | 'webkitIsolateOverride'
    | 'webkitPlaintext'
    | 'bidiOverride'
    | 'embed'
    | 'inherit'
    | 'initial'
    | 'isolate'
    | 'isolateOverride'
    | 'normal'
    | 'plaintext'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly userSelect: Carrier<
    'userSelect',
    | 'mozInitial'
    | 'mozNone'
    | 'all'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly vectorEffect: Carrier<
    'vectorEffect',
    | 'mozInitial'
    | 'fixedPosition'
    | 'inherit'
    | 'initial'
    | 'nonRotation'
    | 'nonScalingSize'
    | 'nonScalingStroke'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly verticalAlign: Carrier<
    'verticalAlign',
    | 'mozInitial'
    | 'baseline'
    | 'bottom'
    | 'inherit'
    | 'initial'
    | 'middle'
    | 'revert'
    | 'revertLayer'
    | 'sub'
    | 'super'
    | 'textBottom'
    | 'textTop'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimeline: Carrier<
    'viewTimeline',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimelineAxis: Carrier<
    'viewTimelineAxis',
    | 'mozInitial'
    | 'block'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'x'
    | 'y',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimelineInset: Carrier<
    'viewTimelineInset',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly viewTimelineName: Carrier<
    'viewTimelineName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `none | <custom-ident>+` */
  readonly viewTransitionClass: Carrier<
    'viewTransitionClass',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since October 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly viewTransitionName: Carrier<
    'viewTransitionName',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'matchElement'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly visibility: Carrier<
    'visibility',
    | 'mozInitial'
    | 'collapse'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAlignContent: Carrier<
    'WebkitAlignContent',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAlignItems: Carrier<
    'WebkitAlignItems',
    | 'mozInitial'
    | 'anchorCenter'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAlignSelf: Carrier<
    'WebkitAlignSelf',
    | 'mozInitial'
    | 'anchorCenter'
    | 'auto'
    | 'baseline'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'selfEnd'
    | 'selfStart'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimation: Carrier<
    'WebkitAnimation',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'auto'
    | 'backwards'
    | 'both'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'forwards'
    | 'infinite'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'paused'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationDelay: Carrier<
    'WebkitAnimationDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationDirection: Carrier<
    'WebkitAnimationDirection',
    | 'mozInitial'
    | 'alternate'
    | 'alternateReverse'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationDuration: Carrier<
    'WebkitAnimationDuration',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationFillMode: Carrier<
    'WebkitAnimationFillMode',
    | 'mozInitial'
    | 'backwards'
    | 'both'
    | 'forwards'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationIterationCount: Carrier<
    'WebkitAnimationIterationCount',
    'mozInitial' | 'infinite' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationName: Carrier<
    'WebkitAnimationName',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationPlayState: Carrier<
    'WebkitAnimationPlayState',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'paused'
    | 'revert'
    | 'revertLayer'
    | 'running'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitAnimationTimingFunction: Carrier<
    'WebkitAnimationTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitAppearance: Carrier<
    'WebkitAppearance',
    | 'applePayButton'
    | 'mozInitial'
    | 'button'
    | 'buttonBevel'
    | 'caret'
    | 'checkbox'
    | 'defaultButton'
    | 'inherit'
    | 'initial'
    | 'innerSpinButton'
    | 'listbox'
    | 'listitem'
    | 'mediaControlsBackground'
    | 'mediaControlsFullscreenBackground'
    | 'mediaCurrentTimeDisplay'
    | 'mediaEnterFullscreenButton'
    | 'mediaExitFullscreenButton'
    | 'mediaFullscreenButton'
    | 'mediaMuteButton'
    | 'mediaOverlayPlayButton'
    | 'mediaPlayButton'
    | 'mediaSeekBackButton'
    | 'mediaSeekForwardButton'
    | 'mediaSlider'
    | 'mediaSliderthumb'
    | 'mediaTimeRemainingDisplay'
    | 'mediaToggleClosedCaptionsButton'
    | 'mediaVolumeSlider'
    | 'mediaVolumeSliderContainer'
    | 'mediaVolumeSliderthumb'
    | 'menulist'
    | 'menulistButton'
    | 'menulistText'
    | 'menulistTextfield'
    | 'meter'
    | 'none'
    | 'progressBar'
    | 'progressBarValue'
    | 'pushButton'
    | 'radio'
    | 'revert'
    | 'revertLayer'
    | 'searchfield'
    | 'searchfieldCancelButton'
    | 'searchfieldDecoration'
    | 'searchfieldResultsButton'
    | 'searchfieldResultsDecoration'
    | 'sliderHorizontal'
    | 'sliderVertical'
    | 'sliderthumbHorizontal'
    | 'sliderthumbVertical'
    | 'squareButton'
    | 'textarea'
    | 'textfield'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitBackdropFilter: Carrier<
    'WebkitBackdropFilter',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitBackfaceVisibility: Carrier<
    'WebkitBackfaceVisibility',
    | 'mozInitial'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'visible',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBackgroundClip: Carrier<
    'WebkitBackgroundClip',
    | 'mozInitial'
    | 'borderArea'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBackgroundOrigin: Carrier<
    'WebkitBackgroundOrigin',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBackgroundSize: Carrier<
    'WebkitBackgroundSize',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'cover'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-webkit-border-before`** CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet. */
  readonly WebkitBorderBefore: Carrier<
    'WebkitBorderBefore',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<color>` */
  readonly WebkitBorderBeforeColor: Carrier<
    'WebkitBorderBeforeColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'border-style'>` */
  readonly WebkitBorderBeforeStyle: Carrier<
    'WebkitBorderBeforeStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<'border-width'>` */
  readonly WebkitBorderBeforeWidth: Carrier<
    'WebkitBorderBeforeWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderBottomLeftRadius: Carrier<
    'WebkitBorderBottomLeftRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderBottomRightRadius: Carrier<
    'WebkitBorderBottomRightRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderImage: Carrier<
    'WebkitBorderImage',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderImageSlice: Carrier<
    'WebkitBorderImageSlice',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderRadius: Carrier<
    'WebkitBorderRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderTopLeftRadius: Carrier<
    'WebkitBorderTopLeftRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBorderTopRightRadius: Carrier<
    'WebkitBorderTopRightRadius',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box. */
  readonly WebkitBoxAlign: Carrier<
    'WebkitBoxAlign',
    | 'mozInitial'
    | 'baseline'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitBoxDecorationBreak: Carrier<
    'WebkitBoxDecorationBreak',
    'mozInitial' | 'clone' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'slice' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge). */
  readonly WebkitBoxDirection: Carrier<
    'WebkitBoxDirection',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'reverse'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout. */
  readonly WebkitBoxFlex: Carrier<
    'WebkitBoxFlex',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group. */
  readonly WebkitBoxFlexGroup: Carrier<
    'WebkitBoxFlexGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes). */
  readonly WebkitBoxLines: Carrier<
    'WebkitBoxLines',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'multiple'
    | 'revert'
    | 'revertLayer'
    | 'single'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group. */
  readonly WebkitBoxOrdinalGroup: Carrier<
    'WebkitBoxOrdinalGroup',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically. */
  readonly WebkitBoxOrient: Carrier<
    'WebkitBoxOrient',
    | 'mozInitial'
    | 'blockAxis'
    | 'horizontal'
    | 'inherit'
    | 'initial'
    | 'inlineAxis'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'vertical',
    never,
    1,
    '',
    T
  >;
  /** The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box. */
  readonly WebkitBoxPack: Carrier<
    'WebkitBoxPack',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'inherit'
    | 'initial'
    | 'justify'
    | 'revert'
    | 'revertLayer'
    | 'start'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction. */
  readonly WebkitBoxReflect: Carrier<
    'WebkitBoxReflect',
    | 'mozInitial'
    | 'above'
    | 'below'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBoxShadow: Carrier<
    'WebkitBoxShadow',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly WebkitBoxSizing: Carrier<
    'WebkitBoxSizing',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitClipPath: Carrier<
    'WebkitClipPath',
    | 'mozInitial'
    | 'borderBox'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'marginBox'
    | 'none'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnCount: Carrier<
    'WebkitColumnCount',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnFill: Carrier<
    'WebkitColumnFill',
    'mozInitial' | 'auto' | 'balance' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRule: Carrier<
    'WebkitColumnRule',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'dashed'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dotted'
    | 'double'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'groove'
    | 'hidden'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'medium'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'outset'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'solid'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thick'
    | 'thin'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRuleColor: Carrier<
    'WebkitColumnRuleColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRuleStyle: Carrier<
    'WebkitColumnRuleStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
    | 'revert'
    | 'revertLayer'
    | 'ridge'
    | 'solid'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumnRuleWidth: Carrier<
    'WebkitColumnRuleWidth',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'medium'
    | 'revert'
    | 'revertLayer'
    | 'thick'
    | 'thin'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitColumns: Carrier<
    'WebkitColumns',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly WebkitColumnSpan: Carrier<
    'WebkitColumnSpan',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016. */
  readonly WebkitColumnWidth: Carrier<
    'WebkitColumnWidth',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly WebkitFilter: Carrier<
    'WebkitFilter',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlex: Carrier<
    'WebkitFlex',
    | 'mozInitial'
    | 'auto'
    | 'content'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexBasis: Carrier<
    'WebkitFlexBasis',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitAuto'
    | 'auto'
    | 'content'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexDirection: Carrier<
    'WebkitFlexDirection',
    | 'mozInitial'
    | 'column'
    | 'columnReverse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'row'
    | 'rowReverse'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexFlow: Carrier<
    'WebkitFlexFlow',
    | 'mozInitial'
    | 'column'
    | 'columnReverse'
    | 'inherit'
    | 'initial'
    | 'nowrap'
    | 'revert'
    | 'revertLayer'
    | 'row'
    | 'rowReverse'
    | 'unset'
    | 'wrap'
    | 'wrapReverse',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexGrow: Carrier<
    'WebkitFlexGrow',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexShrink: Carrier<
    'WebkitFlexShrink',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitFlexWrap: Carrier<
    'WebkitFlexWrap',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'nowrap'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'wrap'
    | 'wrapReverse',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitFontFeatureSettings: Carrier<
    'WebkitFontFeatureSettings',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitFontKerning: Carrier<
    'WebkitFontKerning',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered. */
  readonly WebkitFontSmoothing: Carrier<
    'WebkitFontSmoothing',
    | 'mozInitial'
    | 'always'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'large'
    | 'medium'
    | 'never'
    | 'revert'
    | 'revertLayer'
    | 'small'
    | 'unset'
    | 'xLarge'
    | 'xSmall'
    | 'xxLarge'
    | 'xxSmall'
    | 'xxxLarge',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitFontVariantLigatures: Carrier<
    'WebkitFontVariantLigatures',
    | 'mozInitial'
    | 'commonLigatures'
    | 'contextual'
    | 'discretionaryLigatures'
    | 'historicalLigatures'
    | 'inherit'
    | 'initial'
    | 'noCommonLigatures'
    | 'noContextual'
    | 'noDiscretionaryLigatures'
    | 'noHistoricalLigatures'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitHyphenateCharacter: Carrier<
    'WebkitHyphenateCharacter',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitHyphens: Carrier<
    'WebkitHyphens',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'manual'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitInitialLetter: Carrier<
    'WebkitInitialLetter',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitJustifyContent: Carrier<
    'WebkitJustifyContent',
    | 'mozInitial'
    | 'center'
    | 'end'
    | 'flexEnd'
    | 'flexStart'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'spaceAround'
    | 'spaceBetween'
    | 'spaceEvenly'
    | 'start'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly WebkitLineBreak: Carrier<
    'WebkitLineBreak',
    | 'mozInitial'
    | 'anywhere'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'loose'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'strict'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitLineClamp: Carrier<
    'WebkitLineClamp',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitLogicalHeight: Carrier<
    'WebkitLogicalHeight',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitLogicalWidth: Carrier<
    'WebkitLogicalWidth',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitMarginEnd: Carrier<
    'WebkitMarginEnd',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitMarginStart: Carrier<
    'WebkitMarginStart',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMask: Carrier<
    'WebkitMask',
    | 'mozInitial'
    | 'border'
    | 'borderBox'
    | 'bottom'
    | 'center'
    | 'content'
    | 'contentBox'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'noRepeat'
    | 'none'
    | 'padding'
    | 'paddingBox'
    | 'repeat'
    | 'repeatX'
    | 'repeatY'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'round'
    | 'space'
    | 'text'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `<attachment>#` */
  readonly WebkitMaskAttachment: Carrier<
    'WebkitMaskAttachment',
    | 'mozInitial'
    | 'fixed'
    | 'inherit'
    | 'initial'
    | 'local'
    | 'revert'
    | 'revertLayer'
    | 'scroll'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImage: Carrier<
    'WebkitMaskBoxImage',
    | 'mozInitial'
    | 'alpha'
    | 'inherit'
    | 'initial'
    | 'luminance'
    | 'none'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageOutset: Carrier<
    'WebkitMaskBoxImageOutset',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageRepeat: Carrier<
    'WebkitMaskBoxImageRepeat',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'stretch'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageSlice: Carrier<
    'WebkitMaskBoxImageSlice',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageSource: Carrier<
    'WebkitMaskBoxImageSource',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitMaskBoxImageWidth: Carrier<
    'WebkitMaskBoxImageWidth',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskClip: Carrier<
    'WebkitMaskClip',
    | 'mozInitial'
    | 'border'
    | 'borderBox'
    | 'content'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'noClip'
    | 'padding'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'text'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property. */
  readonly WebkitMaskComposite: Carrier<
    'WebkitMaskComposite',
    | 'mozInitial'
    | 'clear'
    | 'copy'
    | 'destinationAtop'
    | 'destinationIn'
    | 'destinationOut'
    | 'destinationOver'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'sourceAtop'
    | 'sourceIn'
    | 'sourceOut'
    | 'sourceOver'
    | 'unset'
    | 'xor',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskImage: Carrier<
    'WebkitMaskImage',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskOrigin: Carrier<
    'WebkitMaskOrigin',
    | 'mozInitial'
    | 'border'
    | 'borderBox'
    | 'content'
    | 'contentBox'
    | 'fillBox'
    | 'inherit'
    | 'initial'
    | 'padding'
    | 'paddingBox'
    | 'revert'
    | 'revertLayer'
    | 'strokeBox'
    | 'unset'
    | 'viewBox',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskPosition: Carrier<
    'WebkitMaskPosition',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The `-webkit-mask-position-x` CSS property sets the initial horizontal position of a mask image. */
  readonly WebkitMaskPositionX: Carrier<
    'WebkitMaskPositionX',
    | 'mozInitial'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image. */
  readonly WebkitMaskPositionY: Carrier<
    'WebkitMaskPositionY',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskRepeat: Carrier<
    'WebkitMaskRepeat',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'noRepeat'
    | 'repeat'
    | 'repeatX'
    | 'repeatY'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The `-webkit-mask-repeat-x` property specifies whether and how a mask image is repeated (tiled) horizontally. */
  readonly WebkitMaskRepeatX: Carrier<
    'WebkitMaskRepeatX',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'noRepeat'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The `-webkit-mask-repeat-y` property sets whether and how a mask image is repeated (tiled) vertically. */
  readonly WebkitMaskRepeatY: Carrier<
    'WebkitMaskRepeatY',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'noRepeat'
    | 'repeat'
    | 'revert'
    | 'revertLayer'
    | 'round'
    | 'space'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitMaskSize: Carrier<
    'WebkitMaskSize',
    | 'mozInitial'
    | 'auto'
    | 'contain'
    | 'cover'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitMaxInlineSize: Carrier<
    'WebkitMaxInlineSize',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFillAvailable'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'maxContent'
    | 'minContent'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitOrder: Carrier<
    'WebkitOrder',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `auto | touch` */
  readonly WebkitOverflowScrolling: Carrier<
    'WebkitOverflowScrolling',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'touch' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitPaddingEnd: Carrier<
    'WebkitPaddingEnd',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitPaddingStart: Carrier<
    'WebkitPaddingStart',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitPerspective: Carrier<
    'WebkitPerspective',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitPerspectiveOrigin: Carrier<
    'WebkitPerspectiveOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitPrintColorAdjust: Carrier<
    'WebkitPrintColorAdjust',
    'mozInitial' | 'economy' | 'exact' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly WebkitRubyPosition: Carrier<
    'WebkitRubyPosition',
    | 'mozInitial'
    | 'alternate'
    | 'inherit'
    | 'initial'
    | 'interCharacter'
    | 'over'
    | 'revert'
    | 'revertLayer'
    | 'under'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022. */
  readonly WebkitScrollSnapType: Carrier<
    'WebkitScrollSnapType',
    | 'mozInitial'
    | 'block'
    | 'both'
    | 'inherit'
    | 'initial'
    | 'inline'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'x'
    | 'y',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitShapeMargin: Carrier<
    'WebkitShapeMargin',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **`-webkit-tap-highlight-color`** is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on. */
  readonly WebkitTapHighlightColor: Carrier<
    'WebkitTapHighlightColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextCombine: Carrier<
    'WebkitTextCombine',
    | 'mozInitial'
    | 'all'
    | 'digits'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitTextDecorationColor: Carrier<
    'WebkitTextDecorationColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitTextDecorationLine: Carrier<
    'WebkitTextDecorationLine',
    | 'mozInitial'
    | 'blink'
    | 'grammarError'
    | 'inherit'
    | 'initial'
    | 'lineThrough'
    | 'none'
    | 'overline'
    | 'revert'
    | 'revertLayer'
    | 'spellingError'
    | 'underline'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitTextDecorationSkip: Carrier<
    'WebkitTextDecorationSkip',
    | 'mozInitial'
    | 'boxDecoration'
    | 'edges'
    | 'inherit'
    | 'initial'
    | 'leadingSpaces'
    | 'none'
    | 'objects'
    | 'revert'
    | 'revertLayer'
    | 'spaces'
    | 'trailingSpaces'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly WebkitTextDecorationStyle: Carrier<
    'WebkitTextDecorationStyle',
    | 'mozInitial'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'solid'
    | 'unset'
    | 'wavy',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasis: Carrier<
    'WebkitTextEmphasis',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'circle'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'dot'
    | 'doubleCircle'
    | 'filled'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'none'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'open'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sesame'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'triangle'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasisColor: Carrier<
    'WebkitTextEmphasisColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasisPosition: Carrier<
    'WebkitTextEmphasisPosition',
    | 'mozInitial'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'over'
    | 'revert'
    | 'revertLayer'
    | 'under'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022. */
  readonly WebkitTextEmphasisStyle: Carrier<
    'WebkitTextEmphasisStyle',
    | 'mozInitial'
    | 'circle'
    | 'dot'
    | 'doubleCircle'
    | 'filled'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'open'
    | 'revert'
    | 'revertLayer'
    | 'sesame'
    | 'triangle'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016. */
  readonly WebkitTextFillColor: Carrier<
    'WebkitTextFillColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020. */
  readonly WebkitTextOrientation: Carrier<
    'WebkitTextOrientation',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'mixed'
    | 'revert'
    | 'revertLayer'
    | 'sideways'
    | 'sidewaysRight'
    | 'unset'
    | 'upright',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitTextSizeAdjust: Carrier<
    'WebkitTextSizeAdjust',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitTextStroke: Carrier<
    'WebkitTextStroke',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitTextStrokeColor: Carrier<
    'WebkitTextStrokeColor',
    | 'mozInitial'
    | 'AccentColor'
    | 'AccentColorText'
    | 'ActiveBorder'
    | 'ActiveCaption'
    | 'ActiveText'
    | 'AppWorkspace'
    | 'Background'
    | 'ButtonBorder'
    | 'ButtonFace'
    | 'ButtonHighlight'
    | 'ButtonShadow'
    | 'ButtonText'
    | 'Canvas'
    | 'CanvasText'
    | 'CaptionText'
    | 'Field'
    | 'FieldText'
    | 'GrayText'
    | 'Highlight'
    | 'HighlightText'
    | 'InactiveBorder'
    | 'InactiveCaption'
    | 'InactiveCaptionText'
    | 'InfoBackground'
    | 'InfoText'
    | 'LinkText'
    | 'Mark'
    | 'MarkText'
    | 'Menu'
    | 'MenuText'
    | 'Scrollbar'
    | 'SelectedItem'
    | 'SelectedItemText'
    | 'ThreeDDarkShadow'
    | 'ThreeDFace'
    | 'ThreeDHighlight'
    | 'ThreeDLightShadow'
    | 'ThreeDShadow'
    | 'VisitedText'
    | 'Window'
    | 'WindowFrame'
    | 'WindowText'
    | 'aliceblue'
    | 'antiquewhite'
    | 'aqua'
    | 'aquamarine'
    | 'azure'
    | 'beige'
    | 'bisque'
    | 'black'
    | 'blanchedalmond'
    | 'blue'
    | 'blueviolet'
    | 'brown'
    | 'burlywood'
    | 'cadetblue'
    | 'chartreuse'
    | 'chocolate'
    | 'coral'
    | 'cornflowerblue'
    | 'cornsilk'
    | 'crimson'
    | 'currentColor'
    | 'cyan'
    | 'darkblue'
    | 'darkcyan'
    | 'darkgoldenrod'
    | 'darkgray'
    | 'darkgreen'
    | 'darkgrey'
    | 'darkkhaki'
    | 'darkmagenta'
    | 'darkolivegreen'
    | 'darkorange'
    | 'darkorchid'
    | 'darkred'
    | 'darksalmon'
    | 'darkseagreen'
    | 'darkslateblue'
    | 'darkslategray'
    | 'darkslategrey'
    | 'darkturquoise'
    | 'darkviolet'
    | 'deeppink'
    | 'deepskyblue'
    | 'dimgray'
    | 'dimgrey'
    | 'dodgerblue'
    | 'firebrick'
    | 'floralwhite'
    | 'forestgreen'
    | 'fuchsia'
    | 'gainsboro'
    | 'ghostwhite'
    | 'gold'
    | 'goldenrod'
    | 'gray'
    | 'green'
    | 'greenyellow'
    | 'grey'
    | 'honeydew'
    | 'hotpink'
    | 'indianred'
    | 'indigo'
    | 'inherit'
    | 'initial'
    | 'ivory'
    | 'khaki'
    | 'lavender'
    | 'lavenderblush'
    | 'lawngreen'
    | 'lemonchiffon'
    | 'lightblue'
    | 'lightcoral'
    | 'lightcyan'
    | 'lightgoldenrodyellow'
    | 'lightgray'
    | 'lightgreen'
    | 'lightgrey'
    | 'lightpink'
    | 'lightsalmon'
    | 'lightseagreen'
    | 'lightskyblue'
    | 'lightslategray'
    | 'lightslategrey'
    | 'lightsteelblue'
    | 'lightyellow'
    | 'lime'
    | 'limegreen'
    | 'linen'
    | 'magenta'
    | 'maroon'
    | 'mediumaquamarine'
    | 'mediumblue'
    | 'mediumorchid'
    | 'mediumpurple'
    | 'mediumseagreen'
    | 'mediumslateblue'
    | 'mediumspringgreen'
    | 'mediumturquoise'
    | 'mediumvioletred'
    | 'midnightblue'
    | 'mintcream'
    | 'mistyrose'
    | 'moccasin'
    | 'navajowhite'
    | 'navy'
    | 'oldlace'
    | 'olive'
    | 'olivedrab'
    | 'orange'
    | 'orangered'
    | 'orchid'
    | 'palegoldenrod'
    | 'palegreen'
    | 'paleturquoise'
    | 'palevioletred'
    | 'papayawhip'
    | 'peachpuff'
    | 'peru'
    | 'pink'
    | 'plum'
    | 'powderblue'
    | 'purple'
    | 'rebeccapurple'
    | 'red'
    | 'revert'
    | 'revertLayer'
    | 'rosybrown'
    | 'royalblue'
    | 'saddlebrown'
    | 'salmon'
    | 'sandybrown'
    | 'seagreen'
    | 'seashell'
    | 'sienna'
    | 'silver'
    | 'skyblue'
    | 'slateblue'
    | 'slategray'
    | 'slategrey'
    | 'snow'
    | 'springgreen'
    | 'steelblue'
    | 'tan'
    | 'teal'
    | 'thistle'
    | 'tomato'
    | 'transparent'
    | 'turquoise'
    | 'unset'
    | 'violet'
    | 'wheat'
    | 'white'
    | 'whitesmoke'
    | 'yellow'
    | 'yellowgreen',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017. */
  readonly WebkitTextStrokeWidth: Carrier<
    'WebkitTextStrokeWidth',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly WebkitTextUnderlinePosition: Carrier<
    'WebkitTextUnderlinePosition',
    | 'mozInitial'
    | 'auto'
    | 'fromFont'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'under'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target. */
  readonly WebkitTouchCallout: Carrier<
    'WebkitTouchCallout',
    'mozInitial' | 'default' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransform: Carrier<
    'WebkitTransform',
    'mozInitial' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransformOrigin: Carrier<
    'WebkitTransformOrigin',
    | 'mozInitial'
    | 'bottom'
    | 'center'
    | 'inherit'
    | 'initial'
    | 'left'
    | 'revert'
    | 'revertLayer'
    | 'right'
    | 'top'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransformStyle: Carrier<
    'WebkitTransformStyle',
    | 'mozInitial'
    | 'flat'
    | 'inherit'
    | 'initial'
    | 'preserve-3d'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransition: Carrier<
    'WebkitTransition',
    | 'mozInitial'
    | 'all'
    | 'allowDiscrete'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'none'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionDelay: Carrier<
    'WebkitTransitionDelay',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionDuration: Carrier<
    'WebkitTransitionDuration',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionProperty: Carrier<
    'WebkitTransitionProperty',
    'mozInitial' | 'all' | 'inherit' | 'initial' | 'none' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015. */
  readonly WebkitTransitionTimingFunction: Carrier<
    'WebkitTransitionTimingFunction',
    | 'mozInitial'
    | 'ease'
    | 'easeIn'
    | 'easeInOut'
    | 'easeOut'
    | 'inherit'
    | 'initial'
    | 'linear'
    | 'revert'
    | 'revertLayer'
    | 'stepEnd'
    | 'stepStart'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** **Syntax**: `read-only | read-write | read-write-plaintext-only` */
  readonly WebkitUserModify: Carrier<
    'WebkitUserModify',
    | 'mozInitial'
    | 'inherit'
    | 'initial'
    | 'readOnly'
    | 'readWrite'
    | 'readWritePlaintextOnly'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly WebkitUserSelect: Carrier<
    'WebkitUserSelect',
    | 'mozInitial'
    | 'all'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'none'
    | 'revert'
    | 'revertLayer'
    | 'text'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly WebkitWritingMode: Carrier<
    'WebkitWritingMode',
    | 'mozInitial'
    | 'horizontalTb'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'sidewaysLr'
    | 'sidewaysRl'
    | 'unset'
    | 'verticalLr'
    | 'verticalRl',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly whiteSpace: Carrier<
    'whiteSpace',
    | 'mozInitial'
    | 'mozPreWrap'
    | 'breakSpaces'
    | 'collapse'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'preLine'
    | 'preWrap'
    | 'preserve'
    | 'preserveBreaks'
    | 'preserveSpaces'
    | 'revert'
    | 'revertLayer'
    | 'unset'
    | 'wrap',
    never,
    1,
    '',
    T
  >;
  /** Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly whiteSpaceCollapse: Carrier<
    'whiteSpaceCollapse',
    | 'mozInitial'
    | 'breakSpaces'
    | 'collapse'
    | 'inherit'
    | 'initial'
    | 'preserve'
    | 'preserveBreaks'
    | 'preserveSpaces'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is not Baseline because it does not work in some of the most widely-used browsers. */
  readonly widows: Carrier<
    'widows',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly width: Carrier<
    'width',
    | 'mozFitContent'
    | 'mozInitial'
    | 'mozMaxContent'
    | 'mozMinContent'
    | 'webkitFitContent'
    | 'webkitMaxContent'
    | 'auto'
    | 'fitContent'
    | 'inherit'
    | 'initial'
    | 'intrinsic'
    | 'maxContent'
    | 'minContent'
    | 'minIntrinsic'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    'length',
    1,
    'size',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020. */
  readonly willChange: Carrier<
    'willChange',
    | 'mozInitial'
    | 'auto'
    | 'contents'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'scrollPosition'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly wordBreak: Carrier<
    'wordBreak',
    | 'mozInitial'
    | 'autoPhrase'
    | 'breakAll'
    | 'breakWord'
    | 'inherit'
    | 'initial'
    | 'keepAll'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly wordSpacing: Carrier<
    'wordSpacing',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'revert' | 'revertLayer' | 'unset',
    'length',
    1,
    'letterSpacing',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018. */
  readonly wordWrap: Carrier<
    'wordWrap',
    | 'mozInitial'
    | 'breakWord'
    | 'inherit'
    | 'initial'
    | 'normal'
    | 'revert'
    | 'revertLayer'
    | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017. */
  readonly writingMode: Carrier<
    'writingMode',
    | 'mozInitial'
    | 'horizontalTb'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revertLayer'
    | 'sidewaysLr'
    | 'sidewaysRl'
    | 'unset'
    | 'verticalLr'
    | 'verticalRl',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly x: Carrier<
    'x',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020. */
  readonly y: Carrier<
    'y',
    'mozInitial' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
  /** This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. */
  readonly zIndex: Carrier<
    'zIndex',
    'mozInitial' | 'auto' | 'inherit' | 'initial' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    'zIndex',
    T
  >;
  /** Since May 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers. */
  readonly zoom: Carrier<
    'zoom',
    'mozInitial' | 'inherit' | 'initial' | 'normal' | 'reset' | 'revert' | 'revertLayer' | 'unset',
    never,
    1,
    '',
    T
  >;
}
