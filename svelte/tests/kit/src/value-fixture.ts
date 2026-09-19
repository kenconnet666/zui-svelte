import {
  CalendarDate,
  CalendarDateTime,
  Decimal,
  Time,
  createCalendar,
  parseZonedDateTime,
} from '@zui/svelte';

export function createValues(amount = '0.10') {
  return {
    amount: new Decimal(amount),
    signedZero: new Decimal('-0'),
    day: new CalendarDate(2026, 9, 19),
    buddhist: new CalendarDate(createCalendar('buddhist'), 2569, 9, 19),
    local: new CalendarDateTime(2026, 9, 19, 9, 30, 15, 250),
    time: new Time(9, 30, 15, 250),
    // 夏令时回拨的重复小时，显式保留所选 offset，不能重新猜测时刻。
    zoned: parseZonedDateTime('2026-11-01T01:30-04:00[America/New_York]'),
  };
}

export type Values = ReturnType<typeof createValues>;
