<script lang="ts">
  import { goto } from '$app/navigation';
  import { AuthService } from '$lib/services/auth';
  import { access } from '$lib/stores/access';
  import notification from '$lib/stores/notification';

  const service = AuthService.getInstance();
  let username: string;
  let password: string;
  let remember: boolean;
  let status = '';
  let isLoading = false;

  function validateForm() {
    return username && password;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      status = 'Please fill in both username and password fields.';
      return;
    }

    isLoading = true;
    status = '';

    try {
      const token = await service.login(username, password, remember);
      access.set(token);
      notification.add('success', 'Login Successful');
      goto('/main', { replaceState: true, noScroll: true });
    } catch (e) {
      notification.add('danger', 'Login Failed');
      status = (e as Error).message;
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Login | Vending Machine</title>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div class="min-w-[24rem] rounded-lg bg-white p-6 shadow">
    <div class="my-2 text-center">
      <h1 class="text-xl font-bold tracking-wider text-gray-500">Vending Machine</h1>
    </div>
    <div class="h-8"></div>
    <form class="flex flex-col space-y-4" on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-col space-y-2">
        <label for="username" class="text-sm uppercase"> Username </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          class="rounded-md border-gray-300 text-sm"
          bind:value={username}
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="password" class="text-sm uppercase"> Password </label>
        <input
          id="password"
          type="password"
          placeholder="****************"
          class="rounded-md border-gray-300 text-sm"
          bind:value={password}
        />
      </div>
      <div>
        <input type="checkbox" class="rounded border-gray-300" bind:checked={remember} />
        <label for="password" class="text-sm"> Remember Me </label>
      </div>
      <div>
        {#if isLoading}
          <p class="teext-xs text-red-500">Loading...</p>
        {:else if status}
          <p class="teext-xs text-red-500">{status}</p>
        {/if}
      </div>
      <button class="w-full rounded-md bg-purple-500 p-2 text-sm text-white shadow shadow-purple-300" type="submit">
        Sign in
      </button>
    </form>
  </div>
</div>
