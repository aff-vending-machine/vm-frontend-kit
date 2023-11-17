<script lang="ts">
  import Icon from '@iconify/svelte';

  import drawer from '$lib/stores/overlay';

  export let title: string;
  export let subtitle: string;
</script>

<div class="flex w-full items-center border-b border-gray-300 bg-gray-200 p-6">
  <button class="mr-4 flex items-center justify-center rounded-full text-center" on:click={drawer.close}>
    <Icon icon="mdi:close" class="h-5 w-5 hover:text-red-500" />
  </button>
  <div class="flex flex-1 flex-col">
    <h2 class="text-xl"><strong>{title}</strong></h2>
    <small class="text-md">{subtitle}</small>
  </div>
</div>
