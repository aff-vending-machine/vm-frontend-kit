<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { Machine } from '$types/machine';

  export let machine: Machine;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', { mode: 'edit', data: machine });
  }
  function handleDelete() {
    dispatch('delete', { mode: 'delete', data: machine });
  }
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{machine.name}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-gray-700">{$t('machine.field.serial-number')}:</p>
        <p class="col-span-2 text-gray-700">{machine.serial_number}</p>
        <p class="text-gray-700">{$t('machine.field.location')}:</p>
        <p class="col-span-2 text-gray-700">{machine.location}</p>
        <p class="text-gray-700">{$t('machine.field.vendor')}:</p>
        <p class="col-span-2 text-gray-700">{machine.vendor}</p>
        <p class="text-gray-700">{$t('machine.field.branch-id')}:</p>
        <p class="col-span-2 text-gray-700">{machine.branch_id}</p>
      </div>
      <p></p>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" on:click={handleEdit}>{$t('common.button.edit')}</Button>
    <Button color="danger" on:click={handleDelete}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
