import type { ColumnType } from '$lib/components/elements/tables/table';
import { No, Product, Summary } from '$lib/components/ui/reports/stock/tables';
import type { TranslationType } from '$lib/i18n/translations';

export const reportColumns: (t: TranslationType) => ColumnType[] = (t: TranslationType) => [
  {
    key: 'index',
    type: 'component',
    title: t('report.columns.no'),
    responsive: 'tablet|desktop',
    render: () => No,
  },
  {
    key: 'code',
    type: 'component',
    title: t('report.columns.machine-slot'),
    sortable: true,
    responsive: 'mobile|tablet',
    render: () => Product,
  },
  {
    key: 'code',
    type: 'string',
    title: t('report.columns.machine-slot'),
    sortable: true,
    responsive: 'desktop',
  },
  {
    key: 'name',
    type: 'string',
    title: t('report.columns.product-name'),
    sortable: true,
    responsive: 'desktop',
  },
  {
    key: 'sale_price',
    type: 'currency',
    title: t('report.columns.sale-price'),
    sortable: true,
    responsive: 'desktop',
  },
  {
    key: 'sold',
    type: 'number',
    title: t('report.columns.sold'),
    sortable: true,
    responsive: 'desktop',
  },
  {
    key: 'payment',
    title: t('report.columns.split'),
    type: 'component',
    responsive: 'tablet',
    render: () => Summary,
  },
  {
    key: 'total_payments.creditcard',
    title: t('report.columns.credit-card'),
    sortable: true,
    type: 'currency',
    responsive: 'desktop',
  },
  {
    key: 'total_payments.promptpay',
    title: t('report.columns.promptpay'),
    sortable: true,
    type: 'currency',
    responsive: 'desktop',
  },
  {
    key: 'total_price',
    title: t('report.columns.total'),
    sortable: true,
    type: 'currency',
  },
];
