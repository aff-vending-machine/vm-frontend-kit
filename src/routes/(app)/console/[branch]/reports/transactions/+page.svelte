<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/translations';
  import { convertToDate, parseDate } from '$lib/utils/convert';
  import { exportCSV, exportXlsx } from '$lib/utils/export';
  import type { TransactionReport } from '$lib/types/report';
  import { defaultForm, defaultTo } from '$lib/utils/generate';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Modal from '$lib/components/overlays/modals/Modal.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import overlay from '$lib/stores/overlay';
  import useSWR from '$lib/stores/useSWR';

  import Export from '../(components)/modal/Export.svelte';
  import Action from './(components)/filter/Action.svelte';
  import Filter from './(components)/filter/Filter.svelte';
  import SummaryRow from './(components)/table/SummaryRow.svelte';
  import { reportColumns } from './table';

  let { data } = $props();
  let searchParams = $state($page.url.searchParams);
  let query = $derived(new URLSearchParams(searchParams));
  export const filter = $derived({
    id: parseInt(query.get('id') ?? '0'),
    machineId: parseInt(query.get('machine_id') ?? '0'),
    channelId: parseInt(query.get('channel_id') ?? '0'),
    from: parseDate(query.get('from'), defaultForm),
    to: parseDate(query.get('to'), defaultTo),
  });

  let transactions = useSWR<TransactionReport[]>();

  let columns = reportColumns($t);
  let source = $transactions.data || [];

  function toTransactionReportFile(transaction: TransactionReport) {
    transaction.ordered_at = convertToDate(transaction.ordered_at);
    transaction.payment_requested_at = convertToDate(transaction.payment_requested_at);
    transaction.confirmed_paid_at = convertToDate(transaction.confirmed_paid_at);
    transaction.received_item_at = convertToDate(transaction.received_item_at);

    return transaction;
  }

  function handleDownload(e: CustomEvent) {
    overlay.close();
    const { filename, application } = e.detail;
    const data = source.map(toTransactionReportFile);
    switch (application) {
      case 'csv':
        return exportCSV(filename, data);

      case 'xlsx':
        return exportXlsx(filename, data);
    }
  }
</script>

<Card let:Content let:Header>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <Filter
      from={filter.from}
      to={filter.to}
      channelId={filter.channelId}
      channelOptions={data.options.channel}
      machineId={filter.machineId}
      machineOptions={data.options.machines}
    />
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Body let:Footer>
      <Header {columns} />
      {#if $transactions.loading}
        <Loading {columns} />
      {:else if $transactions.error}
        <div>{$transactions.error}</div>
      {:else}
        <Body {columns} {source} />
        <Footer>
          <SummaryRow {columns} {source} />
        </Footer>
      {/if}
    </Table>
  </Content>
</Card>

<Modal let:Body>
  <Body>
    <Export
      name={data.options.machines.find(m => m.value === filter.machineId)?.label ?? ''}
      report="transactions"
      from={filter.from}
      to={filter.to}
      on:download={handleDownload}
    />
  </Body>
</Modal>
