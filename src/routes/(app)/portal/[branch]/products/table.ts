import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions, Title } from '$lib/components/ui/product/tables';

export const columns: ColumnType[] = [
  {
    key: 'image_url',
    title: 'image',
    type: 'image',
    align: 'center',
    width: '40px',
    responsive: 'tablet|desktop',
  },
  {
    key: 'group.name',
    title: 'group',
    type: 'string',
    sortable: true,
    responsive: 'tablet',
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
    sortable: true,
  },
  {
    key: 'sale_price',
    title: 'price',
    type: 'currency',
    sortable: true,
  },
  {
    key: 'actions',
    title: 'actions',
    type: 'component',
    render: () => Actions,
  },
];
