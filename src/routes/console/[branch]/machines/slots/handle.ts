import { selector, draft } from './store';

import { MachineSlotService } from '$lib/services/machine_slot';
import { SyncService } from '$lib/services/sync';
import type { MachineSlot } from '$types/machine_slot';

const slotAPI = MachineSlotService.getInstance();
const syncAPI = SyncService.getInstance();

export const handle = {
  select: (e: CustomEvent) => {
    const { data } = e.detail;
    selector.select('edit', data);
  },
  adjust: (e: CustomEvent) => {
    const { id, stock } = e.detail;
    draft.update(s => {
      const idx = s.findIndex((s: MachineSlot) => s.id === id);
      s[idx].stock = stock;
      return s;
    });
  },
  update: (e: CustomEvent) => {
    const updated = e.detail;
    draft.update(s => {
      const idx = s.findIndex((s: MachineSlot) => s.id === updated.id);
      s[idx] = { ...s[idx], ...updated };
      return s;
    });
    selector.reset();
  },
  delete: async (e: CustomEvent) => {
    try {
      const { machineId, id } = e.detail;
      await slotAPI.deleteByID(machineId, id);
    } catch (error) {
      console.log(error);
    } finally {
      selector.reset();
    }
  },
  cancel: () => {
    selector.reset();
  },
  refresh: async (e: CustomEvent) => {
    try {
      const { machineId } = e.detail;
      await syncAPI.fetchSlots(machineId);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  },
  save: (e: CustomEvent) => {
    console.log('save');
    console.log(e.detail);
  },
  reset: (e: CustomEvent) => {
    console.log('reset');
    console.log(e.detail);
  },
};
