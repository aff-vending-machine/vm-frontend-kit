<!-- MachineViewer -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import { showDate } from '$lib/utils/generate';
  import type { MachineEntity } from '$lib/types/machine';

  let { machine, onedit, ondelete, oncancel } = $props<{
    machine: MachineEntity;
    onedit: (data: MachineEntity) => void;
    ondelete: (data: MachineEntity) => void;
    oncancel: () => void;
  }>();

  function onEdit(e: MouseEvent) {
    e.preventDefault();
    onedit(machine);
  }

  function onDelete(e: MouseEvent) {
    e.preventDefault();
    ondelete(machine);
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{machine.name}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-neutral-dark">{$t('machine.field.id')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.id}</p>
        <p class="text-neutral-dark">{$t('machine.field.serial-number')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.serial_number}</p>
        <p class="text-neutral-dark">{$t('machine.field.branch-id')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.branch_id}</p>
        <p class="text-neutral-dark">{$t('machine.field.branch')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.branch?.name}</p>
        <p class="text-neutral-dark">{$t('machine.field.location')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.location}</p>
        <p class="text-neutral-dark">{$t('machine.field.type')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.type}</p>
        <p class="text-neutral-dark">{$t('machine.field.vendor')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.vendor}</p>
        <p class="text-neutral-dark">{$t('machine.field.status')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.status}</p>
        <p class="text-neutral-dark">{$t('machine.field.temperature')}:</p>
        <p class="col-span-2 text-neutral-dark">{machine.temperature ?? '-'} °C</p>
        <p class="text-neutral-dark">{$t('machine.field.sync-time')}:</p>
        <p class="col-span-2 text-neutral-dark">{showDate(machine.sync_time)}</p>
        <p class="text-neutral-dark">{$t('machine.field.sync-slot-time')}:</p>
        <p class="col-span-2 text-neutral-dark">{showDate(machine.sync_slot_time)}</p>
        <p class="text-neutral-dark">{$t('machine.field.sync-channel-time')}:</p>
        <p class="col-span-2 text-neutral-dark">{showDate(machine.sync_channel_time)}</p>
        <p class="text-neutral-dark">{$t('machine.field.sync-transaction-time')}:</p>
        <p class="col-span-2 text-neutral-dark">{showDate(machine.sync_transaction_time)}</p>
      </div>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" onclick={onEdit}>{$t('common.button.edit')}</Button>
    <Button color="danger" onclick={onDelete}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
