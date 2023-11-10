import type { ColumnType } from '$components/elements/tables/@table';
import Status from './(table)/Status.svelte';
import Title from './(table)/Title.svelte';

export const machineColumns: ColumnType[] = [
  {
    key: 'name',
    title: 'Name',
    type: 'component',
    render: () => Title,
  },
  {
    key: 'location',
    title: 'Location',
    type: 'string',
    responsive: 'tablet',
  },
  {
    key: 'type',
    title: 'Type',
    type: 'string',
    responsive: 'desktop',
  },
  {
    key: 'status',
    title: 'Status',
    type: 'component',
    responsive: 'tablet',
    render: () => Status,
  },
];
