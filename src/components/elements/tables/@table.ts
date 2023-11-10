export type TableFieldType = 'string' | 'image' | 'number' | 'currency' | 'date' | 'component' | 'array';
export type MediaType = 'all' | 'mobile' | 'tablet' | 'desktop';

export type ColumnType = {
  key: string;
  title: string;
  type: TableFieldType;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  tw?: string;
  render?: (record: unknown, index: number) => object;
  responsive?: MediaType;
};

export type ColumnSortType = {
  key?: string;
  direction: 'asc' | 'desc';
};
