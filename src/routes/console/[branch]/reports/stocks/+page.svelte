<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from './filter';
  import { regroupData, reportColumns } from './(__table__)/_table';
  import SummaryRow from './(__table__)/SummaryRow.svelte';
  import { t } from '$lib/i18n/translations';
  import Filter from './Filter.svelte';
  import Action from './Action.svelte';

  export let data;

  $: stocks =
    data.stocks?.sort((a, b) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }) || [];
  $: source = regroupData(stocks, $filter.group);
  $: columns = reportColumns($t);
  $: loading = !data.stocks && !data.error;

  onMount(filter.mutate);
</script>

<Card let:Content let:Header>
  <Content>
    <Header>Search Filter</Header>
    <Filter from={$filter.from} to={$filter.to} bind:group={$filter.group} />
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Body let:Footer>
      <Header {columns} />
      {#if loading}
        <Loading />
      {/if}
      {#if source}
        <Body {columns} {source} />
      {/if}
      {#if data.error}
        <div>{data.error.message}</div>
      {/if}
      <Footer>
        <SummaryRow {columns} data={source} />
      </Footer>
    </Table>
  </Content>
</Card>
