<script lang="ts">
  import type { CatalogProduct } from '$types/catalog_product';

  export let source: CatalogProduct;
</script>

<div class="mx-4 flex flex-col justify-center">
  <span class="font-thin text-gray-400"
    ><sup class="mr-2 lg:hidden">[{source.group?.name}]</sup><sup>{source.sku}</sup></span
  >
  <span class="">{source.name}</span>
</div>
