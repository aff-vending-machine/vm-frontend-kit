import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import useFilter from '$lib/stores/useFilter';
import { parseDate } from '$lib/utils/convert';
import { defaultForm, defaultTo } from '$lib/utils/generate';

type FilterType = {
  id: number;
  machineId: number;
  channelId: number;
  from: Date;
  to: Date;
};

export const filter = useFilter<FilterType>({
  id: 0,
  machineId: 0,
  channelId: 0,
  from: defaultForm,
  to: defaultTo,
});

export const bindFilter = (machines: number[], call: (id: number) => Promise<void>) => {
  return page.subscribe(async p => {
    const searchParams = get(page).url.searchParams;

    const currentId = parseInt(searchParams.get('id') ?? '0');
    const currentChannelId = parseInt(searchParams.get('channel_id') ?? '0');
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
      id: currentId,
      machineId: currentMachineId,
      channelId: currentChannelId,
      from: currentFrom,
      to: currentTo,
    }));

    return p;
  });
};
