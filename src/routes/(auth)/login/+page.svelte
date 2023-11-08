<script lang="ts">
  import { swr, actions } from './-actions';
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
    <form class="flex flex-col space-y-4" on:submit|preventDefault={actions.login}>
      <div class="flex flex-col space-y-2">
        <label for="username" class="text-sm uppercase"> Username </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          class="rounded-md border-gray-300 text-sm disabled:bg-gray-100"
          disabled={$swr.loading}
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="password" class="text-sm uppercase"> Password </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="****************"
          class="rounded-md border-gray-300 text-sm disabled:bg-gray-100"
          disabled={$swr.loading}
        />
      </div>
      <div>
        <input
          id="remember"
          name="remember"
          type="checkbox"
          class="rounded border-gray-300 disabled:bg-gray-100"
          disabled={$swr.loading}
        />
        <label for="remember" class="mr-2 cursor-pointer text-sm disabled:cursor-not-allowed"> Remember Me </label>
      </div>
      <div class="text-center">
        {#if $swr.loading}
          <p class="teext-xs text-blue-500">Loading...</p>
        {:else if $swr.error}
          <p class="teext-xs text-red-500">{$swr.error}</p>
        {/if}
      </div>
      <button
        class="w-full rounded-md bg-purple-500 p-2 text-sm text-white shadow shadow-purple-300
        disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-gray-300"
        type="submit"
        disabled={$swr.loading}
      >
        Sign in
      </button>
    </form>
  </div>
</div>
