import Actions from './(components)/table/Actions.svelte';
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
    key: 'branch.name',
    title: 'branch',
    type: 'string',
    responsive: 'tablet|desktop',
    sortable: true,
  },
  {
    key: 'location',
    title: 'location',
    type: 'string',
    responsive: 'tablet|desktop',
    sortable: true,
  },
  {
    key: 'status',
    title: 'status',
    type: 'component',
    sortable: true,
    render: () => Status,
  },
  {
    key: 'actions',
    title: 'actions',
    type: 'component',
    render: () => Actions,
  },
];
