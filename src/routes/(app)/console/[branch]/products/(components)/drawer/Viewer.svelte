<!-- ProductViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { CatalogProduct } from '$lib/types/catalog_product';

  export let product: CatalogProduct;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', { source: product });
  }

  function handleDelete() {
    dispatch('delete', { source: product });
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3">
      <img src={product.image_url} alt={product.name} class="h-auto w-full rounded-lg" />
    </div>
    <div class="w-full space-y-1 md:w-2/3 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{product.name}</h1>
      <p class="text-gray-700">{$t('product.columns.sku')}: {product.sku}</p>
      <p class="text-gray-700">{$t('product.columns.group')}: {product.group?.name || '-'}</p>
      <p class="text-gray-700">
        {$t('product.columns.status')}:
        {#if product.is_enable}
          <span class="text-success-500">{$t('product.status-on')}</span>
        {:else}
          <span class="text-danger-500">{$t('product.status-off')}</span>
        {/if}
      </p>
      <p class="pt-4 text-xl font-semibold">{product.sale_price?.toFixed(2)} {$t('unit.baht')}</p>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" on:click={handleEdit}>{$t('button.edit')}</Button>
    <Button color="danger" on:click={handleDelete}>{$t('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('button.cancel')}</Button>
  </div>
</div>
