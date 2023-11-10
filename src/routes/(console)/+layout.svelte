<script lang="ts">
  import Header from '$components/sections/headers/Header.svelte';
  import Footer from '$components/sections/footers/Footer.svelte';
  import Sidebar from '$components/sections/sidebars/Sidebar.svelte';
  import drawer from '$lib/stores/drawer';
  import access from '$lib/stores/access.js';

  export let data;

  access.set(data.token);
</script>

<div class="flex h-full bg-slate-200 dark:bg-gray-900" class:overflow-y-hidden={$drawer}>
  <Sidebar title="Vending Machine" />
  <div class="flex flex-1 flex-col lg:px-8 lg:py-2">
    <Header />
    <main class="flex-1 bg-gray-200 p-4 lg:px-0">
      <slot />
    </main>
    <Footer />
  </div>
</div>
