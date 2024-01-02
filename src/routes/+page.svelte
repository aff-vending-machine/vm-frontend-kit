<script lang="ts">
  import { goto } from '$app/navigation';

  let { data } = $props();

  $effect(() => {
    if (data.isAuthenticated) {
      goto('/portal');
    }
  });
</script>

<svelte:head>
  <title>Vending Machine Portal</title>
</svelte:head>
