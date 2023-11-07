<script lang="ts">
  // import Icon from '@iconify/svelte';
  // import { createEventDispatcher } from 'svelte';

  export let title: string;

  // const dispatch = createEventDispatcher();
  // const handleClose = () => dispatch('close');

  let showFull: boolean = true;

  function toggleSidebarState() {
    showFull = !showFull;
  }
</script>

<!-- <div class="mx-auto max-w-md">
  <button class="float-right p-4 xl:hidden" on:click={handleClose}>
    <Icon icon="close" class="h-4 w-4 text-gray-500 hover:text-red-500" />
  </button>
  <div class="flex h-20 max-w-md items-center justify-center">
    <h1 class="text-xl font-bold outline-none">{title}</h1>
  </div>
</div> -->

<aside class="mx-auto" class:max-w-xs={!showFull} class:max-w-md={showFull}>
  <div class="app-brand demo">
    <a href="/main" class="flex flex-row items-baseline">
      <span class="">
        <!-- <Icon icon="mdi:close" class="h-6 w-6 text-gray-500 hover:text-red-500" /> -->
      </span>
      {#if !showFull}
        <span class="bold ms-2">{title}</span>
      {/if}
    </a>
  </div>

  <button class="bg-red-500" on:click={toggleSidebarState}>Toggle</button>
</aside>
