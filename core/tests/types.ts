import { buildStyle, defineTheme, extendTheme, overrideTheme, tokenRef } from '../src/index.js';

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

const aliases = defineTheme({
  color: { primary: 'red', text: tokenRef('color', 'primary') },
  zIndex: { base: 1, popup: tokenRef('zIndex', 'base') },
});
const aliasColor: string = aliases.resolved.color.text;
const aliasIndex: number = aliases.resolved.zIndex.popup;
void [aliasColor, aliasIndex];
aliases.ref('color', 'text');
// @ts-expect-error 变量引用必须存在
aliases.ref('color', 'missing');
// @ts-expect-error 定义中的别名目标必须存在
defineTheme({ color: { text: tokenRef('color', 'missing') } });
// @ts-expect-error 别名不能跨越不同语义类别
defineTheme({ color: { text: tokenRef('spacing', 'small') }, spacing: { small: '8px' } });
// @ts-expect-error 扩展别名的目标必须存在
extendTheme(aliases, { color: { invalid: tokenRef('color', 'missing') } });
// @ts-expect-error 长度类 Token 使用明确单位
defineTheme({ spacing: { invalid: 8 } });
// @ts-expect-error 数值类别不能填任意字符串
defineTheme({ opacity: { invalid: 'opaque' } });
// @ts-expect-error 扩展不能改变已有 Token 的值种类
extendTheme(defineTheme({ custom: { numeric: 1 } }), { custom: { numeric: 'text' } });
