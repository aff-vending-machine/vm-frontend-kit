import { goto } from '$app/navigation';
import selector from '$lib/stores/selector.js';

export async function load({ parent }) {
  const data = await parent();

  selector.reload(data.branches, data.machines);

  if (data.machines.length === 1) {
    const machine = data.machines[0];
    const branch = data.branches.find(b => b.id === machine.branch_id)!;
    selector.selectMachine(machine);
    selector.selectBranch(branch);
    goto(`/console/machines/${machine.id}`);
  }

  if (data.branches.length === 1) {
    const branch = data.branches[0];
    selector.selectBranch(branch);
    goto(`/console/branches/${branch.id}`);
  }

  return {
    machines: data.machines,
    branches: data.branches,
  };
}
