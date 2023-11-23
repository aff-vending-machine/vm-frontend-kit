<script lang="ts">
  import { onMount } from 'svelte';

  import Drawer from './__components__/drawer/Drawer.svelte';
  import Command from './__components__/filter/Command.svelte';
  import FilterBar from './__components__/filter/FilterBar.svelte';
  import SlotCard from './__components__/slot/SlotCard.svelte';
  import SlotEmpty from './__components__/slot/SlotEmpty.svelte';
  import { request, events, selector, slotsData, draft, machineData } from './events';
  import { bindFilter, filter } from './filter';
  import { findBorder, isPassed5Seconds, regroupData } from './utils';

  import Card from '$components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';

  export let data;

  $: border = findBorder($slotsData.data || []);
  $: loading = $slotsData.loading || $request.loading;
  $: error = $slotsData.error || $request.error;

  $: isEdited = (id: number) =>
    JSON.stringify($draft.find(s => s.id === id)) !== JSON.stringify($slotsData.data?.find(s => s.id === id));
  $: getSlot = (id: number) => $draft.find(s => s.id === id) || $draft[0];

  onMount(() => {
    const machineIds = data.options.machines.map(m => m.value);
    const unsubscribe = bindFilter(machineIds, id => {
      machineData.mutate(() => data.fetch.machine(id));
      slotsData.mutate(() => data.fetch.slots(id));
      return Promise.resolve();
    });
    const unsubscribeSlots = slotsData.subscribe(s => {
      draft.set([...(s.data || [])]);
      return s;
    });

    return () => {
      unsubscribeSlots();
      unsubscribe();
    };
  });
</script>

<Card let:Header let:Content>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <FilterBar bind:search={$filter.search} changed={$filter.changed} status={$filter.status} stock={$filter.stock} />
  </Content>
  <Content>
    <Header>{$t('common.field.instructions')}</Header>
    <Command
      time={$machineData.data?.sync_time}
      isEdited={JSON.stringify($slotsData.data) !== JSON.stringify($draft)}
      isSynced={isPassed5Seconds($machineData.data?.sync_time)}
      loading={$request.loading}
      on:refresh={events.refresh}
      on:save={events.save}
      on:reset={events.reset}
    />
  </Content>
  <Content>
    <div class="max-w-full select-none overflow-auto border-b border-t border-gray-300 p-4">
      <div class="grid w-full gap-6" style="grid-template-columns: repeat({border.cols}, auto);">
        {#if loading}
          <div class="py-4 text-center">{$t('common.loading')}</div>
        {:else if error}
          <div>{error}</div>
        {:else}
          {#each regroupData($draft, $filter, border) as slot}
            {#if slot.id > 0}
              <SlotCard
                slot={getSlot(slot.id)}
                isEdited={isEdited(slot.id)}
                on:select={events.select}
                on:stock={events.adjust}
              />
            {:else}
              <SlotEmpty code={slot.code} isExist={true} />
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </Content>
</Card>

{#await selector.wait() then { mode, value }}
  <Drawer let:Editor title={value.code} subtitle={value.product.name}>
    {#if mode === 'edit'}
      <Editor
        slot={value}
        groupOptions={data.options.groups}
        productOptions={data.options.products}
        on:update={events.update}
        on:delete={events.delete}
        on:cancel={events.cancel}
      />
    {/if}
  </Drawer>
{:catch _}
  <div />
{/await}
