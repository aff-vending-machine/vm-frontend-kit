<script lang="ts">
  import alert from '$lib/stores/alert';
  import Alert from '$components/overlays/alerts/Alert.svelte';

  import '../app.css';
</script>

<svelte:head>
  <title>Vending Machine</title>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<!-- Display alerts -->
<div class="fixed right-4 top-4 z-50 space-y-2">
  {#each $alert as { id, type, message }}
    <Alert {type} {message} on:remove={() => alert.remove(id)} />
  {/each}
</div>

<slot />
