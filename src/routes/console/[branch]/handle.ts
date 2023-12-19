import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const handle = {
  changeBranch: (e: Event) => {
    const newBranch = (e.target as HTMLSelectElement).value;
    const p = get(page);
    const url = p.route.id?.replace('[branch]', newBranch);
    goto(`${url}?${p.url.searchParams.toString()}`);
  },
};
