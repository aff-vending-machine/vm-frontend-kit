<script lang="ts">
  import Icon from '@iconify/svelte';

  import type { MachineEntity } from '$lib/types/machine';
  import { goto } from '$app/navigation';

  let { source } = $props<{
    index: number;
    source: MachineEntity;
  }>();

  function onGoto(link: string) {
    return (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      goto(link);
    };
  }
</script>

<div class="flex justify-center space-x-1">
  <button onclick={onGoto(`machines/${source.id}/slots`)}>
    <Icon icon="mdi:search" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
  <button onclick={onGoto(`machines/${source.id}/payments`)}>
    <Icon icon="mdi:edit" class="h-6 w-6 text-neutral hover:text-primary" />
  </button>
</div>
