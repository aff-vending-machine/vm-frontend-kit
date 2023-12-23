<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import { showDate } from '$lib/utils/generate';
  import type { Machine } from '$lib/types/machine';

  let { machine, onedit, ondelete, oncancel } = $props<{
    machine: Machine;
    onedit?: (mode: string, data: Machine) => void;
    ondelete?: (mode: string, data: Machine) => void;
    oncancel?: () => void;
  }>();

  function handleEdit(e: MouseEvent) {
    e.preventDefault();

    onedit && onedit('edit', machine);
  }

  function handleDelete(e: MouseEvent) {
    e.preventDefault();

    ondelete && ondelete('delete', machine);
  }

  function handleCancel(e: MouseEvent) {
    e.preventDefault();

    oncancel && oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{machine.name}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-gray-700">{$t('machine.field.serial-number')}:</p>
        <p class="col-span-2 text-gray-700">{machine.serial_number}</p>
        <p class="text-gray-700">{$t('machine.field.branch-id')}:</p>
        <p class="col-span-2 text-gray-700">{machine.branch_id}</p>
        <p class="text-gray-700">{$t('machine.field.branch')}:</p>
        <p class="col-span-2 text-gray-700">{machine.branch?.name}</p>
        <p class="text-gray-700">{$t('machine.field.location')}:</p>
        <p class="col-span-2 text-gray-700">{machine.location}</p>
        <p class="text-gray-700">{$t('machine.field.type')}:</p>
        <p class="col-span-2 text-gray-700">{machine.type}</p>
        <p class="text-gray-700">{$t('machine.field.vendor')}:</p>
        <p class="col-span-2 text-gray-700">{machine.vendor}</p>
        <p class="text-gray-700">{$t('machine.field.status')}:</p>
        <p class="col-span-2 text-gray-700">{machine.status}</p>
        <p class="text-gray-700">{$t('machine.field.sync-time')}:</p>
        <p class="col-span-2 text-gray-700">{showDate(machine.sync_time)}</p>
        <p class="text-gray-700">{$t('machine.field.sync-slot-time')}:</p>
        <p class="col-span-2 text-gray-700">{showDate(machine.sync_slot_time)}</p>
        <p class="text-gray-700">{$t('machine.field.sync-channel-time')}:</p>
        <p class="col-span-2 text-gray-700">{showDate(machine.sync_channel_time)}</p>
        <p class="text-gray-700">{$t('machine.field.sync-transaction-time')}:</p>
        <p class="col-span-2 text-gray-700">{showDate(machine.sync_transaction_time)}</p>
      </div>
      <p></p>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" onclick={handleEdit}>{$t('common.button.edit')}</Button>
    <Button color="danger" onclick={handleDelete}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline onclick={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
