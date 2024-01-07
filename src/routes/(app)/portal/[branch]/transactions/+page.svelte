<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';

  import { columns } from './table';
  import { ActionState, Filter } from '$lib/components/ui/transaction/actions';
  import { TransactionState } from './state.svelte';
  import { Alert, Drawer, OverlayState } from '$lib/components/ui/transaction/overlays';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';
  import Button from '$lib/components/elements/buttons/Button.svelte';

  let { data } = $props();

  const machineIDs = data.options.machine.map(o => o.data.id);
  const action = new ActionState(data.branchID, data.query);
  const overlay = new OverlayState();
  const internal = new TransactionState(machineIDs, action, overlay);
</script>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter {...action.filter} machineOptions={data.options.machine} channelOptions={data.options.channel} />
        <Button color="accent" loading={internal.loading} onclick={internal.onPull}>Sync</Button>
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
            <Body {columns} bind:source={internal.data} onaction={internal.onAction} onselect={internal.onSelect} />
            <Footer>
              <SharePaginationTable {...internal.pagination} colspan={columns.length} />
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
      <Viewer transaction={overlay.data} />
    {/snippet}
  </Drawer>
{/if}

{#if overlay.mode.display === 'alert'}
  <Alert
    mode={overlay.mode.view}
    transaction={overlay.data}
    ondone={internal.onDone}
    oncancel={internal.onCancel}
    onclose={overlay.onCancel}
  />
{/if}
