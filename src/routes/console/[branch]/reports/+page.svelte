<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from './filter';
  import { reportColumns } from './(__table__)/_table';
  import { t } from '$lib/i18n/translations';
  import Filter from './Filter.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SummaryRow from './(__table__)/SummaryRow.svelte';

  export let data;

  onMount(filter.mutate);

  function handleAction(e: CustomEvent) {
    const type = e.detail?.type || 'transactions';
    const { source } = e.detail;

    const params = new URLSearchParams($page.url.searchParams);
    params.set('id', source.id);

    goto(`/console/${$page.params.branch}/reports/${type}?${params.toString()}`);
  }

  $: columns = reportColumns($t);
</script>

<Card let:Content let:Header>
  <Content>
    <Header>Search Filter</Header>
    <Filter from={$filter.from} to={$filter.to} />
  </Content>
  <Content>
    <Table let:Header let:Footer let:Body let:Loading>
      <Header {columns} />
      {#await data.summary}
        <Loading {columns} />
      {:then summary}
        <Body {columns} source={summary} on:select={handleAction} />
        <Footer>
          <SummaryRow {columns} data={summary} />
        </Footer>
      {:catch error}
        <div>{error.message}</div>
      {/await}
    </Table>
  </Content>
</Card>
