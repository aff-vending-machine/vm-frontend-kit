import Actions from './__components__/table/Actions.svelte';
import Title from './__components__/table/Title.svelte';

import type { ColumnType } from '$components/elements/tables/table';

export const columns: ColumnType[] = [
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
    key: 'image_url',
    title: 'image',
    type: 'image',
    responsive: 'tablet|desktop',
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
