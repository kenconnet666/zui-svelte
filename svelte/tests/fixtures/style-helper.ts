import { css } from '@zui/core';

export function widthStyle(width: number): string {
  return css((s) => {
    s.width.px(width);
  });
}
