import { get } from 'svelte/store';

import { selector, draft, slotsState, actionState, filter } from './store';

import { invalidateAll } from '$app/navigation';
import { MachineSlotService } from '$lib/services/machine_slot';
import { SyncService } from '$lib/services/sync';
import alert from '$lib/stores/alert';
import { clone } from '$lib/utils/generate';

const slotAPI = MachineSlotService.getInstance();
const syncAPI = SyncService.getInstance();

export const handle = {
  select: (e: CustomEvent) => {
    const { data } = e.detail;
    selector.select('edit', data);
  },
  adjust: (e: CustomEvent) => {
    const { id, stock } = e.detail;
    draft.update(d => {
      const idx = d.findIndex(s => s.id === id);
      d[idx].stock = stock;
      return d;
    });
  },
  create: (e: CustomEvent) => {
    selector.reset();
    const { id, data } = e.detail;
    draft.update(d => {
      const idx = d.findIndex(s => s.id === id);
      d[idx] = { ...d[idx], ...data };
      return [...d];
    });
  },
  update: (e: CustomEvent) => {
    selector.reset();
    const { id, data } = e.detail;
    draft.update(d => {
      const idx = d.findIndex(s => s.id === id);
      d[idx] = { ...d[idx], ...data };
      console.log(d[idx]);

      return [...d];
    });
  },
  delete: async (e: CustomEvent) => {
    selector.reset();
    const { id } = e.detail;
    draft.update(d => {
      const idx = d.findIndex(s => s.id === id);
      delete d[idx];
      return [...d];
    });
  },
  cancel: () => {
    selector.reset();
  },
  refresh: async () => {
    const machineId = get(filter).machineId;
    const err = await actionState.mutate(() => syncAPI.fetchSlots(machineId));
    if (err) {
      alert.add('error', err);
    } else {
      alert.add('success', `Refresh slots is successful`);
      invalidateAll();
    }
  },
  save: async () => {
    const machineId = get(filter).machineId;
    const data = get(draft);
    const err = await actionState.mutate(() => slotAPI.bulkUpdate(machineId, data));
    if (err) {
      alert.add('error', `Update slots is failure`);
    } else {
      alert.add('success', `Update slots is successful`);
      invalidateAll();
    }
  },
  reset: () => {
    draft.set(clone(get(slotsState).data));
  },
};
