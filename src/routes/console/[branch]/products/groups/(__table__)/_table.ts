import Status from './Status.svelte';
import Title from './Title.svelte';

import type { ColumnType } from '$components/elements/tables/table';

export const columns: ColumnType[] = [
  {
    key: 'name',
    title: 'name',
    type: 'component',
    sortable: true,
    render: () => Title,
  },
  {
    key: 'status',
    title: 'status',
    type: 'component',
    sortable: true,
    render: () => Status,
  },
];
