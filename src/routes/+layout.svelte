<script lang="ts">
  import { onMount } from 'svelte';

  import { page } from '$app/stores';
  import Alert from '$components/overlays/alerts/Alert.svelte';
  import { loadTranslations, loading } from '$lib/i18n/translations';
  import alert from '$lib/stores/alert';
  import language from '$lib/stores/language';
  import { windowWidth } from '$lib/stores/media';
  import '../app.css';

  onMount(() => {
    const unsubLanguage = language.subscribe(lang => {
      loadTranslations(lang, $page.url.pathname);
    });

    const unsubLoading = loading.subscribe(async $loading => {
      if ($loading) await loading.toPromise();
    });

    return () => {
      unsubLanguage();
      unsubLoading();
    };
  });
</script>

<!-- Display alerts -->
<div class="fixed right-4 top-4 z-50 space-y-2">
  {#each $alert as { id, type, message }}
    <Alert {type} {message} on:remove={() => alert.remove(id)} />
  {/each}
</div>

<svelte:head>
  <meta name="description" content="The web application for vending machine" />
  <meta name="theme-color" content="#000000" />
  <meta http-equiv="cache-control" content="public" />
</svelte:head>

<svelte:window bind:innerWidth={$windowWidth} />

<slot />
