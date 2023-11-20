<!-- Editor -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  import Button from '$components/elements/buttons/Button.svelte';
  import Image from '$components/elements/images/Image.svelte';
  import NumberInputField from '$components/forms/inputs/NumberInputField.svelte';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import TextInputField from '$components/forms/inputs/TextInputField.svelte';
  import ToggleField from '$components/forms/inputs/ToggleField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type { CatalogProduct } from '$types/catalog_product';
  import type { MachineSlot } from '$types/machine_slot';

  export let slot: MachineSlot;
  export let groupOptions: SelectOptionsType[];
  export let productOptions: SelectOptionsType<number, CatalogProduct>[];

  const dispatch = createEventDispatcher();

  const formID = 'slot-editor-form';

  const id = field('id', slot.id, [required()]);
  const code = field('code', slot.code, [required()]);
  const group_id = field('group_id', slot.product?.group_id, [required()]);
  const productID = field('product_id', slot.product_id, []);
  const stock = field('stock', slot.stock, [required(), min(0)]);
  const capacity = field('capacity', slot.capacity, [required(), min(0)]);
  const is_enable = field('is_enable', slot.is_enable, [required()]);

  const slotForm = form(id, code, group_id, productID, stock, capacity, is_enable);

  async function handleSubmit() {
    await slotForm.validate();
    if ($slotForm.valid) {
      dispatch('update', slotForm.summary());
    }
  }

  async function handleGroup() {
    if (productOptions.findIndex(p => p.value === $productID.value) === -1) {
      const firstProduct = productOptions.filter(p => p.filter === $group_id.value)[0];
      productID.set(firstProduct.value);
    }
  }

  function handleDelete() {
    dispatch('delete', { source: slot });
  }

  function handleCancel() {
    dispatch('cancel');
  }

  onMount(() => {
    handleGroup();
  });
</script>

<div class="mr-2 h-full overflow-y-auto" style="z-index: 999;">
  <h2 class="mb-4 text-xl font-bold">{$t('slot.update-title')}: {slot.code} ({slot.product?.name || '-'})</h2>
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
    <TextInputField id="code" label={$t('slot.field.code')} bind:value={$code.value} disabled />
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
    <Button color="secondary" type="submit" form={formID}>{$t('button.save')}</Button>
    <Button color="danger" outline on:click={handleDelete}>{$t('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$t('button.cancel')}</Button>
  </div>
</div>
