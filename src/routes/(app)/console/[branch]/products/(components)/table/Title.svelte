<script lang="ts">
  import type { CatalogProduct } from '$lib/types/catalog_product';

  // ignored data
  export let index: number;
  $: _ = index;

  export let source: CatalogProduct;
</script>

<div class="mx-4 flex flex-col justify-center">
  <span class="font-thin text-gray-400">
    <sup class="mr-2 sm:hidden">[{source.group?.name}]</sup>
    <sup>{source.sku}</sup>
  </span>
  <span class="">{source.name}</span>
</div>
