<script lang="ts">
  import ShareFilterSelection from '$components/shares/ShareFilterSelection.svelte';
  import { viewOptions } from '$lib/utils/options';

  export let limit: number;
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ShareFilterSelection key="limit" label="view" options={viewOptions} value={limit} />
</div>
