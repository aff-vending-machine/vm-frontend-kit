<script lang="ts">
  import Currency from '$components/elements/labels/Currency.svelte';
  import type { ColumnType } from '$components/elements/tables/table';
  import { t } from '$lib/i18n/translations';
  import { isTablet, isDesktop } from '$lib/stores/media';
  import type { TransactionReport } from '$types/report';

  export let columns: ColumnType[];
  export let source: TransactionReport[];

  $: colspan = columns.length - ($isDesktop ? 3 : $isTablet ? 4 : 5);
  $: totalPayment = source.reduce((total, s) => total + s.paid_price, 0);
</script>

<tr>
  <td class="px-6 py-4" {colspan}>{$t('report.total')}</td>
  <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
</tr>
