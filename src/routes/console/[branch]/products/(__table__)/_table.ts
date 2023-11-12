import type { ColumnType } from '$components/elements/tables/@table';
import Title from '../(__table__)/Title.svelte';

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
    responsive: 'tablet',
  },
  {
    key: 'price',
    title: 'price',
    type: 'currency',
    sortable: true,
  },
];
