import { useSelector } from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import { createToggleStore } from '$lib/stores/useToggle';
import type { Machine } from '$lib/types/machine';

type ModeType = 'view' | 'edit' | 'delete';

export const act = useSWR<void>();
export const selector = useSelector<ModeType, Machine>();
export const cached = createToggleStore(true);
