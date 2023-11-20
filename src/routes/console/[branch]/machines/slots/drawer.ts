import useSelector from '$lib/stores/useSelector';
import type { MachineSlot } from '$types/machine_slot';

export const filter = useSelector<MachineSlot>();
