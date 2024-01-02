import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions } from '$lib/components/ui/product/tables';

export const columns: ColumnType[] = [
  {
    key: 'username',
    title: 'username',
    type: 'string',
    sortable: true,
  },
  {
    key: 'role.name',
    title: 'role',
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
