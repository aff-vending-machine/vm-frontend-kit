import Actions from './Actions.svelte';
import Summary from './Summary.svelte';
import Title from './Title.svelte';

import type { ColumnType } from '$components/elements/tables/table';

export const reportColumns: (t: (key: string) => string) => ColumnType[] = (t: (key: string) => string) => [
  { key: 'name', type: 'string', title: t('report.columns.machine-name'), sortable: true, responsive: 'desktop' },
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
  { key: 'total', title: t('report.columns.total'), sortable: true, type: 'currency', responsive: 'desktop' },
  {
    key: 'total',
    title: t('report.columns.total'),
    sortable: true,
    type: 'component',
    responsive: 'mobile|tablet',
    render: () => Summary,
  },
  { key: 'report', type: 'component', title: t('report.columns.reports'), render: () => Actions },
];
