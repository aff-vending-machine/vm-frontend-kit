<!-- ProductEditor -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import Image from '$lib/components/elements/images/Image.svelte';
  import NumberInputField from '$lib/components/forms/inputs/NumberInputField.svelte';
  import SelectField from '$lib/components/forms/inputs/SelectField.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import ToggleField from '$lib/components/forms/inputs/ToggleField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type { CatalogProduct } from '$lib/types/catalog_product';

  export let product: CatalogProduct;
  export let groupOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'product-editor-form';
  const id = field('id', product.id, [required()]);
  const sku = field('sku', product.sku, [required()]);
  const group_id = field('group_id', product.group_id, [required()]);
  const name = field('name', product.name, [required()]);
  const image_url = field('image_url', product.image_url, []);
  const price = field('price', product.sale_price, [required(), min(0)]);
  const is_enable = field('is_enable', product.is_enable, [required()]);
  const productForm = form(id, sku, name, group_id, image_url, price, is_enable);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('update', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('product.edit-title')}: {product.name || $t('general.untitled')}</h2>
  <div class="m-4 flex justify-center">
    <Image class="mx-auto h-32 w-32 border object-contain" src={$image_url.value} alt={$name.value} />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <TextInputField id="sku" label={$t('product.field.sku')} bind:value={$sku.value} disabled />
    <SelectField
      id="group_id"
      label={$t('product.field.group')}
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={groupOptions}
      unselected={false}
    />
    <TextInputField id="name" label={$t('product.field.name')} bind:value={$name.value} error={$name.errors?.at(0)} />
    <TextInputField
      id="image_url"
      label={$t('product.field.image')}
      bind:value={$image_url.value}
      error={$image_url.errors?.at(0)}
    />
    <NumberInputField
      id="price"
      label={$t('product.field.price')}
      bind:value={$price.value}
      error={$price.errors?.at(0)}
    />
    <ToggleField
      id="is_enable"
      label={$t('product.field.status')}
      bind:value={$is_enable.value}
      labelOn={$t('product.status-on')}
      labelOff={$t('product.status-off')}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={formID}>{$t('common.button.save')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
