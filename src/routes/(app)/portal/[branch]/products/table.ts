import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions, Title } from '$lib/components/ui/product/tables';

export const columns: ColumnType[] = [
  {
    key: 'image_url',
    title: 'image',
    type: 'image',
    align: 'center',
    width: '64px',
    responsive: 'tablet|desktop',
  },
  {
    key: 'sku',
    title: 'SKU',
    type: 'string',
    responsive: 'tablet|desktop',
    sortable: true,
  },
  {
    key: 'name',
    title: 'name',
    type: 'component',
    sortable: true,
    render: () => Title,
  },
  {
    key: 'description',
    title: 'description',
    type: 'string',
    responsive: 'desktop',
    sortable: true,
  },
  {
    key: 'sale_price',
    title: 'price',
    type: 'string',
    sortable: true,
  },
  {
    key: '',
    title: 'more',
    type: 'component',
    responsive: 'tablet|desktop',
    width: '64px',
    render: () => Actions,
  },
];
