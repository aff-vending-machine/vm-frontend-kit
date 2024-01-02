<!-- ProductViewer -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { CatalogProductEntity } from '$lib/types/catalog_product';

  let { product, onedit, ondelete, oncancel } = $props<{
    product: CatalogProductEntity;
    onedit: (data: CatalogProductEntity) => void;
    ondelete: (data: CatalogProductEntity) => void;
    oncancel: () => void;
  }>();

  function onEdit(e: MouseEvent) {
    e.preventDefault();
    onedit(product);
  }

  function onDelete(e: MouseEvent) {
    e.preventDefault();
    ondelete(product);
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3">
      <img src={product.image_url} alt={product.name} class="h-auto w-full rounded-lg" />
    </div>
    <div class="w-full space-y-1 md:w-2/3 md:pl-4">
      <h1 class="pb-2 text-xl font-bold">{product.name}</h1>
      <p class="text-neutral-dark">{$t('product.field.sku')}: {product.sku}</p>
      <p class="text-neutral-dark">{$t('product.field.group')}: {product.group?.name || '-'}</p>
      <p class="text-neutral-dark">
        {$t('product.field.status')}:
        {#if product.is_enable}
          <span class="text-success-500">{$t('product.status-on')}</span>
        {:else}
          <span class="text-danger-500">{$t('product.status-off')}</span>
        {/if}
      </p>
      <p class="pt-4 text-xl font-semibold">{product.sale_price?.toFixed(2)} {$t('common.unit.baht')}</p>
    </div>
  </div>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" onclick={onEdit}>{$t('common.button.edit')}</Button>
    <Button color="danger" onclick={onDelete}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
