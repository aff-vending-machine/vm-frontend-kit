<script lang="ts">
  import { goto } from '$app/navigation';
  import { t } from '$lib/i18n/translations';
  import { handle } from './lib.svelte';

  let seconds = $state(5);

  $effect.pre(() => {
    handle.logout();
  });

  $effect(() => {
    const timeoutID = setTimeout(() => {
      goto('/');
    }, 5000);

    const intervalID = setInterval(() => {
      seconds -= 1;
      if (seconds === 0) clearInterval(intervalID);
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
      clearInterval(intervalID);
    };
  });

  const returnToHome = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    goto('/');
  };
</script>

<div class="flex h-screen items-center justify-center bg-gradient-to-b from-primary-200 to-white">
  <div class="text-center">
    <h1 class="mb-6 text-4xl font-semibold text-gray-800">{$t('auth.logout-success')}</h1>
    <button
      class="rounded-md bg-primary-500 px-6 py-3 text-lg font-medium text-white hover:bg-primary-600"
      onclick={returnToHome}
    >
      {$t('auth.return-to-home')}
    </button>
  </div>
</div>
