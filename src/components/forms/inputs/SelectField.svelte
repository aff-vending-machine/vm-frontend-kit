<script lang="ts">
  import type { SelectOptionsType } from '$lib/utils/options';

  export let id: string;
  export let label: string;
  export let value: unknown;
  export let error: string | null = null;
  export let options: SelectOptionsType[];
  export let placeholder = 'Select an option';
  export let unselected: unknown = undefined;
  export let disabled = false;
  export let hidden = false;
</script>

<div class="mr-6" class:hidden>
  <label for={id} class="mb-1 block text-sm font-medium">{label}:</label>
  <select
    {id}
    name={id}
    {disabled}
    bind:value
    on:change
    class="w-full rounded-sm border border-gray-300 px-2 py-1 text-sm text-gray-700 sm:w-[calc(100%+24px)]"
  >
    {#if unselected !== undefined}
      <option class="text-gray-500" value={unselected}>{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p class="m-2 text-sm text-red-500">{error}</p>
  {/if}
</div>
