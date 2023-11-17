<script lang="ts">
  import type { ColumnSortType, ColumnType } from './table';

  export let column: ColumnType;

  let sort: ColumnSortType = { direction: 'asc' };

  const toggleSort = (column: ColumnType) => {
    if (!column.sortable) {
      return;
    }

    if (sort.key === column.key) {
      sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sort.key = column.key;
      sort.direction = 'asc';
    }

    const sortEvent = new CustomEvent('sort', {
      detail: {
        column: sort.key,
        direction: sort.direction,
      },
    });

    dispatchEvent(sortEvent);
  };
</script>

<th
  scope="col"
  class="sticky -top-4 cursor-pointer whitespace-nowrap"
  class:selected={column.key === sort.key}
  on:click={() => toggleSort(column)}
>
  <div class="border-y border-primary-300 px-6 py-4 text-sm font-bold uppercase tracking-wide text-gray-500">
    <div class="flex select-none justify-center">
      <span class="font-medium text-gray-900">{column.title}</span>
    </div>
  </div>
</th>
