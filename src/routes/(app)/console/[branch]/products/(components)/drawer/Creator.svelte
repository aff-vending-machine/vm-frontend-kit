<!-- ProductCreator -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import Image from '$lib/components/elements/images/Image.svelte';
  import NumberInputField from '$lib/components/forms/inputs/NumberInputField.svelte';
  import SelectField from '$lib/components/forms/inputs/SelectField.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';

  export let groupOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'product-creator-form';
  const group_id = field('group_id', 1, [required()]);
  const name = field('name', '', [required()]);
  const sku = field('sku', 'CP', [required()]);
  const image_url = field('image_url', '', []);
  const price = field('price', 1, [required(), min(1)]);
  const productForm = form(name, group_id, sku, image_url, price);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('create', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('product.create-title')}: {$name.value || $t('general.untitled')}</h2>
  <div class="m-4 flex justify-center">
    <Image class="mx-auto h-32 w-32 border object-contain" src={$image_url.value} alt={$name.value} />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <SelectField
      id="group_id"
      label={$t('product.field.group')}
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={groupOptions}
      unselected={false}
    />
    <TextInputField id="name" label={$t('product.field.name')} bind:value={$name.value} error={$name.errors?.at(0)} />
    <TextInputField id="sku" label={$t('product.field.sku')} bind:value={$sku.value} error={$name.errors?.at(0)} />
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
      min={1}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={formID}>{$t('common.button.add-product')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
