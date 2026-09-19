import type { Transport } from '@sveltejs/kit';
import {
  CalendarDate,
  CalendarDateTime,
  Decimal,
  Time,
  ZonedDateTime,
  createCalendar,
} from '@zui/svelte';

type DateParts = [
  calendar: CalendarDate['calendar']['identifier'],
  era: string,
  year: number,
  month: number,
  day: number,
];
type ClockParts = [hour: number, minute: number, second: number, millisecond: number];
type ZonedParts = [...DateParts, timeZone: string, offset: number, ...ClockParts];
const dateParts = (value: CalendarDate | CalendarDateTime | ZonedDateTime): DateParts => [
  value.calendar.identifier,
  value.era,
  value.year,
  value.month,
  value.day,
];
const clockParts = (value: Time | CalendarDateTime | ZonedDateTime): ClockParts => [
  value.hour,
  value.minute,
  value.second,
  value.millisecond,
];

// 这是消费者接入范例，不是新的 ZUI 序列化框架。两端执行，不能导入 /server。
export const transport = {
  Decimal: {
    // 只承诺默认构造器的值；自定义 clone 的计算配置需业务另行登记。
    encode: (value: unknown) =>
      Decimal.isDecimal(value) && value.constructor === Decimal && [value.valueOf()],
    decode: ([value]: [string]) => new Decimal(value),
  },
  ZonedDateTime: {
    encode: (value: unknown) =>
      value instanceof ZonedDateTime && [
        ...dateParts(value),
        value.timeZone,
        value.offset,
        ...clockParts(value),
      ],
    decode: ([calendar, ...parts]: ZonedParts) =>
      new ZonedDateTime(createCalendar(calendar), ...parts),
  },
  CalendarDateTime: {
    encode: (value: unknown) =>
      value instanceof CalendarDateTime && [...dateParts(value), ...clockParts(value)],
    decode: ([calendar, ...parts]: [...DateParts, ...ClockParts]) =>
      new CalendarDateTime(createCalendar(calendar), ...parts),
  },
  CalendarDate: {
    encode: (value: unknown) => value instanceof CalendarDate && dateParts(value),
    decode: ([calendar, ...parts]: DateParts) =>
      new CalendarDate(createCalendar(calendar), ...parts),
  },
  Time: {
    encode: (value: unknown) => value instanceof Time && clockParts(value),
    decode: (parts: ClockParts) => new Time(...parts),
  },
} satisfies Transport;
