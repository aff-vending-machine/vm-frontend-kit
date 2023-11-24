<script lang="ts">
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  import type { Machine } from '$types/machine';

  // ignored data
  export let index: number;
  $: _ = index;

  export let source: Machine;

  const dispatch = createEventDispatcher();

  function handleView(): void {
    dispatch('action', { type: 'view', data: source });
  }
  function handleEdit(): void {
    dispatch('action', { type: 'edit', data: source });
  }
  function handleDelete(): void {
    dispatch('action', { type: 'delete', data: source });
  }
</script>

<div class="flex justify-center space-x-1">
  <button on:click={handleView}>
    <Icon icon="mdi:search" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
  <button on:click={handleEdit}>
    <Icon icon="mdi:edit" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
  <button on:click={handleDelete}>
    <Icon icon="mdi:delete" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
</div>
