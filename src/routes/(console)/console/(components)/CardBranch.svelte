<script lang="ts">
  import type { Branch } from '$lib/services/branch';
  import type { Machine } from '$lib/services/machine';
  import selector from '$lib/stores/selector';
  import { t } from '$lib/translations';
  import { actions } from '../@actions';

  export let branches: Branch[];
  export let machines: Machine[];
</script>

<button
  class="w-full cursor-pointer rounded-lg border-2 border-gray-700 bg-white p-4 text-left shadow-sm shadow-gray-500 hover:shadow-xl"
  on:click={actions.selectAllBranches()}
>
  <h4 class="text-lg">{$t('console.all-branches')}</h4>
</button>
<div class="col-span-1 lg:col-span-2 xl:col-span-3" />
{#each branches as branch}
  <button
    class="w-full cursor-pointer rounded-lg border border-gray-500 p-4 text-left shadow-gray-500 hover:shadow-xl"
    class:bg-white={branch.id !== $selector.branch?.id}
    class:bg-green-200={branch.id === $selector.branch?.id}
    class:shadow-inner={branch.id === $selector.branch?.id}
    on:click={actions.selectBranch(branch, branch.id === $selector.branch?.id)}
  >
    <h4 class="text-lg">{branch.name}</h4>
    <div class="text-ellipsis whitespace-nowrap">
      <p class="text-sm text-gray-500">{$t('console.location')}: {branch.location}</p>
      <p class="text-sm text-gray-500">
        {$t('console.total-machines')}: {machines.filter(m => branch.id === m.branch_id).length}
      </p>
    </div>
  </button>
{/each}
