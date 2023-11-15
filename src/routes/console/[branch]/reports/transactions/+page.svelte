<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from '../transactions/filter';
  import { reportColumns } from './(__table__)/table';
  import { t } from '$lib/i18n/translations';
  import Filter from './Filter.svelte';
  import Action from './Action.svelte';

  export let data;

  $: columns = reportColumns($t);

  onMount(filter.mutate);
</script>

<Card let:Content let:Header>
  <Content>
    <Header>Search Filter</Header>
    {#await data.options.channel}
      <div>loading</div>
    {:then options}
      <Filter from={$filter.from} to={$filter.to} channel_id={$filter.channel_id} channelOptions={options} />
    {/await}
  </Content>
  <Content>
    <Action />
  </Content>
  <Content>
    <Table let:Loading let:Header let:Body let:Footer>
      <Header {columns} />
      {#await data.fetch.transactions()}
        <Loading {columns} />
      {:then source}
        <Body {columns} {source} />
      {:catch error}
        <div>{error.message}</div>
      {/await}
      <Footer>
        <!-- <SummaryRow {columns} data={source} /> -->
      </Footer>
    </Table>
  </Content>
</Card>
