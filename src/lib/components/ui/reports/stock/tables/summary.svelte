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
  <span class="flex justify-between text-sm text-success-darkest">
    <span class="sm:hidden">{$t('report.credit-card-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.credit-card')}</span>
    <Currency amount={source.total_payments.creditcard} />
  </span>
  <span class="flex justify-between text-sm text-info-darkest">
    <span class="sm:hidden">{$t('report.promptpay-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.promptpay')}</span>
    <Currency amount={source.total_payments.promptpay} />
  </span>
</div>
