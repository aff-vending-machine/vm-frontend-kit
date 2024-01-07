<script lang="ts">
  import { page } from '$app/stores';
  import { isActiveLink } from '$lib/utils.svelte';

  let { label, href } = $props<{
    label: string;
    href: string;
  }>();

  const targetPath = $derived($page.url.pathname);
</script>

<a
  {href}
  class={isActiveLink(href, targetPath)
    ? 'border border-primary-light bg-primary text-white shadow-inner hover:text-primary-darkest'
    : 'bg-white'}
>
  <span class="text-center group-hover:text-secondary">{label}</span>
</a>

<style lang="scss">
  a {
    @apply flex h-32 items-center justify-center rounded-xl px-4 shadow-sm transition-all;
    @apply hover:bg-primary-lightest;
  }
</style>
