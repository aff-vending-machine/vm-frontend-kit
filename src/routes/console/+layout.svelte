<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

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
