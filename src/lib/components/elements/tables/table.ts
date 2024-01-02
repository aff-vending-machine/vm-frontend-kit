export type TableFieldType = 'string' | 'image' | 'number' | 'currency' | 'date' | 'component' | 'array' | 'boolean';
export type MediaType = 'all' | 'mobile' | 'tablet' | 'desktop' | 'mobile|tablet' | 'tablet|desktop' | 'mobile|desktop';

export type ColumnType = {
  key: string;
  title: string;
  type: TableFieldType;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string;
  tw?: string;
  render?: (record: unknown, index: number) => object;
  responsive?: MediaType;
};

export type ColumnSortType = {
  key?: string;
  direction: 'asc' | 'desc';
};
