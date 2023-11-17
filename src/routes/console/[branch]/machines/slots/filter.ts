import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import useFilter from '$lib/stores/useFilter';

type FilterType = {
  machineId: number;
};

export const filter = useFilter<FilterType>({
  machineId: 0,
});

export const bindFilter = (machines: number[], call: (id: number) => Promise<void>) => {
  return page.subscribe(async p => {
    const searchParams = get(page).url.searchParams;

    let currentMachineId = parseInt(searchParams.get('machine_id') ?? '0');
    if (currentMachineId === 0 || !machines.includes(currentMachineId)) {
      currentMachineId = machines[0];

      const params = new URLSearchParams(searchParams);
      params.set('machine_id', currentMachineId.toString());
      params.sort();

      await goto(`?${params.toString()}`, { keepFocus: true, invalidateAll: true });
    } else {
      await call(currentMachineId);
    }

    filter.update(() => ({
      machineId: currentMachineId,
    }));

    return p;
  });
};
