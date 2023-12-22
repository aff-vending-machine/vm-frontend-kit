<script lang="ts">
  import { goto } from '$app/navigation';
  import { page as storePage } from '$app/stores';
  import Pagination from '$lib/components/navigations/paginations/Pagination.svelte';

  let { current_page, items_per_page, total_items, colspan } = $props<{
    current_page: number;
    items_per_page: number;
    total_items: number;
    colspan: number;
  }>();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams($storePage.url.searchParams);
    params.set('page', page.toString());
    params.sort();

    goto(`?${params.toString()}`);
  };
</script>

<tr class="bg-gray-200">
  <td class="px-6 py-4" {colspan}>
    <Pagination
      page={current_page}
      itemsPerPage={items_per_page}
      totalItems={total_items}
      onpagechange={handlePageChange}
    />
  </td>
</tr>
