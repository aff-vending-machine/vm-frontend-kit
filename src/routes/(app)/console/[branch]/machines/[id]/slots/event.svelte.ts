import { selector, act } from './store';

import { invalidateAll } from '$app/navigation';
import { MachineService } from '$lib/services/machine';
import { MachineSlotService } from '$lib/services/machine_slot';
import alert from '$lib/stores/alert';
import type { BulkUpdateMachineSlot, MachineSlot } from '$lib/types/machine_slot';

const machineAPI = MachineService.getInstance();
const slotAPI = MachineSlotService.getInstance();
let refresh = $state(false);

export const handle = {
  select: (data: MachineSlot) => {
    selector.select('edit', data);
  },
  adjust: (draft: MachineSlot[], id: number, stock: number) => {
    const idx = draft.findIndex(d => d.id === id);
    draft[idx].stock = stock;
  },
  create: (draft: MachineSlot[], id: number, data: MachineSlot) => {
    selector.reset();
    const idx = draft.findIndex(d => d.id === id);
    draft[idx] = { ...draft[idx], ...data };
  },
  update: (draft: MachineSlot[], id: number, data: MachineSlot) => {
    selector.reset();
    const idx = draft.findIndex(d => d.id === id);
    draft[idx] = { ...draft[idx], ...data };
  },
  delete: async (draft: MachineSlot[], id: number) => {
    selector.reset();
    const idx = draft.findIndex(d => d.id === id);
    delete draft[idx];
  },
  cancel: () => {
    selector.reset();
  },
  refresh: async (machineID: number) => {
    const err = await act.mutate(() => slotAPI.fetch(machineID));
    if (err) {
      alert.add('error', err);
    } else {
      alert.add('success', `Refresh slots is successful`);
      refresh = true;
      invalidateAll();
    }
  },
  save: async (machineID: number, draft: BulkUpdateMachineSlot) => {
    const err = await act.mutate(() => slotAPI.bulkUpdate(machineID, draft));
    if (err) {
      alert.add('error', `Update slots is failure`);
    } else {
      alert.add('success', `Update slots is successful`);
      refresh = true;
      invalidateAll();
    }
  },
};

export const call = {
  slots: async (branchID: number, machineID: number) => {
    const query = new URLSearchParams();

    if (branchID > 0) query.set('branch_id', branchID.toString());
    query.set('preloads', 'Product');
    query.sort();

    return await slotAPI.find(machineID, query.toString(), true);
  },
  //
  machine: async (machineID: number) => {
    const result = await machineAPI.findByID(machineID, undefined, !refresh);
    refresh = false;
    return result;
  },
};
