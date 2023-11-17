<script lang="ts">
  import { onMount } from 'svelte';

  import { bindFilter } from './filter';
  import SlotCard from './SlotCard.svelte';
  import SlotEmpty from './SlotEmpty.svelte';
  import { regroupData } from './ui';

  import Card from '$components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import useSWR from '$lib/stores/useSWR';
  import type { MachineSlot } from '$types/machine_slot';

  export let data;
  let slots = useSWR<MachineSlot[]>();
  // let selectedMachineSlot: MachineSlot;

  $: source = $slots.data || [];

  onMount(() => {
    const machineIds = data.options.machines.map(m => m.value);
    const unsubscribe = bindFilter(machineIds, id => {
      return slots.mutate(() => data.fetch.slots(id));
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<Card let:Header let:Content>
  <Content>
    <Header>Search Filter</Header>
    <!-- <Filter limit={$filter.limit} /> -->
  </Content>
  <div class="mt-4 border-b" />
  <Content>
    {#if $slots.loading}
      <div class="py-4 text-center">{$t('general.loading')}</div>
    {:else if $slots.error}
      <div>{$slots.error}</div>
    {:else}
      <div class="block select-none overflow-x-auto border-b border-t border-gray-300 p-4">
        <div class="grid max-w-full gap-2" style="grid-template-columns: repeat(10, auto);">
          {#each regroupData(source) as slot}
            {#if !!slot.id}
              <SlotCard slot={source.find(s => s.id === slot.id) ?? source[0]} isEdited={false} />
            {:else}
              <SlotEmpty code={slot.code} isExist={false} />
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </Content>
</Card>
