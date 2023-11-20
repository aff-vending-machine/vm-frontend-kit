<script lang="ts">
  import { onMount } from 'svelte';

  import { goto } from '$app/navigation';
  import { t } from '$lib/i18n/translations';
  import { AuthService } from '$lib/services/auth';

  const authService = AuthService.getInstance();

  function returnToHome() {
    goto('/');
  }

  onMount(async () => {
    await authService.logout();
  });
</script>

<div class="flex h-screen items-center justify-center bg-gradient-to-b from-primary-200 to-white">
  <div class="text-center">
    <h1 class="mb-6 text-4xl font-semibold text-gray-800">{$t('auth.logout-success')}</h1>
    <button
      class="rounded-md bg-primary-500 px-6 py-3 text-lg font-medium text-white hover:bg-primary-600"
      on:click={returnToHome}
    >
      {$t('auth.return-to-home')}
    </button>
  </div>
</div>
