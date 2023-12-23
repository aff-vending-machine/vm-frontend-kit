import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const handle = {
  change: (e: Event) => {
    const newBranch = (e.target as HTMLSelectElement).value;
    const p = get(page);
    const url = p.route.id?.replace('/(app)/', '/').replace('[branch]', newBranch);
    goto(`${url}?${p.url.searchParams.toString()}`);
  },
};
