<script lang="ts">
  import { onMount } from 'svelte';

  import Drawer from './__components__/drawer/Container.svelte';
  import Action from './__components__/filter/Action.svelte';
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
    <Filter limit={$filter.limit} groupId={$filter.groupId} groupOptions={data.options.groups} />
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />
      {#await data.fetch.products()}
        <Loading {columns} />
      {:then source}
        <Body {columns} {source} on:select={handle.action} />
        <Footer>
          <SharePagination limit={$filter.limit} page={$filter.page} colspan={columns.length} count={data.count} />
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
