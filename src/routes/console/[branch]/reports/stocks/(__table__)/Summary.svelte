<script lang="ts">
  import Currency from '$components/elements/labels/Currency.svelte';
  import { t } from '$lib/i18n/translations';
  import type { StockReport } from '$types/report';

  export let index: number;
  export let source: StockReport;

  $: _ = index;
</script>

<div class="flex flex-col">
  <span class="flex justify-between text-sm text-green-900">
    <span class="sm:hidden">{$t('report.credit-card-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.credit-card')}</span>
    <Currency amount={source.total_payments.creditcard} />
  </span>
  <span class="flex justify-between text-sm text-lime-900">
    <span class="sm:hidden">{$t('report.promptpay-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.promptpay')}</span>
    <Currency amount={source.total_payments.promptpay} />
  </span>
</div>
