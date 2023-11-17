<script lang="ts">
  import { onMount } from 'svelte';

  import { goto } from '$app/navigation';

  export let data;
  let ready = false;

  onMount(async () => {
    if (!data.isAuthenticated) {
      await goto('/login');
    } else {
      ready = true;
    }
  });
</script>

{#if ready}
  <slot />
{/if}
