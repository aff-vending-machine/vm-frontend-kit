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
    onpagechange?: (p: number) => void;
  }>();

  let paginationButtons = $state<PaginationButton[]>([]);
  let totalPages = $derived(Math.ceil(totalItems / itemsPerPage));

  interface PaginationButton {
    type: 'page' | 'ellipsis';
    value: number;
  }

  const setPage = (p: number) => {
    if (onpagechange && p >= 1 && p <= totalPages) {
      onpagechange(p);
    }
  };

  $effect.pre(() => {
    const buttons: PaginationButton[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(page - i) <= Math.floor(maxVisiblePages / 2)) {
        buttons.push({ type: 'page', value: i });
      } else if (i === page - Math.floor(maxVisiblePages / 2) - 1 || i === page + Math.floor(maxVisiblePages / 2) + 1) {
        buttons.push({ type: 'ellipsis', value: 0 });
      }
    }
    paginationButtons.push(...buttons);
  });

  function handlePrevious() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }
</script>

<div class="mt-4 flex items-center justify-between">
  <p class="text-sm text-gray-700">
    {$t('pagination.message', {
      begin: (page - 1) * itemsPerPage + 1,
      end: Math.min(page * itemsPerPage, totalItems),
      total: totalItems,
    })}
  </p>
  <nav class="flex items-center">
    <Button class="w-24" on:click={handlePrevious} disabled={page === 1}>
      {$t('pagination.previous')}
    </Button>
    <div class="mx-2 flex flex-wrap gap-1">
      {#each paginationButtons as button}
        {#if button.type === 'page'}
          <button
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
            class:active:bg-primary-200={page === button.value}
            class:bg-red-200={page === button.value}
            on:click={() => setPage(button.value)}
          >
            {button.value}
          </button>
        {:else}
          <span class="px-2 py-1 text-sm font-medium text-gray-500">...</span>
        {/if}
      {/each}
    </div>
    <Button class="w-24" on:click={handleNext} disabled={page === totalPages}>
      {$t('pagination.next')}
    </Button>
  </nav>
</div>
