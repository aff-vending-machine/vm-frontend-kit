<script lang="ts">
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import type { ColumnType } from '$lib/components/elements/tables/table';
  import { t } from '$lib/i18n/translations';
  import { media } from '$lib/state.svelte';
  import type { MachineReport } from '$lib/types/report';

  let { columns, data } = $props<{
    columns: ColumnType[];
    data: MachineReport[];
  }>();

  const colspan = $derived(columns.length - (media.isDesktop ? 6 : media.isTablet ? 8 : 7));
  const totalCreditCard = $derived(data.reduce((total, row) => total + row.total_payments['creditcard'], 0));
  const totalPromptPay = $derived(data.reduce((total, row) => total + row.total_payments['promptpay'], 0));
  const totalPayment = $derived(totalCreditCard + totalPromptPay);
</script>

<tr>
  <td class="px-6 py-4" {colspan}>{$t('report.total')}</td>
  {#if media.isDesktop}
    <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
    <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
  {:else}
    <td class="flex flex-col justify-end px-6 py-4">
      <span>
        {$t('report.columns.credit-card')}
        <Currency amount={totalCreditCard} />
      </span>
      <span> {$t('report.columns.promptpay')} <Currency amount={totalPromptPay} /></span>
      <span> {$t('report.columns.total')}<Currency amount={totalPayment} /></span>
    </td>
  {/if}
  <td class="hidden px-6 py-4 xl:table-cell"><Currency amount={totalPayment} /></td>
  <td class="hidden px-6 py-4 sm:table-cell"></td>
</tr>
