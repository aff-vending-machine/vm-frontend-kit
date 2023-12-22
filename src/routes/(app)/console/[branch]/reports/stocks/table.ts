import No from './(components)/table/No.svelte';
import Product from './(components)/table/Product.svelte';
import Summary from './(components)/table/Summary.svelte';

import type { ColumnType } from '$lib/components/elements/tables/table';
import type { TranslationType } from '$lib/i18n/translations';
import type { StockReport } from '$lib/types/report';

export const regroupData = (list: StockReport[], group: boolean) => {
  if (group) {
    return list.reduce((result, data) => {
      const idx = result.findIndex(r => r.name === data.name && r.sale_price === data.sale_price);

      if (idx >= 0) {
        if (!result[idx].code.includes(data.code)) {
          let codes = result[idx].code.split(', ');
          codes = codes.concat(data.code).sort();
          result[idx].code = codes.join(', ');
        }

        result[idx].sold += data.sold;
        result[idx].total_price = result[idx].sale_price * result[idx].sold;

        for (const [key, value] of Object.entries(data.total_payments)) {
          if (!result[idx].total_payments[key]) {
            result[idx].total_payments[key] = value;
          } else {
            result[idx].total_payments[key] += value;
          }
        }
      } else {
        result = result.concat({
          ...data,
          total_payments: { ...data.total_payments },
        });
      }

      return result;
    }, [] as StockReport[]);
    return list;
  } else {
    return list;
  }
};

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
