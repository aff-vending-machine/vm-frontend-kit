<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let data;

  onMount(async () => {
    if (data.isAuthenticated) {
      await goto('/console');
    } else {
      await goto('/login');
    }
  });
</script>

<svelte:head>
  <title>Vending Machine</title>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
</svelte:head>
