import type { ColumnType } from '$components/elements/tables/@table';
import Status from './Status.svelte';
import Title from './Title.svelte';
import Actions from './Actions.svelte';

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
    responsive: 'tablet',
    render: () => Status,
  },
  {
    key: 'actions',
    title: 'actions',
    type: 'component',
    sortable: true,
    render: () => Actions,
  },
];
