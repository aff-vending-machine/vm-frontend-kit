<script lang="ts">
  import type { CatalogProductEntity } from '$lib/types/catalog_product';
  import Icon from '@iconify/svelte';

  let { source, onaction } = $props<{
    index: number;
    source: CatalogProductEntity;
    onaction: (mode: 'viewer' | 'editor' | 'eraser', source: CatalogProductEntity) => void;
  }>();

  function onAction(mode: 'viewer' | 'editor' | 'eraser') {
    return (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onaction(mode, source);
    };
  }
</script>

<div class="flex justify-center space-x-1">
  <button onclick={onAction('viewer')}>
    <Icon icon="mdi:search" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
  <button onclick={onAction('editor')}>
    <Icon icon="mdi:edit" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
  <button onclick={onAction('eraser')}>
    <Icon icon="mdi:delete" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
</div>
