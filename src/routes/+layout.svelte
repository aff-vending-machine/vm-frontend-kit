<script lang="ts">
  import { goto } from '$app/navigation';
  import { navigating } from '$app/stores';
  import { media } from '$lib/state.svelte';
  import '../app.css';

  let { data, children } = $props();

  $effect(() => {
    if (!data.isAuthenticated) {
      goto('/login');
    }
  });
</script>

<svelte:head>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
  <meta http-equiv="cache-control" content="public" />
</svelte:head>

<svelte:window bind:innerWidth={media.width} />

{#if !$navigating}
  {@render children()}
{/if}
