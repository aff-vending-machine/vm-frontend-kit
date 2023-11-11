<script lang="ts">
  import type { Machine } from '$lib/services/machine';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  export let source: Machine;

  const dispatch = createEventDispatcher();

  function handleEdit(): void {
    dispatch('action', { type: 'edit', data: source });
  }
</script>

<div class="flex space-x-2">
  <button on:click={handleEdit}>
    <Icon
      icon="mdi:edit"
      class="h-8 w-8 rounded-full border border-gray-500 bg-gray-500 p-1.5 text-white hover:bg-gray-100 hover:text-green-500"
    />
  </button>
  <button on:click={handleEdit}>
    <Icon
      icon="mdi:edit"
      class="h-8 w-8 rounded-full border border-gray-500 bg-gray-500 p-1.5 text-white hover:bg-white hover:text-green-500"
    />
  </button>
  <button on:click={handleEdit}>
    <Icon
      icon="mdi:edit"
      class="h-8 w-8 rounded-full border border-gray-500 bg-gray-500 p-1.5 text-white hover:bg-white hover:text-green-500"
    />
  </button>
</div>
