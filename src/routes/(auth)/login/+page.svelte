<script lang="ts">
  import { goto } from '$app/navigation';
  import { t } from '$lib/i18n/translations';
  import { authenticate } from '$lib/stores/auth';
  import { createAuthSWR } from './lib.svelte';

  let username = $state('');
  let password = $state('');
  let remember = $state(true);
  let auth = createAuthSWR();

  $effect(() => {
    if ($authenticate) {
      goto('/console');
    }
  });

  const loginEvent = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    auth.login(username, password, remember);
  };
</script>

<svelte:head>
  <title>Login | Vending Machine Portal</title>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div class="min-w-[24rem] rounded-lg bg-white p-6 shadow">
    <div class="my-2 text-center">
      <h1 class="text-xl font-bold tracking-wider text-gray-500">{$t('auth.title')}</h1>
    </div>
    <div class="h-8"></div>
    <form class="flex flex-col space-y-4" onsubmit={loginEvent}>
      <div class="flex flex-col space-y-2">
        <label for="username" class="text-sm uppercase">{$t('auth.username')}</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          class="rounded-md border-gray-300 text-sm disabled:bg-gray-100"
          disabled={auth.swr.loading}
          bind:value={username}
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="password" class="text-sm uppercase">{$t('auth.password')}</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="****************"
          class="rounded-md border-gray-300 text-sm disabled:bg-gray-100"
          bind:value={password}
          disabled={auth.swr.loading}
        />
      </div>
      <div>
        <input
          id="remember"
          name="remember"
          type="checkbox"
          class="rounded border-gray-300 disabled:bg-gray-100"
          disabled={auth.swr.loading}
          bind:value={remember}
        />
        <label for="remember" class="mr-2 cursor-pointer text-sm disabled:cursor-not-allowed"
          >{$t('auth.remember')}</label
        >
      </div>
      <div class="text-center">
        {#if auth.swr.loading}
          <p class="text-xs text-primary-500">{$t('common.loading')}</p>
        {/if}

        {#if auth.swr.error}
          <p class="text-xs text-red-500">{auth.swr.error.message}</p>
        {/if}
      </div>
      <button
        class="w-full rounded-md bg-secondary-500 p-2 text-sm text-white shadow shadow-secondary-300
        disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-gray-300"
        type="submit"
        disabled={auth.swr.loading}
      >
        {$t('auth.signin')}
      </button>
    </form>
  </div>
</div>
