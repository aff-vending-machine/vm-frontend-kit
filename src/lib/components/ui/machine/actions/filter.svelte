<script lang="ts">
  import ShareViewerMode from '$lib/components/shares/ShareViewerMode.svelte';
  import SelectIDFilter from '$lib/components/ui-common/filters/SelectIDFilter.svelte';
  import { viewOptions } from '$lib/utils/options';

  let { perPage, table } = $props<{
    perPage: number;
    table: boolean;
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
  <SelectIDFilter key="per_page" label="view" options={viewOptions} value={perPage} />
  <ShareViewerMode key="table" label="mode" value={table} />
</div>
