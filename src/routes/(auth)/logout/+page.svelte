<script lang="ts">
  import { goto } from '$app/navigation';
  import { AuthService } from '$lib/services/auth';
  import { onMount } from 'svelte';

  const authService = AuthService.getInstance();

  function returnToHome() {
    goto('/');
  }

  onMount(async () => {
    await authService.logout();
  });
</script>

<div class="flex h-screen items-center justify-center bg-gradient-to-b from-blue-200 to-white">
  <div class="text-center">
    <h1 class="mb-6 text-4xl font-semibold text-gray-800">You've been successfully logged out.</h1>
    <button
      class="rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-white hover:bg-blue-600"
      on:click={returnToHome}
    >
      Return to Home
    </button>
  </div>
</div>
