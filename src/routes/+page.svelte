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
  <title>Vending Machine Portal</title>
</svelte:head>
