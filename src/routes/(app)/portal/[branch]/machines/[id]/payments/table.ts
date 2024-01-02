import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions } from '$lib/components/ui/payment/tables';

export const columns: ColumnType[] = [
  {
    key: 'channel',
    title: 'channel',
    type: 'string',
    sortable: true,
  },
  {
    key: 'vendor',
    title: 'vendor',
    type: 'string',
    responsive: 'tablet|desktop',
    sortable: true,
  },
  {
    key: 'host',
    title: 'host',
    type: 'string',
  },
  {
    key: 'actions',
    title: 'actions',
    type: 'component',
    render: () => Actions,
  },
];
