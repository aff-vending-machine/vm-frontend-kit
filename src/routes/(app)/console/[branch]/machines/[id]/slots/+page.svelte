<script lang="ts">
  import Drawer from './(components)/drawer/Container.svelte';
  import Command from './(components)/filter/Action.svelte';
  import FilterBar from './(components)/filter/Filter.svelte';
  import Help from './(components)/filter/Help.svelte';
  import SlotCard from './(components)/grid/SlotCard.svelte';
  import SlotEmpty from './(components)/grid/SlotEmpty.svelte';
  import { call, handle } from './event.svelte';
  import { selector, act } from './store';
  import { utils } from './utils';

  import Card from '$lib/components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import { isMatched } from '$lib/utils/check';
  import type { MachineSlot } from '$lib/types/machine_slot';
  import { clone } from '$lib/utils/generate';
  import type { Machine } from '$lib/types/machine';

  let { data } = $props();
  let filter = $state({
    search: '',
    stock: '',
    status: '',
    changed: '',
    image: '',
  });

  let machine = $state<Machine>();
  let origin = $state<MachineSlot[]>([]);
  let draft = $state<MachineSlot[]>([]);
  let border = $derived(utils.findBorder(origin));
  let slots = $derived(utils.regroup(draft, filter, border));
  let loading = $state(true);

  $effect.pre(() => {
    (async () => {
      try {
        loading = true;
        await handle.refresh(data.machineID);

        const result2 = await call.machine(data.machineID);
        machine = result2.data;

        const result3 = await call.slots(data.branchID, data.machineID);
        origin = result3.data || [];
        draft = result3.data || [];
      } finally {
        loading = false;
      }
    })();
  });
</script>

<Card let:Header let:Content>
  <Content>
    <Header>
      <div class="flex flex-col">
        <span> {$t('common.branch')}: <span class="text-secondary-500">{machine?.location || '-'}</span></span>
        <span> {$t('common.machine')}: <span class="text-secondary-500">{machine?.name || '-'}</span></span>
      </div>
    </Header>
  </Content>
</Card>
<Card let:Header let:Content>
  <Content>
    <Header>{$t('common.search-filter')}</Header>
    <FilterBar
      bind:search={filter.search}
      bind:stock={filter.stock}
      bind:status={filter.status}
      bind:changed={filter.changed}
      bind:image={filter.image}
    />
  </Content>
  <Content>
    <Header>{$t('common.field.instructions')}</Header>
    <Command
      time={machine?.sync_slot_time}
      editing={!isMatched(draft, origin)}
      syncing={utils.isPassed5Seconds(machine?.sync_slot_time)}
      loading={$act.loading}
      onrefresh={() => handle.refresh(data.machineID)}
      onsave={() => handle.save(data.machineID, draft)}
      oncancel={() => (draft = clone(origin))}
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
                slot={utils.getSlot(draft, slot.id)}
                editing={utils.isEditing(draft, origin, slot.id)}
                image={filter.image === 'show'}
                onselect={handle.select}
                onstock={(id, stock) => handle.adjust(draft, id, stock)}
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
      <Creator slotcode={value.code} groupOptions={data.options.groups} productOptions={data.options.products} />
    {:else if mode === 'edit'}
      <Editor slot={value} groupOptions={data.options.groups} productOptions={data.options.products} />
    {:else if mode === 'delete'}
      <Eraser slot={value} ondelete={id => handle.delete(draft, id)} oncancel={handle.cancel} />
    {/if}
  </Drawer>
{:catch}
  <div class="hidden" />
{/await}
