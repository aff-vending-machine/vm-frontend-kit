<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n/translations';

  let { data } = $props();

  function isActive(link: string) {
    return link.includes($page.url.pathname);
  }
</script>

<div>
  <h1 class="my-4 text-3xl font-bold text-primary-900">Vending Management System</h1>
</div>
<div class="grid grid-cols-2 gap-8 p-8 md:grid-cols-4 xl:grid-cols-6">
  {@render Card({ label: $t('options.branch.all'), href: '/console/all/machines' })}
  {#if data.options.branches}
    {#each data.options.branches as branch}
      {@render Card({ label: branch.label, href: `/console/${branch.value}/machines` })}
    {/each}
  {/if}
</div>

{#snippet Card({ label, href })}
  <a
    {href}
    class="group flex h-32 items-center justify-center rounded-xl px-4 shadow-lg shadow-primary-50 transition-all hover:shadow-xl hover:shadow-primary-100 {isActive(
      href,
    )
      ? 'border-2 bg-primary-50 text-secondary-700 shadow-inner'
      : 'bg-white'}"
  >
    <span class="text-center group-hover:text-secondary-500">
      {label}
    </span>
  </a>
{/snippet}
