<script lang="ts">
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';

  let { source } = $props<{
    index: number;
    source: CatalogGroupEntity;
  }>();
</script>

<div class="flex flex-col justify-center">
  <span class="text-lg">
    {source.name}
    <sub class="text-xs">({source.products?.length || 0})</sub>
  </span>
</div>
