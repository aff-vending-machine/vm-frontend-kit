<script lang="ts">
  import { navigating } from '$app/stores';
  import Alert from '$lib/components/overlays/alerts/Alert.svelte';
  import alert from '$lib/stores/alert';
  import { windowWidth } from '$lib/stores/media';
  import '../app.css';
  import { authenticate } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  $effect(() => {
    if ($authenticate === false) {
      goto('/login');
    }
  });
</script>

<svelte:head>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
  <meta http-equiv="cache-control" content="public" />
</svelte:head>

<svelte:window bind:innerWidth={$windowWidth} />

{#if !$navigating}
  <slot />
{/if}

<!-- Display alerts -->
<div class="fixed right-4 top-4 z-50 space-y-2">
  {#each $alert as { id, type, message }}
    <Alert {type} {message} on:remove={() => alert.remove(id)} />
  {/each}
</div>
