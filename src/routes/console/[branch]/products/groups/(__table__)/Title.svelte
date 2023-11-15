<script lang="ts">
  import type { CatalogProduct } from '$types/catalog_product';

  // ignored data
  export let index: number;
  $: _ = index;

  export let source: CatalogProduct;
</script>

<div class="mx-4 flex flex-col justify-center">
  <span class="">{source.name}</span>
  <span class="font-thin text-gray-400"><sub class="mr-2 lg:hidden">[{source.description}]</sub></span>
</div>
