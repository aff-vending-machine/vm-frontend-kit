<script lang="ts">
  import type { ColumnSortType, ColumnType } from './table';

  let {
    column,
    sort = { direction: 'asc' },
    onsort,
  } = $props<{
    column: ColumnType;
    sort?: ColumnSortType;
    onsort?: (column: string, sort: 'asc' | 'desc') => void;
  }>();

  const toggleSort = (column: ColumnType) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      if (!column.sortable || !onsort) return;

      if (sort.key === column.key) {
        sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        sort.key = column.key;
        sort.direction = 'asc';
      }

      onsort(sort.key, sort.direction);
    };
  };
</script>

<th
  scope="col"
  class="sticky -top-4 cursor-pointer whitespace-nowrap"
  class:selected={column.key === sort.key}
  onclick={toggleSort(column)}
  style="width: {column.width};"
>
  <div class="border-y border-primary-light p-4 text-sm font-bold uppercase tracking-wide text-neutral">
    <div class="flex select-none justify-start">
      <span class="font-medium text-neutral-darkest">{column.title}</span>
    </div>
  </div>
</th>
