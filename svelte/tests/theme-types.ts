import { css, lightTheme, darkTheme, type DefaultTokens } from '../src/theme.js';
css((s) => {
  s.padding._sm;
  s.width._controlLg;
  s.height._full;
  s.borderRadius._none;
  s.borderRadius._full;
  s.transitionDuration._md;
  s.boxShadow._xl;
  // @ts-expect-error 系统尺度统一短名，不保留含义重复的旧别名。
  s.padding._small;
  // @ts-expect-error full 不适用于时长。
  s.transitionDuration._full;
});
const tokens: DefaultTokens = darkTheme.resolved;
void [tokens, lightTheme];
