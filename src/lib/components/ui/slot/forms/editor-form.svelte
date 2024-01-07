<!-- SlotEditor -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import Image from '$lib/components/elements/images/Image.svelte';
  import NumberInputField from '$lib/components/forms/inputs/NumberInputField.svelte';
  import SelectIDField from '$lib/components/ui-common/forms/SelectIDField.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import ToggleField from '$lib/components/forms/inputs/ToggleField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type { CatalogProductEntity } from '$lib/types/catalog_product';
  import type { MachineSlotEntity, MachineSlotUpdateEntity } from '$lib/types/machine_slot';
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';
  import { EditorForm } from './editor-form';

  let { slot, groupOptions, productOptions, onupdate, oncancel } = $props<{
    slot: MachineSlotEntity;
    groupOptions: SelectOptionsType<number, CatalogGroupEntity>[];
    productOptions: SelectOptionsType<number, CatalogProductEntity>[];
    onupdate: (id: number, data: MachineSlotUpdateEntity) => void;
    oncancel: () => void;
  }>();

  const form = new EditorForm(slot);

  let ts: number;
  let hidden = $state(false);
  let pOptions = $state(productOptions.filter(p => p.filter === form.data.group_id));
  let image = $derived(pOptions.find(p => p.value === form.data.product_id)?.data?.image_url);

  $effect(() => {
    return () => {
      if (!ts) clearTimeout(ts);
    };
  });

  const onChangeGroup = (id: number) => {
    hidden = true;
    pOptions = productOptions.filter(p => p.filter === id);
    if (pOptions.findIndex(p => p.value === form.data.product_id) === -1) {
      const firstProduct = pOptions.filter(p => p.filter === id)[0];
      form.data.product_id = firstProduct.value ?? 0;
    }
    setTimeout(() => {
      hidden = false;
    }, 10);
  };

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.invalid) return;
    onupdate(slot.id, {
      product_id: form.data.product_id,
      code: form.data.code,
      stock: form.data.stock,
      capacity: form.data.capacity,
      spiral: form.data.spiral,
      is_enable: form.data.is_enable,
      product: pOptions.find(p => p.value === form.data.product_id)?.data,
    });
  }

  function onDelete(e: MouseEvent) {
    e.preventDefault();
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel && oncancel();
  }

  $effect(() => {
    if (pOptions.length === 1) {
      form.data.product_id = pOptions[0].value;
    }
  });
</script>

<div class="mr-2 h-full overflow-y-auto">
  <div class="m-4 flex justify-center">
    <Image class="mx-auto h-32 w-32 border object-contain" src={image} alt={form.data.code} />
  </div>
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <TextInputField
      id="code"
      label={$t('slot.field.code')}
      bind:value={form.data.code}
      error={form.errors['code']}
      disabled
    />

    <SelectIDField
      id="group_id"
      label={$t('slot.field.product-group')}
      bind:value={form.data.group_id}
      error={form.errors['group_id']}
      unselected={0}
      placeholder={$t('slot.all-group')}
      options={groupOptions}
      onchange={onChangeGroup}
    />
    {form.data.group_id}
    {form.data.product_id}
    [{pOptions.map(o => o.value).join(', ')}]

    <SelectIDField
      id="product_id"
      label={$t('slot.field.product')}
      bind:value={form.data.product_id}
      error={form.errors['product_id']}
      unselected={0}
      {hidden}
      placeholder="None"
      bind:options={pOptions}
    />

    <NumberInputField
      id="spiral"
      label={$t('slot.field.spiral')}
      bind:value={form.data.spiral}
      min={1}
      max={5}
      error={form.errors['spiral']}
    />

    <NumberInputField
      id="stock"
      label={$t('slot.field.stock')}
      bind:value={form.data.stock}
      max={form.data.capacity}
      error={form.errors['stock']}
    />

    <NumberInputField
      id="capacity"
      label={$t('slot.field.capacity')}
      bind:value={form.data.capacity}
      min={form.data.stock}
      error={form.errors['capacity']}
    />

    <ToggleField id="is_enable" label={$t('slot.field.active')} bind:value={form.data.is_enable} />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={form.id} disabled={form.invalid}>{$t('common.button.save')}</Button>
    <Button color="danger" outline onclick={onDelete}>{$t('common.button.delete')}</Button>
    <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
  </div>
</div>
