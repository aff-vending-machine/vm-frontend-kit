import type { ColumnType } from '$lib/components/elements/tables/table';
import { Status, Title } from '$lib/components/ui/group/tables';
import { Actions } from '$lib/components/ui/product/tables';

export const columns: ColumnType[] = [
  {
    key: 'name',
    title: 'name',
    type: 'component',
    sortable: true,
    render: () => Title,
  },
  {
    key: 'description',
    title: 'description',
    type: 'string',
  },
  {
    key: 'status',
    title: 'status',
    type: 'component',
    sortable: true,
    render: () => Status,
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
