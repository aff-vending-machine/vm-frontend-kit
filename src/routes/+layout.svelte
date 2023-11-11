<script lang="ts">
  import alert from '$lib/stores/alert';
  import Alert from '$components/overlays/alerts/Alert.svelte';

  import { onDestroy } from 'svelte';
  import language from '$lib/stores/language';
  import { loadTranslations } from '$lib/translations';
  import { page } from '$app/stores';
  import '../app.css';

  const unsubscribe = language.subscribe(lang => {
    loadTranslations(lang, $page.url.pathname);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- Display alerts -->
<div class="fixed right-4 top-4 z-50 space-y-2">
  {#each $alert as { id, type, message }}
    <Alert {type} {message} on:remove={() => alert.remove(id)} />
  {/each}
</div>

<slot />
