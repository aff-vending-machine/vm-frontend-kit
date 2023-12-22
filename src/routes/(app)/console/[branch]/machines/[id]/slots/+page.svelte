<script lang="ts">
  import { onMount } from 'svelte';

  import Drawer from './(components)/drawer/Container.svelte';
  import Command from './(components)/filter/Action.svelte';
  import FilterBar from './(components)/filter/Filter.svelte';
  import Help from './(components)/filter/Help.svelte';
  import SlotCard from './(components)/grid/SlotCard.svelte';
  import SlotEmpty from './(components)/grid/SlotEmpty.svelte';
  import { bindFilter } from './filter';
  import { handle } from './handle';
  import { machineState, slotsState, draft, selector, filter, actionState } from './store';
  import { utils } from './utils';

  import Card from '$lib/components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import { isMatched } from '$lib/utils/check';
  import { clone } from '$lib/utils/generate';

  let { data } = $props();

  let border = $derived(utils.findBorder($slotsState.data || []));
  let slots = $derived(utils.regroupData($draft, $filter, border));
  let loading = $derived($slotsState.loading || $actionState.loading);

  onMount(() => {
    const machineIds = data.options.machines.map((m: { value: any }) => m.value);
    const unsubscribe = bindFilter(machineIds, id => {
      if (!$machineState.data) {
        machineState.mutate(() => data.fetch.machine(id));
        slotsState.mutate(() => data.fetch.slots(id));
      }
      return Promise.resolve();
    });
    const unsubscribeSlots = slotsState.subscribe(s => {
      draft.set(clone(s.data));
      return s;
    });

    return () => {
      unsubscribeSlots();
      unsubscribe();
    };
  });
</script>

<Card let:Header>
  <Header>
    {$t('common.branch')}: <span class="text-secondary-500">{$machineState.data?.location || '-'}</span>
    {$t('common.machine')}: <span class="text-secondary-500">{$machineState.data?.name || '-'}</span>
  </Header>
</Card>
<Card let:Header let:Content>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <FilterBar bind:search={$filter.search} changed={$filter.changed} status={$filter.status} stock={$filter.stock} />
  </Content>
  <Content>
    <Header>{$t('common.field.instructions')}</Header>
    <Command
      time={$machineState.data?.sync_time}
      editing={!isMatched($draft, $slotsState.data)}
      syncing={utils.isPassed5Seconds($machineState.data?.sync_time)}
      loading={$actionState.loading}
      on:refresh={handle.refresh}
      on:save={handle.save}
      on:reset={handle.reset}
    />
  </Content>
  <Content>
    <div class="max-w-full select-none overflow-auto border-b border-t border-gray-300 p-4">
      {#if loading}
        <div class="py-4 text-center">{$t('common.syncing')}</div>
      {:else}
        <div class="grid w-full gap-6" style="grid-template-columns: repeat({border.cols}, auto);">
          {#each slots as slot}
            {#if slot.id > 0}
              <SlotCard
                slot={utils.getSlot(slot.id)}
                editing={utils.isEditing(slot.id)}
                image={$filter.image === 'show'}
                on:select={handle.select}
                on:stock={handle.adjust}
              />
            {:else}
              <SlotEmpty code={slot.code} isExist={true} on:create />
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </Content>
  <Content>
    <Help />
  </Content>
</Card>

{#await selector.call($selector) then { mode, value }}
  <Drawer let:Creator let:Editor let:Eraser title={value.code} subtitle={value.product.name}>
    {#if mode === 'create'}
      <Creator
        slotcode={value.code}
        groupOptions={data.options.groups}
        productOptions={data.options.products}
        on:create={handle.create}
        on:cancel={handle.cancel}
      />{:else if mode === 'edit'}
      <Editor
        slot={value}
        groupOptions={data.options.groups}
        productOptions={data.options.products}
        on:update={handle.update}
        on:delete={handle.delete}
        on:cancel={handle.cancel}
      />{:else if mode === 'delete'}
      <Eraser slot={value} on:delete={handle.delete} on:cancel={handle.cancel} />
    {/if}
  </Drawer>
{:catch}
  <div class="hidden" />
{/await}
