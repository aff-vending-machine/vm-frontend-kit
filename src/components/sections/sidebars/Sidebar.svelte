<script lang="ts">
  import sidebar from '$lib/stores/sidebar';
  import SidebarMenu from './SidebarMenu.svelte';
  import Icon from '@iconify/svelte';
  import { clickOutside } from '$lib/hooks/useClickOutside';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { t } from '$lib/translations';
  import { menulist } from '$lib/sidebar';

  export let title: string;
  let size: number;

  $: isMobile = size < 1024;

  function handleClickOutside() {
    if (isMobile) sidebar.close();
  }

  const unsubscribe = page.subscribe(() => isMobile && sidebar.close());

  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:window bind:innerWidth={size} />

<div class:hidden={!$sidebar || !isMobile} class="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gray-500 opacity-50" />
<aside
  class="z-30 w-0 flex-shrink-0 overflow-y-auto transition-all"
  class:lg:w-20={!$sidebar}
  class:w-56={$sidebar}
  class:fixed={isMobile}
  use:clickOutside
  on:click-outside={handleClickOutside}
>
  <div
    class="group fixed h-full w-0 bg-white py-4 text-gray-500 shadow shadow-gray-300 transition-all dark:bg-gray-800 dark:text-gray-400 hover:lg:w-[13.5rem]"
    class:lg:w-20={!$sidebar}
    class:w-[13.5rem]={$sidebar}
  >
    <div class="flex h-16 flex-nowrap items-center justify-center">
      <a href="/console" class=" text-gray-900 group-hover:inline-block dark:text-gray-200" class:hidden={!$sidebar}>
        <span class="whitespace-nowrap text-center">
          {$t(title)}
        </span>
      </a>
      {#if !isMobile}
        <button
          class="absolute left-14 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border-8 border-slate-200 bg-purple-500 transition-all hover:bg-gray-500 group-hover:left-48"
          class:left-48={$sidebar}
          class:rotate-180={$sidebar}
          on:click={sidebar.toggle}
          transition:fly={{ duration: 300, x: -32, y: 0, opacity: 0.5, easing: quintOut }}
        >
          <Icon icon="mdi:chevron-right" class="h-6 w-6 text-white" />
        </button>
      {/if}
    </div>

    <ul class="mt-8" class:hidden={!$sidebar && isMobile}>
      {#each menulist as item}
        <SidebarMenu {...item} iconOnly={!$sidebar} />
      {/each}
    </ul>
  </div>
</aside>
