<script lang="ts">
  import { onMount } from 'svelte';
  import type { CatalogProduct } from '$types/catalog_product';
  import drawer from '$lib/stores/drawer';
  import { viewOptions } from '$lib/utils/options';
  import Button from '$components/elements/buttons/Button.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from './filter';
  import { columns } from './(__table__)/_table';

  export let data;

  onMount(filter.mutate);

  let selectedProduct: CatalogProduct;

  function handleAction(e: CustomEvent) {
    const { value } = e.detail;
    selectedProduct = value;
    drawer.open();
  }
</script>

<Card let:Content>
  <Content>
    <h3 class="mb-2 font-semibold">Filter</h3>
    <div class="mx-2 flex flex-col sm:flex-row sm:space-x-2">
      <ShareFilterSelection key="limit" label="view" options={viewOptions} value={$filter.limit} />
      <ShareFilterSelection
        key="group_id"
        label="Group"
        placeholder="All Groups"
        unselected={0}
        options={data.options?.groups}
        value={$filter.group_id}
      />
      <div class="flex-1" />
      <Button class="">Create Product</Button>
    </div>
  </Content>
  <Content>
    <Table let:Header let:Footer let:Body>
      <Header {columns} />
      {#if data.products}
        <Body {columns} source={data.products} on:select={handleAction} />
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

<Drawer let:Header let:Footer let:Body>
  <Header title={selectedProduct.name} subtitle={selectedProduct.description} />
  <Body></Body>
  <Footer />
</Drawer>
