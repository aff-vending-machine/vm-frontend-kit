<script lang="ts">
  import type { Snippet } from 'svelte';
  import { blur, fly } from 'svelte/transition';

  import Body from './DrawerBody.svelte';
  import Footer from './DrawerFooter.svelte';
  import Header from './DrawerHeader.svelte';

  type Components = {
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
  };

  let { children, onclose } = $props<{
    onclose: () => void;
    children: Snippet<Components>;
  }>();

  function onclick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    onclose && onclose();
  }
</script>

<div class="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center">
  <button class="absolute left-0 top-0 h-full w-full bg-black opacity-30" transition:blur={{ amount: 10 }} {onclick} />
  <div
    class="absolute right-0 h-full w-full bg-white shadow-md shadow-white md:w-3/4 lg:w-1/2 2xl:w-1/3"
    transition:fly={{ x: '100%' }}
  >
    <div class="flex h-full w-full flex-col justify-between">
      {@render children({ Header, Body, Footer })}
    </div>
  </div>
</div>
