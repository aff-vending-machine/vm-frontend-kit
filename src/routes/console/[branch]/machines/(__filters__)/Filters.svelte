<script lang="ts">
  import { page } from '$app/stores';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import { viewOptions } from '$lib/utils/options';
  import { goto } from '$app/navigation';
  import { filters } from './_filters';

  filters.limit = parseInt($page.url.searchParams.get('limit') || '10');

  function changeLimit(event: Event) {
    const newLimit = (event.target as HTMLSelectElement).value;
    const params = $page.url.searchParams;
    params.set('limit', newLimit);
    params.sort();
    goto(`?${params.toString()}`);
  }
</script>

<div class="mx-2 flex flex-col lg:flex-row">
  <SelectField id="view" label="view" value={filters.limit} options={viewOptions} on:change={changeLimit} />
</div>
