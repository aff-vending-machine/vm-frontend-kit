<script lang="ts">
  import Icon from '@iconify/svelte';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  import { page } from '$app/stores';
  import type { SidebarSubMenuType } from '$lib/sidebar';

  export let title: string;
  export let icon: string;
  export let submenu: SidebarSubMenuType[] = [];
  export let link: string | undefined = undefined;
  export let iconOnly: boolean = false;

  let open = false;

  $: active = checkActiveLink($page.route.id || '', link || submenu[0].link);
  $: subactive = (sub: string) => checkActiveSubLink($page.route.id!, sub);

  function checkActiveLink(ref: string, link: string) {
    const currentPath = ref.split('/').filter(s => s !== '(app)');
    const comparePath = link.split('/');

    if (comparePath.length == 5) comparePath.pop();
    if (currentPath.length == 5) currentPath.pop();
    if (currentPath.length !== comparePath.length) return false;

    for (let i = 0; i < currentPath.length; i++) {
      if (currentPath[i].startsWith('[') && currentPath[i].endsWith(']')) continue;
      if (currentPath[i] !== comparePath[i]) return false;
    }

    return true;
  }

  function checkActiveSubLink(ref: string, link: string) {
    const currentPath = ref.split('/').filter(s => s !== '(app)');
    const comparePath = link.split('/');

    if (currentPath.length !== comparePath.length) return false;

    for (let i = 0; i < comparePath.length; i++) {
      if (currentPath[i].startsWith('[') && currentPath[i].endsWith(']')) continue;
      if (currentPath[i] !== comparePath[i]) return false;
    }

    return true;
  }

  function handleToggle() {
    open = !open;
  }
</script>

{#if link}
  <li class="flex flex-nowrap">
    <a
      class="flex flex-grow items-center whitespace-nowrap px-6 py-4 text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-gray-200"
      href={link}
      class:text-primary-500={active}
      class:bg-primary-100={active}
    >
      <Icon {icon} class="h-6 w-6" />
      <span class="ml-4 group-hover:block" class:hidden={iconOnly}>{title}</span>
    </a>
    {#if active}
      <span class="w-3 bg-white" />
      <span class="w-1 flex-shrink rounded-l bg-primary-300" />
    {/if}
  </li>
{:else}
  <li class="relative">
    <button
      class="inline-flex h-14 w-full items-center justify-between px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:text-emerald-600 focus:outline-none dark:hover:text-gray-200"
      on:click={handleToggle}
      class:text-primary-500={active}
      class:bg-primary-100={active}
    >
      <span class="inline-flex items-center py-4">
        <Icon {icon} class="h-6 w-6" />
        <span class="ml-4 group-hover:block" class:hidden={iconOnly}>{title}</span>
      </span>
      <span class="float-right transition-all group-hover:block" class:rotate-90={open} class:hidden={iconOnly}>
        <Icon icon="mdi:chevron-right" class="h-6 w-6" />
      </span>
      {#if active}
        <span class="absolute right-0 h-14 w-4 bg-white" />
        <span class="absolute right-0 h-14 w-1 rounded-l bg-primary-300" />
      {/if}
    </button>
    {#if open}
      <ul
        class="overflow-hidden rounded-md p-2 text-sm font-medium text-gray-500 group-hover:block dark:bg-gray-900 dark:text-gray-400"
        aria-label="submenu"
        class:hidden={iconOnly}
        transition:slide={{ delay: 100, duration: 300, easing: quintOut, axis: 'y' }}
      >
        {#each submenu as item}
          <li class="px-4">
            <a
              class="flex cursor-pointer items-center py-1 font-serif text-sm text-gray-600 hover:text-emerald-600 dark:hover:text-gray-200"
              rel="noreferrer"
              href={item.link}
              class:font-extrabold={subactive(item.link)}
            >
              {#if subactive(item.link)}
                <Icon icon="mdi:circle-multiple" class="h-4 w-4 text-primary-500" />
              {:else}
                <Icon icon="mdi:minus" class="h-4 w-4" />
              {/if}
              <span class="ml-2" class:text-primary-500={subactive(item.link)}>
                {item.title}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </li>
{/if}
