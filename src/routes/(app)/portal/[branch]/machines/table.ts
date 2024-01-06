import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions, Channels, Status, Temperature, Title } from '$lib/components/ui/machine/tables';

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
    responsive: 'desktop',
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
    responsive: 'tablet|desktop',
    sortable: true,
    render: () => Status,
  },
  {
    key: 'temperature',
    title: 'Temperature',
    type: 'component',
    render: () => Temperature,
  },
  {
    key: 'channels',
    title: 'channels',
    type: 'component',
    render: () => Channels,
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
