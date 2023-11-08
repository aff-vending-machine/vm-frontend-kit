<script lang="ts">
  import { onDestroy } from 'svelte';
  import { filters, updateURL } from './-filters';

  export let data;

  const unsubscribe = filters.subscribe(updateURL);
  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- Input fields to change data filters -->
<input type="number" bind:value={$filters.limit} placeholder="Limit" />
<input type="number" bind:value={$filters.offset} placeholder="Offset" />
<input type="text" bind:value={$filters.title} placeholder="Title" />
<select bind:value={$filters.sort}>
  <option value="id:asc">Ascending</option>
  <option value="id:desc">Descending</option>
</select>

<!-- Display the data -->
{#each data.machines as machine}
  <div>
    <h2>{machine.name}</h2>
    <!-- other data display -->
  </div>
{/each}

{#if data.error}
  <p class="text-red-500">{data.error}</p>
{/if}
