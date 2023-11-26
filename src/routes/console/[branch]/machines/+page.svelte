<script lang="ts">
  import { onMount } from 'svelte';

  import Drawer from './__components__/drawer/Container.svelte';
  import Filter from './__components__/filter/Filter.svelte';
  import { bindFilter } from './filter';
  import { handle } from './handle';
  import { filter, selector } from './store';
  import { columns } from './table';

  import Table from '$components/elements/tables/Table.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import { t } from '$lib/i18n/translations';

  export let data;

  onMount(() => {
    const unsubscribe = bindFilter(data.count);

    return () => {
      unsubscribe();
    };
  });
</script>

<Card let:Header let:Content>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <Filter limit={$filter.limit} />
  </Content>
  <div class="mt-4 border-b" />
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />
      {#await data.fetch.machines()}
        <Loading {columns} />
      {:then source}
        <Body {columns} {source} on:action={handle.action} on:select={handle.select} />
        <Footer>
          <SharePagination limit={$filter.limit} page={$filter.page} colspan={columns.length} count={data.count} />
        </Footer>
      {/await}
    </Table>
  </Content>
</Card>

{#await selector.call($selector) then { mode, value }}
  <Drawer let:Viewer let:Editor let:Eraser title={value.name} subtitle={value.location}>
    {#if mode === 'view'}
      <Viewer machine={value} on:edit={handle.action} on:delete={handle.action} on:cancel={handle.close} />
    {:else if mode === 'edit'}
      <Editor
        machine={value}
        on:update={handle.update}
        on:cancel={handle.close}
        branchOptions={data.options.branches}
      />
    {:else if mode === 'delete'}
      <Eraser machine={value} on:delete={handle.delete} on:cancel={handle.close} />
    {/if}
  </Drawer>
{:catch}
  <div class="hidden" />
{/await}
