<!-- GroupViewer -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';
  import { t } from '$lib/i18n/translations';
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';

  let { group, onedit, ondelete, oncancel } = $props<{
    group: CatalogGroupEntity;
    onedit: (data: CatalogGroupEntity) => void;
    ondelete: (data: CatalogGroupEntity) => void;
    oncancel: () => void;
  }>();

  function onEdit(e: MouseEvent) {
    e.preventDefault();
    onedit(group);
  }

  function onDelete(e: MouseEvent) {
    e.preventDefault();
    ondelete(group);
  }

  function onCancel(e: MouseEvent) {
    e.preventDefault();
    oncancel();
  }
</script>

<div class="mr-2 h-full overflow-y-auto">
  <div class="flex flex-wrap">
    <div class="w-full space-y-1 md:w-2/3 md:pl-4">
      <p class="text-neutral-dark">{$t('group.field.description')}: {group.description || '-'}</p>
      <p class="text-neutral-dark">
        {$t('group.field.products')}: {#if !group.products}-{/if}
      </p>
      {#if group.products}
        {#each group.products as product (product.id)}
          <p class="ml-2 font-mono text-xs">- ({product.sku}) {product.name}</p>
        {/each}
      {/if}
      <p class="mt-1 text-neutral-dark">
        {$t('group.field.status')}:
        {#if group.is_enable}
          <span class="text-success">{$t('group.status-on')}</span>
        {:else}
          <span class="text-danger">{$t('group.status-off')}</span>
        {/if}
      </p>
    </div>
  </div>

  <div class="mt-8 flex flex-wrap-reverse justify-between">
    <div class="flex space-x-2 p-2">
      <ButtonLink color="accent" outline href="/portal/all/products?group_id={group.id}">
        {$t('common.button.products')}
      </ButtonLink>
    </div>
    <div class="flex space-x-2 p-2">
      <Button color="secondary" onclick={onEdit}>{$t('common.button.edit')}</Button>
      <Button color="danger" onclick={onDelete}>{$t('common.button.delete')}</Button>
      <Button color="warning" outline onclick={onCancel}>{$t('common.button.cancel')}</Button>
    </div>
  </div>
</div>
