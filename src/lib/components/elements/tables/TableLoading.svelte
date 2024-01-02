<script lang="ts">
  import type { ColumnType } from './table';

  import { isMobile, isTablet, isDesktop } from '$lib/stores/media';

  let { columns } = $props<{
    columns: ColumnType[];
  }>();

  const fillterdColumns = $derived(
    columns.filter(c => {
      if (!c.responsive || c.responsive === 'all') return true;
      if (c.responsive.includes('mobile') && $isMobile) return true;
      if (c.responsive.includes('tablet') && $isTablet) return true;
      if (c.responsive.includes('desktop') && $isDesktop) return true;
      return false;
    }),
  );
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
