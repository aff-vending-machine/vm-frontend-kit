<script lang="ts">
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import { t } from '$lib/i18n/translations';
  import type { StockReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: StockReport;
  }>();
</script>

<div class="flex max-w-xs flex-col">
  <sup class="text-[0.6rem]">{source.code}</sup>
  <span class="font-semibold text-primary">{source.name}</span>
  <span class="mt-4 flex justify-end text-xs">
    <span class="mr-2">{$t('report.columns.sold-short')} {source.sold} x</span>
    <Currency amount={source.sale_price} />
  </span>
</div>
