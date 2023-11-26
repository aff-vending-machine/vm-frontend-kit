import useFilter from '$lib/stores/useFilter';
import useSelector from '$lib/stores/useSelector';
import type { CatalogProduct } from '$types/catalog_product';

type FilterType = {
  page: number;
  limit: number;
  groupId: number;
};

type ModeType = 'view' | 'create' | 'edit' | 'delete';

export const filter = useFilter<FilterType>({ page: 1, limit: 10, groupId: 0 });
export const selector = useSelector<ModeType, CatalogProduct>();
