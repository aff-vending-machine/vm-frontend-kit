<script lang="ts">
  import Drawer from './(components)/drawer/Container.svelte';
  import Filter from './(components)/filter/Filter.svelte';
  import { handle, call } from './event.svelte';
  import { columns } from './table';

  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import SharePagination from '$lib/components/shares/SharePagination.svelte';
  import { t } from '$lib/i18n/translations';
  import { page } from '$app/stores';
  import { selector } from './store';

  let { data } = $props();
  let query = $derived(new URLSearchParams($page.url.searchParams));
  let filter = $derived({
    page: parseInt(query.get('page') ?? '1'),
    per_page: parseInt(query.get('per_page') ?? '10'),
  });
</script>

<Card let:Header let:Content>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <Filter perPage={filter.per_page} />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />
      {#await call.machines(data.branchID, query)}
        <Loading {columns} />
      {:then response}
        <Body {columns} source={response.data} onaction={handle.action} onselect={handle.select} />
        <Footer>
          <SharePagination {...response.pagination!} colspan={columns.length} />
        </Footer>
      {:catch e}
        <div>{e?.message}</div>
      {/await}
    </Table>
  </Content>
</Card>

{#await selector.call($selector) then { mode, value }}
  <Drawer let:Viewer let:Editor let:Eraser title={value.name} subtitle={value.location}>
    {#if mode === 'view'}
      <Viewer machine={value} onedit={handle.action} ondelete={handle.action} oncancel={handle.close} />
    {:else if mode === 'edit'}
      <Editor machine={value} branchOptions={data.options.branches} onupdate={handle.update} oncancel={handle.close} />
    {:else if mode === 'delete'}
      <Eraser machine={value} ondelete={handle.delete} oncancel={handle.close} />
    {/if}
  </Drawer>
{:catch}
  <div class="hidden" />
{/await}
