<script lang="ts">
  import { isMobile, isTablet, isDesktop } from '$lib/stores/media';
  import type { ColumnType } from './@table';

  export let columns: ColumnType[];

  $: fillterdColumns = columns.filter(c => {
    if (!c.responsive || c.responsive === 'all') return true;
    if (c.responsive.includes('mobile') && $isMobile) return true;
    if (c.responsive.includes('tablet') && $isTablet) return true;
    if (c.responsive.includes('desktop') && $isDesktop) return true;
    return false;
  });
</script>

<tbody class="animate-pulse divide-y divide-gray-200 border-t border-gray-100">
  {#each [...Array(10).keys()] as _}
    <tr class="space-x-4 odd:bg-white even:bg-gray-50 hover:bg-primary-100">
      {#each fillterdColumns as _}
        <td class="px-6 py-4">
          <div class="h-3 w-full rounded-full bg-gray-300" />
          <span class="sr-only">Loading...</span>
        </td>
      {/each}
    </tr>
  {/each}
</tbody>
