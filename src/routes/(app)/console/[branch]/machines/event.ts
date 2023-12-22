import { get } from 'svelte/store';

import { act, cached, selector } from './store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { MachineService } from '$lib/services/machine';
import alert from '$lib/stores/alert';

const machineAPI = MachineService.getInstance();

export const handle: any = {};
export const fetch: any = {};

handle.action = (e: CustomEvent) => {
  const { mode, data } = e.detail;
  selector.select(mode, data);
};

handle.select = async (e: CustomEvent) => {
  const { value } = e.detail;
  await goto(`/console/${get(page).params.branch}/machines/${value.id}/slots`);
};

handle.update = async (e: CustomEvent) => {
  const { id, data } = e.detail;
  const err = await act.mutate(() => machineAPI.updateByID(id, data));
  if (err) {
    alert.add('error', `Update "${data.name}" is failure`);
  } else {
    alert.add('success', `Update "${data.name}" is successful`);
    cached.disable();
  }
  selector.reset();
};

handle.delete = async (e: CustomEvent) => {
  const { id, data } = e.detail;
  const err = await act.call(() => machineAPI.deleteByID(id));
  if (err) {
    alert.add('error', `Delete "${data.name}" is failure`);
  } else {
    alert.add('success', `Delete "${data.name}" is successful`);
    cached.disable();
  }
  selector.reset();
};

handle.close = () => {
  selector.reset();
};

fetch.machines = async (branchID: number, query: URLSearchParams) => {
  if (!query.get('page')) query.set('page', '1');
  if (!query.get('per_page')) query.set('per_page', '10');
  if (branchID != 0) query.set('branch_id', branchID.toString());
  query.set('preloads', 'Branch');
  query.sort();

  const resp = await machineAPI.find(query.toString(), get(cached));

  cached.enable();

  return resp;
};
