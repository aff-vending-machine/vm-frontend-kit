<script lang="ts">
  import { goto } from '$app/navigation';
  import Pagination from '$components/navigations/paginations/Pagination.svelte';
  import { page } from '$app/stores';

  export let limit: number;
  export let colspan: number;
  export let count: number;

  const handlePageChange = (e: CustomEvent) => {
    const { page } = e.detail;
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      const offset = ((page || 1) - 1) * limit;
      params.set('offset', offset.toString());
    } else {
      params.delete('offset');
    }
    params.sort();
    goto(`?${params.toString()}`);
  };

  const forceUpdate = async (_: number) => {};

  $: searchParams = $page.url.searchParams;
</script>

{#await forceUpdate(limit) then _}
  <tr class="bg-gray-200">
    <td class="px-6 py-4" {colspan}>
      <Pagination itemsPerPage={limit} totalItems={count} on:page-change={handlePageChange} />
    </td>
  </tr>
{/await}
