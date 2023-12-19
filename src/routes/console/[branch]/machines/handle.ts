import { get } from 'svelte/store';

import { act, selector } from './store';

import { goto, invalidateAll } from '$app/navigation';
import { page } from '$app/stores';
import { MachineService } from '$lib/services/machine';
import alert from '$lib/stores/alert';

const machineAPI = MachineService.getInstance();

export const handle = {
  action: (e: CustomEvent) => {
    const { mode, data } = e.detail;
    selector.select(mode, data);
  },
  select: async (e: CustomEvent) => {
    const { value } = e.detail;
    const params = new URLSearchParams();
    params.set('machine_id', value.id.toString());

    await goto(`/console/${get(page).params.branch}/machines/slots?${params.toString()}`);
  },
  update: async (e: CustomEvent) => {
    selector.reset();
    const { id, data } = e.detail;
    const err = await act.mutate(() => machineAPI.updateByID(id, data));
    if (err) {
      alert.add('error', `Update "${data.name}" is failure`);
    } else {
      alert.add('success', `Update "${data.name}" is successful`);
      invalidateAll();
    }
  },
  delete: async (e: CustomEvent) => {
    selector.reset();
    const { id, data } = e.detail;
    const err = await act.mutate(() => machineAPI.deleteByID(id));
    if (err) {
      alert.add('error', `Delete "${data.name}" is failure`);
    } else {
      alert.add('success', `Delete "${data.name}" is successful`);
      invalidateAll();
    }
  },
  close: () => {
    selector.reset();
  },
};
