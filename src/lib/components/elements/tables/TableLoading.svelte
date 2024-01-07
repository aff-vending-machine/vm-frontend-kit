<script lang="ts">
  import { filterColumns } from '$lib/utils/check';
  import type { ColumnType } from './table';

  let { columns } = $props<{
    columns: ColumnType[];
  }>();

  const fillterdColumns = $derived(filterColumns(columns));
</script>

<tbody class="animate-pulse divide-y divide-neutral-lightest border-t border-neutral-lightest">
  {#each [...Array(10).keys()] as _}
    <tr class="space-x-4 odd:bg-white even:bg-neutral-lightest hover:bg-primary-light">
      {#each fillterdColumns as _}
        <td class="px-6 py-4">
          <div class="h-3 w-full rounded-full bg-neutral-light" />
          <span class="sr-only">Loading...</span>
        </td>
      {/each}
    </tr>
  {/each}
</tbody>
