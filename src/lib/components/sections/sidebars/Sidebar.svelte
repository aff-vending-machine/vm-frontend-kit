<script lang="ts">
  import Icon from '@iconify/svelte';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import SidebarMenu from './SidebarMenu.svelte';

  import { page } from '$app/stores';
  import { clickOutside } from '$lib/hooks/useClickOutside';
  import { t } from '$lib/i18n/translations';
  import { menulist } from '$lib/sidebar';
  import { media, profile } from '$lib/state.svelte';
  import { getRoleLevel } from '$lib/utils/role';

  let { title, branch, sidebar } = $props<{
    sidebar: boolean;
    title: string;
    branch: string;
  }>();

  const show = $derived(sidebar);
  const hide = $derived(!sidebar);

  function onClose() {
    if (!media.isDesktop) sidebar = false;
  }

  function onToggle(e: MouseEvent) {
    e.preventDefault();
    sidebar = !sidebar;
  }

  $effect(() => {
    const unsubscribe = page.subscribe(onClose);

    return () => {
      unsubscribe();
    };
  });

  const filteredMenu = $derived(
    menulist($t, branch).filter(m => {
      if (!m.role) return true;
      return getRoleLevel(m.role) <= getRoleLevel(profile.value?.role);
    }),
  );
</script>

<div class:hidden={hide || media.isDesktop} class="absolute bottom-0 left-0 right-0 top-0 z-10 bg-neutral opacity-50" />
<aside
  class="z-30 w-0 flex-shrink-0 overflow-y-auto transition-all"
  class:xl:w-20={hide}
  class:w-56={show}
  class:fixed={!media.isDesktop}
  use:clickOutside
  on:click-outside={onClose}
>
  <div
    class="group fixed h-full w-0 bg-white py-4 text-neutral shadow shadow-neutral-light transition-all dark:bg-neutral-dark dark:text-neutral-light hover:xl:w-[13.5rem]"
    class:xl:w-20={hide}
    class:w-[13.5rem]={show}
  >
    <div class="flex h-16 flex-nowrap items-center justify-center">
      <a
        href="/portal"
        class=" text-neutral-darkest group-hover:inline-block dark:text-neutral-light"
        class:hidden={hide}
      >
        <span class="whitespace-nowrap text-center">
          {title}
        </span>
      </a>
      {#if media.isDesktop}
        <button
          class="absolute left-14 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border-8 border-neutral-lightest bg-secondary transition-all hover:bg-neutral group-hover:left-48"
          class:left-48={show}
          class:rotate-180={show}
          onclick={onToggle}
          transition:fly={{ duration: 300, x: -32, y: 0, opacity: 0.5, easing: quintOut }}
        >
          <Icon icon="mdi:chevron-right" class="h-6 w-6 text-white" />
        </button>
      {/if}
    </div>

    <ul class="mt-8" class:hidden={hide && !media.isDesktop}>
      {#each filteredMenu as item}
        <SidebarMenu {...item} iconOnly={hide} />
      {/each}
    </ul>
  </div>
</aside>
