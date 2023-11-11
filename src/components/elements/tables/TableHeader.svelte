<script lang="ts">
  import type { ColumnType } from './@table';
  import TableHeaderField from './TableHeaderField.svelte';

  export let columns: ColumnType[];
</script>

<thead class="z-1 sticky start-0 top-0 bg-gray-50">
  <tr>
    {#each columns as column}
      <TableHeaderField {column} />
    {/each}
  </tr>
</thead>
