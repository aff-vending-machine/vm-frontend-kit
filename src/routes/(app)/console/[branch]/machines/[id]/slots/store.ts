import useSelector from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import type { MachineSlot } from '$lib/types/machine_slot';

export type ModeType = 'create' | 'edit' | 'delete';

export const selector = useSelector<ModeType, MachineSlot>();
export const act = useSWR<void>();
