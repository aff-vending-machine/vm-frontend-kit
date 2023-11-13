<script lang="ts">
  import type { StockReport } from '$types/report';
  import Currency from '$components/elements/labels/Currency.svelte';
  import { isTablet, isDesktop } from '$lib/stores/media';
  import { t } from '$lib/i18n/translations';
  import type { ColumnType } from '$components/elements/tables/@table';

  export let columns: ColumnType[];
  export let data: StockReport[];

  $: colspan = columns.length - ($isDesktop ? 5 : $isTablet ? 8 : 9);
  $: totalCreditCard = data.reduce((total, row) => total + (row.total_payments['creditcard'] || 0), 0);
  $: totalPromptPay = data.reduce((total, row) => total + (row.total_payments['promptpay'] || 0), 0);
  $: totalPayment = totalCreditCard + totalPromptPay;
</script>

<tr>
  <td class="px-6 py-4" {colspan}>{$t('report.total')}</td>
  {#if $isTablet}
    <td class="flex flex-col justify-end px-6 py-4">
      <span class="text-green-800">
        {$t('report.columns.credit-card-short')}
        <Currency amount={totalCreditCard} />
      </span>
      <span class="text-lime-800"> {$t('report.columns.promptpay-short')} <Currency amount={totalPromptPay} /></span>
    </td>
  {/if}
  {#if $isDesktop}
    <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
    <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
  {/if}
  <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
</tr>
