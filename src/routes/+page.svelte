<script lang="ts">
  import { goto } from '$app/navigation';
  import { authenticate } from '$lib/stores/auth';

  $effect(() => {
    if ($authenticate) {
      goto('/console');
    } else if ($authenticate === false) {
      goto('/login');
    }
  });
</script>

<svelte:head>
  <title>Vending Machine Portal</title>
</svelte:head>
