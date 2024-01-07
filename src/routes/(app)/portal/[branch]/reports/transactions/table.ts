import type { ColumnType } from '$lib/components/elements/tables/table';
import { Cart, Reference } from '$lib/components/ui/reports/transaction/tables';
import type { TranslationType } from '$lib/i18n/translations';

export const reportColumns: (t: TranslationType) => ColumnType[] = (t: TranslationType) => [
  {
    key: 'merchant_order_id',
    type: 'string',
    title: t('report.columns.order-id'),
    sortable: true,
  },
  {
    key: 'payment_channel',
    type: 'string',
    responsive: 'tablet',
    title: t('report.columns.payment-channel'),
    sortable: true,
  },
  {
    key: 'confirmed_paid_at',
    type: 'date',
    title: t('report.columns.timestamp'),
    sortable: true,
    responsive: 'tablet|desktop',
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
    key: 'cart',
    type: 'component',
    title: t('report.columns.cart'),
    responsive: 'desktop',
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
