import { css } from '@zui/core';

export const panel = css((s) => {
  s.width.px(173);
});

export let helperCalls = 0;
function widthClass(width: number) {
  helperCalls++;
  return css((s) => {
    s.width.px(width);
  });
}
const make = (width: number) => widthClass(width);
export const mappedPanels = [203, 213].map(make);
const receiver = {
  width: 233,
  create() {
    return widthClass(this.width);
  },
};
export const receiverPanel = receiver.create();
