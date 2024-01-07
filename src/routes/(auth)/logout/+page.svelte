<script lang="ts">
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';
  import { t } from '$lib/i18n/translations';
  import { Auth } from './state.svelte';

  new Auth();
</script>

<svelte:head>
  <title>Logout | Vending Machine Portal</title>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-neutral-lightest">
  <div class="text-center">
    <h1 class="mb-8 text-4xl font-semibold text-neutral-dark">{$t('auth.logout-success')}</h1>
    <ButtonLink class="rounded-md bg-accent px-6 py-3 text-lg font-medium text-white hover:bg-accent-light" href="/">
      {$t('auth.return-to-home')}
    </ButtonLink>
  </div>
</div>
