<script lang="ts">
  import { goto } from '$app/navigation';
  import { navigating } from '$app/stores';
  import Toast from '$lib/components/overlays/toasts/Toast.svelte';
  import { toast } from '$lib/state.svelte';
  import { windowWidth } from '$lib/stores/media';
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

<svelte:window bind:innerWidth={$windowWidth} />

{#if !$navigating}
  {@render children()}
{/if}

<!-- Display toast -->
<div class="fixed right-8 top-8 z-50 flex flex-col space-y-2">
  {#each toast.stack as { id, type, message }}
    <Toast {id} {type} {message} onclose={toast.onClose} />
  {/each}
</div>
