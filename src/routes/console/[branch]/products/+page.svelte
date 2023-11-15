<script lang="ts">
  import { onMount } from 'svelte';
  import type { CatalogProduct } from '$types/catalog_product';
  import drawer from '$lib/stores/overlay';
  import Card from '$components/sections/cards/Card.svelte';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter, bindFilter } from './filter';
  import { columns } from './(__table__)/_table';
  import Filter from './Filter.svelte';
  import Action from './Action.svelte';

  export let data;

  let selectedProduct: CatalogProduct;

  function handleAction(e: CustomEvent) {
    const { value } = e.detail;
    selectedProduct = value;
    drawer.open();
  }

  onMount(() => {
    const unsubscribe = bindFilter(data.count);

    return () => {
      unsubscribe();
    };
  });
</script>

<Card let:Content>
  <Content>
    <h3 class="mb-2 font-semibold">Filter</h3>
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
        <Body {columns} {source} on:select={handleAction} />
        <Footer>
          <SharePagination limit={$filter.limit} page={$filter.page} colspan={columns.length} count={data.count} />
        </Footer>
      {/await}
    </Table>
  </Content>
</Card>

<Drawer let:Header let:Footer let:Body>
  <Header title={selectedProduct.name} subtitle={selectedProduct.description} />
  <Body></Body>
  <Footer />
</Drawer>
