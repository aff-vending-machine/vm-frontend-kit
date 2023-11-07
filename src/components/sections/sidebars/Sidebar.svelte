<script lang="ts">
  import sidebar from '$lib/stores/sidebar';
  import SidebarMenu from './SidebarMenu.svelte';
  import { menulist } from './sidebar';
  import Icon from '@iconify/svelte';
  import { clickOutside } from '$lib/hooks/useClickOutside';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let title: string;
  let size: number;

  $: isMobile = size < 1024;

  function handleClickOutside() {
    if (isMobile) sidebar.close();
  }
</script>

<svelte:window bind:innerWidth={size} />

<div class:hidden={!$sidebar || !isMobile} class="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gray-500 opacity-50" />
<aside
  class="group z-30 h-full w-0 flex-shrink-0 overflow-y-auto bg-white shadow shadow-gray-300 transition-all hover:w-56 dark:bg-gray-800"
  class:lg:w-20={!$sidebar}
  class:w-56={$sidebar}
  class:fixed={isMobile}
  use:clickOutside
  on:click-outside={handleClickOutside}
>
  <div class="py-4 text-gray-500 dark:text-gray-400">
    <div class="flex h-16 flex-nowrap items-center justify-center">
      <a
        href="/main/dashboard"
        class=" text-gray-900 group-hover:inline-block dark:text-gray-200"
        class:hidden={!$sidebar}
      >
        <span class="whitespace-nowrap text-center">
          {title}
        </span>
      </a>
      {#if !isMobile}
        <button
          class="absolute left-16 top-8 z-50 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-200 bg-purple-500 transition-all hover:bg-gray-500 group-hover:left-52"
          class:left-52={$sidebar}
          class:rotate-180={$sidebar}
          on:click={sidebar.toggle}
          transition:fly={{ duration: 300, x: -32, y: 0, opacity: 0.5, easing: quintOut }}
        >
          <Icon icon="mdi:chevron-right" class="h-6 w-6 text-white" />
        </button>
      {/if}
    </div>

    <ul class="mt-8">
      {#each menulist as item}
        <SidebarMenu {...item} iconOnly={!$sidebar} />
      {/each}
    </ul>
  </div>
</aside>
