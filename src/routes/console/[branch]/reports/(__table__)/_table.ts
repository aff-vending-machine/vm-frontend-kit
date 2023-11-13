import type { ColumnType } from '$components/elements/tables/@table';
import Actions from './Actions.svelte';

export const reportColumns: (t: (key: string) => string) => ColumnType[] = (t: (key: string) => string) => [
  { key: 'name', type: 'string', title: t('report.columns.machine-name'), sortable: true },
  { key: 'serial_number', type: 'string', title: t('report.columns.serial-number'), sortable: true },
  { key: 'total_payments.creditcard', title: t('report.columns.credit-card'), sortable: true, type: 'currency' },
  { key: 'total_payments.promptpay', title: t('report.columns.promptpay'), sortable: true, type: 'currency' },
  { key: 'total', title: t('report.columns.total'), sortable: true, type: 'currency' },
  { key: 'report', type: 'component', title: t('report.columns.reports'), render: () => Actions },
];
