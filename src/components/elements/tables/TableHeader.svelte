<script lang="ts">
  import type { ColumnType } from './@table';
  import TableHeaderField from './TableHeaderField.svelte';

  export let columns: ColumnType[];
</script>

<thead class="sticky -top-4 start-0 z-10 bg-gray-300 shadow-lg">
  <tr>
    {#each columns as column}
      <TableHeaderField {column} />
    {/each}
  </tr>
</thead>
