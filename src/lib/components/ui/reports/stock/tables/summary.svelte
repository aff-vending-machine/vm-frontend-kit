<script lang="ts">
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import { t } from '$lib/i18n/translations';
  import type { StockReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: StockReport;
  }>();
</script>

<div class="flex flex-col">
  <span class="text-green-900 flex justify-between text-sm">
    <span class="sm:hidden">{$t('report.credit-card-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.credit-card')}</span>
    <Currency amount={source.total_payments.creditcard} />
  </span>
  <span class="text-lime-900 flex justify-between text-sm">
    <span class="sm:hidden">{$t('report.promptpay-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.promptpay')}</span>
    <Currency amount={source.total_payments.promptpay} />
  </span>
</div>
