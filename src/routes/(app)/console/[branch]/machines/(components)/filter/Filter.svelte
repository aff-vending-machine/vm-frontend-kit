<script lang="ts">
  import ShareFilterSelection from '$lib/components/shares/ShareFilterSelection.svelte';
  import { viewOptions } from '$lib/utils/options';

  let { perPage } = $props<{
    perPage: number;
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ShareFilterSelection key="per_page" label="view" options={viewOptions} value={perPage} />
</div>
