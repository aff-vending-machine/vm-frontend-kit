<script lang="ts">
  import selector from '$lib/stores/selector';
  import Language from '$components/elements/switchers/Language.svelte';
  import Profile from '$components/sections/profiles/Profile.svelte';
  import Theme from '$components/elements/switchers/Theme.svelte';
  import sidebar from '$lib/stores/sidebar';
  import { Hamburger } from 'svelte-hamburgers';
</script>

<div class="flex justify-between bg-white px-4 shadow-lg lg:rounded-lg">
  <div class="flex h-12 items-center space-x-2">
    <span class="lg:hidden">
      <Hamburger open={$sidebar} --color="gray" on:click={sidebar.toggle} />
    </span>
    <span>{$selector.branch?.name || 'All Branches'}</span>
    <span>{$selector.machine?.name || 'All Machines'}</span>
  </div>

  <div class="flex h-12 items-center space-x-4">
    <Language />
    <Theme />
    <Profile />
  </div>
</div>
