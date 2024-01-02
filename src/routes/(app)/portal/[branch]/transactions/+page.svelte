<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';

  import { columns } from './table';
  import { ActionState, Command, Filter } from '$lib/components/ui/transaction/actions';
  import { TransactionState } from './state.svelte';
  import { Modal, Drawer, OverlayState } from '$lib/components/ui/transaction/overlays';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';

  let { data } = $props();

  const action = new ActionState(data.query);
  const overlay = new OverlayState();
  const state = new TransactionState(action, overlay);
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>{$t('common.search-filter')}</Header>
      <Filter perPage={action.data.perPage} />
    </Content>
    <Content>
      <Header>{$t('common.search-action')}</Header>
      <Command onsync={state.onSync} />
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
            <Body {columns} bind:source={state.data} onaction={state.onAction} onselect={state.onSelect} />
            <Footer>
              <SharePaginationTable {...state.pagination} colspan={columns.length} />
            </Footer>
          {/if}
        {/snippet}
      </Table>
    </Content>
  {/snippet}
</Card>

{#if overlay.mode.display === 'drawer'}
  <Drawer title={overlay.data?.merchant_order_id} mode={overlay.mode.view} onclose={overlay.onCancel}>
    {#snippet children({ Viewer })}
      <Viewer transaction={overlay.data} oncancel={overlay.onCancel} />
    {/snippet}
  </Drawer>
{/if}
