import { get } from 'svelte/store';

import { act, selector } from './store';
import type { ModeType } from './store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { MachineService } from '$lib/services/machine';
import alert from '$lib/stores/alert';
import type { Entity } from '$lib/types/common';
import type { Machine } from '$lib/types/machine';

const machineAPI = MachineService.getInstance();
let refresh = $state(false);

export const handle = {
  //
  action: (mode: string, data: Entity) => {
    selector.select(mode as ModeType, data as Machine);
  },
  //
  select: async (id: number) => {
    await goto(`/console/${get(page).params.branch}/machines/${id}/slots`);
  },
  //
  update: async (id: number, data: Record<string, any>) => {
    const err = await act.mutate(() => machineAPI.updateByID(id, data));
    if (err) {
      alert.add('error', `Update "${data.name}" is failure`);
    } else {
      alert.add('success', `Update "${data.name}" is successful`);
      refresh = true;
    }
    selector.reset();
  },
  //
  delete: async (id: number, data: Record<string, any>) => {
    const err = await act.call(() => machineAPI.deleteByID(id));
    if (err) {
      alert.add('error', `Delete "${data.name}" is failure`);
    } else {
      alert.add('success', `Delete "${data.name}" is successful`);
      refresh = true;
    }
    selector.reset();
  },
  //
  close: () => {
    selector.reset();
  },
};

export const call = {
  machines: async (branchID: number, query: URLSearchParams) => {
    if (!query.get('page')) query.set('page', '1');
    if (!query.get('per_page')) query.set('per_page', '10');
    if (branchID != 0) query.set('branch_id', branchID.toString());
    query.set('preloads', 'Branch');
    query.sort();

    const resp = await machineAPI.find(query.toString(), !refresh);
    refresh = false;

    return resp;
  },
};
