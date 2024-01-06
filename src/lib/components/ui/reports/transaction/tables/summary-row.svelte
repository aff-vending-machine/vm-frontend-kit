<script lang="ts">
  import Currency from '$lib/components/elements/labels/Currency.svelte';
  import type { ColumnType } from '$lib/components/elements/tables/table';
  import { t } from '$lib/i18n/translations';
  import { media } from '$lib/state.svelte';
  import type { TransactionReport } from '$lib/types/report';

  let { columns, data } = $props<{
    columns: ColumnType[];
    data: TransactionReport[];
  }>();

  const colspan = $derived(columns.length - (media.isDesktop ? 3 : media.isTablet ? 4 : 5));
  const totalPayment = $derived(data.reduce((total, s) => total + s.paid_price, 0));
</script>

<tr>
  <td class="px-6 py-4" {colspan}>{$t('report.total')}</td>
  <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
</tr>
