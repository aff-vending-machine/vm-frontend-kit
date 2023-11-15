import { SELECT_BRANCH_ID, SELECT_MACHINE_ID } from '$lib/constants';
import { storage } from '$lib/utils/local-storage';
import type { StoreBranch } from '$types/store_branch';
import type { Machine } from '$types/machine';
import { writable, type Writable } from 'svelte/store';

export type SelectorData = {
  branch?: StoreBranch;
  machine?: Machine;
};

const selector: Writable<SelectorData> = writable({});

function clear(onlyMachine = false) {
  if (!onlyMachine) storage(SELECT_BRANCH_ID, null);
  storage(SELECT_MACHINE_ID, null);

  selector.update(s => {
    return {
      branch: onlyMachine ? s.branch : undefined,
      machine: undefined,
    };
  });
}

function reload(branches: StoreBranch[], machines: Machine[]) {
  const bid = storage(SELECT_BRANCH_ID);
  const mid = storage(SELECT_MACHINE_ID);

  try {
    if (bid) {
      const id = parseInt(bid);
      const branch = branches.find(b => b.id === id);
      if (!branch) {
        return clear();
      }
      selectBranch(branch);
    }
    if (mid) {
      const id = parseInt(mid);
      const machine = machines.find(m => m.id === id);
      if (!machine) {
        return clear();
      }
      selectMachine(machine);
    }
  } catch (e) {
    console.log(e);
    clear();
  }
}

function selectBranch(branch: StoreBranch) {
  storage(SELECT_BRANCH_ID, branch.id.toString());
  selector.update(s => ({ ...s, branch }));
}

function selectMachine(machine: Machine) {
  storage(SELECT_MACHINE_ID, machine.id.toString());
  selector.update(s => ({ ...s, machine }));
}

export default { reload, clear, selectBranch, selectMachine, ...selector };
