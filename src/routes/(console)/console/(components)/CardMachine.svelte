<script lang="ts">
  import type { Branch } from '$lib/services/branch';
  import type { Machine } from '$lib/services/machine';
  import selector from '$lib/stores/selector';
  import { actions } from '../@actions';

  export let branches: Branch[];
  export let machines: Machine[];

  $: branch = (id: number) => actions.findBranch(id, branches);
  $: sortedMachines = machines.sort((a, b) => {
    if ($selector.branch?.id === a.branch_id && $selector.branch?.id !== b.branch_id) {
      return -1;
    } else if ($selector.branch?.id !== a.branch_id && $selector.branch?.id === b.branch_id) {
      return 1;
    } else {
      return 0;
    }
  });
</script>

{#each sortedMachines as machine}
  <button
    class="w-full cursor-pointer rounded-lg border border-gray-500 p-4 text-left shadow-gray-500 hover:shadow-xl"
    on:click={actions.selectMachine(branch(machine.branch_id), machine)}
    class:bg-white={machine.id !== $selector.machine?.id &&
      (!$selector.branch || machine.branch_id === $selector.branch?.id)}
    class:bg-gray-200={machine.branch_id !== $selector.branch?.id}
    class:bg-green-200={machine.id === $selector.machine?.id}
    class:shadow-inner={machine.id === $selector.machine?.id}
  >
    <h4 class="text-lg">{machine.name}</h4>
    <div class="overflow-hidden text-ellipsis whitespace-nowrap">
      <p class="text-sm text-gray-500">Branch: {branch(machine.branch_id)?.name}</p>
      <p class="text-sm text-gray-500">Locationzzzzzzzzz: {machine.location}</p>
    </div>
  </button>
{/each}
