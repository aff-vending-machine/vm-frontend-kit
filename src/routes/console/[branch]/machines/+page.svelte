<script lang="ts">
  import Table from '$components/elements/tables/Table.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import type { Machine } from '$lib/services/machine';
  import drawer from '$lib/stores/drawer';
  import Filters from './(__filters__)/Filters.svelte';
  import { columns } from './(__table__)/_table';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';

  export let data;

  let selectedMachine: Machine;

  function handleAction(e: CustomEvent) {
    const { data } = e.detail;
    selectedMachine = data;
    drawer.open();
  }
</script>

<Card let:Content>
  <Content>
    <h3 class="mb-2 font-semibold">Filter</h3>
    <Filters />
  </Content>
  <div class="mt-4 border-b" />
  <Content>
    <Table let:Header let:Footer let:Body>
      <Header {columns} />
      {#if data.machines}
        <Body {columns} source={data.machines} on:select={handleAction} />
      {/if}
      <Footer />

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
