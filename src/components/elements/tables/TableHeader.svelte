<script lang="ts">
  import type { ColumnType } from './table';
  import TableHeaderField from './TableHeaderField.svelte';

  import { isDesktop, isMobile, isTablet } from '$lib/stores/media';

  export let columns: ColumnType[];

  $: fillterdColumns = columns.filter(c => {
    if (!c.responsive || c.responsive === 'all') return true;
    if (c.responsive.includes('mobile') && $isMobile) return true;
    if (c.responsive.includes('tablet') && $isTablet) return true;
    if (c.responsive.includes('desktop') && $isDesktop) return true;
    return false;
  });
</script>

<thead class="sticky -top-4 start-0 bg-primary-50">
  <tr>
    {#each fillterdColumns as column}
      <TableHeaderField {column} />
    {/each}
  </tr>
</thead>
