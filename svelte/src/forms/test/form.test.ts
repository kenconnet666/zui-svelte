import { describe, expect, it, vi } from 'vitest';
import Decimal from 'decimal.js';
import { CalendarDate, createCalendar, parseZonedDateTime } from '@internationalized/date';
import { z } from '../../validation.js';
import { FormController } from '../form.js';
import { equalValue, snapshotValue } from '../values.js';
import { fieldPath, valueAt } from '../path.js';

const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('form coordinator', () => {
  it('follows keyed field paths through array reorder and preserves unmounted business values', async () => {
    let model = {
      rows: [
        { id: 1, text: '' },
        { id: 2, text: 'ready' },
      ],
    };
    const schema = z.object({
      rows: z.array(z.object({ id: z.number(), text: z.string().min(1, 'required') })),
    });
    const form = new FormController({
      value: () => model,
      setValue: (next) => {
        model = next;
      },
      schema: () => schema,
    });
    const remove = form.register({
      id: 'stable-row-1',
      name: () => ['rows', model.rows.findIndex((row) => row.id === 1), 'text'],
      focus: () => false,
    });
    form.blur('stable-row-1');
    await settle();
    expect(form.errors('stable-row-1')[0]?.path).toEqual(['rows', 0, 'text']);
    model.rows.reverse();
    form.observe();
    form.fieldChanged();
    await settle();
    expect(form.errors('stable-row-1')[0]?.path).toEqual(['rows', 1, 'text']);
    remove();
    expect(model.rows).toHaveLength(2);
    expect(await form.submit()).toBe(false);
    expect(form.state.issues[0]?.path).toEqual(['rows', 1, 'text']);
    form.dispose();
  });
  it('keeps one model and tracks programmatic changes, touch, reset and transformed submissions', async () => {
    let model = { name: '', rows: [{ id: 1 }] };
    const saved = vi.fn();
    const schema = z.object({
      name: z.string().trim().min(2),
      rows: z.array(z.object({ id: z.number() })),
    });
    const form = new FormController({
      value: () => model,
      setValue: (value) => {
        model = value;
      },
      schema: () => schema,
      onValid: saved,
    });
    form.register({ id: 'name', name: () => 'name', focus: vi.fn() });
    expect(form.errors('name')).toEqual([]);
    form.blur('name');
    await settle();
    expect(form.errors('name')).toHaveLength(1);
    model.name = '  张三  ';
    model.rows.push({ id: 2 });
    form.observe();
    await settle();
    expect(form.state.dirty).toBe(true);
    expect(await form.submit()).toBe(true);
    expect(saved.mock.calls[0]![0]).toEqual({ name: '张三', rows: [{ id: 1 }, { id: 2 }] });
    expect(model.name).toBe('  张三  ');
    form.reset();
    expect(model).toEqual({ name: '', rows: [{ id: 1 }] });
    expect(form.state.dirty).toBe(false);
    form.reset({ name: '李四', rows: [] });
    model.name = '王五';
    form.observe();
    form.reset();
    expect(model.name).toBe('李四');
    form.dispose();
  });

  it('never submits a stale valid model while a control still has an invalid draft', async () => {
    const saved = vi.fn();
    let badDraft = true;
    const focus = vi.fn();
    const schema = z.object({ amount: z.number() });
    const form = new FormController({
      value: () => ({ amount: 12 }),
      setValue: () => {},
      schema: () => schema,
      onValid: saved,
    });
    const remove = form.register({
      id: 'amount',
      name: () => 'amount',
      focus,
      check: () => (badDraft ? '输入尚未完成' : undefined),
    });
    expect(await form.submit()).toBe(false);
    expect(saved).not.toHaveBeenCalled();
    expect(focus).toHaveBeenCalledOnce();
    badDraft = false;
    expect(await form.submit()).toBe(true);
    remove();
    expect(form.fieldCount).toBe(0);
    form.dispose();
  });

  it('drops out-of-order results and invalidates pending submissions when reset', async () => {
    let model = { name: 'old' };
    const gates = new Map<string, () => void>();
    const schema = z.object({
      name: z.string().refine(async (name) => {
        await new Promise<void>((resolve) => gates.set(name, resolve));
        return name === 'new';
      }, 'invalid'),
    });
    const saved = vi.fn();
    const form = new FormController({
      value: () => model,
      setValue: (value) => {
        model = value;
      },
      schema: () => schema,
      onValid: saved,
    });
    const old = form.validate();
    model.name = 'new';
    form.observe();
    // submit 自己拥有本次验证，排队的 change 验证不能抢走其结果。
    const current = form.submit();
    gates.get('new')!();
    expect(await current).toBe(true);
    gates.get('old')!();
    expect(await old).toBe(false);
    expect(form.state.issues).toEqual([]);
    model.name = 'pending';
    form.observe();
    const pending = form.submit();
    form.reset({ name: 'reset' });
    gates.get('pending')!();
    expect(await pending).toBe(false);
    expect(saved).toHaveBeenCalledOnce();
    expect(form.state.submitted).toBe(false);
    form.dispose();
  });

  it('keeps server errors scoped to the submitted revision and reports thrown checks', async () => {
    let model = { name: '张三', other: 1 };
    const schema = z.object({ name: z.string(), other: z.number() });
    const form = new FormController({
      value: () => model,
      setValue: (value) => {
        model = value;
      },
      schema: () => schema,
      onValid: (_value, context) =>
        context.setErrors([
          { path: ['name'], message: '已存在' },
          { path: [], message: '请检查资料' },
        ]),
    });
    expect(await form.submit()).toBe(false);
    model.other++;
    form.observe();
    expect(form.state.issues).toHaveLength(2);
    model.name = '李四';
    form.observe();
    expect(form.state.issues).toHaveLength(1);
    expect(form.state.issues[0]!.path).toEqual([]);
    form.reset();
    form.register({
      id: 'bad',
      name: () => 'name',
      focus: () => false,
      check: () => {
        throw new Error('broken check');
      },
    });
    expect(await form.validate()).toBe(false);
    expect(form.state.validating).toBe(false);
    expect(form.state.issues[0]!.source).toBe('system');
    form.dispose();
  });

  it('releases registrations after repeated mount/unmount without deleting values', () => {
    const model = { field: 'kept' },
      schema = z.object({ field: z.string() });
    const form = new FormController({
      value: () => model,
      setValue: () => {},
      schema: () => schema,
    });
    for (let i = 0; i < 100; i++)
      form.register({ id: 'field', name: () => 'field', focus: () => false })();
    expect(form.fieldCount).toBe(0);
    expect(model.field).toBe('kept');
    form.dispose();
    expect(() => form.observe()).toThrow('disposed');
  });

  it('does not validate or submit midway through composition and updates scoped messages', async () => {
    let model = { value: '' };
    let language = '中文';
    let errorMap: z.core.$ZodErrorMap = () => language;
    const schema = z.object({ value: z.string().min(2) });
    const saved = vi.fn();
    const form = new FormController({
      value: () => model,
      setValue: (value) => {
        model = value;
      },
      schema: () => schema,
      error: () => errorMap,
      onValid: saved,
    });
    form.register({ id: 'value', name: () => 'value', focus: () => false });
    form.composing('value', true);
    model.value = '中';
    form.observe();
    form.blur('value');
    await settle();
    expect(await form.submit()).toBe(false);
    expect(saved).not.toHaveBeenCalled();
    form.composing('value', false);
    await settle();
    expect(form.errors('value')[0]!.message).toBe('中文');
    language = 'English';
    errorMap = () => language;
    form.observe();
    await settle();
    expect(form.errors('value')[0]!.message).toBe('English');
    form.dispose();
  });

  it('ignores a rejected stale validator and does not cancel a submit for control availability changes', async () => {
    let model = { value: 'old' };
    let rejectOld!: (error: Error) => void;
    let finishNew!: () => void;
    const schema = z.object({
      value: z.string().refine(async (value) => {
        if (value === 'old')
          await new Promise<void>((_resolve, reject) => {
            rejectOld = reject;
          });
        else
          await new Promise<void>((resolve) => {
            finishNew = resolve;
          });
        return true;
      }),
    });
    const saved = vi.fn();
    const form = new FormController({
      value: () => model,
      setValue: (next) => {
        model = next;
      },
      schema: () => schema,
      onValid: saved,
    });
    form.register({ id: 'value', name: () => 'value', focus: () => false });
    const old = form.validate();
    model.value = 'new';
    const submission = form.submit();
    form.fieldChanged();
    finishNew();
    expect(await submission).toBe(true);
    rejectOld(new Error('obsolete network error'));
    expect(await old).toBe(false);
    expect(form.state.issues).toEqual([]);
    expect(saved).toHaveBeenCalledOnce();
    form.dispose();
  });
});

describe('domain snapshots and paths', () => {
  it('preserves decimal constructors, calendars, zones, dates, holes and cycles', () => {
    const D = Decimal.clone({ precision: 40 });
    const value: Record<string, unknown> = {
      amount: new D('9007199254740993.12'),
      day: new CalendarDate(createCalendar('buddhist'), 2569, 9, 19),
      zoned: parseZonedDateTime('2026-11-01T01:30-04:00[America/New_York]'),
      date: new Date(0),
      holes: new Array(2),
    };
    value.self = value;
    const copy = snapshotValue(value);
    expect(copy).not.toBe(value);
    expect(copy.self).toBe(copy);
    expect((copy.amount as Decimal).constructor).toBe(D);
    expect((copy.day as CalendarDate).calendar.identifier).toBe('buddhist');
    expect(equalValue(value, copy)).toBe(true);
    expect(equalValue(new Decimal('1.00'), new D('1.0'))).toBe(true);
    expect(equalValue(new Array(2), [])).toBe(false);
    expect(() => snapshotValue(new Map())).toThrow('Map/Set');
    expect(fieldPath('rows.0.name')).toEqual(['rows', 0, 'name']);
    expect(valueAt({}, ['__proto__', 'polluted'])).toBeUndefined();
    expect(() => fieldPath('rows..name')).toThrow();
  });
});
