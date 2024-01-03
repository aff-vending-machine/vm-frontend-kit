<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { ActionState, Filter } from '$lib/components/ui/reports/summary/actions';
  import { SummaryRow } from '$lib/components/ui/reports/summary/tables';
  import { ReportState } from './state.svelte';
  import { reportColumns } from './table';

  let { data } = $props();

  const action = new ActionState(data.branchID, data.query);
  const state = new ReportState(action);
  const columns = $derived(reportColumns($t));
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>{$t('common.search-filter')}</Header>
      <Filter from={action.filter.from} to={action.filter.to} />
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
            <Body {columns} bind:source={state.data} onselect={state.onSelect} />
            <Footer>
              <SummaryRow {columns} data={state.data} />
            </Footer>
          {/if}
        {/snippet}
      </Table>
    </Content>
  {/snippet}
</Card>
