import { writable } from 'svelte/store';

import useFilter from '$lib/stores/useFilter';
import useSelector from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import type { Machine } from '$types/machine';
import type { MachineSlot } from '$types/machine_slot';

export type ModeType = 'create' | 'edit' | 'delete';

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
export const request = useSWR();
export const selector = useSelector<ModeType, MachineSlot>();
export const machineData = useSWR<Machine>();
export const slotsData = useSWR<MachineSlot[]>();
export const draft = writable<MachineSlot[]>([]);
