<script lang="ts">
  import Icon from '@iconify/svelte';

  import { clickOutside } from '$lib/hooks/useClickOutside';

  export let username: string;
  export let role: string;

  let showUI = false;

  function handleDropdown() {
    showUI = !showUI;
  }

  function close() {
    showUI = false;
  }
</script>

<div class=" flex flex-row items-center justify-center" use:clickOutside on:click-outside={close}>
  <button class="h-8 w-8" on:click={handleDropdown}>
    <Icon icon="mdi:user" class="h-8 w-8" />
  </button>

  <div class="relative">
    {#if showUI}
      <div
        class="absolute right-0 top-6 z-40 flex min-w-[16rem] flex-row rounded-lg border border-neutral-light bg-white"
      >
        <ul class="flex w-full flex-col text-sm text-neutral dark:text-neutral-light">
          <li class="flex items-center space-x-4 p-4">
            <Icon icon="mdi:user" class="h-12 w-12" />
            <div class="flex flex-col">
              <span class="text-xl font-bold">{username}</span>
              <span class="text-sm text-neutral">{role}</span>
            </div>
          </li>
          <li>
            <hr class="bg-slate-300 h-0.5 w-full" />
          </li>
          <li class="p-4 pb-2">
            <a href="/main/dashboard" class="text-slate-500 hover:text-slate-800 flex space-x-2">
              <Icon icon="mdi:view-dashboard" class="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li class="px-4 py-2">
            <a href="/main/profile" class="text-slate-500 hover:text-slate-800 flex space-x-2">
              <Icon icon="mdi:account-edit-outline" class="h-5 w-5" />
              <span>Profile</span>
            </a>
          </li>
          <li class="p-4 pt-2">
            <a href="/main/settings" class="text-slate-500 hover:text-slate-800 flex space-x-2">
              <Icon icon="mdi:cog" class="h-5 w-5" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <hr class="bg-slate-300 h-0.5 w-full" />
          </li>
          <li class="p-4">
            <a href="/logout" class="text-slate-500 hover:text-slate-800 flex space-x-2">
              <Icon icon="mdi:logout" class="h-5 w-5" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</div>
