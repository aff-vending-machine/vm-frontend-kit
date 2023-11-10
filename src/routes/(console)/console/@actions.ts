import { goto } from '$app/navigation';
import type { Branch } from '$lib/services/branch';
import type { Machine } from '$lib/services/machine';
import selector from '$lib/stores/selector';

export const actions = {
  selectAllBranches: () => (_: MouseEvent) => {
    selector.clear();
    goto(`/admin/branches`);
  },
  selectBranch: (branch: Branch, isMatched: boolean) => (_: MouseEvent) => {
    if (isMatched) {
      goto(`/console/branches/${branch.id}`);
    } else {
      selector.selectBranch(branch);
    }
  },
  selectAllMachines: (branch_id: number) => (_: MouseEvent) => {
    selector.clear(true);
    goto(`/console/branches/${branch_id}`);
  },
  selectMachine: (branch: Branch, machine: Machine) => (_: MouseEvent) => {
    selector.selectBranch(branch);
    selector.selectMachine(machine);
    goto(`/console/machines/${machine.id}`);
  },
  findBranch: (id: number, branches: Branch[]) => {
    return branches.find(b => b.id === id)!;
  },
};
