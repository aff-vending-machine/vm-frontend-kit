<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Card from '$components/sections/cards/Card.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { bindFilter, filter } from './filter';
  import { columns } from './(__table__)/_table';
  import Filter from './Filter.svelte';
  import Action from './Action.svelte';

  export let data;

  onMount(() => {
    const unsubscribe = bindFilter(data.count);

    return () => {
      unsubscribe();
    };
  });

  function handleSelect(e: CustomEvent) {
    const { value } = e.detail;
    const params = new URLSearchParams($page.url.searchParams);
    params.set('group_id', value.id);

    goto(`/console/${$page.params.branch}/products?${params.toString()}`);
  }
</script>

<Card let:Content>
  <Content>
    <h3 class="mb-2 font-semibold">Filter</h3>
    <Filter limit={$filter.limit} />
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />{#await data.fetch.groups()}
        <Loading {columns} />
      {:then source}
        <Body {columns} {source} on:select={handleSelect} />
        <Footer>
          <SharePagination limit={$filter.limit} page={$filter.page} colspan={columns.length} count={data.count} />
        </Footer>
      {/await}

      {#if data.error}
        <div>{data.error.message}</div>
      {/if}
    </Table>
  </Content>
</Card>
