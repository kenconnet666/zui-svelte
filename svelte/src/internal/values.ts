import Decimal from 'decimal.js';
import { CalendarDate, CalendarDateTime, Time, ZonedDateTime } from '@internationalized/date';
import { SvelteDate } from 'svelte/reactivity';

const plain = (value: object) => {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
const keys = (value: object) =>
  Reflect.ownKeys(value).filter((key) => Object.getOwnPropertyDescriptor(value, key)?.enumerable);
const calendarValue = (
  value: unknown,
): value is CalendarDate | CalendarDateTime | Time | ZonedDateTime =>
  value instanceof CalendarDate ||
  value instanceof CalendarDateTime ||
  value instanceof Time ||
  value instanceof ZonedDateTime;

/** 表单基线/异步快照；领域值保留类型，文件和未知类作为不可变的 opaque 值保留引用。 */
export function snapshotValue<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value) as T;
  if (Decimal.isDecimal(value)) {
    const Constructor = value.constructor as typeof Decimal;
    return new Constructor(value) as T;
  }
  if (calendarValue(value)) return value.copy() as T;
  if (value instanceof SvelteDate) return new SvelteDate(value.getTime()) as T;
  if (value instanceof Date && value.constructor === Date) return new Date(value.getTime()) as T;
  if (value instanceof Map || value instanceof Set)
    throw new TypeError(
      'Form models use plain objects/arrays; mutable Map/Set need an explicit value model.',
    );
  if (!Array.isArray(value) && !plain(value)) return value;
  const result = Array.isArray(value)
    ? new Array(value.length)
    : Object.create(Object.getPrototypeOf(value));
  seen.set(value, result);
  for (const key of keys(value))
    Object.defineProperty(result, key, {
      value: snapshotValue(Reflect.get(value, key), seen),
      writable: true,
      configurable: true,
      enumerable: true,
    });
  return result as T;
}

export function equalValue(
  left: unknown,
  right: unknown,
  seen = new WeakMap<object, WeakSet<object>>(),
): boolean {
  if (Object.is(left, right)) return true;
  if (left === null || right === null || typeof left !== 'object' || typeof right !== 'object')
    return false;
  if (Decimal.isDecimal(left) || Decimal.isDecimal(right))
    return (
      Decimal.isDecimal(left) &&
      Decimal.isDecimal(right) &&
      (left.equals(right) || (left.isNaN() && right.isNaN()))
    );
  if (calendarValue(left) || calendarValue(right)) {
    if (!calendarValue(left) || !calendarValue(right) || left.constructor !== right.constructor)
      return false;
    if (left instanceof Time && right instanceof Time) return left.compare(right) === 0;
    if (left instanceof Time || right instanceof Time) return false;
    if (left.calendar.identifier !== right.calendar.identifier || left.era !== right.era)
      return false;
    if (left instanceof ZonedDateTime && right instanceof ZonedDateTime)
      return (
        left.timeZone === right.timeZone &&
        left.offset === right.offset &&
        left.compare(right) === 0
      );
    if (left instanceof CalendarDateTime && right instanceof CalendarDateTime)
      return left.compare(right) === 0;
    return (
      left instanceof CalendarDate && right instanceof CalendarDate && left.compare(right) === 0
    );
  }
  if (left instanceof Date || right instanceof Date)
    return (
      left instanceof Date && right instanceof Date && Object.is(left.getTime(), right.getTime())
    );
  if (Array.isArray(left) !== Array.isArray(right)) return false;
  if (!Array.isArray(left) && (!plain(left) || !plain(right))) return false;
  if (Array.isArray(left) && left.length !== (right as unknown[]).length) return false;
  const visited = seen.get(left);
  if (visited?.has(right)) return true;
  if (visited) visited.add(right);
  else seen.set(left, new WeakSet([right]));
  const a = keys(left),
    b = keys(right);
  return (
    a.length === b.length &&
    a.every(
      (key) =>
        Object.hasOwn(right, key) &&
        equalValue(Reflect.get(left, key), Reflect.get(right, key), seen),
    )
  );
}
