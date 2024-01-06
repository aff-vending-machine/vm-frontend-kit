<script lang="ts">
  import { flip } from 'svelte/animate';
  import type { ColumnType } from './table';
  import TableBodyField from './TableBodyField.svelte';

  import type { Entity } from '$lib/types/common';
  import { filterColumns } from '$lib/utils/check';

  let { columns, source, onselect, onaction } = $props<{
    columns: ColumnType[];
    source: Entity[];
    onselect?: (data: Entity) => void;
    onaction?: (mode: string, data: Entity) => void;
  }>();

  const fillterdColumns = $derived(filterColumns(columns));

  function onSelect(data: Record<string, any>) {
    return (e: MouseEvent) => {
      e.stopPropagation();

      if (e.target === e.currentTarget) {
        e.preventDefault();
        onselect && onselect(data);
      }
    };
  }

  function getValue(key?: string, value?: any) {
    let data = { ...value };
    key?.split('.').forEach(key => {
      try {
        data = data[key];
      } catch (e) {
        return '-';
      }
    });

    return data;
  }

  function getAlignment(align?: 'left' | 'right' | 'center') {
    if (!align || align === 'left') return '';
    if (align === 'center') return 'text-center';
    return 'text-right';
  }

  function getWidth(width?: string) {
    if (!width) return '';
    return `w-[${width}]`;
  }
</script>

<tbody class="divide-y divide-neutral-light border-t border-neutral-lightest">
  {#if source.length === 0}
    <tr class="bg-white">
      <td colspan={fillterdColumns.length} class="whitespace-nowrap py-8 text-center font-semibold text-neutral">
        - No data -
      </td>
    </tr>
  {/if}
  {#each source as data, index (index)}
    <tr
      animate:flip
      class="cursor-pointer space-x-4 odd:bg-white even:bg-neutral-lightest hover:bg-accent-lightest"
      onclick={onSelect(data)}
    >
      {#each fillterdColumns as column (column.key)}
        <td animate:flip class="p-4 text-sm {getAlignment(column.align)} {getWidth(column.width)}">
          <TableBodyField
            {index}
            value={column.render ? column.render(data, index) : getValue(column.key, data)}
            type={column.type}
            source={data}
            {onaction}
          />
        </td>
      {/each}
    </tr>
  {/each}
</tbody>
