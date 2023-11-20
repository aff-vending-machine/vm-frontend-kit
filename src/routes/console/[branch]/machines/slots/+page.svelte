<script lang="ts">
  import { onMount } from 'svelte';

  import { action, selector, slots, source } from './action';
  import { bindFilter } from './filter';
  import { findBorder, regroupData } from './slot';
  import SlotCard from './SlotCard.svelte';

  import Drawer from '$components/overlays/drawers/Drawer.svelte';
  import Card from '$components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';

  export let data;

  $: border = findBorder($slots.data || []);

  onMount(() => {
    const machineIds = data.options.machines.map(m => m.value);
    const unsubscribe = bindFilter(machineIds, id => {
      return slots.mutate(() => data.fetch.slots(id));
    });
    slots.subscribe(s => {
      source.set(s.data || []);
      return s;
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
        <div class="grid max-w-full gap-4" style="grid-template-columns: repeat({border.cols}, auto);">
          {#if $slots.loading}
            <div />
          {:else if $slots.error}
            <div />
          {:else}
            {#each regroupData($slots.data || [], border) as slot}
              {#if !!slot.id}
                <SlotCard
                  slot={action.getSlot(slot.id)}
                  isEdited={action.isEdited(slot, action.getSlot(slot.id))}
                  on:select={action.select}
                  on:stock={action.adjust}
                />
              {:else}
                <div />
              {/if}
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </Content>
</Card>

<Drawer let:Header let:Footer let:Body>
  <Header title={$selector.code} subtitle={$selector.product.name} />
  <Body>
    <!-- <DrawerEditor  /> -->
  </Body>
  <Footer />
</Drawer>
