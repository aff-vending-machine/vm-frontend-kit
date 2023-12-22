<script lang="ts">
  import { onMount } from 'svelte';

  import Export from '../(components)/modal/Export.svelte';

  import Action from './(components)/filter/Action.svelte';
  import Filter from './(components)/filter/Filter.svelte';
  import SummaryRow from './(components)/table/SummaryRow.svelte';
  import { bindFilter, filter } from './filter';
  import { regroupData, reportColumns } from './table';

  import Table from '$lib/components/elements/tables/Table.svelte';
  import Modal from '$lib/components/overlays/modals/Modal.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import overlay from '$lib/stores/overlay';
  import useSWR from '$lib/stores/useSWR';
  import { exportCSV, exportXlsx } from '$lib/utils/export';
  import type { StockReport } from '$lib/types/report';

  export let data;
  let stocks = useSWR<StockReport[]>();

  $: columns = reportColumns($t);
  $: source = regroupData($stocks.data || [], $filter.group);

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
    <Header>{$t('common.search-filter')}</Header>
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
