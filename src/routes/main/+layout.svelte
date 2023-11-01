<script lang="ts">
  import Authlayout from '$lib/components/layouts/Authlayout.svelte';
  import Header from '$lib/components/sections/headers/Header.svelte';
  import Footer from '$lib/components/sections/footers/Footer.svelte';
  import Sidebar from '$lib/components/sections/sidebars/Sidebar.svelte';
</script>

<Authlayout>
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
</Authlayout>
