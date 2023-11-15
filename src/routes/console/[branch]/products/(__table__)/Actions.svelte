<script lang="ts">
  import type { Machine } from '$types/machine';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  // ignored data
  export let index: number;
  $: _ = index;

  export let source: Machine;

  const dispatch = createEventDispatcher();

  function handleView(): void {
    dispatch('action', { type: 'edit', data: source });
  }
  function handleEdit(): void {
    dispatch('action', { type: 'edit', data: source });
  }
  function handleDelete(): void {
    dispatch('action', { type: 'edit', data: source });
  }
</script>

<div class="flex justify-center space-x-2">
  <button on:click={handleView}>
    <Icon
      icon="mdi:search"
      class="h-8 w-8 rounded-full border border-gray-500 bg-gray-500 p-1.5 text-white hover:bg-gray-100 hover:text-secondary-500"
    />
  </button>
  <button on:click={handleEdit}>
    <Icon
      icon="mdi:edit"
      class="h-8 w-8 rounded-full border border-gray-500 bg-gray-500 p-1.5 text-white hover:bg-white hover:text-secondary-500"
    />
  </button>
  <button on:click={handleDelete}>
    <Icon
      icon="mdi:bin"
      class="h-8 w-8 rounded-full border border-gray-500 bg-gray-500 p-1.5 text-white hover:bg-white hover:text-secondary-500"
    />
  </button>
</div>
