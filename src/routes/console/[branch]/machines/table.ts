import Actions from './__components__/table/Actions.svelte';
import Status from './__components__/table/Status.svelte';
import Title from './__components__/table/Title.svelte';

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
    key: 'location',
    title: 'location',
    type: 'string',
    sortable: true,
  },
  {
    key: 'status',
    title: 'status',
    type: 'component',
    sortable: true,
    responsive: 'tablet',
    render: () => Status,
  },
  {
    key: 'actions',
    title: 'actions',
    type: 'component',
    render: () => Actions,
  },
];
