<script lang="ts">
  import Card from '$lib/components/sections/cards/Card.svelte';
  import { t } from '$lib/i18n/translations';
  import Filter from '$lib/components/ui/slot/actions/filter.svelte';
  import { ActionState, Command } from '$lib/components/ui/slot/actions';
  import { Drawer, OverlayState } from '$lib/components/ui/slot/overlays';
  import { SlotCard, SlotEmpty } from '$lib/components/ui/slot/utils';
  import DescriptionTag from '$lib/components/ui/slot/utils/description-tag.svelte';
  import { SlotState } from './state.svelte';

  let { data } = $props();

  const action = new ActionState(data.machineID);
  const overlay = new OverlayState();
  const internal = new SlotState(action, overlay);

  const slots = $derived(internal.regroup(internal.data));
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>
        <div class="flex flex-col">
          <span> {$t('common.branch')}: <span class="text-secondary">{internal.machine?.location ?? '-'}</span></span>
          <span> {$t('common.machine')}: <span class="text-secondary">{internal.machine?.name ?? '-'}</span></span>
        </div>
      </Header>
    </Content>
  {/snippet}
</Card>

<Card>
  {#snippet children({ Header, Content, Block })}
    <Content row>
      <Block>
        <Header>{$t('common.search-filter')}</Header>
        <Filter
          bind:search={action.search}
          bind:stock={action.stock}
          bind:status={action.status}
          bind:changed={action.changed}
          bind:image={action.image}
          bind:size={action.size}
        />
      </Block>
      <Block>
        <Header>{$t('common.field.instructions')}</Header>
        <Command
          time={internal.time}
          editing={internal.editing}
          syncing={internal.syncing}
          loading={internal.loading}
          onrefresh={internal.onRefresh}
          onsave={internal.onSave}
          oncancel={internal.onReset}
        />
      </Block>
    </Content>
    <Content>
      <div class="max-w-full select-none overflow-auto border-b border-t border-neutral-light p-4">
        {#if internal.loading}
          <div class="py-4 text-center">{$t('common.syncing')}</div>
        {/if}

        {#if internal.ready}
          <div
            class="grid {action.size === 'compact' ? 'gap-4' : 'gap-6'}"
            style="grid-template-columns: repeat({internal.border?.cols ?? 10}, auto);"
          >
            {#each slots as slot}
              {#if slot.id > 0}
                <SlotCard
                  slot={internal.getSlot(slot.id)}
                  editing={internal.isEditing(slot.id)}
                  image={action.image === 'show'}
                  onselect={internal.onSelect}
                  onstock={internal.onAdjust}
                  minimal={action.size === 'compact'}
                />
              {:else}
                <SlotEmpty code={slot.code} isExist={true} minimal={action.size === 'compact'} />
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </Content>
    <Content>
      <DescriptionTag />
    </Content>
  {/snippet}
</Card>

{#if overlay.mode.display === 'drawer'}
  <Drawer
    title={overlay.data?.code}
    subtitle={overlay.data?.product?.name}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ Editor })}
      <Editor
        slot={overlay.data}
        groupOptions={data.options.groups}
        productOptions={data.options.products}
        onupdate={internal.onUpdate}
        oncancel={internal.onReset}
      />
    {/snippet}
  </Drawer>
{/if}
