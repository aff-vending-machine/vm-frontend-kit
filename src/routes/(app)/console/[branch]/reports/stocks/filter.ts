import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import useFilter from '$lib/stores/useFilter';
import { parseBoolean, parseDate } from '$lib/utils/convert';
import { defaultForm, defaultTo } from '$lib/utils/generate';

type FilterType = {
  machineId: number;
  group: boolean;
  from: Date;
  to: Date;
};

export const filter = useFilter<FilterType>({
  machineId: 0,
  group: true,
  from: defaultForm,
  to: defaultTo,
});

export const bindFilter = (machines: number[], call: (id: number) => Promise<void>) => {
  return page.subscribe(async p => {
    const searchParams = get(page).url.searchParams;

    const currentGroup = parseBoolean(searchParams.get('group'));
    const currentFrom = parseDate(searchParams.get('from'), defaultForm);
    const currentTo = parseDate(searchParams.get('to'), defaultTo);

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
      group: currentGroup,
      from: currentFrom,
      to: currentTo,
    }));

    return p;
  });
};
