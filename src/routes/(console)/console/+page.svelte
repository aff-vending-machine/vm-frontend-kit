<script lang="ts">
  import selector from '$lib/stores/selector';
  import { actions } from './@actions.js';
  export let data;

  $: machines = data.machines.sort((a, b) => {
    if ($selector.branch?.id === a.branch_id && $selector.branch?.id !== b.branch_id) {
      return -1;
    } else if ($selector.branch?.id !== a.branch_id && $selector.branch?.id === b.branch_id) {
      return 1;
    } else {
      return 0;
    }
  });
</script>

<div class="flex flex-col space-y-4">
  <h2>Select a Branch:</h2>
  <div class="grid grid-cols-1 flex-wrap gap-4 lg:grid-cols-3 xl:grid-cols-4">
    <button
      class="w-full cursor-pointer rounded-lg border border-gray-500 bg-white p-4 text-left shadow-gray-500 hover:shadow-xl"
      on:click={actions.selectAllBranches()}
    >
      <h4 class="text-lg">All Branches</h4>
    </button>
    {#each data.branches as branch}
      <button
        class="w-full cursor-pointer rounded-lg border border-gray-500 bg-white p-4 text-left shadow-gray-500 hover:shadow-xl"
        class:bg-green-200={branch.id === $selector.branch?.id}
        on:click={actions.selectBranch(branch)}
      >
        <h4 class="text-lg">{branch.name}</h4>
        <p class="text-sm text-gray-500">Location: {branch.location}</p>
        <p class="text-sm text-gray-500">
          Total Machiens: {data.machines.filter(m => branch.id === m.branch_id).length}
        </p>
      </button>
    {/each}
  </div>
  <h2>Select a Machine:</h2>
  <div class="grid grid-cols-1 flex-wrap gap-4 lg:grid-cols-3 xl:grid-cols-4">
    <button
      class="w-full cursor-pointer rounded-lg border border-gray-500 bg-white p-4 text-left shadow-gray-500 hover:shadow-xl"
      on:click={actions.selectAllBranches()}
    >
      <h4 class="text-lg">All Machines</h4>
    </button>
    {#each machines as machine}
      <button
        class="w-full cursor-pointer rounded-lg border border-gray-500 p-4 text-left shadow-gray-500 hover:shadow-xl"
        on:click={actions.selectMachine(actions.findBranch(machine.branch_id, data.branches), machine)}
        class:bg-white={machine.branch_id === $selector.branch?.id}
        class:bg-gray-200={machine.branch_id !== $selector.branch?.id}
        class:bg-green-200={machine.id === $selector.machine?.id}
      >
        <h4 class="text-lg">{machine.name}</h4>
        <p class="text-sm text-gray-500">Location: {machine.location}</p>
      </button>
    {/each}
  </div>
</div>
