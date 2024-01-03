<script lang="ts">
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import type { ColumnType } from '$lib/components/elements/tables/table';
  import { t } from '$lib/i18n/translations';
  import { isTablet, isDesktop } from '$lib/stores/media';
  import type { StockReport } from '$lib/types/report';

  let { columns, data } = $props<{
    columns: ColumnType[];
    data: StockReport[];
  }>();

  const colspan = $derived(columns.length - ($isDesktop ? 5 : $isTablet ? 8 : 9));
  const totalCreditCard = $derived(data.reduce((total, row) => total + (row.total_payments['creditcard'] || 0), 0));
  const totalPromptPay = $derived(data.reduce((total, row) => total + (row.total_payments['promptpay'] || 0), 0));
  const totalPayment = $derived(totalCreditCard + totalPromptPay);
</script>

<tr>
  <td class="px-6 py-4" {colspan}>{$t('report.total')}</td>
  {#if $isTablet}
    <td class="flex flex-col justify-end px-6 py-4">
      <span class="text-success-dark">
        <span class="sm:hidden">{$t('report.credit-card-short')} </span>
        <span class="hidden sm:inline-block">{$t('report.credit-card')}</span>
        <Currency amount={totalCreditCard} />
      </span>
      <span class="text-info-dark">
        <span class="sm:hidden">{$t('report.promptpay-short')} </span>
        <span class="hidden sm:inline-block">{$t('report.promptpay')}</span>
        <Currency amount={totalPromptPay} />
      </span>
    </td>
  {/if}
  {#if $isDesktop}
    <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
    <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
  {/if}
  <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
</tr>
