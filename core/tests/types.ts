import { buildStyle, defineTheme, extendTheme, overrideTheme } from '../src/index.js';

const theme = extendTheme(defineTheme({ color: { primary: 'red' } }), {
  color: { customBrand: 'blue' },
  spacing: { roomy: '24px' },
});

buildStyle((s) => {
  s.display.inlineFlex;
  s.width.px(12);
  s.padding.px(1, 2, 3, 4);
  s.color._customBrand;
  s.gap._roomy;
  // @ts-expect-error 不允许未知属性
  void s.unknownProperty;
  // @ts-expect-error fr 不是 width 的单位
  s.width.fr(1);
  // @ts-expect-error width 只接受一个长度
  s.width.px(1, 2);
  // @ts-expect-error gap 最多两个值
  s.gap.px(1, 2, 3);
  // @ts-expect-error opacity 不接受长度单位
  s.opacity.px(1);
  // @ts-expect-error Token 类别错误
  s.gap._customBrand;
  // @ts-expect-error 不存在的 Token
  s.color._missing;
}, theme);

overrideTheme(theme, { color: { primary: 'green' } });
// @ts-expect-error override 不增加新键
overrideTheme(theme, { color: { unknown: 'red' } });
