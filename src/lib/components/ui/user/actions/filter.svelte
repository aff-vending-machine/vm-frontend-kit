<script lang="ts">
  import ShareFilterSelection from '$lib/components/shares/ShareFilterSelection.svelte';
  import type { AccountRoleEntity } from '$lib/types/account_role';
  import { viewOptions, type SelectOptionsType } from '$lib/utils/options';

  let { perPage, roleID, roleOptions } = $props<{
    perPage: number;
    roleID: number;
    roleOptions: SelectOptionsType<number, AccountRoleEntity>[];
  }>();
</script>

<div class="mb-4 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
  <ShareFilterSelection key="per_page" label="View" options={viewOptions} value={perPage} />
  <ShareFilterSelection
    key="role_id"
    label="Role"
    options={roleOptions}
    value={roleID}
    unselected={0}
    placeholder="All"
  />
</div>
