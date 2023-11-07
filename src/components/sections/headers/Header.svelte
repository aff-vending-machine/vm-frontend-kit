<script lang="ts">
  import sidebar from '$lib/stores/sidebar';
  import { Hamburger } from 'svelte-hamburgers';
</script>

<div class="flex justify-between space-x-2 bg-white shadow-lg lg:rounded-lg">
  <div class="ml-4 flex h-12 items-center">
    <!-- <Navbar bind:active /> -->
    <span />xxx
  </div>
  <span class=" lg:hidden">
    <Hamburger open={$sidebar} --color="gray" on:click={sidebar.toggle} />
  </span>
</div>
