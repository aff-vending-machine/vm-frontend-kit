import { writable } from 'svelte/store';

import useFilter from '$lib/stores/useFilter';
import useSelector from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import type { Machine } from '$lib/types/machine';
import type { MachineSlot } from '$lib/types/machine_slot';

export type ModeType = 'create' | 'edit' | 'delete';

export type FilterType = {
  machineId: number;
  search: string;
  stock: string;
  status: string;
  changed: string;
  image: string;
};

export const filter = useFilter<FilterType>({
  machineId: 0,
  search: '',
  stock: '',
  status: '',
  changed: '',
  image: '',
});
export const selector = useSelector<ModeType, MachineSlot>();
export const draft = writable<MachineSlot[]>([]);
export const actionState = useSWR<void>();
export const machineState = useSWR<Machine>();
export const slotsState = useSWR<MachineSlot[]>();
