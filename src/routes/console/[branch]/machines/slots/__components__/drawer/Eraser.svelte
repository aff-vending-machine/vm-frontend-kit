<!-- Eraser -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { MachineSlot } from '$types/machine_slot';

  export let slot: MachineSlot;

  const dispatch = createEventDispatcher();

  const formID = 'slot-eraser-form';
  const id = field('id', slot.id, [required()]);
  const code = field('code', slot.code, [required()]);
  const slotForm = form(id, code);

  async function handleSubmit() {
    await slotForm.validate();
    if ($slotForm.valid) {
      dispatch('delete', { data: slotForm.summary() });
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('slot.delete-title')}: {slot.code} ({slot.product?.name || '-'})</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <p class="my-4 text-center text-lg">
      {$t('common.delete-message')} "<span class="text-red-500">{slot.code}</span>"?
    </p>
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="danger" type="submit" form={formID}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
