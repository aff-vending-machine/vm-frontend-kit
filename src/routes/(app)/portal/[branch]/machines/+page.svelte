<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import SharePagination from '$lib/components/shares/SharePagination.svelte';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { Filter, ActionState } from '$lib/components/ui/machine/actions';
  import { Alert, Drawer, OverlayState } from '$lib/components/ui/machine/overlays';

  import { columns } from './table';
  import { MachineState } from './state.svelte';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';
  import type { MachineEntity } from '$lib/types/machine';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';

  let { data } = $props();

  const action = new ActionState(data.branchID, data.query);
  const overlay = new OverlayState();
  const state = new MachineState(action, overlay);

  function onMachineClick(data: MachineEntity) {
    return (e: MouseEvent) => {
      e.stopPropagation();

      if (e.target === e.currentTarget) {
        e.preventDefault();
        state.onSelect(data);
      }
    };
  }

  function getColorStatus(status: string) {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'maintainance':
        return 'bg-warning';
      case 'offline':
        return 'bg-neutral';
    }
  }
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>{$t('common.search-filter')}</Header>
      <Filter perPage={action.filter.perPage} table={action.filter.table} />
    </Content>

    <Content>
      {#if action.filter.table}
        <Table>
          {#snippet children({ Header, Body, Footer, Loading })}
            <Header {columns} />
            {#if state.loading}
              <Loading {columns} />
            {/if}

            {#if state.error}
              <div>{state.error}</div>
            {/if}

            {#if state.ready}
              <Body {columns} bind:source={state.data} onaction={state.onAction} onselect={state.onSelect} />
              <Footer>
                <SharePaginationTable {...state.pagination} colspan={columns.length} />
              </Footer>
            {/if}
          {/snippet}
        </Table>
      {:else}
        <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {#each state.data as machine (machine.id)}
            <button
              class="relative justify-center space-y-4 rounded border border-neutral-lightest bg-neutral-lightest p-4 hover:bg-primary-lightest hover:shadow-md"
              onclick={onMachineClick(machine)}
            >
              <div class="absolute right-2 top-2">
                <div class="h-4 w-4 rounded-full {getColorStatus(machine.status)} group hover:w-auto">
                  <span class="hidden px-2 text-xs text-white transition-all group-hover:block">{machine.status}</span>
                </div>
              </div>
              <div class="text-center">
                <h3>{machine.name}</h3>
                <div class="flex flex-col">
                  <span class="text-sm">{machine.branch.name}</span>
                  <span class="text-sm">{machine.serial_number}</span>
                  <span class="text-sm">{machine.location}</span>
                </div>
              </div>
              <div class="flex space-x-4">
                <ButtonLink href="machines/{machine.id}/slots" color="secondary" class="flex-1">Slot</ButtonLink>
                <ButtonLink href="machines/{machine.id}/payments" color="secondary" class="flex-1">Payment</ButtonLink>
              </div>
            </button>
          {/each}
        </div>
        <div class="mt-4 border-t border-neutral-light">
          <SharePagination {...state.pagination} />
        </div>
      {/if}
    </Content>
  {/snippet}
</Card>

{#if overlay.mode.display === 'drawer'}
  <Drawer
    title={overlay.data.name}
    subtitle={overlay.data.location}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ Viewer, Editor })}
      <Viewer
        machine={overlay.data}
        onedit={overlay.onOpenEditor}
        ondelete={overlay.onOpenEraser}
        oncancel={overlay.onCancel}
      />
      <Editor
        machine={overlay.data}
        branchOptions={data.options.branches}
        onupdate={state.onUpdate}
        oncancel={overlay.onCancel}
      />
    {/snippet}
  </Drawer>
{/if}

{#if overlay.mode.display === 'alert'}
  <Alert mode={overlay.mode.view} machine={overlay.data} ondelete={state.onDelete} onclose={overlay.onCancel} />
{/if}
