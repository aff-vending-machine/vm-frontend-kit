<!-- ProductEditor -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import Image from '$lib/components/elements/images/Image.svelte';
  import NumberInputField from '$lib/components/forms/inputs/NumberInputField.svelte';
  import SelectIDField from '$lib/components/ui-common/forms/SelectIDField.svelte';
  import TextInputField from '$lib/components/forms/inputs/TextInputField.svelte';
  import ToggleField from '$lib/components/forms/inputs/ToggleField.svelte';
  import { t } from '$lib/i18n/translations';
  import type { SelectOptionsType } from '$lib/utils/options';
  import type {
    CatalogProductCreateEntity,
    CatalogProductEntity,
    CatalogProductUpdateEntity,
  } from '$lib/types/catalog_product';
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';
  import { EditorForm } from './editor-form';

  let { product, groupOptions, oncreate, onupdate, oncancel } = $props<{
    product?: CatalogProductEntity;
    groupOptions: SelectOptionsType<number, CatalogGroupEntity>[];
    oncreate: (data: CatalogProductCreateEntity) => void;
    onupdate: (id: number, data: CatalogProductUpdateEntity) => void;
    oncancel: () => void;
  }>();

  const form = new EditorForm(product);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (form.invalid) return;

    if (!product || !product.id) {
      oncreate({
        group_id: form.data.group_id,
        name: form.data.name,
        barcode: form.data.barcode,
        description: form.data.description,
        image_url: form.data.image_url,
        product_price: form.data.price,
        sale_price: form.data.price,
        is_enable: form.data.is_enable,
      });
    } else {
      onupdate(product.id, {
        group_id: form.data.group_id,
        name: form.data.name,
        barcode: form.data.barcode,
        description: form.data.description,
        image_url: form.data.image_url,
        product_price: form.data.price,
        sale_price: form.data.price,
        is_enable: form.data.is_enable,
      });
    }
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <div class="m-4 flex justify-center">
    <Image class="mx-auto h-32 w-32 border object-contain" src={form.data.image_url} alt={form.data.name} />
  </div>
  <form id={form.id} {onsubmit} class="space-y-4 rounded-md border border-neutral-light p-2 text-sm">
    <SelectIDField
      id="group_id"
      label={$t('product.field.group')}
      bind:value={form.data.group_id}
      error={form.errors['group_id']}
      options={groupOptions}
      unselected={0}
    />

    <TextInputField
      id="name"
      label={$t('product.field.name')}
      bind:value={form.data.name}
      error={form.errors['name']}
    />

    <TextInputField
      id="barcode"
      label={$t('product.field.barcode')}
      bind:value={form.data.barcode}
      error={form.errors['barcode']}
    />

    <TextInputField
      id="description"
      label={$t('product.field.description')}
      bind:value={form.data.description}
      error={form.errors['description']}
    />

    <TextInputField
      id="image_url"
      label={$t('product.field.image_url')}
      bind:value={form.data.image_url}
      error={form.errors['image_url']}
    />

    <NumberInputField
      id="price"
      label={$t('product.field.price')}
      bind:value={form.data.price}
      error={form.errors['price']}
    />
    <ToggleField
      id="is_enable"
      label={$t('product.field.status')}
      bind:value={form.data.is_enable}
      labelOn={$t('product.status-on')}
      labelOff={$t('product.status-off')}
    />
  </form>

  <div class="mt-4 flex justify-end space-x-4">
    <Button color="secondary" type="submit" form={form.id} disabled={form.invalid}>{$t('common.button.save')}</Button>
    <Button color="warning" outline {onclick}>{$t('common.button.cancel')}</Button>
  </div>
</div>
