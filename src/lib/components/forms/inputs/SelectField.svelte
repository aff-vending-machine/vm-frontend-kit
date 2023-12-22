<script lang="ts">
  import type { SelectOptionsType } from '$lib/utils/options';

  export let id: string;
  export let label: string | null = null;
  export let value: unknown;
  export let error: string | null = null;
  export let options: SelectOptionsType[];
  export let placeholder = 'Select an option';
  export let unselected: unknown = undefined;
  export let disabled = false;
  export let hidden = false;
</script>

<div class:hidden>
  {#if label}
    <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  {/if}
  <select
    {id}
    name={id}
    disabled={disabled || (!unselected && options.length === 1)}
    bind:value
    on:change
    class="mr-6 w-full rounded-sm border border-gray-300 px-2 py-1 text-sm text-gray-700 sm:w-full"
  >
    {#if unselected !== undefined && options.length > 1}
      <option class="text-gray-500" value={unselected} disabled={unselected === null}>{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p class="m-2 text-sm text-red-500">{error}</p>
  {/if}
</div>
