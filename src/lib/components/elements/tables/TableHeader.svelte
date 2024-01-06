<script lang="ts">
  import { filterColumns } from '$lib/utils/check';
  import type { ColumnType } from './table';
  import TableHeaderField from './TableHeaderField.svelte';

  let { columns, onsort } = $props<{
    columns: ColumnType[];
    onsort?: (column: string, sort: 'asc' | 'desc') => void;
  }>();

  const fillterdColumns = $derived(filterColumns(columns));
</script>

<thead class="sticky -top-4 start-0 bg-primary-lightest">
  <tr>
    {#each fillterdColumns as column}
      <TableHeaderField {column} {onsort} />
    {/each}
  </tr>
</thead>
