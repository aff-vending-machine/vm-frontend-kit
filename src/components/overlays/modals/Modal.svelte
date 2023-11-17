<script lang="ts">
  import Body from './ModalBody.svelte';
  import Footer from './ModalFooter.svelte';
  import Header from './ModalHeader.svelte';

  import { clickOutside } from '$lib/hooks/useClickOutside';
  import modal from '$lib/stores/overlay';

  export let closeOnClickOutside = true;

  const handleClickOutside = () => {
    if (!closeOnClickOutside) return;
    modal.close();
  };
</script>

{#if $modal}
  <div tabindex="-1" class="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center">
    <div class="fixed bottom-0 left-0 right-0 top-0 bg-black opacity-50" />
    <div
      class="relative h-full w-full bg-white p-4 shadow-lg shadow-gray-500 sm:h-auto sm:w-1/2 sm:rounded-xl md:max-w-lg"
      use:clickOutside
      on:click-outside|once={handleClickOutside}
    >
      <slot {Header} {Body} {Footer} />
    </div>
  </div>
{/if}
