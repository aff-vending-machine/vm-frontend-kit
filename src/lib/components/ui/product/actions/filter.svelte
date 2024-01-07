<script lang="ts">
  import SelectIDFilter from '$lib/components/ui-common/filters/SelectIDFilter.svelte';
  import { viewOptions, type SelectOptionsType } from '$lib/utils/options';

  let { perPage, groupId, groupOptions } = $props<{
    perPage: number;
    groupId: number;
    groupOptions: SelectOptionsType<number>[];
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <SelectIDFilter key="per_page" label="view" options={viewOptions} value={perPage} />

  <SelectIDFilter
    key="group_id"
    label="Group"
    placeholder="All Groups"
    unselected={0}
    options={groupOptions}
    value={groupId}
  />
</div>
