import { writable } from 'svelte/store';

import { MachineSlotService } from '$lib/services/machine_slot';
import { SyncService } from '$lib/services/sync';
import useSelector from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import type { Machine } from '$types/machine';
import type { MachineSlot } from '$types/machine_slot';

type Mode = 'edit';

export const request = useSWR();
export const selector = useSelector<Mode, MachineSlot>();
export const machineData = useSWR<Machine>();
export const slotsData = useSWR<MachineSlot[]>();
export const draft = writable<MachineSlot[]>([]);

const slotAPI = MachineSlotService.getInstance();
const syncAPI = SyncService.getInstance();

export const events = {
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
