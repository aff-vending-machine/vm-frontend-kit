<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import SharePagination from '$lib/components/shares/SharePagination.svelte';

  import Drawer from './(components)/drawer/Container.svelte';
  import Action from './(components)/filter/Action.svelte';
  import Filter from './(components)/filter/Filter.svelte';
  import { call, handle } from './event.svelte';
  import { columns } from './table';
  import { selector } from './store';

  let { data } = $props();
  let searchParams = $state($page.url.searchParams);
  let query = $derived(new URLSearchParams(searchParams));
  let filter = $derived({
    page: parseInt(query.get('page') ?? '1'),
    per_page: parseInt(query.get('per_page') ?? '10'),
    groupId: parseInt(query.get('group_id') ?? '0'),
  });
</script>

<Card let:Header let:Content>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <Filter perPage={filter.per_page} groupId={filter.groupId} groupOptions={data.options.groups} />
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />
      {#await call.products(filter.groupId, query)}
        <Loading {columns} />
      {:then response}
        <Body {columns} source={response.data} on:select={handle.action} />
        <Footer>
          <SharePagination {...response.pagination!} colspan={columns.length} />
        </Footer>
      {/await}
    </Table>
  </Content>
</Card>

{#await selector.call($selector) then { mode, value }}
  <Drawer let:Viewer let:Creator let:Editor let:Eraser title={value.name} subtitle={value.group.description}>
    {#if mode === 'view'}
      <Viewer product={value} on:edit={handle.action} on:delete={handle.action} on:cancel={handle.close} />
    {:else if mode === 'create'}
      <Creator groupOptions={data.options.groups} on:update={handle.update} on:cancel={handle.close} />
    {:else if mode === 'edit'}
      <Editor product={value} groupOptions={data.options.groups} on:update={handle.update} on:cancel={handle.close} />
    {:else if mode === 'delete'}
      <Eraser product={value} on:delete={handle.delete} on:cancel={handle.close} />
    {/if}
  </Drawer>
{:catch}
  <div class="hidden" />
{/await}
