<script lang="ts">
  import { onMount } from 'svelte';

  import { columns } from './(__table__)/_table';
  import { bindFilter, filter } from './filter';
  import Filter from './Filter.svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Table from '$components/elements/tables/Table.svelte';
  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import SharePagination from '$components/shares/SharePagination.svelte';
  import drawer from '$lib/stores/overlay';
  import type { Machine } from '$types/machine';

  export let data;

  let selectedMachine: Machine;

  onMount(() => {
    const unsubscribe = bindFilter(data.count);

    return () => {
      unsubscribe();
    };
  });

  function handleAction(e: CustomEvent) {
    const { data } = e.detail;
    selectedMachine = data;
    console.log(data);
    drawer.open();
  }

  function handleSelect(e: CustomEvent) {
    const { value } = e.detail;
    const params = new URLSearchParams();
    params.set('machine_id', value.id.toString());

    goto(`/console/${$page.params.branch}/machines/slots?${params.toString()}`);
  }
</script>

<Card let:Header let:Content>
  <Content>
    <Header>Search Filter</Header>
    <Filter limit={$filter.limit} />
  </Content>
  <div class="mt-4 border-b" />
  <Content>
    <Table let:Loading let:Header let:Footer let:Body>
      <Header {columns} />
      {#await data.fetch.machines()}
        <Loading {columns} />
      {:then source}
        <Body {columns} {source} on:action={handleAction} on:select={handleSelect} />
        <Footer>
          <SharePagination limit={$filter.limit} page={$filter.page} colspan={columns.length} count={data.count} />
        </Footer>
      {/await}
    </Table>
  </Content>
</Card>

<Drawer let:Header let:Footer let:Body>
  <Header title={selectedMachine.name} subtitle={selectedMachine.location} />
  <Body></Body>
  <Footer />
</Drawer>
