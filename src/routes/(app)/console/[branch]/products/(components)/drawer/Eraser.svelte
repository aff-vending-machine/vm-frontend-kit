<!-- ProductEraser -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import type { CatalogProduct } from '$lib/types/catalog_product';

  export let product: CatalogProduct;

  const dispatch = createEventDispatcher();

  const formID = 'product-eraser-form';
  const id = field('id', product.id, [required()]);
  const productForm = form(id);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('delete', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('product.delete-title')}: {product.name || $t('general.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <p class="my-4 text-center text-lg">
      {$t('general.delete-message')} "<span class="text-red-500">{product.name}</span>"?
    </p>
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="danger" type="submit" form={formID}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
