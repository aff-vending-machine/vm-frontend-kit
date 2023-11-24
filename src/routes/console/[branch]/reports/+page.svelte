<script lang="ts">
  import { onMount } from 'svelte';

  import Filter from './__components__/filter/Filter.svelte';
  import SummaryRow from './__components__/table/SummaryRow.svelte';
  import { bindFilter, filter } from './filter';
  import { reportColumns } from './table';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Table from '$components/elements/tables/Table.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';

  export let data;

  $: columns = reportColumns($t);

  function handleAction(e: CustomEvent) {
    const type = e.detail?.type || 'transactions';
    const { source } = e.detail;

    const params = new URLSearchParams($page.url.searchParams);
    params.set('id', source.id);

    goto(`/console/${$page.params.branch}/reports/${type}?${params.toString()}`);
  }

  onMount(() => {
    const unsubscribe = bindFilter();

    return () => {
      unsubscribe();
    };
  });
</script>

<Card let:Content let:Header>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
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
