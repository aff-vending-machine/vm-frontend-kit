import type { TranslationType } from '$lib/i18n/translations';

export type SelectOptionsType<V = string | number | boolean | null, T = unknown> = {
  label: string;
  value: V;
  data?: T;
  filter?: V;
};

export type SelectOptionsTypeFunction<V = string | number, T = unknown> = (
  t: TranslationType,
) => SelectOptionsType<V, T>[];

export const viewOptions: SelectOptionsType<number>[] = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

export const stockOptions: SelectOptionsTypeFunction = (t: TranslationType) => [
  { label: t('options.stock.all'), value: '' },
  { label: t('options.stock.avaialble'), value: '>:0' },
  { label: t('options.stock.out-of-stocks'), value: '<:.01' },
  { label: t('options.stock.less-than-20'), value: '<=:.2' },
  { label: t('options.stock.full-stocks'), value: '>:.99' },
];

export const statusOptions: SelectOptionsTypeFunction = (t: TranslationType) => [
  { label: t('options.status.all'), value: '' },
  { label: t('options.status.enable'), value: 'true' },
  { label: t('options.status.disable'), value: 'false' },
];

export const editOptions: SelectOptionsTypeFunction = (t: TranslationType) => [
  { label: t('options.changed.all'), value: '' },
  { label: t('options.changed.changed'), value: 'true' },
  { label: t('options.changed.not-changed'), value: 'false' },
];
