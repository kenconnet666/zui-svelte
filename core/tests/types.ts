import {
  buildStyle,
  defineTheme,
  extendTheme,
  overrideTheme,
  tokenRef,
  createCss,
  baseTheme,
  css,
} from '../src/index.js';

createCss(baseTheme)((s) => {
  s.display.flex;
  s.width.px(120);
  // @ts-expect-error 基础主题不包含系统预设 Token。
  s.color._primary;
});
const customBase = extendTheme(baseTheme, { color: { ink: '#123456' } });
createCss(customBase)((s) => {
  s.color._ink;
  // @ts-expect-error 自定义主题不偷偷补充亮色 Token。
  s.color._surface;
});
// @ts-expect-error 自定义主题统一通过 createCss 绑定。
css(() => {}, baseTheme);
const flexibleTheme = defineTheme({ fontWeight: { body: 400 }, lineHeight: { body: 1.5 } });
overrideTheme(flexibleTheme, { fontWeight: { body: 'bold' }, lineHeight: { body: 'normal' } });
const longAliases = defineTheme({
  opacity: {
    a: 0.5,
    b: tokenRef('opacity', 'a'),
    c: tokenRef('opacity', 'b'),
    d: tokenRef('opacity', 'c'),
    e: tokenRef('opacity', 'd'),
    f: tokenRef('opacity', 'e'),
    g: tokenRef('opacity', 'f'),
    h: tokenRef('opacity', 'g'),
    i: tokenRef('opacity', 'h'),
    j: tokenRef('opacity', 'i'),
    k: tokenRef('opacity', 'j'),
  },
});
overrideTheme(longAliases, { opacity: { k: 0.8 } });
// @ts-expect-error 超过递归预算仍保留已知类别的值种类。
overrideTheme(longAliases, { opacity: { k: 'opaque' } });

const numberedTheme = defineTheme({
  color: { 100: '#fff', 200: '#ddd', surface: tokenRef('color', '100') },
  spacing: { 4: '4px' },
  opacity: { 50: 0.5 },
});
numberedTheme.variable('color', '100');
numberedTheme.ref('opacity', '50');
const numberedCss = createCss(numberedTheme);
numberedCss((s) => {
  s.color._100;
  s.gap._4;
  s.opacity._50;
  // @ts-expect-error 数字键仍按类别隔离
  s.gap._100;
});
const numberedExtension = extendTheme(numberedTheme, {
  color: { 100: 'red', 300: tokenRef('color', '200') },
});
createCss(numberedExtension)((s) => {
  s.color._300;
});
overrideTheme(numberedTheme, { color: { 100: 'black' }, opacity: { 50: 0.6 } });
// @ts-expect-error 数字键不能绕过已存在 Token 的值类型约束
extendTheme(numberedTheme, { opacity: { 50: '0.5' } });
// @ts-expect-error 不存在的数字键引用
defineTheme({ color: { 100: tokenRef('color', '999') } });
const customNumberKeys = defineTheme({ custom: { 100: 1 } });
// @ts-expect-error 自定义类别也不能用数字键绕过扩展的值类型约束
extendTheme(customNumberKeys, { custom: { 100: 'changed' } });
const numberedCategory = defineTheme({ 0: { 100: 'red', alias: tokenRef('0', '100') } });
numberedCategory.variable('0', '100');

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

const mappedTheme = extendTheme(theme, { layoutSpace: { card: '18px' } });
const mappedCss = createCss(mappedTheme, { tokenMap: { gap: 'layoutSpace' } });
mappedCss((s) => {
  s.gap._card;
  s.gap.px(8, 12);
  s.gap('normal');
  s._hover((s) => {
    s.gap._card;
  });
  // @ts-expect-error 映射替换该属性的默认 Token 类别
  s.gap._roomy;
  // @ts-expect-error 单位参数约束仍然保留
  s.gap.px(1, 2, 3);
});
// @ts-expect-error 不允许未知映射属性，即使同一个对象包含有效属性
createCss(mappedTheme, { tokenMap: { gap: 'layoutSpace', typo: 'layoutSpace' } });
// @ts-expect-error 不允许不存在的类别
createCss(mappedTheme, { tokenMap: { gap: 'missing' } });

buildStyle(
  (s) => {
    s.gap._card;
  },
  mappedTheme,
  undefined,
  { gap: 'layoutSpace' },
);
const optionalMap: { gap?: 'layoutSpace' } = {};
const optionalCss = createCss(mappedTheme, { tokenMap: optionalMap });
optionalCss((s) => {
  s.gap.px(8);
  // @ts-expect-error 可选映射不能保证自定义类别一定启用
  s.gap._card;
});
