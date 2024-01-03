<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { reportColumns } from './table';
  import { ActionState } from '$lib/components/ui/reports/transaction/actions/state.svelte';
  import { ReportState } from './state.svelte';
  import SummaryRow from '$lib/components/ui/reports/transaction/tables/summary-row.svelte';
  import Command from '$lib/components/ui/reports/transaction/actions/command.svelte';
  import { Filter } from '$lib/components/ui/reports/transaction/actions';

  let { data } = $props();

  const action = new ActionState(data.branchID, data.query);
  const state = new ReportState(action);
  const columns = $derived(reportColumns($t));
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>{$t('common.search-filter')}</Header>
      <Filter
        from={action.filter.from}
        to={action.filter.to}
        channelID={action.filter.channelID}
        channelOptions={data.options.channel}
        machineID={action.filter.machineID}
        machineOptions={data.options.machines}
      />
    </Content>
    <Content>
      <Command />
    </Content>
    <Content>
      <Table>
        {#snippet children({ Header, Body, Footer, Loading })}
          <Header {columns} />
          {#if state.loading}
            <Loading {columns} />
          {/if}

          {#if state.error}
            <div>{state.error}</div>
          {/if}

          {#if state.ready}
            <Body {columns} bind:source={state.data} />
            <Footer>
              <SummaryRow {columns} data={state.data} />
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
      name={data.options.machines.find(m => m.value === filter.machineId)?.label ?? ''}
      report="transactions"
      from={filter.from}
      to={filter.to}
      on:download={handleDownload}
    />
  </Body>
</Modal> -->
