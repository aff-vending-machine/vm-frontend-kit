<script lang="ts">
  import Header from '$components/sections/headers/Header.svelte';
  import Footer from '$components/sections/footers/Footer.svelte';
  import Sidebar from '$components/sections/sidebars/Sidebar.svelte';
</script>

<div class="flex h-screen bg-gray-100">
  <Sidebar title="Vending Machine" />
  <div class="flex flex-1 flex-col overflow-hidden">
    <Header />
    <main class="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
      <slot />
    </main>
    <Footer />
  </div>
</div>
