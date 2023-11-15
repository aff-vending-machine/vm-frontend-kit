<script lang="ts">
  import { goto } from '$app/navigation';
  import Pagination from '$components/navigations/paginations/Pagination.svelte';
  import { page as storePage } from '$app/stores';

  export let limit: number;
  export let page: number;
  export let colspan: number;
  export let count: number;

  const handlePageChange = (e: CustomEvent) => {
    const { page } = e.detail;
    const params = new URLSearchParams($storePage.url.searchParams);
    params.set('page', page.toString());
    params.sort();

    goto(`?${params.toString()}`);
  };
</script>

<tr class="bg-gray-200">
  <td class="px-6 py-4" {colspan}>
    <Pagination {page} itemsPerPage={limit} totalItems={count} on:page-change={handlePageChange} />
  </td>
</tr>
