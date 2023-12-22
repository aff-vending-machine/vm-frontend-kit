<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/translations';
  import Filter from './(components)/filter/Filter.svelte';
  import SummaryRow from './(components)/table/SummaryRow.svelte';

  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { defaultForm, defaultTo } from '$lib/utils/generate';
  import { parseDate } from '$lib/utils/convert';
  import { call, handle } from './event.svelte';
  import { reportColumns } from './table';

  let { data } = $props();
  let searchParams = $state($page.url.searchParams);
  let query = $derived(new URLSearchParams(searchParams));
  let filter = $derived({
    from: parseDate(query.get('from'), defaultForm),
    to: parseDate(query.get('to'), defaultTo),
  });

  let columns = reportColumns($t);
</script>

<Card let:Content let:Header>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <Filter from={filter.from} to={filter.to} />
  </Content>
  <Content>
    <Table let:Header let:Footer let:Body let:Loading>
      <Header {columns} />
      {#await call.summary(data.branch_id, query)}
        <Loading {columns} />
      {:then response}
        <Body {columns} source={response.data} on:select={handle.action} />
        <Footer>
          <SummaryRow {columns} data={response.data || []} />
        </Footer>
      {:catch error}
        <div>{error.message}</div>
      {/await}
    </Table>
  </Content>
</Card>
