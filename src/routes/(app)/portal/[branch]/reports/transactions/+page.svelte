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
  const internal = new ReportState(action);
  const columns = $derived(reportColumns($t));
</script>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content row>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter {...action.filter} channelOptions={data.options.channel} machineOptions={data.options.machines} />
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
            <Body {columns} bind:source={internal.data} />
            <Footer>
              <SummaryRow {columns} data={internal.data} />
            </Footer>
          {/if}
        {/snippet}
      </Table>
    </Content>
  {/snippet}
</Card>
