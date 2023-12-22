<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onDestroy } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import SidebarMenu from './SidebarMenu.svelte';

  import { page } from '$app/stores';
  import { clickOutside } from '$lib/hooks/useClickOutside';
  import { t } from '$lib/i18n/translations';
  import { menulist } from '$lib/sidebar';
  import { isDesktop } from '$lib/stores/media';
  import sidebar from '$lib/stores/sidebar';

  export let title: string;
  export let branch: string;

  function handleClickOutside() {
    if (!$isDesktop) sidebar.close();
  }

  const unsubscribe = page.subscribe(() => !$isDesktop && sidebar.close());

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div
  class:hidden={!$sidebar || $isDesktop}
  class="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gray-500 opacity-50"
/>
<aside
  class="z-30 w-0 flex-shrink-0 overflow-y-auto transition-all"
  class:xl:w-20={!$sidebar}
  class:w-56={$sidebar}
  class:fixed={!$isDesktop}
  use:clickOutside
  on:click-outside={handleClickOutside}
>
  <div
    class="group fixed h-full w-0 bg-white py-4 text-gray-500 shadow shadow-gray-300 transition-all hover:xl:w-[13.5rem] dark:bg-gray-800 dark:text-gray-400"
    class:xl:w-20={!$sidebar}
    class:w-[13.5rem]={$sidebar}
  >
    <div class="flex h-16 flex-nowrap items-center justify-center">
      <a href="/console" class=" text-gray-900 group-hover:inline-block dark:text-gray-200" class:hidden={!$sidebar}>
        <span class="whitespace-nowrap text-center">
          {title}
        </span>
      </a>
      {#if $isDesktop}
        <button
          class="absolute left-14 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border-8 border-slate-200 bg-secondary-500 transition-all hover:bg-gray-500 group-hover:left-48"
          class:left-48={$sidebar}
          class:rotate-180={$sidebar}
          on:click={sidebar.toggle}
          transition:fly={{ duration: 300, x: -32, y: 0, opacity: 0.5, easing: quintOut }}
        >
          <Icon icon="mdi:chevron-right" class="h-6 w-6 text-white" />
        </button>
      {/if}
    </div>

    <ul class="mt-8" class:hidden={!$sidebar && !$isDesktop}>
      {#each menulist($t, branch) as item}
        <SidebarMenu {...item} iconOnly={!$sidebar} />
      {/each}
    </ul>
  </div>
</aside>
