<script lang="ts">
  import { page } from '$app/stores';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import SharePagination from '$lib/components/shares/SharePagination.svelte';

  import Action from './(components)/filter/Action.svelte';
  import Filter from './(components)/filter/Filter.svelte';
  import { call, handle } from './event.svelte';
  import { columns } from './table';

  let { data } = $props();
  let searchParams = $state($page.url.searchParams);
  let query = $derived(new URLSearchParams(searchParams));
  let filter = $derived({
    page: parseInt(query.get('page') ?? '1'),
    per_page: parseInt(query.get('per_page') ?? '10'),
  });
</script>

<Card let:Content>
  <Content>
    <h3 class="mb-2 font-semibold">Filter</h3>
    <Filter perPage={filter.per_page} />
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />
      {#await call.groups(query)}
        <Loading {columns} />
      {:then response}
        <Body {columns} source={response.data} on:select={handle.select} />
        <Footer>
          <SharePagination {...response.pagination!} colspan={columns.length} />
        </Footer>
      {/await}
    </Table>
  </Content>
</Card>
