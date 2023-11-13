<!-- Pagination -->
<script lang="ts">
  import Button from '$components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';
  import { createEventDispatcher } from 'svelte';
  import { derived, writable } from 'svelte/store';

  export let page = 1;
  export let itemsPerPage: number;
  export let totalItems: number;
  export let maxVisiblePages = 3;

  const currentPage = writable(page);
  const currentItemPerPage = writable(itemsPerPage);
  const totalPages = Math.ceil(totalItems / $currentItemPerPage);

  const dispatch = createEventDispatcher();

  const setPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      currentPage.set(p);
      page = p;
      dispatch('page-change', { page });
    }
  };

  interface PaginationButton {
    type: 'page' | 'ellipsis';
    value: number;
  }

  $: paginationButtons = derived([currentPage, currentItemPerPage], ([currentPage]) => {
    const buttons: PaginationButton[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= Math.floor(maxVisiblePages / 2)) {
        buttons.push({ type: 'page', value: i });
      } else if (
        i === currentPage - Math.floor(maxVisiblePages / 2) - 1 ||
        i === currentPage + Math.floor(maxVisiblePages / 2) + 1
      ) {
        buttons.push({ type: 'ellipsis', value: 0 });
      }
    }
    return buttons;
  });

  function handlePrevious() {
    setPage($currentPage - 1);
  }

  function handleNext() {
    setPage($currentPage + 1);
  }
</script>

<div class="mt-4 flex items-center justify-between">
  <p class="text-sm text-gray-700">
    {$t('pagination.message', {
      begin: ($currentPage - 1) * $currentItemPerPage + 1,
      end: Math.min($currentPage * $currentItemPerPage, totalItems),
      total: totalItems,
    })}
  </p>
  <nav class="flex items-center">
    <Button class="w-24" on:click={handlePrevious} disabled={$currentPage === 1}>
      {$t('pagination.previous')}
    </Button>
    <div class="mx-2 flex flex-wrap gap-1">
      {#each $paginationButtons as button}
        {#if button.type === 'page'}
          <button
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
            class:active:bg-primary-200={$currentPage === button.value}
            class:bg-red-200={$currentPage === button.value}
            on:click={() => setPage(button.value)}
          >
            {button.value}
          </button>
        {:else}
          <span class="px-2 py-1 text-sm font-medium text-gray-500">...</span>
        {/if}
      {/each}
    </div>
    <Button class="w-24" on:click={handleNext} disabled={$currentPage === totalPages}>
      {$t('pagination.next')}
    </Button>
  </nav>
</div>
