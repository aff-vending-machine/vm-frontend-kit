import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import useFilter from '$lib/stores/useFilter';

export type FilterType = {
  machineId: number;
  search: string;
  stock: string;
  status: string;
  changed: string;
};

export const filter = useFilter<FilterType>({
  machineId: 0,
  search: '',
  stock: '',
  status: '',
  changed: '',
});

export const bindFilter = (machines: number[], call: (id: number) => Promise<void>) => {
  return page.subscribe(async p => {
    const searchParams = get(page).url.searchParams;

    let currentMachineId = parseInt(searchParams.get('machine_id') ?? '0');
    const currentSearch = searchParams.get('search') ?? '';
    const currentStock = searchParams.get('stock') ?? '';
    const currentStatus = searchParams.get('status') ?? '';
    const currentChanged = searchParams.get('changed') ?? '';

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
      search: currentSearch,
      stock: currentStock,
      status: currentStatus,
      changed: currentChanged,
    }));

    return p;
  });
};
