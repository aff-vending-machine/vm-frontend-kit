import useSelector from '$lib/stores/useSelector';
import type { CatalogProduct } from '$lib/types/catalog_product';

type ModeType = 'view' | 'create' | 'edit' | 'delete';

export const selector = useSelector<ModeType, CatalogProduct>();
