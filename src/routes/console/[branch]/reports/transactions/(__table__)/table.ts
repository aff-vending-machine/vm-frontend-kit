import type { ColumnType } from '$components/elements/tables/@table';
import Cart from './Cart.svelte';
import No from './No.svelte';
import Order from './Order.svelte';
import Reference from './Reference.svelte';

export const reportColumns: (t: (key: string) => string) => ColumnType[] = (t: (key: string) => string) => [
  {
    key: 'index',
    type: 'component',
    title: t('report.columns.no'),
    responsive: 'desktop',
    render: () => No,
  },
  {
    key: 'merchant_order_id',
    type: 'component',
    title: t('report.columns.order-id'),
    responsive: 'mobile|tablet',
    sortable: true,
    render: () => Order,
  },
  {
    key: 'reference',
    type: 'component',
    title: t('report.columns.reference'),
    responsive: 'desktop',
    sortable: true,
    render: () => Reference,
  },
  {
    key: 'confirmed_paid_at',
    type: 'date',
    title: t('report.columns.timestamp'),
    sortable: true,
    responsive: 'tablet|desktop',
  },
  {
    key: 'cart',
    type: 'component',
    title: t('report.columns.cart'),
    responsive: 'tablet|desktop',
    sortable: true,
    render: () => Cart,
  },
  {
    key: 'received_quantity',
    title: t('report.columns.quantity'),
    type: 'number',
    responsive: 'mobile',
  },
  {
    key: 'paid_price',
    title: t('report.columns.paid-price'),
    sortable: true,
    type: 'currency',
  },
];
