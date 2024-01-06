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
    key: 'merchant_order_id',
    title: 'Order ID',
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
    key: 'machine.name',
    title: 'Machine',
    type: 'string',
    sortable: true,
  },
  {
    key: 'channel.name',
    title: 'Payment',
    type: 'string',
    sortable: true,
  },
  {
    key: 'ordered_at',
    title: 'Timestamp',
    type: 'date',
    sortable: true,
  },
  {
    key: 'paid_price',
    title: 'Price',
    type: 'number',
  },
  {
    key: 'order_status',
    title: 'Status',
    type: 'string',
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
