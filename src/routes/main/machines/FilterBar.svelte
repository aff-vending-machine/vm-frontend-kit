<script lang="ts">
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import { requestRole } from '$lib/utils/role';
  import access from '$lib/stores/access';
  import type { FilterType } from './@filters';
  import type { SelectOptionsType } from '$lib/utils/options';

  type OptionsType = {
    branches: SelectOptionsType[];
    views: SelectOptionsType[];
  };

  export let filters: FilterType;
  export let options: OptionsType;
</script>

<div class="w-full border-b-2">
  <div class="m-4 flex flex-col">
    <h3 class="mb-2 text-lg font-semibold">Filter</h3>
    <div
      class="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
    >
      {#if requestRole($access?.role, 'admin')}
        <SelectField
          id="branch_id"
          label="branch"
          bind:value={filters.branch_id}
          options={options.branches}
          unselected
          placeholder="No Filter"
        />
      {/if}
      <SelectField id="limit" label="limit" bind:value={filters.limit} options={options.views} />
    </div>
  </div>
</div>
