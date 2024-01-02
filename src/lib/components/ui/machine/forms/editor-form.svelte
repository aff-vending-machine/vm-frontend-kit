<!-- MachineEditor -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import SelectField from '$lib/components/forms/inputs/SelectField.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type { MachineUpdateEntity, MachineEntity } from '$lib/types/machine';
  import type { StoreBranch } from '$lib/types/store_branch';
  import { EditorForm } from './editor-form';

  let { machine, branchOptions, onupdate, oncancel } = $props<{
    machine: MachineEntity;
    branchOptions: SelectOptionsType<string, StoreBranch>[];
    onupdate: (id: number, data: MachineUpdateEntity) => void;
    oncancel: () => void;
  }>();

  const form = new EditorForm(machine);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.valid) onupdate(machine.id, form.data);
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <TextInputField
      id="name"
      label={$t('machine.field.name')}
      bind:value={form.data.name}
      error={form.errors['name']}
    />

    <SelectField
      id="branch_id"
      label={$t('machine.field.branch')}
      bind:value={form.data.branch_id}
      error={form.errors['branch_id']}
      options={branchOptions.map(b => ({ label: b.label, value: b.data?.id || 0 }))}
    />

    <TextInputField
      id="location"
      label={$t('machine.field.location')}
      bind:value={form.data.location}
      error={form.errors['location']}
    />

    <TextInputField
      id="type"
      label={$t('machine.field.type')}
      bind:value={form.data.type}
      error={form.errors['type']}
    />

    <TextInputField
      id="vendor"
      label={$t('machine.field.vendor')}
      bind:value={form.data.vendor}
      error={form.errors['vendor']}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={form.id} disabled={form.invalid}>{$t('common.button.save')}</Button>
    <Button color="warning" outline {onclick}>{$t('common.button.cancel')}</Button>
  </div>
</div>
