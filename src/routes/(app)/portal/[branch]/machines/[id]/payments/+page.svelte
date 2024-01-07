<script lang="ts">
  import { columns } from './table';
  import { PaymentState } from './state.svelte';

  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { Filter, Command, ActionState } from '$lib/components/ui/payment/actions';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';

  let { data } = $props();

  const action = new ActionState(data.machineID, data.query);
  const internal = new PaymentState(action);
</script>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content row>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter perPage={action.filter.perPage} />
      </Block>
      <Block>
        <Header>{$t('common.search-command')}</Header>
        <Command onsync={internal.onSync} />
      </Block>
    </Content>
    <Content>
      <Table>
        {#snippet children({ Header, Body, Footer, Loading })}
          <Header {columns} />
          {#if internal.loading}
            <Loading {columns} />
          {/if}

          {#if internal.error}
            <div>{internal.error}</div>
          {/if}

          {#if internal.ready}
            <Body {columns} bind:source={internal.data} onaction={internal.onAction} />
            <Footer>
              <SharePaginationTable {...internal.pagination} colspan={columns.length} />
            </Footer>
          {/if}
        {/snippet}
      </Table>
    </Content>
  {/snippet}
</Card>
