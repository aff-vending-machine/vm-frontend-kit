<script lang="ts">
  import ShareFilterSelection from '$lib/components/shares/ShareFilterSelection.svelte';
  import { viewOptions, type SelectOptionsType } from '$lib/utils/options';

  let { perPage, groupId, groupOptions } = $props<{
    perPage: number;
    groupId: number;
    groupOptions: SelectOptionsType[];
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ShareFilterSelection key="per_page" label="view" options={viewOptions} value={perPage} />
  <ShareFilterSelection
    key="group_id"
    label="Group"
    placeholder="All Groups"
    unselected={0}
    options={groupOptions}
    value={groupId}
  />
</div>
