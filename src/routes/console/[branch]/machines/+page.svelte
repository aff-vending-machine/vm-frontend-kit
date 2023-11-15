<script lang="ts">
  import { onMount } from 'svelte';
  import type { Machine } from '$types/machine';
  import drawer from '$lib/stores/overlay';
  import { viewOptions } from '$lib/utils/options';
  import Card from '$components/sections/cards/Card.svelte';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from './filter';
  import { columns } from './(__table__)/_table';

  export let data;

  let selectedMachine: Machine;

  function handleAction(e: CustomEvent) {
    const { data } = e.detail;
    selectedMachine = data;
    drawer.open();
  }

  onMount(filter.mutate);
</script>

<Card let:Content>
  <Content>
    <h3 class="mb-2 font-semibold">Filter</h3>
    <div class="mx-2 flex flex-col lg:flex-row">
      <ShareFilterSelection key="limit" label="view" options={viewOptions} value={$filter.limit} />
    </div>
  </Content>
  <div class="mt-4 border-b" />
  <Content>
    <Table let:Header let:Footer let:Body>
      <Header {columns} />
      {#if data.machines}
        <Body {columns} source={data.machines} on:select={handleAction} />
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
  <Header title={selectedMachine.name} subtitle={selectedMachine.location} />
  <Body></Body>
  <Footer />
</Drawer>
