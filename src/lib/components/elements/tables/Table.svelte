<script lang="ts">
  import type { Snippet } from 'svelte';
  import Body from './TableBody.svelte';
  import Footer from './TableFooter.svelte';
  import Header from './TableHeader.svelte';
  import Loading from './TableLoading.svelte';

  type Components = {
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
    Loading: typeof Loading;
  };

  let { children } = $props<{
    children: Snippet<Components>;
  }>();
</script>

<table class="w-full border-collapse select-none overflow-x-auto overflow-y-auto bg-white font-mono text-neutral">
  {@render children({ Header, Body, Footer, Loading })}
</table>
