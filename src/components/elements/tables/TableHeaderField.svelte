<script lang="ts">
  import type { ColumnSortType, ColumnType } from './@table';

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
  class="sticky top-0 cursor-pointer whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
  class:selected={column.key === sort.key}
  on:click={() => toggleSort(column)}
>
  <div class="flex select-none justify-between">
    <span class="font-medium text-gray-900">{column.title}</span>
  </div>
</th>
