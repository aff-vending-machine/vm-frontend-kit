<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  onMount(async () => {
    if (!data.isAuthenticated) {
      await goto('/login');
    }
  });
</script>

<slot />
