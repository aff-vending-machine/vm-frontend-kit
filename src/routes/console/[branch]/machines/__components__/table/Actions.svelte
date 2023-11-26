<script lang="ts">
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  import type { Machine } from '$types/machine';

  // ignored data
  export let index: number;
  $: _ = index;

  export let source: Machine;

  const dispatch = createEventDispatcher();

  const handleAction = (mode: string) => () => {
    dispatch('action', { mode, data: source });
  };
</script>

<div class="flex justify-center space-x-1">
  <button on:click|preventDefault|stopPropagation={handleAction('view')}>
    <Icon icon="mdi:search" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
  <button on:click|preventDefault|stopPropagation={handleAction('edit')}>
    <Icon icon="mdi:edit" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
  <button on:click|preventDefault|stopPropagation={handleAction('delete')}>
    <Icon icon="mdi:delete" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
</div>
