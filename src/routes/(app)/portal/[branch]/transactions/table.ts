import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions } from '$lib/components/ui/product/tables';

export const columns: ColumnType[] = [
  {
    key: 'id',
    title: 'id',
    type: 'string',
    sortable: true,
  },
  {
    key: 'actions',
    title: 'actions',
    type: 'component',
    render: () => Actions,
  },
];
