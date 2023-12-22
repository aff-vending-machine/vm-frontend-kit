<script lang="ts">
  import { generateKey } from '$lib/helpers/generator';
  import { t } from '$lib/i18n/translations';

  let { data } = $props();
</script>

<a href="/console/all" class="px-4 hover:text-secondary-500">{$t('options.branch.all')}</a>
{#if data.branches}
  {#each data.branches as branch}
    <a href="/console/{generateKey(branch.name)}" class="px-4 hover:text-secondary-500">{branch.name}</a>
  {/each}
{/if}
