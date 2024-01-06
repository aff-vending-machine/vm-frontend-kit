<script lang="ts">
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import SelectField from '$lib/components/ui-common/forms/SelectField.svelte';
  import { t } from '$lib/i18n/translations';
  import { displayOptions, editOptions, statusOptions, stockOptions } from '$lib/utils/options';

  let { search, stock, status, changed, image } = $props<{
    search: string;
    stock: string;
    status: string;
    changed: string;
    image: string;
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <TextInputField
    class="col-span-2"
    id="search"
    label={$t('common.field.search')}
    bind:value={search}
    maxlength={3}
    saveOnUrl={false}
  />

  <SelectField id="stock" label={$t('common.field.stock')} bind:value={stock} options={stockOptions($t)} />

  <SelectField id="status" label={$t('common.field.status')} bind:value={status} options={statusOptions($t)} />

  <SelectField id="changed" label={$t('common.field.changed')} bind:value={changed} options={editOptions($t)} />

  <SelectField id="image" label={$t('common.field.image')} bind:value={image} options={displayOptions($t)} />
</div>
