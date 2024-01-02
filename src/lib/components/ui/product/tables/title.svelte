<script lang="ts">
  import type { CatalogProductEntity } from '$lib/types/catalog_product';

  let { source } = $props<{
    index: number;
    source: CatalogProductEntity;
  }>();
</script>

<div class="flex flex-col justify-center">
  <sup class="text-xs">({source.group?.name})</sup>
  <span class="text-lg">
    {source.name}
  </span>
</div>
