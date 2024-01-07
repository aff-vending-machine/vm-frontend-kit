import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions } from '$lib/components/ui/user/tables';

export const columns: ColumnType[] = [
  {
    key: 'username',
    title: 'Username',
    type: 'string',
    sortable: true,
  },
  {
    key: 'role.name',
    title: 'Role',
    type: 'string',
    sortable: true,
  },
  {
    key: 'branch.name',
    title: 'Branch',
    type: 'string',
    sortable: true,
  },
  {
    key: 'created_by',
    title: 'Created By',
    type: 'string',
    responsive: 'tablet|desktop',
    sortable: true,
  },
  {
    key: 'last_login',
    title: 'Last Login',
    type: 'date',
    responsive: 'desktop',
    sortable: true,
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
