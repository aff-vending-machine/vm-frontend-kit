<script lang="ts">
  import { reportColumns } from './table';

  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import { ReportState } from './state.svelte';
  import { ActionState } from '$lib/components/ui/reports/stock/actions/state.svelte';
  import { Filter } from '$lib/components/ui/reports/stock/actions';
  import SummaryRow from '$lib/components/ui/reports/stock/tables/summary-row.svelte';
  import Command from '$lib/components/ui/reports/stock/actions/command.svelte';

  let { data } = $props();

  const action = new ActionState(data.branchID, data.query);
  const internal = new ReportState(action);
  const columns = $derived(reportColumns($t));
</script>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content row>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter
          {...action.filter}
          group={action.filter.group}
          onchange={action.onGroupChange}
          machineOptions={data.options.machines}
        />
      </Block>
      <Block>
        <Header>{$t('common.search-command')}</Header>
        <Command onexport={internal.onDownload} />
      </Block>
    </Content>
    <Content>
      <Table>
        {#snippet children({ Header, Body, Footer, Loading })}
          <Header {columns} />
          {#if internal.loading}
            <Loading {columns} />
          {/if}

          {#if internal.error}
            <div>{internal.error}</div>
          {/if}

          {#if internal.ready}
            <Body {columns} source={internal.data} />
            <Footer>
              <SummaryRow {columns} data={internal.data} />
            </Footer>
          {/if}
        {/snippet}
      </Table>
    </Content>
  {/snippet}
</Card>

<!-- <Modal let:Body>
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
</Modal> -->
