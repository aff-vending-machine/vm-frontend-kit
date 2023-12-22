import Status from './(components)/table/Status.svelte';
import Title from './(components)/table/Title.svelte';

import type { ColumnType } from '$lib/components/elements/tables/table';

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
