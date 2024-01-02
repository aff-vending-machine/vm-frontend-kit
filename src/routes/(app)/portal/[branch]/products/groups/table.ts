import type { ColumnType } from '$lib/components/elements/tables/table';
import { Status, Title } from '$lib/components/ui/group/tables';

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
    render: () => Status,
  },
];
