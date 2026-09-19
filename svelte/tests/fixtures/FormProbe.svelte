<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Decimal, z } from '@zui/svelte';
  import { FieldScope, FormController } from '@zui/svelte/internal';

  let model = $state({ name: '', amount: new Decimal('1.00') });
  let amountText = $state('1.00');
  let saved = $state('');
  let show = $state(true);
  const decimal = z
    .string()
    .regex(/^\d{1,12}(?:\.\d{1,2})?$/)
    .transform((value) => new Decimal(value));
  const schema = z.object({
    name: z.string().trim().min(2, '名称至少两个字符'),
    amount: z.custom<Decimal>((value) => Decimal.isDecimal(value) && value.isFinite()),
  });
  const form = new FormController({
    value: () => model,
    setValue: (value) => {
      model = value;
      amountText = value.amount.toFixed(2);
    },
    schema: () => schema,
    onValid: async (value) => {
      saved = value.name + ':' + value.amount.toFixed(2);
    },
  });
  const name = new FieldScope(
    { id: 'form-name', name: () => 'name', description: () => 'name-help' },
    form,
  );
  const amount = new FieldScope({ id: 'form-amount', name: () => 'amount' }, form);
  $effect(() => {
    form.observe();
  });
  $effect(() => {
    name.refresh();
    amount.refresh();
  });
  onDestroy(() => {
    name.dispose();
    amount.dispose();
    form.dispose();
  });
</script>

<form
  novalidate
  onsubmit={(event) => {
    event.preventDefault();
    void form.submit();
  }}
  onreset={(event) => {
    event.preventDefault();
    form.reset();
  }}
>
  <label id={name.labelId} for={name.controlId}>名称</label>
  <input {...name.attributes()} bind:value={model.name} {@attach (node) => name.attach(node)} />
  <p id="name-help">先离开字段，再显示校验结果。</p>
  {#if name.errors.length}<p id={name.errorId} role="alert">{name.errors[0]}</p>{/if}

  {#if show}
    <label id={amount.labelId} for={amount.controlId}>金额</label>
    <input
      {...amount.attributes()}
      inputmode="decimal"
      value={amountText}
      oninput={(event) => {
        amountText = event.currentTarget.value;
        const parsed = decimal.safeParse(amountText);
        if (parsed.success) model.amount = parsed.data;
      }}
      {@attach (node) =>
        amount.attach(node, 'control', {
          check: () => (decimal.safeParse(amountText).success ? undefined : '金额尚未完成'),
        })}
    />
    {#if amount.errors.length}<p id={amount.errorId} role="alert">{amount.errors[0]}</p>{/if}
  {/if}
  <button type="submit">验证并保存</button>
  <button type="reset">恢复初值</button>
</form>
<button type="button" onclick={() => (show = !show)}>切换金额控件</button>
<output data-testid="form-saved">{saved}</output>
<output data-testid="form-dirty">{String(form.state.dirty)}</output>
<output data-testid="form-controls">{amount.controlCount}</output>
<output data-testid="form-native">{model.amount.toFixed(2)}</output>
<output data-testid="form-state">{JSON.stringify(form.state)}</output>
