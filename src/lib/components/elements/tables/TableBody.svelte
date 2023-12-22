<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { ColumnType } from './table';
  import TableBodyField from './TableBodyField.svelte';

  import { isDesktop, isTablet, isMobile } from '$lib/stores/media';

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  export let columns: ColumnType[];
  export let source: Record<string, any>[] = [];

  const dispatch = createEventDispatcher();

  const getValue = (key?: string, value?: any) => {
    let data = { ...value };
    key?.split('.').forEach(key => {
      try {
        data = data[key];
      } catch (e) {
        return '-';
      }
    });

    return data;
  };

  $: fillterdColumns = columns.filter(c => {
    if (!c.responsive || c.responsive === 'all') return true;
    if (c.responsive.includes('mobile') && $isMobile) return true;
    if (c.responsive.includes('tablet') && $isTablet) return true;
    if (c.responsive.includes('desktop') && $isDesktop) return true;
    return false;
  });
</script>

<tbody class="divide-y divide-gray-200 border-t border-gray-100">
  {#if source.length === 0}
    <tr class="bg-white">
      <td colspan={fillterdColumns.length} class="whitespace-nowrap py-8 text-center font-semibold text-gray-500">
        - No data -
      </td>
    </tr>
  {/if}
  {#each source as data, index}
    <tr
      class="cursor-pointer space-x-4 odd:bg-white even:bg-gray-50 hover:bg-primary-100"
      on:click={() => dispatch('select', { index, value: data })}
    >
      {#each fillterdColumns as column}
        <td class="px-6 py-4 text-sm">
          <TableBodyField
            {index}
            value={column.render ? column.render(data, index) : getValue(column.key, data)}
            type={column.type}
            source={data}
            on:action
          />
        </td>
      {/each}
    </tr>
  {/each}
</tbody>
