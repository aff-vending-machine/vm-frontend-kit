<script lang="ts">
  import Currency from '$components/elements/labels/Currency.svelte';
  import { t } from '$lib/i18n/translations';
  import type { StockReport } from '$types/report';

  export let index: number;
  export let source: StockReport;

  $: _ = index;
</script>

<div class="flex max-w-xs flex-col">
  <sup class="text-[0.6rem]">{source.code}</sup>
  <span class="font-semibold text-primary-500">{source.name}</span>
  <span class="mt-4 flex justify-end text-xs">
    <span class="mr-2">{$t('report.columns.sold-short')} {source.sold} x</span>
    <Currency amount={source.sale_price} />
  </span>
</div>
