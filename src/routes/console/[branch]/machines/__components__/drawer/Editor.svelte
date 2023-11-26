<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import Button from '$components/elements/buttons/Button.svelte';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import TextInputField from '$components/forms/inputs/TextInputField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type { Machine } from '$types/machine';

  export let machine: Machine;
  export let branchOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'machine-editor-form';
  const id = field('id', machine.id, []);
  const name = field('name', machine.name, [required()]);
  const branchId = field('branch_id', machine.branch_id, [required()]);
  const location = field('location', machine.location, []);
  const type = field('type', machine.type, []);
  const vendor = field('vendor', machine.vendor, []);
  const status = field('status', machine.status, []);
  const machineForm = form(id, name, branchId, location, type, vendor, status);

  async function handleSubmit() {
    await machineForm.validate();
    if ($machineForm.valid) {
      dispatch('update', { data: machineForm.summary() });
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('machine.edit-title')}: {machine.name || $t('general.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <TextInputField id="name" label={$t('machine.field.name')} bind:value={$name.value} error={$name.errors?.at(0)} />

    <SelectField
      id="branch_id"
      label={$t('machine.field.branch')}
      bind:value={$branchId.value}
      error={$branchId.errors?.at(0)}
      options={branchOptions}
    />

    <TextInputField
      id="location"
      label={$t('machine.field.location')}
      bind:value={$location.value}
      error={$location.errors?.at(0)}
    />

    <TextInputField id="type" label={$t('machine.field.type')} bind:value={$type.value} error={$type.errors?.at(0)} />

    <TextInputField
      id="vendor"
      label={$t('machine.field.vendor')}
      bind:value={$vendor.value}
      error={$vendor.errors?.at(0)}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={formID}>{$t('common.button.save')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
