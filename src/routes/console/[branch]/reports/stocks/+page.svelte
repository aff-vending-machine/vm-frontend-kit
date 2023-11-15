<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { bindFilter, filter } from './filter';
  import { regroupData, reportColumns } from './(__table__)/_table';
  import SummaryRow from './(__table__)/SummaryRow.svelte';
  import { t } from '$lib/i18n/translations';
  import Filter from './Filter.svelte';
  import Action from './Action.svelte';
  import type { StockReport } from '$types/report';
  import Modal from '$components/overlays/modals/Modal.svelte';
  import Export from '../(__modal__)/Export.svelte';
  import { exportCSV, exportXlsx } from '$lib/utils/export';
  import useSWR from '$lib/stores/useSWR';
  import overlay from '$lib/stores/overlay';

  export let data;
  let stocks = useSWR<StockReport[]>();

  $: columns = reportColumns($t);
  $: source = regroupData($stocks.data || [], $filter.group);

  onMount(() => {
    const machineIds = data.options.machines.map(m => m.value);
    const unsubscribe = bindFilter(machineIds, id => {
      return stocks.mutate(() => data.fetch.stocks(id));
    });

    return () => {
      unsubscribe();
    };
  });

  function toStockReportFile(stock: StockReport) {
    return {
      code: stock.code,
      name: stock.name,
      sold: stock.sold,
      sale_price: stock.sale_price,
      creditcard: stock.total_payments['creditcard'] || 0,
      promptpay: stock.total_payments['promptpay'] || 0,
      total_price: stock.total_price,
    };
  }

  function handleDownload(e: CustomEvent) {
    overlay.close();
    const { filename, application } = e.detail;
    const data = source.map(toStockReportFile);
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
      bind:group={$filter.group}
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
      {#if $stocks.loading}
        <Loading {columns} />
      {:else if $stocks.error}
        <div>{$stocks.error}</div>
      {:else}
        <Body {columns} {source} />
        <Footer>
          <SummaryRow {columns} data={source} />
        </Footer>
      {/if}
    </Table>
  </Content>
</Card>

<Modal let:Body>
  <Body>
    <Export
      name={data.options.machines.find(m => m.value === $filter.machineId)?.label ?? '-'}
      report="stocks"
      from={$filter.from}
      to={$filter.to}
      group={$filter.group}
      on:download={handleDownload}
    />
  </Body>
</Modal>
