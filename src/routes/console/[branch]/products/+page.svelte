<script lang="ts">
  import { onMount } from 'svelte';

  import { columns } from './(__table__)/_table';
  import Action from './Action.svelte';
  import { filter, bindFilter } from './filter';
  import Filter from './Filter.svelte';

  import Table from '$components/elements/tables/Table.svelte';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import drawer from '$lib/stores/overlay';
  import type { CatalogProduct } from '$types/catalog_product';

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

<Card let:Header let:Content>
  <Content>
    <Header>Search Filter</Header>
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
