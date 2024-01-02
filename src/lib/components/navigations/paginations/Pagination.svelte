<!-- Pagination -->
<script lang="ts">
  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';

  let {
    page,
    itemsPerPage,
    totalItems,
    maxVisiblePages = 3,
    onpagechange,
  } = $props<{
    page: number;
    itemsPerPage: number;
    totalItems: number;
    maxVisiblePages?: number;
    onpagechange?: (page: number) => void;
  }>();

  const totalPages = $derived(Math.ceil(totalItems / itemsPerPage));
  const paginationButtons = $derived<PaginationButton[]>(findPaginationButtons(totalPages, page, maxVisiblePages));

  interface PaginationButton {
    type: 'page' | 'ellipsis';
    value: number;
  }

  const setPage = (p: number) => {
    if (onpagechange && p >= 1 && p <= totalPages) {
      onpagechange(p);
    }
  };

  function findPaginationButtons(totalPages: number, currentPage: number, maxVisiblePages: number) {
    const buttons: PaginationButton[] = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

    if (start > 1) buttons.push({ type: 'ellipsis', value: 0 });
    for (let i = start; i <= end; i++) {
      buttons.push({ type: 'page', value: i });
    }
    if (end < totalPages) buttons.push({ type: 'ellipsis', value: 0 });

    return buttons;
  }

  function handleSetPage(page: number) {
    return (e: MouseEvent) => {
      e.preventDefault();
      setPage(page);
    };
  }

  function handlePrevious(e: MouseEvent) {
    e.preventDefault();
    setPage(page - 1);
  }

  function handleNext(e: MouseEvent) {
    e.preventDefault();
    setPage(page + 1);
  }
</script>

<div class="mt-4 flex items-center justify-between">
  <p class="text-sm text-neutral-dark">
    {$t('pagination.message', {
      begin: (page - 1) * itemsPerPage + 1,
      end: Math.min(page * itemsPerPage, totalItems),
      total: totalItems,
    })}
  </p>
  <nav class="flex items-center">
    <Button class="w-24" onclick={handlePrevious} disabled={page === 1}>
      {$t('pagination.previous')}
    </Button>
    <div class="mx-2 flex flex-wrap gap-1">
      {#each paginationButtons as button}
        {#if button.type === 'page'}
          <button
            class="rounded-md px-3 py-2 text-sm font-medium text-neutral hover:bg-neutral-lightest focus:outline-none focus:ring focus:ring-neutral-light active:bg-primary"
            class:active={page === button.value}
            onclick={handleSetPage(button.value)}
          >
            {button.value}
          </button>
        {:else}
          <span class="px-2 py-1 text-sm font-medium text-neutral">...</span>
        {/if}
      {/each}
    </div>
    <Button class="w-24" onclick={handleNext} disabled={page === totalPages}>
      {$t('pagination.next')}
    </Button>
  </nav>
</div>
