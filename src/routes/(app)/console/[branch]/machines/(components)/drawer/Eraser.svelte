<script lang="ts">
  import { form } from 'svelte-forms';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { Machine } from '$lib/types/machine';

  let { machine, ondelete, oncancel } = $props<{
    machine: Machine;
    ondelete?: (id: number, data: Record<string, any>) => void;
    oncancel?: () => void;
  }>();

  const formID = 'machine-eraser-form';
  const machineForm = form();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    await machineForm.validate();
    if ($machineForm.valid) {
      ondelete && ondelete(machine.id, machine);
    }
  }

  function handleCancel(e: MouseEvent) {
    e.preventDefault();

    oncancel && oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('machine.delete-title')}: {machine.name || $t('common.untitled')}</h2>
  <form id={formID} onsubmit={handleSubmit} class="space-y-4 rounded-md border border-gray-200 p-2 text-sm">
    <p class="my-4 text-center text-lg">
      {$t('common.delete-message')} "<span class="text-red-500">{machine.name}</span>"?
    </p>
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="danger" type="submit" form={formID}>
      {$t('common.button.delete')}
    </Button>
    <Button color="warning" outline onclick={handleCancel}>
      {$t('common.button.cancel')}
    </Button>
  </div>
</div>
