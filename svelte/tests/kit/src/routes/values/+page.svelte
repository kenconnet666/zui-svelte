<script lang="ts">
  import { enhance } from '$app/forms';
  import { resolve } from '$app/paths';
  import { CalendarDate, CalendarDateTime, Decimal, Time, ZonedDateTime } from '@zui/svelte';
  import type { Values } from '../../value-fixture.js';

  let { data, form = null }: { data: Values; form?: Values | null } = $props();
  let days = $state(0);
  const values = $derived(form ?? data);
  const restored = $derived(
    values.amount instanceof Decimal &&
      values.day instanceof CalendarDate &&
      values.local instanceof CalendarDateTime &&
      values.time instanceof Time &&
      values.zoned instanceof ZonedDateTime,
  );
</script>

<h1>特殊值传输</h1>
<p data-testid="transport-types">{restored ? 'restored' : 'lost'}</p>
<p data-testid="transport-amount">{values.amount.plus('0.20').toFixed(2)}</p>
<p data-testid="transport-zero">{values.signedZero.valueOf()}</p>
<p data-testid="transport-day">{values.day.add({ days }).toString()}</p>
<p data-testid="transport-calendar">
  {values.buddhist.calendar.identifier}:{values.buddhist.era}:{values.buddhist.year}
</p>
<p data-testid="transport-clock">{values.time.toString()}</p>
<p data-testid="transport-local">{values.local.toString()}</p>
<p data-testid="transport-zone">{values.zoned.timeZone}:{values.zoned.offset}</p>
<button type="button" onclick={() => (days += 1)}>增加日期</button>
<form method="POST" use:enhance>
  <button type="submit">提交特殊值</button>
</form>
<a href={resolve('/')}>离开页面</a>
