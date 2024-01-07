<!-- GroupEditor -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import ToggleField from '$lib/components/forms/inputs/ToggleField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { CatalogGroupEntity, CatalogGroupUpdateEntity } from '$lib/types/catalog_group';
  import { EditorForm } from './editor-form';

  let { group, onupdate, oncancel } = $props<{
    group: CatalogGroupEntity;
    onupdate: (id: number, data: CatalogGroupUpdateEntity) => void;
    oncancel: () => void;
  }>();

  const form = new EditorForm(group);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.invalid) return;

    onupdate(group.id, {
      name: form.data.name,
      description: form.data.description,
      is_enable: form.data.is_enable,
    });
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <TextInputField id="name" label={$t('group.field.name')} bind:value={form.data.name} error={form.errors['name']} />

    <TextInputField
      id="description"
      label={$t('group.field.description')}
      bind:value={form.data.description}
      error={form.errors['description']}
    />

    <ToggleField
      id="is_enable"
      label={$t('group.field.status')}
      bind:value={form.data.is_enable}
      labelOn={$t('group.status-on')}
      labelOff={$t('group.status-off')}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={form.id} disabled={form.invalid}>{$t('common.button.save')}</Button>
    <Button color="warning" outline {onclick}>{$t('common.button.cancel')}</Button>
  </div>
</div>
