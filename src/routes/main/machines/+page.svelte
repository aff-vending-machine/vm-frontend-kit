<script lang="ts">
  import { onDestroy } from 'svelte';
  import { filters, updateURL } from './@filters';
  import FilterBar from './FilterBar.svelte';
  import { viewOptions } from '$lib/utils/options';
  import Table from '$components/elements/tables/Table.svelte';
  import { machineColumns } from './@table';
  import type { MediaType } from '$components/elements/tables/@table';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import drawer from '$lib/stores/drawer';
  import type { Machine } from '$lib/services/machine';
  import Info from './(drawer)/Info.svelte';
  import Command from './(drawer)/Link.svelte';

  export let data;
  let size: number;
  let selectedData: Machine;

  $: columns = machineColumns.filter(c => mediaQuery(size, c.responsive));

  function mediaQuery(size: number, r?: MediaType) {
    switch (r) {
      case 'mobile':
        return size <= 480;
      case 'tablet':
        return size > 480;
      case 'desktop':
        return size > 1024;
      case 'all':
      default:
        return true;
    }
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    selectedData = data;
    drawer.open();
  }

  const unsubscribe = filters.subscribe(updateURL);
  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:window bind:innerWidth={size} />

<div class="md 2 flex h-screen flex-col overflow-hidden rounded-lg bg-white">
  <FilterBar bind:filters={$filters} options={{ branches: data.options.branches, views: viewOptions }} />
  <Table let:Header let:Body let:Footer let:Loading>
    {#await data.machines}
      <Loading />
    {:then source}
      <Header {columns} />
      <Body {columns} {source} on:select={handleSelect} />
      <Footer>
        <tr class="bg-gray-50">
          <td class="px-6 py-4" colspan={columns.length}>
            <!-- <Pagination
              page={$filters.page}
              itemsPerPage={$filters.limit}
              totalItems={$state.count}
              on:page-change={handlePageChange}
            /> -->
          </td>
        </tr>
      </Footer>
    {:catch error}
      <p class="text-red-500">{error.message}</p>
    {/await}
  </Table>
</div>

<Drawer let:Header let:Body let:Footer>
  <Header title={selectedData.location} subtitle={selectedData.name} />
  <Body>
    <Info machine={selectedData} />
    <Command machine={selectedData} />
  </Body>
  <Footer />
</Drawer>
