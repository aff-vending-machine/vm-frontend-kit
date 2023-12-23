<script lang="ts">
  import Icon from '@iconify/svelte';

  import type { Machine } from '$lib/types/machine';

  let { source, onaction } = $props<{
    index: number;
    source: Machine;
    onaction: (mode: string, source: Machine) => void;
  }>();

  function handleAction(mode: string) {
    return (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onaction && onaction(mode, source);
    };
  }
</script>

<div class="flex justify-center space-x-1">
  <button onclick={handleAction('view')}>
    <Icon icon="mdi:search" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
  <button onclick={handleAction('edit')}>
    <Icon icon="mdi:edit" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
  <button onclick={handleAction('delete')}>
    <Icon icon="mdi:delete" class="h-6 w-6 text-gray-500 hover:text-primary-500" />
  </button>
</div>
