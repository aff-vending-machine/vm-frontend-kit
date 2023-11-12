<script lang="ts">
  import type { CatalogGroup } from '$types/catalog_group';

  export let source: CatalogGroup;
</script>

{#if source.is_enable}
  <span class="rounded-full bg-green-500 px-3 py-2 text-xs text-white"> enable </span>
{:else}
  <span class="rounded-full bg-gray-500 px-3 py-2 text-xs text-white"> disable </span>
{/if}
