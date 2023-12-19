<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import { genKey } from '$lib/utils/generate';

  export let data;
</script>

<a href="/console/all" class="px-4 hover:text-secondary-500">{$t('options.branch.all')}</a>
{#if data.branches}
  {#each data.branches as branch}
    <a href="/console/{genKey(branch.name)}" class="px-4 hover:text-secondary-500">{branch.name}</a>
  {/each}
{/if}
