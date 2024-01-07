<script lang="ts">
  import { goto } from '$app/navigation';
  import { page as storePage } from '$app/stores';
  import Pagination from '$lib/components/navigations/paginations/Pagination.svelte';

  let { current_page, items_per_page, total_items } = $props<{
    current_page: number;
    items_per_page: number;
    total_items: number;
  }>();

  const onpagechange = (page: number) => {
    const params = new URLSearchParams($storePage.url.searchParams);
    params.set('page', page.toString());
    params.sort();

    goto(`?${params.toString()}`);
  };
</script>

<div class="w-full bg-neutral-lightest px-6 py-4">
  <Pagination page={current_page} itemsPerPage={items_per_page} totalItems={total_items} {onpagechange} />
</div>
