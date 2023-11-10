<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { SidebarSubMenuType } from './sidebar';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';

  export let title: string;
  export let icon: string;
  export let link: string | undefined = undefined;
  export let submenu: SidebarSubMenuType[] = [];
  export let iconOnly: boolean = false;

  let open = false;

  function handleToggle() {
    open = !open;
  }

  $: active = $page.url.pathname.includes(link || submenu[0].link);
  $: subactive = (sub: string) => $page.url.pathname.includes(sub);
</script>

{#if link}
  <li class="flex flex-nowrap">
    <a
      class="flex flex-grow items-center whitespace-nowrap px-6 py-4 text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-gray-200"
      href={link}
      class:text-blue-500={active}
      class:bg-blue-100={active}
    >
      <Icon {icon} class="h-6 w-6" />
      <span class="ml-4 group-hover:block" class:hidden={iconOnly}>{title}</span>
    </a>
    {#if active}
      <span class="w-3 bg-white" />
      <span class="w-1 flex-shrink rounded-l bg-blue-300" />
    {/if}
  </li>
{:else}
  <li class="relative">
    <button
      class="inline-flex h-14 w-full items-center justify-between px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:text-emerald-600 focus:outline-none dark:hover:text-gray-200"
      on:click={handleToggle}
      class:text-blue-500={active}
      class:bg-blue-100={active}
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
        <span class="absolute right-0 h-14 w-1 rounded-l bg-blue-300" />
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
              class="flex cursor-pointer items-center py-1 font-serif text-sm text-gray-600 hover:text-emerald-600"
              rel="noreferrer"
              href={item.link}
              class:font-extrabold={subactive(item.link)}
            >
              {#if subactive(item.link)}
                <Icon icon="mdi:circle-multiple" class="h-4 w-4 text-blue-500" />
              {:else}
                <Icon icon="mdi:minus" class="h-4 w-4" />
              {/if}
              <span
                class="ml-2 text-gray-500 hover:text-emerald-600 dark:hover:text-gray-200"
                class:text-blue-500={subactive(item.link)}
              >
                {item.title}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </li>
{/if}
