<script lang="ts">
  import Header from './DrawerHeader.svelte';
  import Body from './DrawerBody.svelte';
  import Footer from './DrawerFooter.svelte';
  import drawer from '$lib/stores/overlay';
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

{#if $drawer}
  <div tabindex="-1" class="fixed right-0 top-0 z-50 h-full w-full overflow-visible">
    <button
      class="absolute left-0 top-0 h-full w-full bg-black opacity-30 transition-opacity duration-300"
      transition:fade={{ duration: 300, easing: quintOut }}
      on:click={drawer.close}
    />
    <div
      class="absolute right-0 h-full w-full bg-white shadow-md shadow-white lg:w-1/2"
      transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}
    >
      <div class="flex h-full w-full flex-col justify-between">
        <slot {Header} {Body} {Footer} />
      </div>
    </div>
  </div>
{/if}
