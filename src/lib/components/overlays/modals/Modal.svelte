<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fade, blur } from 'svelte/transition';
  import type { Snippet } from 'svelte';

  import Body from './ModalBody.svelte';
  import Footer from './ModalFooter.svelte';
  import Header from './ModalHeader.svelte';

  type Components = {
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
  };

  let {
    show = false,
    children,
    onclose,
  } = $props<{
    show?: boolean;
    onclose: () => void;
    children: Snippet<Components>;
  }>();

  function onclick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    onclose && onclose();
  }
</script>

{#if show}
  <div tabindex="-1" class="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center">
    <button
      class="absolute left-0 top-0 h-full w-full bg-black opacity-30 transition-opacity duration-300"
      transition:blur={{ amount: 10 }}
      {onclick}
    />
    <div
      class="relative h-full w-full bg-white p-4 shadow-lg shadow-neutral sm:h-auto sm:w-1/2 sm:rounded-xl md:max-w-lg"
      transition:fade={{ duration: 300, easing: quintOut }}
    >
      {@render children({ Header, Body, Footer })}
    </div>
  </div>
{/if}
