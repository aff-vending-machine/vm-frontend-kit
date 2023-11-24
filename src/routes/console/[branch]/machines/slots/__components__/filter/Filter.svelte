<script lang="ts">
  import TextInputField from '$components/forms/inputs/TextInputField.svelte';
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import { t } from '$lib/i18n/translations';
  import { editOptions, statusOptions, stockOptions } from '$lib/utils/options';

  export let search: string;
  export let stock: string;
  export let status: string;
  export let changed: string;
</script>

<div class="flex flex-col justify-between space-y-4 rounded border bg-secondary-50 p-4 md:flex-row">
  <div class="flex-end grid grid-cols-2 gap-4 xl:grid-cols-4">
    <TextInputField id="search" label={$t('common.field.search')} bind:value={search} maxlength={3} />
    <ShareFilterSelection key="stock" label={$t('common.field.stock')} bind:value={stock} options={stockOptions($t)} />
    <ShareFilterSelection
      key="status"
      label={$t('common.field.status')}
      bind:value={status}
      options={statusOptions($t)}
    />
    <ShareFilterSelection
      key="changed"
      label={$t('common.field.changed')}
      bind:value={changed}
      options={editOptions($t)}
    />
  </div>
</div>
