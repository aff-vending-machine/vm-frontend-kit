<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ColumnType } from './@table';
  import TableBodyField from './TableBodyField.svelte';

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  export let columns: ColumnType[];
  export let source: Record<string, any>[];

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
</script>

<tbody class="divide-y divide-gray-200 border-t border-gray-100">
  {#each source as data, index}
    <tr
      class="cursor-pointer space-x-4 odd:bg-white even:bg-gray-50 hover:bg-blue-100"
      on:click={() => dispatch('select', { index, data })}
    >
      {#each columns as column}
        <td class="whitespace-nowrap px-6 py-4 text-sm">
          <TableBodyField
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
