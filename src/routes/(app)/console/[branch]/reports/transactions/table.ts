import Cart from './(components)/table/Cart.svelte';
import No from './(components)/table/No.svelte';
import Order from './(components)/table/Order.svelte';
import Reference from './(components)/table/Reference.svelte';

import type { ColumnType } from '$lib/components/elements/tables/table';
import type { TranslationType } from '$lib/i18n/translations';

export const reportColumns: (t: TranslationType) => ColumnType[] = (t: TranslationType) => [
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
