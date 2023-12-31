<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import Command from '$lib/components/ui/product/actions/command.svelte';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';

  import { columns } from './table';
  import { ActionState, Filter } from '$lib/components/ui/product/actions';
  import { Alert, Drawer, OverlayState } from '$lib/components/ui/product/overlays';
  import { ProductState } from './state.svelte';

  let { data } = $props();

  const action = new ActionState(data.query);
  const overlay = new OverlayState();
  const state = new ProductState(action, overlay);
</script>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content row>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter perPage={action.filter.perPage} groupId={action.filter.groupID} groupOptions={data.options.groups} />
      </Block>
      <Block>
        <Header>{$t('common.search-command')}</Header>
        <Command oncreate={overlay.onOpenCreator} />
      </Block>
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
    title={overlay.data?.name ?? 'New Product'}
    subtitle={overlay.data?.sku ?? '-'}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ Viewer, Editor })}
      {#if overlay.data}
        <Viewer
          product={overlay.data}
          onedit={overlay.onOpenEditor}
          ondelete={overlay.onOpenEraser}
          oncancel={overlay.onCancel}
        />
      {/if}
      <Editor
        product={overlay.data}
        groupOptions={data.options.groups}
        oncreate={state.onCreate}
        onupdate={state.onUpdate}
        oncancel={overlay.onCancel}
      />
    {/snippet}
  </Drawer>
{/if}

{#if overlay.mode.display === 'alert' && overlay.data}
  <Alert mode={overlay.mode.view} product={overlay.data} ondelete={state.onDelete} onclose={overlay.onCancel} />
{/if}
