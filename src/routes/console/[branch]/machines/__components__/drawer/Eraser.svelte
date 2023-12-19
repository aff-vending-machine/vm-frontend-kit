<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { form } from 'svelte-forms';

  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { Machine } from '$types/machine';

  export let machine: Machine;

  const dispatch = createEventDispatcher();

  const formID = 'machine-eraser-form';
  const machineForm = form();

  async function handleSubmit() {
    await machineForm.validate();
    if ($machineForm.valid) {
      const id = machine.id;
      const data = machine;

      dispatch('delete', { id, data });
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('machine.delete-title')}: {machine.name || $t('common.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <p class="my-4 text-center text-lg">
      {$t('common.delete-message')} "<span class="text-red-500">{machine.name}</span>"?
    </p>
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="danger" type="submit" form={formID}>
      {$t('common.button.delete')}
    </Button>
    <Button color="warning" outline on:click={handleCancel}>
      {$t('common.button.cancel')}
    </Button>
  </div>
</div>
