<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SelectFilter from '$lib/components/ui-common/filters/SelectFilter.svelte';
  import SelectField from '$lib/components/ui-common/forms/SelectField.svelte';
  import { viewOptions, type SelectOptionsType } from '$lib/utils/options';

  let { perPage, groupId, groupOptions } = $props<{
    perPage: number;
    groupId: number;
    groupOptions: SelectOptionsType[];
  }>();

  async function changeValue(event: Event) {
    const newValue = (event.target as HTMLSelectElement).value;
    const params = new URLSearchParams($page.url.searchParams);
    params.delete('page');

    if (newValue === '0' || newValue === '') params.delete('group_id');
    else params.set('group_id', newValue);
    params.sort();

    await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
  }
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <SelectFilter key="per_page" label="view" options={viewOptions} value={perPage} />

  <SelectField
    id="group_id"
    label="Group"
    placeholder="All Groups"
    unselected={0}
    options={groupOptions}
    value={groupId}
    on:change={changeValue}
  />
</div>
