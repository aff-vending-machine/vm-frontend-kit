import type { ColumnType } from '$lib/components/elements/tables/table';
import { Actions, Summary, Title } from '$lib/components/ui/reports/summary/tables';
import type { TranslationType } from '$lib/i18n/translations';

export const reportColumns: (t: TranslationType) => ColumnType[] = (t: TranslationType) => [
  {
    key: 'name',
    type: 'string',
    title: t('report.columns.machine-name'),
    sortable: true,
    responsive: 'desktop',
  },
  {
    key: 'serial_number',
    type: 'string',
    title: t('report.columns.serial-number'),
    sortable: true,
    responsive: 'desktop',
  },
  {
    key: 'name',
    type: 'component',
    title: t('report.columns.machine-name'),
    sortable: true,
    responsive: 'tablet',
    render: () => Title,
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
    key: 'total',
    title: t('report.columns.total'),
    sortable: true,
    type: 'currency',
    responsive: 'desktop',
  },
  {
    key: 'total',
    title: t('report.columns.total'),
    sortable: true,
    type: 'component',
    responsive: 'mobile|tablet',
    render: () => Summary,
  },
  {
    key: 'report',
    type: 'component',
    title: t('report.columns.reports'),
    render: () => Actions,
  },
];
