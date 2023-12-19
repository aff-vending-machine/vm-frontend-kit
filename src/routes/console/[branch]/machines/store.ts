import useFilter from '$lib/stores/useFilter';
import { useSelector } from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import type { Machine } from '$types/machine';

type FilterType = {
  page: number;
  limit: number;
};

type ModeType = 'view' | 'edit' | 'delete';

export const act = useSWR<void>();
export const filter = useFilter<FilterType>({ page: 1, limit: 10 });
export const selector = useSelector<ModeType, Machine>();
