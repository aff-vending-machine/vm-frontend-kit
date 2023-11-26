import { get } from 'svelte/store';

import { selector } from './store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const handle = {
  action: (e: CustomEvent) => {
    const { mode, data } = e.detail;
    console.log(e.detail);
    selector.select(mode, data);
  },
  select: async (e: CustomEvent) => {
    const { value } = e.detail;
    const params = new URLSearchParams();
    params.set('machine_id', value.id.toString());

    await goto(`/console/${get(page).params.branch}/machines/slots?${params.toString()}`);
  },
  update: (e: CustomEvent) => {
    console.log(e.detail);
  },
  delete: (e: CustomEvent) => {
    console.log(e.detail);
  },
  close: () => {
    selector.reset();
  },
};
