<script lang="ts">
  import { version } from '$app/environment';
  import notification from '$lib/stores/notification';
  import Notification from '$lib/components/overlays/notifications/Notification.svelte';

  import '../app.css';
</script>

<svelte:head>
  <title>Vending Machine</title>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<!-- Display notifications -->
<div class="fixed right-4 top-4 z-50 space-y-2">
  {#each $notification as { id, type, message }}
    <Notification {type} {message} on:remove={() => notification.remove(id)} />
  {/each}
</div>

<slot />

<div class="absolute bottom-0 right-1 text-[0.6rem] text-gray-400">ver. {version}</div>
