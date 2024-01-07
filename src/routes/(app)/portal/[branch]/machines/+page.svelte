<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { Filter, ActionState } from '$lib/components/ui/machine/actions';
  import { Alert, Drawer, OverlayState } from '$lib/components/ui/machine/overlays';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';
  import { Board } from '$lib/components/ui/machine/boards';
  import { columns } from './table';
  import { MachineState } from './state.svelte';

  let { data } = $props();

  const action = new ActionState(data.branchID, data.query);
  const overlay = new OverlayState();
  const state = new MachineState(action, overlay);
</script>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter perPage={action.filter.perPage} table={action.filter.table} />
      </Block>
    </Content>

    <Content>
      {#if action.filter.table}
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
      {:else}
        <Board>
          {#snippet children({ Loading, Data, Pagination })}
            {#if state.loading}
              <Loading />
            {/if}

            {#if state.error}
              <div>{state.error}</div>
            {/if}

            {#if state.ready}
              <Data bind:source={state.data} onselect={state.onSelect} />
              <Pagination {...state.pagination} />
            {/if}
          {/snippet}
        </Board>
      {/if}
    </Content>
  {/snippet}
</Card>

{#if overlay.mode.display === 'drawer'}
  <Drawer
    title={overlay.data?.name}
    subtitle={overlay.data?.location}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ Viewer, Editor })}
      <Viewer
        machine={overlay.data}
        onedit={overlay.onOpenEditor}
        ondelete={overlay.onOpenEraser}
        oncancel={overlay.onCancel}
      />
      <Editor
        machine={overlay.data}
        branchOptions={data.options.branch}
        onupdate={state.onUpdate}
        oncancel={overlay.onCancel}
      />
    {/snippet}
  </Drawer>
{/if}

{#if overlay.mode.display === 'alert'}
  <Alert mode={overlay.mode.view} machine={overlay.data} ondelete={state.onDelete} onclose={overlay.onCancel} />
{/if}
