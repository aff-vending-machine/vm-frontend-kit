<script lang="ts">
  import alert from '$lib/stores/alert';
  import Alert from '$components/overlays/alerts/Alert.svelte';

  import { onMount } from 'svelte';
  import language from '$lib/stores/language';
  import { windowWidth } from '$lib/stores/media';
  import { loading } from '$lib/stores/loading';
  import { loadTranslations, loading as tloading } from '$lib/i18n/translations';
  import { navigating, page } from '$app/stores';
  import '../app.css';

  $: loading.setNavigate(!!$navigating);

  onMount(() => {
    const unsubLanguage = language.subscribe(lang => {
      loadTranslations(lang, $page.url.pathname);
    });

    const unsubLoading = tloading.subscribe(async $tloading => {
      if ($tloading) await tloading.toPromise();
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
