<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import Table from '$components/elements/tables/Table.svelte';
  import { filter } from './filter';
  import { reportColumns } from './(__table__)/_table';
  import { t } from '$lib/i18n/translations';
  import Currency from '$components/elements/labels/Currency.svelte';
  import Filter from './Filter.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { filterColumns } from '$lib/utils/check';

  export let data;

  onMount(filter.mutate);

  function handleAction(e: CustomEvent) {
    const type = e.detail?.type || 'transactions';
    const { source } = e.detail;

    const params = new URLSearchParams($page.url.searchParams);
    params.set('id', source.id);

    goto(`/console/${$page.params.branch}/reports/${type}?${params.toString()}`);
  }

  $: loading = !data.summary && !data.error;
  $: columns = filterColumns(reportColumns($t));
  $: totalCreditCard = data.summary?.reduce((total, row) => total + row.total_payments['creditcard'], 0);
  $: totalPromptPay = data.summary?.reduce((total, row) => total + row.total_payments['promptpay'], 0);
  $: totalPayment = (totalCreditCard || 0) + (totalPromptPay || 0);
</script>

<Card let:Content let:Header>
  <Content>
    <Header>Search Filter</Header>
    <Filter from={$filter.from} to={$filter.to} />
  </Content>
  <Content>
    <Table let:Header let:Footer let:Body let:Loading>
      <Header {columns} />
      {#if loading}
        <Loading {columns} />
      {/if}
      {#if data.summary}
        <Body {columns} source={data.summary} on:select={handleAction} />
      {/if}
      {#if data.error}
        <div>{data.error.message}</div>
      {/if}
      <Footer>
        <tr>
          <td class="px-6 py-4" colspan={columns.length - 4}>{$t('report.total')}</td>
          <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
          <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
          <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
          <td />
        </tr>
      </Footer>
    </Table>
  </Content>
</Card>
