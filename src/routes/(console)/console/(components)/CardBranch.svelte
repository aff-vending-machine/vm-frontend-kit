<script lang="ts">
  import type { Branch } from '$lib/services/branch';
  import type { Machine } from '$lib/services/machine';
  import selector from '$lib/stores/selector';
  import { actions } from '../@actions';

  export let branches: Branch[];
  export let machines: Machine[];
</script>

{#each branches as branch}
  <button
    class="w-full cursor-pointer rounded-lg border border-gray-500 p-4 text-left shadow-gray-500 hover:shadow-xl"
    class:bg-white={branch.id !== $selector.branch?.id}
    class:bg-green-200={branch.id === $selector.branch?.id}
    class:shadow-inner={branch.id === $selector.branch?.id}
    on:click={actions.selectBranch(branch)}
  >
    <h4 class="text-lg">{branch.name}</h4>
    <div class="text-ellipsis whitespace-nowrap">
      <p class="text-sm text-gray-500">Location: {branch.location}</p>
      <p class="text-sm text-gray-500">
        Total Machiens: {machines.filter(m => branch.id === m.branch_id).length}
      </p>
    </div>
  </button>
{/each}
