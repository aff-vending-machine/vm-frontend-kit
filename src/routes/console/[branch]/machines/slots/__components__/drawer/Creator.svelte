<!-- Creator -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  import Button from '$components/elements/buttons/Button.svelte';
  import Image from '$components/elements/images/Image.svelte';
  import NumberInputField from '$components/forms/inputs/NumberInputField.svelte';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import ToggleField from '$components/forms/inputs/ToggleField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type { CatalogProduct } from '$types/catalog_product';

  export let slotcode: string;
  export let groupOptions: SelectOptionsType[];
  export let productOptions: SelectOptionsType<number, CatalogProduct>[];

  const dispatch = createEventDispatcher();

  const formID = 'slot-creator-form';
  const code = field('code', slotcode, [required()]);
  const group_id = field('group_id', 1, [required()]);
  const productID = field('product_id', 0, [required()]);
  const stock = field('stock', 0, [required(), min(0)]);
  const capacity = field('capacity', 0, [required(), min(0)]);
  const is_enable = field('is_enable', true, [required()]);
  const slotForm = form(code, group_id, productID, stock, capacity, is_enable);

  async function handleSubmit() {
    await slotForm.validate();
    if ($slotForm.valid) {
      const data = slotForm.summary();

      dispatch('create', { data });
    }
  }

  async function handleGroup() {
    if (productOptions.findIndex(p => p.filter === $productID.value) === -1) {
      const firstProduct = productOptions.filter(p => p.filter === $group_id.value)[0];
      productID.set(firstProduct.value);
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }

  onMount(() => {
    handleGroup();
  });
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('slot.add-title')}: {slotcode}</h2>
  <div class="m-4 flex justify-center">
    <Image
      class="mx-auto h-32 w-32 border object-contain"
      src={productOptions.find(p => p.value === $productID.value)?.data?.image_url}
      alt="images"
    />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 rounded-md border border-gray-200 p-2 text-sm"
  >
    <SelectField
      id="group_id"
      label={$t('slot.field.product-group')}
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={groupOptions}
      unselected={false}
      on:change={handleGroup}
    />
    <SelectField
      id="product_id"
      label={$t('slot.field.product')}
      bind:value={$productID.value}
      error={$productID.errors?.at(0)}
      options={productOptions.filter(p => p.filter === $group_id.value)}
      unselected={false}
    />
    <NumberInputField
      id="stock"
      label={$t('slot.field.stock')}
      bind:value={$stock.value}
      error={$stock.errors?.at(0)}
    />
    <NumberInputField
      id="capacity"
      label={$t('slot.field.capacity')}
      bind:value={$capacity.value}
      error={$capacity.errors?.at(0)}
    />
    <ToggleField id="is_enable" label={$t('slot.field.active')} bind:value={$is_enable.value} />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={formID}>{$t('common.button.add-slot')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
