<script lang="ts">
  import type { CatalogGroupEntity } from '$lib/types/catalog_group';

  let { source } = $props<{
    index: number;
    source: CatalogGroupEntity;
  }>();
</script>

{#if source.is_enable}
  <span class="rounded-full bg-success px-3 py-2 text-xs text-white"> enable </span>
{:else}
  <span class="rounded-full bg-neutral px-3 py-2 text-xs text-white"> disable </span>
{/if}
