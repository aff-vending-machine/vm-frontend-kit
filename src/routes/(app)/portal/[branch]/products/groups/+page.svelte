<script lang="ts">
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';
  import { ActionState, Command, Filter } from '$lib/components/ui/group/actions';
  import { Alert, Drawer, OverlayState } from '$lib/components/ui/group/overlays';
  import { t } from '$lib/i18n/translations';
  import { GroupState } from './state.svelte';

  import { columns } from './table';

  let { data } = $props();

  const action = new ActionState(data.query);
  const overlay = new OverlayState();
  const state = new GroupState(action, overlay);
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>{$t('common.search-filter')}</Header>
      <Filter perPage={action.filter.perPage} />
    </Content>
    <Content>
      <Command oncreate={overlay.onOpenCreator} />
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
  <Drawer
    title={overlay.data?.name}
    subtitle={overlay.data?.description}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ Viewer, Editor })}
      <Viewer
        group={overlay.data}
        onedit={overlay.onOpenEditor}
        ondelete={overlay.onOpenEraser}
        oncancel={overlay.onCancel}
      />
      <Editor group={overlay.data} onupdate={state.onUpdate} oncancel={overlay.onCancel} />
    {/snippet}
  </Drawer>
{/if}

{#if overlay.mode.display === 'alert'}
  <Alert mode={overlay.mode.view} group={overlay.data} ondelete={state.onDelete} onclose={overlay.onCancel} />
{/if}
