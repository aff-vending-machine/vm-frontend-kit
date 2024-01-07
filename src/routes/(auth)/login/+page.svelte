<script lang="ts">
  import Title from '$lib/components/ui/login/elements/Title.svelte';
  import { LoginFormView } from '$lib/components/ui/login/forms';
  import { LoginState } from './state.svelte';

  let { data } = $props();

  const state = new LoginState(data.isAuthenticated);
</script>

<svelte:head>
  <title>Login | Vending Machine Portal</title>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-neutral-lightest">
  <div class="min-w-[24rem] rounded-lg bg-white p-6 shadow-lg">
    <Title />
    <LoginFormView disabled={state.loading} error={state.error} onlogin={state.onLogin} />
  </div>
</div>
