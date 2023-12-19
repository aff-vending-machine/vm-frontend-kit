<script lang="ts">
  import { onMount } from 'svelte';

  import Export from '../__components__/modal/Export.svelte';

  import Action from './__components__/filter/Action.svelte';
  import Filter from './__components__/filter/Filter.svelte';
  import SummaryRow from './__components__/table/SummaryRow.svelte';
  import { bindFilter, filter } from './filter';
  import { reportColumns } from './table';

  import Table from '$components/elements/tables/Table.svelte';
  import Modal from '$components/overlays/modals/Modal.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import overlay from '$lib/stores/overlay';
  import useSWR from '$lib/stores/useSWR';
  import { convertToDate } from '$lib/utils/convert';
  import { exportCSV, exportXlsx } from '$lib/utils/export';
  import type { TransactionReport } from '$types/report';

  export let data;
  let transactions = useSWR<TransactionReport[]>();

  $: columns = reportColumns($t);
  $: source = $transactions.data || [];

  onMount(() => {
    const machineIds = data.options.machines.map(m => m.value);
    const unsubscribe = bindFilter(machineIds, async id => {
      await transactions.mutate(() => data.fetch.transactions(id));
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
    <Header>{$t('common.search-filter')}</Header>
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
