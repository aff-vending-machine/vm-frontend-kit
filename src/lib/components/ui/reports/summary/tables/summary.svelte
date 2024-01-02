<script lang="ts">
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineReport } from '$lib/types/report';

  let { source } = $props<{
    index: number;
    source: MachineReport;
  }>();
</script>

<div class="flex flex-col">
  <span class="mb-1 font-semibold sm:hidden">{source.name}</span>
  <span class="text-xs">
    <span class="sm:hidden">{$t('report.credit-card-short')} </span>
    <span class="hidden sm:inline-block">{$t('report.credit-card')}</span>
    <Currency amount={source.total_payments['creditcard']} />
  </span>
  <span class="text-xs">
    <span class="sm:hidden">{$t('report.promptpay-short')}</span>
    <span class="hidden sm:inline-block">{$t('report.promptpay')}</span>
    <Currency amount={source.total_payments['promptpay']} />
  </span>
  <span class="mt-1 text-sm font-semibold">{$t('report.summary')} <Currency amount={source.total} /></span>
</div>
