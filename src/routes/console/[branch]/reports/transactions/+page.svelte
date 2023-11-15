<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { bindFilter, filter } from './filter';
  import { reportColumns } from './(__table__)/table';
  import { t } from '$lib/i18n/translations';
  import Filter from './Filter.svelte';
  import Action from './Action.svelte';
  import type { TransactionReport } from '$types/report';
  import useSWR from '$lib/stores/useSWR';
  import overlay from '$lib/stores/overlay';
  import { exportCSV, exportXlsx } from '$lib/utils/export';
  import { convertToDate } from '$lib/utils/convert';
  import Modal from '$components/overlays/modals/Modal.svelte';
  import Export from '../(__modal__)/Export.svelte';
  import SummaryRow from './(__table__)/SummaryRow.svelte';

  export let data;
  let transactions = useSWR<TransactionReport[]>();

  $: columns = reportColumns($t);
  $: source = $transactions.data || [];

  onMount(() => {
    const machineIds = data.options.machines.map(m => m.value);
    const unsubscribe = bindFilter(machineIds, id => {
      return transactions.mutate(() => data.fetch.transactions(id));
    });

    return () => {
      unsubscribe();
    };
  });

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
    <Header>Search Filter</Header>
    <Filter
      from={$filter.from}
      to={$filter.to}
      channelId={$filter.channelId}
      channelOptions={data.options.channel}
      machineId={$filter.machineId}
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
      name={data.options.machines.find(m => m.value === $filter.machineId)?.label ?? ''}
      report="transactions"
      from={$filter.from}
      to={$filter.to}
      on:download={handleDownload}
    />
  </Body>
</Modal>
