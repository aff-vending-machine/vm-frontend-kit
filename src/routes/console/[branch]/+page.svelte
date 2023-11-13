<script lang="ts">
  import { genKey } from '$lib/utils/generate.js';

  export let data;
</script>

<a href="/console/all" class="px-4 hover:text-secondary-500">All Branches</a>
{#if data.branches}
  {#each data.branches as branch}
    <a href="/console/{genKey(branch.name)}" class="px-4 hover:text-secondary-500">{branch.name}</a>
  {/each}
{/if}
