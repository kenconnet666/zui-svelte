<script lang="ts">
  import { Decimal, parseDate, z, type CalendarDate } from '@zui/svelte';

  // 示例明确限制位数，既展示精确计算，也不冒充完整 DecimalInput。
  const amountSchema = z
    .string()
    .regex(/^\d{1,12}(?:\.\d{1,2})?$/, '请输入最多 12 位整数、2 位小数的非负金额')
    .transform((text) => new Decimal(text));

  let amount = $state('0.10');
  let date = $state<CalendarDate>(parseDate('2026-09-19'));
  const result = $derived(amountSchema.safeParse(amount));
</script>

<p class="eyebrow">PUBLIC API</p>
<h1>领域值</h1>
<p class="lead">这些示例通过组件库公开入口使用 Zod、Decimal 和日期类型。</p>

<section class="article" aria-labelledby="decimal-title">
  <h2 id="decimal-title">精确十进制与校验</h2>
  <p id="amount-help">原生输入框用于验证依赖接入；DecimalInput 和 Field 仍在设计中。</p>
  <label for="amount">金额</label>
  <input
    id="amount"
    inputmode="decimal"
    bind:value={amount}
    aria-invalid={!result.success}
    aria-describedby={result.success ? 'amount-help' : 'amount-help amount-error'}
  />
  <button
    type="button"
    disabled={!result.success}
    onclick={() => {
      if (result.success) amount = result.data.plus('0.20').toFixed(2);
    }}>增加 0.20</button
  >
  <p>
    精确金额：<output data-testid="decimal-value"
      >{result.success ? result.data.toFixed(2) : '—'}</output
    >
  </p>
  {#if !result.success}
    <p id="amount-error" role="alert">{result.error.issues[0]?.message}</p>
  {/if}
</section>

<section class="article" aria-labelledby="date-title">
  <h2 id="date-title">不带时区的日期</h2>
  <p>纯日期保持日历语义，不先转换成本地午夜的 JavaScript Date。</p>
  <p>日期：<output data-testid="calendar-date">{date.toString()}</output></p>
  <button type="button" onclick={() => (date = date.add({ days: 1 }))}>增加一天</button>
</section>
