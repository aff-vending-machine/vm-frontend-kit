<script lang="ts">
  import { page } from '$app/stores';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';
</script>

<main class="grid h-screen place-items-center bg-neutral-dark px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-info">{$page.status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-neutral-lightest sm:text-5xl">
      {$page.status === 404 ? 'Page not found' : 'Something went wrong'}
    </h1>
    <p class="mt-6 text-base leading-7 text-neutral">
      {$page.error?.message ?? 'Unknown error'}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <ButtonLink class="flex-1" href="/">Go back home</ButtonLink>
      <ButtonLink href="/support" target="_blank" class="flex-1">Contact support</ButtonLink>
    </div>
  </div>
</main>
