<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { viewOptions } from '$lib/utils/options';
  import Button from '$components/elements/buttons/Button.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from './filter';
  import { columns } from './(__table__)/_table';

  export let data;

  onMount(filter.mutate);

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
    <div class="mx-2 flex flex-col sm:flex-row sm:space-x-2">
      <ShareFilterSelection key="limit" label="view" options={viewOptions} value={$filter.limit} />
      <div class="flex-1" />
      <Button class="">Create Product</Button>
    </div>
  </Content>
  <Content>
    <Table let:Header let:Footer let:Body>
      <Header {columns} />
      {#if data.groups}
        <Body {columns} source={data.groups} on:select={handleSelect} />
      {:else if !data.error}
        <div>Loading</div>
      {/if}
      <Footer>
        <SharePagination limit={$filter.limit} colspan={columns.length} count={data.count} />
      </Footer>

      {#if data.error}
        <div>{data.error.message}</div>
      {/if}
    </Table>
  </Content>
</Card>
