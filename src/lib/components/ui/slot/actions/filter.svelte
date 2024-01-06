<script lang="ts">
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import ShareFilterSelection from '$lib/components/shares/ShareFilterSelection.svelte';
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

  <ShareFilterSelection
    key="stock"
    label={$t('common.field.stock')}
    bind:value={stock}
    options={stockOptions($t)}
    saveOnUrl={false}
  />

  <ShareFilterSelection
    key="status"
    label={$t('common.field.status')}
    bind:value={status}
    options={statusOptions($t)}
    saveOnUrl={false}
  />

  <ShareFilterSelection
    key="changed"
    label={$t('common.field.changed')}
    bind:value={changed}
    options={editOptions($t)}
    saveOnUrl={false}
  />

  <ShareFilterSelection
    key="image"
    label={$t('common.field.image')}
    bind:value={image}
    options={displayOptions($t)}
    saveOnUrl={false}
  />
</div>
